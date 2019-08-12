FROM debian:stable-slim

RUN apt-get update && apt-get install -y --no-install-recommends git

ADD entrypoint.sh /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]
