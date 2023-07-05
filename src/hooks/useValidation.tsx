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
import { string, number, boolean, date, object } from 'yup';

const SignUpValidateSchema = object().shape({
	name: string()
		.required('Name is required!')
		.min(3, 'Name is too short!')
		.max(22, 'Name is too long!'),
	dateOfBirth: date()
		.required('Date of birth is required')
		.min(
			new Date(+new Date() - 6 * (365 * 24 * 60 * 60 * 1000)),
			'You are too yound!'
		),
	email: string().required('Email is required!').email('Email is not valid!'),
	login: string().required('Login is required!').min(8, 'Login is too short!'),
	password: string()
		.required('Password is required!')
		.min(8, 'Password is too short!'),
});

const LogInValidateSchema = object().shape({
	login: string().required('Login is required!').min(8, 'Login is too short!'),
	password: string()
		.required('Password is required!')
		.min(8, 'Password is too short!'),
});

const AddNewProductValidateSchema = object().shape({
	title: string()
		.required('Title is required!')
		.min(3, 'Title is too short!')
		.matches(rusBadWordsRegex, 'Your title contain bad words!')
		.matches(engBadWordsRegex, 'Your title contain bad words!'),
	description: string()
		.required('Description is required!')
		.min(4, 'Description is too short!')
		.matches(rusBadWordsRegex, 'Your description contain bad words!')
		.matches(engBadWordsRegex, 'Your description contain bad words!'),
	price: number()
		.required('Price is required!')
		.max(9_999_999, 'Your product is too expensive'),
});

const BuySubmitValidateSchema = object().shape({
	useAccountFullName: boolean(),
	firstName: string().when('useAccountFullName', {
		is: false,
		then: (schema) =>
			schema
				.required('First name is required!')
				.min(3, 'First name is too short!'),
		otherwise: (schema) => schema.notRequired(),
	}),
	lastName: string().when('useAccountFullName', {
		is: false,
		then: (schema) =>
			schema
				.required('Last name is required!')
				.min(4, 'Last name is too short!'),
		otherwise: (schema) => schema.notRequired(),
	}),
	useAccountEmail: boolean(),
	email: string().when('useAccountEmail', {
		is: false,
		then: (schema) =>
			schema.required('Email is required!').email('Email is not valid!'),
		otherwise: (schema) => schema.notRequired(),
	}),
	deliveryAddress: string()
		.required('Delivery address is required!')
		.min(5, 'Delivery address is not valid!'),
});

const newFeedbackValidateSchema = object().shape({
	feedbackText: string()
		.required('Feedback text is required!')
		.min(3, 'Feedback text is too short!'),
});

const newCommentValidateSchema = object().shape({
	newCommentText: string()
		.required('Comment text is required!')
		.min(3, 'Comment text is too short!'),
});

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

		if (values.useAccountFullName) {
		} else if (!values.firstName) {
			errors.firstName = 'Required';
		} else if (values.firstName.length < 3) {
			errors.firstName = 'FirstName is too short!';
		}

		if (values.useAccountFullName) {
		} else if (!values.lastName) {
			errors.lastName = 'Required';
		} else if (values.lastName.length < 4) {
			errors.lastName = 'LastName is too short!';
		}

		if (values.useAccountEmail) {
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
// TODO: re-write validation on Yup
