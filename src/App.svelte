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
		max-width: 240px;
		padding-top:32px;

		height: calc(100%-32px);
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>