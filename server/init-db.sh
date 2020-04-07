#!/usr/bin/env bash

set -e

export $(cat .env | grep -v '^#' | xargs)

MYSQL_CMD="mysql -u root"

echo "Dropping database..."
${MYSQL_CMD} -e "drop database if exists jungle;"

echo "Creating database..."
${MYSQL_CMD} -e "create database jungle character set utf8 COLLATE utf8_general_ci;"

echo "Creating table"
npx sequelize-cli db:migrate
