import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import {useAuth} from "./components/Auth";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import classes from './App.module.css'
import Main from "./components/Main";
import Notice from "./components/Notice/Notice";
import Gallery from "./components/Gallery/Gallery";
import Feedback from "./components/Feedback/Feedback";
import {useEffect} from "react";

const App = () => {
	const auth = useAuth()

	useEffect(() => {
		if (!auth?.user) {
			const data = JSON.parse(localStorage.getItem('user'))
			if (data) {
				auth.loginFromLocalStorage(data)
			}
		}
	}, [auth])

	return (
		<div>
			<BrowserRouter basename={process.env.PUBLIC_URL}>
				<nav className={classes.nav}>
					<div>School Notice Board</div>
					{auth.user
						? <button onClick={() => auth.logout()}>Logout</button>
						: <div className={classes.login}>
							<Link to='/login'>Login</Link>
							<Link to='/signup'>Signup</Link>
						</div>
					}
				</nav>
				<Routes>
					<Route path="/" element={<Main/>}>
						<Route path="/notice" element={<Notice/>}/>
						<Route path="/gallery" element={<Gallery/>}/>
						<Route path="/feedback" element={<Feedback/>}/>
					</Route>
					<Route path="/login" element={<Login/>}/>
					<Route path="/signup" element={<Signup/>}/>
				</Routes>
			</BrowserRouter>
		</div>
	);
}
export default App;
