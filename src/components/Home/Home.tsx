import { googleLogout } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { AuthInterface, clearAuth } from "../../context/features/authSlice";
import { Button } from "@mui/material";

const Home = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const user: AuthInterface = useSelector((state: any) => state.auth);

	console.log("here1", user);
	useEffect(() => {
		if (!navigate || !user || !user.email) return;

		if (!user.isAuthenticated) {
			navigate("/test");
		}
	}, [user, navigate]);

	const logOut = () => {
		googleLogout();
		dispatch(clearAuth());
		navigate("/test");
	};

	return (
		<div>
			<div>
				<img src={user.profilePhotoURL} alt="User" />
				<h3>User Logged in</h3>
				<p>Name: {user.name}</p>
				<p>Email Address: {user.email}</p>
				<br />
			</div>
			<Button
				variant="contained"
				color="primary"
				fullWidth
				sx={{ mt: 3 }}
				onClick={logOut}
			>
				Log out
			</Button>
		</div>
	);
};

export default Home;
