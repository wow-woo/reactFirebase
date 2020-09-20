import TweetPost from "components/TweetPost";
import React, { useEffect, useState } from "react";
import { fb_db } from "server/firebaseAPI";

export default function Home({ currentUser }) {
  const [tweek, setTweek] = useState("");
  const [tweeks, setTweeks] = useState([]);

  useEffect(() => {
    fb_db.collection("wooitter").onSnapshot((querySnapShot) => {
      let arr = [];
      querySnapShot.docs.forEach((doc) => {
        const model = {
          id: doc.id,
          ...doc.data(),
        };

        arr.push(model);
      });

      console.log(arr);
      setTweeks(arr);
    });
  }, []);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const newTweet = {
      text: tweek,
      writer: currentUser.uid,
      createdAt: Date.now(),
    };

    await fb_db.collection("wooitter").add(newTweet);

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

      <div>
        {tweeks.map((tweek) => (
          <TweetPost
            key={tweek.id}
            tweek={tweek}
            isOwn={tweek.writer === currentUser.uid}
          />
        ))}
      </div>
    </div>
  );
}
