"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  useEffect(() => {
    if (!token) {
      toast.error("Invalid verification link");
      return;
    }

    const verifyEmail = async () => {
      try {
        toast.loading("Verifying your email...");

        const res = await authClient.verifyEmail({
          query: {
            token: token,
          },
        });
        console.log(res);
        if (!res == null) throw new Error();

        toast.success("Email verified successfully!");

        setTimeout(() => {
          router.push("/login");
        }, 1500);
      } catch (err) {
        toast.error("Verification failed or link expired");
      }
    };

    verifyEmail();
  }, [token, router]);

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <Image src="/icon.png" alt="Loading" width={100} height={100} />

      <p className="text-md font-medium">Verifying your email...</p>
    </div>
  );
}
