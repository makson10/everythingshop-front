import { LegacyRef, useEffect, useRef, useState } from 'react';
import styles from './ErrorMenu.module.css';

interface Props {
	errorList: string[];
}

export default function ErrorMenu({ errorList }: Props) {
	const menuRef = useRef<HTMLDivElement>();
	const [show, setShow] = useState(false);

	useEffect(() => {
		setShow(true);
		setTimeout(() => setShow(false), 2000);
	}, []);

	return (
		<>
			<div
				className={show ? 'show' : 'close'}
				id={styles['error-menu']}
				ref={menuRef as LegacyRef<HTMLDivElement>}>
				{errorList.map((error, index) => {
					return (
						<p
							key={index}
							className={styles['error-menu-message']}>{`${error}\n`}</p>
					);
				})}
			</div>
		</>
	);
}
