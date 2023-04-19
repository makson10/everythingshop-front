import { LegacyRef } from 'react';
import styles from './Button.module.scss';

interface Props {
	text: string;
	callbackFunc?: () => void;
	buttonRef?: React.MutableRefObject<HTMLButtonElement | undefined>;
}

export default function Button({ text, callbackFunc, buttonRef }: Props) {
	return (
		<button
			id={styles['button']}
			ref={buttonRef as LegacyRef<HTMLButtonElement>}
			onClick={() => {
				if (callbackFunc) callbackFunc();
			}}>
			{text}
		</button>
	);
}
