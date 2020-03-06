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
                    name: '.gitignore',
                    type: 'blob',
                  },
                  {
                    name: 'index.js',
                    type: 'blob',
                  },
                  {
                    name: 'test',
                    type: 'tree',
                  },
                ],
              },
            },
          },
        });

    const fileList = await getFileListForRepo('tes', 'conflab');

    expect(fileList[0].name).to.include('index.js');
    expect(fileList[1].name).to.include('test');
  });
});
