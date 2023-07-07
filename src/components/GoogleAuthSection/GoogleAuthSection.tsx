import { useEffect, useState } from 'react';
import GoogleButton from '@/components/GoogleButton/GoogleButton';

interface Props {
	actionType: 'register' | 'login';
}

export default function GoogleAuthSection({ actionType }: Props) {
	const [buttonActionTitle, setButtonActionTitle] = useState<string>('');

	useEffect(() => {
		const actionTypeFirstLetter = actionType[0].toUpperCase();
		const actionTitle = actionTypeFirstLetter + actionType.slice(1);
		setButtonActionTitle(actionTitle);
	}, []);

	return (
		<div className="flex justify-center mt-8">
			<GoogleButton
				action={buttonActionTitle}
				redirectUrl={`/api/auth/login?action_type=${actionType}`}
			/>
		</div>
	);
}
