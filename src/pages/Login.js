import {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {useAuth} from "../components/Auth";

const Login = () => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState(null)

	let id

	const navigate = useNavigate()
	const location = useLocation()
	const auth = useAuth()

	const from = location.state?.from || "/notice"

	const handleSubmit = async (e) => {
		e.preventDefault()
		const err = await auth.login({username, password}, () => navigate(from, {replace: true}))
		if (err) {
			setError(err)
			id = setTimeout(() => setError(null), 5000)
		}
	}

	useEffect(() => {
		return clearTimeout(id)
	}, [id])

	return (
		<form onSubmit={handleSubmit}>
			<label htmlFor="username">Username</label>
			<input id="username" type="text" value={username} onChange={event => setUsername(event.target.value)}/>
			<label htmlFor="password">Password</label>
			<input id="password" type="password" value={password} onChange={event => setPassword(event.target.value)}/>
			<button type="submit">Login</button>
			{error &&
				<div>{error}</div>
			}
		</form>
	)
}

export default Login;
