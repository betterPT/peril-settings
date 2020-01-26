import { danger, warn, fail, GitHubCommit, markdown } from "danger"

// NOTE: - The following tasks run on ALL BetterPT repositories.

// Valid branch prefixes and names
const validBranchNames = ['story/', 'bug/', 'task/', 'hotfix/', 'trivial', 'staging', 'master', 'development'];

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

  const rootContents = await danger.github.api.git.getTree({
    owner: pr.base.user.login,
    repo: pr.base.repo.name,
    tree_sha: pr.base.sha
  })

  const isUsingYarn = rootContents.data.tree.find((file: { path: string }) => file.path == 'yarn.lock');

  if (!isUsingYarn) { 
    warn('🧶 You are not using yarn in this project. All projects must use yarn by 15/02/2020');
    return;
}
  console.log('This project is using yarn');
}

// All PRs should have a body
export default async () => {
  checkPrBody()
  checkBranchPrefix()
  await checkIsUsingYarn()
}