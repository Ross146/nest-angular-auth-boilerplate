#!/usr/bin/env bash

set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    CREATE USER rebirth;
    CREATE DATABASE rebirth_db ENCODING UTF8;
    GRANT ALL PRIVILEGES ON DATABASE rebirth_db TO rebirth;
    ALTER USER rebirth WITH PASSWORD 'password123';
    ALTER USER rebirth WITH SUPERUSER;
EOSQL
