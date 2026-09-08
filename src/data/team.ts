export type TeamMember = {
  id: string;
  name: string;
  role: string;
  description: string;
  category: string;
  image: string;
  /** CSS object-position, e.g. "center top" */
  imagePosition?: string;
  profileUrl: string;
  linkedinUrl?: string;
  githubUrl?: string;
  instagramUrl?: string;
};

export const teamMembers: TeamMember[] = [
  {
    id: "rajesh-sharma",
    name: "Rajesh Sharma",
    role: "Founder Director",
    description:
      "Visionary wealth strategist and Founder Director with over 25+ years guiding high-net-worth families, equity investments, and multi-generational portfolio growth.",
    category: "Founder & Leadership",
    image: "/images/team/member-1.png",
    imagePosition: "center 18%",
    profileUrl: "/contact",
    linkedinUrl: "https://www.linkedin.com/",
  },
  {
    id: "amit-patel",
    name: "Amit Patel",
    role: "Executive Director",
    description:
      "Executive Director spearheading portfolio architecture, institutional client advisory, operations, and disciplined capital allocation across market cycles.",
    category: "Executive Leadership",
    image: "/images/team/member-2.png",
    imagePosition: "center 12%",
    profileUrl: "/contact",
    linkedinUrl: "https://www.linkedin.com/",
  },
  {
    id: "vikram-mehta",
    name: "Vikram Mehta",
    role: "Managing Director & CIO",
    description:
      "Leading institutional investment research, alternative assets, and bespoke wealth strategy tailored for high-net-worth families and family offices.",
    category: "Investment Strategy",
    image: "/images/team/member-3.png",
    imagePosition: "center 18%",
    profileUrl: "/contact",
    linkedinUrl: "https://www.linkedin.com/",
  },
];

export const TEAM_MEMBERS = teamMembers;
