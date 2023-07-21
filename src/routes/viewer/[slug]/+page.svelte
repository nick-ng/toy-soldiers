<script lang="ts">
	import { page } from '$app/stores';
	import { armiesStore } from '$lib/store/army-lists';
	import { optionsStore } from '$lib/store/options';
	import ListControls from '$lib/components/list-controls.svelte';
	import ArmyDisplay from '$lib/components/army-display.svelte';

	$: armyId = $page.params.slug;
</script>

<div class="flex flex-col lg:flex-row justify-center relative">
	<div class="flex-grow flex flex-row justify-center">
		<div class="lg:basis-prose mx-1">
			{#if armyId && $armiesStore[armyId]}
				<ArmyDisplay
					army={$armiesStore[armyId]}
					showArmyNotes={!!$optionsStore.showArmyNotes}
					showUnitNotes={!!$optionsStore.showUnitNotes}
				/>
			{/if}
		</div>
	</div>
	<details class="lg:absolute left-1 top-0 ml-1">
		<summary class="text-lg">Lists</summary>
		<table class="mb-2">
			<tbody>
				<tr>
					<td><label for="preview-show-army-notes-checkbox">Show Army Notes</label></td>
					<td
						><input
							id="preview-show-army-notes-checkbox"
							class="ml-2"
							type="checkbox"
							bind:checked={$optionsStore.showArmyNotes}
						/></td
					>
				</tr>
				<tr>
					<td><label for="preview-show-unit-notes-checkbox">Show Unit Notes</label></td>
					<td
						><input
							id="preview-show-unit-notes-checkbox"
							class="ml-2"
							type="checkbox"
							bind:checked={$optionsStore.showUnitNotes}
						/></td
					>
				</tr>
			</tbody>
		</table>
		<ListControls />
	</details>
</div>
