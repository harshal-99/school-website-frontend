import {useAuth} from "../Auth";
import {useState} from "react";
import PhotoService from "../../service/gallery.service";

const GalleryCard = ({photo, handlePhotoUpdate, handlePhotoDelete}) => {
	const auth = useAuth()
	const [edit, setEdit] = useState(false)
	const [title, setTitle] = useState(photo.title)
	const [url, setUrl] = useState(photo.url)

	const handleEdit = (event) => {
		setEdit(prev => !prev)
	}

	const handleFormSubmit = async (event) => {
		event.preventDefault()
		setEdit(prev => !prev)
		const newPhoto = await PhotoService.updatePhoto({...photo, title, url})
		handlePhotoUpdate(newPhoto)
	}

	const handleDelete = async () => {
		await PhotoService.deletePhoto(photo)
		handlePhotoDelete(photo)
	}
	return (
		<>
			{!edit &&
				<div className="card">
					<h2>{photo.title}</h2>
					<img src={photo.url} alt="something" style={{width: "auto", height: "10rem"}}/>
					{auth?.user?.isAdmin &&
						<div>
							<button onClick={handleEdit}>Edit</button>
							<button onClick={handleDelete}>Delete</button>
						</div>
					}
				</div>
			}
			{edit &&
				<form onSubmit={handleFormSubmit} className={`card formCard`}>
					<label htmlFor="title">Title</label>
					<input type="text" value={title} onChange={event => setTitle(event.target.value)} id="title"/>
					<label htmlFor="url">Url</label>
					<input type="text" value={url} onChange={event => setUrl(event.target.value)} id="url"/>
					<button type="submit">Change</button>
				</form>
			}
		</>
	)
}

export default GalleryCard
