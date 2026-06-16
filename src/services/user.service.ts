import { cookies } from "next/headers";
import { env } from "../../env";
import { authClient } from "@/lib/auth-client";

const getSession = async () => {
  try {
    const cookieStore = await cookies();
    const res = await fetch(`${env.AUTH_URL}/get-session`, {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });
    const sessionData = await res.json();
    if (sessionData === null)
      return { success: false, message: "No session found" };
    return { success: true, data: sessionData };
  } catch (error) {
    return { success: false, error: "Something went wrong" };
  }
};

const getMe = async () => {
  try {
    const cookieStore = await cookies();
    const res = await fetch(`${env.NEXT_PUBLIC_SERVER_URL}/api/v1/user/me`, {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    return { success: false, error: "Something went wrong" };
  }
};

export const UserService = {
  getSession,
  getMe,
};
