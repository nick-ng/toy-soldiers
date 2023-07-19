<script lang="ts">
	import { armiesStore } from '$lib/store/army-lists';

	export let armyId: string;
	export let unitId: number;
</script>

<div class="w-prose border-default p-1 even-rows rounded mb-1">
	<div class="flex flex-row justify-start">
		<div class="flex-grow">
			<input
				class="w-full"
				type="text"
				bind:value={$armiesStore[armyId].units[unitId].name}
				placeholder="Unit Name (e.g. Viridian Company)"
			/>
		</div>
	</div>
	<div class="flex flex-row justify-start mt-1">
		<div class="basis-14">
			<input
				class="w-full text-right"
				type="number"
				bind:value={$armiesStore[armyId].units[unitId].size}
			/>
		</div>
		<div class="flex-grow ml-1">
			<input
				class="w-full"
				type="text"
				bind:value={$armiesStore[armyId].units[unitId].type}
				placeholder="Unit Type (e.g. Soldiers with Pikes)"
			/>
		</div>
		<div class="basis-16 ml-1">
			<input
				class="w-full text-right"
				type="number"
				bind:value={$armiesStore[armyId].units[unitId].points}
			/>
		</div>
	</div>
	<div class="mt-1">
		<textarea
			class="resize-none w-full {$armiesStore[armyId].units[unitId].notes.split('\n').length > 2
				? 'h-36'
				: 'h-16'}"
			bind:value={$armiesStore[armyId].units[unitId].notes}
		/>
	</div>
	<div class="mt-1 flex flex-row">
		<button
			class="px-1 cannot-hover:px-2 opaque"
			on:click={() => {
				armiesStore.update((prevArmiesStore) => {
					const thisUnit = prevArmiesStore[armyId].units[unitId];
					const unitMinus1 = prevArmiesStore[armyId].units[unitId - 1];

					prevArmiesStore[armyId].units = prevArmiesStore[armyId].units
						.slice(0, unitId - 1)
						.concat([thisUnit, unitMinus1])
						.concat(
							prevArmiesStore[armyId].units.slice(unitId + 1, prevArmiesStore[armyId].units.length)
						);

					return prevArmiesStore;
				});
			}}>⮝</button
		>
		<button
			class="ml-1 px-1 cannot-hover:px-2 opaque"
			on:click={() => {
				armiesStore.update((prevArmiesStore) => {
					const thisUnit = prevArmiesStore[armyId].units[unitId];
					const unitPlus1 = prevArmiesStore[armyId].units[unitId + 1];

					prevArmiesStore[armyId].units = prevArmiesStore[armyId].units
						.slice(0, unitId)
						.concat([unitPlus1, thisUnit])
						.concat(
							prevArmiesStore[armyId].units.slice(unitId + 2, prevArmiesStore[armyId].units.length)
						);

					return prevArmiesStore;
				});
			}}>⮟</button
		>
		<button
			class="ml-1 px-1 cannot-hover:px-2 opaque"
			on:click={() => {
				armiesStore.update((prevArmiesStore) => {
					const thisUnit = prevArmiesStore[armyId].units[unitId];

					prevArmiesStore[armyId].units = prevArmiesStore[armyId].units
						.slice(0, unitId)
						.concat([thisUnit, { ...thisUnit }])
						.concat(
							prevArmiesStore[armyId].units.slice(unitId + 1, prevArmiesStore[armyId].units.length)
						);

					return prevArmiesStore;
				});
			}}>×2</button
		>
		<div class="flex-grow" />
		<button
			class="ml-1 px-0 cannot-hover:px-2 opaque"
			on:click={() => {
				armiesStore.update((prevArmiesStore) => {
					prevArmiesStore[armyId].units = prevArmiesStore[armyId].units
						.slice(0, unitId)
						.concat(
							prevArmiesStore[armyId].units.slice(unitId + 1, prevArmiesStore[armyId].units.length)
						);

					return prevArmiesStore;
				});
			}}>🗑️</button
		>
	</div>
</div>
