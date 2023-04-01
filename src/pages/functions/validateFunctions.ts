function isString(data: string | number) {
	if (typeof data === 'string') return true;
}

function isNumber(data: string | number) {
	if (typeof +data === 'number') return true;
}

function clearInputField(...inputRefs: any[]) {
    inputRefs.map((input) => (input.current.value = ''));
}

export {
	isString,
    isNumber,
    clearInputField
};
