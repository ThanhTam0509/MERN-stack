// Nếu k có module trong package thì phải add lib bằng require
import express from 'express';
import postRoute from './routes/post.auth.js';
import authRoute from './routes/auth.route.js';

const app = express();

// Thêm dòng này vào để nhận được data từ postman
app.use(express.json());

app.use('/api/posts', postRoute);
app.use('/api/auth', authRoute);

app.listen(8800, () => {
	console.log('Server is running');
});
