import { useState } from 'react';
import useSendEmail from '@/hooks/useSendEmail';
import { ShowSuccessNotification } from '@/components/ShowModalWindow/ShowModalWindow';
import UserNotLoginWindow from '@/components/UserNotLoginWindow/UserNotLoginWindow';
import { ShowLoadingScreen } from '@/components/LoadingScreen/LoadingScreen';
import { IFeedback } from '@/types/feedbackTypes';
import Schema from '@/assets/validationSchemas';
import { Formik } from 'formik';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { useAppSelector } from '@/store/hooks';

export default function FeedbackPageContent() {
	const userState = useAppSelector((state) => state.user);

	if (userState.isLoading) return <ShowLoadingScreen />;
	if (!userState.data?.email) return <UserNotLoginWindow />;

	return (
		<div className="flex-[2_1_auto] flex justify-center items-center max-sm:p-8">
			<div className="flex flex-col gap-10">
				<p className="text-3xl text-center">Leave your feedback here</p>
				<FeedbackForm />
			</div>
		</div>
	);
}

function FeedbackForm() {
	const user = useAppSelector((state) => state.user.data);
	const [isOpenSuccessNotification, setIsOpenSuccessNotification] =
		useState<boolean>(false);
	const { sendFeedbackEmail } = useSendEmail();

	const sendDataToServer = async (data: IFeedback) => {
		await axios.post(
			`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/feedbacks/addNewFeedback`,
			data
		);
	};

	const shapeFeedbackData = (feedbackText: string) => {
		const feedbackData: IFeedback = {
			author: user?.name!,
			date: +new Date(),
			feedbackText: feedbackText,
			uniqueFeedbackId: uuidv4(),
		};

		return feedbackData;
	};

	const handleSubmit = (feedbackText: string) => {
		try {
			const feedbackData = shapeFeedbackData(feedbackText);
			sendDataToServer(feedbackData);
			sendFeedbackEmail(feedbackData);
			setIsOpenSuccessNotification(true);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			{isOpenSuccessNotification && (
				<ShowSuccessNotification successText="Thank you for your feedback. It is very important for us" />
			)}

			<Formik
				initialValues={{
					feedbackText: '',
				}}
				validationSchema={Schema.NewFeedbackValidateSchema}
				onSubmit={(values, { setSubmitting, resetForm }) => {
					setTimeout(() => {
						handleSubmit(values.feedbackText);

						resetForm();
						setSubmitting(false);
					}, 400);
				}}>
				{({
					values,
					errors,
					touched,
					handleChange,
					handleBlur,
					handleSubmit,
					isSubmitting,
				}) => (
					<form className="flex flex-col gap-6" onSubmit={handleSubmit}>
						<div>
							<textarea
								placeholder="Enter your feedback"
								className="block w-full h-56 rounded-md border-0 py-1.5 text-base text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-base sm:leading-6"
								name="feedbackText"
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.feedbackText}
							/>
							{errors.feedbackText &&
								touched.feedbackText &&
								errors.feedbackText}
						</div>
						<button
							className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-lg font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
							type="submit"
							disabled={isSubmitting}>
							Send
						</button>
					</form>
				)}
			</Formik>
		</>
	);
}
