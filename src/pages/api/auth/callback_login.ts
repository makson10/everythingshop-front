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

		await axios.get(
			`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/googleCustomers`
		);
		await axios
			.post(
				`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/googleCustomers/login`,
				{
					id: data.id,
				}
			)
			.then((response) => {
				if (response.data.errorMessage) {
					res.redirect(
						`/googleAuthFailed?errorMessage=${response.data.errorMessage}`
					);
				}

				const jwtToken = response.data.data.jwtToken;
				res.redirect(`/addGoogleJWTToken?setGoogleJWTToken=${jwtToken}`);
			});
	} catch (error) {
		console.error(error);
		res.status(500).send('Error');
	}
}
