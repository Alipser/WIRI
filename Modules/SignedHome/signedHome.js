//nodos

const listaTemas = document.querySelector('#nav > div > div.d-flex.gap-1.align-items-start > div:nth-child(2) > ul')
const html = document.querySelector('html')


listaTemas.addEventListener('click', (evento) => {
    evento.preventDefault()
    const logo = document.querySelector('#nav > div > a > img');
    const logoFooter = document.querySelector('body > footer > section:nth-child(2) > div > div > div.col-md-3.col-lg-4.col-xl-3.mx-auto.mb-4 > h6 > img');
    if (evento.target.id == 'darkTheme') {
        html.setAttribute('data-bs-theme', "dark");
        logo.src = '../../assets/brand/LogoN.png';
        logoFooter.src='../../assets/brand/LogoN.png';

    } else {
        html.setAttribute('data-bs-theme', "");
        logo.src = '../../assets/brand/WIRI.png';
        logoFooter.src = '../../assets/brand/WIRI.png';
    }
})