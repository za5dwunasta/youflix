import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { numberWithSpaces } from '../helpers/helpers';
import { ReactComponent as Like } from '../assets/like.svg';
import { ReactComponent as Dislike } from '../assets/dislike.svg';
import { ReactComponent as HeartEmpty } from '../assets/heart_empty.svg';
import { ReactComponent as HeartFull } from '../assets/heart_full.svg';
import { ReactComponent as Comment } from '../assets/comment.svg';
import useVideoDetails from '../hooks/useVideoDetails';
import { responseStatusType } from '../types/appTypes';
import SkeletonSingleVideo from '../components/SkeletonSingleVideo';
import moment from 'moment';

import './SingleVideo.scss';
import ErrorPage from './ErrorPage';

const SingleVideo: React.FunctionComponent = () => {
	const { id } = useParams<{ id: string }>();
	const [hearted, setHearted] = useState(localStorage.getItem(id) || false);
	const { video, responseStatus } = useVideoDetails(id);

	return (
		<>
			{responseStatus === responseStatusType.loading ? (
				<SkeletonSingleVideo />
			) : responseStatus === responseStatusType.error ? (
				<ErrorPage text="Oops, there was a problem loading data. Please refresh or try later." />
			) : responseStatus === responseStatusType.noData ? (
				<ErrorPage text="We can't find video you are looking for :(" />
			) : (
				<div className="video__container">
					<div className="video__box">
						<iframe
							title="Video"
							className="video__responsive-iframe"
							src={video?.iframe.slice(
								video?.iframe.indexOf(`src="`) + 5,
								video?.iframe.indexOf(`frameborder`) - 2
							)}
						></iframe>
					</div>
					<h3 className="video__description">{video?.title}</h3>
					<div className="video__stats">
						<p className="video__views">
							{numberWithSpaces(video?.views)} views • {moment(video?.date).format('MMM Do YY')}
						</p>

						<p className="video__likes">
							<Like /> {video?.likes !== 0 ? numberWithSpaces(video?.likes) : video?.likes}
						</p>
						<p className="video__dislikes">
							<Dislike /> {video?.dislikes !== 0 ? numberWithSpaces(video?.dislikes) : video?.dislikes}
						</p>
						<p className="video__comments">
							<Comment /> {video?.comments !== 0 ? numberWithSpaces(video?.comments) : video?.comments}
						</p>
						<button
							onClick={() => {
								setHearted(!hearted);
								localStorage.setItem(id, `${hearted}`);
							}}
							className="video__hearted"
						>
							{hearted ? <HeartFull /> : <HeartEmpty />}
						</button>
					</div>
				</div>
			)}
		</>
	);
};

export default SingleVideo;
