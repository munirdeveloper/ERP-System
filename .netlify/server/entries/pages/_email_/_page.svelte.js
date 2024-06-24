import { c as create_ssr_component, b as subscribe, e as escape, j as each, i as add_attribute } from "../../../chunks/ssr.js";
import { p as page } from "../../../chunks/stores.js";
const POKEMON_API = "https://pokeapi.co/api/v2/";
async function getPokemonList() {
  const response = await fetch(POKEMON_API + "pokemon?limit=151&offset=0");
  const data = await response.json();
  return data.results;
}
async function getPokemon(name) {
  const response = await fetch(POKEMON_API + "pokemon/" + name);
  const data = await response.json();
  return data;
}
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let email;
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let { data } = $$props;
  let { supabase, session } = data;
  let pokemonList = [];
  let pokemonData = [];
  let profile = {
    description: "This is your pokemon description.",
    pokemon_ids: [1, 2, 5]
  };
  let searchInput = "";
  async function refreshPokemonData() {
    pokemonData = [];
    profile.pokemon_ids.map(async (id) => {
      const data2 = await getPokemon(id.toString());
      if (pokemonData === void 0) {
        pokemonData = [data2];
      } else {
        pokemonData = [...pokemonData, data2];
      }
    });
  }
  async function saveProfile() {
    const { data: profileData, error: profileError } = await supabase.from("profiles").select("*").eq("email", email);
    if (profileData?.length === 0) {
      await supabase.from("profiles").insert({
        ...profile,
        user_id: session?.user?.id,
        email: session?.user?.email
      });
    } else {
      await supabase.from("profiles").update(profile).eq("user_id", session?.user?.id);
    }
  }
  page.subscribe(async () => {
    pokemonList = await getPokemonList();
    const { data: profileData, error: profileError } = await supabase.from("profiles").select("description, pokemon_ids").eq("email", email);
    if (profileData?.length == 0 && email == session?.user.email) {
      console.log("Save profile");
      await saveProfile();
    } else if (profileData != null && profileData.length > 0) {
      profile = profileData[0];
    } else {
      console.log("NO Profile");
      profile = {
        description: "This user does not have a profile yet!",
        pokemon_ids: []
      };
    }
    await refreshPokemonData();
  });
  if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
  ({ supabase, session } = data);
  email = $page.params.email;
  $$unsubscribe_page();
  return ` <div class="min-h-screen bg-gray-300 pt-20"> <div class="container mx-auto p-4"> <div class="mx-auto max-w-2xl text-center"><h1 class="text-4xl font-bold text-black">${escape(email)}&#39;s Page</h1> <p class="mx-auto max-w-md py-3 text-lg md:text-xl lg:text-2xl">${escape(profile.description)}</p> <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">${pokemonData === void 0 ? `<p data-svelte-h="svelte-120xwa6">Loading ...</p>` : `${each(pokemonData, (pokemon) => {
    return `<div class="card m-4 bg-slate-700 shadow-lg shadow-blue-900"><div class="card-body"><div class="text-center"><img${add_attribute("src", pokemon.sprites.front_default, 0)} alt="Pokemon" class="mx-auto h-32 w-32"> <h2 class="text-2xl font-bold text-white">${escape(pokemon.name)}</h2> <p class="text-info">${escape(pokemon.types[0].type.name)}</p> </div></div> </div>`;
  })}`}</div> ${email == session?.user?.email ? `<button class="btn btn-info" data-svelte-h="svelte-jlk1ow">Edit Page</button>  <dialog class="${["modal min-w-lg", ""].join(" ").trim()}"><div class="modal-box bg-gray-900 p-4 text-white"><h3 class="mb-4 text-2xl font-bold" data-svelte-h="svelte-fengc9">Edit Your PokePage</h3> <p class="mb-4 text-lg" data-svelte-h="svelte-1boqq5w">Here you can make edits to your page, such as description or pokemon selected</p> <p class="p-2 text-white" data-svelte-h="svelte-196134k">Edit your description</p> <textarea class="text-area textarea-bordered textarea-lg h-[300px] w-full max-w-md" placeholder="Enter your description here...">${escape(profile.description || "")}</textarea> <p class="p-2 text-white" data-svelte-h="svelte-1bxpu5t">Select your pokemon</p> <div class="m-3 grid max-h-[600px] grid-cols-3 overflow-y-scroll"><div class="col-span-3"><input type="text" class="input input-bordered w-full" placeholder="Search for a pokemon!"${add_attribute("value", searchInput, 0)}></div> ${each(pokemonList, (pokemon, index) => {
    return `${pokemon.name.includes(searchInput) ? `<button${add_attribute(
      "class",
      "card m-1 h-12 items-center justify-center bg-slate-700 p-1 " + (profile.pokemon_ids.includes(index + 1) ? "border-2 border-blue-600" : ""),
      0
    )}><div class="text-center"><h2 class="text-hl text-white">${escape(pokemon.name)}</h2></div> </button>` : ``}`;
  })}</div> <button class="btn btn-success mt-4" data-svelte-h="svelte-1diav1r">Save Edits</button></div></dialog>` : ``}</div></div></div>`;
});
export {
  Page as default
};
