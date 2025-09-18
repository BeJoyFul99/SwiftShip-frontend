import React from "react";

const UserSettings = ({ params }: { params: { userId: string } }) => {
  return (
    <div>
      <h1>User Settings</h1>
      <p>Manage your settings here. {params.userId}</p>
    </div>
  );
};

export default UserSettings;
