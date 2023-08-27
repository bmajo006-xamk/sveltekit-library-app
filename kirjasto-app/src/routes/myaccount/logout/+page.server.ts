import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const actions: Actions = {
    default({ cookies }){
        
        cookies.delete('session',{
            path: '/myaccount',
        } );

    throw redirect(302, '/');
    
    }
}