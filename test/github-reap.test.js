const nock = require('nock');
const { expect } = require('chai');
const { describe, it } = require('mocha');

const { listPublicReposForOrg, getFileListForRepo } = require('../lib/github');

describe('Reaping repos', () => {
  it('gets a list of repos for an organisation', async () => {
    nock('https://api.github.com')
      .post('/graphql')
      .reply(200,
        {
          data: {
            organization: {
              name: 'Tes',
              repositories: {
                nodes: [
                  {
                    name: 'airbrake-mini-client',
                    isArchived: false,
                  },
                  {
                    name: 'app-house-points',
                    isArchived: true,
                  },
                ],
              },
            },
          },
        });

    const repoNames = await listPublicReposForOrg('tes');
    expect(repoNames).to.include('airbrake-mini-client');
    expect(repoNames).not.to.include('app-house-points');
  });

  it('gets the code ancestry for a single repo', async () => {
    nock('https://api.github.com')
      .post('/graphql')
      .reply(200,
        {
          data: {
            repository: {
              object: {
                entries: [
                  {
                    oid: '1e494d6ae76068964a56874feb3896cdad6afd28',
                    name: '.gitignore',
                    type: 'blob',
                  },
                  {
                    oid: 'eb60909865b7afae4b1e8beb9df8b1a84fc2d0f2',
                    name: 'test',
                    type: 'tree',
                  },
                ],
              },
            },
          },
        });

    const files = await getFileListForRepo('tes', 'conflab');
    expect(files).to.include('.gitignore');
    expect(files).to.include('test');
  });
});
