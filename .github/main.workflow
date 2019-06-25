workflow "Build, test, and deploy" {
  on = "push"
  resolves = [
    "4.1 Deploy",
  ]
}

action "1.1 Install packages" {
  uses = "actions/npm@59b64a598378f31e49cb76f27d6f3312b582f680"
  args = "install"
}

action "1.2 Authenticate Google Cloud" {
  uses = "actions/gcloud/auth@ba93088eb19c4a04638102a838312bb32de0b052"
  secrets = ["GCLOUD_AUTH"]
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

action "3.1 Deploy branch filter" {
  uses = "actions/bin/filter@3c0b4f0e63ea54ea5df2914b4fabf383368cd0da"
  args = "branch master"
  needs = [
    "2.1.1 Send coverage reports to Codecov",
    "2.2 Check formatting",
    "2.3 Check lint",
    "2.4 Build",
  ]
}

action "4.1 Deploy" {
  uses = "actions/gcloud/cli@ba93088eb19c4a04638102a838312bb32de0b052"
  args = "app deploy --project tbatv-prod-hrd --version 1 --quiet"
  needs = ["1.2 Authenticate Google Cloud", "3.1 Deploy branch filter"]
}
