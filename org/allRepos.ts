import { danger, warn, fail, GitHubCommit, markdown } from "danger"
import yarn from 'danger-plugin-yarn';

// NOTE: - The following tasks run on ALL BetterPT repositories.

// Highlight package dependencies
const highlightDependencies = async () => { await yarn() }

const checkPrBody = () => {
  const pr = danger.github.pr;
  if (pr.body.length === null || pr.body.length === 0) {
    fail('🖍 Please add a description to your PR. All PRs must have a description.')
  }
}
// All PRs should have a body
export default async () => {
  highlightDependencies()
  checkPrBody()
}