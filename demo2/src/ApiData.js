import React, { useEffect, useState } from "react";
import axios from "axios";
import  "./App.css";

function ApiData() {
  const [posts, setPosts] = useState([]);
  const [count, setCount] = useState(0);
  const [firstName, setFirstName] = useState('');
  const [height, setHeight] = useState('');
 // const [buttonText, setButtonText] = useState('Add Record')
  const baseUrl = 'https://swapi.dev/api/people';

  useEffect(() =>{
    const getPosts = async  () =>{
      const res = await axios.get(baseUrl)
      console.log(res);
      setCount(res.data.count);
      setPosts(res.data.results);
    };
    getPosts();
   
  },[])

  const addItem = (e) =>{
    e.preventDefault();
    // const post = {name: 'name', height: '124' }
    const post = { name : firstName, height : height};
    // await axios.post(baseUrl, post)
    setPosts([post, ...posts]);
    setCount(count+1);
    setFirstName('');
    setHeight('');
  }
  
  // const editHandler = (name) =>{
  //   const data = posts.find((post) => post.name === name);
  //   setFirstName(data.name);
  //   setHeight(data.height);
  //   setButtonText('Edit Record')
  // };

  const deleteHandler = (name) =>{
    const newPosts = posts.filter((post) => post.name != name);
    setPosts(newPosts);
    setCount(count-1);
  };

  return (
    <>
    <h1>Total number of List : {count}</h1><br/>
    <form>
     <input placeholder= "Enter your name" value={firstName}   name="firstName" onChange={e => setFirstName(e.target.value)} />
     <input placeholder= "Enter your height" value={height}   name="height" onChange={e => setHeight(e.target.value)} />
    <button onClick={addItem}>Add Record</button>
    </form>
    <table>
      <thead>
        <tr>
        <th>Name</th>
        <th>Count</th>
        <th>Delete Operation</th>
        </tr>
        <tbody>
        {
          posts.length > 0 && posts.map((post) => (
            <tr>
              <td>{post.name}</td>
              <td>{post.height}</td>
              <td><button onClick={() => deleteHandler(post.name)}>Delete</button></td>
              {/* <td><button onClick={() => editHandler(post.name)}>Add Record</button></td> */}
            </tr>
          ))
        }
        </tbody>
      </thead>
    </table>
    </>
  )

}
export default ApiData;
