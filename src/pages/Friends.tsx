import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

type Profile = {
  id: string;
  username: string;
  display_name: string | null;
  avatar_url: string | null;
};

const Initial = ({ p }: { p: Profile }) => (
  <div className="w-10 h-10 bg-foreground/5 flex items-center justify-center text-sm font-medium text-foreground/70 overflow-hidden">
    {p.avatar_url ? (
      <img src={p.avatar_url} alt={p.username} className="w-full h-full object-cover" />
    ) : (
      (p.display_name ?? p.username).charAt(0).toUpperCase()
    )}
  </div>
);

const Friends = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const qc = useQueryClient();
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!authLoading && !user) navigate("/auth", { replace: true });
  }, [user, authLoading, navigate]);

  const { data: following, isLoading: loadingFollowing } = useQuery({
    queryKey: ["following", user?.id],
    enabled: !!user,
    queryFn: async (): Promise<Profile[]> => {
      const { data: rows, error } = await supabase
        .from("follows")
        .select("following_id")
        .eq("follower_id", user!.id);
      if (error) throw error;
      const ids = (rows ?? []).map((r) => r.following_id);
      if (ids.length === 0) return [];
      const { data, error: e2 } = await supabase
        .from("profiles")
        .select("id, username, display_name, avatar_url")
        .in("id", ids);
      if (e2) throw e2;
      return data ?? [];
    },
  });

  const { data: followers } = useQuery({
    queryKey: ["followers", user?.id],
    enabled: !!user,
    queryFn: async (): Promise<Profile[]> => {
      const { data: rows, error } = await supabase
        .from("follows")
        .select("follower_id")
        .eq("following_id", user!.id);
      if (error) throw error;
      const ids = (rows ?? []).map((r) => r.follower_id);
      if (ids.length === 0) return [];
      const { data, error: e2 } = await supabase
        .from("profiles")
        .select("id, username, display_name, avatar_url")
        .in("id", ids);
      if (e2) throw e2;
      return data ?? [];
    },
  });

  const followingIds = useMemo(() => new Set((following ?? []).map((p) => p.id)), [following]);

  const { data: results, isFetching: searching } = useQuery({
    queryKey: ["profile-search", search],
    enabled: !!user && search.trim().length >= 2,
    queryFn: async (): Promise<Profile[]> => {
      const { data, error } = await supabase
        .from("profiles")
        .select("id, username, display_name, avatar_url")
        .ilike("username", `%${search.trim().toLowerCase()}%`)
        .neq("id", user!.id)
        .limit(20);
      if (error) throw error;
      return data ?? [];
    },
  });

  const follow = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("follows").insert({ follower_id: user!.id, following_id: id });
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["following", user?.id] });
      toast.success("Followed");
    },
    onError: (e: any) => toast.error(e.message ?? "Failed"),
  });

  const unfollow = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("follows")
        .delete()
        .eq("follower_id", user!.id)
        .eq("following_id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["following", user?.id] });
      toast.success("Unfollowed");
    },
  });

  if (authLoading || !user) {
    return (
      <main className="min-h-screen px-6 sm:px-10 py-20">
        <Skeleton className="h-12 w-64" />
      </main>
    );
  }

  const renderRow = (p: Profile) => {
    const isFollowing = followingIds.has(p.id);
    return (
      <li key={p.id} className="flex items-center gap-4 py-4 border-b border-foreground/10">
        <Initial p={p} />
        <div className="flex-1 min-w-0">
          <div className="text-sm font-medium truncate">{p.display_name ?? p.username}</div>
          <div className="text-xs text-muted-foreground truncate">@{p.username}</div>
        </div>
        {isFollowing ? (
          <Button
            variant="outline"
            size="sm"
            className="rounded-none border-foreground/20"
            onClick={() => unfollow.mutate(p.id)}
            disabled={unfollow.isPending}
          >
            Following
          </Button>
        ) : (
          <Button
            size="sm"
            className="rounded-none bg-foreground text-background hover:bg-foreground/90"
            onClick={() => follow.mutate(p.id)}
            disabled={follow.isPending}
          >
            Follow
          </Button>
        )}
      </li>
    );
  };

  return (
    <main className="min-h-screen bg-background px-6 sm:px-10 py-16 max-w-3xl mx-auto">
      <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">← Back</Link>
      <h1 className="text-5xl font-light tracking-tight mt-8 mb-12">Friends</h1>

      <section className="mb-16">
        <label className="text-xs uppercase tracking-widest text-muted-foreground">Find people</label>
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by username"
          className="rounded-none border-0 border-b border-foreground/20 px-0 mt-2 focus-visible:ring-0 focus-visible:border-foreground"
        />
        {search.trim().length >= 2 && (
          <ul className="mt-4">
            {searching && <Skeleton className="h-12 w-full" />}
            {!searching && results && results.length === 0 && (
              <li className="py-6 text-sm text-muted-foreground">No users found.</li>
            )}
            {results?.map(renderRow)}
          </ul>
        )}
      </section>

      <section className="mb-16">
        <h2 className="text-xs uppercase tracking-widest text-muted-foreground mb-2">
          Following ({following?.length ?? 0})
        </h2>
        {loadingFollowing ? (
          <Skeleton className="h-12 w-full" />
        ) : following && following.length > 0 ? (
          <ul>{following.map(renderRow)}</ul>
        ) : (
          <p className="py-6 text-sm text-muted-foreground">You're not following anyone yet.</p>
        )}
      </section>

      <section>
        <h2 className="text-xs uppercase tracking-widest text-muted-foreground mb-2">
          Followers ({followers?.length ?? 0})
        </h2>
        {followers && followers.length > 0 ? (
          <ul>{followers.map(renderRow)}</ul>
        ) : (
          <p className="py-6 text-sm text-muted-foreground">No followers yet.</p>
        )}
      </section>
    </main>
  );
};

export default Friends;
