<script lang="ts">
	import { ZodError } from 'zod';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { armiesStore } from '$lib/store/army-lists';
	import { ArmySchema } from '$lib/types';
	import { getListName, randomUUID } from '$lib/utils';

	export let showNewArmyButton: boolean = false;
	let subRoute = showNewArmyButton ? 'editor' : 'viewer';

	let errors: string[] = [];
</script>

<div>
	{#each Object.entries($armiesStore).sort((a, b) => {
		const aName = getListName(a[1]);
		const bName = getListName(b[1]);

		return aName.localeCompare(bName);
	}) as temp, i}
		<div class="group relative mb-1">
			<a
				class="block text-left whitespace-nowrap overflow-hidden text-ellipsis w-64 button-default no-underline normal-color {$page
					.params.slug === temp[0]
					? 'odd-rows'
					: ''}"
				href="/{subRoute}/{temp[0]}">{getListName(temp[1], i)}</a
			>
			<div
				class="group-hover:block hidden absolute left-full-1 top-0 bg-white dark:bg-gray-800 px-2 py-1 border-default"
			>
				<div class="whitespace-nowrap">
					{temp[1].name || temp[1].faction || 'No Name or Faction'}
				</div>
				{#if temp[1].name}
					<div class="whitespace-nowrap">
						{temp[1].faction}
					</div>
				{/if}
				<div class="whitespace-nowrap text-sm">{temp[1].maxPoints} Points</div>
			</div>
		</div>
	{/each}
	{#if showNewArmyButton}
		<hr class="mb-1" />
		<div class="mb-1">
			<button
				class="text-left"
				on:click={() => {
					const newArmyId = randomUUID();

					armiesStore.update((prevArmies) => {
						return {
							...prevArmies,
							[newArmyId]: {
								faction: '',
								maxPoints: 2000,
								name: '',
								notes: '',
								units: []
							}
						};
					});

					goto(`/editor/${newArmyId}`);
				}}>New Army</button
			>
		</div>
		<div>
			<label class="button-default inline-block cursor-pointer relative">
				Import From File
				<input
					class="w-0 opacity-0 text-sm text-left block absolute top-0 left-0"
					type="file"
					accept=".json"
					on:change={async (event) => {
						errors = [];

						if (event.currentTarget.files) {
							for (const file of [...event.currentTarget.files]) {
								try {
									const newList = ArmySchema.parse(JSON.parse(await file.text()));

									let newArmyId = randomUUID();

									armiesStore.update((prevArmies) => {
										while (Object.keys(prevArmies).includes(newArmyId)) {
											newArmyId = randomUUID();
										}

										return {
											...prevArmies,
											[newArmyId]: newList
										};
									});

									goto(`/editor/${newArmyId}`);
								} catch (e) {
									if (e instanceof ZodError) {
										errors.push(`${file.name} doesn't contain an army`);
									} else {
										errors.push(`Error when loading ${file.name}`);
									}
								}
							}
						}
					}}
				/>
			</label>
		</div>
	{/if}
	{#each errors as error}
		<div>{error}</div>
	{/each}
</div>
