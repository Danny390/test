import { OAuth2Client } from "google-auth-library";

const clientId = process.env.GOOGLE_API_CLIENT_ID!;

const oauth2Client = new OAuth2Client(clientId);

export const getGoogleAuthUrl = () => {
	try {
		const authUrl = oauth2Client.generateAuthUrl({
			access_type: "offline",
			scope: ["email", "profile"]
		});
		return authUrl;
	} catch (error) {
		return error;
	}
};

export const validateGoogleUser = async (idToken: string) => {
	const ticket = await oauth2Client.verifyIdToken({
		idToken,
		audience: clientId
	});
	const payload = ticket.getPayload();

	return payload;
};
