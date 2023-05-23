const useGooglePlaceAutoComplete = () => {
	const initAutoComplete = async (
		input: HTMLInputElement,
		callback: () => void
	) => {
		let autoComplete = new window.google.maps.places.Autocomplete(input, {
			componentRestrictions: { country: ['us', 'ca', 'gb'] },
			fields: ['address_component', 'geometry'],
			types: ['address'],
		});
		autoComplete.addListener('place_changed', callback);

		return autoComplete;
	};

	const getFullAddress = async (
		autoComplete: google.maps.places.Autocomplete
	) => {
		const place = autoComplete.getPlace();

		let address1 = '';
		let locality = '';
		let adminArea1Short = '';
		let adminArea1Long = '';
		let countryShort = '';
		let countryLong = '';
		let postalCode = '';

		for (const component of place.address_components!) {
			const componentType = component.types[0];

			if (componentType === 'street_number') {
				address1 = component.long_name;
			}
			if (componentType === 'route') {
				address1 = `${address1} ${component.long_name}`.trimStart();
			}
			if (componentType === 'locality') {
				locality = component.long_name;
			}
			if (componentType === 'administrative_area_level_1') {
				adminArea1Short = component.short_name;
				adminArea1Long = component.long_name;
			}
			if (componentType === 'postal_code') {
				postalCode = component.long_name;
			}
			if (componentType === 'postal_code_suffix') {
				postalCode = `${postalCode}-${component.long_name}`;
			}
			if (componentType === 'country') {
				countryShort = component.short_name;
				countryLong = component.long_name;
			}
		}

		let resAddress = {
			address1: address1,
			locality: locality,
			adminArea1Short: adminArea1Short,
			adminArea1Long: adminArea1Long,
			postalCode: postalCode,
			countryShort: countryShort,
			countryLong: countryLong,
		};

		return resAddress;
	};

	return {
		initAutoComplete,
		getFullAddress,
	};
};

export default useGooglePlaceAutoComplete;
