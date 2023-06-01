import { useEffect, useRef } from 'react';
import useGooglePlaceAutoComplete from '@/hooks/useGooglePlaceAutoComplete';
import { useField } from 'formik';

const DeliveryAddressInput = (props: { name: string; type: string }) => {
	const googleAutoCompleteSvc = useGooglePlaceAutoComplete();
	const [fields, meta, helpers] = useField(props.name);
	const inputAddressRef = useRef<HTMLInputElement | null>(null);
	let autoComplete: google.maps.places.Autocomplete;

	const handleAddressSelect = async () => {
		const addressObj = await googleAutoCompleteSvc.getFullAddress(autoComplete);
		helpers.setValue(
			`${addressObj.address1}, ${addressObj.adminArea1Long}, ${addressObj.countryShort}`
		);
	};

	useEffect(() => {
		const loadGoogleMaps = async () => {
			autoComplete = await googleAutoCompleteSvc.initAutoComplete(
				inputAddressRef.current!,
				handleAddressSelect
			);
		};

		loadGoogleMaps();
	}, []);

	return (
		<>
			<input
				id="adderessInput"
				ref={inputAddressRef}
				placeholder="Enter your delivery address"
				className="min-w-[20rem] block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 disabled:bg-[#c9c9c9]"
				{...fields}
				{...props}
			/>
			{meta.error && meta.touched && meta.error}
		</>
	);
};

export default DeliveryAddressInput;