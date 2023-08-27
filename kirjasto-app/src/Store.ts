import { writable } from "svelte/store";

export const niteetStore = writable<number[]>([]);
export const palautuksetStore = writable<any[]>([]);


export default niteetStore;