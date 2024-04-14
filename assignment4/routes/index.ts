import express from 'express';

const router = express.Router();
import { Document } from 'mongoose';
import User from '../models/user';

/* GET home page. */
router.get('/index', (req: express.Request, res: express.Response, next: express.NextFunction) => {
  res.render('index', { title: 'Home', page: 'home', displayName: '' });
});

router.get('/portfolio', (req: express.Request, res: express.Response, next: express.NextFunction) => {
  res.render('index', { title: 'Portfolio', page: 'portfolio', displayName: '' });
});

router.get('/services', (req: express.Request, res: express.Response, next: express.NextFunction) => {
  res.render('index', { title: 'Services', page: 'services', displayName: '' });
});

router.get('/team', (req: express.Request, res: express.Response, next: express.NextFunction) => {
  res.render('index', { title: 'Team', page: 'team', displayName: '' });
});

router.get('/blog', (req: express.Request, res: express.Response, next: express.NextFunction) => {
  res.render('index', { title: 'News', page: 'blog', displayName: '' });
});

router.get('/gallery', (req: express.Request, res: express.Response, next: express.NextFunction) => {
  res.render('index', { title: 'Gallery', page: 'gallery', displayName: '' });
});

router.get('/events', (req: express.Request, res: express.Response, next: express.NextFunction) => {
  res.render('index', { title: 'Events', page: 'events', displayName: '' });
});

router.get('/new-event', (req: express.Request, res: express.Response, next: express.NextFunction) => {
  res.render('index', { title: 'New Event', page: 'new-event', displayName: '' });
});

router.get('/stats', (req: express.Request, res: express.Response, next: express.NextFunction) => {
  res.render('index', { title: 'Stats', page: 'stats', displayName: '' });
});




// ...

router.get('/contact-list', (req: express.Request, res: express.Response, next: express.NextFunction) => {
  //res.render('index', { title: 'Contact List', page: 'contact-list', displayName: '' });
  // Contact.find().then(function (contacts: Document[]) {
  //   console.log(contacts);
  // }).catch(function (err: any): void {
  //   console.error("Encountered an error:" + err);
  //   res.end();
  // });
});

router.get('/edit', (req: express.Request, res: express.Response, next: express.NextFunction) => {
  res.render('index', { title: 'Edit Contact', page: 'edit', displayName: '' });
});

router.get('/login', (req: express.Request, res: express.Response, next: express.NextFunction) => {

  res.render('index', { title: 'Login', page: 'login', displayName: '' });
});

router.get('/register', (req: express.Request, res: express.Response, next: express.NextFunction) => {
  res.render('index', { title: 'Register', page: 'register', displayName: '' });
});

router.get('/privacy', (req: express.Request, res: express.Response, next: express.NextFunction) => {
  res.render('index', { title: 'Privacy', page: 'privacy', displayName: '' });
});

router.get('/tos', (req: express.Request, res: express.Response, next: express.NextFunction) => {
  res.render('index', { title: 'TOS', page: 'tos', displayName: '' });
});

router.get('/contact', (req: express.Request, res: express.Response, next: express.NextFunction) => {
  res.render('index', { title: 'Contact', page: 'contact', displayName: '' });
});

router.post('/login', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const { Username, Password } = req.body;

  console.log(Username);
  console.log(Password);

  // const users = await User.find();
  // console.log(users);



  try {
    // Find the user with the provided username and password
    const user = await User.findOne({ Username: Username, Password: Password });


    if (!user) {
      // User not found, return error
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // User found, create session or JWT token and return success response
    // For simplicity, let's just return the user data
    return res.status(200).json({ message: 'Login successful', user });
  } catch (error) {
    // Handle any errors
    console.error('Error occurred during login:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;
