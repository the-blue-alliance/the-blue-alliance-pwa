workflow "Build and deploy" {
  on = "push"
  resolves = [
    "Deploy",
  ]
}

action "1. Install packages" {
  uses = "actions/npm@e7aaefed7c9f2e83d493ff810f17fa5ccd7ed437"
  args = "install"
}

action "2. Authenticate Google Cloud" {
  uses = "actions/gcloud/auth@8ec8bfad3853155b42cea5eb9f8395b098111228"
  secrets = ["GCLOUD_AUTH"]
}

action "3. Deploy branch filter" {
  uses = "actions/bin/filter@b2bea0749eed6beb495a8fa194c071847af60ea1"
  args = "branch master"
}

action "1-1. Build" {
  uses = "actions/npm@e7aaefed7c9f2e83d493ff810f17fa5ccd7ed437"
  args = "run build"
  needs = ["1. Install packages"]
}

action "Deploy" {
  uses = "actions/gcloud/cli@8ec8bfad3853155b42cea5eb9f8395b098111228"
  needs = [
    "1-1. Build",
    "2. Authenticate Google Cloud",
    "3. Deploy branch filter",
  ]
  args = "app deploy --project tbatv-prod-hrd --version 1 --quiet"
}
