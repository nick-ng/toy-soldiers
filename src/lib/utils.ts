import type { Army } from './types';

export const randomUUID = (): string => {
	if (typeof window.crypto.randomUUID === 'function') {
		return window.crypto.randomUUID();
	}

	let uuid = '';
	for (let n = 0; n < 36; n++) {
		if ([8, 13, 18, 23].includes(n)) {
			uuid = uuid + '-';
		} else {
			const randomNumber = Math.floor(36 * Math.random());
			uuid = uuid + randomNumber.toString(36);
		}
	}

	return uuid;
};

export const getListName = (army: Army, number = -1) => {
	return army.name
		? `${army.name}${army.faction ? ` - ${army.faction}` : ''}`
		: `Unnamed ${army.faction} Army${number < 0 ? '' : ` ${number + 1}`}`;
};
