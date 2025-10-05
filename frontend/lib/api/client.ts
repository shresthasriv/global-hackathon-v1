// Backend API Client
// Connects to the FastAPI backend

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

export interface User {
  id: string;
  name: string;
  email: string;
  created_at: string;
}

export interface MemorySpace {
  id: string;
  grandparent_name: string;
  grandparent_photo_url?: string;
  relation: string;
  created_at: string;
}

export interface ConversationMessage {
  id: string;
  role: "assistant" | "user";
  content: string;
  timestamp: string;
}

export interface Story {
  id: string;
  memory_space_id?: string;
  session_id?: string;
  title: string;
  content: string;
  markdown_content?: string;
  excerpt?: string;
  grandparent_name?: string;
  topic?: string;
  status?: string;
  created_at?: string;
  generated_at?: string;
}

// User Management (using localStorage for now)
export function getUserFromStorage(): User | null {
  if (typeof window === "undefined") return null;
  const stored = localStorage.getItem("current_user");
  if (stored) {
    return JSON.parse(stored);
  }
  return null;
}

export async function createOrUpdateUser(data: {
  name: string;
  email: string;
}): Promise<User> {
  // For now, just store in localStorage
  // Backend doesn't have user management yet
  const user: User = {
    id: crypto.randomUUID(),
    name: data.name,
    email: data.email,
    created_at: new Date().toISOString(),
  };

  localStorage.setItem("current_user", JSON.stringify(user));
  return user;
}

export async function checkUserHasBlogs(email: string): Promise<boolean> {
  try {
    const response = await fetch(
      `${API_URL}/stories/get_by_email?email=${encodeURIComponent(email)}`
    );
    if (response.ok) {
      const data = await response.json();
      return data.stories && data.stories.length > 0;
    }
    return false;
  } catch (error) {
    console.error("Error checking user blogs:", error);
    return false;
  }
}

// Memory Space Management
export async function createMemorySpace(data: {
  grandparent_name: string;
  relation: string;
  creator_email: string;
  photo_url?: string;
}): Promise<{ memory_space_id: string; user_id: string }> {
  const response = await fetch(`${API_URL}/memory_spaces/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to create memory space");
  }

  return response.json();
}

export async function getMemorySpace(
  spaceId: string
): Promise<MemorySpace | null> {
  try {
    const response = await fetch(
      `${API_URL}/memory_spaces/get_by_id?space_id=${spaceId}`
    );
    if (response.ok) {
      return response.json();
    }
    return null;
  } catch (error) {
    console.error("Error fetching memory space:", error);
    return null;
  }
}

// Conversation Management
export async function getInitialPrompt(
  memorySpaceId: string
): Promise<ConversationMessage> {
  // Start a new conversation session with the backend
  const response = await startConversation(memorySpaceId, "", "");

  // Return the first AI message
  return {
    id: crypto.randomUUID(),
    role: "assistant",
    content: response.content,
    timestamp: new Date().toISOString(),
  };
}

interface StreamMetadata {
  session_id: string;
  question_count: number;
  is_complete: boolean;
  should_ask_to_continue: boolean;
}

export async function startConversation(
  memorySpaceId: string,
  grandparentName: string,
  userMessage: string,
  sessionId?: string
): Promise<{ content: string; metadata: StreamMetadata }> {
  const body: Record<string, unknown> = {
    memory_space_id: memorySpaceId,
    grandparent_name: grandparentName,
  };

  if (sessionId) {
    body.session_id = sessionId;
  }

  if (userMessage) {
    body.user_message = userMessage;
  }

  const response = await fetch(`${API_URL}/conversations/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error("Failed to start conversation");
  }

  // Parse the streaming response
  const reader = response.body?.getReader();
  const decoder = new TextDecoder();

  let metadata: StreamMetadata | null = null;
  let content = "";

  if (reader) {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value);
      const lines = chunk.split("\n");

      for (const line of lines) {
        if (line.startsWith("data: ")) {
          const data = JSON.parse(line.slice(6));

          if (data.type === "metadata") {
            metadata = {
              session_id: data.session_id,
              question_count: data.question_count,
              is_complete: data.is_complete,
              should_ask_to_continue: data.should_ask_to_continue,
            };
          } else if (data.type === "token") {
            content += data.content;
          }
        }
      }
    }
  }

  if (!metadata) {
    throw new Error("No metadata received from stream");
  }

  return { content, metadata };
}

export async function sendMessage(
  memorySpaceId: string,
  message: string,
  sessionId?: string,
  grandparentName?: string,
  endConversation?: boolean
): Promise<ConversationMessage> {
  const body: Record<string, unknown> = {
    memory_space_id: memorySpaceId,
  };

  if (sessionId) {
    body.session_id = sessionId;
  }

  if (grandparentName) {
    body.grandparent_name = grandparentName;
  }

  if (message) {
    body.user_message = message;
  }

  if (endConversation) {
    body.end_conversation = true;
  }

  const response = await fetch(`${API_URL}/conversations/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error("Failed to send message");
  }

  // Parse streaming response
  const reader = response.body?.getReader();
  const decoder = new TextDecoder();

  let content = "";
  let newSessionId: string | null = null;

  if (reader) {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value);
      const lines = chunk.split("\n");

      for (const line of lines) {
        if (line.startsWith("data: ")) {
          try {
            const data = JSON.parse(line.slice(6));

            if (data.type === "metadata") {
              newSessionId = data.session_id;
              // Store session ID in localStorage for later use
              if (typeof window !== "undefined") {
                localStorage.setItem("current_session_id", data.session_id);
              }
            } else if (data.type === "token") {
              content += data.content;
            }
          } catch (e) {
            // Ignore JSON parse errors
          }
        }
      }
    }
  }

  return {
    id: crypto.randomUUID(),
    role: "assistant",
    content,
    timestamp: new Date().toISOString(),
  };
}

export async function getConversationHistory(
  sessionId: string
): Promise<ConversationMessage[]> {
  const response = await fetch(
    `${API_URL}/conversations/get_history?session_id=${sessionId}`
  );

  if (!response.ok) {
    throw new Error("Failed to get conversation history");
  }

  const data = await response.json();
  return data.messages.map(
    (msg: {
      id: string;
      role: string;
      content: string;
      timestamp: string;
    }) => ({
      id: msg.id,
      role: msg.role,
      content: msg.content,
      timestamp: msg.timestamp,
    })
  );
}

// Story Management
export async function convertSessionToBlog(data: {
  memory_space_id: string;
  session_messages: ConversationMessage[];
}): Promise<Story> {
  // First, we need to get the session_id from the conversation
  // For now, we'll extract it from localStorage or pass it differently
  const sessionId = localStorage.getItem("current_session_id");

  if (!sessionId) {
    throw new Error("No active session found");
  }

  const response = await fetch(`${API_URL}/stories/generate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      session_id: sessionId,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || "Failed to generate story");
  }

  return response.json();
}

export async function getStoryById(storyId: string): Promise<Story> {
  const response = await fetch(
    `${API_URL}/stories/get_by_id?story_id=${storyId}`
  );

  if (!response.ok) {
    throw new Error("Failed to get story");
  }

  return response.json();
}

export async function getUserBlogs(email: string): Promise<Story[]> {
  const response = await fetch(
    `${API_URL}/stories/get_by_email?email=${encodeURIComponent(email)}`
  );

  if (!response.ok) {
    throw new Error("Failed to get user stories");
  }

  const data = await response.json();
  return data.stories || [];
}

export async function getMemorySpaceStories(
  memorySpaceId: string
): Promise<Story[]> {
  const response = await fetch(
    `${API_URL}/stories/get_by_memory_space?memory_space_id=${memorySpaceId}`
  );

  if (!response.ok) {
    throw new Error("Failed to get memory space stories");
  }

  const data = await response.json();
  return data.stories || [];
}

// Photo upload placeholder
export async function uploadPhoto(file: File): Promise<string> {
  // TODO: Implement actual photo upload to backend
  // For now, return a data URL
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      resolve(reader.result as string);
    };
    reader.readAsDataURL(file);
  });
}
