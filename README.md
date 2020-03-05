# code-ancestry-mapper

Provides a suite of mapping tools to explore the state of a given codebase by using the GraphQL [Github API](https://developer.github.com/v4/) and visualise the data in the form of [treemaps](https://support.google.com/docs/answer/9146947?hl=en).

## Usage

## How to get fresh data from github

1. Create a `.env` file with your github details ([generate a personal token](https://github.com/settings/tokens) with `repo` scope):
   ```
   GITHUB_USER_NAME=<your username>
   GITHUB_PERSONAL_ACCESS_TOKEN=<your token>
   ```
1. `npm run reap-repos`

Note: The Github API we use is rate limited (new allowance every hour), so it's unlikely you can refresh all the data in one go.
There's a neat [GraphQL Explorer](https://developer.github.com/v4/explorer/) to help run queries. For example, check your allowance:
```
query {
  viewer {
    login
  }
  rateLimit {
    limit
    cost
    remaining
    resetAt
  }
}
```
(this does eat into your allowance...)


## Installation


## Running the tests 

Clone this repository and run
```
npm install
```
You can run the [mocha](https://mochajs.org/) unit tests with
```
npm test
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/tes/code-ancestry-mapper/tags). 

## Contribution

This project is brought to you by [Tes](https://github.com/tes) engineers. 
 Check out [contributors](https://github.com/tes/code-ancestry-mapper/graphs/contributors) who participated in this project.

If you have improvements to offer, please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.


