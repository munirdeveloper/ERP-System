import { c as create_ssr_component, e as escape } from "../../chunks/ssr.js";
import { i as invalidateAll, g as goto } from "../../chunks/client.js";
import "@supabase/auth-ui-shared";
/* empty css                                                   */
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  let { supabase, session } = data;
  supabase.auth.onAuthStateChange(async (event, session2) => {
    if (event === "SIGNED_IN") {
      invalidateAll();
    }
    if (event === "SIGNED_OUT") {
      await goto();
      invalidateAll();
    }
  });
  if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
  ({ supabase, session } = data);
  return `<div class="top-0 w-full bg-gray-900"><div class="navbar container mx-auto flex items-center justify-between px-6 py-4"><div class="flex items-center space-x-4">${session === null ? `<a href="/" class="text-xl font-bold text-white hover:text-gray-300" data-svelte-h="svelte-bdu0ky">Pokemoons</a>` : ``} ${session !== null ? `<a href="${"/" + escape(session.user.email, true)}" class="text-xl font-bold text-white hover:text-gray-300">My Pokemoons</a>` : ``}</div> <div class="flex items-center space-x-4">${session == null ? `<button class="rounded px-8 py-2 text-white hover:text-gray-300" data-svelte-h="svelte-1ss3hqa">Login</button>` : `<span class="ml-2 text-lg text-white">${escape(session.user.email)}</span> <button class="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600" data-svelte-h="svelte-z0zjv">Logout</button>`}</div></div></div> ${slots.default ? slots.default({}) : ``}`;
});
export {
  Layout as default
};
