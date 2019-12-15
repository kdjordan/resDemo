export default function (context) {
    console.log('[running normal auth]')
    if(!context.store.getters['admin/isAuthenticated']) {
        context.redirect('/')
    } 
    return;
}