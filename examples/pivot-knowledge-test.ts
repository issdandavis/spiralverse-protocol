/*
 * ═══════════════════════════════════════════════════════════════════════════
 * SPIRALVERSE PROTOCOL TEST - PIVOT KNOWLEDGE SYSTEM
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * Welcome to the Spiralverse! This test demonstrates how an AI can "pivot"
 * between related topics during a conversation, making interactions feel
 * more natural and exploratory.
 *
 * Think of it like a conversation with a friend - they might start talking
 * about cooking and naturally drift into discussing travel or health!
 */

console.log("═══════════════════════════════════════════════════════════════════");
console.log("    SPIRALVERSE PROTOCOL - PIVOT KNOWLEDGE SYSTEM TEST ");
console.log("═══════════════════════════════════════════════════════════════════\n");

// ═══════════════════════════════════════════════════════════════════════════
// PART 1: THE 6 SACRED LANGUAGES
// ═══════════════════════════════════════════════════════════════════════════
// In the Spiralverse, there are 6 ancient languages used for encoding messages.
// Each language has its own character set and purpose.

console.log(" PART 1: Introducing the 6 Sacred Languages...\n");

interface SacredLanguage {
  name: string;
  description: string;
  symbols: string[];
  element: string;
}

const SACRED_LANGUAGES: Record<string, SacredLanguage> = {
  PRISMATA: {
    name: "Prismata",
    description: "The language of light and clarity - used for logical reasoning",
    symbols: ["◇", "◈", "◆", "⬡", "⬢", "✧", "✦", "★"],
    element: "Light",
  },
  AETHERIC: {
    name: "Aetheric",
    description: "The language of air and thought - used for abstract concepts",
    symbols: ["≋", "≈", "∿", "〰", "⌇", "⌁", "∾", "∞"],
    element: "Air",
  },
  VERDANT: {
    name: "Verdant",
    description: "The language of nature and growth - used for organic topics",
    symbols: ["❀", "✿", "❁", "❃", "✾", "❋", "✽", "❊"],
    element: "Earth",
  },
  EMBER: {
    name: "Ember",
    description: "The language of fire and passion - used for emotional expression",
    symbols: ["✺", "⚡", "✴", "✳", "✵", "❂", "☀", "⚙"],
    element: "Fire",
  },
  CELESTIAL: {
    name: "Celestial",
    description: "The language of stars and destiny - used for cosmic wisdom",
    symbols: ["☆", "✡", "✶", "✷", "✸", "✹", "⚝", "✪"],
    element: "Cosmos",
  },
  ABYSSAL: {
    name: "Abyssal",
    description: "The language of depths and mystery - used for hidden knowledge",
    symbols: ["◉", "◎", "●", "○", "◌", "◍", "◐", "◑"],
    element: "Water",
  },
};

// Let's display all the Sacred Languages!
console.log("   The Spiralverse recognizes 6 Sacred Languages:\n");
Object.values(SACRED_LANGUAGES).forEach((lang, index) => {
  console.log(`   ${index + 1}. ${lang.name} (Element: ${lang.element})`);
  console.log(`       ${lang.description}`);
  console.log(`       Symbols: ${lang.symbols.join(" ")}\n`);
});

// ═══════════════════════════════════════════════════════════════════════════
// PART 2: THE PIVOT KNOWLEDGE CLASS
// ═══════════════════════════════════════════════════════════════════════════
// This is the heart of our system! The PivotKnowledge class maintains a
// "topic graph" - a map showing how topics connect to each other.

console.log("\n PART 2: Building the Pivot Knowledge System...\n");

class PivotKnowledge {
  private topicGraph: Map<string, string[]>;
  private currentTopic: string;
  private pivotHistory: string[];

  constructor() {
    console.log("    Initializing PivotKnowledge class...");

    this.topicGraph = new Map();
    this.currentTopic = "";
    this.pivotHistory = [];

    this.initializeTopicGraph();

    console.log("   ✅ Topic graph initialized with", this.topicGraph.size, "main topics!\n");
  }

  private initializeTopicGraph(): void {
    console.log("    Creating topic connections (adjacent topics)...\n");

    this.topicGraph.set("programming", [
      "algorithms",
      "databases",
      "web development",
      "AI",
      "cybersecurity",
    ]);

    this.topicGraph.set("cooking", [
      "nutrition",
      "food science",
      "travel cuisine",
      "gardening",
      "chemistry",
    ]);

    this.topicGraph.set("music", [
      "mathematics",
      "physics of sound",
      "emotions",
      "culture",
      "technology",
    ]);

    this.topicGraph.set("astronomy", [
      "physics",
      "mythology",
      "navigation",
      "time",
      "philosophy",
    ]);

    this.topicGraph.set("history", [
      "archaeology",
      "geography",
      "politics",
      "art",
      "economics",
    ]);

    this.topicGraph.set("psychology", [
      "neuroscience",
      "philosophy",
      "behavior",
      "dreams",
      "creativity",
    ]);

    console.log("   Here's how our topics connect:\n");
    this.topicGraph.forEach((adjacent, main) => {
      console.log(`    "${main}" can pivot to:`);
      console.log(`      └─ ${adjacent.join(", ")}\n`);
    });
  }

  setCurrentTopic(topic: string): void {
    console.log(`\n    Setting current topic to: "${topic}"`);
    this.currentTopic = topic;
    this.pivotHistory.push(topic);
  }

  pivot(): string | null {
    console.log("\n    PIVOT REQUESTED!");
    console.log(`    Current topic: "${this.currentTopic}"`);

    const adjacentTopics = this.topicGraph.get(this.currentTopic);

    if (!adjacentTopics || adjacentTopics.length === 0) {
      console.log("   ⚠️  No adjacent topics found! Cannot pivot.");
      return null;
    }

    console.log(`    Available adjacent topics: ${adjacentTopics.join(", ")}`);

    const randomIndex = Math.floor(Math.random() * adjacentTopics.length);
    const newTopic = adjacentTopics[randomIndex];

    console.log(`    Random selection (index ${randomIndex}): "${newTopic}"`);

    this.pivotHistory.push(newTopic);
    this.currentTopic = newTopic;

    console.log(`   ✨ Successfully pivoted to: "${newTopic}"\n`);

    return newTopic;
  }

  getAdjacentTopics(topic: string): string[] {
    return this.topicGraph.get(topic) || [];
  }

  addTopic(mainTopic: string, adjacentTopics: string[]): void {
    console.log(`\n   ➕ Adding new topic: "${mainTopic}"`);
    console.log(`      Adjacent topics: ${adjacentTopics.join(", ")}`);
    this.topicGraph.set(mainTopic, adjacentTopics);
  }

  getPivotHistory(): string[] {
    return [...this.pivotHistory];
  }

  displayPivotHistory(): void {
    console.log("\n    PIVOT HISTORY:");
    console.log("   " + this.pivotHistory.join(" → "));
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// PART 3: MESSAGE ENCRYPTION SIMULATION
// ═══════════════════════════════════════════════════════════════════════════
// In the Spiralverse, messages are encrypted using the Sacred Languages.
// Each character gets transformed into a symbol from one of the languages!

console.log("\n PART 3: Message Encryption Simulation...\n");

class SpiralverseEncryptor {
  private selectedLanguage: SacredLanguage;

  constructor(languageKey: keyof typeof SACRED_LANGUAGES = "PRISMATA") {
    this.selectedLanguage = SACRED_LANGUAGES[languageKey];
    console.log(`    Encryptor initialized with ${this.selectedLanguage.name} language`);
  }

  encrypt(message: string): string {
    console.log(`\n    Original message: "${message}"`);
    console.log(`    Encrypting with ${this.selectedLanguage.name}...`);

    const symbols = this.selectedLanguage.symbols;
    let encrypted = "";

    for (const char of message) {
      if (char === " ") {
        encrypted += " ";
      } else {
        const charCode = char.charCodeAt(0);
        const symbolIndex = charCode % symbols.length;
        encrypted += symbols[symbolIndex];
      }
    }

    console.log(`    Encrypted result: "${encrypted}"`);
    return encrypted;
  }

  getLanguageInfo(): SacredLanguage {
    return this.selectedLanguage;
  }

  switchLanguage(languageKey: keyof typeof SACRED_LANGUAGES): void {
    this.selectedLanguage = SACRED_LANGUAGES[languageKey];
    console.log(`\n    Switched to ${this.selectedLanguage.name} language`);
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// PART 4: TEST FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════
// Now let's put everything together and run some
console.log("\n PART 4: Running Test Functions...\n");

function testPivoting(): void {
  console.log("═══════════════════════════════════════════════════════════════════");
  console.log("   TEST 1: TOPIC PIVOTING");
  console.log("═══════════════════════════════════════════════════════════════════\n");

  console.log("   Let's simulate an AI conversation that pivots between topics!\n");

  const pivotKnowledge = new PivotKnowledge();

  console.log("\n   --- Starting Conversation ---\n");

  pivotKnowledge.setCurrentTopic("programming");
  console.log("    AI: 'Let me tell you about programming...'");

  console.log("\n   [User asks a question that triggers a pivot...]");
  pivotKnowledge.pivot();
  console.log("    AI: 'That reminds me of something related...'");

  console.log("\n   [Another question leads to another pivot...]");
  pivotKnowledge.pivot();
  console.log("    AI: 'This connects to yet another fascinating topic!'");

  pivotKnowledge.displayPivotHistory();

  console.log("\n   ✅ Test 1 Complete!\n");
}

function testMultiplePivots(): void {
  console.log("═══════════════════════════════════════════════════════════════════");
  console.log("   TEST 2: MULTIPLE PIVOT CHAINS");
  console.log("═══════════════════════════════════════════════════════════════════\n");

  console.log("   Let's see how different starting topics create different paths!\n");

  const topics = ["cooking", "music", "astronomy"];

  topics.forEach((startTopic, index) => {
    console.log(`\n   ─── Chain ${index + 1}: Starting with "${startTopic}" ───\n`);

    const knowledge = new PivotKnowledge();
    knowledge.setCurrentTopic(startTopic);

    for (let i = 0; i < 3; i++) {
      knowledge.pivot();
    }

    knowledge.displayPivotHistory();
  });

  console.log("\n   ✅ Test 2 Complete!\n");
}

function testEncryption(): void {
  console.log("═══════════════════════════════════════════════════════════════════");
  console.log("   TEST 3: MESSAGE ENCRYPTION");
  console.log("═══════════════════════════════════════════════════════════════════\n");

  console.log("   Encrypting messages with different Sacred Languages!\n");

  const testMessage = "Hello Spiralverse";

  const languageKeys: (keyof typeof SACRED_LANGUAGES)[] = [
    "PRISMATA",
    "AETHERIC",
    "VERDANT",
    "EMBER",
    "CELESTIAL",
    "ABYSSAL",
  ];

  languageKeys.forEach((langKey) => {
    const encryptor = new SpiralverseEncryptor(langKey);
    encryptor.encrypt(testMessage);
    console.log("");
  });

  console.log("   ✅ Test 3 Complete!\n");
}

function testCustomTopics(): void {
  console.log("═══════════════════════════════════════════════════════════════════");
  console.log("   TEST 4: ADDING CUSTOM TOPICS");
  console.log("═══════════════════════════════════════════════════════════════════\n");

  console.log("   The PivotKnowledge system is extensible! Let's add new topics.\n");

  const knowledge = new PivotKnowledge();

  knowledge.addTopic("gaming", [
    "storytelling",
    "graphics",
    "social interaction",
    "problem solving",
    "music",
  ]);

  knowledge.addTopic("photography", [
    "light physics",
    "composition",
    "travel",
    "technology",
    "art history",
  ]);

  console.log("\n   Now let's pivot from these new topics:\n");

  knowledge.setCurrentTopic("gaming");
  knowledge.pivot();
  knowledge.pivot();

  knowledge.displayPivotHistory();

  console.log("\n   ✅ Test 4 Complete!\n");
}

function testConversationSimulation(): void {
  console.log("═══════════════════════════════════════════════════════════════════");
  console.log("   TEST 5: FULL CONVERSATION SIMULATION");
  console.log("═══════════════════════════════════════════════════════════════════\n");

  console.log("   Simulating a complete AI conversation with pivots and encryption!\n");

  const knowledge = new PivotKnowledge();
  const encryptor = new SpiralverseEncryptor("CELESTIAL");

  const conversationSteps = [
    { topic: "psychology", message: "The mind is fascinating" },
    { pivot: true, message: "This connects deeply" },
    { pivot: true, message: "Let me share more" },
  ];

  console.log("   ─── Conversation Begin ───\n");

  conversationSteps.forEach((step, index) => {
    console.log(`   [Step ${index + 1}]`);

    if ("topic" in step && step.topic) {
      knowledge.setCurrentTopic(step.topic);
    } else if (step.pivot) {
      knowledge.pivot();
    }

    console.log(`    AI says: "${step.message}"`);
    encryptor.encrypt(step.message);
    console.log("");
  });

  console.log("   ─── Conversation End ───");

  knowledge.displayPivotHistory();

  console.log("\n   ✅ Test 5 Complete!\n");
}

// ═══════════════════════════════════════════════════════════════════════════
// RUN ALL TESTS
// ═══════════════════════════════════════════════════════════════════════════

console.log("\n RUNNING ALL TESTS...\n");

testPivoting();
testMultiplePivots();
testEncryption();
testCustomTopics();
testConversationSimulation();

// Final summary
console.log("═══════════════════════════════════════════════════════════════════");
console.log("    FINAL SUMMARY");
console.log("═══════════════════════════════════════════════════════════════════\n");

console.log("   ✅ All 5 tests completed successfully!\n");
console.log("   Key Concepts Demonstrated:");
console.log("   • 6 Sacred Languages with unique symbols");
console.log("   • PivotKnowledge class with topic graph");
console.log("   • Random pivot() method for natural conversation flow");
console.log("   • Message encryption using Sacred Language symbols");
console.log("   • Extensible system for adding custom topics\n");

console.log("    Thank you for exploring the Spiralverse Protocol! \n");
console.log("═══════════════════════════════════════════════════════════════════\n");
