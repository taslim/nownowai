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
    title: "SnapNSplit",
    description: "Split bills effortlessly with friends",
    slug: null,
    live: "https://snapnsplit.com",
    github: null,
    tags: ["tool", "utility", "finance"],
  },
  {
    title: "Words Speller (NATO)",
    description: "Spell your name clearly over the phone using NATO phonetic alphabet",
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
    slug: null,
    live: "https://fortune.nownow.ai",
    github: "https://github.com/taslim/fortunekeeper",
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
