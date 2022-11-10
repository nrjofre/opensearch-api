la imagen esta subida ya en dockerhub por los developers de opensearch:

docker-compose up

el compose podria tirar error por memoria dependiendo de la memoria asignada en el wsl (windows)

tonces metiendose al wsl uno tiene que modificar la memoria

como ejemplo: meterse a distro de ubuntu

cd /etc

sudo vim sysctl.conf

escribir esto en la ultima linea del archivo:

vm.max_map_count=262144

para cerrar y guardar:

:x

para actualizar la memoria:

sudo sysctl -p

(si sample.json no esta generado correr generator.py)

despues de buildear, para subir la data:

curl -H "Content-Type: application/x-ndjson" -POST https://localhost:9200/data/_bulk -u 'admin:admin' --insecure --data-binary "@sample.json"

si tira error: 

Remove-item alias:curl 

y volver a ejecutar

dashboard:

http://localhost:5601