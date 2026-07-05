import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { AppNav } from "@/components/AppNav";
import { MapPin, Search, Loader2, Building2, User, Phone, HeartPulse } from "lucide-react";

export const Route = createFileRoute("/request")({
  head: () => ({
    meta: [
      { title: "Request Blood — Akshit Foundation" },
      { name: "description", content: "Request emergency blood donors near you in under 90 seconds." },
    ],
  }),
  component: RequestPage,
});

const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];
const HOSPITALS = ["AIIMS Delhi", "Apollo Bangalore", "Fortis Mumbai", "Manipal Hospital", "Max Healthcare", "St. John's Medical"];

function RequestPage() {
  const navigate = useNavigate();
  const [bg, setBg] = useState<string | null>(null);
  const [hospital, setHospital] = useState("");
  const [showSuggest, setShowSuggest] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const filtered = HOSPITALS.filter((h) => h.toLowerCase().includes(hospital.toLowerCase()));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => navigate({ to: "/matches" }), 1200);
  };

  return (
    <div className="min-h-screen pb-28 md:pb-8">
      <AppNav />
      <main className="mx-auto max-w-2xl px-4 pt-10 animate-fade-in">
        <div className="text-center mb-10">
          <div className="inline-flex clay-sm w-14 h-14 items-center justify-center mb-4">
            <HeartPulse className="w-7 h-7 text-primary" />
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">Request Blood</h1>
          <p className="mt-2 text-muted-foreground text-sm">Complete the request. Verified donors will be notified instantly.</p>
        </div>

        <form onSubmit={submit} className="space-y-6">
          {/* Step 1: Blood group */}
          <Section step={1} title="Blood Group Required">
            <div className="flex flex-wrap gap-2.5">
              {BLOOD_GROUPS.map((g) => (
                <button
                  type="button"
                  key={g}
                  onClick={() => setBg(g)}
                  className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-200 ${
                    bg === g ? "clay-red" : "clay-sm text-foreground/80 hover:text-primary"
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </Section>

          {/* Step 2: Location */}
          <Section step={2} title="Patient Location">
            <div className="clay-inset h-40 grid place-items-center relative overflow-hidden">
              <div
                className="absolute inset-0 opacity-40"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(120,140,170,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(120,140,170,0.15) 1px, transparent 1px)",
                  backgroundSize: "24px 24px",
                }}
              />
              <div className="relative text-center">
                <MapPin className="w-8 h-8 text-primary mx-auto" />
                <div className="text-xs text-muted-foreground mt-2">Map preview</div>
              </div>
            </div>
            <button
              type="button"
              className="mt-3 w-full clay-sm py-3 text-sm font-semibold text-foreground hover:text-primary transition-colors duration-200 flex items-center justify-center gap-2"
            >
              <MapPin className="w-4 h-4" /> Use My Current Location
            </button>
          </Section>

          {/* Step 3: Hospital */}
          <Section step={3} title="Hospital">
            <div className="relative">
              <div className="clay-inset flex items-center gap-3 px-4 py-3">
                <Building2 className="w-4 h-4 text-muted-foreground" />
                <input
                  value={hospital}
                  onChange={(e) => {
                    setHospital(e.target.value);
                    setShowSuggest(true);
                  }}
                  onFocus={() => setShowSuggest(true)}
                  onBlur={() => setTimeout(() => setShowSuggest(false), 150)}
                  placeholder="Type to search hospitals…"
                  className="flex-1 bg-transparent outline-none text-sm placeholder:text-muted-foreground"
                />
                <Search className="w-4 h-4 text-muted-foreground" />
              </div>
              {showSuggest && hospital && filtered.length > 0 && (
                <div className="clay absolute z-10 left-0 right-0 mt-2 py-2 animate-fade-in">
                  {filtered.map((h) => (
                    <button
                      key={h}
                      type="button"
                      onClick={() => {
                        setHospital(h);
                        setShowSuggest(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm hover:bg-white/50 transition-colors duration-200"
                    >
                      {h}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </Section>

          {/* Step 4: Contact */}
          <Section step={4} title="Bystander Contact">
            <div className="grid sm:grid-cols-2 gap-3">
              <ClayField icon={<User className="w-4 h-4" />} value={name} onChange={setName} placeholder="Full name" />
              <ClayField icon={<Phone className="w-4 h-4" />} value={phone} onChange={setPhone} placeholder="Phone number" type="tel" />
            </div>
          </Section>

          <button
            type="submit"
            disabled={loading}
            className="clay-red w-full py-5 text-base font-bold transition-transform duration-200 hover:-translate-y-0.5 disabled:opacity-90 flex items-center justify-center gap-2.5"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Locating heroes near you…
              </>
            ) : (
              <>
                <Search className="w-5 h-5" />
                Find Nearby Heroes
              </>
            )}
          </button>
        </form>
      </main>
    </div>
  );
}

function Section({ step, title, children }: { step: number; title: string; children: React.ReactNode }) {
  return (
    <div className="clay p-5 animate-slide-up">
      <div className="flex items-center gap-3 mb-4">
        <div className="clay-inset w-8 h-8 grid place-items-center text-xs font-bold text-primary">{step}</div>
        <h2 className="font-semibold text-foreground">{title}</h2>
      </div>
      {children}
    </div>
  );
}

function ClayField({
  icon,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  icon: React.ReactNode;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  type?: string;
}) {
  return (
    <div className="clay-inset flex items-center gap-3 px-4 py-3">
      <span className="text-muted-foreground">{icon}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="flex-1 bg-transparent outline-none text-sm placeholder:text-muted-foreground"
      />
    </div>
  );
}