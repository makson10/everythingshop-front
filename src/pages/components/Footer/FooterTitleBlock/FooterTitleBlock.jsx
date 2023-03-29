import React from 'react';
import { Link } from 'react-router-dom';
import './FooterTitleBlock.scss';

export default function FooterTitleBlock() {
	return (
		<div id="footer-title-block-wrapper">
			<p id="footer-title">Market EVERYTHING</p>
			<div id="footer-body">
				<p>Here you can find all you need</p>
				<p>Buy -&gt; sell -&gt; buy -&gt; sell</p>
				<p>
					All what you <b>see</b> you can <b>buy</b>, <br />
					All what you <b>have</b> you can <b>sell</b>
				</p>
			</div>
			<div id="footer-link-wrapper">
				<p className="footer-link-text">
					Not already use this market? {' '}
					<Link className="footer-link" to="/signUp">
						Sign Up
					</Link>
				</p>
				<p className="footer-link-text">
					Or {' '}
					<Link className="footer-link" to="/signIn">
						Sign In
					</Link>
				</p>
			</div>
		</div>
	);
}
