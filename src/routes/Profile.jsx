import React, { useEffect } from "react";
import { fb_auth, fb_db } from "server/firebaseAPI";
import { useHistory } from "react-router-dom";

export default function Profile({ currentUser }) {
  const history = useHistory();

  const getAllTweeks = async () => {
    const tweet = await fb_db
      .collection(`wooitter`)
      .where("writer", "==", currentUser.uid)
      .orderBy("createdAt")
      .get();

    tweet.docs.map((doc) => {
      return console.log(doc.data());
    });

    // await fb_db.collection(`wooitter/${currentUser}`).
  };
  useEffect(() => {
    getAllTweeks();
  });

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
