export interface Organization {
  login: string;
  id: number;
  avatar_url: string;
  description: string;
  name: string;
  blog: string;
  location: string;
  email: string;
  public_repos: number;
  public_gists: number;
  html_url: string;
  created_at: string;
  updated_at: string;
}

export interface Repository {
  id: number;
  name: string;
  full_name: string;
  private: boolean;
  html_url: string;
  description: string;
  url: string;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  git_url: string;
  ssh_url: string;
  clone_url: string;
  size: number;
  stargazers_count: number;
  watchers_count: number;
  language: string;
  default_branch: string;
}
