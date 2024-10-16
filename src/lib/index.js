// // place files you want to import through the `$lib` alias in this folder.
import { App, Credentials } from 'realm-web';
import { PUBLIC_ID } from '$env/static/public';

const [REALM_APP_ID] = PUBLIC_ID.split(',')
export const app = new App({ id: REALM_APP_ID });

export async function registerEmailPassword(email, password) {
	try {

		const rz = await app.emailPasswordAuth.registerUser({ email, password });
		console.log({ rz })
		return { statusCode: 200 }
	} catch (error) {
		return error
	}
	// await app.emailPasswordAuth.resendConfirmationEmail({ email });

	// await app.emailPasswordAuth.sendResetPasswordEmail({ email });


	// const args = [];
	// await app.emailPasswordAuth.callResetPasswordFunction(
	// 	{ email, password },
	// 	...args
	// );


	// await app.emailPasswordAuth.resetPassword({
	// 	password: "newPassw0rd",
	// 	token,
	// 	tokenId,
	// });


	// const params = new URLSearchParams(window.location.search);
	// const token = params.get("token");
	// const tokenId = params.get("tokenId");
	// if (!token || !tokenId) {
	// 	throw new Error(
	// 		"You can only call resetPassword() if the user followed a confirmation email link"
	// 	);
	// }
}

export async function confirmRegisterEmail({ token, tokenId }) {
	try {
		const rz = await app.emailPasswordAuth.confirmUser({ token, tokenId });
		return { ...rz, statusCode: 200 }
	} catch (error) {
		return error
	}
	// error: "userpass token is expired or invalid"
	// error_code: "UserpassTokenInvalid"
}



export async function loginEmailPassword(email, password) {
	try {
		// Create an email/password credential
		const credentials = Credentials.emailPassword(email, password);
		// Authenticate the user
		const user = await app.logIn(credentials);
		// `App.currentUser` updates to match the logged in user
		console.assert(user.id === app.currentUser.id);
		// console.log({ user }, user.id)
		return { statusCode: 200, userId: user.id };
	} catch (error) {
		return error
	}
}