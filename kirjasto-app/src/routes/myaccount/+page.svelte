<script lang="ts">
    import { page } from '$app/stores';
    import { goto } from '$app/navigation';

    const lainaustiedot = $page.data.lainaustiedot;
    const lainat_maara = $page.data.lainat_maara;
    const asiakas = $page.data.asiakastiedot;
    const myohastyneet = $page.data.myohastyneet_lainat;

    const muokkaaErapaivaa = (erapaiva : Date) => {

        const vuosi = erapaiva.getFullYear();
        const kk = erapaiva.getMonth() +1;
        const paiva = erapaiva.getDate();
        const palautuspaiva = paiva.toString().padStart(2, "0") + "-" + kk.toString().padStart(2, "0") + "-" + vuosi; 

        return palautuspaiva;
    }
    const muutaPaiva = (erapaiva : any) => {
        const vuosi = erapaiva.getFullYear();
        const kk = erapaiva.getMonth() +1;
        const paiva = erapaiva.getDate();
        const paiva_muutettu = paiva.toString().padStart(2, "0") + "-" + kk.toString().padStart(2, "0") + "-" + vuosi; 

        return paiva_muutettu
    }

    const maksut_yhteensa = () => {
        let lainat = 0;
        myohastyneet.map((laina : any) => {
            lainat += laina.myohastymismaksu

        })
        return lainat;
    }
    const etusivulle= () => {
        goto("/myaccount/logout");
    }

  

</script>


<input type="checkbox" id="my-modal" class="modal-toggle" />
<form class="modal" method="POST" action="/myaccount">
  <div class="modal-box">
    <div>
        <h3 class="font-bold text-lg">Muokkaa yhteystietojasi</h3>
        <h2 class="py-4">Anna uudet tiedot, ja paina tallenna</h2>
    </div>
    <div class="form-group">
        <label class="col-md-3 control-label" for="etunimi">Etunimi</label>
        <div class="col-md-9">
            <input
                id="etunimi"
                name="etunimi"
                type="text"
                placeholder="Nimesi"
                class="form-control"
                value={asiakas?.etunimi}
            />
        </div>
    </div>
    <div class="form-group">
        <label class="col-md-3 control-label" for="sukunimi">Sukunimi</label>
        <div class="col-md-9">
            <input
                    id="sukunimi"
                    name="sukunimi"
                    type="text"
                    placeholder="Sukunimesi"
                    class="form-control"
                    value={asiakas?.sukunimi}
                />
        </div>
    </div>
    <div class="form-group">
        <label class="col-md-3 control-label" for="katuosoite">Katuosoite</label>
        <div class="col-md-9">
            <input
                id="katuosoite"
                name="katuosoite"
                type="text"
                class="form-control"
                value={asiakas?.katuosoite || ""}
            />
        </div>
    </div>
    <div class="form-group">
        <label class="col-md-3 control-label" for="katuosoite">Postinro</label>
        <div class="col-md-9">
            <input
                id="postinro"
                name="postinro"
                type="text"
                class="form-control"
                value={asiakas?.postinro || ""}
            />
        </div>
    </div>
    <div class="form-group">
        <label class="col-md-3 control-label" for="katuosoite">Postitoimipaikka</label>
        <div class="col-md-9">
            <input
                id="postitoimipaikka"
                name="postitoimipaikka"
                type="text"
                class="form-control"
                value={asiakas?.postitmp || ""}
            />
        </div>
    </div>
    <div class="form-group">
        <label class="col-md-3 control-label" for="katuosoite">Puhelinnumero</label>
        <div class="col-md-9">
            <input
                id="puhelinnro"
                name="puhelinnro"
                type="text"
                class="form-control"
                value={asiakas?.puh || ""}
            />
        </div>
    </div>
    <div class="modal-action float-left">
      <label for="my-modal" class="btn"><button type="submit">Tallenna</button></label>
      <label for="my-modal" class="btn btn-outlined bg-stone-400 text-black"><button>Peruuta</button></label>
    </div>
  </div>
</form>



<div class="flex flex-col justify-center items-center bg-stone-800 pb-10">
    <div class="bg-stone-400 w-full h-32 flex justify-center items-center mb-10">
        <h1 class="md:text-3xl font-bold text-black">Omat tiedot</h1>
    </div>
    <div class="text-center lg:text-xl">
        <div>
            <h2>{asiakas.sukunimi}, {asiakas.etunimi}</h2>
            <p>{asiakas.katuosoite}</p>
            <p>{asiakas.postinro} {asiakas.postitmp}</p>
            <p>{asiakas.puh}</p>
            <label for="my-modal" class="btn rounded-xs mt-3 bg-green-300 text-black">Muokkaa tietoja</label>
        </div>
    </div>
    <div>
    {#if lainaustiedot.length > 0}
    <div>
        <h1 class="text-2xl">Lainat</h1>
    </div>
    <table class="p-4 mb-4">
        <tr>
            <th class="text-left text-black bg-stone-400">{lainat_maara} laina(a)</th>
        </tr>
        <tr>
            <th class="md:w-[180px] bg-stone-300 text-left text-black border-2 border-slate-400">Hyllypaikka</th>
            <th class="md:w-[180px] bg-stone-300 text-left text-black border-2 border-slate-400">Kirjoittaja</th>
            <th class="md:w-[260px] bg-stone-300 text-left text-black border-2 border-slate-400">Teos</th>
            <th class="md:w-[180px] bg-stone-300 text-left text-black border-2 border-slate-400">Nide</th>
            <th class="md:w-[180px] bg-stone-300 text-left text-black border-2 border-slate-400">Nidetyyppi</th>
            <th class="md:w-[180px] bg-stone-300 text-left text-black border-2 border-slate-400">Tila</th>
        </tr>
        {#each lainaustiedot as lainaus}
        <tr class="md:min-w-[1160px]">
            <td>{lainaus.luokka}</td>
            <td>{lainaus.kirjoittaja}</td>
            <td>{lainaus.nimike}</td>
            <td>{lainaus.nide_id}</td>
            <td>{lainaus.tyyppi}</td>
            <td>ERÄPÄIVÄ {muokkaaErapaivaa(lainaus.palautus_pvm)}</td>
        </tr>
        {/each}
    </table>
    {#if myohastyneet.length }
    <div>
        <div>
            <h1 class="text-2xl">Myöhästymismaksut</h1>
        </div>
        <table class="p-4 mb-4">
            <tr>
                <th class="md:w-[180px] bg-stone-300 text-left text-black border-2 border-slate-400">Kirjoittaja</th>
                <th class="md:w-[260px] bg-stone-300 text-left text-black border-2 border-slate-400">Teos</th>
                <th class="md:w-[180px] bg-stone-300 text-left text-black border-2 border-slate-400">Nide</th>
                <th class="md:w-[180px] bg-stone-300 text-left text-black border-2 border-slate-400">Lainattu</th>
                <th class="md:w-[180px] bg-stone-300 text-left text-black border-2 border-slate-400">Eräpäivä</th>
                <th class="md:w-[180px] bg-stone-300 text-left text-black border-2 border-slate-400">Myöhästymismaksu</th>
            </tr>
            {#each myohastyneet as myohastynyt}
            <tr class="md:min-w-[1160px]">
                <td>{myohastynyt.kirjoittaja}</td>
                <td>{myohastynyt.nimike}</td>
                <td>{myohastynyt.tyyppi}</td>
                <td>{muutaPaiva(myohastynyt.lainaus_pvm)}</td>
                <td>{muutaPaiva(myohastynyt.palautus_pvm)}</td>
                <td>{myohastynyt.myohastymismaksu}€</td>
            </tr>
            {/each}
            <tr class="full-w">
                <h3>Myöhästymismaksut yhteensä {maksut_yhteensa()}€</h3>
            </tr>
        </table>
    </div>
    {:else}
    <div>Ei myöhästymismaksuja</div>
    {/if}
    {:else}
    <div class="text-2xl font-semibold p-4">Ei lainoja</div>
    {/if}
    </div>
   
    <form action="/myaccount/logout" method="POST">
        <button class="btn w-[400px] rounded-xs mt-3 bg-stone-400 text-black" on:click={etusivulle} type="submit">Etusivulle</button>
    </form>
</div>
<style>
    @import 'tailwindcss/base';
    @import 'tailwindcss/components';
    @import 'tailwindcss/utilities';
</style>