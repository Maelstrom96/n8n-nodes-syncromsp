![CI](https://img.shields.io/github/workflow/status/Maelstrom96/n8n-nodes-syncromsp/CI/main) ![NPMV](https://img.shields.io/npm/v/n8n-nodes-syncromsp)
# n8n-nodes-syncromsp

This package provides nodes for [`n8n`](https://github.com/n8n-io/n8n) to work with [SyncroMSP](https://syncromsp.com).

## Installation

### In a local NPM installation

```bash
npm i n8n-nodes-syncromsp
```

The nodes should be automatically discovered by `n8n`. If not, setting the environment variable as described below should work.

### In a global installation

```bash
npm i -g n8n-nodes-syncromsp
```

You should then set the `N8N_CUSTOM_EXTENSIONS` variable to the path of the modules, e.g. 

- on Ubuntu:
```bash
export N8N_CUSTOM_EXTENSIONS="/usr/local/lib/node_modules/n8n-nodes-syncromsp"
```

- on Windows
```bash
setx N8N_CUSTOM_EXTENSIONS "%appdata%\npm\node_modules\n8n-nodes-syncromsp"
```

### In a Docker image

You'll have to spin your own `Dockerfile` that builds from the official `n8n` image:


```Dockerfile
FROM n8nio/n8n

USER root

RUN npm_config_user=root npm install -g n8n-nodes-syncromsp

ENV N8N_CUSTOM_EXTENSIONS "/usr/local/lib/node_modules/n8n-nodes-syncromsp"

```

## Usage

### Credentials

The credentials uses 2 variables : `API Token` and `API Subdomain`.

- `API Token` : You will need to generate a token using the [API Token menu](https://admin.syncromsp.com/api_tokens) found in the Admin section of Syncro. Make sure that you add the necessary permissions in order for the node actions to work properly.
- `API Subdomain` : This is your SyncroMSP subdomain that was chosen when creating your account. (e.g. `XXXXX.syncromsp.com`, `XXXXX` being your API subdomain)
