"use client";
import { logoutSubmit } from "@/app/actions/auth-actions";
import { useAuth } from "@/app/context/AuthContext";
import { Button } from "@/components/ui/button";

export default function page() {
  const { user } = useAuth();
  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome to your dashboard! {user?.username}</p>
      <Button onClick={logoutSubmit}>Log Out</Button>
    </div>
  );
}
