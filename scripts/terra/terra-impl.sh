#!/usr/bin/env bash
set -e
set -x

MY_PATH=$(realpath $(dirname "$0"))
OUTPUT_DIR=$(realpath ${MY_PATH}/../../src/impl)

find ${OUTPUT_DIR} -type f -delete

npm run build -- run \
    --config ${MY_PATH}/config/impl_configs.yaml \
    --output-dir=${OUTPUT_DIR} \

cd ${OUTPUT_DIR}/../..

yarn exec eslint --fix --ext .ts ./src/impl
