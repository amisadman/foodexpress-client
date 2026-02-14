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

const verifyEmail = async(token: string) =>{
  try {
    
    const data = await re
    if (res === null)
      return { success: false, message: "Something went wrong" };

     return { success: true, data: res };

  
    
  } catch (error) {
     return { success: false, error: "Something went wrong" };
    
  }
}

export const UserService = {
  getSession,
};
