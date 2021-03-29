import React, {useEffect, useState} from "react";
import { Button } from "react-bootstrap";
import  firebase from "firebase/app";
import 'firebase/database'
import _ from 'lodash'




function App() {
    useEffect( () =>{
        const db = firebase.database()
         console.log(db)
    })
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [posts, setPosts] = useState([]);
  const [posts1, setPosts1] = useState([]);

  useEffect(() =>{
      firebase.database().ref('/posts').on('value', snapshot =>{
         setPosts(snapshot.val())

      })
  },[firebase.database()])
  const getPosts =() => {

      firebase.database().ref('/posts').on('value', snapshot =>{
      setPosts(snapshot.val())


      })

    console.log(posts)
      let i = 0
      let arr = []
      for (var key in posts) {
          arr[i] =  posts[key]
          i++
      }
      console.log(arr)
      setPosts1(arr)
  }


  const renderPosts = () => {
      return _.map( posts , (key, post) => {
           return (<div key={key} >
               <h2>{post.title}</h2>
               <p>{post.body}</p>
           </div>)
      } )
    }

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
     setTitle('');
     setBody('')

 }

  return (
    <div className="container">
      <form onSubmit={onHandleSubmit}>
        <div className="form-group">
          <input
              value={title}
            type="text"
            name="title"
            placeholder="Title"
            onChange={onImputChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <input
              value={body}
            type="body"
            name="body"
            placeholder="Body"
            onChange={onImputBodyChange}
            className="form-control"
          />
        </div>
        <Button className="btn" onClick={onHandleSubmit}>Post</Button>
        <div>
          {/*<h2>{title}</h2>*/}
          {/*<h2>{posts.title}</h2>*/}
        </div>
      </form>
        <Button className="btn" onClick={getPosts} >Get</Button>

        <br/>
        <div>
            {posts1.map((el,i)=>{
                return (<div key={i}>
                    <h2>{el.title}</h2>
                    <p> {el.body}</p>
                </div>)
            })}
        </div>
    </div>
  );
}

export default App;
