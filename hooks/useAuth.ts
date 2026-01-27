import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { get } from "@lib/api";

export function useAuth(redirectIfNotAuth: boolean = true) {
  const [user, setUser] = useState<{
    id: string;
    email: string;
    fullName: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function checkAuth() {
      try {
        const data = await get<{
          user: { id: string; email: string; fullName: string };
        }>("/api/auth/me");
        setUser(data.user);
      } catch {
        setUser(null);
        if (redirectIfNotAuth) router.replace("/auth");
      } finally {
        setLoading(false);
      }
    }

    checkAuth();
  }, [router]);

  return { user, loading };
}
