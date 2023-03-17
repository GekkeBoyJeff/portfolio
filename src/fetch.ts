import { Converter } from 'showdown';
import {handleData, handleRepo} from './handleFetched';

// Repository interface definition
interface Repository {
  repo?: string;
  username?: string;
  link?: string;
  name?: string;
  description?: string;
  url?: string;
}

// Fetches all repositories for given Github user with provided username
export async function fetchAllRepositories(username: string): Promise<Repository[]> {
  // Uses `fetch` to call the Github API to fetch all repos
  const response = await fetch(`https://api.github.com/users/${username}/repos`);

  // Throws an error if the response is not successful
  if (!response.ok) {
    throw new Error(`Failed to fetch repositories: ${response.status} ${response.statusText}`);
  }

  // Parses the response into JSON data and returns it
  const data: Repository[] = await response.json();
  // console.log(data)
  handleData(data);
  return data;
}

// Fetch the pinned repositories for a given Github user with provided username
export async function fetchPinnedRepositories(username: string) {
  try {
    // Uses `fetch` to call the pinned repo API endpoint for the user
    const pinnedRepos = await fetch(`https://gh-pinned-repos.egoist.dev/?username=${username}`)
      .then(response => response.json())
    
    addThreeLatestRepos(username, pinnedRepos); // Calls the addThreeLatestRepos function with obtained data

    return pinnedRepos; // Return the fetched data
  } catch(e){
    console.log(e); // Logs any errors to console
  }
}

// Updates the latest 3 pinned Repositories in the HTML DOM
export async function addThreeLatestRepos(username: string, pinnedRepos: Repository[]) {
  console.log(pinnedRepos)

  for (let i = 0; i < 3; i++) {
    const link = document.querySelector(`section:nth-of-type(3) > a:nth-of-type(${i + 1})`);
    const element = document.querySelector(`section:nth-of-type(3) > a:nth-of-type(${i + 1}) figure figcaption h3`);
    const image = document.querySelector(`section:nth-of-type(3) > a:nth-of-type(${i + 1}) figure img`);

    if (element) {
      element.textContent = pinnedRepos[i].repo!;
      link?.setAttribute('href', `#projects/${pinnedRepos[i].repo}`);
      image?.setAttribute('src', `https://raw.githubusercontent.com/${username}/${pinnedRepos[i].repo}/main/assets/mockup-small.webp`);
    }
    else{
      console.log('error')
    }
  }
}

// Make a new fetch request to the Github API to get the data for the current repository
export async function fetchCurrentRepository(username: string, repo: string) {
  try {
    const response = await fetch(`https://api.github.com/repos/${username}/${repo}`);
    const data: Repository = await response.json();
    fetchReadme(username, repo)
    handleRepo([data])// wrap the data in an array
  } catch(e){
    console.log(e);
  }
}

export async function fetchReadme(username: string, repo: string) {
  try {
    const response = await fetch(`https://raw.githubusercontent.com/${username}/${repo}/main/README.md`);
    const data: string = await response.text();
    const converter = new Converter();
    const html = converter.makeHtml(data);
    document.querySelector('section:nth-of-type(6) > div')!.innerHTML = html;
  } catch(e){
    console.log(e);
  }
}