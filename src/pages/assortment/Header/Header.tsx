import React from "react";
import { useRouter } from 'next/router';
import styles from './Header.module.scss';

export function Header() {
    const router = useRouter();

    function handleBackButtonClick() {
        router.push('/');
    }

    return (
        <div id={styles['header-wrapper']}>
            <div id={styles['header-content-wrapper']}>
                <button id={styles['back-button']} onClick={handleBackButtonClick}>
                    <img id={styles['back-button-icon']} src={"https://img.icons8.com/ios/100/null/circled-left-2.png"} />
                </button>
                <p id={styles['page-title']}>Assortment</p>
            </div>
            <div id={styles['header-split-line']}></div>
        </div>
    );
}
