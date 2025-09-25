
// this file is generated — do not edit it


declare module "svelte/elements" {
	export interface HTMLAttributes<T> {
		'data-sveltekit-keepfocus'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-noscroll'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-preload-code'?:
			| true
			| ''
			| 'eager'
			| 'viewport'
			| 'hover'
			| 'tap'
			| 'off'
			| undefined
			| null;
		'data-sveltekit-preload-data'?: true | '' | 'hover' | 'tap' | 'off' | undefined | null;
		'data-sveltekit-reload'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-replacestate'?: true | '' | 'off' | undefined | null;
	}
}

export {};


declare module "$app/types" {
	export interface AppTypes {
		RouteId(): "/" | "/basic-viewer" | "/custom-overlays" | "/magazine-mode";
		RouteParams(): {
			
		};
		LayoutParams(): {
			"/": Record<string, never>;
			"/basic-viewer": Record<string, never>;
			"/custom-overlays": Record<string, never>;
			"/magazine-mode": Record<string, never>
		};
		Pathname(): "/" | "/basic-viewer" | "/basic-viewer/" | "/custom-overlays" | "/custom-overlays/" | "/magazine-mode" | "/magazine-mode/";
		ResolvedPathname(): `${"" | `/${string}`}${ReturnType<AppTypes['Pathname']>}`;
		Asset(): string & {};
	}
}