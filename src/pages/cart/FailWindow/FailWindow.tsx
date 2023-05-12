import styles from './FailWindow.module.css';

interface Props {
	failMessage: string;
}

export function FailWindow({ failMessage }: Props) {
	return (
		<div id={styles['fail-window-wrapper']}>
			<div id={styles['fail-window']}>
				<p id={styles['fail-window-text']}>{failMessage}</p>
			</div>
		</div>
	);
}
