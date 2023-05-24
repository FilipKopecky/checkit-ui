# checkit-ui

CheckIt-UI is a front-end application for gestors and other users involved in the AL review process.
It offers its users a clear comparison of changes applied to SGoV, social interactions, and system-wide management for administrators.

## Available scripts
You can run following scripts in the root directory:


```
npm run dev
```
Runs the application in the development mode.
<br />
The application runs on: http://127.0.0.1:5173/modelujeme/v-n%C3%A1stroji/checkit


```
npm run build
```
Builds the application for production.

```
npm run preview
```
Runs the production build.
<br />
The application runs on: http://127.0.0.1:4173/modelujeme/v-n%C3%A1stroji/checkit

## Installation guide
The application requires the following environment variables.
These variables can be edited in the .env file for development mode and the .env.production for a production build.

| Variable name              | Explanation                              |
|----------------------------|------------------------------------------|
| VITE_URL                   | URL address of the application           |
| VITE_APP_ID                | Client ID of authentication server       |
| VITE_AUTHENTICATION_SERVER | URL address of the authentication server |
| VITE_SERVER                | URL address of CheckIt back-end          |

After setting these variables you can run the previously mentioned scripts.

### Secure connection problem
If the authentication server requires a secure connection (HTTPS) for establishing a connection, you need to set up a reverse proxy with an SSL certificate.

#### Generating certificate
To generate a self-signed certificate, open a terminal in a directory where you would like to store your certificate and run the following command. It will generate two files, `localhost.key` and `localhost.crt`, in the current directory. Remember the path because it will be needed for the next step.
```
openssl req -x509 -sha256 -nodes -newkey rsa:2048 -days 365 -keyout localhost.key -out localhost.crt
```
#### Reverse proxy
For the reverse proxy, we will use nginx. If you do not have nginx on your system, please download it. 
<br /> On Linux, use your package manager (https://nginx.org/en/linux_packages.html). 
<br />Windows version can be downloaded from here: https://nginx.org/en/download.html.
<br />
Lastly, you will need to modify the nginx configuration. Below is an example of how the configuration might look like.
```
worker_processes  1;
events {
    worker_connections  1024;
}
http {
    include       mime.types;
    default_type  application/octet-stream;
    sendfile        on;
    keepalive_timeout  65;

    server {
        server_name  localhost;
        listen               443;
        ssl                  on;
        ssl_certificate      path/to/file/localhost.crt;
        ssl_certificate_key  path/to/file/localhost.key;
        ssl_ciphers          HIGH:!aNULL:!MD5;
		
		location /modelujeme {
                proxy_set_header X-Forwarded-Host $host:$server_port;
                proxy_set_header X-Forwarded-Server $host;
                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                proxy_pass http://127.0.0.1:5173/modelujeme;
                proxy_buffer_size 128k;
                proxy_buffers 4 256k;
                proxy_busy_buffers_size 256k;
                proxy_read_timeout 600s;
        }
    }
}
```

The `ssl_certificate` and `ssl_certificate_key` fields must contain your generated files from the previous step. 
<br />
The `proxy_pass` field must contain the URL of CheckIt-UI (port 5173 for development, 4173 for production build)



After configuring the nginx in this way, the CheckIt application will be accessible on https://localhost/modelujeme/v-nástroji/checkit, it is important to have this fact reflected in the environment variables.
Therefore the `VITE_URL` must contain this URL. 

```
VITE_URL=https://localhost/modelujeme/v-nástroji/checkit
```

After that you can start your nginx and the CheckIt-UI.








