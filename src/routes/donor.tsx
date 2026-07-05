import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppNav } from "@/components/AppNav";
import { User, Phone, Calendar, Droplet, GraduationCap, IdCard, CheckCircle2, Loader2 } from "lucide-react";

export const Route = createFileRoute("/donor")({
  head: () => ({
    meta: [
      { title: "Become a Donor — Akshit Foundation" },
      { name: "description", content: "Register as a verified blood donor and help save lives." },
    ],
  }),
  component: DonorPage,
});

const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];

function DonorPage() {
  const [bg, setBg] = useState<string | null>(null);
  const [volunteer, setVolunteer] = useState(false);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setDone(true);
    }, 1000);
  };

  if (done) {
    return (
      <div className="min-h-screen pb-28 md:pb-8">
        <AppNav />
        <main className="mx-auto max-w-md px-4 pt-20 text-center animate-fade-in">
          <div className="clay p-10">
            <div className="clay-inset w-20 h-20 grid place-items-center mx-auto">
              <CheckCircle2 className="w-10 h-10 text-primary" />
            </div>
            <h1 className="text-2xl font-bold mt-6">You're registered</h1>
            <p className="text-muted-foreground mt-2 text-sm">
              Thank you for joining. We'll notify you when someone nearby needs your blood type.
            </p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-28 md:pb-8">
      <AppNav />
      <main className="mx-auto max-w-2xl px-4 pt-10 animate-fade-in">
        <div className="text-center mb-10">
          <div className="inline-flex clay-sm w-14 h-14 items-center justify-center mb-4">
            <Droplet className="w-7 h-7 text-primary" fill="currentColor" />
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">Donor Registration</h1>
          <p className="mt-2 text-muted-foreground text-sm">Join a network of verified lifesavers.</p>
        </div>

        <form onSubmit={submit} className="clay p-6 md:p-8 space-y-5 animate-slide-up">
          <Field icon={<User className="w-4 h-4" />} label="Full Name" placeholder="Your name" />
          <Field icon={<Phone className="w-4 h-4" />} label="Phone" placeholder="Mobile number" type="tel" />

          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 block">
              Blood Group
            </label>
            <div className="flex flex-wrap gap-2">
              {BLOOD_GROUPS.map((g) => (
                <button
                  type="button"
                  key={g}
                  onClick={() => setBg(g)}
                  className={`px-4 py-2 rounded-full text-sm font-bold transition-all duration-200 ${
                    bg === g ? "clay-red" : "clay-sm text-foreground/80 hover:text-primary"
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <Field icon={<Calendar className="w-4 h-4" />} label="Date of Birth" type="date" />
            <Field icon={<Calendar className="w-4 h-4" />} label="Last Donated" type="date" />
          </div>

          {/* Toggle */}
          <div className="clay-inset flex items-center justify-between px-5 py-4">
            <div className="flex items-center gap-3">
              <GraduationCap className="w-5 h-5 text-primary" />
              <div>
                <div className="text-sm font-semibold">College Volunteer</div>
                <div className="text-xs text-muted-foreground">Are you part of NSS / NCC?</div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setVolunteer((v) => !v)}
              className={`relative w-12 h-7 rounded-full transition-colors duration-200 ${
                volunteer ? "bg-primary" : "bg-slate-300"
              }`}
              aria-pressed={volunteer}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-6 h-6 rounded-full bg-white shadow transition-transform duration-200 ${
                  volunteer ? "translate-x-5" : ""
                }`}
              />
            </button>
          </div>

          {/* Expandable */}
          <div
            className={`grid transition-all duration-300 ease-out ${
              volunteer ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
            }`}
          >
            <div className="overflow-hidden">
              <div className="grid sm:grid-cols-3 gap-3 pt-1">
                <Field icon={<GraduationCap className="w-4 h-4" />} label="College Name" placeholder="e.g. IIT Delhi" />
                <Field icon={<User className="w-4 h-4" />} label="Role" placeholder="NSS Lead" />
                <Field icon={<IdCard className="w-4 h-4" />} label="Student ID" placeholder="ID number" />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="clay-red w-full py-4 text-base font-bold transition-transform duration-200 hover:-translate-y-0.5 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" /> Registering…
              </>
            ) : (
              "Register as Donor"
            )}
          </button>
        </form>
      </main>
    </div>
  );
}

function Field({
  icon,
  label,
  placeholder,
  type = "text",
}: {
  icon: React.ReactNode;
  label: string;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div>
      <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 block">
        {label}
      </label>
      <div className="clay-inset flex items-center gap-3 px-4 py-3">
        <span className="text-muted-foreground">{icon}</span>
        <input
          type={type}
          placeholder={placeholder}
          className="flex-1 bg-transparent outline-none text-sm placeholder:text-muted-foreground"
        />
      </div>
    </div>
  );
}