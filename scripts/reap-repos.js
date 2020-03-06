import { listPublicReposForOrg } from '../lib/github';
import { githubOrgName, fetchStatsForRepo } from '../config.json';

(async () => {
  console.log(`Reaping repos for: ${githubOrgName}`);
  const repoNames = await listPublicReposForOrg(githubOrgName);
  console.log(`Repos found : ${repoNames}`);
  repoNames.forEach((repoName) => fetchStatsForRepo(githubOrgName, repoName));
})();
