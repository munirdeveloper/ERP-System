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

<div class="bg-base-100 fixed left-0 right-0 top-0 justify-between">
	<div class="navbar mx-auto max-w-3xl justify-between">
		<div>
			<a href="/" class="btn btn-ghost text-xl">Armada Inc</a>
			{#if session !== null}
				<a href="/{session.user.email}" class="btn btn-ghost">My Page</a>
				<a href="/inventory" class="btn btn-ghost">Inventory</a>		 
			{/if}
		</div>
		<div>
			{#if session == null}
				<button on:click={() => goto('/login')}>Login</button>
			{:else}
				<span class="ml-2 text-lg text-white">{session.user.email}</span>
				<button
					class="btn btn-ghost ml-2"
					on:click={async () => {
						await supabase.auth.signOut();
					}}>Logout</button
				>
			{/if}
		</div>
	</div>
</div>

<slot></slot>
