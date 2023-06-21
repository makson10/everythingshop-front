import { NextApiRequest, NextApiResponse } from 'next';
import { OAuth2Client } from 'google-auth-library';
import { google } from 'googleapis';
import axios from 'axios';

const oAuth2Client = new OAuth2Client({
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
		const { tokens } = await oAuth2Client.getToken(String(code));
		oAuth2Client.setCredentials(tokens);

		const { data } = await google
			.oauth2({ version: 'v2', auth: oAuth2Client })
			.userinfo.get();

		const loginResult = await axios
			.post(
				`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/googleCustomers/login`,
				{ id: data.id }
			)
			.then((res) => res.data);

		res.redirect(
			`/addGoogleJWTToken?setGoogleJWTToken=${loginResult.jwtToken}`
		);
	} catch (error: any) {
		const errorMessage = error.response.data.error;
		res.status(500).redirect(`/googleAuthFailed?errorMessage=${errorMessage}`);
	}
}
