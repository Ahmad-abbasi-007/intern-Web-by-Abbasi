export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: 'web' | 'mobile' | 'graphic' | 'all';
  imageUrl: string;
  description: string;
  client: string;
  date: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  imageUrl: string;
  socials: {
    facebook: string;
    twitter: string;
    linkedin: string;
    github?: string;
  };
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  avatarUrl: string;
}

export interface ProcessStep {
  id: string;
  stepNumber: string;
  title: string;
  description: string;
  iconName: string;
}

export interface StatItem {
  id: string;
  value: number;
  label: string;
  suffix?: string;
}

export const servicesData: ServiceItem[] = [
  {
    id: 'graphic-design',
    title: 'Graphic Design',
    description: 'Every detail has been crafted with absolute precision, offering stunning modern visuals, custom color strategies, and gorgeous brand identity materials.',
    iconName: 'Palette',
  },
  {
    id: 'web-design',
    title: 'Web Design',
    description: 'Specializing in high-performance, fast-loading, state-of-the-art responsive websites optimized across modern tablets, phones, and ultra-wide desktops.',
    iconName: 'Monitor',
  },
  {
    id: 'mobile-app',
    title: 'Mobile App',
    description: 'We develop highly immersive, custom-tailored mobile applications designed of the future, optimizing for deep interactions and flawless animations.',
    iconName: 'Smartphone',
  },
];

export const portfolioData: PortfolioItem[] = [
  {
    id: 'work-1',
    title: 'Colorlib Mobile App',
    category: 'mobile',
    imageUrl: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=800',
    description: 'A revolutionary fintech dashboard app designed with sleek typography, custom transition curves, and dark slate backgrounds.',
    client: 'FinTech Corp',
    date: 'March 2026',
  },
  {
    id: 'work-2',
    title: 'Minimalist Branding Identity',
    category: 'graphic',
    imageUrl: 'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?auto=format&fit=crop&q=80&w=800',
    description: 'A comprehensive visual redesign for a carbon-neutral logistic company, framing simplicity and high eco-conscious principles.',
    client: 'EcoLogistics Ltd',
    date: 'January 2026',
  },
  {
    id: 'work-3',
    title: 'Modern E-Commerce Portal',
    category: 'web',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
    description: 'State-of-the-art storefront implementing lightning-fast search vectors, seamless credit checkups, and client-side checkouts.',
    client: 'Nordic Styles',
    date: 'December 2025',
  },
  {
    id: 'work-4',
    title: 'Augmented Reality interface',
    category: 'mobile',
    imageUrl: 'https://images.unsplash.com/photo-1555538995-7ccc762816e4?auto=format&fit=crop&q=80&w=800',
    description: 'An interactive companion app bridging spatial sound sensors, real-time filters, and dynamic map layouts.',
    client: 'Horizon Labs',
    date: 'October 2025',
  },
  {
    id: 'work-5',
    title: 'Vector Illustration Ecosystem',
    category: 'graphic',
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800',
    description: 'A collection of hundreds of lightweight high-contrast assets integrated seamlessly inside modern presentation software kits.',
    client: 'DesignAssets Inc',
    date: 'August 2025',
  },
  {
    id: 'work-6',
    title: 'Creative Agency Portfolio',
    category: 'web',
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800',
    description: 'A fluid interactive website framing dynamic grid layouts, slide transitions, and scroll-linked canvas animations.',
    client: 'Spectrum Studio',
    date: 'June 2025',
  },
];

export const processSteps: ProcessStep[] = [
  {
    id: 'proc-1',
    stepNumber: '01',
    title: 'Immersive Research',
    description: 'We sit down with you to map out competitive targets, target audiences, UX criteria, and performance parameters.',
    iconName: 'ClipboardList',
  },
  {
    id: 'proc-2',
    stepNumber: '02',
    title: 'Interactive Prototype',
    description: 'We sketch high-fidelity wireframes and interactive user flows, establishing responsive scaling and font rhythms.',
    iconName: 'Brush',
  },
  {
    id: 'proc-3',
    stepNumber: '03',
    title: 'High-Fidelity Code',
    description: 'Our development team maps design systems to highly optimized, clean, responsive TypeScript structures.',
    iconName: 'CodeXml',
  },
  {
    id: 'proc-4',
    stepNumber: '04',
    title: 'Deployment & Scaling',
    description: 'We push into lightning-fast container networks, with fully configured analytics, search logs, and automated uptime tracking.',
    iconName: 'Globe',
  },
];

export const statsData: StatItem[] = [
  {
    id: 'stat-projects',
    value: 850,
    label: 'Completed Projects',
    suffix: '+',
  },
  {
    id: 'stat-clients',
    value: 450,
    label: 'Happy Clients',
    suffix: '+',
  },
  {
    id: 'stat-coffee',
    value: 12000,
    label: 'Cups of Coffee',
  },
  {
    id: 'stat-awards',
    value: 35,
    label: 'Design Awards',
    suffix: '+',
  },
];

export const teamMembers: TeamMember[] = [
  {
    id: 'team-1',
    name: 'Brandon Yeald',
    role: 'Creative Director',
    imageUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400',
    socials: {
      facebook: '#',
      twitter: '#',
      linkedin: '#',
      github: '#',
    },
  },
  {
    id: 'team-2',
    name: 'Calvin Anderson',
    role: 'Lead Developer',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
    socials: {
      facebook: '#',
      twitter: '#',
      linkedin: '#',
      github: '#',
    },
  },
  {
    id: 'team-3',
    name: 'Roman Solo',
    role: 'UX Architect',
    imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400',
    socials: {
      facebook: '#',
      twitter: '#',
      linkedin: '#',
    },
  },
  {
    id: 'team-4',
    name: 'Yeald Kin',
    role: 'Brand Specialist',
    imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400',
    socials: {
      facebook: '#',
      twitter: '#',
      linkedin: '#',
      github: '#',
    },
  },
];

export const testimonialsData: TestimonialItem[] = [
  {
    id: 'test-1',
    name: 'Robert Thomson',
    role: 'Co-founder & COO',
    company: 'UpScale Technologies',
    quote: 'StartUp has completely changed the game for how we manifest our product ideas. The speed at which we went from rough sketches to a living, high-conversion landing page was astonishing.',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
  },
  {
    id: 'test-2',
    name: 'Sarah Jenkins',
    role: 'VP of Marketing',
    company: 'Vortex Global',
    quote: 'The design quality, spacing, and micro-animations captured our brand perfectly. It is incredibly fast, intuitive and our conversions skyrocketed by 38% list-wide.',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200',
  },
  {
    id: 'test-3',
    name: 'Michael Chang',
    role: 'Lead Architect',
    company: 'DesignFlow Inc',
    quote: 'Responsive, elegant, and completely custom feel without any bloat. Building layouts that look this professional usually takes weeks, but here it was fully ready immediately.',
    avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200',
  },
];
