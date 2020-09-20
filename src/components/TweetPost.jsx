import React, { useState } from "react";
import { fb_db } from "server/firebaseAPI";

export default function TweetPost({ tweek, isOwn }) {
  const [editMode, setEditMode] = useState(false);
  const [newTweet, setNewTweet] = useState(tweek.text);

  const onDeleteHandler = async (e) => {
    const isConfirmed = window.confirm("Are you sure to delete this tweet?");

    if (isConfirmed) {
      await fb_db.doc(`wooitter/${tweek.id}`).delete();
    }
  };

  const onEditModeHandler = async (e) => {
    setEditMode(!editMode);
  };

  const onWriteHandler = (e) => {
    setNewTweet(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    fb_db.doc(`wooitter/${tweek.id}`).update({ text: newTweet });

    setEditMode(false);
  };

  const tweekSection = editMode ? (
    <>
      <form>
        <input
          type='text'
          placeholder='Edit your tweet'
          value={newTweet}
          onChange={onWriteHandler}
        />
        <input type='submit' value='Update' onClick={submitHandler} />
      </form>
    </>
  ) : (
    <>
      <h4>{tweek.text}</h4>
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
