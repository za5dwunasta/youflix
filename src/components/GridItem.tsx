import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import './GridItem.scss';

type GridItemProps = {
	item: any;
	timeSincePubl?: number;
	datePubl: Date;
	today?: Date;
};

const GridItem: React.FC<GridItemProps> = ({ item, timeSincePubl, datePubl, today }) => {
	return (
		<Link to={`/videos/${typeof item.id === 'object' ? item.id.videoId : item.id}`}>
			<div key={item.id} className="grid__item">
				<img src={item.snippet?.thumbnails?.medium?.url} alt={item.snippet.title} />
				<div className="grid__item-desc">
					<h3 className="grid__item-title">{item.snippet.title}</h3>
					<div className="grid__item-chanel">{item.snippet.channelTitle}</div>
					<div className="grid__item-date">{moment(datePubl).startOf('day').fromNow()}</div>
				</div>
			</div>
		</Link>
	);
};

export default GridItem;
