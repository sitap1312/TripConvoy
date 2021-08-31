import React, { useEffect, useState } from 'react';
import { Link, Route, Switch, useHistory } from 'react-router-dom';
import { getAllPosts, createPost, updatePost, deletePost } from '../services/posts';
// import { getAllComments } from '../services/comments';
import PostEdit from '../screens/PostEdit';
import PostCreate from '../screens/PostCreate';
import PostDetails from '../screens/PostDetails';
import Posts from '../screens/Posts';
import Logo from '../assets/Logo.gif';
import './MainContainer.css';

function MainContainer(props) {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);

  const { currentUser } = props;
  const history = useHistory();

  useEffect(() => {
    const fetchPosts = async () => {
      const postsList = await getAllPosts();
      setPosts(postsList);
    };
    fetchPosts();
  }, []);

  // useEffect(() => {
  //   const fetchComments = async () => {
  //     const commentsList = await getAllComments();
  //     setComments(commentsList);
  //   };
  //   fetchComments();
  // }, []);

  const handleCreate = async (postForm) => {
    const postData = await createPost(postForm);
    setPosts((prevState) => [...prevState, postData]);
    history.push('/posts');
  };

  const handleUpdate = async (id, postForm) => {
    const postData = await updatePost(id, postForm);
    setPosts((prevState) => prevState.map((post) => {
      return post.id === Number(id) ? postData : post;
    }));
    history.push('/posts');
  };

  const handleDelete = async (id) => {
    await deletePost(id);
    setPosts((prevState) => prevState.filter((post) => post?.id !== id));
    history.push('/posts');
  };


  return (
    <div>
      <Switch>

        <Route path='/posts/:id/edit'>
          <PostEdit posts={posts} handleUpdate={handleUpdate} />
        </Route>

        <Route path='/posts/new'>
          <PostCreate handleCreate={handleCreate} />
        </Route>

        <Route path='/posts/:id'>
          <PostDetails posts={posts} handleDelete={handleDelete} currentUser={currentUser} />
        </Route>

        <Route path='/posts'>
          <Posts posts={posts} />
        </Route>

      </Switch>

      <Route exact path='/'>
        <div>
          <img src={Logo} />
        </div>
      </Route>

      <br />
      <br />

      <Route path="/user">
      <div id="slider">
        <div>
          <figure>
            <img  src="https://images.pexels.com/photos/753639/pexels-photo-753639.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" alt="Rome" />
            <img  src="https://images.pexels.com/photos/34200/pexels-photo.jpg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" alt='london' />
            <img  src="https://images.pexels.com/photos/773471/pexels-photo-773471.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" alt='Switzerland' />
            <img  src="https://images.pexels.com/photos/3629813/pexels-photo-3629813.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" alt='Russia' />
            <img  src="https://images.pexels.com/photos/3601426/pexels-photo-3601426.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" alt='london' />
            </figure>
          </div>
        </div>

        <br />
        <div>
          <Link to='/posts'>
            <button className='explr-btn'>Explore More 👉🏼 </button>
          </Link>
        </div>
        </Route>

</div>

  )
};

export default MainContainer;
