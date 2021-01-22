import React from 'react';
import { Route, Switch, useParams, useHistory } from 'react-router-dom';

import './App.scss';

import { useVideosValue } from './context/videos-context';
import PageWrapper from './layout/PageWrapper';
import Search from './components/Search';
import { ReactComponent as Githubicon } from './assets/github-icon.svg';

import { loadingType } from './types/appTypes';

import SingleVideo from './layout/SingleVideo';
import HomePage from './layout/HomePage';
import PageNotFound from './layout/PageNotFound';

const App: React.FC = () => {
	const { id } = useParams<{ id: string }>();
	const history = useHistory();
	const { setLoadMore, setCustomSearch } = useVideosValue();

	const handleClick = (e: any) => {
		if (id !== '') {
			history.push('/');
		}
		setCustomSearch(false);
		setLoadMore(loadingType.initial);
	};
	return (
		<div className="App">
			<div className="navbar">
				<button onClick={handleClick} aria-label="Return to the home page" className="navbar__logo">
					YouTube
				</button>

				<Search />
				<a
					className="navbar__icon"
					href="https://github.com/za5dwunasta/youflix"
					rel="noreferrer"
					target="_blank"
				>
					<Githubicon />
				</a>
			</div>
			<PageWrapper>
				<Switch>
					<Route path="/" exact>
						<HomePage />
					</Route>
					<Route path="/videos/:id">
						<SingleVideo />
					</Route>
					<Route>
						<PageNotFound />
					</Route>
				</Switch>
			</PageWrapper>
		</div>
	);
};

export default App;
