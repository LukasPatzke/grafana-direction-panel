#!/bin/bash
docker volume create grafana-direction-panel-storage

echo "Starting Grafana at http://localhost:3000. Username: Admin Password: dev"

docker run -d \
-p 3000:3000 \
-v grafana-direction-panel-storage:/var/lib/grafana \
-v "$(pwd)":/var/lib/grafana/plugins/lukaspatzke-direction-panel \
--name=grafana-direction-panel \
-e "GF_PLUGINS_ALLOW_LOADING_UNSIGNED_PLUGINS=lukaspatzke-direction-panel" \
-e "GF_SECURITY_ADMIN_PASSWORD=dev" \
grafana/grafana:latest
