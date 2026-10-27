import Cosmos from "@/components/Cosmos";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import FaqSection from "@/components/FaqSection";
import HashScroll from "@/components/HashScroll";
import IdeasSection from "@/components/IdeasSection";
import MultitudesHero from "@/components/MultitudesHero";
import MultitudesTrack from "@/components/MultitudesTrack";
import ProcessSection from "@/components/ProcessSection";
import SiteFooter from "@/components/SiteFooter";
import SiteMenu from "@/components/SiteMenu";
import ThemeButton from "@/components/ThemeButton";

// Dive into the dot, then scroll on through the multitudes as a sideways row
// of cards, then Ideas, About, How it works, FAQ and Contact, and the footer.
export default function Home() {
  return (
    <>
      <Cosmos />

      <header className="site-header fixed inset-x-0 top-0 z-20">
        <nav className="flex items-center justify-between gap-3 px-4 py-4 sm:px-8 lg:px-12">
          <SiteMenu />
          <ThemeButton />
        </nav>
      </header>

      <main id="top" className="relative">
        <MultitudesHero />
        <MultitudesTrack />
        <IdeasSection />
        <AboutSection />
        <ProcessSection />
        <FaqSection />
        <ContactSection />
        <HashScroll />

        <SiteFooter />
      </main>
    </>
  );
}
