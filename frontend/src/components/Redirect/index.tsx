"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

export default function RedirectOnLogin({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const router = useRouter();
  const [checkComplete, setCheckComplete] = useState(false);

  useEffect(() => {
    if (status !== "loading") {
      if (!session && pathname !== "/") {
        router.push("/");
      } else if (session && pathname === "/") {
        router.push("/dashboard");
      } else {
        setCheckComplete(true);
      }
    }
  }, [session, status, pathname, router]);

  if (!checkComplete) return null;

  return <>{children}</>;
}
