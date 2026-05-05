#!/usr/bin/env bash
# Local Apache test server for the MOPCON static site.
#
# Boots an httpd:2.4 container with the project mounted as document root and
# patches the default httpd.conf at startup so that:
#   - mod_rewrite is loaded (off by default in the official image)
#   - AllowOverride All is set, so the project's .htaccess takes effect
#
# Usage:
#   ./tools/test-server.sh            # listens on :8080
#   PORT=9000 ./tools/test-server.sh  # custom port

set -euo pipefail

PORT="${PORT:-8080}"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"

echo "MOPCON test server"
echo "  URL:  http://localhost:${PORT}/"
echo "  Root: ${ROOT}"
echo "  Stop: Ctrl+C"
echo

exec docker run --rm -p "${PORT}:80" \
  -v "${ROOT}:/usr/local/apache2/htdocs" \
  httpd:2.4 \
  sh -c '
    sed -i \
      -e "s|^#LoadModule rewrite_module|LoadModule rewrite_module|" \
      -e "s|AllowOverride None|AllowOverride All|" \
      /usr/local/apache2/conf/httpd.conf
    exec httpd-foreground
  '
