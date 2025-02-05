import { useEffect, useState } from "react";
import {
	Container,
	TextField,
	Button,
	Tabs,
	Tab,
	Paper,
	Box,
	Typography
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAuth } from "../../context/features/authSlice";
import { addUser, validateUser } from "../../indexDB";
import { GoogleTokenInterface } from "../../types";

const LoginSignupForm = () => {
	const [tabIndex, setTabIndex] = useState(0);
	const [user, setUser] = useState<any>(null);
	const navigate = useNavigate();

	const dispatch = useDispatch();

	const validationSchema = Yup.object({
		email: Yup.string().email("Invalid email").required("Required"),
		password: Yup.string()
			.min(6, "At least 6 characters")
			.required("Required"),
		...(tabIndex === 1 && {
			confirmPassword: Yup.string()
				.oneOf([Yup.ref("password")], "Passwords must match")
				.required("Required")
		})
	});

	const formik = useFormik({
		initialValues: {
			email: "",
			password: "",
			confirmPassword: ""
		},
		validationSchema,
		onSubmit: async (values, { setSubmitting, setErrors }) => {
			try {
				if (tabIndex === 1) {
					await addUser({
						email: values.email,
						password: values.password
					});
				} else {
					await validateUser({
						email: values.email,
						password: values.password
					});
				}
				window.location.href = "/home";
			} catch (error) {
				setErrors({ email: error as string });
			}
			setSubmitting(false);
		}
	});

	const login = useGoogleLogin({
		onSuccess: (response: any) => setUser(response),
		onError: (error) => console.log("Login Failed:", error)
	});

	const validateUserTokenGoogle = async (
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

			dispatch(
				setAuth({
					name: response.data.name as string,
					email: response.data.email as string,
					profilePhotoURL: response.data.picture as string,
					isAuthenticated: true
				})
			);
			navigate("/home");
		} catch (error) {
			console.log(error);
			return;
		}
	};

	useEffect(() => {
		if (!user || !user.access_token) return;

		validateUserTokenGoogle(user.access_token);
	}, [user]);

	return (
		<Container maxWidth="sm">
			<Paper elevation={6} sx={{ p: 4, mt: 8, borderRadius: 2 }}>
				<Tabs
					value={tabIndex}
					onChange={(_, newValue) => setTabIndex(newValue)}
					variant="fullWidth"
				>
					<Tab label="Login" />
					<Tab label="Sign Up" />
				</Tabs>
				<Box
					component="form"
					onSubmit={formik.handleSubmit}
					sx={{ mt: 2 }}
				>
					<TextField
						fullWidth
						label="Email"
						variant="outlined"
						margin="normal"
						{...formik.getFieldProps("email")}
						error={
							formik.touched.email && Boolean(formik.errors.email)
						}
						helperText={formik.touched.email && formik.errors.email}
					/>
					<TextField
						fullWidth
						label="Password"
						type="password"
						variant="outlined"
						margin="normal"
						{...formik.getFieldProps("password")}
						error={
							formik.touched.password &&
							Boolean(formik.errors.password)
						}
						helperText={
							formik.touched.password && formik.errors.password
						}
					/>
					{tabIndex === 1 && (
						<TextField
							fullWidth
							label="Confirm Password"
							type="password"
							variant="outlined"
							margin="normal"
							{...formik.getFieldProps("confirmPassword")}
							error={
								formik.touched.confirmPassword &&
								Boolean(formik.errors.confirmPassword)
							}
							helperText={
								formik.touched.confirmPassword &&
								formik.errors.confirmPassword
							}
						/>
					)}
					<Button
						type="submit"
						variant="contained"
						color="primary"
						fullWidth
						sx={{ mt: 3 }}
					>
						{tabIndex === 0 ? "Login" : "Sign Up"}
					</Button>
					{tabIndex === 0 && (
						<Button
							variant="contained"
							color="primary"
							fullWidth
							sx={{ mt: 3 }}
							onClick={() => login()}
						>
							Sign in with Google 🚀
						</Button>
					)}
				</Box>
				<Typography variant="body2" align="center" sx={{ mt: 2 }}>
					{tabIndex === 0
						? "Don't have an account?"
						: "Already have an account?"}{" "}
					<Button
						color="secondary"
						onClick={() => setTabIndex(tabIndex === 0 ? 1 : 0)}
					>
						{tabIndex === 0 ? "Sign Up" : "Login"}
					</Button>
				</Typography>
			</Paper>
		</Container>
	);
};

export default LoginSignupForm;
