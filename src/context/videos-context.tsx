import React, { createContext, useContext, useState } from 'react';
import { data } from '../data/data';
import { videosType, searchResultsType } from '../types/videosTypes';

interface IVideos {
	videos: any[];
	setVideos: (videos: any[]) => void;
}

const IVideosValue: IVideos = {
	videos: [],
	setVideos: () => {},
};

export const VideosContext = createContext<IVideos>(IVideosValue);
// eslint-disable-next-line react/prop-types
export const VideosProvider = ({ children }: { children: React.ReactNode }) => {
	const key = process.env.REACT_APP_KEY_YOUTUBE;
	const initialData = data.items;
	const [videos, setVideos] = useState<any[]>(initialData);

	console.log('context' + videos);
	return (
		<VideosContext.Provider
			value={{
				videos,
				setVideos,
			}}
		>
			{children}
		</VideosContext.Provider>
	);
};
export const useVideosValue = () => useContext(VideosContext);
