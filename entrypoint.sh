#!/bin/bash
npm run migrations:run
npm run prebuild
npm run build
npm run start:prod

