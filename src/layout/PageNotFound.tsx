import React from 'react';
import { Link } from 'react-router-dom';

const PageNotFound: React.FunctionComponent = () => {
	return (
		<div style={{ textAlign: 'center' }}>
			Oops, this page isn't here! Please go back to{' '}
			<Link style={{ fontWeight: 'bold', textDecoration: 'underline' }} to="/">
				the homepage
			</Link>
			.
		</div>
	);
};

export default PageNotFound;
