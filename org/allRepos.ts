import { danger, warn, fail, GitHubCommit, markdown } from "danger"

// NOTE: - The following tasks run on ALL BetterPT repositories.

// Valid branch prefixes and names
const validBranchNames = ['story/', 'bug/', 'task/', 'trivial', 'staging', 'master', 'development'];

const checkBranchPrefix = () => {
  const branchName = danger.github.pr.head.ref;
  const result = validBranchNames.some(value => branchName.includes(value))
  if (result === false) {
    warn(`Merge ref is ${branchName}`);
    warn('🌲 Your branch name must be of type story, task, trivial, or bug.')
  }
}

const checkPrBody = () => {
  const pr = danger.github.pr;
  if (pr.body.length === null || pr.body.length === 0) {
    fail('🖍 Please add a description to your PR. All PRs must have a description.')
  }
}
// All PRs should have a body
export default async () => {
  checkPrBody()
  checkBranchPrefix()
}