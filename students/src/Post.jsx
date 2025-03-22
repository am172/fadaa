import React, { useEffect, useState } from 'react';
import './assets/post.css';

const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInSeconds < 60) {
        return `منذ ${diffInSeconds} ثانية`;
    } else if (diffInMinutes < 60) {
        return `منذ ${diffInMinutes} دقيقة`;
    } else if (diffInHours < 24) {
        return `منذ ${diffInHours} ساعة`;
    } else if (diffInDays === 1) {
        return "منذ يوم";
    } else if (diffInDays < 7) {
        return `منذ ${diffInDays} أيام`;
    } else {
        // إذا مر أكثر من أسبوع، نرجع التاريخ بشكل عادي
        const formattedDate = date.toLocaleDateString('en-GB').replace(/[/]/g, '/');
        const hours = date.getHours() % 12 || 12;
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const period = date.getHours() >= 12 ? 'pm' : 'am';
        return `${formattedDate} - ${hours}:${minutes}${period}`;
    }
};



const PostsDisplay = () => {
    const [posts, setPosts] = useState([]);
    const [expandedPosts, setExpandedPosts] = useState({});

    useEffect(() => {
        fetch('https://fadaa-2.onrender.com/api/posts')
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
{/*                     <p id="desc">{post.description}</p> */}
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

export {  PostsDisplay };
