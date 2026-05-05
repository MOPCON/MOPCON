#!/usr/bin/env bash
# verify-freeze.sh — 對本機 Apache 模擬請求每條 redirect 規則 + 各年首頁，印 status code
# 使用方式：先啟動本機 Apache (建議 docker run --rm -p 8080:80 -v $PWD:/usr/local/apache2/htdocs httpd)
# 然後執行：BASE=http://localhost:8080 ./tools/verify-freeze.sh

set -uo pipefail
BASE=${BASE:-http://localhost:8080}
fail=0

check() {
  local path=$1 expect=$2
  local got
  got=$(curl -sS -o /dev/null -w '%{http_code}' "$BASE$path")
  if [[ "$got" == "$expect" ]]; then
    printf 'OK   %3s  %s\n' "$got" "$path"
  else
    printf 'FAIL %3s (expected %s)  %s\n' "$got" "$expect" "$path"
    fail=1
  fi
}

# 各年首頁 (Phase 1 起每完成一年就把對應行從 # 註解中拿出來)
for y in 2012 2013 2014 2015 2016 2017 2018 2019 2020 2021 2022 2023 2024 2025; do
  check "/$y/" 200
done

# 根目錄入口 (Phase 2 後才會 200)
# check "/" 200
# check "/album/" 200
# check "/err/404.html" 200

# .htaccess redirect 規則 (Phase 2 後才會生效)
# check "/index.php"            410
# check "/feedback.php"          301
# check "/warmup-feedback.php"   301
# check "/warnup-feedback.php"   301
# check "/2018/feedback.php"     301
# check "/2018/warnup-feedback.php" 301
# check "/app.php"               301
# check "/2018/app.php"          301
# check "/bof.php"               301
# check "/album.php"             301

exit $fail
