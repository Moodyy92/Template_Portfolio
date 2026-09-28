import { getSiteData } from "@/lib/site-data";
import { AdminBoard } from "@/components/admin/AdminBoard";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const { sections } = await getSiteData();

  return (
    <div className="admin-page">
      <h1>Contenu du site</h1>
      <p className="admin-page-hint">
        Fais glisser une section ou un bloc pour changer son ordre. Clique sur un bloc pour
        l&apos;éditer.
      </p>
      <AdminBoard initialSections={sections} />
    </div>
  );
}
