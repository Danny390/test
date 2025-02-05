import axios from "axios";
import { GoogleTokenInterface } from "../types";

export const validateUserTokenGoogle = async (
	accessToken: string
): Promise<GoogleTokenInterface | undefined> => {
	try {
		const response = await axios.get(
			`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${accessToken}`,
			{
				headers: {
					Authorization: `Bearer ${accessToken}`,
					Accept: "application/json"
				}
			}
		);

		return response.data;
	} catch (error) {
		console.log(error);
		return;
	}
};
