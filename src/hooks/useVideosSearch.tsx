import { useEffect, useState } from 'react';
import { VideosType, responseStatusType, loadingType } from '../types/appTypes';

export const useVideosSearch = () => {
	const [customSearch, setCustomSearch] = useState<boolean>(false);
	const [searchTerm, setSearchTerm] = useState<string>('');
	const [videos, setVideos] = useState<VideosType[]>([]);
	const [loadMore, setLoadMore] = useState<loadingType>(loadingType.initial);
	const [nextPageToken, setNextPageToken] = useState<string>('');
	const [responseStatus, setResponseStatus] = useState<responseStatusType>(responseStatusType.loading);
	// const [url, setUrl] = useState('');
	const key = process.env.REACT_APP_KEY_YOUTUBE;

	useEffect(() => {
		if (loadMore === loadingType.stop) {
			return;
		}
		if (loadMore === loadingType.initial) {
			setResponseStatus(responseStatusType.loading);
		}

		let url = '';
		const loadingToken = `${loadMore === loadingType.more ? `&pageToken=${nextPageToken}&` : ''}`;
		if (!customSearch) {
			console.log('set popular');
			url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,id&${loadingToken}chart=mostPopular&maxResults=25&key=${key}`;
		} else if (customSearch) {
			console.log('set customs earch');
			url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&${loadingToken}order=relevance&type=video&q=${searchTerm}&key=${key}`;
		}

		console.log('to bedzie szukane ' + url);

		async function load() {
			try {
				const response = await fetch(url);
				const result = await response.json();
				setNextPageToken(result.nextPageToken);
				if (loadMore === loadingType.initial) {
					console.log('I am loading just a little');

					if (result.items?.length === 0 || result.items === undefined) {
						setResponseStatus(responseStatusType.error);
						return;
					}
					setVideos(result.items);
					setResponseStatus(responseStatusType.responseData);
				} else if (loadMore === loadingType.more) {
					console.log(result);
					setVideos([...videos, ...result.items]);
				}
				if (loadMore === loadingType.initial) {
					setResponseStatus(responseStatusType.responseData);
				}
				setLoadMore(loadingType.stop);
			} catch (e) {
				console.log(e);
				setResponseStatus(responseStatusType.error);
			} finally {
				console.log('success!');
			}
		}
		console.log(videos);
		load();
		// eslint-disable-next-line
	}, [searchTerm, key, loadMore, customSearch]);
	return { videos, customSearch, setCustomSearch, searchTerm, setSearchTerm, responseStatus, setLoadMore };
};
