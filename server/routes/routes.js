import express from 'express';
import {signupUser, loginUser} from '../controller/userController.js'
import { uploadImage,getImage } from '../controller/imageController.js';
import { authenticateToken } from '../controller/jwtController.js';
import { createPost, getAllPosts} from '../controller/postController.js';
import upload from '../utils/upload.js';



const router = express.Router();

router.post('/signup', signupUser);
router.post('/login', loginUser);
router.post('/file/upload', upload.single('file'), uploadImage);
router.get('/file/:filename', getImage);
router.post('/create', authenticateToken, createPost);
router.get('/posts', authenticateToken, getAllPosts);




export default router;