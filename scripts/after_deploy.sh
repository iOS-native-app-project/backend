#!/bin/bash
REPOSITORY=/home/ubuntu/jaksim
cd $REPOSITORY

cd secret
sudo mv .env.production ../
cd ..

npm run start:prod