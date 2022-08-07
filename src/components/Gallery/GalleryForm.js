import {useState} from "react";
import PhotoService from "../../service/gallery.service";

const GalleryForm = ({handleGalleryCreate}) => {
	const [showForm, setShowForm] = useState(false);
	const [title, setTitle] = useState('');
	const [url, setUrl] = useState('')

	const handleFormSubmit = async () => {
		if (title === '' || url === '') return setShowForm(false)
		PhotoService
			.createPhoto({title, url})
			.then(photo => handleGalleryCreate(photo))
		setTitle('')
		setUrl('')
		setShowForm(false)
	}
	return (
		<>
			{!showForm &&
				<button onClick={() => setShowForm(true)}>Create new Photo</button>
			}
			{showForm &&
				<form onSubmit={handleFormSubmit} className="card formCard">
					<label htmlFor={'title'}>Title</label>
					<input type="text" value={title} onChange={event => setTitle(event.target.value)}/>
					<label htmlFor={'url'}>Url</label>
					<input type="text" value={url} onChange={event => setUrl(event.target.value)}/>
					<button type="submit">Submit</button>
				</form>
			}
		</>
	)
}

export default GalleryForm;
