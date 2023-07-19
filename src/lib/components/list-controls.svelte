<script lang="ts">
	import { armiesStore } from '$lib/store/army-lists';
	import { optionsStore } from '$lib/store/options';
	import { randomUUID } from '$lib/utils';

	export let showNewArmyButton: boolean = false;

	const maxNameLength = 32;
</script>

<ul>
	{#each Object.entries($armiesStore).sort((a, b) => {
		const aName = a[1].name ? `${a[1].name} - ${a[1].faction}` : `Unnamed ${a[1].faction} Army`;
		const bName = b[1].name ? `${b[1].name} - ${b[1].faction}` : `Unnamed ${b[1].faction} Army`;

		return aName.localeCompare(bName);
	}) as temp, i}
		{@const listName = temp[1].name
			? `${temp[1].name} - ${temp[1].faction}`
			: `Unnamed ${temp[1].faction} Army ${i + 1}`}
		<li class="mb-1">
			<button
				class="group relative w-full"
				on:click={() => {
					optionsStore.update((prevOptions) => ({
						...prevOptions,
						armyListId: temp[0]
					}));
				}}
			>
				{listName.length < maxNameLength
					? listName
					: `${[...listName].slice(0, maxNameLength).join('').trim()}…`}
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
			</button>
		</li>
	{/each}
	{#if showNewArmyButton}
		<li>
			<button
				class="w-full"
				on:click={() => {
					armiesStore.update((prevArmies) => {
						const newArmyId = randomUUID();

						optionsStore.update((prevOptions) => ({
							...prevOptions,
							armyListId: newArmyId
						}));

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
				}}>New Army</button
			>
		</li>
	{/if}
</ul>
