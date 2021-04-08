<script>
	import HelloWorld from './components/HelloWorld.svelte';
	import TitleBar from './components/TitleBar.svelte';
</script>

<TitleBar/>
<main>
	<HelloWorld/>
</main>

<style>
	main {
		text-align: center;
		width: 100%;

		height: calc(100% - 32px);
	}
</style>