import { createBrowserClient, isBrowser, parse } from "@supabase/ssr";
var define_import_meta_env_default = { VITE_PUBLIC_SUPABASE_URL: "https://isuignjzcwadqwqqhgqp.supabase.co", VITE_PUBLIC_SUPABASE_ANON_KEY: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlzdWlnbmp6Y3dhZHF3cXFoZ3FwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTkxMzc4NzksImV4cCI6MjAzNDcxMzg3OX0.Xe-f6RD1Bvd6u8ytymTlVym73Wa5HUTqHK9CBDJrXU8", BASE_URL: "/", MODE: "production", DEV: false, PROD: true, SSR: true };
const { VITE_PUBLIC_SUPABASE_URL: PUBLIC_SUPABASE_URL, VITE_PUBLIC_SUPABASE_ANON_KEY: PUBLIC_SUPABASE_ANON_KEY } = define_import_meta_env_default;
const ssr = false;
const load = async ({ fetch, data, depends }) => {
  depends("supabase:auth");
  const supabase = createBrowserClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
    global: {
      fetch
    },
    cookies: {
      get(key) {
        if (!isBrowser()) {
          return JSON.stringify(data.session);
        }
        const cookie = parse(document.cookie);
        return cookie[key];
      }
    }
  });
  const {
    data: { session }
  } = await supabase.auth.getSession();
  return { supabase, session };
};
export {
  load,
  ssr
};
