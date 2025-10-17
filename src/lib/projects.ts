export interface Project {
  title: string;
  description: string;
  live: string;
  github: string | null;
}

export const projects: Project[] = [
  {
    title: "Convo Sparks",
    description:
      "Conversation topics that spark connection, reflection, and joy",
    github: null,
    live: "https://convosparks.com",
  },
  {
    title: "USPS Mail Alerts Apps Script",
    description:
      "Automatically create Google Tasks reminders based on USPS Informed Delivery emails",
    github: "https://github.com/taslim/usps-mail-alerts",
    live: "https://github.com/taslim/usps-mail-alerts",
  },
  {
    title: "Fortune Cookie",
    description: "Get daily fortune cookies from a single tap",
    github: "https://github.com/taslim/fortunekeeper",
    live: "https://fortune.nownow.ai",
  },
  {
    title: "Tip Calculator",
    description: "Calculate tips from your bill",
    github: null,
    live: "https://bill.nownow.ai",
  },
];
