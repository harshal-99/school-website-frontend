import axios from "axios";
import {REACT_APP_BACKEND_URL} from "../utils/config";

const getNotices = async (controller) => {
	const response = await axios.get(REACT_APP_BACKEND_URL + "/api/notice", {
		signal: controller.signal
	});
	return response.data
}

const updateNotice = async (notice) => {
	const response = await axios.put(`${REACT_APP_BACKEND_URL}/api/notice/${notice.id}`, {
		title: notice.title,
		description: notice.description
	}, {
		headers: {
			Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}`
		}
	});
	return response.data
}

const deleteNotice = async (notice) => {
	const response = await axios.delete(`${REACT_APP_BACKEND_URL}/api/notice/${notice.id}`, {
		headers: {
			'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user')).token}`
		}
	})
	return response.status
}

const createNotice = async ({title, description}) => {
	const response = await axios
		.post(REACT_APP_BACKEND_URL + '/api/notice', {
			title,
			description
		}, {
			headers: {
				'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user')).token}`
			}
		})
	return response.data
}

const NoticeService = {getNotices, updateNotice, deleteNotice, createNotice}

export default NoticeService
