workflow "Build, test, and deploy" {
  on = "push"
  resolves = [
    "5.1 Deploy",
  ]
}

action "1.1 Install packages" {
  uses = "actions/npm@59b64a598378f31e49cb76f27d6f3312b582f680"
  args = "install"
}

action "2.1 Test" {
  uses = "actions/npm@59b64a598378f31e49cb76f27d6f3312b582f680"
  args = "test"
  env = {
    CI = "true"
  }
  needs = ["1.1 Install packages"]
}

action "2.1.1 Send coverage reports to Codecov" {
  uses = "docker://node"
  runs = "npx"
  args = "codecov"
  secrets = ["CODECOV_TOKEN"]
  needs = ["2.1 Test"]
}

action "2.2 Check formatting" {
  uses = "actions/npm@59b64a598378f31e49cb76f27d6f3312b582f680"
  args = "run prettier"
  needs = ["1.1 Install packages"]
}

action "2.3 Check lint" {
  uses = "actions/npm@59b64a598378f31e49cb76f27d6f3312b582f680"
  args = "run lint"
  needs = ["1.1 Install packages"]
}

action "2.4 Build" {
  uses = "actions/npm@59b64a598378f31e49cb76f27d6f3312b582f680"
  args = "run build"
  secrets = ["FIREBASE_API_KEY", "FIREBASE_APP_ID", "FIREBASE_PROJECT_ID", "STACKDRIVER_API_KEY", "TBA_API_AUTH_KEY"]
  needs = ["1.1 Install packages"]
}

action "3.1 Is master branch" {
  uses = "actions/bin/filter@3c0b4f0e63ea54ea5df2914b4fabf383368cd0da"
  args = "branch master"
  needs = [
    "2.1.1 Send coverage reports to Codecov",
    "2.2 Check formatting",
    "2.3 Check lint",
    "2.4 Build",
  ]
}

action "4.1 Is not [nodeploy]" {
  uses = "./.github/actions/filter-commit-message"
  args = "-n \\[nodeploy\\]"
  needs = ["3.1 Is master branch"]
}

action "4.2 Authenticate Google Cloud" {
  uses = "actions/gcloud/auth@ba93088eb19c4a04638102a838312bb32de0b052"
  secrets = ["GCLOUD_AUTH"]
  needs = ["3.1 Is master branch"]
}

action "5.1 Deploy" {
  uses = "actions/gcloud/cli@ba93088eb19c4a04638102a838312bb32de0b052"
  args = "app deploy --project tbatv-prod-hrd --version 1 --quiet"
  needs = ["4.1 Is not [nodeploy]", "4.2 Authenticate Google Cloud"]
}

workflow "Delete merged branch" {
  on = "pull_request"
  resolves = ["Delete branch"]
}

action "Delete branch" {
  uses = "jessfraz/branch-cleanup-action@abc6d34acf90fadba20d681e2d7c2ea6de2e0b76"
  secrets = ["GITHUB_TOKEN"]
}
