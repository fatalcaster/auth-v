
# Auth V

An open source authentication provider for personal projects



## Test Locally
To run this project locally you'll need:

[Podman](https://podman.io/getting-started/installation) [Minikube](https://minikube.sigs.k8s.io/docs/start/) [Kubectl](https://kubernetes.io/docs/tasks/tools/)

To run minikube using podman run:
```bash
minikube start
```
and follow the instructions to setup podman to work without root password. After doing that, run the same command again, it should work this time.

Clone the project
```bash
  git clone https://github.com/fatalcaster/auth-v
```
Go to the project directory

```bash
  cd my-project
```
Install dependencies
```bash
  npm install
```
Run the database deployment
```bash
  kubectl apply -f postgres-depl.yaml
```
Port forward the deployment to the local 5432 port
```bash
  kubectl port-forward deployment/postgres 5432:5432
```
Run tests
```bash
  npm run test
```

