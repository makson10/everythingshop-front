export interface IFeedback {
	userName: string;
	date: number;
	feedbackText: string;
    uniqueFeedbackId?: string;
}

export type FeedbackType = IFeedback[];