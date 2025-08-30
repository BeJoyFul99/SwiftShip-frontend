import React from "react";

async function getAllUsers() {
  const res = await fetch("http://localhost:8080/test-list", {
    next: { revalidate: 100 },
  });
  console.log(res);

  return res.json();
}
async function page() {
  const users = await getAllUsers()
    .then((data) => data)
    .catch((err) => console.log(err));
  console.log(users);

  return (
    <>
      <p>this is login page</p>
      <ul>
        {users &&
          users.map((user: { id: number; name: string }) => (
            <li key={user.id}>
              {user.id} - {user.name}
            </li>
          ))}
      </ul>
    </>
  );
}

export default page;
