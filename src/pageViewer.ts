const body: HTMLElement = document.querySelector('body')!;

export function checkForItems(){

    if(window.location.hash == '#home'){
        for (let i = 0; i < 4; i++) {
            const section = document.querySelector(`section:nth-of-type(${i + 1})`);
            section?.classList.remove('hide');
            body.classList.remove('noGrid');
        }false
        document.querySelector('section:nth-of-type(6)')?.classList.add('hide');
    }else if(
        window.location.hash == '#projects'){
        for (let i = 0; i < 4; i++) {
            const section = document.querySelector(`section:nth-of-type(${i + 1})`);
            section?.classList.add('hide');
            body.classList.add('noGrid');
        }false
    }else{
        for (let i = 0; i < 5; i++) {
            document.querySelector('section:nth-of-type(6)')?.classList.remove('hide');
            const section = document.querySelector(`section:nth-of-type(${i + 1})`);
            section?.classList.add('hide');
            body.classList.add('noGrid');
        }false
    }
}