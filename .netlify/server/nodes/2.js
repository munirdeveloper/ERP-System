

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/2.FlhIAA2l.js","_app/immutable/chunks/scheduler.BvblBlQa.js","_app/immutable/chunks/index.CbVHyh7v.js"];
export const stylesheets = [];
export const fonts = [];
