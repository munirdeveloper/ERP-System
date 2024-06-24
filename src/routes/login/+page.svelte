<script lang="ts">
	export let data;
	import { Auth } from '@supabase/auth-ui-svelte';
	import { ThemeSupa } from '@supabase/auth-ui-shared';
	import { goto } from '$app/navigation';

	let { supabase, session } = data;
	$: ({ supabase, session } = data);

	console.log(supabase);
	console.log(session);
	$: if (session) {
		goto('/${session.user.email}');
	}
</script>

<div class="hero flex min-h-screen items-center justify-center bg-black">
	<div class="hero-content max-w-screen-md">
		<div class="flex flex-col items-center text-white">
			<p class="mb-4">Create an account or login below!</p>
			<Auth
				supabaseClient={supabase}
				theme="dark"
				appearance={{
					theme: ThemeSupa,
					style: {
						input: 'w-full' // Adjust input width to full width
					}
				}}
			/>
		</div>
	</div>
</div>
