"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const user_1 = __importDefault(require("../models/user"));
router.get('/', (req, res, next) => {
    res.render('index', { title: 'Home', page: 'home', displayName: '' });
});
router.get('/portfolio', (req, res, next) => {
    res.render('index', { title: 'Portfolio', page: 'portfolio', displayName: '' });
});
router.get('/services', (req, res, next) => {
    res.render('index', { title: 'Services', page: 'services', displayName: '' });
});
router.get('/team', (req, res, next) => {
    res.render('index', { title: 'Team', page: 'team', displayName: '' });
});
router.get('/blog', (req, res, next) => {
    res.render('index', { title: 'News', page: 'blog', displayName: '' });
});
router.get('/gallery', (req, res, next) => {
    res.render('index', { title: 'Gallery', page: 'gallery', displayName: '' });
});
router.get('/events', (req, res, next) => {
    res.render('index', { title: 'Events', page: 'events', displayName: '' });
});
router.get('/new-event', (req, res, next) => {
    res.render('index', { title: 'New Event', page: 'new-event', displayName: '' });
});
router.get('/stats', (req, res, next) => {
    res.render('index', { title: 'Stats', page: 'stats', displayName: '' });
});
router.get('/contact-list', (req, res, next) => {
});
router.get('/edit', (req, res, next) => {
    res.render('index', { title: 'Edit Contact', page: 'edit', displayName: '' });
});
router.get('/login', (req, res, next) => {
    res.render('index', { title: 'Login', page: 'login', displayName: '' });
});
router.get('/register', (req, res, next) => {
    res.render('index', { title: 'Register', page: 'register', displayName: '' });
});
router.get('/privacy', (req, res, next) => {
    res.render('index', { title: 'Privacy', page: 'privacy', displayName: '' });
});
router.get('/tos', (req, res, next) => {
    res.render('index', { title: 'TOS', page: 'tos', displayName: '' });
});
router.get('/contact', (req, res, next) => {
    res.render('index', { title: 'Contact', page: 'contact', displayName: '' });
});
router.post('/login', async (req, res, next) => {
    const { Username, Password } = req.body;
    console.log(Username);
    console.log(Password);
    try {
        const user = await user_1.default.findOne({ Username: Username, Password: Password });
        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }
        return res.status(200).json({ message: 'Login successful', user });
    }
    catch (error) {
        console.error('Error occurred during login:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});
exports.default = router;
//# sourceMappingURL=index.js.map