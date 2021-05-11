const express = require('express');
const cors = require('cors');

const db = require('./models');
const userRouter = require('./routes/user');
const postRouter = require('./routes/post');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

db.sequelize.sync({ force: false });

app.use((req, res, next) => {
	console.log({
		url: req.url,
		token: req.headers['x-access-token'] ? true : undefined,
		...req.body,
	});
	next();
});

app.use('/', postRouter);
app.use('/user', userRouter);

app.listen(port, () => console.log(`Server is listening on port ${port}!`));
