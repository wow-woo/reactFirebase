import React, { useEffect, useState } from "react";
import { fb_db } from "server/firebaseAPI";

export default function Home() {
  const [tweek, setTweek] = useState("");
  const [tweeks, setTweeks] = useState([]);

  const getTweeks = async () => {
    const data = await fb_db.collection("wooitter").get();

    let arr = [];
    data.forEach((querySnapShot) => {
      arr.push(querySnapShot.data());
    });

    setTweeks(arr);
  };

  useEffect(() => {
    getTweeks();
  }, []);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    await fb_db.collection("wooitter").add({ tweek, createdAt: Date.now() });

    setTweek("");
  };

  const onChangeHandler = (e) => {
    setTweek(e.target.value);
  };

  return (
    <div>
      <form onSubmit={onSubmitHandler}>
        <input
          type='text'
          placeholder="what's on your mind"
          maxLength={120}
          value={tweek}
          onChange={onChangeHandler}
        />
        <input type='submit' value='tweet' />
      </form>
    </div>
  );
}
