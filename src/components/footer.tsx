"use client";

import Link from "next/link";
import { Github, Linkedin, Lock } from "lucide-react";
import { Button } from "./ui/button";

export default function Footer() {
    return (
        <footer className="bg-card border-t mt-auto">
            <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center flex-col sm:flex-row gap-4">
                    <p className="text-sm text-muted-foreground">
                        &copy; {new Date().getFullYear()} Gaurav Kumar Jangid. All rights reserved.
                    </p>
                    <div className="flex items-center gap-4">
                        <Link href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                            <Github className="w-6 h-6 text-muted-foreground transition-colors hover:text-primary" />
                        </Link>
                        <Link href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                            <Linkedin className="w-6 h-6 text-muted-foreground transition-colors hover:text-primary" />
                        </Link>
                         <Button asChild variant="ghost" size="icon" aria-label="Admin Login">
                            <Link href="/login">
                                <Lock className="w-5 h-5 text-muted-foreground transition-colors hover:text-primary" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </footer>
    );
}
