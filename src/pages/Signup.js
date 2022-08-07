import {useEffect, useState} from "react";
import AuthService from "../service/auth.service";
import {useNavigate} from "react-router-dom";

const Signup = () => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState(null)

	let id

	const navigate = useNavigate()
	const handleFormSubmit = async (event) => {
		event.preventDefault()

		try {
			await AuthService.signup({username, password})
			navigate('/login', {replace: true})
		} catch (e) {
			setError(e.response.data.error)
			id = setTimeout(() => setError(null), 5000)
		}
	}

	useEffect(() => {
		return clearTimeout(id)
	}, [id])
	return (
		<form onSubmit={handleFormSubmit}>
			<label htmlFor="username">Username</label>
			<input id="username" type="text" value={username} onChange={event => setUsername(event.target.value)}/>
			<label htmlFor="password">Password</label>
			<input id="password" type="password" value={password} onChange={event => setPassword(event.target.value)}/>
			<button type="submit">Signup</button>
			{error && <div>{error}</div>}
		</form>
	)
}

export default Signup;
