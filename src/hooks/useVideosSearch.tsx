import { loadavg } from 'os';
import { useEffect, useState } from 'react';
import { VideosType, ResponseValueType } from '../types/appTypes';

export const useVideosSearch = () => {
	const [customSearch, setCustomSearch] = useState<boolean>(false);
	const [searchTerm, setSearchTerm] = useState<string>('');
	const [videos, setVideos] = useState<VideosType[]>([]);
	const [responseValue, setResponseValue] = useState<ResponseValueType>(ResponseValueType.loading);
	const key = process.env.REACT_APP_KEY_YOUTUBE;

	useEffect(() => {
		let url = '';
		setResponseValue(ResponseValueType.loading);
		if (searchTerm === '') {
			console.log('set popular');
			url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,id&chart=mostPopular&maxResults=25&key=${key}`;
		} else {
			console.log('set customs earch');

			url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&order=relevance&type=video&q=${searchTerm}&key=${key}`;
		}

		async function load() {
			console.log(url);
			try {
				const response = await fetch(url);
				const result = await response.json();
				console.log(result);
				setVideos(result.items);
				setResponseValue(ResponseValueType.responseData);
			} catch (e) {
				console.log(e);
				setResponseValue(ResponseValueType.error);
			} finally {
				console.log('success!');
			}
		}
		console.log(videos);
		load();
	}, [customSearch, searchTerm, key]);
	return { videos, customSearch, setCustomSearch, searchTerm, setSearchTerm, responseValue };
};
