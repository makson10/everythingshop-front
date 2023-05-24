import { Email } from '@/libs/smtp';
import {
	SuccessSignUpMarkup,
	SuccessBuyMarkup,
	FeedbackMarkup,
} from '@/assets/emailMarkups';
import { IBuyEmail, ISignUpEmail } from '../types/emailTypes';
import { IFeedback } from '../types/feedbackTypes';

const useSendEmail = () => {
	const sendSignUpEmail = (userEmail: string, { userName }: ISignUpEmail) => {
		Email.send({
			Host: process.env.NEXT_PUBLIC_SMTP_HOST,
			Username: process.env.NEXT_PUBLIC_USERNAME,
			Password: process.env.NEXT_PUBLIC_PASSWORD,
			To: userEmail,
			From: process.env.NEXT_PUBLIC_USERNAME,
			Subject: 'Success Sign Up',
			Body: SuccessSignUpMarkup(userName),
		});
	};

	const sendBuyEmail = (
		userEmail: string,
		{ buyCost, fullUserName }: IBuyEmail
	) => {
		Email.send({
			Host: process.env.NEXT_PUBLIC_SMTP_HOST,
			Username: process.env.NEXT_PUBLIC_USERNAME,
			Password: process.env.NEXT_PUBLIC_PASSWORD,
			To: userEmail,
			From: process.env.NEXT_PUBLIC_USERNAME,
			Subject: 'Success purchase',
			Body: SuccessBuyMarkup(buyCost, fullUserName),
		});
	};

	const sendFeedbackEmail = (FeedbackData: IFeedback) => {
		Email.send({
			Host: process.env.NEXT_PUBLIC_SMTP_HOST,
			Username: process.env.NEXT_PUBLIC_USERNAME,
			Password: process.env.NEXT_PUBLIC_PASSWORD,
			To: process.env.NEXT_PUBLIC_USERNAME,
			From: process.env.NEXT_PUBLIC_USERNAME,
			Subject: 'New Feedback',
			Body: FeedbackMarkup(FeedbackData),
		});
	};

	return { sendSignUpEmail, sendBuyEmail, sendFeedbackEmail };
};

export default useSendEmail;
