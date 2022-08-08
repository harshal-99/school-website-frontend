import {useAuth} from "../Auth";
import {useState} from "react";
import NoticeService from "../../service/notice.service";

const NoticeCard = ({notice, handleNoticeUpdate, handleNoticeDelete}) => {
	const auth = useAuth()
	const [edit, setEdit] = useState(false)
	const [title, setTitle] = useState(notice.title)
	const [description, setDescription] = useState(notice.description)

	const handleEdit = (event) => {
		setEdit(prev => !prev)
	}

	const handleFormSubmit = async (event) => {
		event.preventDefault()
		setEdit(prev => !prev)
		const newNotice = await NoticeService.updateNotice({...notice, title, description})
		handleNoticeUpdate(newNotice)
	}

	const handleDelete = async () => {
		await NoticeService.deleteNotice(notice)
		handleNoticeDelete(notice)
	}
	return (
		<>
			{!edit &&
				<div className="card">
					<h2>{notice.title}</h2>
					<p>{notice.description}</p>
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

					<label htmlFor="description">Description</label>
					<input type="text" value={description} onChange={event => setDescription(event.target.value)}
					       id="description"/>
					<button type="submit">Change</button>
				</form>
			}
		</>
	)
}

export default NoticeCard
