import React, { useEffect, useState } from 'react';
import './Post.css';

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
    const [expandedPosts, setExpandedPosts] = useState({});
    // const [editingPost, setEditingPost] = useState(null);
    // const [editPostData, setEditPostData] = useState({ title: '', description: '', content: '' });

    // جلب المنشورات من الخادم
    useEffect(() => {
        fetch('https://fadaa-2.onrender.com/api/posts')
            .then(res => res.json())
            .then(data => setPosts(data))
            .catch(err => console.error(err));
    }, []);

    // إنشاء منشور جديد
    const handleCreatePost = async (e) => {
        e.preventDefault();

        await fetch('https://fadaa-2.onrender.com/api/posts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title: newPost.title || "بدون عنوان", // إذا كان العنوان فارغًا، استخدم "بدون عنوان"
                description: newPost.description || " ", 
                content: newPost.content || " ", 
            }),
        });

        setNewPost({ title: '', description: '', content: '' });
        window.location.reload(); // إعادة تحميل الصفحة لتحديث القائمة
    };

    const toggleExpand = (postId) => {
        setExpandedPosts(prev => ({ ...prev, [postId]: !prev[postId] }));
    };

    // تقليل النص إذا كان طويلاً
    const truncateText = (text, wordLimit, isExpanded) => {
        if (isExpanded || text.split(' ').length <= wordLimit) return text;
        return text.split(' ').slice(0, wordLimit).join(' ') + '...';
    };

    const handleDeletePost = async (id) => {
        const isConfirmed = window.confirm("هل أنت متأكد من الحذف؟ لا يمكن التراجع عن هذا الإجراء.");
        if (isConfirmed) {
            await fetch(`https://fadaa-2.onrender.com/api/posts/${id}`, { method: 'DELETE' });
            setPosts(posts.filter(post => post._id !== id));
        }
    };



    return (
        <div className='creat_post'>
            <h1>إدارة المنشورات</h1>

            {/* نموذج إنشاء منشور جديد */}
            <form onSubmit={handleCreatePost}>
                <input
                    type="text"
                    placeholder="العنوان"
                    value={newPost.title}
                    onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="الوصف"
                    value={newPost.description}
                    onChange={(e) => setNewPost({ ...newPost, description: e.target.value })}
                />
                <textarea
                    placeholder="المحتوى"
                    value={newPost.content}
                    onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                />
                <button style={{ fontSize: "1.4rem" }} type="submit">نشر</button>
            </form>

            {/* عرض المنشورات السابقة */}
            <div id='display'>
                {posts.map(post => (
                    <div key={post._id}>
                        <h2>{post.title || "بدون عنوان"}</h2>
                        <p id='desc' style={{ textAlign: "center" }}>{post.description || " بدون "} </p>
                        <p id='date'>تاريخ النشر: {formatDate(post.createdAt)}</p>
                        <p id='content'>{truncateText(post.content, 50, expandedPosts[post._id]) || " بدون"}</p>

                        {/* أزرار التحكم */}
                        {post.content.split(' ').length > 50 && (
                            <button onClick={() => toggleExpand(post._id)}>
                                {expandedPosts[post._id] ? 'عرض أقل' : 'عرض المزيد'}
                            </button>
                        )}
                        <button
                            style={{ backgroundColor: "#ae1111" }}
                            onClick={() => handleDeletePost(post._id)}
                        >
                            🗑 حذف
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
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
            <h1>البوستات</h1>
            <div>
                {posts.map(post => (
                    <div key={post._id}>
                        <h2>{post.title}</h2>
                        <p>{post.description}</p>
                        <p>{truncateText(post.content, 50, expandedPosts[post._id])}</p>
                        {post.content.split(' ').length > 50 && (
                            <button onClick={() => toggleExpand(post._id)}>
                                {expandedPosts[post._id] ? 'عرض أقل' : 'عرض المزيد'}
                            </button>
                        )}
                        <p>تاريخ النشر: {formatDate(post.createdAt)}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export { AdminPosts, PostsDisplay };
