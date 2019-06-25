workflow "Build, test, and deploy" {
  on = "push"
  resolves = ["Deploy branch filter", "Send coverage reports to Codecov"]
}

action "1. Install packages" {
  uses = "actions/npm@59b64a598378f31e49cb76f27d6f3312b582f680"
  args = "install"
}

action "2-1. Build" {
  uses = "actions/npm@59b64a598378f31e49cb76f27d6f3312b582f680"
  needs = ["1. Install packages"]
  args = "run build"
  secrets = ["FIREBASE_API_KEY", "FIREBASE_APP_ID", "FIREBASE_PROJECT_ID", "STACKDRIVER_API_KEY", "TBA_API_AUTH_KEY"]
}

action "2-2. Test" {
  uses = "actions/npm@59b64a598378f31e49cb76f27d6f3312b582f680"
  needs = ["1. Install packages"]
  args = "test"
  env = {
    CI = "true"
  }
}

action "Deploy branch filter" {
  uses = "actions/bin/filter@3c0b4f0e63ea54ea5df2914b4fabf383368cd0da"
  needs = ["2-1. Build", "2-2. Test"]
  args = "branch master"
}

action "Send coverage reports to Codecov" {
  uses = "docker://node"
  needs = ["2-2. Test"]
  runs = "npx"
  args = "codecov"
  secrets = ["CODECOV_TOKEN"]
}
