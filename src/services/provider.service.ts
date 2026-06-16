import { env } from "../../env";
import { cookies } from "next/headers";

const getProviders = async (query?: string) => {
  try {
    const res = await fetch(`${env.NEXT_PUBLIC_SERVER_URL}/api/v1/providers${query ? `?${query}` : ""}`, {
      cache: "no-store", // Dynamic SSR
    });
    
    if (!res.ok) {
      throw new Error(`Failed to fetch providers: ${res.statusText}`);
    }
    
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching providers:", error);
    return { success: false, data: [] };
  }
};

const getProviderWithId = async (id: string) => {
  try {
    const res = await fetch(`${env.NEXT_PUBLIC_SERVER_URL}/api/v1/provider/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch provider ${id}: ${res.statusText}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching provider:", error);
    return { success: false, data: null };
  }
};

export const ProviderService = {
  getProviders,
  getProviderWithId,
};
