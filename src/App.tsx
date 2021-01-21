import React from 'react';
import './App.scss';
import Search from './components/Search';

import { ReactComponent as Githubicon } from './assets/github-icon.svg';

import HomePage from './layout/HomePage';
import { Route, Switch, Link } from 'react-router-dom';
import SingleVideo from './layout/SingleVideo';

const App: React.FC = () => {
	return (
		<div className="App">
			<div className="navbar">
				<Link to="/">
					<h1 className="navbar__logo">YouTube</h1>
				</Link>
				<Search />
				<div className="icon">
					<Githubicon />
				</div>
			</div>
			<Switch>
				<Route path="/" exact>
					<HomePage />
				</Route>
				<Route path="/videos/:id">
					<SingleVideo />
				</Route>
			</Switch>
		</div>
	);
};

export default App;
