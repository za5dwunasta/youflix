export type videosType = {
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
