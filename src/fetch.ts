interface Repository {
  repo?: string;
  username?: string;
  url?: string;
}

// export async function fetchAllRepositories(username: string): Promise<Repository[]> {
//   const response = await fetch(`https://api.github.com/users/${username}/repos`);

//   if (!response.ok) {
//     throw new Error(`Failed to fetch repositories: ${response.status} ${response.statusText}`);
//   }

//   const data: Repository[] = await response.json();
//   console.log(data)
//   const formattedData = data.map((repository) => ({
//     name: repository.name,
//     description: repository.description,
//     url: repository.url
//   }));
//   console.log(formattedData);
  
//     return formattedData;
// }
export async function fetchPinnedRepositories(username: string) {
  const pinnedRepos = await fetch(`https://gh-pinned-repos.egoist.dev/?username=${username}`)
    .then(response => response.json())
    .catch(error => console.log(error));
  addThreeLatestRepos(username, pinnedRepos);
  return pinnedRepos;
}

export async function addThreeLatestRepos(username: string, pinnedRepos: Repository[]) {
  console.log(pinnedRepos)
  for (let i = 0; i < pinnedRepos.length && i < 3; i++) {
    const link = document.querySelector(`section:nth-of-type(3) > a:nth-of-type(${i + 1})`);
    const element = document.querySelector(`section:nth-of-type(3) > a:nth-of-type(${i + 1}) figure figcaption h3`);
    const image = document.querySelector(`section:nth-of-type(3) > a:nth-of-type(${i + 1}) figure img`);
    if (element !== null) {
      element.textContent = pinnedRepos[i].repo!;
      link?.setAttribute('href', pinnedRepos[i].url!); // Uncomment this line to set the link href
      image?.setAttribute('src', `https://raw.githubusercontent.com/${username}/${pinnedRepos[i].repo}/main/assets/mockup-small.webp`);
      // Uncomment the following lines to fetch and display the README data
      // const readme = await fetch(`https://raw.githubusercontent.com/${username}/${pinnedRepos[i].name}/main/README.md`);
      // const readmeData = decodeURIComponent(await readme.text());
      // console.log(readmeData);
    }
  }
}

