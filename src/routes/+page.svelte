<script lang="ts">
	import { goto } from '$app/navigation';
	import { armiesStore } from '$lib/store/army-lists';
	import { optionsStore } from '$lib/store/options';
</script>

<div class="mx-auto max-w-prose">
	<h1>Toy Soldier Lists</h1>
	<table class="mt-2">
		<tbody>
			{#each Object.entries($armiesStore).sort((a, b) => {
				const aName = a[1].name ? `${a[1].name} - ${a[1].faction}` : `Unnamed ${a[1].faction} Army`;
				const bName = b[1].name ? `${b[1].name} - ${b[1].faction}` : `Unnamed ${b[1].faction} Army`;

				return aName.localeCompare(bName);
			}) as temp, i}
				<tr class="odd-rows">
					<td class="pl-1 pr-2">
						{temp[1].name
							? `${temp[1].name} - ${temp[1].faction}`
							: `Unnamed ${temp[1].faction} Army ${i + 1}`}
					</td>
					<td>
						<button
							class="opaque"
							on:click={() => {
								optionsStore.update((prevOptions) => ({
									...prevOptions,
									armyListId: temp[0]
								}));

								goto('/editor');
							}}>Edit</button
						>
					</td>
					<td>
						<button
							class="opaque"
							on:click={() => {
								optionsStore.update((prevOptions) => ({
									...prevOptions,
									armyListId: temp[0]
								}));

								goto('/viewer');
							}}>View</button
						>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
