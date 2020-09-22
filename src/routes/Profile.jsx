import React, { useState, useEffect } from "react";
import { fb_auth, fb_db, fb_storage } from "server/firebaseAPI";
import { useHistory } from "react-router-dom";
import { v4 } from "uuid";

export default function Profile({ currentUser, refreshAuth }) {
  const history = useHistory();

  const [displayName, setDisplayName] = useState("");
  const [profilePicture, setProfilePicture] = useState(currentUser.displayName);

  const getAllTweeks = async () => {
    const tweet = await fb_db
      .collection(`wooitter`)
      .where("writer", "==", currentUser.uid)
      .orderBy("createdAt", "asc")
      .get();

    tweet.docs.map((doc) => {
      return console.log(doc.data());
    });

    // await fb_db.collection(`wooitter/${currentUser}`).
  };
  useEffect(() => {
    getAllTweeks();
  });

  const ChangeDisplayName = (e) => {
    setDisplayName(e.target.value);
  };

  const getFile = (e) => {
    const img = e.target.files;
    console.log(img);

    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;

      setProfilePicture(result);
    };

    reader.readAsDataURL(img[0]);
  };

  const updateProfile = async (e) => {
    e.preventDefault();

    const newProfile = {};

    await fb_storage.ref().child(`${currentUser.uid}/profile`).delete();

    const ref = await fb_storage
      .ref()
      .child(`${currentUser.uid}/profile/${v4()}`);
    const res = await ref.putString(profilePicture, "data_url");
    const photoURL = await res.ref.getDownloadURL();

    newProfile.photoURL = photoURL;

    if (displayName !== currentUser.displayName) {
      newProfile.displayName = displayName;
    }

    if (newProfile !== {}) {
      await currentUser.updateProfile(newProfile);

      refreshAuth();
    }
  };

  const onLogout = (e) => {
    fb_auth.signOut();
    history.push("/");
  };

  return (
    <div>
      <p>hello, {currentUser.displayName || currentUser.email}</p>

      <form onSubmit={updateProfile}>
        <div>
          <label htmlFor='profile_picture'>Profile picture</label>
          <input type='file' id='profile_picture' onChange={getFile} />
        </div>

        <div>
          <label htmlFor='profile_displayName'>Display name</label>
          <input
            type='text'
            id='profile_displayName'
            onChange={ChangeDisplayName}
          />
        </div>

        <input type='submit' value='Update profile' />
      </form>
      <button onClick={onLogout}>logout</button>
    </div>
  );
}
