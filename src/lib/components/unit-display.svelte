<script lang="ts">
	import type { Unit } from '$lib/types';
	import MarkdownIt from 'markdown-it';

	export let unit: Unit;
	export let showNotes: boolean;

	const md = new MarkdownIt().disable(['link', 'autolink', 'html_inline', 'linkify']);
</script>

<table class="max-w-prose w-full border-collapse mt-2">
	<tbody>
		{#if unit.name}
			<tr>
				<td class="text-lg" colspan="3">
					{unit.name}
				</td>
			</tr>
		{/if}
		<tr>
			<td class="w-10 text-right pr-2">
				{unit.size}×
			</td>
			<td class={`w-max ${unit.name ? '' : 'text-lg'}`}>
				{unit.type}
			</td>
			<td class="w-min text-right">
				{unit.points}
			</td>
		</tr>
		{#if showNotes && unit.notes}
			<tr>
				<td></td>
				<td class="markdown text-sm leading-tight" colspan="2">
					<!-- eslint-disable-next-line svelte/no-at-html-tags -->
					{@html md.render(unit.notes)}
				</td>
			</tr>
		{/if}
	</tbody>
</table>
