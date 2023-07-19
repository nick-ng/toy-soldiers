<script lang="ts">
	import { armiesStore } from '$lib/store/army-lists';

	export let armyId: string;
	export let unitId: number;
</script>

<!-- @todo(nick-ng): change this to non-table -->
<table class="max-w-prose w-full border-collapse mt-2">
	<tbody>
		<tr>
			<td colspan="3">
				<input
					class="w-full"
					type="text"
					bind:value={$armiesStore[armyId].units[unitId].name}
					placeholder="Unit Name (e.g. Viridian Company)"
				/>
			</td>
		</tr>
		<tr>
			<td class="w-14">
				<input
					class="w-full text-right"
					type="number"
					bind:value={$armiesStore[armyId].units[unitId].size}
				/>
			</td>
			<td class="w-max">
				<input
					class="w-full"
					type="text"
					bind:value={$armiesStore[armyId].units[unitId].type}
					placeholder="Unit Type (e.g. Soldiers with Pikes)"
				/>
			</td>
			<td class="w-min text-right">
				<label
					>Pt
					<input
						class="w-16 text-right"
						type="number"
						bind:value={$armiesStore[armyId].units[unitId].points}
					/></label
				>
			</td>
		</tr>
		<tr>
			<td colspan="3">
				<textarea
					class="resize-none w-full {$armiesStore[armyId].units[unitId].notes.split('\n').length > 3
						? 'h-36'
						: 'h-16'}"
					bind:value={$armiesStore[armyId].units[unitId].notes}
				/>
			</td>
		</tr>
	</tbody>
</table>
