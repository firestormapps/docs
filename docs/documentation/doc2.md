---
id: doc2
title: Sintaxe Markdown
---

Você pode escrever novos documentos, ou editar arquivos de documentação, utilizando a [sintaxe de markdown do Github](https://github.github.com/gfm/).

:::tip

**Dica**: Utilize a extensão [Markdown All in One](https://marketplace.visualstudio.com/items?itemName=yzhang.markdown-all-in-one) no VSCode, para aumentar sua produtividade ao escrever arquivos `".md"`.

:::

## Sintaxe Markdown

Siga estes exemplos para estilizar os arquivos markdown da documentação.

## `##` Headers

É possível definir o tamanho dos títulos, usando de 1 a 6 hashtags `(#)`

# `#` H1 - Documente hoje pra evitar dor de cabeça amanhã

## `##` H2 - Documente hoje pra evitar dor de cabeça amanhã

### `###` H3 - Documente hoje pra evitar dor de cabeça amanhã

#### `####` H4 - Documente hoje pra evitar dor de cabeça amanhã

##### `#####` H5 - Documente hoje pra evitar dor de cabeça amanhã

###### `######` H6 - Documente hoje pra evitar dor de cabeça amanhã

---

## Ênfase

Ênfase, também conhecido como itálico, pode ser feito com *asteriscos* `(*)` or _underlines_ `(_)`.

Podemos usar negrito com **duplos asteríscos** `(**)` ou __duplos underlines__ `(__)`.

Podemos obter ambos os efeitos ao mesmo tempo também, colocando duplos asteríscos ao redor da frase, e underlines apenas na palavra que quisermos o itálico **queijo e _mortadela_** (a palavra `mortadela` está em negrito e em itálico).

A palavra "riscada" pode ser obtida com um par de tils. ~~PHP.~~ `(~~)`

---

## Listas

Listas ordenadas, podem ser obtidas separando os itens por linha, começando com um número e colocando um ponto final em seguida:

```
1. primeiro item da lista
```

1. Primeiro item de uma lista ordenada
1. Outro
   - Aqui tem uma sublista, não ordenada;
1. Tanto faz o número antes do ponto, só precisa ser um número
   1. Sublista, ordenada;
1. Mas que barbaridade.

____

Listas não ordenadas

* Aqui tem um ítem usando asterísco `(*)`

- Aqui tem um ítem usando hífen `(-)`

+ Mas também da pra usar o sinal de adição `(+)`

---

## Links

[Eu sou um link normal](https://www.google.com/)

[Eu sou um link com tooltip, passa o mouse em cima de mim](https://www.google.com/ "Eu sou uma tooltip")

Você pode tornar uma URL um link, colocando-a dentro de sinais de menor e maior:

exemplo:

`<http://www.example.com>`


resultado:
<http://www.example.com>

Some text to show that the reference links can follow later.

---

## Imagens

Inline-style: ![Texto alternativo](https://github.com/adam-p/markdown-here/raw/master/src/common/images/icon48.png 'Título para a logo 1')

Reference-style: ![Texto alternativo][logo]

[logo]: https://github.com/adam-p/markdown-here/raw/master/src/common/images/icon48.png 'Título para a logo 2'

Imagens de qualquer pasta podem ser usadas, passando o caminho até o arquivo. O caminho deve ser relativo ao arquivo atual.

exemplo:

![img](../../static/img/logo.svg)

---

## Código

Para exemplificar trechos de código na documentação, utilizasse 3 crases `(```)`, seguidas da linguagem utilizada no código. Não esqueça de fechar com mais 3 crases ao final do código.

Exemplos

```
```javascript <código>```:

```

```javascript
var s = 'JavaScript com demarcação de sintaxe';
alert(s);
```

```
```python <código>```:

```

```python
s = "Python com demarcação de sintaxe"
print(s)
```


```js {2}
function highlightMe() {
  console.log('This line can be highlighted!');
}
```

**Nota**: Se não indicarmos nenhuma linguagem após as 3 primeiras crases, nenhum *highlight* (demarcação) de código e usado.

---

## Tabelas

Podemos usar dois pontos `(:)` para alinhar o texto das colunas.

| Tables        |      Are      |   Cool |
| ------------- | :-----------: | -----: |
| col 3 is      | right-aligned | \$1600 |
| col 2 is      |   centered    |   \$12 |
| zebra stripes |   are neat    |    \$1 |

---

## Citações

Caso queira adicionar uma citação à outra documentação, ou artigo, comece uma linha com "> ":

> The only valid measurement of code quality: WTF/Minute.

---

## HTML puro

<dl>
  <dt>É possível utilizar algumas tags de HTML puro</dt>
  <dd>em sua documentação.</dd>

  <dt>Mas isso não é muito indicado</dt>
  <dd>pois <em>dificulta</em> a legibilidade e foge do <strong>padrão</strong>. Então evite.</dd>
</dl>

---

## Quebra de linha

Aqui a gente tem uma linha


Já essa aqui é outra linha, separada por *dois* "enters", sendo assim um **novo** parágrafo.

Essa linha também está separada da de cima, porém por apenas *um* "enter". Sendo assim, ela pertence ao mesmo parágrafo.

---

## Alertas

:::note

Isso é uma nova

:::

:::tip

Isso é uma dica

:::

:::important

Informação importante!

:::

:::caution

Calma lá, isso é um alerta.

:::

:::warning

ATENÇÃO! Isso é uma mensagem de perigo.

:::

