<script lang="ts">
	export let itemName = 'Rusted Sword';
	export let borderHex = '#123456';
	export let borderAlpha = 200;
	export let backgroundHex = '#111111';
	export let backgroundAlpha = 200;
	export let textHex = '#ffffff';
	export let textAlpha = 200;
</script>

<div
	style={[
		`border-color: ${borderHex}${borderAlpha.toString(16).padStart(2, '0')}`,
		`color: ${textHex}${textAlpha.toString(16).padStart(2, '0')}`,
		`background-color: ${backgroundHex}${backgroundAlpha.toString(16).padStart(2, '0')}`,
		''
	].join(';')}
	class="p-2 border-solid border-[3px] inline-block font-semibold"
>
	{itemName}
</div>
