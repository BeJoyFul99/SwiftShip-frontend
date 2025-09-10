import { AuthProvider } from "@/app/context/AuthContext";
import { LoginForm } from "@/components/login-form";
async function page() {
  return (
    <AuthProvider>
      <LoginForm />
    </AuthProvider>
  );
}

export default page;
