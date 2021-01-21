import React from 'react';
import GridItem from '../components/GridItem';

import { useVideosValue } from '../context/videos-context';
import { ResponseValueType } from '../types/appTypes';
import SkeletonCard from './SkeletonCart';

const HomePage: React.FC = () => {
	const { videos, today, responseValue } = useVideosValue();

	return (
		<>
			{responseValue === ResponseValueType.loading ? (
				<SkeletonCard />
			) : (
				<>
					<h2 className="heading">Most popular videos on Youtube</h2>
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
									/>
								);
							})}
					</div>
				</>
			)}
		</>
	);
};

export default HomePage;
