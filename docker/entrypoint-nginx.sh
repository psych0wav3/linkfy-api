#!/bin/sh

# Carregar variáveis do .env que está na pasta acima
if [ -f "../.env" ]; then
    export $(grep -v '^#' ../.env | xargs)
fi

# Confirmação de variáveis carregadas
echo "Rodando Nginx com API_DNS_DL_HOST=$API_DNS_DL_HOST e API_DNS_IP=$API_DNS_IP na porta $API_DNS_PORT"

# Substituir variáveis no template e gerar o arquivo final
envsubst '${API_DNS_DL_HOST} ${API_DNS_IP} ${API_DNS_PORT}' < /etc/nginx/nginx.template.conf > /etc/nginx/nginx.conf

# Exibe o arquivo final para debug
cat /etc/nginx/nginx.conf

# Iniciar o Nginx
exec nginx -g "daemon off;"