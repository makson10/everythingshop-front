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

function isString(data: string | number) {
	if (typeof data === 'string') return true;
}

function isNumber(data: string | number) {
	if (typeof +data === 'number') return true;
}

function clearInputField(...inputRefs: any[]) {
	inputRefs.map((input) => (input.current.value = ''));
}

function validateSignUpData({
	name,
	age,
	email,
	login,
	password,
}: SignUpUserDataType) {
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
}

function validateLogInData({ login, password }: LogInUserDataType) {
	const validateError = [];

	const loginError = validateLogin(login);
	if (loginError) validateError.push(loginError);

	const passwordError = validatePassword(password);
	if (passwordError) validateError.push(passwordError);

	return validateError;
}

function validateName(name: string) {
	if (!isString(name) || name.length < 3) {
		return 'Your name is not valid!';
	} else return false;
}

function validateAge(age: number) {
	if (!isNumber(age) || age < 7 || age > 100) {
		return 'Your age is not valid!';
	} else return false;
}

function validateEmail(email: string) {
	if (!isString(email) || !email.includes('@')) {
		return 'Your email is not valid!';
	} else return false;
}

function validateLogin(login: string) {
	if (!isString(login) || login.length < 8) {
		return 'Your login is not valid!';
	} else return false;
}

function validatePassword(password: string) {
	if (!isString(password) || password.length < 8) {
		return 'Your password is not valid!';
	} else return false;
}

export {
	isString,
	isNumber,
	clearInputField,
	validateSignUpData,
	validateLogInData,
};
