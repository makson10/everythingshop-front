import { LegacyRef, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useUserData } from '@/hooks/useUserDataContext';
import { IComment, CommentType } from '@/types/commentTypes';
import Schema from '@/assets/validationSchemas';
import { Formik } from 'formik';
import { v4 as uuidv4 } from 'uuid';

interface Props {
	productComments: CommentType;
	sendCommentToServer: (newCommentText: string) => void;
}

interface CommentFormProps {
	sendCommentToServer: (newCommentText: string) => void;
}

export default function Comments({
	productComments,
	sendCommentToServer,
}: Props) {
	return (
		<>
			{/* Comments */}
			<div className="col-span-2 row-span-2">
				<div className="p-4 flex flex-col gap-4">
					{productComments.length ? (
						productComments.map((comment, index) => {
							return (
								<div className="bg-white rounded-lg shadow-lg" key={index}>
									<div className="p-4 col-span-2 row-span-2">
										<div className="flex items-center mb-2">
											<div className="w-10 h-10 mr-4">
												<Image
													className="rounded"
													src={comment.picture}
													alt="#"
													width={48}
													height={48}
												/>
											</div>
											<div>
												<h2 className="text-lg font-medium text-gray-900">
													{comment.author}
												</h2>
												<p className="text-sm text-gray-500">
													{new Date(comment.date).toLocaleString()}
												</p>
											</div>
										</div>
										<p className="text-gray-700 leading-6 break-words">
											{comment.text}
										</p>
									</div>
								</div>
							);
						})
					) : (
						<div className="flex justify-center">
							No comments for this product
						</div>
					)}
				</div>
				<div className="p-4">
					<CommentForm sendCommentToServer={sendCommentToServer} />
				</div>
			</div>
		</>
	);
}

function CommentForm({ sendCommentToServer }: CommentFormProps) {
	const authorizeUserData = useUserData();
	const inputNewCommentRef = useRef<HTMLTextAreaElement>();
	const sendNewCommentButtonRef = useRef<HTMLButtonElement>();

	const removeFocusFromNewCommentInput = () => {
		inputNewCommentRef.current?.blur();
	};

	useEffect(() => {
		const textarea = inputNewCommentRef.current!;
		if (!textarea) return;

		textarea.addEventListener('keyup', () => {
			if (textarea?.scrollTop! > 0) {
				textarea.style.height = textarea.scrollHeight + 'px';
			} else {
				textarea.style.height = '100%';
			}
		});
	}, [inputNewCommentRef]);

	useEffect(() => {
		const didUserAuthorized = !authorizeUserData.data?.name;

		if (sendNewCommentButtonRef.current)
			sendNewCommentButtonRef.current.disabled = didUserAuthorized;
		if (inputNewCommentRef.current)
			inputNewCommentRef.current.disabled = didUserAuthorized;
	}, [authorizeUserData]);

	return (
		<Formik
			initialValues={{
				newCommentText: '',
			}}
			validationSchema={Schema.NewCommentValidateSchema}
			onSubmit={(values, { setSubmitting, resetForm }) => {
				setTimeout(() => {
					sendCommentToServer(values.newCommentText);

					resetForm();
					removeFocusFromNewCommentInput();
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
				<form className="flex flex-col gap-2" onSubmit={handleSubmit}>
					<div className="flex flex-row px-2 py-1">
						<textarea
							className="resize-none overflow-hidden py-2 px-4 border border-gray-300 rounded-l-md flex-1 dark:text-black"
							name="newCommentText"
							placeholder={
								authorizeUserData.data?.name
									? 'Enter comment'
									: 'Not available to unauthorized users'
							}
							ref={inputNewCommentRef as LegacyRef<HTMLTextAreaElement>}
							onChange={handleChange}
							onBlur={handleBlur}
							value={values.newCommentText}
						/>
						<button
							className="disabled:opacity-30 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r-md dark:bg-[orange]"
							type="submit"
							disabled={isSubmitting}
							ref={sendNewCommentButtonRef as LegacyRef<HTMLButtonElement>}>
							<Image
								className="w-[32px] h-[32px]"
								src="https://img.icons8.com/windows/32/ffffff/sent.png"
								alt="#"
								width={100}
								height={100}
							/>
						</button>
					</div>
					{errors.newCommentText &&
						touched.newCommentText &&
						errors.newCommentText}
				</form>
			)}
		</Formik>
	);
}
