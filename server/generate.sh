#!/bin/bash
cd "$(dirname "$0")"

cp openapi.yaml cmd/sourcetab/public/swagger/
go generate ./...
