import { NextApiRequest, NextApiResponse } from 'next';
import { OAuth2Client } from 'google-auth-library';
import { google } from 'googleapis';
import axios from 'axios';

const auth = new OAuth2Client({
	clientId: process.env.GOOGLE_CLIENT_ID,
	clientSecret: process.env.GOOGLE_CLIENT_SECRET,
	redirectUri: process.env.GOOGLE_REGISTER_REDIRECT_URI,
});

async function generateRedirectURL(code: string | string[] | undefined) {
	let redirectURL = '';
	const { tokens } = await auth.getToken(String(code));
	auth.setCredentials(tokens);

	const { data } = await google.oauth2({ version: 'v2', auth }).userinfo.get();

	const userData = {
		id: data.id,
		name: data.name,
		email: data.email,
		picture: data.picture,
	};

	const registerResult = await axios
		.post(
			`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/googleCustomers/register`,
			userData
		)
		.then((res) => res.data);

	redirectURL = `${process.env.NEXT_PUBLIC_FRONTEND_BASE_URL}/addgooglejwttoken?googleJWTToken=${registerResult.jwtToken}&userEmail=${userData.email}&userName=${userData.name}&ie=UTF-8&oe=UTF-8`;

	return encodeURI(redirectURL);
}

export default async function callback(
	req: NextApiRequest,
	res: NextApiResponse
) {
	try {
		const { code } = req.query;

		const url = await generateRedirectURL(code);
		res.status(200).redirect(url);
	} catch (error) {
		res.status(500).redirect(`/googleauthfailed`);
	}
}
