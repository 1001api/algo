<script lang="ts">
	import Highlight, { LineNumbers } from "svelte-highlight";
	import typescript from "svelte-highlight/languages/typescript";
	import style from "svelte-highlight/styles/night-owl";

	interface Props {
		// Code that will be Highlighted by the library
		code: string;
	}

	let { code }: Props = $props();
</script>

<svelte:head>
	{@html style}
</svelte:head>

<Highlight language={typescript} {code} let:highlighted>
	<LineNumbers hideBorder {highlighted} />
</Highlight>
