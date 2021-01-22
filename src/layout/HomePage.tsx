import React, { useEffect, useRef } from 'react';
import GridItem from '../components/GridItem';

import { useVideosValue } from '../context/videos-context';
import { responseStatusType, loadingType } from '../types/appTypes';
import SkeletonHomePage from '../components/SkeletonHomePage';

import './HomePage.scss';
import ErrorPage from './ErrorPage';

const HomePage: React.FC = () => {
	const { videos, today, responseStatus, setLoadMore, customSearch, searchTerm } = useVideosValue();
	const container = useRef<HTMLDivElement>(null);

	const trackScrolling = () => {
		const contentHeight = container?.current?.offsetHeight;
		const pageView = document.documentElement.scrollTop + window.innerHeight - 48 - 70;

		if (contentHeight === pageView) {
			console.log('header bottom reached');
			setLoadMore(loadingType.more);
		}
	};

	useEffect(() => {
		document.addEventListener('scroll', trackScrolling, { passive: true });
	});

	return (
		<div ref={container}>
			{responseStatus === responseStatusType.loading ? (
				<SkeletonHomePage />
			) : responseStatus === responseStatusType.error ? (
				<ErrorPage />
			) : (
				<>
					<h2 className="heading">
						{customSearch ? `Search results for: ${searchTerm}` : 'Most popular videos on Youtube'}
					</h2>
					<div className="results-grid">
						{videos?.length > 0 &&
							videos.map((item) => {
								const datePubl = new Date(item.snippet.publishedAt);
								const timeSincePubl = Math.round(
									(today.getTime() - datePubl.getTime()) / (1000 * 3600 * 24)
								);
								return (
									<GridItem
										item={item}
										timeSincePubl={timeSincePubl}
										datePubl={datePubl}
										today={today}
										key={typeof item.id === 'object' ? item.id.videoId : item.id}
									/>
								);
							})}
					</div>
				</>
			)}
		</div>
	);
};

export default HomePage;
