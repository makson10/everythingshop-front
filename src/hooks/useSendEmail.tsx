import { Email } from '@/libs/smtp';
import {
	SuccessSignUpMarkup,
	SuccessBuyMarkup,
	FeedbackMarkup,
} from '@/assets/emailMarkups';
import { IBuyEmail, ISignUpEmail } from '../types/emailTypes';
import { IFeedback } from '../types/feedbackTypes';

export const useSendEmail = () => {
	const sendSignUpEmail = (userEmail: string, { userName }: ISignUpEmail) => {
		Email.send({
			Host: 'smtp.elasticemail.com',
			Username: 'everything.shop.online.info@gmail.com',
			Password: '79C9346A3FEECA2B44725231E86FB02C282F',
			To: userEmail,
			From: 'everything.shop.online.info@gmail.com',
			Subject: 'Success Sign Up',
			Body: SuccessSignUpMarkup(userName),
		});
	};

	const sendBuyEmail = (
		userEmail: string,
		{ buyCost, fullUserName }: IBuyEmail
	) => {
		Email.send({
			Host: 'smtp.elasticemail.com',
			Username: 'everything.shop.online.info@gmail.com',
			Password: '79C9346A3FEECA2B44725231E86FB02C282F',
			To: userEmail,
			From: 'everything.shop.online.info@gmail.com',
			Subject: 'Success purchase',
			Body: SuccessBuyMarkup(buyCost, fullUserName),
		});
	};

	const sendFeedbackEmail = (FeedbackData: IFeedback) => {
		Email.send({
			Host: 'smtp.elasticemail.com',
			Username: 'everything.shop.online.info@gmail.com',
			Password: '79C9346A3FEECA2B44725231E86FB02C282F',
			To: 'everything.shop.online.info@gmail.com',
			From: 'everything.shop.online.info@gmail.com',
			Subject: 'New Feedback',
			Body: FeedbackMarkup(FeedbackData),
		});
	};

	return { sendSignUpEmail, sendBuyEmail, sendFeedbackEmail };
};
