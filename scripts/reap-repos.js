import { listPublicReposForOrg } from '../lib/github';
import { githubOrgName } from '../config.json';

(async () => {
  console.log(`Reaping public repos for: ${githubOrgName}`);
  const result = await listPublicReposForOrg(githubOrgName);
  console.log(result.repositories);
})();
