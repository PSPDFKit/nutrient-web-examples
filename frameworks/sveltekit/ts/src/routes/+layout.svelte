<script lang="ts">
// This is the root layout for all pages
</script>

<main>
	<slot />
</main>

<style>
	:global(body) {
		margin: 0;
		padding: 0;
		font-family: "SF Mono", "Monaco", "Inconsolata", "Roboto Mono", monospace;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}
</style>