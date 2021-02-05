import { danger, warn, fail, GitHubCommit, markdown } from "danger"
import * as dfn from 'date-fns';

// NOTE: - The following tasks run on ALL BetterPT repositories.

// Valid branch prefixes and names
const validBranchNames = ['story/', 'bug/', 'task/', 'hotfix/', 'trivial', 'staging', 'master', 'development', 'renovate'];

const checkBranchPrefix = () => {
  const branchName = danger.github.pr.head.ref;
  const result = validBranchNames.some(value => branchName.includes(value))
  if (result === false) {
    warn(`Merge ref is ${branchName}`);
    warn('🌲 Your branch name must be of type story, task, trivial, bug, or hotfix.')
  }
}

const checkPrBody = () => {
  const pr = danger.github.pr;
  if (pr.body.length === null || pr.body.length === 0) {
    fail('🖍 Please add a description to your PR. All PRs must have a description.')
  }
}

const checkIsUsingYarn = async () => {
  // Pull Request
  const pr = danger.github.pr;

  // The SHA of the HEAD of the pull request
  const prSha = danger.github.pr.head.sha;

  // The contents of the root of the repo
  const rootContents = await danger.github.api.git.getTree({
    owner: pr.base.user.login,
    repo: pr.base.repo.name,
    tree_sha: prSha
  });

  // Does the pull request contain a yarn.lock file?
  const isUsingYarn = rootContents.data.tree.find((file: { path: string }) => file.path == 'yarn.lock');

  // The established cut-off date for using yarn.
  const cutOffDate = new Date(2020, 1, 15);

  // Check to see if the project is using yarn and if it is before or after the cut-off date
  if (!isUsingYarn) { 
    const isBeforeCutOffDate = dfn.isFuture(cutOffDate)

    if (isBeforeCutOffDate) {
      warn('🧶 You are not using yarn in this project. All projects must use yarn by 02/15/2020.');
      return;
    } else if (!isBeforeCutOffDate) {
      fail('🧶 You are not using yarn in this project.');
      return
    }
  }
  console.log('This project is using yarn');
}

// All PRs should have a body
export default async () => {
  checkPrBody()
  checkBranchPrefix()
  await checkIsUsingYarn()
}