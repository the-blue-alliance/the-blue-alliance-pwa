workflow "Build, test, and deploy" {
  on = "push"
  resolves = [
    "4.1 Is not [nodeploy]",
  ]
}

action "4.1 Is not [nodeploy]" {
  uses = "./.github/actions/filter-commit-message"
  args = "-n \\[nodeploy\\]"
}
