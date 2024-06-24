// import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from "$env/static/public";
const { VITE_PUBLIC_SUPABASE_URL: PUBLIC_SUPABASE_URL, VITE_PUBLIC_SUPABASE_ANON_KEY: PUBLIC_SUPABASE_ANON_KEY } = import.meta.env;

import {createBrowserClient, isBrowser, parse } from "@supabase/ssr"
import type { LayoutLoad } from "./$types"

export const ssr = false;

export const load: LayoutLoad = async ({ fetch, data, depends }: any) => {
    depends('supabase:auth')

    const supabase = createBrowserClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
        global: {
            fetch
        },
        cookies: {
            get(key) {
                // if server, do smthn
                if(!isBrowser()) {
                    return JSON.stringify(data.session)
                }

                // if browser, something else
                const cookie = parse(document.cookie)
                return cookie[key]
            }
        }
    })

    const {
        data: { session }
    } = await supabase.auth.getSession();

    return { supabase, session }
}