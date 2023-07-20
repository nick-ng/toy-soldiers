import type { Army } from '$lib/types';
import { writable } from 'svelte/store';
import { browser } from '$app/environment';

const ARMIES_LOCAL_STORAGE_KEY = 'NICK_TOY_SOLDIERS_ARMIES';

let storedArmies: { [uuid: string]: Army } = {};

if (browser) {
	try {
		const storedArmiesString = localStorage.getItem(ARMIES_LOCAL_STORAGE_KEY);

		if (storedArmiesString) {
			storedArmies = JSON.parse(storedArmiesString);

			for (const key in storedArmies) {
				storedArmies[key].units = storedArmies[key].units.filter((u) => u);
			}
		}
	} catch (_e) {
		// noop
	}
}

export const armiesStore = writable<{ [uuid: string]: Army }>(storedArmies);

if (browser) {
	armiesStore.subscribe((newOptions) => {
		localStorage.setItem(ARMIES_LOCAL_STORAGE_KEY, JSON.stringify(newOptions));
	});
}
