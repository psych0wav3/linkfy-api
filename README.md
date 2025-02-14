# Linkfy API

## Modo Dev

### Criando DNS personalizado para testar o Dynamic Link

```bash
brew install dnsmasq
```

```bash
sudo nano /usr/local/etc/dnsmasq.conf
```
Adicione no arquivo a linha abaixo subistituindo `<IP-DA-MAQUINA>` pelo ip real da sua máquina.

```bash
address=/link.dotz.com.br/<IP-DA-MAQUINA>
```
Salve e saia com: `Ctrl + x`, depois `y` e `Enter`.

Inicie o dnsmasq:
```bash
sudo brew services start dnsmasq
```

Teste para ver se esta resolvendo o link: 
```bash
nslookup link.dotz.com.br 127.0.0.1
```

Se o retorno for algo como: 

```bash
Server:  127.0.0.1
Address: 127.0.0.1#53

Name:    link.dotz.com.br
Address: <IP-DA-MAQUINA>
```

Entao esta tudo correto.

Altere as variaveis `API_DNS_IP` para o IP da sua maquina para o docker configurar o proxy.

Apos finalizar execute: 
```bash
yarn start:dev
```
Esse comando ira iniciar o docker e seus containers necessarios para desenvolvimento (banco, redis, proxy).