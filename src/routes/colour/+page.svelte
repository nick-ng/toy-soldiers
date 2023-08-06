<script lang="ts">
	import ItemDrop from './item-drop.svelte';
	let borderHex = '#123456';
	let borderAlpha = 200;
	let textHex = '#ffffff';
	let textAlpha = 200;
	let backgroundHex = '#111111';
	let backgroundAlpha = 200;

	$: borderR = parseInt(borderHex[1] + borderHex[2], 16);
	$: borderG = parseInt(borderHex[3] + borderHex[4], 16);
	$: borderB = parseInt(borderHex[5] + borderHex[6], 16);
	$: borderString = `SetBorderColor ${borderR} ${borderG} ${borderB} ${borderAlpha}`;
	$: backgroundR = parseInt(backgroundHex[1] + backgroundHex[2], 16);
	$: backgroundG = parseInt(backgroundHex[3] + backgroundHex[4], 16);
	$: backgroundB = parseInt(backgroundHex[5] + backgroundHex[6], 16);
	$: backgroundString = `SetBackgroundColor ${backgroundR} ${backgroundG} ${backgroundB} ${backgroundAlpha}`;
	$: textR = parseInt(textHex[1] + textHex[2], 16);
	$: textG = parseInt(textHex[3] + textHex[4], 16);
	$: textB = parseInt(textHex[5] + textHex[6], 16);
	$: textString = `SetTextColor ${textR} ${textG} ${textB} ${textAlpha}`;
</script>

<div class="mx-2">
	<div class="flex flex-row mb-2">
		<div class="border-default px-2">
			<label>
				<div>Border Colour</div>
				<input class="w-64" type="color" bind:value={borderHex} />
			</label>
			<label>
				<div>Border Alpha - {borderAlpha}</div>
				<input type="range" min={0} max={255} step={1} bind:value={borderAlpha} />
			</label>
		</div>
		<div class="border-default px-2">
			<label>
				<div>Background Colour</div>
				<input class="w-64" type="color" bind:value={backgroundHex} />
			</label>
			<label>
				<div>Background Alpha - {backgroundAlpha}</div>
				<input type="range" min={0} max={255} step={1} bind:value={backgroundAlpha} />
			</label>
		</div>
		<div class="border-default px-2">
			<label>
				<div>Text Colour</div>
				<input class="w-64" type="color" bind:value={textHex} />
			</label>
			<label>
				<div>Text Alpha - {textAlpha}</div>
				<input type="range" min={0} max={255} step={1} bind:value={textAlpha} />
			</label>
		</div>
	</div>
	<div>
		<div>
			<input class="w-72" type="text" value={borderString} /><button
				on:click={() => {
					navigator.clipboard.writeText(borderString);
				}}>Copy Border String</button
			>
		</div>
		<div>
			<input class="w-72" type="text" value={backgroundString} /><button
				on:click={() => {
					navigator.clipboard.writeText(backgroundString);
				}}>Copy Background String</button
			>
		</div>
		<div>
			<input class="w-72" type="text" value={textString} /><button
				on:click={() => {
					navigator.clipboard.writeText(textString);
				}}>Copy Text String</button
			>
		</div>
	</div>

	<div class="mt-2">
		<div class="p-16 border-default inline-block bg-orange-50">
			<ItemDrop {borderAlpha} {borderHex} {backgroundAlpha} {backgroundHex} {textAlpha} {textHex} />
		</div>
		<div class="p-16 border-default inline-block bg-slate-500">
			<ItemDrop {borderAlpha} {borderHex} {backgroundAlpha} {backgroundHex} {textAlpha} {textHex} />
		</div>
		<div class="p-16 border-default inline-block bg-orange-950">
			<ItemDrop {borderAlpha} {borderHex} {backgroundAlpha} {backgroundHex} {textAlpha} {textHex} />
		</div>
	</div>
</div>
