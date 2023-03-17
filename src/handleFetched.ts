// import {fetchAllRepositories} from './fetch';

export function handleData(data: Array<any>){
    console.log(data);
    
    // Check if ul exists
    if(document.querySelector('section:nth-of-type(5) > ul:nth-of-type(2)')){
        console.log('ul exists')
    }
    else{
    // create an unordered list in the sixth section
        const list = document.createElement('ul');
        document.querySelector('section:nth-of-type(5)')?.appendChild(list);

        // loop through the data and create a list item for each repository
        for (let i = 0; i < data.length; i++) {
            const listItem = document.createElement('li');
            list.appendChild(listItem);
            // add a link to the repository
            const link = document.createElement('a');
            link.setAttribute('href', '#projects/' + data[i].name);
            link.textContent = data[i].name;
            listItem.appendChild(link);
        }
    }    
} 

export async function handleRepo(data: Array<any>){
    console.log(data[0])
}