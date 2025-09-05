
'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Input } from '@/components/ui/input';
import { Project, getProjects } from '@/services/projects';
import Image from 'next/image';
import Link from 'next/link';
import { Github, ExternalLink, Search } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Skeleton } from '@/components/ui/skeleton';

const ProjectCard = ({ project }: { project: Project }) => {
    return (
        <div>
            <Card className="overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 h-full flex flex-col group/card">
                <div className="block overflow-hidden">
                    <Image
                        src={project.image}
                        alt={project.title}
                        width={800}
                        height={600}
                        data-ai-hint={project.dataAiHint}
                        className="rounded-t-lg object-cover w-full h-56 transition-transform duration-500 group-hover:scale-105"
                    />
                </div>
                <div className="p-6 flex-grow flex flex-col">
                    <h3 className="text-xl font-bold font-headline text-primary">
                        {project.title}
                    </h3>
                    <p className="mt-3 text-muted-foreground flex-grow line-clamp-3">
                        {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-4">
                        {project.techStack.map((tech) => (
                            <Badge key={tech} variant="secondary" className="font-code">
                                {tech}
                            </Badge>
                        ))}
                    </div>
                    <div className="flex items-center gap-4 mt-6">
                        <div className="flex items-center gap-4">
                            <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer" aria-label="GitHub repository" onClick={(e) => e.stopPropagation()}>
                                <Github className="w-6 h-6 text-muted-foreground transition-colors hover:text-primary" />
                            </Link>
                            {project.liveUrl && (
                                <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer" aria-label="Live demo" onClick={(e) => e.stopPropagation()}>
                                    <ExternalLink className="w-6 h-6 text-muted-foreground transition-colors hover:text-primary" />
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default function ProjectsPage() {
    const [allProjects, setAllProjects] = useState<Project[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        const fetchProjects = async () => {
            setIsLoading(true);
            const projects = await getProjects();
            setAllProjects(projects);
            setIsLoading(false);
        };
        fetchProjects();
    }, []);

    const allTechStacks = useMemo(() => {
        const stacks = new Set<string>();
        allProjects.forEach(p => p.techStack.forEach(t => stacks.add(t)));
        return Array.from(stacks).sort();
    }, [allProjects]);

    const filteredProjects = useMemo(() => {
        return allProjects.filter(project => {
            const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                project.description.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesFilter = filter === 'all' || project.techStack.includes(filter);
            return matchesSearch && matchesFilter;
        });
    }, [allProjects, searchTerm, filter]);

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow pt-24 sm:pt-32">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h1 className="text-4xl sm:text-5xl font-bold font-headline text-primary">
                            All Projects
                        </h1>
                        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                            Explore a collection of my work, from deep learning experiments to full-stack applications.
                        </p>
                    </div>

                    <div className="mt-12 max-w-4xl mx-auto">
                        <div className="flex flex-col sm:flex-row gap-4">
                            <div className="relative flex-grow">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                <Input
                                    type="text"
                                    placeholder="Search projects..."
                                    className="pl-10"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <Select onValueChange={setFilter} defaultValue="all">
                                <SelectTrigger className="w-full sm:w-[180px]">
                                    <SelectValue placeholder="Filter by tech" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Technologies</SelectItem>
                                    {allTechStacks.map(tech => (
                                        <SelectItem key={tech} value={tech}>{tech}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    
                    {isLoading ? (
                         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12 mb-24">
                            {[...Array(3)].map((_, i) => (
                                <div key={i} className="space-y-4">
                                    <Skeleton className="h-56 w-full" />
                                    <Skeleton className="h-6 w-3/4" />
                                    <Skeleton className="h-12 w-full" />
                                    <Skeleton className="h-6 w-1/2" />
                                </div>
                            ))}
                         </div>
                    ) : (
                        <div
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12 mb-24 auto-rows-fr"
                        >
                            {filteredProjects.length > 0 ? (
                                filteredProjects.map((project) => (
                                    <div key={project.id}>
                                        <ProjectCard project={project} />
                                    </div>
                                ))
                            ) : (
                                <div className="md:col-span-2 lg:col-span-3 text-center py-16">
                                    <p className="text-lg text-muted-foreground">No projects found matching your criteria.</p>
                                </div>
                            )}
                        </div>
                    )}

                </div>
            </main>
            <Footer />
        </div>
    );
}
