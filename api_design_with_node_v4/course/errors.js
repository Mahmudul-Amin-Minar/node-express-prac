setTimeout(() => {
    throw new Error('oo')
}, 300);

process.on('uncaughtException', () => {

})

process.on('uncaughtException', () => {
    
})