<script lang="ts">
	import type { Army } from '$lib/types';
	import MarkdownIt from 'markdown-it';
	import UnitDisplay from './unit-display.svelte';

	export let army: Army;
	export let showArmyNotes: boolean;
	export let showUnitNotes: boolean;

	const md = new MarkdownIt();

	$: armyPoints = army.units.reduce((accumulator, u) => accumulator + u.points, 0);
</script>

<div>
	{#if army.name}
		<h1>{army.name}</h1>
		<h2>{army.faction}</h2>
	{:else}
		<h1>{army.faction} Army</h1>
	{/if}
	<div class="flex flex-row">
		<div class="flex-grow mr-2 text-right">Size: {army.maxPoints}</div>
		<div class="flex-grow ml-2">{army.faction}</div>
	</div>
	{#if showArmyNotes && army.notes}
		<div class="markdown">
			<!-- eslint-disable-next-line svelte/no-at-html-tags -->
			{@html md.render(army.notes)}
		</div>
	{/if}
	<hr class="mt-2" />
	{#each army.units as unit}
		<UnitDisplay {unit} showNotes={showUnitNotes} />
	{/each}
	<div class="text-right mt-2">Points Total: {armyPoints}</div>
</div>
