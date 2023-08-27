import type { Handle } from '@sveltejs/kit';
import prisma from '$lib/prisma';

export const handle: Handle = async ({ event, resolve}) => {
  const session = event.cookies.get('session');

  if (!session) {
    return await resolve(event);
  }
 
    const asiakas  = await prisma.asiakkaat.findFirst({
    where: {
        asiakasnro : Number(session)
    }
  });


  if (asiakas){
    event.locals.asiakas = {
      asiakasnro: asiakas.asiakasnro,
      sukunimi:  String(asiakas.sukunimi),
      etunimi:  String(asiakas.etunimi),
      katuosoite: String(asiakas.katuosoite),
      postinro:   String(asiakas.postinro),
      postitmp: String(asiakas.postitmp),
      puh: String(asiakas.puh)
  
    }
  }
  return  await resolve(event);
}