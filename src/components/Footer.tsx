import Link from "next/link";
import type { Profile } from "@/lib/types";

export function Footer({ profile }: { profile: Profile }) {
  return (
    <footer className="site-footer">
      <div className="wrap">
        © {new Date().getFullYear()} {profile.name}. Tous droits réservés.
        {" · "}
        <Link href="/template">Télécharger le template de ce site</Link>
      </div>
    </footer>
  );
}
