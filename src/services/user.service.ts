import { cookies } from "next/headers";
import { env } from "../../env";

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

export const UserService = {
  getSession,
};
