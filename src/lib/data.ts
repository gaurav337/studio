import { Code, School, BrainCircuit, Award, Briefcase, Star } from 'lucide-react';
import React from 'react';


type NavLink = {
  name: string;
  href: string;
  target?: string;
}

export const navLinks: NavLink[] = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/#about' },
  { name: 'Projects', href: '/projects' },
  { name: 'Journey', href: '/#timeline' },
  { name: 'Resume', href: 'https://drive.google.com/file/d/1Z-VZL5pz-ZtNmIRDYULNDqBrTez8r8_P/view?usp=drivesdk', target: '_blank' },
  { name: 'Contact', href: '/#contact' },
];

export const skills = {
  languages: ['Python', 'Java', 'C++', 'JavaScript', 'TypeScript', 'HTML/CSS'],
  frameworks: ['React.js', 'Next.js', 'Node.js', 'Express.js', 'TensorFlow', 'Scikit-learn', 'Tailwind CSS'],
  tools: ['Git & GitHub', 'Docker', 'MongoDB', 'PostgreSQL', 'Firebase', 'Vercel'],
};

export const timeline = [
    {
        date: 'Aug 2028 (Expected)',
        title: 'B.Tech in Computer Science',
        description: 'MNNIT Allahabad - Focusing on intelligent systems and scalable software architecture.',
        icon: School,
        category: 'education',
    },
    {
        date: 'Sep 2025 - Ongoing',
        title: 'Gravitational Lensing Project',
        description: 'Lead Researcher - Applied deep learning to predict gravitational lensing, improving model accuracy by 25% through a custom preprocessing pipeline.',
        icon: BrainCircuit,
        category: 'project',
    },
    {
        date: 'Summer 2025',
        title: 'CodeHub - Contributor',
        description: 'Resolved 15+ front-end bugs and collaborated on UI enhancements using Git-flow, improving the platform experience for 500+ users.',
        icon: Code,
        category: 'experience',
    },
    {
        date: '2024',
        title: 'Graduated High School',
        description: 'DPS Faridabad - Completed high school with a strong foundation in science and mathematics (97%).',
        icon: School,
        category: 'education',
    },
];


export const achievements = [
    { value: '100+', label: 'LeetCode Problems Solved', icon: Code },
    { value: '1150+', label: 'Codeforces Rating', icon: Star },
    { value: 'AIR 4', label: 'Intl. Mathematics Olympiad', icon: Award },
    { value: 'Top 5%', label: 'in Core CS Courses', icon: Briefcase },
];

export const testimonials = [
    {
        quote: "Gaurav's dedication and problem-solving skills were instrumental in the success of our gravitational lensing research. His ability to quickly grasp complex concepts and apply them is remarkable.",
        name: "Abhay Pratap Singh",
        title: "Research Mentor"
    },
    {
        quote: "Working with Gaurav on CodeHub was a great experience. He's a proactive developer who consistently delivered high-quality code and was always ready to tackle the next challenge.",
        name: "Yash Singh",
        title: "Senior Teammate, CodeHub"
    },
    {
        quote: "An exceptional student with a rare combination of intellectual curiosity and technical ability. Gaurav consistently ranked at the top of my data structures and algorithms course.",
        name: "Professor Verma",
        title: "Professor of Computer Science, MNNIT"
    }
];
