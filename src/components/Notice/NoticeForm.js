import {useState} from "react";
import '../../index.css'
import NoticeService from "../../service/notice.service";

const NoticeForm = ({handleNoticeCreate}) => {
	const [showForm, setShowForm] = useState(false)
	const [title, setTitle] = useState('')
	const [description, setDescription] = useState('')

	const handleFormSubmit = async () => {
		if (title === '' || description === '') return setShowForm(false)
		try {
			NoticeService
				.createNotice({title, description})
				.then(notice => handleNoticeCreate(notice))
			setTitle('')
			setDescription('')
			setShowForm(false)
		} catch (e) {
			console.dir(e)
		}
	}
	return (
		<>
			{!showForm &&
				<button onClick={() => setShowForm(true)}>Create new Notice</button>
			}
			{showForm &&
				<form onSubmit={handleFormSubmit} className="card formCard">
					<label htmlFor={'title'}>Title</label>
					<input type="text" value={title} onChange={event => setTitle(event.target.value)}/>
					<label htmlFor={'description'}>Description</label>
					<input type="text" value={description} onChange={event => setDescription(event.target.value)}/>
					<button type="submit">Submit</button>
				</form>
			}
		</>
	)
}

export default NoticeForm
