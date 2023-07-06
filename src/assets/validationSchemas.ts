import { string, number, boolean, date, object } from 'yup';
import { rusBadWordsRegex, engBadWordsRegex } from '@/assets/badWordsRegex';

const SignUpValidateSchema = object().shape({
	name: string()
		.required('Name is required!')
		.min(3, 'Name is too short!')
		.max(22, 'Name is too long!'),
	dateOfBirth: date()
		.required('Date of birth is required')
		.max(
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

const NewFeedbackValidateSchema = object().shape({
	feedbackText: string()
		.required('Feedback text is required!')
		.min(3, 'Feedback text is too short!'),
});

const NewCommentValidateSchema = object().shape({
	newCommentText: string()
		.required('Comment text is required!')
		.min(2, 'Comment text is too short!'),
});

const Schema = {
	SignUpValidateSchema,
	LogInValidateSchema,
	AddNewProductValidateSchema,
	BuySubmitValidateSchema,
	NewFeedbackValidateSchema,
	NewCommentValidateSchema,
};

export default Schema;
