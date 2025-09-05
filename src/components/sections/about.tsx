import Image from 'next/image';
import { skills } from '@/lib/data';

function SkillsShowcase() {
  return (
    <div className="mt-12 space-y-8">
      {Object.entries(skills).map(([category, skillList]) => (
        <div key={category}>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4 font-code">
            {category}
          </h3>
          <div className="flex flex-wrap gap-3">
            {skillList.map((skill) => (
              <div key={skill}>
                <div className="bg-card border border-primary/20 rounded-full px-4 py-2 text-sm text-foreground hover:bg-primary/10 transition-colors duration-300 cursor-default">
                  {skill}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function AboutSection() {
  return (
    <section id="about" className="pt-20 -mt-20">
      <div className="text-center">
        <h2 className="text-3xl font-bold font-headline tracking-tight sm:text-4xl text-primary mb-12">
          About Me
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 items-center">
        <div className="md:col-span-1 flex justify-center">
          <div className="relative w-64 h-64 md:w-80 md:h-80 group">
            <div className="absolute inset-0 bg-primary rounded-full transition-transform duration-500 ease-out-cubic group-hover:scale-105" />
            <Image
              src="https://picsum.photos/400/400"
              alt="Gaurav Kumar Jangid"
              width={400}
              height={400}
              data-ai-hint="professional portrait"
              className="relative rounded-full object-cover w-full h-full p-2 bg-background transition-transform duration-500 ease-out-cubic group-hover:scale-105"
            />
          </div>
        </div>
        <div className="md:col-span-2">
          <div>
            <p className="text-lg text-muted-foreground leading-relaxed">
              My journey in computer science is driven by a passion for solving complex puzzles. From architecting full-stack music platforms at MNNIT to predicting gravitational lensing with deep learning, I thrive on turning ambitious ideas into reality.
            </p>
          </div>
          <SkillsShowcase />
        </div>
      </div>
    </section>
  );
}
