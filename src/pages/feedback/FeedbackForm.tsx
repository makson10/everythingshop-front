import { useEffect, useState } from 'react';
import useValidation from '@/hooks/useValidation';
import useSendEmail from '@/hooks/useSendEmail';
import { useUserData } from '@/hooks/useUserDataContext';
import { ShowSuccessModalWindow } from '@/components/ShowModalWindow/ShowModalWindow';
import UserNotLoginWindow from '@/components/UserNotLoginWindow/UserNotLoginWindow';
import { ShowLoadingScreen } from '@/components/LoadingScreen/LoadingScreen';
import { IValidateFeedbackData } from '@/types/validationTypes';
import { IFeedback } from '@/types/feedbackTypes';
import { Formik } from 'formik';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

export default function FeedbackForm() {
	const authorizedUserData = useUserData();
	const [didUserAuthorized, setDidUserAuthorized] = useState(false);
	const [isOpenSuccessMenu, setIsOpenSuccessMenu] = useState<boolean>(false);
	const { sendFeedbackEmail } = useSendEmail();
	const { validateFeedbackData } = useValidation();

	const sendDataToServer = async (data: IFeedback) => {
		try {
			await axios.post(
				`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/feedbacks/addNewFeedback`,
				data
			);
			setIsOpenSuccessMenu(true);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		setDidUserAuthorized(!!authorizedUserData.data?.email);
	}, [authorizedUserData]);

	if (authorizedUserData.isLoading) {
		return <ShowLoadingScreen />;
	}

	if (!didUserAuthorized) return <UserNotLoginWindow />;

	return (
		<>
			{isOpenSuccessMenu && (
				<ShowSuccessModalWindow successText="Thank you for your feedback. It is very important for us" />
			)}

			<div className="flex-[2_1_auto] flex justify-center items-center max-sm:p-8">
				<div className="flex flex-col gap-10">
					<p className="text-3xl text-center">Leave your feedback here</p>
					<Formik
						initialValues={{
							feedbackText: '',
						}}
						validate={(values: IValidateFeedbackData) => {
							return validateFeedbackData(values);
						}}
						onSubmit={(values, { setSubmitting, resetForm }) => {
							setTimeout(() => {
								const feedbackData: IFeedback = {
									name: authorizedUserData.data?.name!,
									date: +new Date(),
									feedbackText: values.feedbackText,
									uniqueFeedbackId: uuidv4(),
								};
								sendDataToServer(feedbackData);
								sendFeedbackEmail(feedbackData);

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
				</div>
			</div>
		</>
	);
}
