"use client"

import Cookies from "js-cookie"; //pake js-cookie kalo di client
import { useRouter } from "next/navigation";

export const useLogout = () => {
  const router = useRouter();
  const handleLogout = () => {
    Cookies.remove("token"); //remove token cookie
    Cookies.remove("id"); //remove user id cookie
    Cookies.remove("isLogin"); //remove isLogin cookie
    Cookies.remove("username"); //remove isLogin cookie
    localStorage.removeItem("userData");

    setTimeout(() => router.push("/login"), 1000);
    router.refresh();
  };

  return {
    handleLogout,
  };
};
