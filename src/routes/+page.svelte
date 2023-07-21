<script lang="ts">
	import { ZodError } from 'zod';
	import { ArmySchema } from '$lib/types';
	import { armiesStore } from '$lib/store/army-lists';
	import { getListName, randomUUID } from '$lib/utils';

	let errors: string[] = [];
</script>

<div class="mx-auto max-w-prose">
	<h1>Toy Soldier Lists</h1>
	<table class="mt-2">
		<tbody>
			{#each Object.entries($armiesStore).sort((a, b) => {
				const aName = getListName(a[1]);
				const bName = getListName(b[1]);

				return aName.localeCompare(bName);
			}) as temp, i}
				<tr class="odd-rows">
					<td class="pl-1 pr-2">
						{getListName(temp[1], i)}
					</td>
					<td>
						<a
							class="block text-left whitespace-nowrap overflow-hidden text-ellipsis opaque button-default no-underline normal-color"
							href="/editor/{temp[0]}">Edit</a
						>
					</td>
					<td>
						<a
							class="block text-left whitespace-nowrap overflow-hidden text-ellipsis opaque button-default no-underline normal-color"
							href="/viewer/{temp[0]}">View</a
						>
					</td>
				</tr>
			{/each}
			<tr>
				<td colspan="3"><hr /></td>
			</tr>
			<tr>
				<td colspan="3"
					><label class="button-default inline-block cursor-pointer relative">
						Import From File
						<input
							class="w-0 opacity-0 text-sm text-left block absolute top-0 left-0"
							type="file"
							accept=".json"
							on:change={async (event) => {
								errors = [];

								if (event.currentTarget.files) {
									for (const file of [...event.currentTarget.files]) {
										try {
											const newList = ArmySchema.parse(JSON.parse(await file.text()));

											armiesStore.update((prevArmies) => {
												let newArmyId = randomUUID();
												while (Object.keys(prevArmies).includes(newArmyId)) {
													newArmyId = randomUUID();
												}

												return {
													...prevArmies,
													[newArmyId]: newList
												};
											});
										} catch (e) {
											if (e instanceof ZodError) {
												errors.push(`${file.name} doesn't contain an army`);
											} else {
												errors.push(`Error when loading ${file.name}`);
											}
										}
									}
								}
							}}
						/>
					</label></td
				>
			</tr>
		</tbody>
	</table>
	{#each errors as error}
		<div>{error}</div>
	{/each}
</div>
