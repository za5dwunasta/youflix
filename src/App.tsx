import React, { Suspense, lazy } from 'react';
import { Route, Switch, useParams, useHistory } from 'react-router-dom';

import './App.scss';

import { useVideosValue } from './context/videos-context';
import PageWrapper from './layout/PageWrapper';
import Search from './components/Search';
import { ReactComponent as Githubicon } from './assets/github-icon.svg';

import { loadingType } from './types/appTypes';

const HomePage = lazy(() => import('./layout/HomePage'));
const SingleVideo = lazy(() => import('./layout/SingleVideo'));
const PageNotFound = lazy(() => import('./layout/PageNotFound'));

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
				<div className="icon">
					<Githubicon />
				</div>
			</div>
			<PageWrapper>
				<Suspense fallback={<div>Wczytywanie...</div>}>
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
				</Suspense>
			</PageWrapper>
		</div>
	);
};

export default App;
