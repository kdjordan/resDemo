export default function (context) {
    // console.log('[running auth admin]')
    // console.log(context.store.getters['reservation/getActiveHome'])

    if(context.store.getters['auth/getIsAdmin'] == false) {
        console.log('redirecting')
        
            context.redirect('/')

        
    } 
    return;
}