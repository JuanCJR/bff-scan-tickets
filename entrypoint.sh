#!/bin/bash
npm run prebuild
npm run build
npm run migrations:run
npm start
