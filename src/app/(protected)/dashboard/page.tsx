"use client";
import { useAuth } from "@/app/context/AuthContext";
import { Button } from "@/components/ui/button";

export default function page() {
  const { user, logout, isTokenValidate } = useAuth();

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome to your dashboard! {user?.username}</p>
      <Button onClick={logout}>Log Out</Button>
      <Button onClick={isTokenValidate}>validate</Button>
    </div>
  );
}
