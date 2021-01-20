import React, { useEffect, useState } from 'react';
import './App.scss';
import GridItem from './components/GridItem';
import Search from './components/Search';
import { usePopularSearch } from './hooks/usePopularSearch';
import { ReactComponent as Githubicon } from './assets/github-icon.svg';
import { useVideosValue, VideosProvider } from './context/videos-context';

const App: React.FC = () => {
	let today: Date = new Date();
	const { videos } = useVideosValue();
	console.log('app ' + videos);
	return (
		<div className="App">
			<div className="navbar">
				<h1 className="navbar__logo">YouTube</h1>
				<Search />
				<div className="icon">
					<Githubicon />
				</div>
			</div>
			<h2 className="heading">Most popular videos on Youtube</h2>
			<div className="results-grid">
				{videos?.length > 0 &&
					videos.map((item) => {
						const datePubl = new Date(item.snippet.publishedAt);
						const timeSincePubl = Math.round((today.getTime() - datePubl.getTime()) / (1000 * 3600 * 24));
						return (
							<GridItem item={item} timeSincePubl={timeSincePubl} datePubl={datePubl} today={today} />
							// <div key={item.id} className="grid__item">
							// 	<img src={item.snippet?.thumbnails?.medium?.url} alt="" />
							// 	<div className="grid__item-desc">
							// 		<h3 className="grid__item-title">{item.snippet.title}</h3>
							// 		<div className="grid__item-chanel">{item.snippet.channelTitle}</div>
							// 		<div className="grid__item-date">
							// 			{timeSincePubl < 1
							// 				? `${Math.round(
							// 						(today.getTime() - datePubl.getTime()) / (1000 * 3600)
							// 				  )} hours ago`
							// 				: `${timeSincePubl} days ago`}
							// 		</div>
							// 	</div>
							// </div>
						);
					})}
			</div>
		</div>
	);
};

export default App;
