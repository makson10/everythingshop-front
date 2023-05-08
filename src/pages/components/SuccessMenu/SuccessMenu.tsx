import React, { LegacyRef, useEffect, useRef, useState } from 'react';
import styles from './SuccessMenu.module.scss';

interface Props {
	typeOfSuccess: string;
}

export default function SuccessMenu({ typeOfSuccess }: Props) {
	const menuRef = useRef<HTMLDivElement>();
	const [show, setShow] = useState(false);

	useEffect(() => {
		setShow(true);

		setTimeout(() => {
			setShow(false);
		}, 2000);
	}, []);

	return (
		<>
			<div
				className={show ? 'show' : 'close'}
				id={styles['success-menu']}
				ref={menuRef as LegacyRef<HTMLDivElement>}>
				<p id={styles['success-menu-message']}>
					You have {typeOfSuccess} successful
				</p>
			</div>
			<style jsx>
				{`
					.show {
						transition: transform ease 0.3s;
						transform: translateX(-430px);
					}

					.close {
						transition: transform ease 0.3s;
						transform: translateX(0);
					}
				`}
			</style>
		</>
	);
}
