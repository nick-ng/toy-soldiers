<script lang="ts">
	import { armiesStore } from '$lib/store/army-lists';

	import Unit from './unit.svelte';

	export let armyId: string;

	$: armyPoints = $armiesStore[armyId].units.reduce((accumulator, u) => accumulator + u.points, 0);
</script>

<table class="w-full border-collapse">
	<tbody>
		<tr>
			<td class="w-min">Army Name</td>
			<td><input class="w-full" type="text" bind:value={$armiesStore[armyId].name} /></td>
		</tr>
		<tr>
			<td class="w-min">Army Faction</td>
			<td><input class="w-full" type="text" bind:value={$armiesStore[armyId].faction} /></td>
		</tr>
		<tr>
			<td class="w-min">Army Size</td>
			<td class="text-right"
				>{armyPoints} /
				<input
					class="text-right w-1/2"
					type="number"
					bind:value={$armiesStore[armyId].maxPoints}
				/></td
			>
		</tr>
		<tr>
			<td class="w-min align-text-top">Army Notes</td>
			<td
				><textarea
					class="resize-none w-full {$armiesStore[armyId].notes.split('\n').length > 2
						? 'h-36'
						: 'h-16'}"
					bind:value={$armiesStore[armyId].notes}
				/></td
			>
		</tr>
	</tbody>
</table>

{#each $armiesStore[armyId].units as _, i}
	<Unit {armyId} unitId={i} />
{/each}
<button
	class="mb-1"
	on:click={() => {
		const newUnit = {
			size: 1,
			type: '',
			name: '',
			notes: '',
			points: 0
		};

		armiesStore.update((prevArmies) => {
			prevArmies[armyId].units = prevArmies[armyId].units.concat(newUnit);
			return prevArmies;
		});
	}}>Add Unit</button
>
