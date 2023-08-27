import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import niteetStore from '../../Store';



export const actions: Actions = {
    default({ cookies }){
        
        cookies.delete('session',{
            path: '/lainaus',
        } );
        niteetStore.update(() => {
            return []
        });

    throw redirect(302, '/');
    
    }
}