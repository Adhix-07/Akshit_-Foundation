import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import DataUploader from "@/components/Admin/DataUploader";
import {
  Bell,
  CheckCircle2,
  Download,
  FileText,
  HeartPulse,
  LayoutDashboard,
  Search,
  Settings,
  ShieldCheck,
  Siren,
  Trash2,
  Trophy,
  Users,
} from "lucide-react";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin Control - Akshit Foundation" },
      { name: "description", content: "Operations dashboard for verified administrators." },
    ],
  }),
  component: AdminPage,
});

const ADMIN_ACCESS_KEY = "AKSHITADMIN";

type RequestStatus = "Open" | "Closed";

type AdminRequest = {
  id: string;
  pat: string;
  bg: string;
  hosp: string;
  status: RequestStatus;
  time: string;
};

const INITIAL_REQUESTS: AdminRequest[] = [
  { id: "#RQ-1042", pat: "Neha S.", bg: "O-", hosp: "AIIMS Delhi", status: "Open", time: "2m ago" },
  { id: "#RQ-1041", pat: "Arjun K.", bg: "A+", hosp: "Apollo Blr", status: "Open", time: "9m ago" },
  {
    id: "#RQ-1039",
    pat: "Meera P.",
    bg: "AB-",
    hosp: "Fortis Mumbai",
    status: "Closed",
    time: "34m ago",
  },
  {
    id: "#RQ-1038",
    pat: "Rohit V.",
    bg: "B+",
    hosp: "Max Delhi",
    status: "Closed",
    time: "1h ago",
  },
  { id: "#RQ-1035", pat: "Isha R.", bg: "O+", hosp: "Manipal", status: "Open", time: "2h ago" },
];

const SIDE = [
  { label: "Dashboard", icon: LayoutDashboard, to: "/admin" },
  { label: "Donors", icon: Users, to: "/donor" },
  { label: "Requests", icon: HeartPulse, to: "/request" },
  { label: "Reports", icon: FileText, to: "/matches" },
  { label: "Alerts", icon: Bell, to: "/admin" },
  { label: "Settings", icon: Settings, to: "/admin" },
];

const REQUEST_FILTERS = ["All", "Open", "Closed"] as const;

type RequestFilter = (typeof REQUEST_FILTERS)[number];

function AdminPage() {
  const [verified, setVerified] = useState(false);

  if (!verified) {
    return <AdminVerification onVerified={() => setVerified(true)} />;
  }

  return <AdminDashboard />;
}

function AdminVerification({ onVerified }: { onVerified: () => void }) {
  const [accessKey, setAccessKey] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (accessKey.trim() === ADMIN_ACCESS_KEY) {
      setErrorMessage("");
      toast.success("Admin access verified");
      onVerified();
      return;
    }

    setErrorMessage("Incorrect Admin Password");
    toast.error("Incorrect Admin Password");
    setAccessKey("");
  };

  return (
    <div className="min-h-screen">
      <main className="min-h-screen px-4 py-10 grid place-items-center animate-fade-in">
        <form onSubmit={submit} className="clay w-full max-w-md p-6 md:p-8 space-y-5">
          <div className="clay-inset w-14 h-14 grid place-items-center text-primary">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight">Admin Verification</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Enter the secret access key to continue to the control panel.
            </p>
          </div>
          <label className="block space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
              Secret Access Key
            </span>
            <input
              type="password"
              value={accessKey}
              onChange={(event) => setAccessKey(event.target.value)}
              className="clay-inset w-full px-4 py-3 bg-transparent outline-none text-sm"
              placeholder="Enter access key"
              autoComplete="current-password"
            />
          </label>
          {errorMessage ? <p className="text-sm font-medium text-red-600">{errorMessage}</p> : null}
          <button
            type="submit"
            className="clay-red w-full py-3.5 text-sm font-bold uppercase tracking-wider"
          >
            Verify Access
          </button>
        </form>
      </main>
    </div>
  );
}

function AdminDashboard() {
  const [alertOn, setAlertOn] = useState(false);
  const [requests, setRequests] = useState(INITIAL_REQUESTS);
  const [requestFilter, setRequestFilter] = useState<RequestFilter>("All");
  const activeRequests = requests.filter((request) => request.status === "Open").length;
  const visibleRequests = requests.filter((request) => {
    if (requestFilter === "All") {
      return true;
    }

    return request.status === requestFilter;
  });

  const downloadDonorsCsv = () => {
    const rows = [
      ["Name", "Blood Group", "City", "Status"],
      ["Ravi K.", "O-", "Delhi", "Verified"],
      ["Priya M.", "A+", "Bangalore", "Verified"],
      ["Sana P.", "AB-", "Mumbai", "Verified"],
    ];
    const csv = rows.map((row) => row.map((cell) => `"${cell}"`).join(",")).join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8;" }));
    const link = document.createElement("a");

    link.href = url;
    link.download = "akshit-donors.csv";
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    toast.success("Donor CSV downloaded");
  };

  const markResolved = (id: string) => {
    setRequests((current) =>
      current.map((request) => (request.id === id ? { ...request, status: "Closed" } : request)),
    );
    toast.success("Request marked as resolved");
  };

  const deleteRequest = (id: string) => {
    setRequests((current) => current.filter((request) => request.id !== id));
    toast.success("Request removed");
  };

  return (
    <div className="min-h-screen pb-8">
      <main className="mx-auto max-w-7xl px-4 pt-8 animate-fade-in">
        <div className="grid md:grid-cols-[220px_1fr] gap-6">
          <aside className="clay p-3 h-fit hidden md:block sticky top-24">
            <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
              Control
            </div>
            <ul className="space-y-1">
              {SIDE.map((s) => (
                <li key={s.label}>
                  <Link
                    to={s.to}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                      s.to === "/admin"
                        ? "clay-inset text-primary"
                        : "text-foreground/70 hover:text-foreground"
                    }`}
                  >
                    <s.icon className="w-4 h-4" />
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </aside>

          <div className="min-w-0 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="min-w-0">
                <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
                  Control Panel
                </h1>
                <p className="text-xs text-muted-foreground">Real-time overview of the network</p>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                <button
                  type="button"
                  onClick={downloadDonorsCsv}
                  className="clay-sm px-4 py-2.5 text-sm font-semibold text-foreground/80 hover:text-primary transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Download CSV
                </button>
                <div className="clay-inset hidden sm:flex items-center gap-2 px-4 py-2.5 w-64">
                  <Search className="w-4 h-4 text-muted-foreground" />
                  <input
                    placeholder="Search requests, donors..."
                    className="bg-transparent outline-none text-sm w-full placeholder:text-muted-foreground"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Metric icon={Users} label="Total Donors" value="12,480" delta="+128 this week" />
              <Metric
                icon={HeartPulse}
                label="Active Requests"
                value={String(activeRequests)}
                delta="4 critical"
                tone="red"
              />
              <Metric icon={Trophy} label="Lives Saved" value="3,207" delta="+42 this month" />
            </div>

            <div className="clay p-6 flex flex-col md:flex-row items-center gap-6">
              <div className="flex-1 min-w-0">
                <div className="text-[10px] uppercase tracking-widest text-primary font-bold">
                  Emergency Broadcast
                </div>
                <div className="text-lg md:text-xl font-extrabold mt-1">
                  Trigger a Red Alert for rare blood groups
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Notifies every verified donor within 25 km of matching rare groups (Bombay, AB-,
                  O-).
                </p>
              </div>
              <button
                onClick={() => setAlertOn((v) => !v)}
                className="clay-red relative shrink-0 w-56 h-24 rounded-3xl font-extrabold uppercase tracking-wider text-sm flex items-center justify-center gap-2 transition-opacity duration-200"
              >
                <Siren className="w-5 h-5" />
                {alertOn ? "Alert Active" : "Trigger Red Alert"}
              </button>
            </div>

            <DataUploader />

            <div className="clay p-4 md:p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold">Requests</h2>
                <div className="flex gap-1.5">
                  {REQUEST_FILTERS.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setRequestFilter(t)}
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                        requestFilter === t
                          ? "clay-inset text-primary"
                          : "text-foreground/60 hover:text-foreground"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-[11px] uppercase tracking-wider text-muted-foreground">
                      <th className="py-2 pr-4 font-semibold">ID</th>
                      <th className="py-2 pr-4 font-semibold">Patient</th>
                      <th className="py-2 pr-4 font-semibold">Group</th>
                      <th className="py-2 pr-4 font-semibold">Hospital</th>
                      <th className="py-2 pr-4 font-semibold">Status</th>
                      <th className="py-2 pr-4 font-semibold">When</th>
                      <th className="py-2 pr-4 font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {visibleRequests.map((r) => (
                      <tr key={r.id} className="border-t border-slate-200/70">
                        <td className="py-3 pr-4 font-mono text-xs text-foreground/70">{r.id}</td>
                        <td className="py-3 pr-4 font-medium">{r.pat}</td>
                        <td className="py-3 pr-4">
                          <span className="clay-sm px-2.5 py-1 text-xs font-bold text-primary">
                            {r.bg}
                          </span>
                        </td>
                        <td className="py-3 pr-4 text-foreground/80">{r.hosp}</td>
                        <td className="py-3 pr-4">
                          <span
                            className={`px-2.5 py-1 rounded-full text-[11px] font-semibold ${
                              r.status === "Open"
                                ? "bg-primary/10 text-primary"
                                : "bg-emerald-100 text-emerald-700"
                            }`}
                          >
                            {r.status}
                          </span>
                        </td>
                        <td className="py-3 pr-4 text-xs text-muted-foreground">{r.time}</td>
                        <td className="py-3 pr-4">
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => markResolved(r.id)}
                              disabled={r.status === "Closed"}
                              className="clay-sm px-3 py-1.5 text-xs font-semibold text-foreground/70 hover:text-primary transition-colors duration-200 disabled:opacity-50 disabled:hover:text-foreground/70 flex items-center gap-1.5"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              {r.status === "Closed" ? "Resolved" : "Mark as Resolved"}
                            </button>
                            <button
                              type="button"
                              onClick={() => deleteRequest(r.id)}
                              className="clay-sm w-9 h-9 grid place-items-center text-foreground/60 hover:text-primary transition-colors duration-200"
                              aria-label={`Delete spam request ${r.id}`}
                              title="Delete/Spam"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function Metric({
  icon: Icon,
  label,
  value,
  delta,
  tone,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  delta: string;
  tone?: "red";
}) {
  return (
    <div className="clay p-5 flex items-center gap-4">
      <div
        className={`clay-inset w-12 h-12 grid place-items-center ${tone === "red" ? "text-primary" : "text-foreground/70"}`}
      >
        <Icon className="w-5 h-5" />
      </div>
      <div className="min-w-0">
        <div className="text-[11px] uppercase tracking-widest text-muted-foreground">{label}</div>
        <div className="text-2xl font-extrabold text-foreground">{value}</div>
        <div
          className={`text-[11px] mt-0.5 ${tone === "red" ? "text-primary" : "text-muted-foreground"}`}
        >
          {delta}
        </div>
      </div>
    </div>
  );
}

export default AdminPage;
