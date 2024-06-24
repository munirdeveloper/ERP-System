import { c as create_ssr_component } from "../../chunks/ssr.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div class="hero bg-black min-h-screen" data-svelte-h="svelte-19prud"><div class="hero-content"><div class="max-w-md text-center"><h1 class="text-4xl font-bold text-white">Welcome to Pokemoon</h1> <p class="py-6 text-white">A website to show-off and store your favourite Pokemons.</p> <a href="/login" class="btn btn-primary">Create an Account</a></div></div></div>`;
});
export {
  Page as default
};
