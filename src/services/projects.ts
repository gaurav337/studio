
import { db } from '@/lib/firebase';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, orderBy, DocumentData, writeBatch } from 'firebase/firestore';

export interface Project {
    id: string;
    title: string;
    description: string;
    techStack: string[];
    image: string;
    dataAiHint: string;
    githubUrl: string;
    liveUrl: string | null;
    featured: boolean;
}

const initialProjects: Omit<Project, 'id'>[] = [
  {
    title: 'Project Alpha',
    description: 'A cutting-edge solution for modern web development.',
    techStack: ['React', 'TypeScript', 'Next.js'],
    image: 'https://picsum.photos/800/600',
    dataAiHint: 'web application',
    githubUrl: 'https://github.com',
    liveUrl: 'https://vercel.com',
    featured: true,
  },
  {
    title: 'Project Beta',
    description: 'An innovative mobile application changing the game.',
    techStack: ['React Native', 'Firebase'],
    image: 'https://picsum.photos/800/600',
    dataAiHint: 'mobile app',
    githubUrl: 'https://github.com',
    liveUrl: null,
    featured: true,
  },
  {
    title: 'Project Gamma',
    description: 'A machine learning model for data analysis.',
    techStack: ['Python', 'TensorFlow', 'Scikit-learn'],
    image: 'https://picsum.photos/800/600',
    dataAiHint: 'data science',
    githubUrl: 'https://github.com',
    liveUrl: 'https://colab.research.google.com/',
    featured: false,
  },
];


// Helper to convert Firestore data to Project, ensuring liveUrl is null if missing.
function toProject(doc: DocumentData): Project {
    const data = doc.data();
    return {
        id: doc.id,
        title: data.title,
        description: data.description,
        techStack: data.techStack,
        image: data.image,
        dataAiHint: data.dataAiHint,
        githubUrl: data.githubUrl,
        liveUrl: data.liveUrl || null,
        featured: data.featured || false,
    } as Project;
}

let cachedProjects: Project[] | null = null;
const projectsCollection = collection(db, 'projects');

async function seedProjects() {
    const batch = writeBatch(db);
    initialProjects.forEach(project => {
        const docRef = doc(projectsCollection); // Automatically generate unique ID
        batch.set(docRef, project);
    });
    await batch.commit();
    console.log("Seeded initial projects.");
}

export async function getProjects(): Promise<Project[]> {
    if (cachedProjects) {
        return cachedProjects;
    }

    const q = query(projectsCollection, orderBy('title', 'asc'));
    let snapshot = await getDocs(q);

    if (snapshot.empty) {
        console.log("No projects found, seeding initial data...");
        await seedProjects();
        // Re-fetch after seeding
        snapshot = await getDocs(q);
    }
    
    cachedProjects = snapshot.docs.map(toProject);
    return cachedProjects;
}

function invalidateCache() {
    cachedProjects = null;
}


export async function addProject(project: Omit<Project, 'id'>): Promise<string> {
    const dataToSave = {
        ...project,
        liveUrl: project.liveUrl || null,
    };
    const docRef = await addDoc(projectsCollection, dataToSave);
    invalidateCache();
    return docRef.id;
}

export async function updateProject(id: string, project: Partial<Omit<Project, 'id'>>): Promise<void> {
    const projectDoc = doc(db, 'projects', id);
    const dataToUpdate: Partial<Project> = { ...project };

    if (project.liveUrl === '') {
        dataToUpdate.liveUrl = null;
    }
    
    await updateDoc(projectDoc, dataToUpdate);
    invalidateCache();
}

export async function deleteProject(id: string): Promise<void> {
    const projectDoc = doc(db, 'projects', id);
    await deleteDoc(projectDoc);
    invalidateCache();
}
