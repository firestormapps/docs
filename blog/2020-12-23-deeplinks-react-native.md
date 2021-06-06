---
slug: deeplinks-react-native
title: Como configurar deeplinks no React Native
author: Gustavo Kuze da Silva
author_title: Fullstack developer na FirestormApps!
author_url: https://gustavokuze.com
author_image_url: https://gustavokuze.com/img/gustavo_kuze.jpg
tags: [React Native, Deeplinks]
---

# Introdução

**O que é deeplink? 🤓**

Quando o usuário clicar em um link do site em seu smartphone, uma tela do app é aberta ao invés do navegador (Chrome, Safari, etc). Isso é "deep linking".

____

- [Introdução](#introdução)
  - [Android](#android)
    - [Configurando o servidor](#configurando-o-servidor)
    - [Configurando o App](#configurando-o-app)
    - [Testes](#testes)
  - [iOS](#ios)
    - [Configurando o servidor](#configurando-o-servidor-1)
    - [Configurando o app](#configurando-o-app-1)
    - [Testes](#testes-1)
  - [Como acessar os links no React Native](#como-acessar-os-links-no-react-native)

## Android

### Configurando o servidor

Para que app seja associado ao website, é preciso criar uma arquivo `assetlinks.json` no diretório `.well-known` do website, de tal forma que seja possível acessá-lo assim:

```
https://www.panvel.com/.well-known/assetlinks.json
```

Dentro do arquivo é preciso informar o `package_name` e a hash `SHA-256`. Exemplo de arquivo (dados fakes):


``` json
[{
  "relation": ["delegate_permission/common.handle_all_urls"],
  "target": {
    "namespace": "android_app",
    "package_name": "br.com.panvel",
    "sha256_cert_fingerprints": ["B1:A3:8A:C9:3A:4B:32:92:FF:53:6A:EB:00:32:E9:D6:B8:2A:B1:D3:A3:57:CC:A8:28:A1:1F:AD:94:92:A7:8C"]
  }
}]
```

Atente-se aos seguintes detalhes (extraídos da documentação oficial):

- O arquivo assetlinks.json deve ser exibido com tipo de conteúdo application/json.
- O arquivo assetlinks.json precisa ser acessível por meio de uma conexão HTTPS, independentemente de os filtros de intent do app declararem HTTPS como o esquema de dados ou não.
- O arquivo assetlinks.json precisa ser acessível sem redirecionamentos (sem redirecionamentos 301 ou 302) e ser acessível por bots. O robots.txt precisa permitir o rastreamento de /.well-known/assetlinks.json.
- Se os links do app forem compatíveis com vários domínios de host, publique o arquivo assetlinks.json em cada domínio. Consulte Como oferecer compatibilidade com links de app para diversos hosts.
- Não publique seu app com URLs de desenvolvimento/teste em arquivos de manifesto que podem não ser publicamente acessíveis (por exemplo, todos aqueles que só podem ser acessados com uma VPN). Uma solução alternativa nesses casos é configurar variantes de compilação para gerar outro arquivo de manifesto para versões de desenvolvimento.

## Configurando o App

No arquivo `AndroidManifest.xml`, adicione os caminhos do site que devem ser tratados pelo app:

``` xml
 <activity
        android:name=".MainActivity"
        android:label="@string/app_name"
        android:configChanges="keyboard|keyboardHidden|orientation|screenSize|uiMode"
        android:screenOrientation="portrait"
        android:windowSoftInputMode="adjustResize"
        android:exported="true"
        android:launchMode="singleTask">
        <!-- android:autoVerify="true" é obrigatorio -->
        <intent-filter android:autoVerify="true">
          <action android:name="android.intent.action.VIEW" />
          <category android:name="android.intent.category.DEFAULT" />
          <category android:name="android.intent.category.BROWSABLE" />

            <!-- defina os caminhos que devem ser tratados aqui: -->

          <data android:scheme="https" android:host="www.panvel.com" android:pathPattern="/panvel/.*/p-.*" />
          <data android:scheme="https" android:host="www.panvel.com" android:pathPattern="/panvel/campanha.do" />
          <data android:scheme="https" android:host="www.panvel.com" android:pathPattern="/panvel/promocao.do" />
          <data android:scheme="https" android:host="www.panvel.com" android:pathPattern="/panvel/bem-panvel.do" />
          <data android:scheme="https" android:host="www.panvel.com" android:pathPattern="/panvel/reenviarSenha.do.*" />


        </intent-filter>
        <intent-filter>
          <action android:name="android.intent.action.VIEW" />
          <category android:name="android.intent.category.DEFAULT" />
          <category android:name="android.intent.category.BROWSABLE" />
          <data android:scheme="panvel" />
        </intent-filter>
      </activity>
```


### Testes

É possível testar se o arquivo está devidamente configurado através da seguinte ferramenta: https://developers.google.com/digital-asset-links/tools/generator?hl=pt-br

Para mais informações relacionada à configuração do servidor no Android, favor acessar a documentação oficial: https://developer.android.com/training/app-links/verify-site-associations?hl=pt-br#request-verify


____

## iOS

### Configurando o servidor

Para que app seja associado ao website, é preciso criar uma arquivo `apple-app-site-association` na raiz do site (como feito na `Panvel`), ou no diretório `.well-known`, de tal forma que seja possível acessá-lo assim:

```
https://www.panvel.com/apple-app-site-association
```

Exemplo de arquivo (dados fakes):

``` json
{
  "applinks": {
    "apps": [],
    "details": [
      {
        "appID": "7VCZVTXU85.br.com.panvel",
        "paths": [
          "/panvel/main.do",
          "/panvel/promocao.do",
          "/panvel/campanha.do",
          "/panvel/bem-panvel.do",
          "/panvel/*/p-*"
        ]
      }
    ]
  },
  "webcredentials": {
    "apps": [
      "7VCZVTXU85.br.com.panvel"
    ]
  }
}
```

Atente-se aos seguintes detalhes:

- O arquivo assetlinks.json precisa ser acessível por meio de uma conexão HTTPS, independentemente de os filtros de intent do app declararem HTTPS como o esquema de dados ou não.
- O arquivo assetlinks.json precisa ser acessível sem redirecionamentos (sem redirecionamentos 301 ou 302) e ser acessível por bots. O robots.txt precisa permitir o rastreamento de /.well-known/assetlinks.json.
- O arquivo `apple-app-site-association` precisa ser servido com o header "application/pkcs7-mime"

Segue um exemplo de como servir o header `"application/pkcs7-mime"` no Node JS:

``` javascript
var aasa = fs.readFileSync(__dirname + '/static/apple-app-site-association');
app.get('/apple-app-site-association', function(req, res, next) {
  res.set('Content-Type', 'application/pkcs7-mime');
  res.status(200).send(aasa);
});
```

## Configurando o app

1. No arquivo `AppDelegate.m`, adicione as seguintes instruções:

``` objectivec

#import <React/RCTLinkingManager.h>

...

- (BOOL)application:(UIApplication *)application openURL:(NSURL *)url
  sourceApplication:(NSString *)sourceApplication annotation:(id)annotation
{
  return [RCTLinkingManager application:application openURL:url
                      sourceApplication:sourceApplication annotation:annotation];
}

```

Isto irá transmitir a URL para o código React Native


2. Crie um arquivo de entitlements (ex: `panvel.entitlements`), que indica a qual domínio seu site pertence. Exemplo:

``` xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
	<key>aps-environment</key>
	<string>development</string>
	<key>com.apple.developer.associated-domains</key>
	<array>
		<string>applinks:panvel.com</string>
		<string>applinks:www.panvel.com</string>
	</array>
</dict>
</plist>
```

### Testes

É possível testar se o arquivo está devidamente configurado através da ferramenta: https://limitless-sierra-4673.herokuapp.com/

Para mais informações sobre como configurar o servidor no ios, favor acessar a documentação oficial: https://developer.apple.com/library/archive/documentation/General/Conceptual/AppSearch/UniversalLinks.html

## Como acessar os links no React Native

A URL clicada estará disponível no React Native através do método `Linking.getInitialURL`. Exemplo:

``` javascript
Linking.getInitialURL().then((url) => {
    console.log(`Deeplink clicado: ${url}` )
});
```
