export default function (context) {
    console.log('[running admin auth]')
    
    if(!context.store.getters['admin/getIsAdmin']) {
        context.redirect('/')
    } 
    return;
}