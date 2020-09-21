import React, { useState } from "react";
import { fb_db, fb_storage } from "server/firebaseAPI";

export default function TweetPost({ tweek, isOwn }) {
  const [editMode, setEditMode] = useState(false);
  const [newTweet, setNewTweet] = useState({
    title: tweek.title,
    text: tweek.text,
  });

  const onDeleteHandler = async (e) => {
    const isConfirmed = window.confirm("Are you sure to delete this tweet?");

    if (isConfirmed) {
      await Promise.allSettled([
        fb_db.doc(`wooitter/${tweek.id}`).delete(),
        tweek.img && fb_storage.refFromURL(tweek.img).delete(),
      ]);
    }
  };

  const onEditModeHandler = async (e) => {
    setEditMode(!editMode);
  };

  const onWriteHandler = (e) => {
    console.log("1", e.target.name);
    console.log("2", e.target.value);

    setNewTweet({
      ...newTweet,
      [e.target.name]: e.target.value,
    });
  };

  const updateHandler = (e) => {
    e.preventDefault();
    fb_db.doc(`wooitter/${tweek.id}`).update(newTweet);

    setNewTweet({
      title: "",
      text: "",
    });
    setEditMode(false);
  };

  const tweekSection = editMode ? (
    <>
      <form>
        <input
          type='text'
          name='title'
          placeholder={tweek.title}
          maxLength={50}
          value={newTweet.title}
          onChange={onWriteHandler}
        />

        <input
          type='text'
          name='text'
          placeholder={tweek.text}
          value={newTweet.text}
          onChange={onWriteHandler}
        />

        <input type='submit' value='Update' onClick={updateHandler} />
      </form>
    </>
  ) : (
    <>
      <h2>{tweek.title}</h2>
      <img
        src={tweek.img}
        alt={`${tweek.writer}'s tweet`}
        style={{ width: "350px", height: "300px" }}
      />
      <p>{tweek.text}</p>
      <h4>{JSON.stringify(tweek)}</h4>
    </>
  );

  const btns = isOwn && (
    <div>
      <button onClick={onDeleteHandler}>Delete</button>
      <button onClick={onEditModeHandler}>
        {editMode ? "Cancel" : "Edit"}
      </button>
    </div>
  );

  return (
    <div>
      {tweekSection}

      {btns}
    </div>
  );
}
