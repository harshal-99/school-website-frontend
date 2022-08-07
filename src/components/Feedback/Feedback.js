import {useRef} from "react";
import FeedbackService from "../../service/feedback.service";
import '../../index.css'

const Feedback = () => {
	const ref = useRef(null);
	const handleFormSubmit = (event) => {
		event.preventDefault()
		FeedbackService.submitFeedback(ref.current.value)
			.then(res => {
				ref.current.value = ''
			})
	}
	return (
		<form onSubmit={handleFormSubmit} className='container' style={{justifyContent: "center"}}>
			<label htmlFor="name" className="margin-2">Feedback</label>
			<textarea id="name" placeholder="Enter feedback here..." ref={ref} className="margin-2"/>
			<button type="submit" className="margin-2">Submit</button>
		</form>
	)
}

export default Feedback
