// Nếu k có module trong package thì phải add lib bằng require
import express from 'express';
import postRoute from './routes/post.auth.js';

const app = express();

app.use('/api/posts', postRoute);

app.listen(8800, () => {
	console.log('Server is running');
});
