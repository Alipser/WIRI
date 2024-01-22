//nodos

const listaTemas = document.querySelector('#nav > div > div.d-flex.gap-1.align-items-start > div:nth-child(2) > ul')
const html = document.querySelector('html')


listaTemas.addEventListener('click', (evento) => {
    evento.preventDefault()
    const logo = document.querySelector('#nav > div > a > img')
    if (evento.target.id == 'darkTheme') {
        html.setAttribute('data-bs-theme', "dark")
        logo.src = '../../assets/brand/LogoN.png'

    } else {
        html.setAttribute('data-bs-theme', "")
        logo.src = '../../assets/brand/WIRI.png'
    }
})