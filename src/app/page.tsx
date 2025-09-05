import Header from "@/components/header";
import HeroSection from "@/components/sections/hero";
import AboutSection from "@/components/sections/about";
import ProjectsSection from "@/components/sections/projects";
import TimelineSection from "@/components/sections/timeline";
import ContactSection from "@/components/sections/contact";
import Footer from "@/components/footer";


export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-28 md:space-y-40 mb-28 md:mb-40">
          <AboutSection />
          <ProjectsSection showFeatured={true} />
          <TimelineSection />
          <ContactSection />
        </div>
      </main>
      <Footer />
    </div>
  );
}
