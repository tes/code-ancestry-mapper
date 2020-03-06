import request from 'superagent';
import 'dotenv/config';

const graphql = 'https://api.github.com/graphql';
const githubPersonalAccessToken = process.env.GITHUB_PERSONAL_ACCESS_TOKEN;
const githubUsername = process.env.GITHUB_USER_NAME;

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

const listPublicReposForOrg = async (name) => {
  const getPublicNonForkRepos = `
  query {
    organization(login: "${name}") {
      name
      repositories(privacy: PUBLIC, orderBy: {field: NAME, direction: ASC}, isFork: false, isLocked: false, first: 100) {
        nodes {
          name
        }
      }
    }
  }`;
  const { organization: { repositories: { nodes } } } = await getFromGithub(getPublicNonForkRepos);
  return nodes.flatMap((n) => n.name);
};

// eslint-disable-next-line import/prefer-default-export
export { listPublicReposForOrg };
