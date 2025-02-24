# Linkfy API

## Modo Dev

### Configurando desenvolvimento

```bash
yarn config:dev
```

Apos finalizar execute: 
```bash
yarn start:dev
```
Esse comando ira iniciar o docker e seus containers necessarios para desenvolvimento (banco, redis, proxy).

No seu aparelho celular: 

- Vai ate as Configurações de Wifi.
- Na sua rede local vai alterar DNS.
- Remova todos os outros IP`s.
- Adicione o IP da sua maquina.
- Salve e teste acessar `http://link.dotz.com.br`

Ps: A internet ficara indisponivel no aparelho enquanto tiver com o DNS sa sua maquina, apos finalizar esquecer a rede e reconectar novamente para pegar os DNS de saida corretos.