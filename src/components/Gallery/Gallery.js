import {useEffect, useState} from "react";
import GalleryService from "../../service/gallery.service";
import '../../index.css'
import GalleryCard from "./GalleryCard";
import {useAuth} from "../Auth";
import GalleryForm from "./GalleryForm";

const Gallery = () => {
	const [gallery, setGallery] = useState([]);
	const auth = useAuth();

	useEffect(() => {
		const controller = new AbortController();
		GalleryService
			.getGallery(controller)
			.then(data => {
				setGallery(data)
			})
			.catch((e) => {
			})
		return () => controller.abort()
	}, [])

	const handleGalleryUpdate = (photo) => {
		setGallery(prev => prev.map(p => p.id === photo.id ? photo : p))
	}

	const handleGalleryDelete = (photo) => {
		setGallery(prev => prev.filter(p => p.id !== photo.id))
	}

	const handleGalleryCreate = (photo) => {
		setGallery([photo, ...gallery])
	}

	return (
		<div className='container'>
			{auth?.user
				&& <GalleryForm handleGalleryCreate={handleGalleryCreate}/>
			}
			{gallery.map(photo =>
				<GalleryCard handleGalleryDelete={handleGalleryDelete}
				             handleGalleryUpdate={handleGalleryUpdate}
				             photo={photo} key={photo.title}/>)
			}
		</div>
	)
}

export default Gallery;
