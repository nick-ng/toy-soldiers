<script lang="ts">
	import type { Army } from '$lib/types';

	import Unit from './unit.svelte';

	export let army: Army;
	export let handleSave: (newArmy: Army) => void | Promise<void>;

	let currentArmyName = army.name;
	let currentArmyFaction = army.faction;
	let currentArmyMaxPoints = army.maxPoints;
	let currentArmyNotes = army.notes;
	let currentArmyUnits = army.units;

	let dirty = false;

	$: armyPoints = currentArmyUnits.reduce((accumulator, u) => accumulator + u.points, 0);
	$: dirty2 =
		dirty ||
		currentArmyName !== army.name ||
		currentArmyFaction !== army.faction ||
		currentArmyMaxPoints !== army.maxPoints ||
		currentArmyNotes !== army.notes;
</script>

<table class="w-full border-collapse">
	<tbody>
		<tr>
			<td class="w-min">Army Name</td>
			<td><input class="w-full" type="text" bind:value={currentArmyName} /></td>
		</tr>
		<tr>
			<td class="w-min">Army Faction</td>
			<td><input class="w-full" type="text" bind:value={currentArmyFaction} /></td>
		</tr>
		<tr>
			<td class="w-min">Army Size</td>
			<td class="text-right"
				>{armyPoints} /
				<input class="text-right w-1/2" type="number" bind:value={currentArmyMaxPoints} /></td
			>
		</tr>
		<tr>
			<td class="w-min align-text-top">Army Notes</td>
			<td><textarea class="resize-none w-full h-36" bind:value={currentArmyNotes} /></td>
		</tr>
		{#if dirty2}
			<tr>
				<td colspan="2"
					><button
						on:click={() => {
							if (dirty2) {
								dirty = false;

								handleSave({
									name: currentArmyName,
									faction: currentArmyFaction,
									maxPoints: currentArmyMaxPoints,
									notes: currentArmyNotes,
									units: currentArmyUnits
								});
							}
						}}>Save</button
					></td
				>
			</tr>
		{/if}
	</tbody>
</table>

{#each currentArmyUnits as unit, i}
	<Unit
		{unit}
		handleSave={(newUnit) => {
			dirty = true;

			currentArmyUnits[i] = newUnit;

			// @todo(nick-ng): some how save at this point?
		}}
	/>
{/each}
<button
	on:click={() => {
		dirty = true;

		const newUnit = {
			size: 1,
			type: '',
			name: '',
			notes: '',
			points: 0
		};

		currentArmyUnits = currentArmyUnits.concat(newUnit);
	}}>Add Unit</button
>
