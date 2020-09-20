import React from "react";
import { fb_auth } from "server/firebaseAPI";
import { useHistory, useLocation } from "react-router-dom";

export default function Profile() {
  const history = useHistory();

  const onLogout = (e) => {
    fb_auth.signOut();
    history.push("/");
  };
  return (
    <div>
      <button onClick={onLogout}>logout</button>
    </div>
  );
}
