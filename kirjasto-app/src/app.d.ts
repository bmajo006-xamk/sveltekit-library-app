// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			asiakas: {
				asiakasnro: number
				sukunimi:   string
				etunimi:  string
				katuosoite: string
				postinro:   string
				postitmp: string
				puh: string
				
		}
		// interface PageData {}
		// interface Platform {}
	}
	}
}

export {};
