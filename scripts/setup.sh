#!/bin/bash

# check for unused npm dependencies in a project
#code

cp variables.env.sample variables.env

# run npm install
npm install

# run seed
# create the admin data
npm run start:full

# pm2
pm2 delete -s production || :
pm2 start ./index.js --name=production

# ✅ TESTED
