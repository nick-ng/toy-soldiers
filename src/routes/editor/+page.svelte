<script lang="ts">
	import { armiesStore } from '$lib/store/army-lists';
	import { optionsStore } from '$lib/store/options';
	import ListControls from '$lib/components/list-controls.svelte';
	import ArmyDisplay from '$lib/components/army-display.svelte';
	import Army from './army.svelte';
</script>

<div class="flex flex-row justify-center">
	<div class="mr-4">
		<h2>Lists</h2>
		<ListControls showNewArmyButton />
		<details class="max-w-prose">
			<summary class="text-xl">Help</summary>
			<p>The army list is saved on your browser as soon as you make any changes.</p>
			<p>
				The larger text boxes for notes use <a href="https://commonmark.org/help/" target="_blank"
					>Markdown</a
				> with some things like URLs and images disabled. Notably, to get text to appear on a new line,
				you need to insert two new lines or use a list.
			</p>
		</details>
	</div>
	<div class="basis-prose mr-4">
		<h1>Editor</h1>
		{#if $optionsStore.armyListId && $armiesStore[$optionsStore.armyListId]}
			<Army armyId={$optionsStore.armyListId} />
		{:else}
			<p>Make an army.</p>
		{/if}
	</div>
	<div class="basis-prose">
		<h2>Preview</h2>
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
		{#if $optionsStore.armyListId && $armiesStore[$optionsStore.armyListId]}
			<ArmyDisplay
				army={$armiesStore[$optionsStore.armyListId]}
				showArmyNotes={!!$optionsStore.showArmyNotes}
				showUnitNotes={!!$optionsStore.showUnitNotes}
			/>
		{/if}
	</div>
</div>
