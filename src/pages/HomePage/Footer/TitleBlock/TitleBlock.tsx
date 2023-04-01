import React from 'react';
import Link from 'next/link';
import styles from './TitleBlock.module.scss';

export default function TitleBlock() {
	return (
		<div id={styles['footer-title-block-wrapper']}>
			<p id={styles['footer-title']}>Market EVERYTHING</p>
			<div id={styles['footer-body']}>
				<p>Here you can find all you need</p>
				<p>Buy -&gt; sell -&gt; buy -&gt; sell</p>
				<p id={styles['footer-phrase']}>
					<small>All what you </small> <b>see</b><small> you can </small><b>buy</b>,
                    <br />
					<small>All what you </small><b>have</b><small> you can </small> <b>sell</b>
				</p>
			</div>
			<div id={styles['footer-link-wrapper']}>
				<p className={styles['footer-link-text']}>
					Not already use this market?{' '}
					<Link className={styles['footer-link']} href="/signUp">
						Sign Up
					</Link>
				</p>
				<p className={styles['footer-link-text']}>
					Or{' '}
					<Link className={styles['footer-link']} href="/signIn">
						Sign In
					</Link>
				</p>
			</div>
		</div>
	);
}
