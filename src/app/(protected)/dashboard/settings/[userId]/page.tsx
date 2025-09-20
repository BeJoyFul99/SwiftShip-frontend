import React from "react";

const UserSettings = async ({
  params,
}: {
  params: Promise<{ userId: string }>;
}) => {
  const { userId } = await params;
  return (
    <div>
      <h1>User Settings</h1>
      <p>Manage your settings here. {userId}</p>
    </div>
  );
};

export default UserSettings;
