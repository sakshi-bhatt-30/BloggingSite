import express from 'express';
import signupUser from '../controller/userController.js'

const router = express.Router();

router.post('/signup', signupUser);


export default router;