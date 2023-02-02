import client from "@/constants/apollo-client";
import authenticatedVar from "@/constants/authenticated";
import { API_URL } from "@/constants/urls";

export const useLogout = () => {
  const logout = async () => {
    const res = await fetch(`${API_URL}/auth/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    client.refetchQueries({ include: "active" });
    authenticatedVar(false);
  };
  return { logout };
};
