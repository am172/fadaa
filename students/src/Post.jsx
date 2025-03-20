import React, { useEffect, useState } from 'react';
import './assets/post.css';

const formatDate = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString('en-GB').replace(/[/]/g, '/');
    const hours = date.getHours() % 12 || 12;
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const period = date.getHours() >= 12 ? 'pm' : 'am';
    return `${formattedDate} - ${hours}:${minutes}${period}`;
};

const AdminPosts = () => {
    const [posts, setPosts] = useState([]);
    const [newPost, setNewPost] = useState({ title: '', description: '', content: '' });
    const [showPosts, setShowPosts] = useState(false);
    const [expandedPosts, setExpandedPosts] = useState({});

    useEffect(() => {
        fetch('http://localhost:5000/api/posts')
            .then(res => res.json())
            .then(data => setPosts(data))
            .catch(err => console.error(err));
    }, []);

    const handleCreatePost = async (e) => {
        e.preventDefault();
        await fetch('http://localhost:5000/api/posts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newPost)
        });
        setNewPost({ title: '', description: '', content: '' });
        window.location.reload();
    };

    const toggleExpand = (postId) => {
        setExpandedPosts(prev => ({ ...prev, [postId]: !prev[postId] }));
    };

    const truncateText = (text, wordLimit, isExpanded) => {
        if (isExpanded || text.split(' ').length <= wordLimit) return text;
        return text.split(' ').slice(0, wordLimit).join(' ') + '...';
    };

    return (
        <div className='creat_post'>
            <h1>إدارة البوستات</h1>

            {/* Create Post Form */}
            <form onSubmit={handleCreatePost}>
                <input type="text" placeholder="العنوان" value={newPost.title} onChange={(e) => setNewPost({ ...newPost, title: e.target.value })} required />
                <input type="text" placeholder="الوصف" value={newPost.description} onChange={(e) => setNewPost({ ...newPost, description: e.target.value })} required />
                <textarea placeholder="المحتوى" value={newPost.content} onChange={(e) => setNewPost({ ...newPost, content: e.target.value })} required />
                <button style={{ fontSize: "1.4rem" }} type="submit">نشر </button>
            </form>

            {/* Display Posts */}
            <button
                style={{ width: "100%", marginTop: "30px", fontSize: "1.3rem" }}
                type="button"
                onClick={() => setShowPosts(true)}
            >
                المنشورات السابقة
            </button>

            {showPosts && (
                <div id='display'>
                    {posts.map(post => (
                        <div key={post._id}>
                            <h2>{post.title}</h2>
                            <p style={{ textAlign: "center" }}>{post.description}</p>
                            <p>{truncateText(post.content, 100, expandedPosts[post._id])}</p>
                            {post.content.split(' ').length > 100 && (
                                <button onClick={() => toggleExpand(post._id)}>
                                    {expandedPosts[post._id] ? 'عرض أقل' : 'عرض المزيد'}
                                </button>
                            )}
                            <p>تاريخ النشر: {formatDate(post.createdAt)}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

const PostsDisplay = () => {
    const [posts, setPosts] = useState([]);
    const [expandedPosts, setExpandedPosts] = useState({});

    useEffect(() => {
        fetch('http://localhost:5000/api/posts')
            .then(res => res.json())
            .then(data => setPosts(data))
            .catch(err => console.error(err));
    }, []);

    const toggleExpand = (postId) => {
        setExpandedPosts(prev => ({ ...prev, [postId]: !prev[postId] }));
    };

    const truncateText = (text, wordLimit, isExpanded) => {
        if (isExpanded || text.split(' ').length <= wordLimit) return text;
        return text.split(' ').slice(0, wordLimit).join(' ') + '...';
    };

    return (
        <div>
        {/* <h1>البوستات</h1> */}
        <div id="display_post">
            {posts.map(post => (
                <div key={post._id} id="post-container">
                    <h2 id="title">{post.title}</h2>
                    <p id="desc">{post.description}</p>
                    <p id="date"> {formatDate(post.createdAt)}</p>
                    <p id="content">{truncateText(post.content, 100, expandedPosts[post._id])}</p>
                    {post.content.split(' ').length > 100 && (
                        <button id="more" onClick={() => toggleExpand(post._id)}>
                            {expandedPosts[post._id] ? 'عرض أقل' : 'عرض المزيد'}
                        </button>
                    )}
                </div>
            ))}
        </div>
    </div>
    );
};

export { AdminPosts, PostsDisplay };
