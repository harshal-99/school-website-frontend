import {Link, Outlet} from "react-router-dom";
import classes from './Main.module.css'

const Main = () => {
	return (
		<div>
			<nav className={classes.nav}>
				<Link to="/notice">Notice</Link>
				<Link to="/gallery">Gallery</Link>
				<Link to="/feedback">Feedback</Link>
			</nav>
			<Outlet/>
		</div>
	);
}

export default Main
