import React, { useEffect, useState } from 'react';
import { useParams, Link, withRouter } from 'react-router-dom';
import { numberWithSpaces } from '../helpers/helpers';
import { ReactComponent as Like } from '../assets/like.svg';
import { ReactComponent as Dislike } from '../assets/dislike.svg';
import { ReactComponent as HeartEmpty } from '../assets/heart_empty.svg';
import { ReactComponent as HeartFull } from '../assets/heart_full.svg';
import { ReactComponent as Comment } from '../assets/comment.svg';
import useVideoDetails from '../hooks/useVideoDetails';
import { responseStatusType } from '../types/appTypes';
import SkeletonSingleVideo from '../components/SkeletonSingleVideo';

import './SingleVideo.scss';

const SingleVideo = () => {
	const { id } = useParams<{ id: string }>();
	const [hearted, setHearted] = useState(localStorage.getItem(id) || false);
	const { video, responseStatus } = useVideoDetails(id);

	return (
		<>
			{responseStatus === responseStatusType.loading ? (
				<SkeletonSingleVideo />
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
							{numberWithSpaces(video?.views)} views ● {video?.date}
						</p>
						<p className="video__date"></p>
						<p className="video__likes">
							<Like /> {numberWithSpaces(video?.likes)}
						</p>
						<p className="video__dislikes">
							<Dislike /> {numberWithSpaces(video?.dislikes)}
						</p>
						<p className="video__comments">
							<Comment /> {numberWithSpaces(video?.comments)}
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
