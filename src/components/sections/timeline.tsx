
'use client';

import { timeline, achievements, testimonials } from '@/lib/data';
import { Card } from '../ui/card';
import { useEffect, useRef, useState } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Quote } from 'lucide-react';

function AnimatedNumber({ value, isNumber }: { value: string; isNumber: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [inView, setInView] = useState(false);
  const numericValue = parseInt(value.replace('+', ''), 10);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);
  
  useEffect(() => {
    if (inView && ref.current && isNumber) {
        let start = 0;
        const end = numericValue;
        if (start === end) return;

        const duration = 2000;
        const startTime = Date.now();

        const run = () => {
            const now = Date.now();
            const progress = Math.min((now - startTime) / duration, 1);
            const current = Math.floor(progress * end);
            if (ref.current) {
                ref.current.textContent = current.toString();
            }

            if (progress < 1) {
                requestAnimationFrame(run);
            }
        };
        requestAnimationFrame(run);
    }
  }, [inView, numericValue, isNumber]);


  return (
    <span ref={ref}>
      {isNumber ? 0 : value.replace(/[+]/g, '')}
      {value.includes('+') && '+'}
    </span>
  );
}

function TestimonialsSection() {
    return (
        <div className="mt-24">
             <h3 className="text-2xl font-bold font-headline text-center mb-12 text-primary/80">
                Words From Mentors & Peers
            </h3>
            <Carousel
                opts={{
                    align: "start",
                    loop: true,
                }}
                className="w-full max-w-xs sm:max-w-xl md:max-w-2xl lg:max-w-4xl mx-auto"
            >
                <CarouselContent>
                    {testimonials.map((testimonial, index) => (
                        <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                            <div className="p-1 h-full">
                                <Card className="flex flex-col justify-between h-full p-6 bg-card/50">
                                    <div>
                                        <Quote className="w-8 h-8 text-primary/50 mb-4" />
                                        <p className="text-muted-foreground mb-4">"{testimonial.quote}"</p>
                                    </div>
                                    <div>
                                        <p className="font-semibold text-foreground">{testimonial.name}</p>
                                        <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                                    </div>
                                </Card>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
    )
}

export default function TimelineSection() {
  return (
    <section id="timeline" className="pt-20 -mt-20">
      <div className="text-center">
        <h2 className="text-3xl font-bold font-headline tracking-tight sm:text-4xl text-primary mb-12">
          My Journey & Experience
        </h2>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
        <div className="lg:col-span-2">
          <div className="relative">
            <div className="absolute left-4 top-0 h-full w-0.5 bg-border -translate-x-1/2" aria-hidden="true" />
            <div className="absolute left-4 top-0 h-full w-0.5 bg-primary -translate-x-1/2" />

            <div className="space-y-12">
              {timeline.map((item, index) => (
                <div
                  key={index}
                  className="relative pl-12"
                >
                  <div className="absolute left-4 top-2 h-4 w-4 bg-background border-2 border-primary rounded-full -translate-x-1/2" />
                  <p className="text-sm text-muted-foreground">{item.date}</p>
                  <h3 className="mt-1 text-xl font-bold font-headline text-foreground">{item.title}</h3>
                  <p className="mt-2 text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-1 space-y-6">
          {achievements.map((achievement, index) => (
            <div
              key={index}
            >
              <Card className="p-6 text-center bg-card/50">
                <achievement.icon className="mx-auto h-8 w-8 text-primary mb-4" />
                <div className="text-4xl font-bold font-headline text-primary">
                  <AnimatedNumber value={achievement.value} isNumber={!isNaN(parseInt(achievement.value))} />
                </div>
                <p className="text-sm text-muted-foreground mt-2">{achievement.label}</p>
              </Card>
            </div>
          ))}
        </div>
      </div>
      <TestimonialsSection />
    </section>
  );
}
