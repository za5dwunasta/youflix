import React, { useEffect, useState } from 'react';
import { useParams, Link, withRouter } from 'react-router-dom';

const SingleVideo = () => {
	const { id } = useParams<{ id: string }>();
	const [video, setVideo] = useState<string>('');
	console.log(id);
	const key = process.env.REACT_APP_KEY_YOUTUBE;

	useEffect(() => {
		const url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet&part=player&part=statistics&id=${id}&key=${key}`;
		async function load() {
			try {
				const response = await fetch(url);
				const result = await response.json();
				console.log(result);
				setVideo(result.items[0].player.embedHtml);
				console.log('video: ' + video);
			} catch (e) {
				console.log(e);
			} finally {
				console.log('success!');
			}
		}
		load();
	}, [id]);

	return (
		<>
			<div>Single Video</div>
			<div dangerouslySetInnerHTML={{ __html: video ? video : '' }} />
		</>
	);
};

export default SingleVideo;
