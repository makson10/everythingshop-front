import { IFeedback } from '@/types/feedbackTypes';

const SuccessSignUpMarkup = (name: string) => `
<html style="min-width: 100vw; min-height: 100vh;">
<div>
    <p style="font-size: 2.5rem; font-weight: bold">Success operation</p>
    <p style="font-size: 1.5rem">Hello ${name}, you have successfully signed up</p>
    <p style="font-size: 1.5rem">Now you can go shopping</p>
</div>
<a href="${process.env.NEXT_PUBLIC_FRONTEND_BASE_URL}/assortment">
    <button style="width: 30%; background-color: darkblue; color: white; padding-top: 0.5rem; padding-bottom: 0.5rem; border-radius: 10px; border: 2px solid black; font-weight: 700; font-size: 1.5rem">Go to assortment</button>
</a>
</html>
`;

const SuccessBuyMarkup = (purchaseTotalPrice: number, fullUserName: string) => `
<html style="min-width: 100vw; min-height: 100vh;">
<div>
    <p style="font-size: 2.5rem; font-weight: bold">Success purchase</p>
    <p style="font-size: 1.5rem">Hello ${fullUserName}, you have successfully bought products for $${purchaseTotalPrice}</p>
</div>
<a href="${process.env.NEXT_PUBLIC_FRONTEND_BASE_URL}/assortment">
    <button style="width: 30%; background-color: darkblue; color: white; padding-top: 0.5rem; padding-bottom: 0.5rem; border-radius: 10px; border: 2px solid black; font-weight: 700; font-size: 1.5rem">Continue shopping</button>
</a>
</html>
`;

const FeedbackMarkup = ({ author, date, feedbackText }: IFeedback) => `
<html style="min-width: 100vw; min-height: 100vh;">
<p style="font-size: 1.6rem; font-weight: bold">You recieved new feedback!</p>
<p style="font-size: 1.2rem;"><b>Date:</b> ${new Date(
	date
).toLocaleString()}</p>
<p style="font-size: 1.2rem;"><b>Author:</b> ${author}</p>
<p style="font-size: 1.2rem;"><b>Feedback text:</b> ${feedbackText}</p>
<a href="${process.env.NEXT_PUBLIC_FRONTEND_BASE_URL}/moderate">
    <button style="width: 30%; background-color: darkblue; color: white; padding-top: 0.5rem; padding-bottom: 0.5rem; border-radius: 10px; border: 2px solid black; font-weight: 700; font-size: 1.5rem">Go to moderate</button>
</a>
</html>
`;

const Markup = {
	SuccessSignUpMarkup,
	SuccessBuyMarkup,
	FeedbackMarkup,
};

export default Markup;
