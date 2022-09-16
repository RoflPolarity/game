#!/usr/bin/env bash


echo 'Copy files...'

scp -i ssh-key-2022-02-20.key build/libs/serving-web-content-0.0.1-SNAPSHOT-plain.jar ubuntu@130.162.247.7:/home/ubuntu/

echo 'Restart server...'

ssh -i C:/Users/RoflPolarity/IdeaProjects/GameLab/ssh-key-2022-02-20.key ubuntu@130.162.247.7 << EOF

pgrep java | xargs kill -9
nohup java -jar serving-web-content-0.0.1-SNAPSHOT-plain.jar > log.txt &

EOF

echo 'Bye'
