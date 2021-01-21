import React from 'react';
import './PageWrapper.scss';

const PageWrapper: React.FunctionComponent = ({ children }) => {
	return <div className="pagewrapper">{children}</div>;
};

export default PageWrapper;
