#!/usr/bin/env bash
# verify-ghpage.sh — 對 GitHub Pages 部署做煙霧測試。
#
# 與 verify-freeze.sh 的差異：GH Pages 沒有 .htaccess / mod_rewrite，無法
# 回 301/410；舊 .php 入口改用「同名目錄 + meta-refresh index.html」實作。
#
# 使用方式：
#   BASE=https://mopcon.org              ./tools/verify-ghpage.sh
#   BASE=https://<user>.github.io/MOPCON ./tools/verify-ghpage.sh

set -uo pipefail
BASE=${BASE:-http://localhost:8080}
fail=0

# 比對 status code（不跟 redirect）
check() {
  local path=$1 expect=$2
  local got
  got=$(curl -sS -o /dev/null -w '%{http_code}' "$BASE$path")
  if [[ "$got" == "$expect" ]]; then
    printf 'OK    %3s  %s\n' "$got" "$path"
  else
    printf 'FAIL  %3s (expected %s)  %s\n' "$got" "$expect" "$path"
    fail=1
  fi
}

# 跟著所有 redirect（含 meta-refresh 不會被跟，所以只看最終 effective URL 是否含子字串）
check_redirect_target() {
  local path=$1 needle=$2
  local body
  body=$(curl -sSL "$BASE$path")
  if grep -q "$needle" <<<"$body"; then
    printf 'OK    →    %-40s  →  %s\n' "$path" "$needle"
  else
    printf 'FAIL  →    %-40s  →  %s (not found)\n' "$path" "$needle"
    fail=1
  fi
}

# 各年首頁
for y in 2012 2013 2014 2015 2016 2017 2018 2019 2020 2021 2022 2023 2024 2025; do
  check "/$y/" 200
done

# 根目錄入口 / 共用頁
check "/" 200
check "/album/" 200
check "/err/404.html" 200
check "/404.html" 200

# 不存在的路徑 → GH Pages 回 root /404.html
check "/this-does-not-exist" 404

# 重導目錄 (有 / 結尾) 應該回 200，body 含 meta-refresh 目標
GFORM_FEEDBACK="docs.google.com/forms/d/e/1FAIpQLSdr7tHCb6Jz1UHmaLtB_aWTmOsgUApzY6SWQdvBYy8o8dbRlA"
GFORM_WARMUP="docs.google.com/forms/d/e/1FAIpQLSc0cD8BjDdi2nxKXQCSpyCpBi-3g9LqkCzLo0nnikG7dk06ZQ"
HACKMD="hackmd.io/z5JZG5AtSCakXU5te0Jilg"

check "/feedback.php/"             200
check "/warmup-feedback.php/"      200
check "/warnup-feedback.php/"      200
check "/2018/feedback.php/"        200
check "/2018/warnup-feedback.php/" 200
check "/app.php/"                  200
check "/2018/app.php/"             200
check "/bof.php/"                  200
check "/album.php/"                200

check_redirect_target "/feedback.php/"             "$GFORM_FEEDBACK"
check_redirect_target "/warmup-feedback.php/"      "$GFORM_WARMUP"
check_redirect_target "/warnup-feedback.php/"      "$GFORM_WARMUP"
check_redirect_target "/2018/feedback.php/"        "$GFORM_FEEDBACK"
check_redirect_target "/2018/warnup-feedback.php/" "$GFORM_WARMUP"
check_redirect_target "/app.php/"                  "$HACKMD"
check_redirect_target "/2018/app.php/"             "$HACKMD"
check_redirect_target "/bof.php/"                  "$HACKMD"
check_redirect_target "/album.php/"                'href="/album/"'

# 沒有對應目錄的舊 .php URL（例如 /index.php）：Apache 版會回 410，
# GH Pages 版會回 404，無法區分「曾經存在」與「從未存在」。
check "/index.php" 404

exit $fail
