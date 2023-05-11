import { NextApiRequest, NextApiResponse } from 'next';
import { OAuth2Client } from 'google-auth-library';
import { google } from 'googleapis';
import axios from 'axios';

const oAuth2Client = new OAuth2Client({
	clientId: process.env.GOOGLE_CLIENT_ID,
	clientSecret: process.env.GOOGLE_CLIENT_SECRET,
	redirectUri: process.env.GOOGLE_REGISTER_REDIRECT_URI,
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

		const userData = {
			id: data.id,
			name: data.name,
			email: data.email,
			picture: data.picture,
		};

		await axios.get('http://localhost:8000/googleCustomers');
		await axios
			.post('http://localhost:8000/googleCustomers/register', userData)
			.then((response) => {
				const responseData = response.data.data;
                
				if (!responseData.success) {
					res.redirect(
						`/googleAuthFailed?errorMessage=${responseData.errorMessage}`
					);
					return;
				}

				const jwtToken = responseData.jwtToken;
				res.redirect(`/addGoogleJWTToken?setGoogleJWTToken=${jwtToken}`);
			});
	} catch (error) {
		console.error(error);
		res.status(500).send('Error');
	}
}
