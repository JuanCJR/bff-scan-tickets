#!/bin/bash
npm run prebuild
npm run build
npm run start:prod
npm run migrations:run
