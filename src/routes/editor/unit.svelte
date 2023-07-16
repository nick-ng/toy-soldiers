<script lang="ts">
	import type { Unit } from '$lib/types';

	export let unit: Unit;
	export let handleSave: (newUnit: Unit) => void | Promise<void>;

	let unitSize = unit.size;
	let unitName = unit.name;
	let unitType = unit.type;
	let unitNotes = unit.notes;
	let unitPoints = unit.points;

	$: dirty =
		unitSize !== unit.size ||
		unitName !== unit.name ||
		unitType !== unit.type ||
		unitNotes !== unit.notes ||
		unitPoints !== unit.points;
</script>

<table class="max-w-prose w-full border-collapse">
	<tbody>
		<tr>
			<td colspan="3">
				<input
					class="w-full"
					type="text"
					bind:value={unitName}
					placeholder="Unit Name (e.g. Viridian Company)"
				/>
			</td>
		</tr>
		<tr>
			<td class="w-14">
				<input class="w-full text-right" type="number" bind:value={unitSize} />
			</td>
			<td class="w-max">
				<input
					class="w-full"
					type="text"
					bind:value={unitType}
					placeholder="Unit Type (e.g. Soldiers with Pikes)"
				/>
			</td>
			<td class="w-min text-right">
				<label
					>Pt
					<input class="w-16 text-right" type="number" bind:value={unitPoints} /></label
				>
			</td>
		</tr>
		<tr>
			<td colspan="3">
				<textarea class="resize-none w-full h-36" bind:value={unitNotes} />
			</td>
		</tr>
		{#if dirty}
			<tr>
				<td colspan="3">
					<button
						class="w-full mb-4"
						on:click={() => {
							if (dirty) {
								handleSave({
									size: unitSize,
									name: unitName,
									type: unitType,
									notes: unitNotes,
									points: unitPoints
								});
							}
						}}>Save</button
					>
				</td>
			</tr>
		{/if}
	</tbody>
</table>
