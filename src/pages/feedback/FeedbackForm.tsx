import { useEffect, useState } from 'react';
import { Formik } from 'formik';
import { IFeedback } from '@/pages/types/feedbackTypes';
import { useUserData } from '@/pages/context/UserDataContext';
import { v4 as uuidv4 } from 'uuid';
import { validateFeedbackData } from '@/pages/functions/validateFunctions';
import { ShowSuccessModalWindow } from '../components/ShowModalWindow/ShowModalWindow';
import { IValidateFeedbackData } from '../types/validationTypes';
import UserNotLoginWindow from '@/pages/components/UserNotLoginWindow/UserNotLoginWindow';
import axios from 'axios';
import { useSendEmail } from '@/pages/hooks/useSendEmail';

export default function FeedbackForm() {
	const authorizedUserData = useUserData();
	const [didUserAuthorized, setDidUserAuthorized] = useState(false);
	const [isOpenSuccessMenu, setIsOpenSuccessMenu] = useState<boolean>(false);
	const { sendFeedbackEmail } = useSendEmail();

	const sendDataToServer = async (data: IFeedback) => {
		try {
			await axios.get('http://127.0.0.1:8000/feedback');
			await axios.post('http://127.0.0.1:8000/feedback/addNewFeedback', data);

			setIsOpenSuccessMenu(true);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		setDidUserAuthorized(!!authorizedUserData.data?.name);
	}, [authorizedUserData]);

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
									userName: authorizedUserData.data?.name!,
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
