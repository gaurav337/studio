'use client';

import { Github, Linkedin, Mail, Phone } from 'lucide-react';
import { Button } from '../ui/button';
import Link from 'next/link';

const contactInfo = [
  {
    Icon: Mail,
    value: 'gaurav.j.8185@gmail.com',
    href: 'mailto:gaurav.j.8185@gmail.com',
  },
  {
    Icon: Linkedin,
    value: 'LinkedIn',
    href: 'https://www.linkedin.com',
  },
  {
    Icon: Github,
    value: 'GitHub',
    href: 'https://github.com',
  },
  {
    Icon: Phone,
    value: '+91-8076080509',
    href: 'tel:+918076080509',
  },
];

export default function ContactSection() {
  return (
    <section id="contact" className="py-20">
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold font-headline tracking-tight sm:text-4xl text-primary">
          Let's Build Something Amazing
        </h2>
        <p className="mt-6 text-lg text-muted-foreground">
          I'm currently open to new opportunities and collaborations. Whether you have a question or just want to say hi, my inbox is always open. I'll get back to you!
        </p>
      </div>

      <div className="mt-12">
        <div className="flex flex-wrap justify-center gap-6 md:gap-8">
          {contactInfo.map((item) => (
            <div
              key={item.value}
            >
              <Button asChild variant="ghost" className="h-auto p-4">
                <Link href={item.href} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2">
                  <item.Icon className="w-8 h-8 text-primary" />
                  <span className="text-sm text-muted-foreground">{item.value}</span>
                </Link>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
