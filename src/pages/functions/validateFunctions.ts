import { rusBadWordsRegex, engBadWordsRegex } from './badWordsRegex';

interface SignUpUserDataType {
	name: string;
	age: string | number;
	email: string;
	login: string;
	password: string;
}

interface LogInUserDataType {
	login: string;
	password: string;
}

interface ProductDataType {
	photoFile: File;
	title: string;
	description: string;
	creator: string;
	price: number;
}

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
	age,
	email,
	login,
	password,
}: SignUpUserDataType) => {
	const validateError = [];

	const nameError = validateName(name);
	if (nameError) validateError.push(nameError);

	const ageError = validateAge(+age);
	if (ageError) validateError.push(ageError);

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

const validateName = (name: string) => {
	if (!isString(name) || name.length < 3) {
		return 'Your name is not valid!';
	} else return false;
};

const validateAge = (age: number) => {
	if (!isNumber(age) || age < 7 || age > 100) {
		return 'Your age is not valid!';
	} else return false;
};

const validateEmail = (email: string) => {
	if (!isString(email) || !email.includes('@')) {
		return 'Your email is not valid!';
	} else return false;
};

const validateLogin = (login: string) => {
	if (!isString(login) || login.length < 8) {
		return 'Your login is not valid!';
	} else return false;
};

const validatePassword = (password: string) => {
	if (!isString(password) || password.length < 8) {
		return 'Your password is not valid!';
	} else return false;
};

const validateProductData = ({
	title,
	description,
	price,
}: ProductDataType) => {
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

	// if (engBadWordsRegex.test(title)) {
	// 	console.log('Title have bad word(s)');
	//     return 'Your title contain bad works';
	// }

	return false;
}; // enable eng bad words checking later

const validateDescription = (description: string) => {
	if (rusBadWordsRegex.test(description)) {
        console.log('have bad words in description');
		return 'Your description contain bad works';
	}

	// if (engBadWordsRegex.test(title)) {
	// 	console.log('Title have bad word(s)');
	//     return 'Your title contain bad works';
	// }

	return false;
}; // enable eng bad words checking later

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
};
