export default function (context) {
    console.log('[running check auth]')
    context.store.dispatch('admin/initAuth')
        
}