import { DashboardLayout } from "@/components/template/DashboardLayout";
import { UserProfileLayout } from "@/components/template/UserProfileLayout";
import React from "react";

export default function Layout({ children }) {
  return <UserProfileLayout>{children}</UserProfileLayout>;
}
