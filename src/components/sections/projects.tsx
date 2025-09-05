
'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Github, ExternalLink } from 'lucide-react';
import { Project, getProjects } from '@/services/projects';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '../ui/button';
import { Skeleton } from '../ui/skeleton';

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const isReversed = index % 2 !== 0;

  return (
    <div>
      <Card className="overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 group/card h-full flex">
        <div className={cn('grid grid-cols-1 md:grid-cols-5 gap-8 items-center p-4 md:p-8', isReversed && 'md:grid-flow-col-dense')}>
          <div className={cn('md:col-span-3 group', isReversed && 'md:col-start-3')}>
             <div className="block overflow-hidden rounded-lg">
              <Image
                src={project.image}
                alt={project.title}
                width={800}
                height={600}
                data-ai-hint={project.dataAiHint}
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </div>
          <div className={cn('md:col-span-2 flex flex-col', isReversed && 'md:col-start-1 md:row-start-1')}>
            <h3 className="text-2xl font-bold font-headline text-primary">
              {project.title}
            </h3>
            <p className="mt-4 text-muted-foreground line-clamp-6 flex-grow">
              {project.description}
            </p>
            <div className={cn('flex flex-wrap gap-2 mt-6', isReversed && 'md:justify-start')}>
              {project.techStack.map((tech) => (
                <Badge key={tech} variant="secondary" className="font-code">
                  {tech}
                </Badge>
              ))}
            </div>
            <div className={cn('flex items-center gap-4 mt-6', isReversed && 'md:justify-start')}>
                <div className="flex items-center gap-4">
                  <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer" aria-label="GitHub repository">
                    <Github className="w-6 h-6 text-muted-foreground transition-colors hover:text-primary" />
                  </Link>
                  {project.liveUrl && (
                    <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer" aria-label="Live demo">
                      <ExternalLink className="w-6 h-6 text-muted-foreground transition-colors hover:text-primary" />
                    </Link>
                  )}
                </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default function ProjectsSection({ showFeatured = false }: { showFeatured?: boolean }) {
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
        setIsLoading(true);
        try {
            const allProjects = await getProjects();
            setFeaturedProjects(allProjects.filter(p => p.featured));
        } catch (error) {
            console.error("Failed to fetch projects", error);
        }
        setIsLoading(false);
    }
    fetchProjects();
  }, []);

  return (
    <section id="projects" className="pt-20 -mt-20">
      <div className="text-center">
        <h2 className="text-3xl font-bold font-headline tracking-tight sm:text-4xl text-primary mb-12">
          Featured Projects
        </h2>
      </div>

        {isLoading ? (
            <div className="space-y-16 md:space-y-24">
                {[...Array(2)].map((_, i) => (
                     <Card key={i} className="p-8">
                        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-center">
                            <div className="md:col-span-3">
                                <Skeleton className="w-full h-72 rounded-lg" />
                            </div>
                            <div className="md:col-span-2 space-y-4">
                                <Skeleton className="h-8 w-3/4" />
                                <Skeleton className="h-20 w-full" />
                                <Skeleton className="h-6 w-1/2" />
                            </div>
                        </div>
                     </Card>
                ))}
            </div>
        ) : (
             <div className="space-y-16 md:space-y-24">
                {featuredProjects.map((project, index) => (
                    <ProjectCard key={project.id} project={project} index={index} />
                ))}
             </div>
        )}

      {showFeatured && (
        <div className="text-center mt-16">
            <Button asChild size="lg">
                <Link href="/projects">View All Projects</Link>
            </Button>
        </div>
      )}
    </section>
  );
}
