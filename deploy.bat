docker login registry.gitlab.com -u danphi
docker build -t registry.gitlab.com/danphi/kingdoms .
docker push registry.gitlab.com/danphi/kingdoms
ssh root@nimp.app "cd /shipyard/compose; docker-compose pull; docker-compose up -d"