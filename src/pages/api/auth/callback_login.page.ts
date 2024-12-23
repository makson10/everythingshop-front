import { NextApiRequest, NextApiResponse } from 'next';
import { OAuth2Client } from 'google-auth-library';
import { google } from 'googleapis';
import axios from 'axios';

const auth = new OAuth2Client({
	clientId: process.env.GOOGLE_CLIENT_ID,
	clientSecret: process.env.GOOGLE_CLIENT_SECRET,
	redirectUri: process.env.GOOGLE_LOGIN_REDIRECT_URI,
});

export default async function callback(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { code } = req.query;

	try {
		const { tokens } = await auth.getToken(String(code));
		auth.setCredentials(tokens);

		const {
			data: { id },
		} = await google.oauth2({ version: 'v2', auth }).userinfo.get();

		const googleToken = await axios
			.post(
				`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/googleCustomers/login`,
				{ id }
			)
			.then((res) => res.data.token);

		res.redirect(`/addgooglejwttoken?googletoken=${googleToken}`);
	} catch (error) {
		res.status(500).redirect(`/googleauthfailed`);
	}
}
