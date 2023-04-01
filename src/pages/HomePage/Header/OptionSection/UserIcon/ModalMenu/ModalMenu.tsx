import styles from './ModalMenu.module.scss';

interface Props {
    isOpen: boolean
}

export default function ModalMenu({ isOpen }: Props) {
	return (
		<>
			<div id={styles['modal-menu-wrapper']} data-state={`${isOpen ? 'open' : 'close'}`}>
				<div id={styles['modal-menu-triangle-wrapper']}>
					<div id={styles['modal-menu-triangle']}></div>
				</div>
				<div id={styles['modal-menu']}>
					<button className={styles['modal-menu-button']}>Profile</button>
					<div className={styles['split-line']}></div>
					<button className={styles['modal-menu-button']}>Settings</button>
					<div className={styles['split-line']}></div>
					<button className={styles['modal-menu-button']}>Log Out</button>
				</div>
			</div>
		</>
	);
}
