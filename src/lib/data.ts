import {
  BarChart3,
  Briefcase,
  Code,
  Cpu,
  GraduationCap,
  type LucideIcon,
} from 'lucide-react';
import { PlaceHolderImages } from './placeholder-images';

type Project = {
  id: number;
  title: string;
  category: string;
  tech: string[];
  description: string;
  image: string;
  imageHint: string;
};

export const projects: Project[] = PlaceHolderImages.filter(p => p.id.startsWith('project-')).map(p => {
    const projectData: Omit<Project, 'image' | 'imageHint'> = {
        'project-1': { id: 1, title: "Mazda Brand Meaning", category: "Marketing", tech: ["Meta Ads", "YouTube", "Oracle CRM"], description: "Full-funnel video-led strategy. Achieved +28% engagement, 6s average watch time, and 3.0% CTR." },
        'project-2': { id: 2, title: "Visual Lab Platform", category: "Data Science", tech: ["Python", "React", "ML Integration"], description: "Comprehensive Data Science platform for dataset exploration and real-time analysis." },
        'project-3': { id: 3, title: "Mazda2 Retail Promo", category: "Marketing", tech: ["Power BI", "A/B Testing", "Funnel"], description: "Retail promotion campaign with A/B tests. ROAS 4.2:1, CPL R366, 1,240 leads generated." },
        'project-4': { id: 4, title: "AutoML Studio MCP", category: "Development", tech: ["FastAPI", "Scikit-learn", "Docker"], description: "Automated ML workflow server with CSV upload, training, and deployment capabilities." },
        'project-5': { id: 5, title: "MazdaCare Warranty", category: "Marketing", tech: ["TikTok", "Lead Gen", "Meta"], description: "Service plan campaign. 1.2M reach, 35% VTR, CPL R85, generating 1,200 leads." },
        'project-6': { id: 6, title: "Motion-Control Ping Pong", category: "Development", tech: ["OpenCV", "Python", "NumPy"], description: "Webcam-based game using raw computer vision logic (no ML shortcuts)." },
        'project-7': { id: 7, title: "South32 Hillside Series", category: "Marketing", tech: ["LinkedIn", "Internal Comms"], description: "Internal/community campaigns reaching 3,800+ employees with 60% engagement score." },
        'project-8': { id: 8, title: "Initium Integrated", category: "Strategy", tech: ["Branding", "PR", "SharePoint"], description: "Brand identity system and multi-channel campaign. 25+ assets created, 112K+ reach." },
        'project-9': { id: 9, title: "Sasol Strategic Comms", category: "Strategy", tech: ["Stakeholder Mgmt", "Crisis Comms"], description: "Enterprise Supplier Development comms. Achieved 85% positive/neutral coverage." },
    }[p.id] || { id: 0, title: '', category: '', tech: [], description: '' };
    
    return {
        ...projectData,
        image: p.imageUrl,
        imageHint: p.imageHint,
    }
});


export const services: {
  number: string;
  icon: LucideIcon;
  title: string;
  description: string;
}[] = [
  {
    number: '1',
    icon: BarChart3,
    title: 'Paid Media Strategy',
    description:
      'Full-funnel optimization across Meta, Google Ads, and LinkedIn. Expertise in automotive and industrial sectors, focusing on reducing CAC while scaling reach.',
  },
  {
    number: '2',
    icon: Code,
    title: 'Technical Implementation',
    description:
      'Building custom tools to solve marketing problems. Proficiency in React, Python, and FastAPI allows me to automate workflows and build custom dashboards.',
  },
  {
    number: '3',
    icon: Cpu,
    title: 'Data Science & ML',
    description:
      'Going beyond basic analytics. I use Python (Pandas, Scikit-learn) to uncover deep user insights, predict trends, and visualize complex datasets.',
  },
];

export const experiences: {
  date: string;
  role: string;
  company: string;
  description: string;
}[] = [
  {
    date: '2025 — PRESENT',
    role: 'Digital Marketing Specialist',
    company: 'Mazda Southern Africa',
    description:
      'Leading data-driven strategies and SEO for brand elevation. Managing budget allocations across digital channels with a focus on high-impact retail promotions.',
  },
  {
    date: '2025',
    role: 'Paid Media Consultant',
    company: 'Initium Venture Solutions',
    description:
      'Freelance paid media strategies & digital optimization. Developing integrated campaigns and brand identity systems.',
  },
  {
    date: '2024',
    role: 'Communications Officer (ESD)',
    company: 'Sasol',
    description:
      'Executed internal & external marketing strategies. Focused on corporate communication for Enterprise Supplier Development (ESD).',
  },
  {
    date: '2023',
    role: 'Digital Marketing Coordinator',
    company: 'South32',
    description:
      'Focused on Google Analytics, SEO optimization, and digital coordination for mining sector stakeholders.',
  },
  {
    date: '2023',
    role: 'Social Media & Community Manager',
    company: 'Empangeni High School',
    description:
      'Managed media strategy, advertising, and community engagement.',
  },
];

export const education: {
  date: string;
  title: string;
  institution: string;
  borderColor: string;
}[] = [
  {
    date: '2022',
    title: 'Diploma in Marketing Management',
    institution: 'Boston City Campus (NQF6)',
    borderColor: 'border-primary',
  },
  {
    date: '2018',
    title: 'Matric Senior Certificate',
    institution: 'Richards Bay Secondary (NQF4)',
    borderColor: 'border-black',
  },
];

export const certifications: {
  issuer: string;
  title: string;
}[] = [
  { issuer: 'Microsoft', title: 'Azure Data Fundamentals (DP-900)' },
  { issuer: 'Adobe', title: 'Photoshop Essential Skills' },
  { issuer: 'Microsoft', title: 'Career Essentials in Data Analysis' },
  { issuer: 'Google', title: 'Digital Marketing Certification' },
  { issuer: 'IBM', title: 'Python for Data Science' },
  { issuer: 'Johns Hopkins University', title: 'Advanced Statistics for Data Science' },
  { issuer: 'HubSpot', title: 'SEO' },
  { issuer: 'HubSpot', title: 'Email Marketing' },
  { issuer: 'HubSpot', title: 'Marketing Software' },
  { issuer: 'Google', title: 'Google Ads Search Certification' },
];


export const timelineIcons = {
  work: Briefcase,
  education: GraduationCap,
};
