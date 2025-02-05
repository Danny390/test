import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AuthInterface {
	name: string;
	email: string;
	profilePhotoURL: string;
	isAuthenticated: boolean;
}

export const authSlice = createSlice({
	name: "auth",
	initialState: {
		name: "",
		email: "",
		profilePhotoURL: "",
		isAuthenticated: false // Optional: to track authentication status
	} as AuthInterface,
	reducers: {
		setAuth: (state, { payload }: PayloadAction<AuthInterface>) => {
			console.log("payload", payload);
			state.name = payload.name;
			state.email = payload.email;
			state.profilePhotoURL = payload.profilePhotoURL;
			state.isAuthenticated = true;
		},
		clearAuth: (state) => {
			state.name = "";
			state.email = "";
			state.profilePhotoURL = "";
			state.isAuthenticated = false;
		}
	}
});

export const { setAuth, clearAuth } = authSlice.actions;

export default authSlice.reducer;
