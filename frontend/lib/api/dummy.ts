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

export interface MemoryBlog {
  id: string;
  user_id: string;
  memory_space_id: string;
  title: string;
  markdown_content: string;
  grandparent_name: string;
  created_at: string;
  updated_at: string;
}

export interface ConversationSession {
  id: string;
  memory_space_id: string;
  messages: ConversationMessage[];
  has_blog: boolean;
  blog_id?: string;
  created_at: string;
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

// Blog Functions

// Check if user has any blogs
export async function checkUserHasBlogs(email: string): Promise<boolean> {
  await delay(400);

  const blogs = localStorage.getItem(`blogs_${email}`);
  return blogs ? JSON.parse(blogs).length > 0 : false;
}

// Get all blogs for a user
export async function getUserBlogs(email: string): Promise<MemoryBlog[]> {
  await delay(500);

  const stored = localStorage.getItem(`blogs_${email}`);
  if (stored) {
    return JSON.parse(stored);
  }

  // Special dummy blogs for divyadityab@gmail.com
  if (email === "divyadityab@gmail.com") {
    const divyaBlogsLite: MemoryBlog[] = [
      {
        id: "divya_blog_1",
        user_id: "divya_user_1",
        memory_space_id: "divya_space_1",
        title: "The Village Fair of 1965",
        markdown_content: "", // Will be loaded on demand
        grandparent_name: "Dadi Ji",
        created_at: new Date(
          Date.now() - 5 * 24 * 60 * 60 * 1000
        ).toISOString(),
        updated_at: new Date(
          Date.now() - 5 * 24 * 60 * 60 * 1000
        ).toISOString(),
      },
      {
        id: "divya_blog_2",
        user_id: "divya_user_1",
        memory_space_id: "divya_space_2",
        title: "First Day of Independence",
        markdown_content: "", // Will be loaded on demand
        grandparent_name: "Nana Ji",
        created_at: new Date(
          Date.now() - 12 * 24 * 60 * 60 * 1000
        ).toISOString(),
        updated_at: new Date(
          Date.now() - 12 * 24 * 60 * 60 * 1000
        ).toISOString(),
      },
      {
        id: "divya_blog_3",
        user_id: "divya_user_1",
        memory_space_id: "divya_space_3",
        title: "Monsoon Memories and Mango Trees",
        markdown_content: "", // Will be loaded on demand
        grandparent_name: "Dadi Ji",
        created_at: new Date(
          Date.now() - 20 * 24 * 60 * 60 * 1000
        ).toISOString(),
        updated_at: new Date(
          Date.now() - 20 * 24 * 60 * 60 * 1000
        ).toISOString(),
      },
      {
        id: "divya_blog_4",
        user_id: "divya_user_1",
        memory_space_id: "divya_space_4",
        title: "The Old Haveli and Joint Family Days",
        markdown_content: "", // Will be loaded on demand
        grandparent_name: "Nani Ji",
        created_at: new Date(
          Date.now() - 28 * 24 * 60 * 60 * 1000
        ).toISOString(),
        updated_at: new Date(
          Date.now() - 28 * 24 * 60 * 60 * 1000
        ).toISOString(),
      },
    ];

    return divyaBlogsLite;
  }

  // Return dummy blogs for demo
  const dummyBlogs: MemoryBlog[] = [
    {
      id: "blog1",
      user_id: "user1",
      memory_space_id: "space1",
      title: "Growing Up in the Countryside",
      markdown_content: `# Growing Up in the Countryside

## The Old Farmhouse

I remember the old farmhouse like it was yesterday. The **wooden floors** would creak with every step, and the smell of *fresh bread* baking in the kitchen would fill the entire house.

### Morning Routines

Every morning, before the sun came up, I would:
- Wake up to the sound of roosters
- Help milk the cows
- Collect eggs from the chicken coop
- Eat breakfast with the whole family

> "Those were the days when family meant everything, and every meal was a celebration of togetherness."

### The Fields

The fields stretched as far as the eye could see. In summer, we'd play hide and seek among the corn stalks, and in autumn, we'd help with the harvest. It was hard work, but it taught us the value of:

1. **Dedication** - showing up every day
2. **Patience** - waiting for crops to grow
3. **Gratitude** - appreciating what the land gave us

---

*These memories shaped who I am today, teaching me that the simplest moments are often the most precious.*`,
      grandparent_name: "Grandma Rose",
      created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      updated_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "blog2",
      user_id: "user1",
      memory_space_id: "space2",
      title: "The War Years",
      markdown_content: `# The War Years

## A Time of Uncertainty

The war changed everything. I was just **16 years old** when it started, and life as we knew it would never be the same.

### Rationing and Hardship

Food was scarce. We learned to make do with:
- A loaf of bread that had to last a week
- Powdered eggs instead of fresh ones
- Victory gardens in every yard
- Hand-me-down clothes patched over and over

But we survived. We *always* found a way.

## The Letters

The hardest part was waiting for letters from the front. Each envelope brought either **hope** or **heartbreak**. I still remember the day we got the telegram about my brother...

> "War doesn't just take lives, it takes innocence. But it also reveals the strength we never knew we had."

### Finding Joy in Small Things

Despite everything, we found moments of happiness:

1. Dancing to music on the radio
2. Community gatherings in the church hall
3. Sharing what little we had with neighbors
4. The day the war finally ended

The celebrations that night... I'll never forget the sound of church bells ringing, people crying and laughing at the same time, strangers hugging in the streets.

---

*Those years taught me resilience, compassion, and the importance of cherishing peace.*`,
      grandparent_name: "Grandpa William",
      created_at: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
      updated_at: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "blog3",
      user_id: "user1",
      memory_space_id: "space3",
      title: "Meeting Your Grandfather",
      markdown_content: `# Meeting Your Grandfather

## A Chance Encounter

It was a **sunny Saturday afternoon** in June 1952. I was at the local diner with my girlfriends, and he walked in wearing his Navy uniform.

### Love at First Sight

They say it doesn't exist, but I'm here to tell you it does. The moment our eyes met:
- Time seemed to stop
- My heart skipped a beat  
- I couldn't look away
- Everything else faded into the background

He came over and asked if he could join us. His smile could light up a room, and his laugh... *oh, that laugh*.

## The First Date

Three days later, he took me to:
1. A movie at the old Regal Theater
2. Dinner at Tony's Italian Restaurant  
3. A walk by the riverside under the stars

> "I knew that night I would marry him. Sometimes, you just know."

### The Proposal

Six months later, on Christmas Eve, he got down on one knee in front of the whole family during dinner. It was:
- **Unexpected** - I had no idea it was coming
- **Perfect** - exactly the way it should be
- **Memorable** - everyone cried, even his tough older brothers

We were married the following spring, and we had **58 wonderful years** together before he passed.

---

*He was my best friend, my partner, my everything. Every day, I'm grateful for the memories we made together.*`,
      grandparent_name: "Grandma Margaret",
      created_at: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000).toISOString(),
      updated_at: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ];

  return dummyBlogs;
}

// Get a single blog by ID
export async function getBlogById(blogId: string): Promise<MemoryBlog | null> {
  await delay(400);

  // Special handling for divyadityab@gmail.com blogs
  if (blogId.startsWith("divya_blog_")) {
    return getDivyaBlogContent(blogId);
  }

  // Check all user blogs in localStorage
  const keys = Object.keys(localStorage).filter((key) =>
    key.startsWith("blogs_")
  );

  for (const key of keys) {
    const blogs: MemoryBlog[] = JSON.parse(localStorage.getItem(key) || "[]");
    const blog = blogs.find((b) => b.id === blogId);
    if (blog) return blog;
  }

  // Return dummy blog for demo
  const dummyBlogs = await getUserBlogs("demo@example.com");
  return dummyBlogs.find((b) => b.id === blogId) || null;
}

// Get Divya's blog content with full markdown
function getDivyaBlogContent(blogId: string): MemoryBlog | null {
  const blogsMap: { [key: string]: MemoryBlog } = {
    divya_blog_1: {
      id: "divya_blog_1",
      user_id: "divya_user_1",
      memory_space_id: "divya_space_1",
      title: "The Village Fair of 1965",
      grandparent_name: "Dadi Ji",
      created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      updated_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      markdown_content: `# The Village Fair of 1965

*A memory shared by Dadi Ji*

---

## The Arrival

It was **early morning** when we set out for the *annual mela*. The entire village buzzed with excitement, and children ran ahead of their parents, unable to contain their joy.

The fair was held in the open grounds near the **Peepal tree**, where everyone gathered for important occasions. As we approached, I could hear:

- The rhythmic beating of **dhol** drums
- Street vendors calling out their wares
- Children laughing and playing
- The sweet smell of **jalebi** frying in huge pans

### The Sights and Sounds

> "The village fair wasn't just about buying things—it was about community, about coming together, about celebrating life itself."

I remember the stalls lined up in rows:

1. **Bangle sellers** with glass bangles of every color imaginable
2. **Toy vendors** with wooden toys and clay figurines
3. **Sweet shops** with fresh *laddoos*, *barfi*, and *gulab jamun*
4. **Fabric merchants** displaying beautiful **cotton sarees** and *dupattas*

## A Special Purchase

My mother gave me **five annas** to spend as I wished. I wandered through the fair, my eyes wide with wonder. After much deliberation, I chose:

- A pair of *red and gold bangles* (2 annas)
- A *clay doll* dressed in a tiny saree (2 annas)
- A paper cone filled with roasted *chana* (1 anna)

That clay doll became my most treasured possession. I kept it for years until it finally broke during our move to the city.

### The Evening Performance

As the sun began to set, a **traveling theater troupe** performed *Ram Leela* under the stars. The whole village sat on the ground, mesmerized by the actors in their colorful costumes and elaborate makeup.

The lanterns swayed in the breeze, casting dancing shadows on the performers. I sat on my father's lap, completely absorbed in the story of Lord Ram and Sita.

---

## The Journey Home

Walking back home under the **moonlight**, I clutched my treasures close. My feet hurt from walking all day, but my heart was full of happiness.

The village fair happened only once a year, but the memories lasted a lifetime. It was a reminder of:

- **Simpler times** when happiness didn't cost much
- **Community bonds** that held us together
- **Traditions** passed down through generations
- **Childhood wonder** at the smallest things

> "In those days, we didn't have much, but we had everything that mattered—family, community, and moments of pure joy."

---

*Captured with love, preserving the simple pleasures of village life*`,
    },
    divya_blog_2: {
      id: "divya_blog_2",
      user_id: "divya_user_1",
      memory_space_id: "divya_space_2",
      title: "First Day of Independence",
      grandparent_name: "Nana Ji",
      created_at: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
      updated_at: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
      markdown_content: `# First Day of Independence

*A memory shared by Nana Ji*

---

## The Night Before Freedom

**August 14th, 1947** — None of us could sleep. The excitement in the air was palpable. After **200 years** of British rule, India would finally be free at the stroke of midnight.

I was just *18 years old*, a college student full of dreams for our new nation. We gathered in the town square, waiting for the historic moment.

### Midnight Arrives

As the clock struck **12**, a roar erupted from the crowd:

> "**Jai Hind! Bharat Mata Ki Jai!**"

People were:
- Crying with joy
- Embracing strangers
- Waving the **tricolor flag**
- Singing *Vande Mataram*

I remember looking up at the **Indian flag** being hoisted for the first time as a free nation's flag. The saffron, white, and green rippled in the night breeze, and I felt tears streaming down my face.

## The Morning After

**August 15th, 1947** dawned bright and clear. It felt like the sun was shining differently on a free India.

### The School Celebration

Our college organized a special program:

1. **Flag hoisting ceremony** at sunrise
2. **Nehruji's speech** broadcast on the radio
3. **Cultural programs** by students
4. Distribution of **sweets** to everyone

When we heard Prime Minister Nehru's famous words on the radio—*"At the stroke of the midnight hour, when the world sleeps, India will awake to life and freedom"*—there wasn't a dry eye in the room.

## A New Beginning

The day was filled with both **joy and uncertainty**. We celebrated our freedom, but we also knew that:

- The partition had torn families apart
- Millions were displaced and suffering
- Our new nation faced enormous challenges
- We had to build a future from scratch

### Personal Reflections

I remember thinking about what this freedom meant:

- *Education* for all, not just the privileged
- *Opportunity* to shape our own destiny
- *Pride* in being Indian
- *Responsibility* to build a better nation

> "Freedom isn't just about being ruled by ourselves—it's about the opportunity to create, to dream, to become the best version of ourselves."

## The Price of Freedom

While we celebrated, we couldn't forget:

- The **freedom fighters** who sacrificed their lives
- **Bhagat Singh**, **Chandrashekhar Azad**, and countless unnamed heroes
- Gandhiji's *non-violent struggle* that inspired the world
- The **millions** who participated in the freedom movement

---

## Looking Forward

That evening, as I walked home, I made a promise to myself:

1. To **honor** the sacrifice of those who came before
2. To **work hard** for the nation's progress
3. To **stay united** despite our differences
4. To **pass on** these values to future generations

The first day of independence taught me that **freedom is both a gift and a responsibility**. It's not just about what we gained, but what we must do with it.

> "We were born into slavery, but we would live as free people. That day changed everything—not just for us, but for our children and their children after them."

---

*A witness to history, a citizen of free India, forever grateful*`,
    },
    divya_blog_3: {
      id: "divya_blog_3",
      user_id: "divya_user_1",
      memory_space_id: "divya_space_3",
      title: "Monsoon Memories and Mango Trees",
      grandparent_name: "Dadi Ji",
      created_at: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
      updated_at: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
      markdown_content: `# Monsoon Memories and Mango Trees

*A memory shared by Dadi Ji*

---

## The First Rain

The **smell of wet earth** is something you never forget. We called it *petrichor*, though we didn't know that word then. We just knew it meant the **monsoon had arrived**.

After months of scorching summer heat, the first drops of rain were nothing short of magical.

### Preparing for the Rains

Before the monsoon season, the whole family would prepare:

- **Cleaning the terrace** drains
- **Fixing leaks** in the roof
- **Storing grains** in waterproof containers
- **Bringing out umbrellas** and raincoats from storage
- **Checking the well** water level

> "The monsoon wasn't just a season—it was a celebration, a relief, a blessing from the heavens."

## The Mango Orchard

Our **ancestral home** had a small orchard with six *mango trees*. During monsoon, when the *aam* season was at its peak, those trees became our playground.

### The Mango Ritual

Every afternoon during mango season:

1. We'd spread a **white sheet** under the trees
2. Wait for ripe mangoes to fall naturally
3. Rush to collect them as soon as they dropped
4. Divide them fairly among all the children
5. Sit in a circle and enjoy them together

The best mangoes were the ones that fell during the **first rain** of monsoon. They were perfectly ripe, incredibly sweet, and still warm from the sun.

## Rain Games and Adventures

Monsoon meant:

### Playing in the Rain

- **Dancing** in the courtyard as rain poured down
- **Making paper boats** and racing them in puddles
- **Splashing** in muddy water without a care
- **Catching rainwater** in our mouths
- Getting completely **soaked** and laughing about it

### Indoor Activities

When the rain was too heavy, we'd:

- Listen to **stories** from the elders
- Play **antakshari** and other singing games
- Make *pakoras* and *chai* together
- Watch the **lightning** from the windows
- Count seconds between *thunder* and lightning

> "We didn't have television or phones, but we had each other, and that was more than enough."

## The Courtyard Pool

During heavy rains, our **courtyard** would fill with water—almost like a small pool. We children would:

- Jump in fully clothed
- Try to swim (though it was barely knee-deep)
- Splash water at each other
- Float paper boats
- Hunt for **earthworms** that came up

Our mothers would scold us, but even they couldn't hide their smiles. They remembered doing the same thing as children.

---

## Monsoon Delicacies

The rains brought special foods:

### Hot Treats

- **Pakoras** made with onions, potatoes, and spinach
- **Samosas** with spicy *aloo* filling
- **Hot chai** in steel glasses
- **Bhutta** (roasted corn) with lemon and salt
- **Jaggery** and *garam garam rotis*

### Sweet Memories

I especially remember my mother making:

- **Mango pickle** with raw monsoon mangoes
- **Aam panna** to cool us down
- **Mango chutney** that lasted all year
- **Dried mango** slices for the winter

## The Neem Tree

We had an old **Neem tree** in our compound. During monsoons, we'd:

1. Collect **neem leaves** for their medicinal properties
2. Hang them in our rooms to *ward off mosquitoes*
3. Use them to treat small wounds and cuts
4. Add them to *bath water* for their benefits

---

## Evening Rituals

As evening approached and the **rain slowed to a drizzle**:

- We'd light **oil lamps** around the house
- Gather in the main room
- Listen to elders' stories
- Drink hot milk with a pinch of turmeric
- Fall asleep to the sound of rain on the roof

### The Sound of Rain

> "The patter of rain on our tin roof was nature's lullaby. No music could be sweeter, no sound more comforting."

---

## What Those Days Taught Us

The monsoon season taught me:

- **Patience** — waiting for the rains to arrive
- **Joy in simple things** — playing in puddles and eating mangoes
- **Community** — sharing the harvest with neighbors
- **Gratitude** — for every drop of rain that fed our crops
- **Togetherness** — family bonding during long rainy evenings

The **mango trees** are still there, though I'm no longer there to see them. But whenever it rains, wherever I am, I close my eyes and I'm back in that courtyard, eight years old again, waiting for mangoes to fall.

> "Some memories are like mangoes fallen in the rain—sweet, precious, and impossible to recreate. But oh, how wonderful that we had them at all."

---

*Preserved in memory, sweetened by time, like the taste of ripe mangoes in monsoon*`,
    },
    divya_blog_4: {
      id: "divya_blog_4",
      user_id: "divya_user_1",
      memory_space_id: "divya_space_4",
      title: "The Old Haveli and Joint Family Days",
      grandparent_name: "Nani Ji",
      created_at: new Date(Date.now() - 28 * 24 * 60 * 60 * 1000).toISOString(),
      updated_at: new Date(Date.now() - 28 * 24 * 60 * 60 * 1000).toISOString(),
      markdown_content: `# The Old Haveli and Joint Family Days

*A memory shared by Nani Ji*

---

## The Haveli

Our family **haveli** stood in the old part of the city, a three-story structure with **thick walls** and **high ceilings** that kept us cool even in the fiercest summer heat.

The building was over *150 years old*, built by my husband's great-grandfather. It had:

### Architectural Beauty

- A central **courtyard** (*angan*) where all life revolved
- **Carved wooden balconies** (*jharokhas*) overlooking the street
- **Jali work** (latticed windows) allowing breeze but ensuring privacy
- **Hand-painted frescoes** on the walls
- A **terrace** where we slept during hot summer nights
- **Twenty-two rooms** spread across three floors

> "The haveli wasn't just a house—it was a living, breathing witness to four generations of our family's joys and sorrows."

## The Joint Family

In those days, **joint families** were the norm, not the exception. Our haveli housed:

- My *parents-in-law* (head of the household)
- My husband and I
- His **three brothers** and their wives
- His **two unmarried sisters**
- **Fifteen grandchildren** ranging from infants to teenagers
- *Two domestic helpers* who were like family

**Twenty-five people** under one roof, and somehow, it worked beautifully.

---

## Daily Life in the Haveli

### Morning Rituals

The haveli would wake up at **dawn**:

1. **Dadaji** (father-in-law) would do his morning prayers
2. **Women** would start preparing breakfast
3. **Children** would get ready for school
4. **Men** would leave for work one by one
5. The **courtyard** would be swept and washed clean

The morning *chai* was served in the courtyard, where everyone gathered for a few precious minutes before the day's chaos began.

### The Communal Kitchen

The **kitchen** was the heart of the haveli:

- One *large chulha* (clay stove) that could cook for thirty people
- Brass and copper utensils hanging on the walls
- *Huge vessels* for dal, rice, and vegetables
- A **grinding stone** for making spices
- Storage bins for grains, lentils, and pickles

All the **women** would cook together:
- Grinding masalas
- Rolling rotis
- Stirring huge pots of curry
- Preparing pickles and preserves
- Chatting and laughing all the while

> "The kitchen was where bonds were formed, where recipes were passed down, where the young learned from the old, where we became a family through the simple act of cooking together."

---

## Festivals and Celebrations

### Diwali in the Haveli

**Diwali** was magical:

- Every room, every corner lit with *diyas* (oil lamps)
- The courtyard decorated with **rangoli**
- *Fireworks* lighting up the terrace
- **Sweets** made by all the women together: *laddoos*, *barfi*, *jalebi*, *kaju katli*
- **New clothes** for everyone
- The whole haveli glowing like a jewel in the darkness

### Weddings and Ceremonies

When there was a **wedding** in the family:

- The haveli would be decorated with *marigold flowers*
- **Musicians** would play in the courtyard
- Relatives would come from far and wide
- The *terrace* would be converted into a sleeping area for guests
- Food would be cooked for *hundreds* of people
- Celebrations would last for **days**

---

## The Children's World

For us children, the haveli was an **adventure playground**:

### Games We Played

- **Hide and seek** across three floors (22 rooms!)
- **Gully danda** and **marbles** in the courtyard
- **Flying kites** from the terrace
- **Hopscotch** (*stapu*) in the corridors
- **Storytelling** sessions with *Dadaji* after dinner

### The Terrace

The **terrace** (*chhath*) was our kingdom:

- Where we **slept** under the stars in summer
- Flew **kites** during Makar Sankranti
- Dried **pickles** and *papads* in the sun
- Studied for exams under the **moonlight**
- Had secret **teenage conversations**

> "The terrace was where dreams were born, where we looked at the stars and wondered about our future, where the world seemed both infinite and intimate."

---

## The Joint Family System

### What Made It Work

Living with *25 people* wasn't always easy, but it taught us:

#### Sharing and Caring

- **One income** supported multiple families
- **Resources** were pooled and shared fairly
- **Children** were raised by all adults, not just parents
- **Elders** were respected and cared for
- **Responsibilities** were divided among all

#### Support System

When someone was:
- **Sick** — everyone pitched in to help
- **Sad** — there was always someone to console them
- **Happy** — the joy was multiplied by sharing
- **Struggling** — the family stood together

### The Challenges

Of course, it wasn't perfect:

- **Privacy** was a luxury
- **Disagreements** happened (who would use the bathroom first?)
- **Different opinions** on child-rearing
- **Adjustment** required from everyone
- **Personal space** was minimal

But somehow, the **benefits outweighed the challenges**.

---

## The Courtyard — Heart of the Home

The central **courtyard** was where life happened:

### Morning to Night

- **Early morning** — women drawing rangoli
- **Afternoon** — children playing during school holidays
- **Evening** — everyone gathering to chat
- **Night** — families eating dinner together
- **Festivals** — the main stage for celebrations

### The Tulsi Plant

In the center of the courtyard grew our sacred **Tulsi plant**:

- We watered it every morning
- Lit a *diya* next to it every evening
- Prayed there during festivals
- Made *tulsi chai* when someone was sick
- Considered it the **guardian** of our home

> "The courtyard was like the heart—everything circulated through it, everyone passed through it, and it kept the whole haveli alive."

---

## Meals Together

### Dining Customs

Every meal was a **communal affair**:

1. Food served in the **courtyard** or main hall
2. **Men** ate first (old customs, different times)
3. **Women** ate together after
4. **Children** ate whenever they were hungry
5. Everyone sitting on the floor with **thalis** (plates)

The food was simple but abundant:
- *Dal*, *roti*, *sabzi*, *rice*
- *Achaar* (pickle) made at home
- *Dahi* (yogurt) from the local *gwala*
- *Ghee* prepared by the women
- Seasonal vegetables from the market

---

## The Eventual Change

### When the Haveli Emptied

Gradually, things changed:

- **Brothers** got better job opportunities in other cities
- **Children** grew up and moved for education
- The **joint family** began to split into nuclear families
- Modern apartments became more attractive than old havelis
- The upkeep of the haveli became too expensive

One by one, families moved out. The haveli that once echoed with *25 voices* began to fall silent.

### What We Lost

When the joint family system broke:

- **Emotional support** became harder to find
- **Children** grew up without their cousins as siblings
- **Elders** lived alone instead of surrounded by family
- **Festivals** became smaller, less joyous
- **Traditions** began to fade

> "We gained independence, privacy, and modern comforts. But we lost something irreplaceable—the warmth of family, the security of togetherness, the knowledge that we were never alone."

---

## Looking Back

Now, when I visit the old haveli (it's been converted into separate apartments), I see:

- The courtyard **covered** with a cement roof
- The *jharokhas* **sealed** shut
- The terrace **divided** by walls
- The kitchen **modernized** beyond recognition
- The soul of the place **gone**

But in my memories, it's still alive:
- Full of laughter and voices
- Smelling of *incense* and *home-cooked food*
- Echoing with children's games
- Warm with family love
- Perfect in its imperfection

> "The haveli taught me that wealth isn't measured in rupees, but in relationships. That happiness isn't found in space, but in togetherness. That the best inheritance isn't property, but memories."

---

*Preserved with love, remembering the days when family meant everything and home was where everyone belonged*`,
    },
  };

  return blogsMap[blogId] || null;
}

// Convert conversation session to blog
export async function convertSessionToBlog(data: {
  memory_space_id: string;
  session_messages: ConversationMessage[];
}): Promise<MemoryBlog> {
  await delay(2000); // Simulate AI processing time

  const memorySpace = JSON.parse(
    localStorage.getItem("current_memory_space") || "{}"
  );
  const user = getUserFromStorage();

  // Generate markdown from conversation
  const markdownContent = generateMarkdownFromConversation(
    data.session_messages,
    memorySpace.grandparent_name
  );

  const blog: MemoryBlog = {
    id: generateId(),
    user_id: user?.id || "unknown",
    memory_space_id: data.memory_space_id,
    title: extractTitleFromConversation(data.session_messages),
    markdown_content: markdownContent,
    grandparent_name: memorySpace.grandparent_name,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  // Store in localStorage
  const email = user?.email || "demo@example.com";
  const existingBlogs = JSON.parse(
    localStorage.getItem(`blogs_${email}`) || "[]"
  );
  existingBlogs.unshift(blog); // Add to beginning
  localStorage.setItem(`blogs_${email}`, JSON.stringify(existingBlogs));

  return blog;
}

// Helper function to extract title from conversation
function extractTitleFromConversation(messages: ConversationMessage[]): string {
  // Simple logic: use the first user message or generate from content
  const firstUserMessage = messages.find((m) => m.role === "user");
  if (firstUserMessage) {
    const words = firstUserMessage.content.split(" ").slice(0, 6);
    return (
      words.join(" ") +
      (firstUserMessage.content.split(" ").length > 6 ? "..." : "")
    );
  }
  return "A Precious Memory";
}

// Helper function to generate markdown from conversation
function generateMarkdownFromConversation(
  messages: ConversationMessage[],
  grandparentName: string
): string {
  const title = extractTitleFromConversation(messages);

  let markdown = `# ${title}\n\n`;
  markdown += `*A memory shared by ${grandparentName}*\n\n`;
  markdown += `---\n\n`;

  // Extract user messages (the actual memories)
  const userMessages = messages.filter((m) => m.role === "user");

  if (userMessages.length > 0) {
    markdown += `## The Story\n\n`;

    userMessages.forEach((msg, index) => {
      if (index > 0) markdown += `\n\n`;
      markdown += msg.content;
    });

    markdown += `\n\n---\n\n`;
    markdown += `> "Every memory is a treasure, a piece of our legacy passed down through generations."\n\n`;
    markdown += `*Captured on ${new Date().toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })}*`;
  }

  return markdown;
}
