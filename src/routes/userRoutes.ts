import express from 'express';
import { login, register } from '../controllers/userController';
import { AuthUserByToken, GetStudentsByAuth } from '../utils/auth';

const router = express.Router();

router.route('/register').post(register)
router.route('/login').post(login)
router.use(AuthUserByToken)
router.use(GetStudentsByAuth)
export default router;
