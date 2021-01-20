import React, { useEffect, useState } from 'react';
// import { videosType } from '../types/videosTypes';
import { data } from '../data/data';

export const usePopularSearch = (setVideos: Function) => {
	// const [videos, setVideos] = useState<any[]>(initialData);
	// const [loading, setLoading] = useState(false);
	// const url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippe,id&chart=mostPopular&maxResults=25&key=${key}`;
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
	// return { videos };
};
