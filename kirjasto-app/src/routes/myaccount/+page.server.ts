import prisma from '$lib/prisma';
import { redirect } from '@sveltejs/kit';

export const load = async({ locals, cookies } : any) => {

    //haetaan localseista asiakas
    if (!locals.asiakas)   { 
       throw redirect(303,'myaccount/login');
    }

    //haetaan asiakastiedot
    const asiakas = locals.asiakas;
    const asiakastiedot = await prisma.asiakkaat.findFirst({
        where : {
            asiakasnro : asiakas.asiakasnro
        }
    })

    //haetaan kaikki lainatiedot
    const lainaustiedot = await prisma.lainat.findMany({
        where : {
            asiakasnro : asiakas.asiakasnro,
            palautettu : false
        }
    })
    const lainat_maara = await prisma.lainat.count({
        where : {
            asiakasnro : asiakas.asiakasnro,
            palautettu : false
        }
    })

    //haetaan myohastyneet lainat
    //asiakasnumero pitää hakea localseista
    const myohastyneet_lainat = await prisma.lainat.findMany({
        where: {
            asiakasnro : asiakas.asiakasnro,
            myohastynyt_pvt : {
                gt : 0
            }
        }
    })

    return {
        asiakastiedot,
        lainaustiedot,
        lainat_maara,
        myohastyneet_lainat
    }

}
export const actions = {
    default : async({ request, locals } : any) =>{
        try {
            const formData = await request.formData();
            console.log(formData);
            const uusi_etunimi = formData.get('etunimi');
            const uusi_sukunimi = formData.get('sukunimi');
            const uusi_katuosoite = formData.get('katuosoite');
            const uusi_postinro = formData.get('postinro');
            const uusi_postitmp = formData.get('postitoimipaikka');
            const uusi_puh = formData.get('puhelinnro');

            const asiakas_id = locals.asiakas.asiakasnro;

            //muutetaan asiakasnro niin, että tulee localseista tai authtokenin mukaan
            const asiakas = await prisma.asiakkaat.findFirst({
                where : {
                    asiakasnro : asiakas_id.asiakasnro,
                }
            })

            //päivitetään tiedot tietokantaan
            const paivitys = await prisma.asiakkaat.update({
                where : {
                    asiakasnro : asiakas_id
                },
                data : {
                    etunimi : String(uusi_etunimi) || asiakas!.etunimi,
                    sukunimi : String(uusi_sukunimi) || asiakas!.sukunimi,
                    katuosoite : String(uusi_katuosoite) || asiakas!.katuosoite,
                    postinro : String(uusi_postinro) || asiakas!.postinro,
                    postitmp : String(uusi_postitmp) || asiakas!.postitmp,
                    puh : String(uusi_puh) || asiakas!.puh
                }
            })
            if (paivitys) {
                return { success : true, message : "onnistui"}
            }


        } catch(e : any) {
            return { success : false, message : 'Palvelimella tapahtui odottamaton virhe'}
        }


    }
}