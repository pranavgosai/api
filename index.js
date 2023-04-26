import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
function ApiCalling() {
    var [posts, setPosts] = useState([]);

    var [userId, setUserId] = useState();
    var [title, setTitle] = useState();
    var [body, setBody] = useState();

    useEffect(() => {
        var url = "https://jsonplaceholder.typicode.com/posts?_limit=5";
        if (posts.length == 0)
            fetch(url).then((response) => response.json()).then((data) => setPosts(data));
    });
    var DeletePost = (id) => {
        // alert(id);
        var url = `https://jsonplaceholder.typicode.com/posts/${id}`;
        fetch(url, {
            method: 'DELETE'
        }).then((response) => {
            if (response.status === 200) {
                setPosts(posts.filter((post) => {
                    return post.id !== id;
                }));
            }
            else
                return;
        });
    }
    var AddPost = () => {
        var mypost = {
            'userId': userId,
            'id': 0,
            'title': title,
            'body': body,
        }
        // setPosts([...posts, mypost]);
        var url = 'https://jsonplaceholder.typicode.com/posts';
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(mypost),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((json) =>setPosts([...posts,json]));

    }
    var EditPost = (SinglePost) =>{
        console.log(SinglePost);
        setTitle(SinglePost.title);
        setBody(SinglePost.body);
        setUserId(SinglePost.userId);
    }
    return (<div className='container-fluid'>
        <div className='row'>
            <div className='col-lg-3'>
                <form>
                    <div className='card shadow border'>
                        <div className='card-header'>
                            <h3>Add Post</h3>
                        </div>
                        <div className='card-body'>
                            <div className='mb-3'>
                                <label htmlFor='userid'>User Id</label>
                                <input type='text' className='form-control' id='userid'
                                    onChange={(e) => setUserId(e.target.value)}
                                    value={userId} />
                            </div>
                            <div className='mb-3'>
                                <label htmlFor='title'>Title</label>
                                <input type='text' className='form-control' id='title'
                                    onChange={(e) => setTitle(e.target.value)}
                                    value={title} />
                            </div>
                            <div className='mb-3'>
                                <label htmlFor='body'>Detail</label>
                                <textarea type='text' className='form-control' id='body'
                                    onChange={(e) => setBody(e.target.value)} defaultValue={body}>
                                </textarea>
                            </div>
                            <div className='mb-3'>
                                <button type='button' className='btn btn-danger' onClick={(e) => AddPost()}>Add new post</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div className='col-lg-9'>
                <div className='row'>
                    <div className='col-12'>
                        <table className='table table-bordered table-striped' width='100%'>
                            <thead>
                                <tr>
                                    <th>id</th>
                                    <th>Title</th>
                                    <th>Detail</th>
                                    <th width='20%'>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {posts.map((post) => {
                                    return <tr key={post.id}>
                                        <td>{post.id}</td>
                                        <td>{post.title}</td>
                                        <td>{post.body}</td>
                                        <td>
                                            <button className='btn btn-danger' onClick={() => DeletePost(post.id)}>Delete</button>
                                            &nbsp;
                                            <button className='btn btn-warning' onClick={() => EditPost(post)}>Edit</button>
                                        </td>
                                    </tr>
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>)
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<ApiCalling />);