import { createFileRoute } from "@tanstack/react-router";
import { AppNav } from "@/components/AppNav";
import { Phone, MessageCircle, MapPin, Droplet, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/matches")({
  head: () => ({
    meta: [
      { title: "Live Matches — Akshit Foundation" },
      { name: "description", content: "Verified donors matched to your emergency request." },
    ],
  }),
  component: MatchesPage,
});

const DONORS = [
  { name: "Ravi Sharma", bg: "O-", dist: "0.8 km", verified: true },
  { name: "Anjali Patel", bg: "O-", dist: "1.4 km", verified: true },
  { name: "Karan Mehra", bg: "O-", dist: "2.1 km", verified: false },
  { name: "Sneha Reddy", bg: "O-", dist: "3.6 km", verified: true },
  { name: "Vikram Iyer", bg: "O-", dist: "4.9 km", verified: true },
];

function MatchesPage() {
  return (
    <div className="min-h-screen pb-28 md:pb-8">
      <AppNav />
      <main className="mx-auto max-w-3xl px-4 pt-10 animate-fade-in">
        {/* Top banner */}
        <div className="clay p-5 flex items-center gap-4 animate-slide-up">
          <div className="clay-inset w-14 h-14 grid place-items-center shrink-0">
            <Droplet className="w-6 h-6 text-primary" fill="currentColor" />
          </div>
          <div className="min-w-0">
            <div className="text-xs uppercase tracking-widest text-primary font-bold">Live Matching</div>
            <div className="text-lg md:text-xl font-extrabold text-foreground">
              5 Matching Donors found within 5 km
            </div>
          </div>
          <div className="ml-auto hidden sm:flex items-center gap-2 text-xs text-muted-foreground">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Updated just now
          </div>
        </div>

        <div className="mt-6 space-y-4">
          {DONORS.map((d, i) => (
            <div
              key={d.name}
              className="glass p-5 flex items-center gap-4 animate-slide-up"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div className="clay-sm w-14 h-14 grid place-items-center shrink-0">
                <span className="font-bold text-primary">{d.bg}</span>
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <div className="font-semibold text-foreground truncate">{d.name}</div>
                  {d.verified && (
                    <span className="inline-flex items-center gap-1 text-[10px] text-emerald-700 bg-emerald-100/70 px-1.5 py-0.5 rounded-full">
                      <ShieldCheck className="w-3 h-3" /> Verified
                    </span>
                  )}
                </div>
                <div className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3 h-3" /> {d.dist} away
                </div>
              </div>
              <div className="flex gap-2 shrink-0">
                <button
                  aria-label="Call"
                  className="clay-sm w-11 h-11 rounded-full grid place-items-center text-primary hover:-translate-y-0.5 transition-transform duration-200"
                >
                  <Phone className="w-4 h-4" />
                </button>
                <button
                  aria-label="WhatsApp"
                  className="w-11 h-11 rounded-full grid place-items-center text-white transition-transform duration-200 hover:-translate-y-0.5"
                  style={{
                    background: "linear-gradient(145deg,#25D366,#128C7E)",
                    boxShadow: "3px 3px 8px #a8b5c4, -3px -3px 8px #ffffff",
                  }}
                >
                  <MessageCircle className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}