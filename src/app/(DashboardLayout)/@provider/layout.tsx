import { UserService } from "@/services/user.service";
import { redirect } from "next/navigation";

export default async function ProviderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await UserService.getSession();
  const user = session?.data?.user;

  if (user?.role === "PROVIDER") {
    const me = await UserService.getMe();
    
    // If we have a successful response and providerProfile is null, redirect to complete-profile.
    // We check success just in case /user/me throws 403 as warned in backend docs, 
    // although if it does, we might need a different approach.
    if (me?.success && !me?.data?.providerProfile) {
      redirect("/complete-profile");
    }
  }

  return <>{children}</>;
}
