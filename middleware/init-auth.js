export default function (context) {
    // console.log('[running init auth]')
    
    if(process.client) {
        context.store.dispatch('auth/initAuth')
    }
    return
}

   