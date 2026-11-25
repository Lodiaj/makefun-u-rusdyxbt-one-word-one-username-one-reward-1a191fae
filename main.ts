import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry for "One Word, One Username, One Reward": our own make.fun
// username, one word and nothing else.
const USERNAME = "brayen-suryanto";

// Gate validation (RULES.txt): entry.txt must be UTF-8 text of 1-30
// characters, not only whitespace, and a single word with no spaces,
// padding or gloss tacked on. Fail loudly instead of writing a bad entry.
function validateEntry(word: string): void {
  if (word.length < 1 || word.length > 30) {
    throw new Error(`entry must be 1-30 characters, got ${word.length}`);
  }
  if (word.trim() !== word || /\s/.test(word)) {
    throw new Error("entry must be a single word with no whitespace");
  }
  if (word !== USERNAME) {
    throw new Error("entry must be exactly our own make.fun username");
  }
}

validateEntry(USERNAME);

const outDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), USERNAME, "utf8");
console.log(USERNAME);
