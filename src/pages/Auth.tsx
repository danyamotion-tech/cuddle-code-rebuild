import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import { useAuth } from "@/hooks/useAuth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const Auth = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!authLoading && user) navigate("/friends", { replace: true });
  }, [user, authLoading, navigate]);

  const handleEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    try {
      if (mode === "signup") {
        const cleaned = username.trim().toLowerCase().replace(/[^a-z0-9_]/g, "");
        if (cleaned.length < 3) {
          toast.error("Username must be at least 3 characters (a-z, 0-9, _)");
          return;
        }
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: window.location.origin,
            data: { username: cleaned },
          },
        });
        if (error) throw error;
        toast.success("Account created. Check your email to confirm if required.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      }
    } catch (err: any) {
      toast.error(err.message ?? "Something went wrong");
    } finally {
      setBusy(false);
    }
  };

  const handleGoogle = async () => {
    setBusy(true);
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin,
    });
    if (result.error) {
      toast.error(result.error.message ?? "Google sign-in failed");
      setBusy(false);
    }
  };

  return (
    <main className="min-h-screen bg-background px-6 sm:px-10 py-20">
      <div className="max-w-md mx-auto">
        <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">← Back</Link>
        <h1 className="text-4xl font-light tracking-tight mt-8 mb-2">
          {mode === "signin" ? "Sign in" : "Create account"}
        </h1>
        <p className="text-sm text-muted-foreground mb-10">
          {mode === "signin" ? "Welcome back to CineVerse." : "Join the conversation about cinema."}
        </p>

        <Button
          type="button"
          variant="outline"
          className="w-full rounded-none border-foreground/20 hover:bg-foreground hover:text-background"
          onClick={handleGoogle}
          disabled={busy}
        >
          Continue with Google
        </Button>

        <div className="flex items-center gap-3 my-6 text-xs text-muted-foreground uppercase tracking-widest">
          <div className="flex-1 h-px bg-foreground/10" />
          or
          <div className="flex-1 h-px bg-foreground/10" />
        </div>

        <form onSubmit={handleEmail} className="space-y-5">
          {mode === "signup" && (
            <div>
              <label className="text-xs uppercase tracking-widest text-muted-foreground">Username</label>
              <Input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="cinephile_42"
                className="rounded-none border-0 border-b border-foreground/20 px-0 focus-visible:ring-0 focus-visible:border-foreground"
                required
              />
            </div>
          )}
          <div>
            <label className="text-xs uppercase tracking-widest text-muted-foreground">Email</label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-none border-0 border-b border-foreground/20 px-0 focus-visible:ring-0 focus-visible:border-foreground"
              required
            />
          </div>
          <div>
            <label className="text-xs uppercase tracking-widest text-muted-foreground">Password</label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="rounded-none border-0 border-b border-foreground/20 px-0 focus-visible:ring-0 focus-visible:border-foreground"
              minLength={6}
              required
            />
          </div>
          <Button
            type="submit"
            className="w-full rounded-none bg-foreground text-background hover:bg-foreground/90"
            disabled={busy}
          >
            {mode === "signin" ? "Sign in" : "Create account"}
          </Button>
        </form>

        <button
          type="button"
          onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
          className="mt-8 text-sm text-muted-foreground hover:text-foreground"
        >
          {mode === "signin" ? "Need an account? Sign up" : "Already have an account? Sign in"}
        </button>
      </div>
    </main>
  );
};

export default Auth;
