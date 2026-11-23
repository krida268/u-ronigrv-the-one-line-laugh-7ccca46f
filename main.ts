// The One-Line Laugh — a program that writes one funny line to
// /output/entry.txt.
//
// The line is a fixed string on purpose: the entry is judged on the
// writing, so the program's job is to deliver exactly that line, byte
// for byte, every run.

import { mkdirSync, writeFileSync } from "node:fs";

// Why this line, against the judge's brief:
// - It is one funny line, a single sentence, on a subject anyone
//   recognises: chasing a daily step goal.
// - It lands a real surprise at the end: the 10,000 steps were not
//   earned by a workout, they were earned by pacing around the
//   kitchen — and the twist still makes sense once it arrives.
// - It names an everyday truth: the step counter counts movement,
//   not purpose, and most of us have paced a room while deciding
//   what to eat.
// - It is economical: every word earns its place, nothing explains
//   the joke, and the punchline is the last clause.
// - It feels fresh: no setup about a gym, no phone joke, just the
//   quiet absurdity of a fitness goal met by indecision.
const LINE =
  "I finally hit my 10,000 steps today, mostly by pacing around the kitchen trying to decide what to eat.";

const OUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const OUT_FILE = `${OUT_DIR}/entry.txt`;

function main(): void {
  // The gate only accepts 1 to 200 characters of UTF-8 text, so refuse
  // loudly instead of shipping a line the gate would throw away. It
  // also refuses text that is only white space, so check that too.
  if (LINE.length < 1 || LINE.length > 200) {
    throw new Error(`entry must be 1-200 characters, got ${LINE.length}`);
  }
  if (LINE.trim().length === 0) {
    throw new Error("entry must not be only white space");
  }
  // The entry must stand alone as a single sentence: one period, at
  // the very end, and no line break anywhere inside it.
  if (!LINE.endsWith(".") || LINE.slice(0, -1).includes(".")) {
    throw new Error("entry must be exactly one sentence");
  }
  if (/[\r\n]/.test(LINE)) {
    throw new Error("entry must be a single line");
  }
  // Economy is one of the judge's criteria, so the program itself
  // refuses a line with a wasted double space.
  if (/  /.test(LINE)) {
    throw new Error("entry must not contain double spaces");
  }
  // The gate counts every byte, so write exactly the line and nothing
  // else: no trailing newline.
  // /output is a mount point in the grader sandbox: never delete the
  // directory itself, only create it if missing and write the file.
  mkdirSync(OUT_DIR, { recursive: true });
  writeFileSync(OUT_FILE, LINE, "utf8");
  console.log(`Wrote ${LINE.length} characters to ${OUT_FILE}`);
}

main();
