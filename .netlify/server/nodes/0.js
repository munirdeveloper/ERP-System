import * as universal from '../entries/pages/_layout.ts.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.ts";
export const imports = ["_app/immutable/nodes/0.Crehiwcu.js","_app/immutable/chunks/preload-helper.D6kgxu3v.js","_app/immutable/chunks/scheduler.BvblBlQa.js","_app/immutable/chunks/index.CbVHyh7v.js","_app/immutable/chunks/entry.BUGCG_Vy.js"];
export const stylesheets = ["_app/immutable/assets/0.3ZfTUn43.css","_app/immutable/assets/VerifyOtp.CntNWclL.css"];
export const fonts = [];
