import React, { RefObject } from 'react';
import { LegacyRef } from 'react';
import styles from './Input.module.scss';

interface Props {
	inputRef: RefObject<HTMLInputElement> | LegacyRef<HTMLInputElement>;
	placeholder: string;
	type?: string;
	onChangeFunction?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	style?: object;
	maxLength?: number;
	minLength?: number;
	min?: number;
	max?: number;
}

export default function Input({
	inputRef,
	placeholder,
	type = 'text',
	onChangeFunction = () => {},
	style,
	maxLength,
	minLength,
	min,
	max,
}: Props) {
	return (
		<input
			ref={inputRef}
			id={styles['form-input']}
			style={style}
			placeholder={placeholder}
			type={type}
			onChange={onChangeFunction}
			minLength={minLength}
			maxLength={maxLength}
			min={min}
			max={max}
		/>
	);
}
