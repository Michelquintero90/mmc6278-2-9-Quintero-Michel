import * as htmlController from '../controllers/html.js';
import express from 'express';
const router = express.Router();
import { ensureAuthenticated } from '../middleware/auth.js';

router.get('/', htmlController.renderIndex);
router.get('/login', htmlController.renderLogin);
router.get('/signup', htmlController.renderSignup);
router.get('/protected', ensureAuthenticated, htmlController.renderProtected);

export default router;
