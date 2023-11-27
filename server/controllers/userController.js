import { Router } from 'express';
import { userRegister, userLogin, userLogout, getUserById } from '../services/userService.js'
import { validateRegisterSchema, validateLoginSchema } from '../util/validationSchemes.js';
import { isUserGuest, isUserLogged } from '../middlewares/guards.js';
import { preload } from '../middlewares/preloader.js';
const userController = Router();

//  Register
userController.post('/register', isUserGuest, async (req, res, next) => {
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
userController.post('/login', isUserGuest, async (req, res, next) => {
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

//  Profile
userController.get('/profile', isUserLogged, async (req, res, next) => {
    try {
        const user = await getUserById(req.user._id);

        res.status(200).json(user);
    } catch (err) {
        next(err);
    }
});

export { userController };