<script>
	function onAuth() {
		window.api.send("github-oauth");
	}
  
	window.api.receive("github-oauth", (data) => {
		console.log(data);
	});
  
  
  </script>

<h1>Hello World!</h1>
<button on:click={onAuth}>auth</button>

<style>
	

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

</style>