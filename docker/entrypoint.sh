#!/bin/sh

# Verifica se o arquivo .env existe na pasta acima e carrega as variáveis
if [ -f "../.env" ]; then
    export $(grep -v '^#' ../.env | xargs)
fi

# Confirma as variáveis carregadas
echo "Usando API_DNS_DL_HOST=$API_DNS_DL_HOST e API_DNS_IP=$API_DNS_IP"

# Substituir as variáveis no template e gerar o arquivo final
envsubst '${API_DNS_DL_HOST} ${API_DNS_IP}' < /etc/dnsmasq.template.conf > /etc/dnsmasq.conf

# Exibe o arquivo gerado para debug
cat /etc/dnsmasq.conf

# Iniciar o dnsmasq
exec dnsmasq --no-daemon
