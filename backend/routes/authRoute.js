

import express from 'express';
import {signup , signin } from '../controllers/auth.controller.js';
import { verifySignup, verifySignin } from '../middlewares/auth.mw.js';

const router = express.Router();

router.post('/login', verifySignin  , signin )

router.post('/register', verifySignup , signup)
export default router