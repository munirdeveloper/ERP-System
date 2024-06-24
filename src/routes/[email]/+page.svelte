<script lang="ts">
	import { page } from '$app/stores';
	import { getPokemonList, getPokemon } from '$lib/pokemonAPI';

	$: email = $page.params.email;

	let pokemonList: any = [];
	let pokemonData: any = [];
	let profile: any = {
		description: 'This is your pokemon description.',
		pokemon_ids: [1, 2, 5]
	};

	async function refreshPokemonData() {
		pokemonData = [];

		profile.pokemon_ids.map(async (id: number) => {
			const data = await getPokemon(id.toString());

			if (pokemonData === undefined) {
				pokemonData = [data];
			} else {
				pokemonData = [...pokemonData, data];
			}
		});
	}

	page.subscribe(async () => {
		pokemonList = await getPokemonList();
		await refreshPokemonData();
		console.log(await getPokemon('1'));
		console.log(pokemonList);
	});
</script>

<div class="hero min-h-screen bg-blue-400">
	<div class="hero-content mb-80">
		<div class="max-w-2xl text-center">
			<h1 class="text-4xl font-bold text-white">{email}'s Page</h1>
			<p class="mx-auto max-w-md py-3">User description here..</p>
			<div class="grid grid-cols-3">
				{#if pokemonData === undefined}
					<p>Loading ...</p>
				{:else}
					{#each pokemonData as pokemon}
						<div class="card m-4 bg-slate-700 shadow-lg shadow-blue-900">
							<div class="card-body">
								<div class="text-center">
									<img
										src={pokemon.sprites.front_default}
										alt="Pokemon"
										class="mx-auto h-32 w-32"
									/>
									<h2 class="text-2xl font-bold text-white">{pokemon.name}</h2>
									<p class="text-info">{pokemon.types[0].type.name}</p>
								</div>
							</div>
						</div>
					{/each}
				{/if}
			</div>
		</div>
	</div>
</div>
