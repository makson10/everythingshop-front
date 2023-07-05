export interface IFeedback {
	name: string;
	date: number;
	feedbackText: string;
	uniqueFeedbackId: string;
}

export type FeedbackType = IFeedback[];
