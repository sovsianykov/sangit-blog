import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import firebase from "firebase/app";
import "firebase/database";
import _ from "lodash";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import renderHtml from "react-render-html";

function App() {
  useEffect(() => {
    const db = firebase.database();
    console.log(db);
  });
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [posts, setPosts] = useState([]);
  const [posts1, setPosts1] = useState([]);

  useEffect(() => {
    firebase
      .database()
      .ref("/posts")
      .on("value", (snapshot) => {
        setPosts(snapshot.val());
      });
  }, [firebase.database()]);
  const getPosts = () => {
    firebase
      .database()
      .ref("/posts")
      .on("value", (snapshot) => {
        setPosts(snapshot.val());
      });

    console.log(posts);
    let i = 0;
    let arr = [];
    for (var key in posts) {
      arr[i] = posts[key];
      i++;
    }
    console.log(arr);
    setPosts1(arr);
  };

  const onHandleChange = (e) => {
     setBody(e)
  };
  const onImputBodyChange = (e) => {
    setBody(e.target.value);
  };
  const onHandleSubmit = (e) => {
    e.preventDefault();
    const post = {
      title: title,
      body: body,
    };
    firebase.database().ref("/posts").push(post);
    setTitle("");
    setBody("");
  };

  return (
    <div className="container">
      <form onSubmit={onHandleSubmit}>
        <div className="form-group">
          <input
            value={title}
            type="text"
            name="title"
            placeholder="Title"
            onChange={ e=>{setTitle(e.target.value)}}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <ReactQuill
            value={body}
            modules={App.modules}
            formats={App.formats}
            placeholder="Body"
            onChange={onHandleChange}
          />
        </div>
        <Button className="btn" onClick={onHandleSubmit}>
          Post
        </Button>
        <div>
          {/*<h2>{title}</h2>*/}
          {/*<h2>{posts.title}</h2>*/}
        </div>
      </form>
      <Button className="btn" onClick={getPosts}>
        Get
      </Button>

      <br />
      <div>
        {posts1.map((el, i) => {
          return (
            <div key={i}>
              <h2>{renderHtml(el.title)}</h2>
              <p> {renderHtml(el.body)}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
App.modules = {
  toolbar: [
    [{ header: 1 }, { header: 2 }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "blockquote", "strike"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link", "image", "video"],
    ["clear"],
    ["code-block"],
  ],
};
App.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  " blockquote",
  "strike",
  "link",
  "image",
  "video",
  "bullet",
  "code-block",
];

export default App;
