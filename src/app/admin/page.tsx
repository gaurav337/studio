
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { Project, getProjects, addProject, updateProject, deleteProject } from '@/services/projects';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import Header from '@/components/header';
import Footer from '@/components/footer';

const ProjectForm = ({ project, onSave, onCancel }: { project?: Project | null; onSave: (project: Omit<Project, 'id'> | Project) => void, onCancel: () => void }) => {
    const [formData, setFormData] = useState<Omit<Project, 'id'>>({
        title: project?.title || '',
        description: project?.description || '',
        techStack: project?.techStack || [],
        image: project?.image || '',
        dataAiHint: project?.dataAiHint || '',
        githubUrl: project?.githubUrl || '',
        liveUrl: project?.liveUrl || '',
        featured: project?.featured || false,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleTechStackChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({ ...prev, techStack: e.target.value.split(',').map(s => s.trim()) }));
    }

    const handleSwitchChange = (checked: boolean) => {
        setFormData(prev => ({ ...prev, featured: checked }));
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (project) {
            onSave({ ...project, ...formData });
        } else {
            onSave(formData);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <Input name="title" value={formData.title} onChange={handleChange} placeholder="Project Title" required />
            <Textarea name="description" value={formData.description} onChange={handleChange} placeholder="Project Description" required />
            <Input name="techStack" value={formData.techStack.join(', ')} onChange={handleTechStackChange} placeholder="Tech Stack (comma separated)" />
            <Input name="image" value={formData.image} onChange={handleChange} placeholder="Image URL" required />
            <Input name="dataAiHint" value={formData.dataAiHint} onChange={handleChange} placeholder="AI Hint for Image" required />
            <Input name="githubUrl" value={formData.githubUrl} onChange={handleChange} placeholder="GitHub URL" required />
            <Input name="liveUrl" value={formData.liveUrl || ''} onChange={handleChange} placeholder="Live URL (optional)" />
            <div className="flex items-center space-x-2">
                <Switch id="featured" checked={formData.featured} onCheckedChange={handleSwitchChange} />
                <Label htmlFor="featured">Featured Project</Label>
            </div>
            <DialogFooter>
                <DialogClose asChild>
                    <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
                </DialogClose>
                <Button type="submit">Save Project</Button>
            </DialogFooter>
        </form>
    );
};


export default function AdminPage() {
    const { user, loading, signOut } = useAuth();
    const router = useRouter();
    const [projects, setProjects] = useState<Project[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingProject, setEditingProject] = useState<Project | null>(null);

    useEffect(() => {
        if (!loading && !user) {
            router.push('/login');
        }
    }, [user, loading, router]);

    useEffect(() => {
        const fetchProjects = async () => {
            if(user) {
                setIsLoading(true);
                const fetchedProjects = await getProjects();
                setProjects(fetchedProjects);
                setIsLoading(false);
            }
        };
        fetchProjects();
    }, [user]);

    const handleSaveProject = async (projectData: Omit<Project, 'id'> | Project) => {
        if ('id' in projectData) {
            // Update
            await updateProject(projectData.id, projectData);
        } else {
            // Add
            await addProject(projectData);
        }
        const fetchedProjects = await getProjects();
        setProjects(fetchedProjects);
        setIsFormOpen(false);
        setEditingProject(null);
    };

    const handleDeleteProject = async (id: string) => {
        await deleteProject(id);
        const fetchedProjects = await getProjects();
        setProjects(fetchedProjects);
    }
    
    if (loading || !user) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-primary"></div>
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen bg-background">
            <Header />
            <main className="flex-grow pt-20">
              <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 w-full">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold font-headline text-primary">Admin Dashboard</h1>
                    <Button onClick={signOut}>Sign Out</Button>
                </div>
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-xl font-semibold">Manage Projects</h2>
                    <Dialog open={isFormOpen} onOpenChange={(open) => {
                        setIsFormOpen(open);
                        if (!open) setEditingProject(null);
                    }}>
                        <DialogTrigger asChild>
                            <Button onClick={() => setEditingProject(null)}>
                                <PlusCircle className="mr-2 h-4 w-4" /> Add New Project
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>{editingProject ? 'Edit Project' : 'Add New Project'}</DialogTitle>
                            </DialogHeader>
                            <ProjectForm
                                project={editingProject}
                                onSave={handleSaveProject}
                                onCancel={() => setIsFormOpen(false)}
                            />
                        </DialogContent>
                    </Dialog>
                </div>
                
                {isLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[...Array(3)].map((_, i) => (
                             <Card key={i}>
                                <CardHeader>
                                    <Skeleton className="h-6 w-3/4" />
                                </CardHeader>
                                <CardContent>
                                    <Skeleton className="h-4 w-full mb-2" />
                                    <Skeleton className="h-4 w-5/6" />
                                </CardContent>
                                <CardFooter>
                                    <Skeleton className="h-8 w-20" />
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                ): (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {projects.map(project => (
                            <Card key={project.id} className="flex flex-col">
                                <CardHeader>
                                    <CardTitle>{project.title}</CardTitle>
                                </CardHeader>
                                <CardContent className="flex-grow">
                                    <p className="text-sm text-muted-foreground line-clamp-3">{project.description}</p>
                                </CardContent>
                                <CardFooter className="flex justify-end gap-2">
                                    <Button variant="outline" size="icon" onClick={() => {
                                        setEditingProject(project);
                                        setIsFormOpen(true);
                                    }}>
                                        <Edit className="h-4 w-4" />
                                    </Button>

                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <Button variant="destructive" size="icon"><Trash2 className="h-4 w-4" /></Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                            <AlertDialogDescription>
                                                This action cannot be undone. This will permanently delete this project.
                                            </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                            <AlertDialogAction onClick={() => handleDeleteProject(project.id)}>
                                                Continue
                                            </AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                )}
                </div>
            </main>
            <Footer />
        </div>
    );
}
