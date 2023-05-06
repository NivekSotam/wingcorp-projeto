# catalisa-todo

## Postman

No arquivo MiniCursos.postman_collection.json presente neste repositório faça importação no Postman.
## Instalação

No terminal do VSCode, execute o comando:

```shell
$ npm install
```

## migrações 

opção 1: 
Para fazer as migrações vc deve criar um banco de dados com o nome cursoalunos  no seu localhost

opção 2:
Voce pode configurar o KnexFile.TS e o Objetion.TS para as especificações do seu banco. Consulte a documentação para conseguir configurar corretamente

"migrate:make": cria nova migrações 

```shell
$ npm run migrate:make nome-migracao 
```

"migrate:latest": executa migrações não executadas

```shell
$ npm run migrate:latest
```

"migrate:rollback": volta migrações (Drop Table)

```shell
$ npm run migrate:rollback
```

## Inicialização

No terminal do VSCode, execute o comando:

```shell
$ npm run start
```