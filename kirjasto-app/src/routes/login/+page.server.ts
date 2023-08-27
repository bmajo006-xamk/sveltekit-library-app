import prisma from '$lib/prisma';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';








export const actions : Actions = {
    default: async ( { cookies, request})  => {

        const formData = await request.formData();
        const asiakasnumero : any = formData.get("asiakasnumero");
        const asiakas  = await prisma.asiakkaat.findFirst({
            where: {
                asiakasnro : Number(asiakasnumero)
            }
        });
        
        //tähän jokin ehto, missä vartmiste

        console.log(request, cookies);

        if (asiakas?.asiakasnro === Number(asiakasnumero)) {   
        cookies.set('session', String(asiakas.asiakasnro), {path: "/lainaus", sameSite: 'strict', secure: process.env.NODE_ENV === 'production'});
        throw redirect(303, "/lainaus");
        }
        else {
        return fail(400, {credentials: true })
        }
    }
}

 