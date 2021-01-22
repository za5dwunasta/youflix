import React, { useState, useRef } from 'react';
import { ReactComponent as Loupe } from '../assets/loupe.svg';
import { useVideosValue } from '../context/videos-context';
import { useParams, useHistory } from 'react-router-dom';
import { loadingType } from '../types/appTypes';

import './Search.scss';

const Search: React.FC = () => {
	const searchField = useRef<HTMLInputElement>(null);

	const [tempSearch, setTempSearch] = useState<string>('');
	const { setSearchTerm, setLoadMore, setCustomSearch } = useVideosValue();
	const { id } = useParams<{ id: string }>();
	const history = useHistory();

	const handleSubmit = (e: any) => {
		e.preventDefault();
		if (tempSearch === '') {
			setCustomSearch(false);
		} else if (tempSearch !== '') {
			setCustomSearch(true);
		}
		setSearchTerm(tempSearch);
		setLoadMore(loadingType.initial);
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
						value={tempSearch}
						aria-label="Custom search input field"
					/>
				</div>
				<button type="submit" aria-label="Search" className="search__button">
					<Loupe />
				</button>
			</form>
		</>
	);
};

export default Search;
