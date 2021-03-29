import React, {useEffect, useState} from "react";
import { Button } from "react-bootstrap";
import  firebase from "firebase/app";
import 'firebase/database'




function App() {
    useEffect( () =>{
        const db = firebase.database()
         console.log(db)
    })
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const onImputChange = (e) => {
    setTitle(e.target.value);
  };
  const onImputBodyChange = (e) => {
    setBody(e.target.value);
  };
 const onHandleSubmit = (e) => {
   e.preventDefault()
    const post = {
     title : title,
      body : body
    }
     firebase.database().ref('/posts').push(post)
 }

  return (
    <div className="container">
      <form onSubmit={onHandleSubmit}>
        <div className="form-group">
          <input
            type="text"
            name="title"
            placeholder="Title"
            onChange={onImputChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <input
            type="body"
            name="body"
            placeholder="Body"
            onChange={onImputBodyChange}
            className="form-control"
          />
        </div>
        <Button className="btn" onClick={onHandleSubmit}>Post</Button>
        <div>
          <h2>{title}</h2>
          <h2>{body}</h2>
        </div>
      </form>
    </div>
  );
}

export default App;
