import { useEffect, useState } from 'react';
import { videosType } from '../types/videosTypes';

export const usePopularSearch = () => {
	const [customSearch, setCustomSearch] = useState<boolean>(false);
	const [searchTerm, setSearchTerm] = useState<string>('');
	const [videos, setVideos] = useState<videosType[]>([]);
	const key = process.env.REACT_APP_KEY_YOUTUBE;

	useEffect(() => {
		let url = '';
		if (searchTerm === '') {
			console.log('set popular');
			url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,id&chart=mostPopular&maxResults=25&key=${key}`;
		} else {
			console.log('set customs earch');

			url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&order=relevance&q=${searchTerm}&key=${key}`;
		}

		async function load() {
			console.log(url);
			try {
				const response = await fetch(url);
				const result = await response.json();

				const videosResults = customSearch
					? result.items.filter((item: { id: { kind: string } }) => item.id.kind === 'youtube#video')
					: result.items;

				setVideos(videosResults);
			} catch (e) {
				console.log(e);
			} finally {
				console.log('success!');
			}
		}
		load();
	}, [customSearch, searchTerm, key]);
	return { videos, customSearch, setCustomSearch, searchTerm, setSearchTerm };
};
