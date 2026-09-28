import Link from "next/link";
import { signOutAction } from "@/app/actions/admin";

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="admin-shell">
      <header className="admin-header">
        <div className="admin-header-inner">
          <div className="admin-brand">Admin</div>
          <nav className="admin-nav">
            <Link href="/admin">Tableau de bord</Link>
            <Link href="/admin/settings">Réglages</Link>
            <Link href="/" target="_blank">
              Voir le site ↗
            </Link>
          </nav>
          <form action={signOutAction}>
            <button className="admin-btn admin-btn-ghost" type="submit">
              Se déconnecter
            </button>
          </form>
        </div>
      </header>
      <main className="admin-main">{children}</main>
    </div>
  );
}
