import { Organization, Repository } from './models';

export namespace GithubAPI {
  export function getOrganization(org: string) {
    return githubGet<Organization>(`/orgs/${org}`);
  }

  export function getOrganizationRepos(org: string, page = 0, pageSize = 10) {
    const q = new URLSearchParams({
      type: 'public',
      sort: 'full_name',
      page: page.toString(),
      per_page: pageSize.toString(),
    });
    return githubGet<Repository[]>(`/orgs/${org}/repos?${q}`);
  }

  export function getAllOrganizationRepos(org: string, orgRepos: number) {
    const pageSize = 100;
    let apiCalls = [];
    let page = 0;
    let reposTaken = 0;
    while (reposTaken < orgRepos) {
      apiCalls.push(getOrganizationRepos(org, page, pageSize));
      reposTaken += pageSize;
      page++;
    }
    return Promise.all(apiCalls).then((values) => {
      const ids = new Set();
      const unique: Repository[] = [];
      values.forEach((val) => {
        val.forEach((v) => {
          if (!ids.has(v.id)) {
            ids.add(v.id);
            unique.push(v);
          }
        })
      });

      return unique;
    });
  }
}

function githubGet<T>(path: string): Promise<T> {
  return new Promise((resolve, reject) => {
    fetch(`${process.env.REACT_APP_GITHUB_API_URL}${path}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch((err) => reject(err));
  });
}
