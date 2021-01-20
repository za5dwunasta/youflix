import React, { useState, useEffect, useRef } from 'react';
import { ReactComponent as Loupe } from '../assets/loupe.svg';
import { searchResultsType } from '../types/videosTypes';
import { useVideosValue } from '../context/videos-context';

import './Search.scss';

const Search: React.FC = () => {
	// const searchField = useRef<HTMLInputElement>(null);
	const [showSugesstions, setShowSuggestions] = useState<boolean>(false);
	const [tempSearch, setTempSearch] = useState<string>('');
	const [requestCount, setRequestCount] = useState<number>(0);
	const [show, setShow] = useState<string>('neither');
	const [resultsList, setResultsList] = useState<any[]>([]);
	const { setVideos } = useVideosValue();
	// const [videos, setVideos] = useState<any[]>(initialData);

	useEffect(() => {
		if (tempSearch.trim()) {
			setShow('loading');
			const delay = setTimeout(() => setRequestCount(requestCount + 1), 700);
			return () => clearTimeout(delay);
		} else {
			setShow('neither');
		}
	}, [tempSearch]);

	const key = process.env.REACT_APP_KEY_YOUTUBE;

	// useEffect(() => {
	// 	if (requestCount === 0) {
	// 		return;
	// 	}
	// 	async function fetchResults<searchResultsType>() {
	// 		try {
	// 			// const url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&order=relevance&q=${tempSearch}&key=${key}`;
	// 			const url = `https://cors-anywhere.herokuapp.com/https://clients1.google.com/complete/search?client=firefox&hl=pl&&ds=yt&q=${tempSearch}`;

	// 			console.log(url);
	// 			const response = await fetch(url);
	// 			const result = await response.json();
	// 			console.log(result);
	// 			// const videosResults = result.items.filter(
	// 			// 	(item: { id: { kind: string } }) => item.id.kind === 'youtube#video'
	// 			// );
	// 			// console.log(videosResults);
	// 			// setVideos(videosResults);
	// 			setResultsList(result[1]);
	// 		} catch (e) {
	// 			console.log(e);
	// 		} finally {
	// 			console.log('success!');
	// 		}
	// 	}
	// 	fetchResults();
	// 	// 	setState((draft) => {
	// 	// 		draft.results = response.data;
	// 	// 		draft.show = 'results';
	// 	// 	});
	// 	// } catch (e) {
	// 	// 	console.log('There was a problem');
	// 	// }
	// }, [requestCount]);

	// const handleNewSearch = (e) => {
	// 	e.preventDefault();
	// 	setTempSearch()
	// };

	const handleSubmit = (e: any) => {
		e.preventDefault();
		e.stopPropagation();

		async function fetchResults<searchResultsType>() {
			try {
				const url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&order=relevance&q=${tempSearch}&key=${key}`;

				console.log(url);
				const response = await fetch(url);
				const result = await response.json();
				console.log(result);
				const videosResults = result.items.filter(
					(item: { id: { kind: string } }) => item.id.kind === 'youtube#video'
				);
				console.log(videosResults);
				setVideos(videosResults);
			} catch (e) {
				console.log(e);
			} finally {
				console.log('success!');
			}
		}
		fetchResults();
	};

	return (
		<>
			<form className="search" action="" onSubmit={handleSubmit}>
				<div className="search__input-container">
					<input
						className="search__box"
						onChange={(e) => setTempSearch(e.target.value)}
						placeholder={`${tempSearch !== '' ? tempSearch : 'Search'}`}
						type="text"
						onFocus={() => {
							setShowSuggestions(true);
						}}
						onBlur={() => {
							// setTimeout(() => setShowSuggestions(false), 200);
							setShowSuggestions(false);
						}}
						value={tempSearch}
						// useRef={searchField}
					/>
					{showSugesstions && (
						<ul className="search__suggestions">
							{showSugesstions &&
								resultsList.map((item) => (
									<button
										onMouseDown={(e) => {
											e.preventDefault();
											setTempSearch(item);
										}}
									>
										{item}
									</button>
								))}
						</ul>
					)}
				</div>
				<button type="submit" className="search__button">
					<Loupe />
				</button>
			</form>
		</>
	);
};

export default Search;
