import { Router } from 'express';
import { userRegister, userLogin, getUserById, getUserByUsername, getUserByEmail } from '../services/userService.js'
import { validateRegisterSchema, validateLoginSchema } from '../util/validationSchemes.js';
import { isUserLogged } from '../middlewares/guards.js';
import { getAllUserPosts } from '../services/postService.js';
const userController = Router();

//  Register
userController.post('/register', async (req, res, next) => {
    try {
        await validateRegisterSchema.validateAsync(req.body);

        const { cookies, userDetails } = await userRegister(req.body);
        res.cookie('jwtHeaderPayload', cookies.userInfo)
        res.cookie('jwtSignature', cookies.signature, { httpOnly: true });
        res.status(200).json({ message: 'Successful registration' });

    } catch (err) {
        next(err);
    }
});

//  Login
userController.post('/login', async (req, res, next) => {
    try {
        await validateLoginSchema.validateAsync(req.body);

        const { cookies, userDetails } = await userLogin(req.body);
        res.cookie('jwtHeaderPayload', cookies.userInfo)
        res.cookie('jwtSignature', cookies.signature, { httpOnly: true });
        res.status(200).json({ message: 'Successful login' });

    } catch (err) {
        next(err);
    }
});

//  Logout
userController.get('/logout', async (req, res, next) => {
    try {
        // TODO add blacklist
        // Because of React.StrictMode the useEffect hooks makes two request and the set in blacklist trow and error for duplication
        // await userLogout(req.userToken);

        res.cookie('jwtHeaderPayload', '', { expires: new Date(0) })
        res.cookie('jwtSignature', '', { httpOnly: true, expires: new Date(0) });
        res.status(200).json({ message: 'Logout successful.' });
    } catch (err) {
        next(err);
    }
});

//  Profile by userId
userController.get('/:userId', async (req, res, next) => {
    try {
        const { userId } = req.params;
        const userData = await getUserById(userId);

        res.status(200).json(userData);
    } catch (err) {
        next(err);
    }
});

//  Profile by username
userController.get('/:username/username', async (req, res, next) => {
    try {
        const { username } = req.params;
        const userData = await getUserByUsername(username);

        res.status(200).json(userData);
    } catch (err) {
        next(err);
    }
});

// Profile by email
userController.get('/:email/email', async (req, res, next) => {
    try {
        const { email } = req.params;
        const userData = await getUserByEmail(email);

        res.status(200).json(userData);
    } catch (err) {
        next(err);
    }
});


// Get user posts
userController.get('/:userId/posts', isUserLogged, async (req, res, next) => {
    try {
        const { userId } = req.params;
        const userPosts = await getAllUserPosts(userId).populate('owner');

        res.status(200).json(userPosts)
    } catch (err) {
        next(err);
    }
});

export { userController };