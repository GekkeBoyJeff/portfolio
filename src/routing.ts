window.addEventListener('hashchange', router, false); /* als de hash verandert, voer dan de router functie uit */

import { fetchAllRepositories, fetchPinnedRepositories, fetchCurrentRepository } from './fetch';
import { checkForItems } from './pageViewer';

export async function router() {
    const hash: string = window.location.hash; // Get the hash from the URL
    const parts: string[] = hash.split('/'); // Split the hash into an array of parts
    
    if (hash === '') {
        window.location.hash = '#home';
    }

    const section6 = document.querySelector('section:nth-of-type(6)')!;

    switch (parts[0]) {
        case '#home':
            console.log('home');
            fetchPinnedRepositories('GekkeBoyJeff');
            checkForItems();
            section6.innerHTML = '<div></div>';
            break;
        case '#projects':
            fetchAllRepositories('GekkeBoyJeff');
            checkForItems();
            if (parts.length > 1) {
                const page: string = parts[1];
                console.log(`project/${page}`);
                fetchCurrentRepository('GekkeBoyJeff', page);
            } else {
                console.log('projects');
                section6.innerHTML = '<div></div>';
            }
            break;
        default:
            console.log("can't find hash \nredirecting to home");
            window.location.hash = '#home';
            break;
    }
}

// export async function showProjects(){
//     content.classList.add('noGrid');
// }