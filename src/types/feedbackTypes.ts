export interface IFeedback {
	author: string;
	date: number;
	feedbackText: string;
	uniqueFeedbackId: string;
}

export type FeedbackType = IFeedback[];
