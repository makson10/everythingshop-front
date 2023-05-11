export interface ISignUpUserData {
	name: string;
	dateOfBirth: string;
	email: string;
	login: string;
	password: string;
}

export interface ILogInUserData {
	login: string;
	password: string;
}

export interface IValidateProductData {
	title: string;
	description: string;
	creator: string;
	price: number;
	uniqueProductId: string;
}

export interface IValidateFeedbackData {
	feedbackText: string;
}

export interface IValidateCommentsData {
	newCommentText: string;
}
