export type VideosType = {
	id: string;
	snippet: {
		publishedAt: number;
		channelId: string;
		title: string;
		description: string;
		thumbnails: {
			medium: {
				url: string;
			};
		};
		channelTitle: string;
		tags: [string];
		categoryId: string;
		liveBroadcastContent: string;
		defaultLanguage: string;
		localized: {
			title: string;
			description: string;
		};
		defaultAudioLanguage: string;
	};
};

export type SearchResultsType = {
	items: [
		{
			kind: 'youtube#searchResult';

			id: {
				kind: string;
				videoId: string;
				channelId: string;
				playlistId: string;
			};
			snippet: {
				publishedAt: Date;
				channelId: string;
				title: string;
				description: string;
				thumbnails: {
					medium: {
						url: string;
						width: number;
						height: number;
					};
				};
				channelTitle: string;
				liveBroadcastContent: string;
			};
		}
	];
};

export enum ResponseValueType {
	loading,
	responseData,
	error,
}
