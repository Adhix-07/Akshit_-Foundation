import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Calendar,
  Droplet,
  HeartPulse,
  Image as ImageIcon,
  MapPin,
  Sparkles,
  ShieldCheck,
  TimerReset,
  Users,
} from "lucide-react";
import { AppNav } from "@/components/AppNav";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen pb-28 md:pb-8">
      <AppNav />
      <main className="mx-auto max-w-6xl px-4 pt-8 md:pt-16 animate-fade-in">
        <section className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr] items-stretch">
          <div className="clay p-6 md:p-8 lg:p-10 overflow-hidden relative">
            <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-primary/10 to-transparent pointer-events-none" />
            <div className="relative space-y-6">
              <div className="inline-flex items-center gap-2 clay-sm px-4 py-1.5 text-xs font-semibold tracking-wider uppercase text-primary">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                24/7 Emergency Blood Donation Network
              </div>

              <div className="max-w-2xl space-y-4">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-[1.03]">
                  Seconds Count.
                  <span className="block text-primary">Find blood faster.</span>
                </h1>
                <p className="text-base md:text-lg text-muted-foreground max-w-xl">
                  Connect emergency requests with verified donors in under 90 seconds using a clean,
                  fast, and mobile-friendly flow built for critical moments.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
                <Link
                  to="/request"
                  className="clay-red min-h-14 px-6 py-4 inline-flex items-center justify-center gap-2 text-sm font-bold tracking-wide transition-transform duration-200 hover:-translate-y-0.5"
                >
                  <HeartPulse className="w-5 h-5" />
                  Need Blood
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  to="/donor"
                  className="clay min-h-14 px-6 py-4 inline-flex items-center justify-center gap-2 text-sm font-bold tracking-wide text-foreground transition-transform duration-200 hover:-translate-y-0.5"
                >
                  <Droplet className="w-5 h-5 text-primary" fill="currentColor" />
                  Become a Donor
                  <ArrowRight className="w-4 h-4 text-foreground/60" />
                </Link>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                {[
                  { k: "12,480", v: "Verified Donors" },
                  { k: "3,207", v: "Lives Saved" },
                  { k: "< 90s", v: "Avg. Match Time" },
                ].map((s) => (
                  <div key={s.v} className="clay-sm px-4 py-4 text-center">
                    <div className="text-lg md:text-2xl font-extrabold text-foreground">{s.k}</div>
                    <div className="text-[11px] md:text-xs text-muted-foreground mt-1 uppercase tracking-wider">
                      {s.v}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid gap-4">
            <div className="clay p-6 md:p-7 flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="clay-inset w-12 h-12 grid place-items-center text-primary">
                  <TimerReset className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-widest text-primary font-bold">
                    How It Works
                  </div>
                  <div className="text-lg font-extrabold tracking-tight">Three steps, no friction</div>
                </div>
              </div>

              <div className="space-y-3">
                {[
                  {
                    title: "1. Raise a request",
                    desc: "Pick the required blood group and submit the hospital details in seconds.",
                  },
                  {
                    title: "2. Match nearby donors",
                    desc: "Find verified donors around the hospital using fast, clean location-aware flows.",
                  },
                  {
                    title: "3. Connect instantly",
                    desc: "Call or message the best match and move toward treatment without delay.",
                  },
                ].map((item) => (
                  <div key={item.title} className="clay-inset p-4 flex gap-3">
                    <div className="w-9 h-9 rounded-full grid place-items-center bg-primary/10 text-primary shrink-0">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-foreground">{item.title}</div>
                      <div className="text-sm text-muted-foreground mt-1">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="clay p-6 md:p-7">
              <div className="flex items-center gap-3 mb-4">
                <div className="clay-inset w-12 h-12 grid place-items-center text-primary">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-widest text-primary font-bold">
                    Community Reach
                  </div>
                  <div className="text-lg font-extrabold tracking-tight">Trusted response network</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Verified donors", value: "12k+" },
                  { label: "Fast matches", value: "90s" },
                  { label: "Blood camps", value: "54" },
                  { label: "Cities covered", value: "18" },
                ].map((item) => (
                  <div key={item.label} className="clay-sm p-4">
                    <div className="text-2xl font-extrabold text-foreground">{item.value}</div>
                    <div className="text-[11px] uppercase tracking-wider text-muted-foreground mt-1">
                      {item.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mt-8 md:mt-10 grid gap-5 md:grid-cols-3">
          <div className="clay p-6">
            <Calendar className="w-6 h-6 text-primary mb-4" />
            <h3 className="font-bold text-foreground">Upcoming Blood Camps</h3>
            <ul className="mt-4 space-y-3">
              {[
                { d: "12 Jul", t: "AIIMS Delhi", loc: "New Delhi" },
                { d: "18 Jul", t: "St. John's Camp", loc: "Bangalore" },
                { d: "24 Jul", t: "Community Drive", loc: "Mumbai" },
              ].map((c) => (
                <li key={c.t} className="flex items-center gap-3 text-sm">
                  <div className="clay-sm w-12 h-12 grid place-items-center text-xs font-bold text-primary">
                    {c.d}
                  </div>
                  <div>
                    <div className="font-medium text-foreground">{c.t}</div>
                    <div className="text-xs text-muted-foreground flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {c.loc}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="clay p-6">
            <ImageIcon className="w-6 h-6 text-primary mb-4" />
            <h3 className="font-bold text-foreground">Our Impact</h3>
            <div className="mt-4 grid grid-cols-3 gap-2">
              {[
                "bg-[linear-gradient(135deg,oklch(0.92_0.03_20),oklch(0.86_0.05_42))]",
                "bg-[linear-gradient(135deg,oklch(0.92_0.03_65),oklch(0.86_0.05_92))]",
                "bg-[linear-gradient(135deg,oklch(0.92_0.03_120),oklch(0.86_0.05_155))]",
                "bg-[linear-gradient(135deg,oklch(0.92_0.03_190),oklch(0.86_0.05_220))]",
                "bg-[linear-gradient(135deg,oklch(0.92_0.03_260),oklch(0.86_0.05_295))]",
                "bg-[linear-gradient(135deg,oklch(0.92_0.03_320),oklch(0.86_0.05_345))]",
              ].map((bgClass, i) => (
                <div key={i} className={`aspect-square clay-inset ${bgClass}`} />
              ))}
            </div>
          </div>

          <div className="clay p-6">
            <Sparkles className="w-6 h-6 text-primary mb-4" />
            <h3 className="font-bold text-foreground">Success Stories</h3>
            <div className="mt-4 space-y-4">
              {[
                { n: "Ravi K.", s: "Matched in 42s for O-neg — saved my father." },
                { n: "Priya M.", s: "Donor arrived at hospital in 18 minutes." },
              ].map((st) => (
                <div key={st.n} className="text-sm">
                  <div className="text-foreground italic">"{st.s}"</div>
                  <div className="text-xs text-muted-foreground mt-1">— {st.n}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <footer className="mt-16 text-center text-xs text-muted-foreground pb-6">
          © 2026 Akshit Foundation. Every drop counts.
        </footer>
      </main>
    </div>
  );
}
