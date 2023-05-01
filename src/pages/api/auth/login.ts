import { NextApiRequest, NextApiResponse } from 'next';
import { OAuth2Client } from 'google-auth-library';

export default async function login(req: NextApiRequest, res: NextApiResponse) {
	let redirectUri;

	if (req.query?.action_type === 'login') {
		redirectUri = process.env.GOOGLE_LOGIN_REDIRECT_URI;
	} else if (req.query.action_type === 'register') {
		redirectUri = process.env.GOOGLE_REGISTER_REDIRECT_URI;
	} else {
		res.status(500).send('Error');
	}

	const oAuth2Client = new OAuth2Client({
		clientId: process.env.GOOGLE_CLIENT_ID,
		clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		redirectUri: redirectUri,
	});

	const scopes = [
		'https://www.googleapis.com/auth/userinfo.profile',
		'https://www.googleapis.com/auth/userinfo.email',
	];

	const url = oAuth2Client.generateAuthUrl({
		access_type: 'offline',
		scope: scopes,
	});

	res.redirect(url);
}
