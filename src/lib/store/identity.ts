import { writable } from 'svelte/store';
import { browser } from '$app/environment';

const IDENTITY_LOCAL_STORAGE_KEY = 'NICK_TOY_SOLDIERS_IDENTITY';

type Identity = { ghAccessToken?: string; jwt?: string };

let storedIdentity: Identity = {};

if (browser) {
	try {
		const storedIdentityString = localStorage.getItem(IDENTITY_LOCAL_STORAGE_KEY);

		if (storedIdentityString) {
			storedIdentity = {
				...storedIdentity,
				...JSON.parse(storedIdentityString)
			};
		}
	} catch (_e) {
		// noop
	}
}

export const IdentityStore = writable<Identity>(storedIdentity);

if (browser) {
	IdentityStore.subscribe((newIdentity) => {
		localStorage.setItem(IDENTITY_LOCAL_STORAGE_KEY, JSON.stringify(newIdentity));
	});
}
