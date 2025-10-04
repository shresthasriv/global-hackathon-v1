// Dummy API functions - Replace with real API calls later

export interface User {
  id: string;
  name: string;
  email: string;
  created_at: string;
}

export interface MemorySpace {
  id: string;
  user_id: string;
  grandparent_name: string;
  grandparent_photo_url?: string;
  relation: string;
  access_token: string;
  created_at: string;
}

export interface ConversationMessage {
  id: string;
  role: "assistant" | "user";
  content: string;
  timestamp: string;
}

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Generate random ID
const generateId = () => Math.random().toString(36).substring(2, 15);

// User Authentication Functions
export function getUserFromStorage(): User | null {
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
  await delay(600);

  const user: User = {
    id: generateId(),
    name: data.name,
    email: data.email,
    created_at: new Date().toISOString(),
  };

  // Store in localStorage
  localStorage.setItem("current_user", JSON.stringify(user));

  return user;
}

// Create Memory Space
export async function createMemorySpace(data: {
  user_id: string;
  grandparent_name: string;
  relation: string;
  grandparent_photo_url?: string;
}): Promise<MemorySpace> {
  await delay(800);

  const memorySpace: MemorySpace = {
    id: generateId(),
    user_id: data.user_id,
    grandparent_name: data.grandparent_name,
    grandparent_photo_url: data.grandparent_photo_url,
    relation: data.relation,
    access_token: generateId() + generateId(), // Longer token
    created_at: new Date().toISOString(),
  };

  // Store in localStorage for demo purposes
  localStorage.setItem("current_memory_space", JSON.stringify(memorySpace));

  return memorySpace;
}

// Get Memory Space by Access Token
export async function getMemorySpace(
  access_token: string
): Promise<MemorySpace | null> {
  await delay(400);

  const memorySpace = localStorage.getItem("current_memory_space");
  if (memorySpace) {
    const parsed = JSON.parse(memorySpace);
    if (parsed.access_token === access_token) {
      return parsed;
    }
  }

  return null;
}

// Upload Photo (dummy)
export async function uploadPhoto(file: File): Promise<string> {
  await delay(1000);

  // Return a placeholder URL or data URL
  return URL.createObjectURL(file);
}

// Get initial conversation prompt
export async function getInitialPrompt(
  memory_space_id: string
): Promise<ConversationMessage> {
  await delay(500);

  return {
    id: generateId(),
    role: "assistant",
    content:
      "Let's start with something simple. Can you tell me about where you grew up? What was your childhood home like?",
    timestamp: new Date().toISOString(),
  };
}

// Send message and get AI response
export async function sendMessage(
  memory_space_id: string,
  message: string
): Promise<ConversationMessage> {
  await delay(1500);

  // Dummy AI responses based on simple keywords
  const responses = [
    "That's wonderful! Tell me more about that experience.",
    "How fascinating! What did that mean to you at the time?",
    "I'd love to hear more details about that memory.",
    "What a beautiful story! Can you describe what you remember most vividly?",
    "Thank you for sharing that. How did that shape who you became?",
  ];

  return {
    id: generateId(),
    role: "assistant",
    content: responses[Math.floor(Math.random() * responses.length)],
    timestamp: new Date().toISOString(),
  };
}
