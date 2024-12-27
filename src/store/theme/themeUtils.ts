export const observeClassChanges = () => {
	const callback = (mutationList: any) => {
		mutationList.forEach((mutation: any) => {
			if (
				mutation.type !== 'attributes' ||
				mutation.attributeName !== 'class'
			) {
				return;
			}
			const mutationClassList = mutation.target.classList.values();

			let isDarkClassExists = false;
			for (const value of mutationClassList) {
				if (value === 'dark') isDarkClassExists = true;
			}

			localStorage.setItem('isDarkTheme', `${isDarkClassExists}`);
		});
	};

	const observer = new MutationObserver(callback);
	observer.observe(document.documentElement, { attributes: true });
};

export const changeTheme = (isDarkTheme: boolean) => {
	const documentClassList = document.documentElement.classList;
	isDarkTheme
		? documentClassList.add('dark')
		: documentClassList.remove('dark');
};
