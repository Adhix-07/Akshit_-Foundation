import { useEffect, useState } from "react";

import { Link, useLocation } from "@tanstack/react-router";
import { Menu, X, Droplet, HeartPulse, Home, LayoutDashboard, UserPlus, Users } from "lucide-react";

const items = [
  { to: "/", label: "Home", icon: Home },
  { to: "/request", label: "Request", icon: HeartPulse },
  { to: "/matches", label: "Matches", icon: Users },
  { to: "/donor", label: "Donor", icon: UserPlus },
  { to: "/admin", label: "Admin", icon: LayoutDashboard },
] as const;

export function AppNav() {
  const { pathname } = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const visibleItems = items;

  return (
    <>
      {/* Top bar */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-[#F0F4F8]/80 border-b border-white/60">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="clay-sm w-10 h-10 grid place-items-center">
              <Droplet className="w-5 h-5 text-primary" fill="currentColor" />
            </div>
            <div className="leading-tight">
              <div className="font-bold text-foreground tracking-tight">Akshit Foundation</div>
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
                Blood · Life · Speed
              </div>
            </div>
          </Link>
          <nav className="hidden md:flex items-center justify-end gap-1.5">
            {visibleItems.map((it) => {
              const active = pathname === it.to;
              return (
                <Link
                  key={it.to}
                  to={it.to}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors duration-200 whitespace-nowrap ${
                    active
                      ? "clay-inset text-primary"
                      : "text-foreground/70 hover:text-foreground hover:bg-white/40"
                  }`}
                >
                  {it.label}
                </Link>
              );
            })}
          </nav>

          <button
            type="button"
            className="md:hidden clay-sm w-11 h-11 grid place-items-center text-foreground/80 transition-colors duration-200"
            onClick={() => setIsMobileMenuOpen((current) => !current)}
            aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      <div
        className={`md:hidden fixed inset-x-0 top-[73px] z-40 px-4 transition-all duration-200 ${
          isMobileMenuOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-2 pointer-events-none"
        }`}
      >
        <div className="clay p-3 rounded-3xl shadow-[0_12px_30px_rgba(102,112,133,0.18)]">
          <nav className="grid grid-cols-2 gap-2">
            {visibleItems.map((it) => {
              const Icon = it.icon;
              const active = pathname === it.to;

              return (
                <Link
                  key={it.to}
                  to={it.to}
                  className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-colors duration-200 ${
                    active ? "clay-inset text-primary" : "text-foreground/70 hover:text-foreground"
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{it.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </>
  );
}
