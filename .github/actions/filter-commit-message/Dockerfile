FROM debian:stable-slim

LABEL "com.github.actions.name"="Filter commit message"
LABEL "com.github.actions.description"="Stop a workflow if the message of the current commit doesn't match the pattern"
LABEL "com.github.actions.icon"="filter"
LABEL "com.github.actions.color"="gray-dark"

ADD entrypoint.sh /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]
