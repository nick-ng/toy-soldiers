import { writable } from 'svelte/store';
import { browser } from '$app/environment';

const OPTIONS_LOCAL_STORAGE_KEY = 'NICK_TOY_SOLDIERS_OPTIONS';

type Options = { armyListId?: string };

let storedOptions: Options = {};

if (browser) {
	try {
		const storedOptionsString = localStorage.getItem(OPTIONS_LOCAL_STORAGE_KEY);

		if (storedOptionsString) {
			storedOptions = JSON.parse(storedOptionsString);
		}
	} catch (_e) {
		// noop
	}
}

export const optionsStore = writable<Options>(storedOptions);

if (browser) {
	optionsStore.subscribe((newOptions) => {
		localStorage.setItem(OPTIONS_LOCAL_STORAGE_KEY, JSON.stringify(newOptions));
	});
}
