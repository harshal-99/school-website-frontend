import axios from "axios";
import {REACT_APP_BACKEND_URL} from "../utils/config";

const submitFeedback = async (feedback, controller) => {
	const response = await axios.post(REACT_APP_BACKEND_URL + "/api/feedback", {feedback});

	return response.status
}

const FeedbackService = {submitFeedback}

export default FeedbackService
