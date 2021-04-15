<script>
	function addOauthApp() {
		window.api.send("add-oauth-app", {client_id: "", client_secret: "", scopes: []});
	}

	function addOauthToken() {
		window.api.send("add-oauth-token");
	}

	function setOauthApp() {
		window.api.send("set-oauth-app", app_id);
	}

	function setOauthToken() {
		window.api.send("set-oauth-token", token_login);
	}

	function getAppInfo() {
		window.api.send("get-app-info");
	}

	function getTokenInfo() {
		window.api.send("get-token-info");
	}

	function testQuery() {
		window.api.send("graph-query");
	}

	let app_id;
	let token_login;

	window.api.receive("update-app-info", (docs) => {
		console.log(docs);
		app_id = docs[0].client_id;
	})

	window.api.receive("update-token-info", (docs) => {
		console.log(docs);
		token_login = docs[0].login;
	})
  </script>

<h1>Hello World!</h1>
<button on:click={addOauthApp}>addOauthApp</button>
<button on:click={addOauthToken}>addOauthToken</button>
<button on:click={setOauthApp}>setOauthApp</button>
<button on:click={setOauthToken}>setOauthToken</button>
<button on:click={getAppInfo}>getAppInfo</button>
<button on:click={getTokenInfo}>getTokenInfo</button>
<button on:click={testQuery}>testQuery</button>

<style>
	

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

</style>