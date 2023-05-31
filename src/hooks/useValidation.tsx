import { rusBadWordsRegex, engBadWordsRegex } from '@/assets/badWordsRegex';
import {
	ISignUpUserData,
	ILogInUserData,
	IValidateProductData,
	IValidateFeedbackData,
	IValidateCommentsData,
} from '@/types/validationTypes';
import { IProduct } from '@/types/productTypes';
import { ISubmitForm } from '@/types/formDataTypes';
import { FormikErrors } from 'formik/dist/types';

const useValidation = () => {
	const validateSignUpData = (values: ISignUpUserData) => {
		const errors: FormikErrors<ISignUpUserData> = {};

		if (!values.name) {
			errors.name = 'Required';
		} else if (values.name.length < 3) {
			errors.name = 'Name is too short!';
		}

		if (!values.dateOfBirth) {
			errors.dateOfBirth = 'Required';
		} else {
			const timeDifference = Date.now() - +new Date(values.dateOfBirth);
			const minimalAge = 6 * (365 * 24 * 60 * 60 * 1000);

			if (timeDifference < minimalAge) {
				errors.dateOfBirth = 'Your date of birth is not valid!';
			}
		}

		if (!values.email) {
			errors.email = 'Required';
		} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
			errors.email = 'Email is not valid!';
		}

		if (!values.login) {
			errors.login = 'Required';
		} else if (values.login.length < 8) {
			errors.login = 'Login is too short!';
		}

		if (!values.password) {
			errors.password = 'Required';
		} else if (values.password.length < 8) {
			errors.password = 'Password is too short!';
		}

		return errors;
	};

	const validateLogInData = (values: ILogInUserData) => {
		const errors: FormikErrors<ILogInUserData> = {};

		if (!values.login) {
			errors.login = 'Required';
		} else if (values.login.length < 8) {
			errors.login = 'Login is too short!';
		}

		if (!values.password) {
			errors.password = 'Required';
		} else if (values.password.length < 8) {
			errors.password = 'Password is too short!';
		}

		return errors;
	};

	const validateAddNewProduct = (values: IValidateProductData) => {
		const errors: FormikErrors<IProduct> = {};

		if (!values.title) {
			errors.title = 'Required';
		} else if (values.title.length < 3) {
			errors.title = 'Title is too short!';
		} else if (rusBadWordsRegex.test(values.title)) {
			errors.title = 'Your title contain bad works';
		} else if (engBadWordsRegex.test(values.title)) {
			errors.title = 'Your title contain bad works';
		}

		if (!values.description) {
			errors.description = 'Required';
		} else if (values.description.length < 4) {
			errors.description = 'Description is too short!';
		} else if (rusBadWordsRegex.test(values.description)) {
			errors.description = 'Your description contain bad works';
		} else if (engBadWordsRegex.test(values.description)) {
			errors.description = 'Your description contain bad works';
		}

		if (!values.price) {
			errors.price = 'Required';
		} else if (values.price > 9_999_999) {
			errors.price = 'Your product is too expensive';
		}

		return errors;
	};

	const validateBuySubmitData = (values: ISubmitForm) => {
		const errors: FormikErrors<ISubmitForm> = {};

		if (values.useOldFullName) {
		} else if (!values.firstName) {
			errors.firstName = 'Required';
		} else if (values.firstName.length < 3) {
			errors.firstName = 'FirstName is too short!';
		}

		if (values.useOldFullName) {
		} else if (!values.lastName) {
			errors.lastName = 'Required';
		} else if (values.lastName.length < 4) {
			errors.lastName = 'LastName is too short!';
		}

		if (values.useOldEmail) {
		} else if (!values.email) {
			errors.email = 'Required';
		} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
			errors.email = 'Email is not valid!';
		}

		if (!values.deliveryAddress) {
			errors.deliveryAddress = 'Required';
		} else if (values.deliveryAddress.length < 5) {
			errors.deliveryAddress = 'Your deliveryAddress is not valid!';
		}

		return errors;
	};

	const validateFeedbackData = (values: IValidateFeedbackData) => {
		const errors: FormikErrors<{ feedbackText: string }> = {};

		if (!values.feedbackText) {
			errors.feedbackText = 'Required!';
		} else if (values.feedbackText.length < 3) {
			errors.feedbackText = 'Feedback is too short!';
		}

		return errors;
	};

	const validateCommentsData = (values: IValidateCommentsData) => {
		const errors: FormikErrors<IValidateCommentsData> = {};

		if (!values.newCommentText) {
			errors.newCommentText = 'Required!';
		} else if (values.newCommentText.length < 3) {
			errors.newCommentText = 'Comment is too short!';
		}

		return errors;
	};

	return {
		validateSignUpData,
		validateLogInData,
		validateAddNewProduct,
		validateBuySubmitData,
		validateFeedbackData,
		validateCommentsData,
	};
};

export default useValidation;
