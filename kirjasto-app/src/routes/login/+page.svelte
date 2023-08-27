<script lang="ts">
    import { goto } from '$app/navigation';
    import type { ActionData } from './$types';
    


    export let form: ActionData;
    const peruuta = () => {
        goto("/");
    }




  
  

</script>

<div class="flex flex-col justify-center items-center">
    <div class="bg-stone-400 w-full h-32 flex justify-center items-center">
        <h1 class="md:text-3xl font-bold text-black">KIRJAUTUMINEN</h1>
    </div>
    <div class="bg-stone-300 p-6 md:w-[300px] w-[240px] h-[380px] justify-center items-center sm:min-w-lg">
        <form method="POST" action="/login">
            <div class="mt-6 h-2/5">
                <label class="text-black md:text-xl text-lg" for="asiakasnumero">Kirjastokortin numero:</label>
                    <input 
                    name="asiakasnumero"
                    type="text"
                    placeholder="Kirjastokortin numero" 
                    class="input input-bordered w-full" />
                    {#if form?.credentials}
                        <p class="error text-rose-500">Kirjastokortin numero on väärin</p>
                    {/if}
            </div>
            <div class="mt-9 h-3/5">
            <button type="submit" class="btn w-full mb-3 rounded-md">Kirjaudu</button>
            </div>
        </form>
            <button on:click={peruuta} class="btn btn-outline w-full rounded-md">Peruuta</button>
    </div>
  
</div>
<style>
    @import 'tailwindcss/base';
    @import 'tailwindcss/components';
    @import 'tailwindcss/utilities';
</style>

