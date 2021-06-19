---
id: firestormapps_utils
title: FirestormApps Utils
---

A biblioteca [FirestormApps Utils](https://github.com/firestormapps/docs) tem como objetivo expor funções utilitárias, que podem ser utilizadas entre todos os nossos projetos. Essa lib é compatível com qualquer projeto NodeJS, sendo possível instalá-la tanto no *backend*, quanto no *frontend* (Ex. Ant Design Pro, React Native, etc).

**NOTA**:

Essa biblioteca expoe algumas funções diretamente do projeto [brazilian-utils](https://brazilian-utils.com.br/#/) (versão atual `^1.0.0-rc.12`). 

As seguintes funções do `brazilian-utils` são expostas:

- isValidBoleto
- formatBoleto
- isValidCEP
- formatCEP
- isValidCNPJ
- formatCNPJ
- isValidCPF
- formatCPF
- isValidPIS
- isValidEmail

## Instalação


```
npm i @firestormapps/utils
```

ou

```
yarn add @firestormapps/utils
```

____

## Helpers

### Boleto

#### isValidBoleto

Retorna um `boolean` se o número de boleto informado é válido ou não.

```javascript

import { isValidBoleto } from '@firestormapps/utils';

isValidBoleto('00190000090114971860168524522114675860000102656'); // true

```

#### formatBoleto

Adiciona a máscara com pontuação ao número de boleto informado.

```javascript

import { formatBoleto } from '@firestormapps/utils';

formatBoleto('00190000090114971860168524522114675860000102656');

```

### Strings
#### capitalize

Torna maiúscula apenas a primeira letra de cada palavra da frase informada.


```javascript
import { capitalize } from '@firestormapps/utils';

capitalize("Apenas pra gente TESTAR"); // Apenas Pra Gente Testar

```

### getNameInitials

Retorna uma `string` com as letras iniciais do nome informado

```javascript
import { getNameInitials } from '@firestormapps/utils';

getNameInitials('Bora testar'); // BT

```


____

### CEP

#### isValidCEP

Retorna um `boolean` se o CEP informado é válido ou não.

```javascript
import { isValidCEP } from '@firestormapps/utils';

isValidCEP('92500000'); // true

```

#### formatCEP

Adicionar máscara ao número de CEP informado.

```javascript
import { formatCEP } from '@firestormapps/utils';

formatCEP('92500000'); // 92500-000

```

### CNPJ

#### isValidCNPJ

Retorna um `boolean` se o CNPJ informado é válido ou não.

```javascript
import { isValidCNPJ } from '@firestormapps/utils';

isValidCNPJ('15515147234255'); // true/false

```

#### formatCNPJ

Adicionar máscara ao número de CNPJ informado.

```javascript
import { formatCNPJ } from '@firestormapps/utils';

formatCNPJ('245222000174'); // 24.522.200/0174

```
### validateCNPJ

Retorna um `boolean` se o CNPJ informado é válido ou não.

```javascript
import { validateCNPJ } from '@firestormapps/utils';

validateCNPJ('17702663000150'); // true/false

```

### maskCNPJ

Adicionar máscara ao número de CNPJ informado.


```javascript
import { maskCNPJ } from '@firestormapps/utils';

maskCNPJ('17702663000150'); // 17.702.663/0001-50

```

### unmaskCNPJ

Remove a máscara do número de CNPJ informado, retornando apenas os números.


```javascript
import { unmaskCNPJ } from '@firestormapps/utils';

unmaskCNPJ('17.702.663/0001-50'); // 17702663000150

```

### CPF

#### isValidCPF

Retorna um `boolean` se o CPF informado é válido ou não.

```javascript
import { isValidCPF } from '@firestormapps/utils';

isValidCPF('155151475'); // true/false

```

#### formatCPF

Adicionar máscara ao número de CPF informado.

```javascript
import { formatCPF } from '@firestormapps/utils';

formatCPF('746506880'); // 746.506.880

```

#### maskCPF

Adicionar máscara ao número de CPF informado.


```javascript
import { maskCPF } from '@firestormapps/utils';

maskCPF('28832326280'); // 288.323.262-80

```

#### unmaskCPF

Remove a máscara do número de CPF informado, retornando apenas os números.


```javascript
import { unmaskCPF } from '@firestormapps/utils';

unmaskCPF('288.323.262-80'); // 28832326280

```

#### validateCPF

Retorna um `boolean` se o CPF informado é válido ou não.

```javascript
import { validateCPF } from '@firestormapps/utils';

validateCPF('03455455787'); // true/false

```

### Cartão de Crédito

#### validateCreditCardNumber

Retorna um `boolean` se o número de cartão de crédito informado é válido ou não.

```javascript
import { validateCreditCardNumber } from '@firestormapps/utils';

validateCreditCardNumber('5598928852411791'); // true/false

```

#### validateCreditCardExpiration

Retorna um `boolean` se a data de expiração do cartão de crédito informado é válido ou não.

```javascript
import { validateCreditCardExpiration } from '@firestormapps/utils';

validateCreditCardExpiration('12/22'); // true/false

```

#### getCardBrand

Retorna uma `string` com a bandeira do cartão através do número informado (`cardNumber`). Os possíveis retornos são:

- `Elo`,
- `HiperCard`,
- `Visa`,
- `MasterCard`,
- `JCB`,
- `Diners Club`,
- `Discover`,
- `American Express`.

```javascript
import { getCardBrand } from '@firestormapps/utils';

getCardBrand('5284929298198314'); 

/*
retorna: "MasterCard"
*/

```

#### getCreditCardInfo

Retorna um `object` com informações sobre o número de cartão de crédito informado.

```javascript
import { getCreditCardInfo } from '@firestormapps/utils';

getCreditCardInfo('5485775006283622'); 

/*
retorna:

{
    card: {
      niceType: 'Mastercard',
      type: 'mastercard',
      patterns: [[51, 55], [2221, 2229], [223, 229], [23, 26], [270, 271], 2720],
      gaps: [4, 8, 12],
      lengths: [16],
      code: { name: 'CVC', size: 3 },
      matchStrength: 2,
    },
    isPotentiallyValid: false,
    isValid: false,
  };
*/

```

### E-mail

### isValidEmail

Retorna um `boolean` se o CPF informado é válido ou não.

```javascript
import { isValidEmail } from '@firestormapps/utils';

isValidEmail('john.doe@hotmail.com'); // true
```

### Telefone

#### validatePhone

Retorna um `boolean` se o número de telefone informado é válido ou não.

```javascript
import { validatePhone } from '@firestormapps/utils';

validatePhone('(11) 99989-8887'); // true/false

```

#### maskPhone

Adicionar máscara ao número de telefone informado.


```javascript
import { maskPhone } from '@firestormapps/utils';

maskPhone('11999898887'); // (11) 99989-8887

```

#### unmaskPhone

Remove a máscara do número de telefone informado, retornando apenas os números.


```javascript
import { unmaskPhone } from '@firestormapps/utils';

unmaskPhone('(11) 99989-8887'); // 11999898887

```

### PIS

#### isValidPIS

Retorna um `boolean` se o CPF informado é válido ou não.

```javascript
import { isValidPIS } from '@firestormapps/utils';

isValidPIS('12056412547'); // true/false

```
