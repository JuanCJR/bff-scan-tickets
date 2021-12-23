#!/bin/bash
NODE_ENV=prod npm run migrations:run
npm run prebuild
npm run build
npm run start:prod

