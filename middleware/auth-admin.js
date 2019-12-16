export default function (context) {
    // console.log('[running auth admin]')

    if(context.store.getters['auth/getIsAdmin'] == 'false') {
        console.log('redirecting')
        context.redirect('/')
    } 
    return;
}