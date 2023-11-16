#!/usr/bin/env bash
set -e
set -x

MY_PATH=$(realpath $(dirname "$0"))
OUTPUT_DIR=$(realpath ${MY_PATH}/../../src)

find ${OUTPUT_DIR} -maxdepth 1 -type f ! -path "*/index.ts" -delete

npm run build -- run \
    --config ${MY_PATH}/config/types_configs.yaml \
    --output-dir=${OUTPUT_DIR} \

cd ${OUTPUT_DIR}/..

yarn exec eslint --fix --ext .ts ./src
