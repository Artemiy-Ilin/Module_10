const btn = document.querySelector('.btn');

btn.addEventListener('click', () => {
    alert ('Ширина вашего экрана: ' + window.innerWidth + 'px' + '\n' 
    + 'Высота вашего экрана: ' + window.innerHeight + 'px');
});