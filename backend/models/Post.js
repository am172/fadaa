const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    title: { type: String, required: false },
    description: { type: String, required: false },
    content: { type: String, required: false },
    createdAt: { type: Date, default: Date.now }
});

const Post = mongoose.model('Post', PostSchema);
module.exports = Post;
