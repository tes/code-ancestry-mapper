const nock = require('nock');
const { expect } = require('chai');
const { describe, it } = require('mocha');

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

    const repoNames = await listPublicReposForOrg('tes');
    expect(repoNames).to.include('airbrake-mini-client');
    expect(repoNames).to.include('app-house-points');
  });
});
