<script lang="ts">
    import { goto } from '$app/navigation';
    import { page } from '$app/stores';
    import type { ActionData } from './$types';
    import { palautuksetStore } from '../../Store';
    export let form : ActionData;


    let palautukset = $page.data.palautukset;  

    const navigoiEtusivulle = () => {
        etusivulle();
        
    }
    const etusivulle = () => {
        goto('/');
    }
    const muutaPalautusPaiva = (erapaiva : any) => {
        const vuosi = erapaiva.getFullYear();
        const kk = erapaiva.getMonth() +1;
        const paiva = erapaiva.getDate();
        const palautuspaiva = paiva.toString().padStart(2, "0") + "-" + kk.toString().padStart(2, "0") + "-" + vuosi; 

        return palautuspaiva;
    }


</script>
<div class="flex flex-col justify-center items-center bg-stone-800 pb-9">
    <div class="bg-stone-400 w-full h-32 flex justify-center items-center">
        <h1 class="md:text-3xl font-bold text-black">PALAUTUS</h1>
    </div>
    <div class="bg-stone-500 p-6 md:w-[300px] w-[240px] h-[380px] justify-center items-center sm:min-w-lg mb-3">
        <form method="POST" action="palautus">
            <div class="mt-6 h-2/5">
                <label for="nideid" class="text-black md:text-xl text-lg">Palautettava nide:</label>
                <input
                    type="text"
                    name="nideid"
                    placeholder="Niteen id"
                    class="input input-bordered w-full"
                    />
            </div>
            <div class="mt-12 h-3/5">
                {#if form?.message}
                    <p class="error text-rose-500">{form?.message}</p>
                {/if}
                <button class="btn w-full mb-3 rounded-md" type="submit">Palauta</button>
            </div>
        </form>
        <button class="btn w-full btn-outline  mb-3 rounded-md" on:click={navigoiEtusivulle}>Valmis</button>
    </div>
    
    {#if palautukset.length > 0}
    <table class="mt-5">
        <tr>
            <th class="md:min-w-[180px] bg-stone-300 text-left text-black border-2 border-slate-400">Palautuspäivämäärä</th>
            <th class="md:min-w-[180px] bg-stone-300 text-left text-black border-2 border-slate-400">Kirjoittaja</th>
            <th class="md:min-w-[260px] bg-stone-300 text-left text-black border-2 border-slate-400">Teos</th>
            <th class="md:min-w-[180px] bg-stone-300 text-left text-black border-2 border-slate-400">Nidetyyppi</th>
            <th class="md:min-w-[180px] bg-stone-300 text-left text-black border-2 border-slate-400">Tila</th>
        </tr>
        {#each palautukset as palautus}
        <tr>
            <td>{muutaPalautusPaiva(palautus.palautettu_pvm)}</td>
            <td>{palautus.kirjoittaja}</td>
            <td>{palautus.nimike}</td>
            <td>{palautus.tyyppi}</td>
            {#if palautus.myohastynyt_pv > 0}
                <td>Palautus oli myöhässä {palautus.myohastynyt_pv} päivää</td>
            {/if} 
        </tr>
        {/each}
    </table>
    {/if}
</div>
<style>
    @import 'tailwindcss/base';
    @import 'tailwindcss/components';
    @import 'tailwindcss/utilities';
</style>