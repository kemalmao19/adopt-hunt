"use client"

import Cookies from "js-cookie"; //pake js-cookie kalo di client
import { useRouter } from "next/navigation";

export const useLogout = () => {
  const router = useRouter();
  const handleLogout = () => {
    Cookies.remove("token"); //remove token cookie
    Cookies.remove("id"); //remove user id cookie
    Cookies.remove("isLogin"); //remove isLogin cookie
    localStorage.removeItem("userData"); //remove user data

    router.refresh();
    router.push("/login");
  };

  return {
    handleLogout,
  };
};
