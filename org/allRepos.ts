import { danger, warn, fail, GitHubCommit, markdown } from "danger"
import yarn from 'danger-plugin-yarn';

// NOTE: - The following tasks run on ALL BetterPT repositories.

// Highlight package dependencies
const highlightDependencies = () => yarn();

// All PRs should have a body
const checkIfPrsHaveBody = () => {
  const pr = danger.github.pr;
  if (pr.body.length === null || pr.body.length === 0) {
    fail('🖍 Please add a description to your PR. No PR is too small to warrant a description.')
  }
}

export default async () => {
  await highlightDependencies();
  checkIfPrsHaveBody();
}