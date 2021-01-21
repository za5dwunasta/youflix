import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import '../App.scss';

const SkeletonCard = () => {
	return (
		<SkeletonTheme color="#000000" highlightColor="#131313">
			<h2 className="heading">
				<Skeleton height={30} width={300} />
			</h2>

			<div className="results-grid">
				{Array(9)
					.fill('')
					.map((item, index) => (
						<>
							<div className="grid-item" key={index}>
								<Skeleton height={180} width={240} />

								<h3 className="grid__item-title">
									<Skeleton width={`60%`} />
								</h3>
								<div className="grid__item-chanel">
									<Skeleton width={`70%`} />
								</div>
								<div className="grid__item-date">
									<Skeleton width={`50%`} />
								</div>
							</div>
						</>
					))}
			</div>
		</SkeletonTheme>
	);
};
export default SkeletonCard;
