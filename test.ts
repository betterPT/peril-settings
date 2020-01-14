const validBranchNames = ['story/', 'bug/', 'task/', 'trivial', 'staging', 'master', 'development'];
const result = validBranchNames.every(value => 'ttt'.includes(value))

const checkBranchPrefix = () => {
  const branchName = 'balls/eeeee' //danger.github.pr.head.ref;
  const result = validBranchNames.some(value => branchName.includes(value))
  return result;
}

console.log(checkBranchPrefix())