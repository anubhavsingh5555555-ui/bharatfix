 "use client";

import { useMemo, useState } from "react";
import {
  Activity, AlertTriangle, ArrowUpRight, BarChart3, CheckCircle2,
  ChevronDown, Clock3, FileImage, Filter, MapPin, Menu, Plus,
  Search, ShieldCheck, Sparkles, UploadCloud, X
} from "lucide-react";

type Status = "Pending" | "In Progress" | "Resolved";
type Issue = {
  id: number; title: string; category: string; area: string; reports: number;
  priority: "High" | "Medium" | "Low"; status: Status; date: string; description: string;
};

const initialIssues: Issue[] = [
  { id: 1042, title: "Large pothole near market crossing", category: "Road Damage", area: "Rajpur Road", reports: 12, priority: "High", status: "Pending", date: "Today, 10:24 AM", description: "A deep pothole is affecting two-wheeler and car traffic." },
  { id: 1041, title: "Garbage accumulation beside park", category: "Garbage", area: "Vasant Vihar", reports: 8, priority: "High", status: "In Progress", date: "Today, 9:10 AM", description: "Waste has been accumulating near the park entrance." },
  { id: 1040, title: "Streetlight not working", category: "Streetlight", area: "Jakhan", reports: 4, priority: "Medium", status: "Pending", date: "Yesterday", description: "The streetlight has not been working for several nights." },
  { id: 1039, title: "Blocked roadside drain", category: "Drainage", area: "Clement Town", reports: 3, priority: "Medium", status: "Resolved", date: "Yesterday", description: "Drain water was overflowing onto the footpath." },
];

const categories = ["Road Damage", "Garbage", "Drainage", "Streetlight", "Footpath", "Other"];

export default function Home() {
  const [issues, setIssues] = useState<Issue[]>(initialIssues);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showForm, setShowForm] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [photoName, setPhotoName] = useState("");
  const [notice, setNotice] = useState("");
  const [form, setForm] = useState({ title: "", category: "Road Damage", area: "", description: "" });

  const filtered = useMemo(() => issues.filter(i =>
    (statusFilter === "All" || i.status === statusFilter) &&
    `${i.title} ${i.category} ${i.area} ${i.id}`.toLowerCase().includes(query.toLowerCase())
  ), [issues, query, statusFilter]);

  const high = issues.filter(i => i.priority === "High" && i.status !== "Resolved").length;
  const pending = issues.filter(i => i.status === "Pending").length;
  const resolved = issues.filter(i => i.status === "Resolved").length;

  function submitIssue(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title.trim() || !form.area.trim()) return;
    const newIssue: Issue = {
      id: Math.max(...issues.map(i => i.id), 1000) + 1,
      title: form.title, category: form.category, area: form.area, reports: 1,
      priority: form.category === "Road Damage" || form.category === "Drainage" ? "High" : "Medium",
      status: "Pending", date: "Just now", description: form.description || "No additional details provided."
    };
    setIssues([newIssue, ...issues]);
    setForm({ title: "", category: "Road Damage", area: "", description: "" });
    setPhotoName("");
    setShowForm(false);
    setNotice("Your report has been added to the demo dashboard.");
    setTimeout(() => setNotice(""), 4500);
  }

  function updateStatus(id: number, status: Status) {
    setIssues(current => current.map(i => i.id === id ? { ...i, status } : i));
  }

  return (
    <main>
      <header className="topbar">
        <a className="brand" href="#"><span className="brand-mark"><ShieldCheck size={22}/></span><span>BharatFix<span className="brand-ai"> AI</span><small>SMART CIVIC RESPONSE</small></span></a>
        <nav className={mobileMenu ? "nav open" : "nav"}>
          <a className="active" href="#dashboard" onClick={() => setMobileMenu(false)}>Dashboard</a>
          <a href="#issues" onClick={() => setMobileMenu(false)}>Reported Issues</a>
          <a href="#how" onClick={() => setMobileMenu(false)}>How it works</a>
        </nav>
        <div className="top-actions"><span className="live-dot">Demo environment</span><button className="report-btn" onClick={() => setShowForm(true)}><Plus size={17}/> Report an issue</button><button className="menu-btn" onClick={() => setMobileMenu(!mobileMenu)} aria-label="Toggle menu">{mobileMenu ? <X/> : <Menu/>}</button></div>
      </header>

      <section className="hero" id="dashboard">
        <div className="hero-content">
          <div className="eyebrow"><Sparkles size={14}/> CIVIC INTELLIGENCE PLATFORM</div>
          <h1>Better cities start<br/>with <span>being heard.</span></h1>
          <p>Report local problems. Bring duplicate complaints together.<br className="desktop"/> Help communities and civic teams focus on what matters most.</p>
          <button className="hero-cta" onClick={() => setShowForm(true)}>Report a civic issue <ArrowUpRight size={18}/></button>
        </div>
        <div className="hero-art" aria-hidden="true"><div className="orbit orbit-one"></div><div className="orbit orbit-two"></div><div className="pin"><MapPin size={36}/></div><div className="art-card card-a"><span className="art-icon orange"><AlertTriangle size={17}/></span><span><b>Priority detected</b><small>Road damage · High</small></span></div><div className="art-card card-b"><span className="art-icon green"><CheckCircle2 size={17}/></span><span><b>Issue grouped</b><small>12 similar reports</small></span></div><div className="art-label">LOCAL SIGNALS → REAL ACTION</div></div>
      </section>

      <section className="content">
        <div className="section-heading"><div><div className="eyebrow dark">OVERVIEW</div><h2>Civic pulse</h2><p>A live-style snapshot of the community reports in this demo.</p></div><div className="location-pill"><MapPin size={15}/> Dehradun, Uttarakhand <ChevronDown size={14}/></div></div>
        <div className="stats">
          <Stat icon={<Activity/>} label="Total issues" value={issues.length.toString()} note="Across all categories" tone="blue"/>
          <Stat icon={<AlertTriangle/>} label="High priority" value={high.toString()} note="Needs attention" tone="orange"/>
          <Stat icon={<Clock3/>} label="Pending" value={pending.toString()} note="Awaiting action" tone="purple"/>
          <Stat icon={<CheckCircle2/>} label="Resolved" value={resolved.toString()} note="Marked completed" tone="green"/>
        </div>

        <section className="issues-section" id="issues">
          <div className="issues-title"><div><div className="eyebrow dark">COMMUNITY REPORTS</div><h2>Reported issues</h2><p>Similar reports are grouped into a shared issue record.</p></div><button className="outline-btn" onClick={() => setShowForm(true)}><Plus size={16}/> New report</button></div>
          <div className="toolbar"><div className="searchbox"><Search size={17}/><input placeholder="Search issue, area or ID..." value={query} onChange={e => setQuery(e.target.value)}/></div><div className="filterbox"><Filter size={16}/><select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} aria-label="Filter by status"><option>All</option><option>Pending</option><option>In Progress</option><option>Resolved</option></select></div></div>
          <div className="table-wrap"><table><thead><tr><th>ISSUE</th><th>AREA</th><th>REPORTS</th><th>PRIORITY</th><th>STATUS</th><th>UPDATE STATUS</th></tr></thead><tbody>
            {filtered.map(issue => <tr key={issue.id}><td><div className="issue-name">{issue.title}</div><div className="issue-meta">#{issue.id} · {issue.category} · {issue.date}</div></td><td><span className="area"><MapPin size={13}/>{issue.area}</span></td><td><span className="report-count">{issue.reports}</span></td><td><span className={`priority ${issue.priority.toLowerCase()}`}><i/>{issue.priority}</span></td><td><span className={`status ${issue.status.toLowerCase().replace(" ", "-")}`}>{issue.status}</span></td><td><select className="status-select" value={issue.status} onChange={e => updateStatus(issue.id, e.target.value as Status)} aria-label={`Update status for ${issue.title}`}><option>Pending</option><option>In Progress</option><option>Resolved</option></select></td></tr>)}
            {filtered.length === 0 && <tr><td colSpan={6} className="empty">No matching reports. Try another search.</td></tr>}
          </tbody></table></div>
          <div className="table-foot"><span>Showing {filtered.length} of {issues.length} issues</span><span><span className="legend-dot"></span> Demo data · Changes reset on refresh</span></div>
        </section>

        <section className="how" id="how"><div><div className="eyebrow dark">FROM REPORT TO RESOLUTION</div><h2>One clear path to action.</h2><p>BharatFix AI adds an intelligence layer to civic issue reporting.</p></div><div className="steps"><Step n="01" title="Report" desc="Citizen shares a photo, description and location."/><Step n="02" title="Understand" desc="AI-assisted category suggestion and duplicate matching."/><Step n="03" title="Prioritize" desc="Related reports are grouped and ranked by urgency."/><Step n="04" title="Act" desc="Teams track progress and update the issue status."/></div></section>
      </section>

      <footer><a className="brand footer-brand" href="#"><span className="brand-mark"><ShieldCheck size={19}/></span><span>BharatFix<span className="brand-ai"> AI</span><small>SMART CIVIC RESPONSE</small></span></a><span>Built to support smarter civic action. Not an official government portal.</span><span>© 2026 BharatFix AI Concept</span></footer>

      {notice && <div className="toast"><CheckCircle2 size={18}/>{notice}</div>}
      {showForm && <div className="modal-backdrop" onMouseDown={e => { if (e.target === e.currentTarget) setShowForm(false); }}><div className="modal"><div className="modal-head"><div><div className="eyebrow dark">CITIZEN REPORT</div><h2>Report a civic issue</h2><p>Share the details so the issue can be reviewed.</p></div><button className="close-btn" onClick={() => setShowForm(false)} aria-label="Close"><X/></button></div><form onSubmit={submitIssue}><label>Issue title<input required placeholder="e.g. Pothole near bus stop" value={form.title} onChange={e => setForm({...form, title:e.target.value})}/></label><div className="form-row"><label>Category<select value={form.category} onChange={e => setForm({...form, category:e.target.value})}>{categories.map(c => <option key={c}>{c}</option>)}</select></label><label>Area / locality<input required placeholder="e.g. Rajpur Road" value={form.area} onChange={e => setForm({...form, area:e.target.value})}/></label></div><label>Description<textarea rows={3} placeholder="Describe what happened and any safety concern..." value={form.description} onChange={e => setForm({...form, description:e.target.value})}/></label><label className="upload"><UploadCloud size={22}/><span><b>{photoName || "Attach a photo (optional)"}</b><small>Choose an image from your device</small></span><input type="file" accept="image/*" onChange={e => setPhotoName(e.target.files?.[0]?.name || "")}/><FileImage size={19}/></label><div className="form-note"><Sparkles size={15}/> Demo: category and priority suggestions are illustrative, not a live AI model.</div><button className="submit-btn" type="submit">Submit report <ArrowUpRight size={17}/></button></form></div></div>}
    </main>
  );
}

function Stat({icon,label,value,note,tone}:{icon:React.ReactNode;label:string;value:string;note:string;tone:string}) {
  return <div className="stat-card"><div className={`stat-icon ${tone}`}>{icon}</div><div className="stat-label">{label}</div><div className="stat-value">{value}</div><div className="stat-note">{note}</div></div>;
}
function Step({n,title,desc}:{n:string;title:string;desc:string}) {
  return <div className="step"><span>{n}</span><div><b>{title}</b><p>{desc}</p></div></div>;
}
