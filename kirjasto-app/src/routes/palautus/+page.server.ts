/** @type {import('./$types').PageServerLoad} */
/**@type {import('./$types').Actions} */
import prisma from '$lib/prisma';
import { palautuksetStore } from '../../Store.js';


let palautukset : any;
export const load = async() => {

    palautuksetStore.subscribe((data) => {
         palautukset = data;
    })
    return {
        palautukset
      
    }
    
}
export const actions = {

    default: async({ request } : any) => {
        const formData = await request.formData();
        let nide = formData.get('nideid');

        let palautettava_laina = await prisma.lainat.findFirst({
            where : {
                nide_id : Number(nide),
                palautettu : false
            }
        });
       
      
 

        if (palautettava_laina) {

            let tanaan = new Date();
            console.log(tanaan);
            const onkoLainaMyohassa = (pvm_tanaan : any, palautuspvm : Date ) => {
                if (palautuspvm < pvm_tanaan) {
                    const myohastyminen_sekunnit = Math.abs(pvm_tanaan.getTime() - palautuspvm.getTime());
                    const myohastyminen_paivat = Math.floor(myohastyminen_sekunnit / (1000 * 60 * 60 * 24));
                    return myohastyminen_paivat;
                } else {
                    return 0
                }
            }
          
                let myohastymispaivat : any = onkoLainaMyohassa(tanaan, palautettava_laina!.palautus_pvm);
                let maksu : number = ((myohastymispaivat * 0.3) > 6) ? 6 : (myohastymispaivat * 0.3);
            
            await prisma.lainat.update({
            where : {
                laina_id : palautettava_laina.laina_id
                },
            data : {
                palautettu : true,
                myohastymismaksu : maksu,
                myohastynyt_pvt : myohastymispaivat

            }
        })
    
            let palautus =  await prisma.palautukset.create({
                data: {
                    laina_id : palautettava_laina.laina_id,
                    asiakasnro : palautettava_laina.asiakasnro,
                    teos_id : palautettava_laina.teos_id,
                    luokka : palautettava_laina.luokka,
                    kirjoittaja : palautettava_laina.kirjoittaja,
                    nimike : palautettava_laina.nimike,
                    tyyppi : palautettava_laina.tyyppi,
                    nide_id : palautettava_laina.nide_id,
                    myohastynyt_pv : myohastymispaivat                    
                }
            })

            //jos nide löytyy, muutetaan lainoissa laina palautetuksi

    







            palautukset.push(palautus);
        } 
        else {
            return{
                success: false,
                message: "Nide on jo palautettu tai sitä ei löydy"
              }
            }

        }

    }

    

