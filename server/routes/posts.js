import express from 'express';

import { getPosts, getPost, createPost, updatePost, likePost, deletePost, getIframe, getSnippet } from '../controllers/posts.js';

const router = express.Router();

router.get('/', getPosts);
router.get('/iframe.html', getIframe);
router.get('/drift-snippet', getSnippet);
router.post('/', createPost);
router.get('/:id', getPost);
router.patch('/:id', updatePost);
router.delete('/:id', deletePost);
router.patch('/:id/likePost', likePost);

export default router;