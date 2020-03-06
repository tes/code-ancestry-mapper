import request from 'superagent';
import 'dotenv/config';
import { githubOrgName } from '../config';

const graphql = 'https://api.github.com/graphql';
const githubPersonalAccessToken = process.env.GITHUB_PERSONAL_ACCESS_TOKEN;
const githubUsername = process.env.GITHUB_USER_NAME;

// eslint-disable-next-line consistent-return
const getFromGithub = async (query) => {
  try {
    const queryString = JSON.stringify({ query });
    const { body: { data }, res: { text } } = await request
      .post(graphql)
      .set('Authorization', `Bearer ${githubPersonalAccessToken}`)
      .set('User-Agent', githubUsername)
      .send(queryString);
    if (!data && text) console.log('message:', text);
    return (data);
  } catch (e) {
    console.log('e', e);
  }
};

const listPublicReposForOrg = async (orgName) => {
  const getPublicNonForkReposQuery = `
  query {
    organization(login: "${orgName}") {
      name
      repositories(privacy: PUBLIC, orderBy: {field: NAME, direction: ASC}, isFork: false, isLocked: false, first: 100) {
        nodes {
          name
          isArchived
        }
      }
    }
  }`;

  const { organization: { repositories: { nodes } } } = await getFromGithub(
    getPublicNonForkReposQuery,
  );
  const notArchivedRepos = nodes.filter((n) => !n.isArchived);
  return notArchivedRepos.flatMap((n) => n.name);
};

// eslint-disable-next-line import/prefer-default-export
export { listPublicReposForOrg };
