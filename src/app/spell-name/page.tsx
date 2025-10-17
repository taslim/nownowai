"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

interface NATOResult {
  char: string;
  nato: string;
  isLetter: boolean;
}

const natoAlphabet: Record<string, string> = {
  A: "Alfa",
  B: "Bravo",
  C: "Charlie",
  D: "Delta",
  E: "Echo",
  F: "Foxtrot",
  G: "Golf",
  H: "Hotel",
  I: "India",
  J: "Juliett",
  K: "Kilo",
  L: "Lima",
  M: "Mike",
  N: "November",
  O: "Oscar",
  P: "Papa",
  Q: "Quebec",
  R: "Romeo",
  S: "Sierra",
  T: "Tango",
  U: "Uniform",
  V: "Victor",
  W: "Whiskey",
  X: "X-ray",
  Y: "Yankee",
  Z: "Zulu",
};

const convertToNATO = (text: string): NATOResult[] => {
  return text
    .toUpperCase()
    .split("")
    .map((char) => {
      if (char in natoAlphabet) {
        return { char, nato: natoAlphabet[char]!, isLetter: true };
      } else if (char === " ") {
        return { char, nato: "·", isLetter: false };
      } else if (/[0-9]/.test(char)) {
        return { char, nato: char, isLetter: false };
      }
      return null;
    })
    .filter((item): item is NATOResult => item !== null);
};

export default function SpellNamePage() {
  const [input, setInput] = useState("");
  const [copied, setCopied] = useState(false);

  const result = convertToNATO(input);
  const natoText = result.map((item) => item.nato).join(" ");

  const copyToClipboard = () => {
    void navigator.clipboard.writeText(natoText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-50 p-6 dark:bg-neutral-900">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="mb-12">
          <h1 className="mb-2 text-3xl font-light tracking-tight text-neutral-900 dark:text-neutral-100">
            NATO Phonetic Alphabet
          </h1>
          <p className="text-sm font-light text-neutral-500 dark:text-neutral-400">
            Spell clearly over the phone
          </p>
        </div>

        {/* Input Section */}
        <div className="mb-8">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter your name..."
            className="w-full border-0 border-b border-neutral-200 bg-transparent px-0 py-4 text-2xl font-light text-neutral-900 transition-colors placeholder:text-neutral-300 focus:border-neutral-900 focus:outline-none dark:border-neutral-700 dark:text-neutral-100 dark:placeholder:text-neutral-600 dark:focus:border-neutral-400"
            autoFocus
          />
        </div>

        {/* Results Section */}
        {result.length > 0 && (
          <div className="space-y-8">
            {/* Letter Display */}
            <div className="flex flex-wrap gap-6">
              {result.map((item, index) => (
                <div key={index} className="flex flex-col items-start gap-1">
                  <div className="text-5xl leading-none font-light text-neutral-300 dark:text-neutral-600">
                    {item.char}
                  </div>
                  <div className="text-sm font-light tracking-wide text-neutral-900 dark:text-neutral-100">
                    {item.nato}
                  </div>
                </div>
              ))}
            </div>

            {/* Copy Button */}
            <div className="pt-4">
              <button
                onClick={copyToClipboard}
                className="flex items-center gap-2 rounded border border-neutral-200 px-4 py-2 text-sm font-light text-neutral-600 transition-colors hover:border-neutral-300 hover:text-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:hover:border-neutral-600 dark:hover:text-neutral-200"
              >
                {copied ? (
                  <>
                    <Check size={14} />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy size={14} />
                    Copy
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Empty State */}
        {result.length === 0 && <div className="py-24"></div>}
      </div>
    </div>
  );
}
