import { IProduct, ISubmitForm } from '../types/productTypes';
import { rusBadWordsRegex, engBadWordsRegex } from './badWordsRegex';
import {
	SignUpUserDataType,
	LogInUserDataType,
	ValidationProductData,
} from '@/pages/types/validationTypes';
import { FormikErrors } from 'formik/dist/types';

const isString = (data: string | number) => {
	if (typeof data === 'string') return true;
};

const isNumber = (data: string | number) => {
	if (typeof +data === 'number') return true;
};

const clearInputField = (...inputRefs: any[]) => {
	inputRefs.map((input) => (input.current.value = ''));
};

const validateSignUpData = (values: SignUpUserDataType) => {
	const errors: FormikErrors<SignUpUserDataType> = {};

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

const validateLogInData = (values: LogInUserDataType) => {
	const errors: FormikErrors<LogInUserDataType> = {};

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

const validateAddNewProduct = (values: ValidationProductData) => {
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

const validateFeedbaclData = (values: { feedbackText: string }) => {
	const errors: FormikErrors<{ feedbackText: string }> = {};

	if (!values.feedbackText) {
		errors.feedbackText = 'Required!';
	} else if (values.feedbackText.length < 3) {
		errors.feedbackText = 'Feedback is too short!';
	}

	return errors;
};

const validateName = (name: string) => {
	if (!isString(name) || name.length < 3) {
		return 'Your name is not valid!';
	}

	return false;
};

const validateDateOfBirth = (dateOfBirth: string) => {
	if (!isString(dateOfBirth) || dateOfBirth.length === 0) {
		return 'Your date of birth is not valid!';
	}

	const timeDifference = Date.now() - +new Date(dateOfBirth);
	const minimalAge = 6 * (365 * 24 * 60 * 60 * 1000);

	if (timeDifference < minimalAge) {
		return 'Your date of birth is not valid!';
	}

	return false;
};

const validateEmail = (email: string) => {
	if (!isString(email) || !email.includes('@')) {
		return 'Your email is not valid!';
	}

	return false;
};

const validateLogin = (login: string) => {
	if (!isString(login) || login.length < 8) {
		return 'Your login is not valid!';
	}

	return false;
};

const validatePassword = (password: string) => {
	if (!isString(password) || password.length < 8) {
		return 'Your password is not valid!';
	}

	return false;
};

const validateDeliveryAddress = (deliveryAddress: string) => {
	if (!isString(deliveryAddress) || deliveryAddress.length < 4) {
		return 'Your deliveryAddress is not valid!';
	}

	return false;
};

export {
	isString,
	isNumber,
	clearInputField,
	validateSignUpData,
	validateLogInData,
	validateAddNewProduct,
	validateBuySubmitData,
	validateFeedbaclData,
};
