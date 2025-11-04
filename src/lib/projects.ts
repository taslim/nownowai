export interface Project {
  title: string;
  description: string;
  slug: string | null; // If internal, route to /{slug}
  live: string | null; // If external, link here
  github: string | null;
  tags: string[];
}

export const projects: Project[] = [
  {
    title: "ArticleSound",
    description: "Turn your articles into natural-sounding audio",
    slug: null,
    live: "https://www.articlesound.app",
    github: null,
    tags: ["audio", "tts", "ai"],
  },
  {
    title: "Prompts Library",
    description: "Collection of resuable AI prompts and rules",
    slug: null,
    live: "https://prompts.nownow.ai",
    github: "https://github.com/taslim/prompts",
    tags: ["tool", "utility", "ai"],
  },
  {
    title: "SnapNSplit",
    description: "Split bills effortlessly with friends",
    slug: null,
    live: "https://snapnsplit.com",
    github: null,
    tags: ["tool", "utility", "finance"],
  },
  {
    title: "Words Speller (NATO)",
    description:
      "Spell your name clearly over the phone using NATO phonetic alphabet",
    slug: "spell-name",
    live: null,
    github: null,
    tags: ["tool", "utility"],
  },
  {
    title: "Convo Sparks",
    description:
      "Conversation topics that spark connection, reflection, and joy",
    slug: null,
    live: "https://convosparks.com",
    github: null,
    tags: [],
  },
  {
    title: "USPS Mail Alerts Apps Script",
    description:
      "Automatically create Google Tasks reminders based on USPS Informed Delivery emails",
    slug: null,
    live: "https://github.com/taslim/usps-mail-alerts",
    github: "https://github.com/taslim/usps-mail-alerts",
    tags: [],
  },
  {
    title: "Fortune Cookie",
    description: "Get daily fortune cookies from a single tap",
    slug: "fortune",
    live: null,
    github: null,
    tags: [],
  },
  {
    title: "Tip Calculator",
    description: "Calculate tips from your bill",
    slug: "tip",
    live: null,
    github: null,
    tags: ["tool", "utility"],
  },
];
