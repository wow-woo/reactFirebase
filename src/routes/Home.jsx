import TweetPost from "components/TweetPost";
import React, { useEffect, useState } from "react";
import { fb_db, fb_storage } from "server/firebaseAPI";
import { v4 } from "uuid";
export default function Home({ currentUser }) {
  const [tweek, setTweek] = useState({
    title: "",
    text: "",
  });
  const [tweeks, setTweeks] = useState([]);
  const [blobURL, setBlobURL] = useState(false);

  const fileField = document.querySelector(".fileField");

  const subscribeTweeks = (e) => {
    fb_db.collection("wooitter").onSnapshot((querySnapShot) => {
      let arr = [];
      querySnapShot.docs.forEach((doc) => {
        const model = {
          id: doc.id,
          ...doc.data(),
        };

        arr.push(model);
      });

      setTweeks(arr);
    });
  };
  useEffect(() => {
    subscribeTweeks();
    return subscribeTweeks;
  }, []);

  const createNewTweek = async (publicURL) => {
    const newTweet = {
      title: tweek.title,
      text: tweek.text,
      writer: currentUser.uid,
      createdAt: Date.now(),
      img: publicURL,
    };

    await fb_db.collection("wooitter").add(newTweet);

    setTweek({
      title: "",
      text: "",
    });

    setBlobURL(false);
    fileField.value = "";
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    let publicURL = "";
    if (blobURL) {
      const ref = await fb_storage.ref().child(`${currentUser.uid}/${v4()}`);
      const res = await ref.putString(blobURL, "data_url");
      publicURL = await res.ref.getDownloadURL();
    }

    createNewTweek(publicURL);
  };

  const onChangeHandler = (e) => {
    setTweek({
      ...tweek,
      [e.target.name]: e.target.value,
    });
  };

  const fileChangeHandler = (e) => {
    const img = e.target.files;
    console.log(img);

    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setBlobURL(result);
    };

    reader.readAsDataURL(img[0]);
  };

  const clearImageHandler = (e) => {
    setBlobURL(false);
    fileField.value = "";
  };

  return (
    <div>
      <form onSubmit={onSubmitHandler}>
        <input
          type='text'
          placeholder='title'
          maxLength={50}
          name='title'
          value={tweek.title}
          onChange={onChangeHandler}
        />
        <input
          type='text'
          placeholder="what's on your mind"
          maxLength={120}
          name='text'
          value={tweek.text}
          onChange={onChangeHandler}
        />
        <input
          type='file'
          className='fileField'
          accept='image/*'
          onChange={fileChangeHandler}
        />
        <input type='submit' value='tweet' />
        {blobURL && (
          <div>
            <img
              src={blobURL}
              alt='upload file preview'
              with='250px'
              height='250px'
            />
            <button onClick={clearImageHandler}>Clear image</button>
          </div>
        )}
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
