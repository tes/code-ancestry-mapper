const nock = require('nock');
const { expect } = require('chai');

const { listPublicReposForOrg } = require('../lib/github');

describe('Reaping repos', () => {
  it('gets a list of repos for an organisation', async () => {
    nock('https://api.github.com')
      .post('/graphql')
      .reply(200, {
        data: {
          organization: {
            name: 'Tes',
            repositories: {
              nodes: [
                {
                  name: 'airbrake-mini-client',
                },
                {
                  name: 'app-house-points',
                },
              ],
            },
          },
        },
      });

    const reposList = await listPublicReposForOrg('tes');
    expect(reposList.organization.repositories.nodes[0].name).to.include('airbrake-mini-client');
    expect(reposList.organization.repositories.nodes[1].name).to.include('app-house-points');
  });
});
