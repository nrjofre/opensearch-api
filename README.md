# Opensearch-api

## Despliegue

 1. ```console
    minikube start
    ```
 2. ```console
    kubectl apply -f k8s
    ```
 3. ```console
    minikube service opensearchapi-service --url
    ```
    - El servicio estará disponible localmente en el puerto retornado por esta llamada.

