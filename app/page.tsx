import Cosmos from "@/components/Cosmos";
import MultitudesHero from "@/components/MultitudesHero";
import SiteMenu from "@/components/SiteMenu";
import { profile } from "@/data/profile";

// The page ends inside the dot: the hero's arrival screen is the last thing
// you see, centred, with only the footer line laid over its bottom edge.
export default function Home() {
  return (
    <>
      <Cosmos />

      <header className="site-header fixed inset-x-0 top-0 z-20">
        <nav className="flex items-center justify-between gap-3 px-4 py-4 sm:px-8 lg:px-12">
          <SiteMenu />
        </nav>
      </header>

      <main id="top" className="relative">
        <MultitudesHero />

        <footer className="pointer-events-none absolute inset-x-0 bottom-3 z-30 px-4 text-center text-xs text-fg/50">
          <p>
            © {new Date().getFullYear()} {profile.name} · {profile.location}
            {/* Light theme's wallpaper photo is CC BY 2.0, which requires this credit. */}
            <span className="hidden [[data-theme=light]_&]:inline">
              {" · "}Paper photo by{" "}
              <a href="https://commons.wikimedia.org/wiki/File:Free_crumpled_paper_texture_for_layers_(2978651767).jpg" target="_blank" rel="noopener noreferrer" className="pointer-events-auto underline decoration-fg/30 underline-offset-2 hover:text-fg">
                Pink Sherbet Photography
              </a>{" "}
              (CC BY 2.0)
            </span>
          </p>
        </footer>
      </main>
    </>
  );
}
