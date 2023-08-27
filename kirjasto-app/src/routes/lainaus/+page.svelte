<script lang="ts">
    import { page } from '$app/stores';
    import { goto } from '$app/navigation';
    import type { ActionData } from './$types';
    import niteetStore from '../../Store';

    let lainaustiedot = $page.data.lainaustiedot;
    let asiakas = $page.data.asiakas;

    
  
    
    export let form : ActionData;
    niteetStore.subscribe((data) => {
        console.log(data);

    })

    const tulostaKuitti = () => {
        //tulostetaan kaikki niteet
        console.log(asiakas.etunimi + " " + asiakas.sukunimi + ". " +  asiakas.katuosoite + " " + asiakas.postitmp + ". " + "Puh: " + asiakas.puh);
        console.log("Laina(t):")
        lainaustiedot.map((lainaus : any, key: number) => {
            return (
                console.log(muutaLainapaiva(lainaus.lainaus_pvm) + ". " + lainaus.luokka + ". " + lainaus.kirjoittaja + ". " + lainaus.nimike + ". " + " Eräpäivä: " +muutaErapaiva(lainaus.palautus_pvm) )
            )
        })
        goto("/logout");
        //tyhjennetään niteet
        niteetStore.update(() => {
            return []
        })
    }
    const kirjauduUlosIlmanKuittia = () => {
        goto("/logout");
        //tyhjennetään niteet
        niteetStore.update((currentData) => {
            return []
        })
    }
    const muutaErapaiva = (erapaiva : Date) => { 
        const vuosi = erapaiva.getFullYear();
        const kk = erapaiva.getMonth() +1;
        const paiva = erapaiva.getDate();
        const palautuspaiva = paiva.toString().padStart(2, "0") + "-" + kk.toString().padStart(2, "0") + "-" + vuosi; 
        return palautuspaiva;
    }
    const muutaLainapaiva = (lainapaiva : Date) => {

        const vuosi = lainapaiva.getFullYear();
        const kk = lainapaiva.getMonth() +1;
        const paiva = lainapaiva.getDate();
        const lainauspaiva = paiva.toString().padStart(2, "0") + "-" + kk.toString().padStart(2, "0") + "-" + vuosi;

        return lainauspaiva;
    }
</script>

<div class="flex flex-col justify-center items-center bg-stone-800 pb-9">
    <div class="bg-stone-400 w-full h-32 flex flex-col justify-center items-center">
            <h1 class="md:text-3xl font-bold text-black">LAINAUS</h1>     
            <h2 class="text-black text-xl">Tervetuloa lainaamaan, {$page.data.etunimi} {$page.data.sukunimi}!</h2>
    </div>
    <div class="bg-stone-500 p-6 md:w-[300px] w-[240px] h-[380px] justify-center items-center sm:min-w-lg mb-6">
        <form method="POST" action="/lainaus">     
        <div class="mt-6 h-2/5">   
            <label for="nideid" class="text-black md:text-xl text-lg">Lainattava nide:</label>
            <input
                name="nideid"
                type="text"
                class="input input-bordered w-full"
            />
        </div>
        {#if form?.message}
        <p class="error text-rose-500">{form?.message}</p>
        {/if}
        <div class="mt-3 h-3/5">
            <button class="bg-green-300 btn w-full mb-3 rounded-md" type="submit">Lisää</button>
        </div>
        </form>
        <div class="flex flex-col float-left pr-3">
            <form action="/logout" method="POST">
                <button class="btn bg-stone-400 w-full mb-2" on:click={tulostaKuitti} type="submit">Valmis, tulosta kuitti</button>
            </form>
            <form action="/logout" method="POST">
                <button class="btn w-full btn-outline rounded-md mb-2" on:click={kirjauduUlosIlmanKuittia} type="submit">Valmis, ei kuittia</button>
            </form>
    </div>
</div>
    
        {#if lainaustiedot.length > 0}
        <table class="mt-3">
            <tr>
                <th class="md:min-w-[180px] bg-stone-300 text-left text-black border-2 border-slate-400">Hyllypaikka</th>
                <th class="md:min-w-[180px] bg-stone-300 text-left text-black border-2 border-slate-400">Kirjoittaja</th>
                <th class="md:min-w-[260px] bg-stone-300 text-left text-black border-2 border-slate-400">Teos</th>
                <th class="md:min-w-[180px] bg-stone-300 text-left text-black border-2 border-slate-400">Nidetyyppi</th>
                <th class="md:min-w-[180px] bg-stone-300 text-left text-black border-2 border-slate-400">Tila</th>
    
            </tr>
            {#each lainaustiedot as laina}
            <tr class="opacity-50">
                <td class="">{laina.luokka}</td>
                <td>{laina.kirjoittaja}</td>
                <td>{laina.nimike}</td>
                <td>{laina.tyyppi}</td>
                <td>ERÄPÄIVÄ {muutaErapaiva(laina.palautus_pvm)}</td>
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