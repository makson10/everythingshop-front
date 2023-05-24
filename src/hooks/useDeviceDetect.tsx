import { useEffect, useState } from 'react';

const useDeviceDetect = () => {
	const [isMobileDevice, setIsMobileDevice] = useState<boolean>(false);

	useEffect(() => {
		const details = navigator.userAgent;
		const regexp = /android|iphone|kindle|ipad/i;
		setIsMobileDevice(regexp.test(details));
	}, []);

	return [isMobileDevice];
};

export default useDeviceDetect;