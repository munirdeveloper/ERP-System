<script>
	export let data;
	import '../app.css';
	import { goto, invalidateAll } from '$app/navigation';
	import { Auth } from '@supabase/auth-ui-svelte';
	import { ThemeSupa } from '@supabase/auth-ui-shared';

	let { supabase, session } = data;
	$: ({ supabase, session } = data);

	// session is null = no user, if its not null = we have a user

	supabase.auth.onAuthStateChange(async (event, session) => {
		if (event === 'SIGNED_IN') {
			invalidateAll();
		}
		if (event === 'SIGNED_OUT') {
			await goto('login');
			invalidateAll();
		}
	});
</script>

<div class="top-0 w-full bg-gray-900">
	<div class="navbar container mx-auto flex items-center justify-between px-6 py-4">
		<div class="flex items-center space-x-4">
			{#if session === null}
				<a href="/" class="text-xl font-bold text-white hover:text-gray-300">Pokemoons</a>
			{/if}
			{#if session !== null}
				<a href="/{session.user.email}" class="text-xl font-bold text-white hover:text-gray-300"
					>My Pokemoons</a
				>
			{/if}
		</div>
		<div class="flex items-center space-x-4">
			{#if session == null}
				<button
					on:click={() => goto('/login')}
					class="rounded px-8 py-2 text-white hover:text-gray-300">Login</button
				>
			{:else}
				<span class="ml-2 text-lg text-white">{session.user.email}</span>
				<button
					class="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
					on:click={async () => {
						await supabase.auth.signOut();
					}}>Logout</button
				>
			{/if}
		</div>
	</div>
</div>


<slot></slot>
