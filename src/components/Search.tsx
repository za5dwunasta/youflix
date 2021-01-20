import React, { useState } from 'react';
import { ReactComponent as Loupe } from '../assets/loupe.svg';
import './Search.scss';

const Search: React.FC = () => {
	const [tempSearch, setTempSearch] = useState<string>('');
	return (
		<form action="">
			<input
				className="navbar__searchbox"
				onChange={(e) => setTempSearch(e.target.value)}
				placeholder={`${tempSearch != '' ? tempSearch : 'Search'}`}
				type="text"
			/>
			<button className="navbar__button">
				<Loupe />
			</button>
		</form>
	);
};

export default Search;
