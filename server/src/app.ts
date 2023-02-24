import cors from 'cors';
import express from 'express';
import passport from 'passport';

import postRouter from './routes/post';
import userRouter from './routes/user';

const app = express();
const port = process.env.PORT ?? 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());

require('./config/passport');

app.use('/post', postRouter);
app.use('/user', userRouter);

app.listen(port, () => console.log(`Server is listening on port ${port}!`));
