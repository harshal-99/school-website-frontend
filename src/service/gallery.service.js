import axios from "axios";
import {REACT_APP_BACKEND_URL} from "../utils/config";

const getGallery = async (controller) => {
	const response = await axios.get(REACT_APP_BACKEND_URL + "/api/photo", {
		signal: controller.signal
	});
	return response.data;
}

const updatePhoto = async (photo) => {
	const response = await axios.put(`${REACT_APP_BACKEND_URL}/api/photo/${photo.id}`, {
		title: photo.title,
		url: photo.url
	}, {
		headers: {
			Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}`
		}
	})
	return response.data
}

const deletePhoto = async (photo) => {
	const response = await axios.delete(`${REACT_APP_BACKEND_URL}/api/photo/${photo.id}`, {
		headers: {
			'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user')).token}`
		}
	})
	return response.status
}

const createPhoto = async (photo) => {
	const response = await axios.post(`${REACT_APP_BACKEND_URL}/api/photo`, {
		title: photo.title,
		url: photo.url
	}, {
		headers: {
			'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user')).token}`
		}
	})
	return response.data
}

const GalleryService = {getGallery, updatePhoto, deletePhoto, createPhoto};

export default GalleryService
