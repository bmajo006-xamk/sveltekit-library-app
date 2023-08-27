<script lang="ts">
    import { goto } from '$app/navigation';
    import kirjasto from '$lib/img/kirjat.jpg';
    import "../app.css";

    const handleLainaus = () => {

        goto('/lainaus');
    }
    const siirryPalautukseen = () => {
        goto('/palautus');
    }
    const siirryOmiinTietoihin = () => {
        goto('/myaccount');
    }
</script>
<div class="">
    <div class="md:px-40 md:mt-10 md:mb-6">
        <img src={kirjasto} alt="Kirjat" />
    </div>
    <div class="mx-auto">
        <div class="text-center bg-stone-500 w-full h-20 flex justify-center items-center">
            <h1 class="md:text-3xl font-bold text-black"> KIRJASTON LAINAUS- JA PALAUTUSAUTOMAATTI</h1>
        </div>
        <div class="flex flex-row md:gap-20 gap-9 md:p-6 p-3 justify-center">
            <div class="md:w-72 md:h-48 w-48 h-20 bg-stone-500 flex justify-center items-center">
                <button class="md:text-2xl text-black" on:click={handleLainaus}>Lainaus</button>
            </div>
            <div class="md:w-72 md:h-48 w-48 h-20 bg-stone-500 flex justify-center items-center">
                <button class="md:text-2xl text-black" on:click={siirryPalautukseen}>Palautus</button>
            </div>
            <div class="md:w-72 md:h-48 w-48 h-20 bg-stone-500 flex justify-center items-center">
                <button class="md:text-2xl text-black" on:click={siirryOmiinTietoihin}>Omat tiedot</button>
            </div>
        </div>
    </div>
</div>
