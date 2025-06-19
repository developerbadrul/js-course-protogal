console.log("js 4");

document.querySelector('#parent').addEventListener('click', () => {
    console.log('parent clicked');
    
}, true)


document.querySelector('#child').addEventListener('click', (e) => {
    // e.stopPropagation()
    console.log('button clicked');
    
})