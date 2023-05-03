import { SubmitFormData } from '../types/productTypes';
import { rusBadWordsRegex, engBadWordsRegex } from './badWordsRegex';
import {
	SignUpUserDataType,
	LogInUserDataType,
	IValidationProductData,
} from '@/pages/types/validationTypes';

const isString = (data: string | number) => {
	if (typeof data === 'string') return true;
};

const isNumber = (data: string | number) => {
	if (typeof +data === 'number') return true;
};

const clearInputField = (...inputRefs: any[]) => {
	inputRefs.map((input) => (input.current.value = ''));
};

const validateSignUpData = ({
	name,
	dateOfBirth,
	email,
	login,
	password,
}: SignUpUserDataType) => {
	const validateError = [];

	const nameError = validateName(name);
	if (nameError) validateError.push(nameError);

	const dateOfBirthError = validateDateOfBirth(dateOfBirth);
	if (dateOfBirthError) validateError.push(dateOfBirthError);

	const emailError = validateEmail(email);
	if (emailError) validateError.push(emailError);

	const loginError = validateLogin(login);
	if (loginError) validateError.push(loginError);

	const passwordError = validatePassword(password);
	if (passwordError) validateError.push(passwordError);

	return validateError;
};

const validateLogInData = ({ login, password }: LogInUserDataType) => {
	const validateError = [];

	const loginError = validateLogin(login);
	if (loginError) validateError.push(loginError);

	const passwordError = validatePassword(password);
	if (passwordError) validateError.push(passwordError);

	return validateError;
};

const validateBuySubmitData = ({
	fullName,
	email,
	deliveryAddress,
}: SubmitFormData) => {
	const validateError = [];

	const fullNameError = validateName(fullName);
	if (fullNameError) validateError.push(fullNameError);

	const emailError = validateEmail(email);
	if (emailError) validateError.push(emailError);

	const deliveryAddressError = validateDeliveryAddress(deliveryAddress);
	if (deliveryAddressError) validateError.push(deliveryAddressError);

	return validateError;
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

const validateProductData = ({
	title,
	description,
	price,
}: IValidationProductData) => {
	const errors: string[] = [];

	const titleError = validateTitle(title);
	if (titleError) errors.push(titleError);

	const descriptionError = validateDescription(description);
	if (descriptionError) errors.push(descriptionError);

	const priceError = validatePrice(price);
	if (priceError) errors.push(priceError);

	return errors;
};

const validateTitle = (title: string) => {
	if (rusBadWordsRegex.test(title)) {
		return 'Your title contain bad works';
	}

	if (engBadWordsRegex.test(title)) {
		return 'Your title contain bad works';
	}

	return false;
};

const validateDescription = (description: string) => {
	if (rusBadWordsRegex.test(description)) {
		console.log('have bad words in description');
		return 'Your description contain bad works';
	}

	if (engBadWordsRegex.test(description)) {
		return 'Your title contain bad works';
	}

	return false;
};

const validatePrice = (price: number) => {
	if (price > 9_999_999) {
		return 'Your product is too expensive';
	}

	return false;
};

export {
	isString,
	isNumber,
	clearInputField,
	validateSignUpData,
	validateLogInData,
	validateProductData,
	validateBuySubmitData,
};
