"use server";

export async function loginWithEmailPassword(prevs, formData: FormData) {
  // Implement your login logic here
  const email = formData.get("email");
  const password = formData.get("password");
  const res = await fetch(`${process.env.BACKEND_URL}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: email, password: password }),
  })
    .then((r) => {
      console.log("this is respoense", r.json());
      return r.status;
    })
    .catch((e) => {
      console.log(e);
      return 500;
    });
}
