import React, { createContext, useContext } from 'react';
import { usePopularSearch } from '../hooks/usePopularSearch';

interface IVideos {
	videos: any[];
	customSearch: boolean;
	setCustomSearch: (customSearch: boolean) => void;
	searchTerm: string;
	setSearchTerm: (customSearch: string) => void;
	today: Date;
}

const IVideosValue: IVideos = {
	videos: [],
	customSearch: false,
	setCustomSearch: () => {},
	searchTerm: '',
	setSearchTerm: () => {},
	today: new Date(),
};

export const VideosContext = createContext<IVideos>(IVideosValue);
// eslint-disable-next-line react/prop-types
export const VideosProvider = ({ children }: { children: React.ReactNode }) => {
	const today = new Date();
	const { videos, customSearch, setCustomSearch, searchTerm, setSearchTerm } = usePopularSearch();

	return (
		<VideosContext.Provider
			value={{
				videos,
				today,
				customSearch,
				setCustomSearch,
				searchTerm,
				setSearchTerm,
			}}
		>
			{children}
		</VideosContext.Provider>
	);
};
export const useVideosValue = () => useContext(VideosContext);
