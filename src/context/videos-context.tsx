import React, { createContext, useContext } from 'react';
import { useVideosSearch } from '../hooks/useVideosSearch';
import { ResponseValueType } from '../types/appTypes';

interface IVideos {
	videos: any[];
	customSearch: boolean;
	setCustomSearch: (customSearch: boolean) => void;
	searchTerm: string;
	setSearchTerm: (customSearch: string) => void;
	today: Date;
	responseValue: ResponseValueType;
}

const IVideosValue: IVideos = {
	videos: [],
	customSearch: false,
	setCustomSearch: () => {},
	searchTerm: '',
	setSearchTerm: () => {},
	today: new Date(),
	responseValue: ResponseValueType.loading,
};

export const VideosContext = createContext<IVideos>(IVideosValue);
// eslint-disable-next-line react/prop-types
export const VideosProvider = ({ children }: { children: React.ReactNode }) => {
	const today = new Date();
	const { videos, customSearch, setCustomSearch, searchTerm, setSearchTerm, responseValue } = useVideosSearch();

	return (
		<VideosContext.Provider
			value={{
				videos,
				today,
				customSearch,
				setCustomSearch,
				searchTerm,
				setSearchTerm,
				responseValue,
			}}
		>
			{children}
		</VideosContext.Provider>
	);
};
export const useVideosValue = () => useContext(VideosContext);
