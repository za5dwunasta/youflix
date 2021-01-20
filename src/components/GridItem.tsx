import React from 'react';

type GridItemProps = {
	item: any;
	timeSincePubl: number;
	datePubl: Date;
	today: Date;
};

const GridItem: React.FC<GridItemProps> = ({ item, timeSincePubl, datePubl, today }) => {
	return (
		<div key={item.id} className="grid__item">
			<img src={item.snippet?.thumbnails?.medium?.url} alt="" />
			<div className="grid__item-desc">
				<h3 className="grid__item-title">{item.snippet.title}</h3>
				<div className="grid__item-chanel">{item.snippet.channelTitle}</div>
				<div className="grid__item-date">
					{timeSincePubl < 1
						? `${Math.round((today.getTime() - datePubl.getTime()) / (1000 * 3600))} hours ago`
						: `${timeSincePubl} days ago`}
				</div>
			</div>
		</div>
	);
};

export default GridItem;
