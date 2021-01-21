import { useState, useEffect } from 'react';
import { responseStatusType } from '../types/appTypes';

interface IVideo {
	title: string;
	views: number;
	likes: number;
	dislikes: number;
	comments: number;
	iframe: string;
	date?: Date;
}

const InitialValue: IVideo = {
	title: '',
	views: 0,
	likes: 0,
	dislikes: 0,
	comments: 0,
	iframe: '',
};

const useVideoDetails = (id: string) => {
	const [video, setVideo] = useState<IVideo>(InitialValue);
	const key = process.env.REACT_APP_KEY_YOUTUBE;
	const [responseStatus, setResponseStatus] = useState<responseStatusType>(responseStatusType.loading);

	useEffect(() => {
		const url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics%2C%20player&id=${id}&key=${key}`;
		setResponseStatus(responseStatusType.loading);

		async function load() {
			try {
				const response = await fetch(url);
				const result = await response.json();
				setVideo({
					title: result.items[0].snippet.title,
					views: result.items[0].statistics.viewCount,
					likes: result.items[0].statistics.likeCount,
					dislikes: result.items[0].statistics.dislikeCount,
					comments: result.items[0].statistics.commentCount,

					iframe: result.items[0].player.embedHtml,
					date: result.items[0].snippet.publishedAt,
				});
				setResponseStatus(responseStatusType.responseData);
			} catch (e) {
				setResponseStatus(responseStatusType.error);
				console.log(e);
			} finally {
				console.log('success!');
			}
		}
		load();
	}, [id, key]);
	return { video, responseStatus };
};

export default useVideoDetails;
