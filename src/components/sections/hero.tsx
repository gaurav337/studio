import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function HeroSection() {
  return (
    <section id="hero" className="relative w-full h-screen flex items-center justify-center text-center overflow-hidden bg-grid-pattern bg-center">
      <div className="absolute inset-0 bg-background bg-gradient-to-t from-background via-transparent to-background" />
      <div className="relative z-10 flex flex-col items-center p-4">
        <div>
          <h1 className="font-headline text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter">
            Gaurav Kumar Jangid
          </h1>
        </div>
        <div>
          <h2 className="mt-4 font-headline text-xl md:text-2xl lg:text-3xl font-semibold text-primary">
            Computer Science Engineer | Building Intelligent Systems
          </h2>
        </div>
        <div>
          <p className="mt-6 max-w-2xl text-lg md:text-xl text-muted-foreground">
            I create efficient, scalable, and intelligent software solutions, from the web to the cosmos.
          </p>
        </div>
        <div>
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg" variant="outline" className="text-base" data-hover-scale>
              <Link href="/projects">View All Projects</Link>
            </Button>
            <Button asChild size="lg" className="text-base" data-hover-scale>
              <Link href="#contact">Get In Touch</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
