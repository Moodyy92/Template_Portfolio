import { getSiteData } from "@/lib/site-data";
import { ProfileForm } from "@/components/admin/ProfileForm";

export const dynamic = "force-dynamic";

export default async function AdminSettingsPage() {
  const { profile } = await getSiteData();

  return (
    <div className="admin-page">
      <h1>Réglages</h1>
      <p className="admin-page-hint">
        Ces informations sont réutilisées partout sur le site (nav, hero, contact, méta de
        partage).
      </p>
      <ProfileForm profile={profile} />
    </div>
  );
}
