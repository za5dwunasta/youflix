import React, { useState, useEffect, useRef } from 'react';
import { ReactComponent as Loupe } from '../assets/loupe.svg';
import { useVideosValue } from '../context/videos-context';
import { useParams, useHistory } from 'react-router-dom';

import './Search.scss';

const Search: React.FC = () => {
	const searchField = useRef<HTMLInputElement>(null);
	const [showSugesstions, setShowSuggestions] = useState<boolean>(false);
	const [requestCount, setRequestCount] = useState<number>(0);
	const [resultsList, setResultsList] = useState<any[]>([]);
	const [tempSearch, setTempSearch] = useState<string>('');
	const { setSearchTerm } = useVideosValue();
	const { id } = useParams<{ id: string }>();
	const history = useHistory();

	useEffect(() => {
		const delay = setTimeout(() => setRequestCount(requestCount + 1), 700);
		return () => clearTimeout(delay);
	}, [tempSearch, requestCount]);

	useEffect(() => {
		if (requestCount === 0) {
			return;
		}

		if (tempSearch === '') {
			setResultsList([]);
			return;
		}

		async function fetchResults() {
			try {
				const url = `https://cors-anywhere.herokuapp.com/https://clients1.google.com/complete/search?client=firefox&hl=pl&&ds=yt&q=${tempSearch}`;
				const response = await fetch(url);
				const result = await response.json();
				setResultsList(result[1]);
			} catch (e) {
				console.log(e);
			} finally {
				console.log('success!');
			}
		}
		fetchResults();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [requestCount]);

	const handleSubmit = (e: any) => {
		e.preventDefault();
		setSearchTerm(tempSearch);
		if (id !== '') {
			history.push('/');
		}
	};

	return (
		<>
			<form className="search" action="" onSubmit={handleSubmit}>
				<div className="search__input-container">
					<input
						ref={searchField}
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
					/>
					{showSugesstions && (
						<ul className="search__suggestions">
							{showSugesstions &&
								resultsList.map((item) => (
									<button
										onMouseDown={(e) => {
											e.preventDefault();
											setTempSearch(item);
											setSearchTerm(item);
											searchField.current?.blur();
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
