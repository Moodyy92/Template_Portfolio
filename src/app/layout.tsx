import type { Metadata } from "next";
import { Bricolage_Grotesque, Inter } from "next/font/google";
import "./globals.css";
import { RevealInit } from "@/components/RevealInit";
import { ViewTracker } from "@/components/ViewTracker";
import { IntroOverlay } from "@/components/IntroOverlay";
import { ScrollProgress } from "@/components/ScrollProgress";
import { LightboxProvider } from "@/components/Lightbox";
import { getSiteData } from "@/lib/site-data";

const bricolage = Bricolage_Grotesque({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const siteUrl = "https://ton-domaine.exemple.fr"; // TODO: remplace par ton vrai domaine

export async function generateMetadata(): Promise<Metadata> {
  const { profile } = await getSiteData();
  const title = `${profile.name} - ${profile.targetRole}`;
  const description =
    "Portfolio de candidature : reconversion du bâtiment au développement, animation d'une communauté numérique de 140+ membres, site/appli/bot créés de A à Z.";

  return {
    metadataBase: new URL(siteUrl),
    title,
    description,
    openGraph: {
      title,
      description,
      url: siteUrl,
      siteName: profile.name,
      locale: "fr_FR",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

// Pose l'attribut data-theme AVANT le premier rendu si l'utilisateur a déjà
// choisi un thème explicitement (sinon on laisse la media query
// prefers-color-scheme décider seule) - évite tout flash au chargement.
const themeInitScript = `(function(){try{var t=localStorage.getItem('theme');if(t==='light'||t==='dark'){document.documentElement.setAttribute('data-theme',t);}}catch(e){}})();`;

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const { profile } = await getSiteData();

  return (
    <html lang="fr" className={`${bricolage.variable} ${inter.variable}`}>
      <body>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <div className="bg-ambient" aria-hidden="true">
          <span className="bg-blob bg-blob-1" />
          <span className="bg-blob bg-blob-2" />
          <span className="bg-blob bg-blob-3" />
          <span className="bg-grain" />
        </div>
        <IntroOverlay name={profile.name} />
        <ScrollProgress />
        <RevealInit />
        <ViewTracker />
        <LightboxProvider>{children}</LightboxProvider>
      </body>
    </html>
  );
}
