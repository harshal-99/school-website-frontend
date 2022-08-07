import {useEffect, useState} from "react";
import NoticeService from "../../service/notice.service";
import '../../index.css'
import NoticeCard from "./NoticeCard";
import {useAuth} from "../Auth";
import NoticeForm from "./NoticeForm";


const Notice = () => {
	const auth = useAuth()
	const [notices, setNotices] = useState([])
	useEffect(() => {
		const controller = new AbortController();
		NoticeService
			.getNotices(controller)
			.then(data => setNotices(data))
			.catch(() => {
			})
		return () => controller.abort()
	}, [])

	const handleNoticeUpdate = (notice) => {
		setNotices(prev => prev.map(n => n.id === notice.id ? notice : n))
	}

	const handleNoticeDelete = (notice) => {
		setNotices(prev => prev.filter(n => n.id !== notice.id))
	}

	const handleNoticeCreate = (notice) => {
		setNotices([notice, ...notices])
	}

	return (
		<div className='container'>
			{auth?.user
				&& <NoticeForm handleNoticeCreate={handleNoticeCreate}/>
			}
			{notices.map(notice =>
				<NoticeCard handleNoticeDelete={handleNoticeDelete}
				            handleNoticeUpdate={handleNoticeUpdate}
				            notice={notice} key={notice.title}/>)
			}
		</div>
	)
}

export default Notice
