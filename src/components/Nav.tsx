import type { Profile } from "@/lib/types";
import { ThemeToggle } from "./ThemeToggle";

export function Nav({ profile }: { profile: Profile }) {
  return (
    <nav className="nav">
      <div className="wrap">
        <div className="brand">
          {profile.name}
          <span className="dot">.</span>
        </div>
        <div className="navlinks">
          <a href="#parcours">Parcours</a>
          <a href="#realisations">Réalisations</a>
          <a href="#maison">La maison</a>
          <a href="#competences">Compétences</a>
          <a href="#contact">Contact</a>
        </div>
        <ThemeToggle />
      </div>
    </nav>
  );
}
