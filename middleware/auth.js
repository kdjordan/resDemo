

export default function (context) {
    // console.log('[running normal auth]')
    
        if(!context.store.getters['auth/hasToken']) {
            console.log('no token')

            context.redirect('/')
        } 
        console.log('has a token')
       return;
}
    
