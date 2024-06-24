<script lang="ts">
	import { page } from '$app/stores';
	import { getPokemonList, getPokemon } from '$lib/pokemonAPI';
	export let data;

	let { supabase, session } = data;
	$: ({ supabase, session } = data);

	$: email = $page.params.email;

	let pokemonList: any = [];
	let pokemonData: any = [];
	let profile: any = {
		description: 'This is your pokemon description.',
		pokemon_ids: [1, 2, 5]
	};
	let isModalOpen = false;

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

	async function saveProfile() {
		const { data: profileData, error: profileError } = await supabase
			.from('profiles')
			.select('*')
			.eq('email', email);

		if (profileData?.length === 0) {
			// create profile row
			const { data, error } = await supabase
				.from('profiles')
				.insert({ ...profile, user_id: session?.user?.id, email: session?.user?.email });
		} else {
			// update profile row
			const { data, error } = await supabase
				.from('profiles')
				.update(profile) // description, pokemon_id
				.eq('user_id', session?.user?.id);
		}
	}

	page.subscribe(async () => {
		pokemonList = await getPokemonList();

		const { data: profileData, error: profileError } = await supabase
			.from('profiles')
			.select('description, pokemon_ids')
			.eq('email', email);

		if (profileData?.length == 0 && email == session?.user.email) {
			// save profile
			console.log('Save profile');
			await saveProfile();
		} else if (profileData != null && profileData.length > 0) {
			profile = profileData[0];
		} else {
			console.log('NO Profile');
			profile = {
				description: 'This user does not have a profile yet!',
				pokemon_ids: []
			};
		}

		await refreshPokemonData();
	});

	async function savePageEdits() {
		console.log('Saving');
		isModalOpen = false;
	}
</script>

<div class="hero min-h-screen bg-blue-400">
	<div class="hero-content mb-80">
		<div class="max-w-2xl text-center">
			<h1 class="text-4xl font-bold text-white">{email}'s Page</h1>
			<p class="mx-auto max-w-md py-3">{profile.description}</p>
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
			{#if email == session?.user?.email}
				<button class="btn btn-info" on:click={() => (isModalOpen = true)}>Edit Page</button>
				<dialog class="modal min-w-lg" class:modal-open={isModalOpen}>
					<div class="modal-box bg-blue-200">
						<h3>Edit Your PokePage</h3>
						<p>Here you can make edits to your page, such as description or pokemon selected</p>
						<p class="p-2 text-white">Edit your description</p>
						<textarea
							bind:value={profile.description}
							class="text-area textarea-bordered textarea-lg h-[300px] w-full max-w-md"
						/>
						<button class="btn btn-success" on:click={() => savePageEdits()}>Save Edits</button>
						<p class="p-2 text-white">Select your pokemon</p>
						<div class="m-3 grid max-h-[600px] grid-cols-3 overflow-y-scroll">
							{#each pokemonList as pokemon, index}
								<button
									class={'card m-1 h-12 items-center justify-center bg-slate-700 p-1 ' +
										(profile.pokemon_ids.includes(index + 1) ? 'border-2 border-blue-600' : '')}
								>
									<div class="text-center">
										<h2 class="text-hl text-white">{pokemon.name}</h2>
									</div>
								</button>
							{/each}
						</div>
					</div>
				</dialog>
			{/if}
		</div>
	</div>
</div>
