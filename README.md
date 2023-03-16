# Portfolio using Github api & typescript

## What is this project about?

This project is about building a portfolio using the github api and typescript. The goal is to learn how to use typescript and how to use the github api.

## Lecture

```
it's not a bug, it's an undocumented feature!
```

During the lecture I noted a a few things which are required for this project

- [ ] Build your own portfolio
- [ ] use quick hack and prototyping
- [ ] get data from github api
- [ ] Make a SPA (Single Page Application) with routing

- [ ] Try not to work with Classes and Id's
- [ ] Use complex css
- [ ] Make it pretty

- [ ] May use GraphQL api

## End with a bang

- You won't get a grade.
- you won't be able to do the end-assignment of this minor if you don't participate in this assignment.

## Where to start

### Start with sketching

1. What should be on your portfolio
2. What data is in the github api
3. Is there data missing? Do I want to use another source?
4. What skills do I want to show?

### Start with the data

1. What data do I need?
2. What data is in the github api?
3. What data is missing?
4. What data do I want to add?

After adding custom images to load I came to the conclusion that I did not want to do that for every repo I had. Currently I had the following code to show 
```TS
interface Repository {
  name?: string;
  description?: string;
  url?: string;
}

export async function fetchAllRepositories(username: string): Promise<Repository[]> {
  const response = await fetch(`https://api.github.com/users/${username}/repos`);

  if (!response.ok) {
    throw new Error(`Failed to fetch repositories: ${response.status} ${response.statusText}`);
  }

  const data: Repository[] = await response.json();
  console.log(data)
    return data;
}

export async function addThreeLatestRepos(username:string) {
  const formattedData = await fetchAllRepositories(username);
  
  for (let i = 0; i < formattedData.length && i < 3; i++) {
    const element = document.querySelector(`section:nth-of-type(3) > a:nth-of-type(${i + 1}) figure figcaption h3`);
    const image = document.querySelector(`section:nth-of-type(3) > a:nth-of-type(${i + 1}) figure img`);
    if (element !== null) {
      element.textContent = formattedData[i].name!;
      image?.setAttribute('src', `https://raw.githubusercontent.com/${username}/${formattedData[i].name}/main/assets/mockup-small.webp`);
    }
  }
}
```

However, this only returned the three latest repo's. I wanted the three pinned repo's.