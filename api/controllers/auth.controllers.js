import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../lib/prisma.js';

export const register = async (req, res) => {
	const { username, email, password } = req.body;
	// db operations
	try {
		const hashedPassword = await bcrypt.hash(password, 10);

		console.log('hashedPassword', hashedPassword);

		const newUser = await prisma.user.create({
			data: {
				username,
				email,
				password: hashedPassword,
			},
		});

		console.log('newUser', newUser);

		res.status(201).json({ message: 'User created successfully' });
	} catch (err) {
		console.log('err', err);
		res.status(500).json({ message: 'Failed to created user!' });
	}
};

export const login = async (req, res) => {
	// db operations
	const { username, password } = req.body;

	try {
		const user = await prisma.user.findUnique({
			where: { username },
		});
		// Check user có tồn tại hay k?
		if (!user) return res.status(401).json({ message: 'Invalid Credentials' });

		// Check password right ?
		const isPasswordValid = await bcrypt.compare(password, user.password);

		if (!isPasswordValid) return res.status(401).json({ message: 'Invalid Credentials' });

		// Generate cookie token and send to the user
		// res.setHeader('Set-Cookie', 'test=' + 'myValue').json('successfully');
		const token = jwt.sign(
			{
				id: user.id,
			},
			process.env.JWT_SECRET_KEY
		);

		const age = 1000 * 60 * 60 * 24 * 7;

		res.cookie('test2', 'myValue2', {
			httpOnly: true,
			maxAge: age,
		})
			.status(200)
			.json({ message: 'Login successfully' });
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: 'Failed to Login' });
	}
};

export const logout = (req, res) => {
	// db operations
};
