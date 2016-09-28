// Generate initial key
openssl genrsa -des3 -out server.key 1024

// Generate a certificate signed request
openssl req -new -key server.key -out server.csr

// Proceeding to remove passphrase
 cp server.key server.key.org
 openssl rsa -in server.key.org -out server.key

// Generating self signed certificate
 openssl x509 -req -days 365 -in server.csr -signkey server.key -out server.crt
