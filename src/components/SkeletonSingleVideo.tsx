import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import '../layout/SingleVideo.scss';

const SkeletonSingleVideo: React.FunctionComponent = () => {
	return (
		<SkeletonTheme color="#000000" highlightColor="#131313">
			<div className="video__container">
				<div className="video__box--skeleton">
					<Skeleton height={360} width={640} />
				</div>
				<h3 className="video__description">
					<Skeleton height={24} width={'70%'} />
				</h3>
			</div>
		</SkeletonTheme>
	);
};
export default SkeletonSingleVideo;
