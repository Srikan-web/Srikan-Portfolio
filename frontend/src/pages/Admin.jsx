import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { Lock, Trash2, Mail, Check, ArrowLeft, Inbox, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function Admin() {
  const [key, setKey] = useState(localStorage.getItem("admin-key") || "");
  const [authed, setAuthed] = useState(false);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const headers = { "X-Admin-Key": key };

  const load = async (k = key) => {
    setLoading(true);
    try {
      const res = await axios.get(`${API}/admin/messages`, { headers: { "X-Admin-Key": k } });
      setMessages(res.data);
      setAuthed(true);
      localStorage.setItem("admin-key", k);
    } catch (e) {
      toast.error("Invalid admin key");
      setAuthed(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (key) load(key);
    // eslint-disable-next-line
  }, []);

  const markRead = async (id) => {
    await axios.patch(`${API}/admin/messages/${id}/read`, {}, { headers });
    setMessages((m) => m.map((x) => (x.id === id ? { ...x, read: true } : x)));
  };

  const remove = async (id) => {
    await axios.delete(`${API}/admin/messages/${id}`, { headers });
    setMessages((m) => m.filter((x) => x.id !== id));
    toast.success("Message deleted");
  };

  if (!authed) {
    return (
      <main className="min-h-screen bg-background grid place-items-center container-px">
        <div className="w-full max-w-sm border border-border rounded-md p-8 bg-card">
          <div className="h-12 w-12 grid place-items-center rounded-md bg-secondary text-accent mb-5">
            <Lock className="h-6 w-6" />
          </div>
          <h1 className="font-heading text-2xl font-bold">Admin Access</h1>
          <p className="text-sm text-muted-foreground mt-1">Enter your admin key to view contact messages.</p>
          <div className="mt-5">
            <Label htmlFor="key" className="text-xs uppercase tracking-[0.1em] text-muted-foreground">Admin Key</Label>
            <Input id="key" type="password" value={key} onChange={(e) => setKey(e.target.value)} className="mt-2 rounded-md" data-testid="admin-key-input" onKeyDown={(e) => e.key === "Enter" && load()} />
          </div>
          <Button onClick={() => load()} disabled={loading} className="mt-5 w-full rounded-md gap-2" data-testid="admin-login">
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Lock className="h-4 w-4" />} Unlock
          </Button>
          <Link to="/" className="mt-4 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> Back to site
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="container-px py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-2">
              <ArrowLeft className="h-4 w-4" /> Back to site
            </Link>
            <h1 className="font-heading text-3xl font-extrabold tracking-tight">Contact Messages</h1>
          </div>
          <div className="text-right">
            <div className="font-heading text-3xl font-extrabold text-accent">{messages.length}</div>
            <div className="text-xs uppercase tracking-[0.15em] text-muted-foreground">Total</div>
          </div>
        </div>

        {messages.length === 0 ? (
          <div className="border border-border rounded-md p-16 text-center text-muted-foreground">
            <Inbox className="h-10 w-10 mx-auto mb-4 opacity-50" />
            No messages yet.
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((m) => (
              <div key={m.id} className={`border rounded-md p-5 ${m.read ? "border-border bg-card" : "border-accent/50 bg-accent/5"}`} data-testid={`admin-message-${m.id}`}>
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-heading font-bold">{m.name}</span>
                      {!m.read && <span className="text-[10px] uppercase tracking-wider font-bold text-accent bg-accent/10 px-2 py-0.5 rounded-full">New</span>}
                    </div>
                    <a href={`mailto:${m.email}`} className="text-sm text-accent hover:underline inline-flex items-center gap-1.5 mt-1">
                      <Mail className="h-3.5 w-3.5" /> {m.email}
                    </a>
                    {m.subject && <div className="text-sm font-medium mt-2">{m.subject}</div>}
                    <p className="text-sm text-muted-foreground mt-2 leading-relaxed whitespace-pre-wrap">{m.message}</p>
                    <div className="text-xs text-muted-foreground mt-3">{new Date(m.created_at).toLocaleString()}</div>
                  </div>
                  <div className="flex flex-col gap-2 shrink-0">
                    {!m.read && (
                      <button onClick={() => markRead(m.id)} className="h-9 w-9 grid place-items-center rounded-md border border-border hover:bg-secondary" title="Mark read" data-testid={`admin-read-${m.id}`}>
                        <Check className="h-4 w-4" />
                      </button>
                    )}
                    <button onClick={() => remove(m.id)} className="h-9 w-9 grid place-items-center rounded-md border border-border hover:bg-destructive hover:text-destructive-foreground" title="Delete" data-testid={`admin-delete-${m.id}`}>
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
