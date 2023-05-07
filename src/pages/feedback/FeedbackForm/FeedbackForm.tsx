import { useEffect, useState } from 'react';
import { Formik, FormikErrors } from 'formik';
import { IFeedback } from '@/pages/types/feedbackTypes';
import { useUserData } from '@/pages/context/UserDataContext';
import UserNotLoginWindow from '@/pages/addProduct/UserNotLoginWindow/UserNotLoginWindow';
import { v4 as uuidv4 } from 'uuid';
import styles from './FeedbackForm.module.scss';
import axios from 'axios';

export default function FeedbackForm() {
	const authorizedUserData = useUserData();
	const [didUserAuthorized, setDidUserAuthorized] = useState(false);

	const sendDataToServer = async (data: IFeedback) => {
		await axios.get('http://127.0.0.1:8000/feedback');
		await axios
			.post('http://127.0.0.1:8000/feedback/addNewFeedback', data)
			.then((res) => console.log(res));
	};

	useEffect(() => {
		setDidUserAuthorized(!!authorizedUserData.data?.name);
	}, [authorizedUserData]);

	if (!didUserAuthorized) return <UserNotLoginWindow />;

	return (
		<div
			className="flex flex-col justify-center items-center"
			style={{ flex: '2 1 auto' }}>
			<div className="flex flex-col gap-8 border-2 border-black border-solid rounded-xl p-7">
				<p className="text-xl text-center">Leave your feedback here</p>
				<Formik
					initialValues={{
						feedbackText: '',
					}}
					validate={(values: { feedbackText: string }) => {
						const errors: FormikErrors<{ feedbackText: string }> = {};

						if (!values.feedbackText) {
							errors.feedbackText = 'Required!';
						} else if (values.feedbackText.length < 3) {
							errors.feedbackText = 'Feedback is too short!';
						}

						return errors;
					}}
					onSubmit={(values, { setSubmitting }) => {
						setTimeout(() => {
							const feedbackData: IFeedback = {
								userName: authorizedUserData.data?.name!,
								date: +new Date(),
								feedbackText: values.feedbackText,
								uniqueFeedbackId: uuidv4(),
							};
							sendDataToServer(feedbackData);
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
							<div className="flex flex-col gap-2">
								<textarea
									placeholder="Enter your feedback"
									id="form-input"
									name="feedbackText"
									onChange={handleChange}
									onBlur={handleBlur}
									value={values.feedbackText}
								/>
								{errors.feedbackText &&
									touched.feedbackText &&
									errors.feedbackText}
								<button id="button" type="submit" disabled={isSubmitting}>
									Send
								</button>
							</div>
						</form>
					)}
				</Formik>
			</div>
		</div>
	);
}
