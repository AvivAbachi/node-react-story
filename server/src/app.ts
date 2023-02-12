import express from 'express';
import cors from 'cors';

import userRouter from './routes/user';
import postRouter from './routes/post';

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use((req, res, next) => {
// 	console.log({
// 		method: req.method,
// 		url: req.url,
// 		token: req.headers['x-access-token'] ? true : undefined,
// 		...req.body,
// 	});
// 	next();
// });

app.use('/', postRouter);
app.use('/user', userRouter);

app.listen(port, () => console.log(`Server is listening on port ${port}!`));
