import React from 'react';

type ErrorProps = {
	text: string;
};

const ErrorPage: React.FC<ErrorProps> = ({ text }) => {
	return <div style={{ textAlign: 'center' }}>{text}</div>;
};

export default ErrorPage;
