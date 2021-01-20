import React, { useEffect, useState } from 'react';
import { videosType } from '../types/videos';
import { data } from '../data/data';

export const usePopularSearch = () => {
	const key = process.env.REACT_APP_KEY_YOUTUBE;
	const initialData = data.items;

	const [videos, setVideos] = useState<any[]>(initialData);
	const [loading, setLoading] = useState(false);
	const url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet&part=id&chart=mostPopular&maxResults=25&key=${key}`;
	// useEffect(() => {
	// 	async function load<videosType>(_url: string) {
	// 		setLoading(true);
	// 		try {
	// 			console.log(url);
	// 			const response = await fetch(_url);
	// 			const result = await response.json();
	// 			console.log(result);
	// 			setVideos(result.items);
	// 			setLoading(false);
	// 		} catch (e) {
	// 			console.log(e);
	// 		} finally {
	// 			console.log('success!');
	// 		}
	// 	}

	// 	load(url);
	// }, []);

	return { videos };
};
