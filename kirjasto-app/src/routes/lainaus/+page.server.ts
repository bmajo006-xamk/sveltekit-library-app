import type { Actions } from './$types';
import type { PageServerLoad } from './$types';
import prisma from '$lib/prisma';
import niteetStore from '../../Store';
import { redirect } from '@sveltejs/kit';

let niteet : any;
export const load : PageServerLoad = async ({ locals, cookies} : any) => {
  
  if (!locals.asiakas){
    throw redirect(303,'/login');
 }
  
 const asiakas = locals.asiakas;
  
  niteetStore.subscribe((data) => {
    niteet = data;
  })
  const lainaustiedot = await prisma.lainat.findMany({
    where : {
      asiakasnro : asiakas.asiakasnro,
      palautettu : false,
      nide_id : {
        in : niteet
      }
    }
  })
  return {
    asiakas,
    lainaustiedot
  }
}

export const actions : Actions = {
    default : async ({ cookies, request, locals }) => {
      const asiakas = locals.asiakas;
      const formData = await request.formData();
      const nide = formData.get('nideid');

      //varmistetaan ensin, että asiakaalta ei löydy samaa nidettä jo lainattuna (eli nide täsmää ja teosta ei ole palautettu)
      const tarkistus = await prisma.lainat.findFirst({
        where : {
          nide_id : Number(nide),
          palautettu : false
        }
      })
      //ja varmistetaan, että teos löytyy
      const teos = await prisma.niteet.findFirst({
        where: {
        nide_id : Number(nide)
    }
    })

      if (!tarkistus && teos){
    
                let palautus_pvm = new Date();
                palautus_pvm.setDate(palautus_pvm.getDate() + teos!.lainaaika_vrk);
                if (teos) {
                  const teosTiedot = await prisma.teokset.findFirst({
                    where: {
                      teos_id : teos.teos_id
                    }
                })
                
                let laina = await prisma.lainat.create({
                  data: {
                    asiakasnro : asiakas.asiakasnro,
                    teos_id : teosTiedot!.teos_id,
                    luokka : teosTiedot!.luokka,
                    kirjoittaja : teosTiedot!.kirjoittaja,
                    nimike : teosTiedot!.nimike,
                    tyyppi : teos!.tyyppi,
                    nide_id : teos!.nide_id,
                    palautus_pvm : palautus_pvm

                }
                })
                niteetStore.update((currentData : number[]) => {
                  return [...currentData, laina.nide_id]
              })
              }
        return {success : true}
      } else {
        return {
            success: false,
            message: "Nide on jo lainattu, tai nidettä ei löydy"
      }


      }

    }
}
