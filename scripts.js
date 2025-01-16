const html = document.querySelector('html');
const contextButtons = document.querySelectorAll('.app__card-button');
const banner = document.querySelector('.app__image');
const title = document.querySelector('.app__title');

contextButtons.forEach( button => {
    button.addEventListener('click', () => {
        const context = button.getAttribute('data-context');
        alternateContext(context);
    })
});

function alternateContext(context) {
    html.setAttribute('data-context', context);
    banner.setAttribute('src', `/images/${context}.png`);
    alternateTitleContext(context);

    const button = document.querySelector(`.app__card-button--${context}`);
    contextButtons.forEach( button => button.classList.remove('active') );
    button.classList.add('active');
};

function alternateTitleContext(context) {
    switch (context) {
        case 'focus':
            title.innerHTML = `
                Optimize your productivity,<br>
                <strong class="app__title-strong">focus on <br>
                what matters.</strong>
            `
            break;
        case 'short-break':
            title.innerHTML = `
                How about taking a break?<br>
                <strong class="app__title-strong">Take a short break!</strong>
            `
            break;
        case 'long-break':
            title.innerHTML = `
                Time to return to the surface.<br>
                    <strong class="app__title-strong">Take a long break.</strong>
            `
            break;
    }
}