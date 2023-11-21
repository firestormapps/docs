---
id: vps_settings
title: Como Configurar o VPS
---

## Antes de começar

Utilizar o usuário `root` para acesso SSH é uma má prática. Crie outro usuário com privilégios administrativos para gerenciar a VPS. Por padrão, damos o nome `dev` ao nosso usuário principal da VPS.

### Crie o usuário **dev**

Configure o servidor VPS e crie um usuário `dev` com privilégios administrativos:

1. No bash, execute o comando

```
ssh root@ip.da.maquina
```

2. Aceitar fingerprint
3. Colar senha de acesso definida no painel administrativo

4. Crie um novo usuário

```
adduser dev
```

5. Dê a ele privilégios administrativos

```
usermod -aG sudo dev
```

## Atualizar dependências do Ubuntu

```
sudo apt update
```

```
sudo apt upgrade
```

## Instalar Node, yarn e pm2

1. Acesse o terminal via SSH com o novo usuário de dev

```
ssh dev@ip.da.maquina
```

2. Instale o NVM seguindo o [passo-a-passo oficial](https://github.com/nvm-sh/nvm#install--update-script)

```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
```

```
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
```

3. Abra um novo terminal e liste as instalações disponíveis do node

```
nvm ls-remote
```

4. Instale a versão `14.17.5` ou mais atual do Node

```
nvm install v14.17.5
```

5. Instale o yarn

```
npm install yarn -g
```

6. Instale o pm2

```
sudo npm install pm2@latest -g
```

## Instalar e configurar nginx

1. Atualize as dependências do Ubuntu

```
sudo apt update
```

2. Instale o Nginx

```
sudo apt install nginx
```

3. Crie os arquivos de configuração do nginx

3.1. Configure as configurações de firewall para que o nginx funcione corretamente (talvez não seja necessário dependendo do host)

```
sudo ufw app list

sudo ufw status

sudo ufw allow 'Nginx HTTP'

sudo ufw status

systemctl status nginx
```

3.2. (LEGADO) Crie a pasta de onde os arquivos da landing page serão servidos:

```
sudo mkdir -p /var/www/firestormapps.com.br/html

sudo chown -R $USER:$USER /var/www/firestormapps.com.br/html

sudo chmod -R 755 /var/www/firestormapps.com.br
```

3.3. (LEGADO) Coloque a [landing page](https://github.com/firestormapps/landing) no diretório `/var/www/firestormapps.com.br/html`

3.4. Crie os arquivos de configuração do nginx para os domínios `firestormapps.com.br` e `lojana.net`:

Crie o arquivo

```
sudo nano /etc/nginx/sites-available/firestormapps.com.br
```

Com o conteúdo

```
server {
	server_name www.firestormapps.com.br;

	return 301 $scheme://firestormapps.com.br$request_uri;
}

server {
	# root /var/www/firestormapps.com.br/html;
	root /home/dev/git/landing;

	index index.html index.htm index.nginx-debian.html;

	server_name firestormapps.com.br;
}
```
e o arquivo

```
sudo nano /etc/nginx/sites-available/lojana.net
```

Com o conteúdo

```
server {

	server_name www.lojana.net;

	return 301 $scheme://lojana.net$request_uri;
}

server {

	# root /var/www/lojana.net/html;
	root /home/dev/git/landing;

	index index.html index.htm index.nginx-debian.html;

	server_name lojana.net;

	#START_ECOMMERCE_BLOCK

	#TEMPLATE_HOLDER

	#INIT_platform
	location /platform/_next/static {
		alias /home/dev/git/platform/frontend/.next/static;
		add_header Cache-Control "public, max-age=3600, immutable";
	}

	location /platform-backend {

		rewrite ^/platform-backend/(.*)$ /$1 break;

		proxy_pass http://127.0.0.1:8099;

		proxy_http_version 1.1;

		proxy_set_header Upgrade $http_upgrade;

		proxy_set_header Connection 'upgrade';

		proxy_set_header Host $host;

		proxy_cache_bypass $http_upgrade;
	}

	location /platform {

		proxy_pass http://127.0.0.1:3044;

		proxy_http_version 1.1;

		proxy_set_header Upgrade $http_upgrade;

		proxy_set_header Connection 'upgrade';

		proxy_set_header Host $host;

		proxy_cache_bypass $http_upgrade;
	}
	#END_platform
	#INIT_template
	location /template/_next/static {
		alias /home/dev/git/template/frontend/.next/static;
		add_header Cache-Control "public, max-age=3600, immutable";
	}

	location /template-backend {

		rewrite ^/template-backend/(.*)$ /$1 break;

		proxy_pass http://127.0.0.1:8098;

		proxy_http_version 1.1;

		proxy_set_header Upgrade $http_upgrade;

		proxy_set_header Connection 'upgrade';

		proxy_set_header Host $host;

		proxy_cache_bypass $http_upgrade;
	}

	location /template {

		proxy_pass http://127.0.0.1:3043;

		proxy_http_version 1.1;

		proxy_set_header Upgrade $http_upgrade;

		proxy_set_header Connection 'upgrade';

		proxy_set_header Host $host;

		proxy_cache_bypass $http_upgrade;
	}
	#END_template

	#FINISH_ECOMMERCE_BLOCK

	location /dpr {

		rewrite ^/dpr/(.*)$ /$1 break;

		proxy_pass http://127.0.0.1:5505;

		proxy_http_version 1.1;

		proxy_set_header Upgrade $http_upgrade;

		proxy_set_header Connection 'upgrade';

		proxy_set_header Host $host;

		proxy_cache_bypass $http_upgrade;
	}

	location /fizumpanoporengano {

		rewrite ^/fizumpanoporengano/(.*)$ /$1 break;

		proxy_pass http://127.0.0.1:8055;

		proxy_http_version 1.1;

		proxy_set_header Upgrade $http_upgrade;

		proxy_set_header Connection 'upgrade';

		proxy_set_header Host $host;

		proxy_cache_bypass $http_upgrade;
	}
}
```

3.5. Crie um link para cada um dos arquivos na pasta `sites-enabled`:

```
sudo ln -s /etc/nginx/sites-available/firestormapps.com.br /etc/nginx/sites-enabled/
```

```
sudo ln -s /etc/nginx/sites-available/lojana.net /etc/nginx/sites-enabled/
```

3.6. Descomente a diretiva #server_names_hash_bucket_size, tirando o #

```
sudo nano /etc/nginx/nginx.conf
```

```
...
http {
    ...
    server_names_hash_bucket_size 64;
    ...
}
...
```

3.7. Verifique se a configuração do nginx está OK

```
sudo nginx -t
```

3.8. Reinicie o nginx

```
sudo systemctl restart nginx
```

1. Substitua o Apache pelo Nginx

Caso ocorra alguma erro para iniciar o nginx no Ubuntu 20.04, possivelmente é porque o Apache está utilizando a porta 80
Para resolver, basta desabilitar (NÃO REMOVER) o Apache: https://www.cyberciti.biz/faq/how-do-i-stop-apache-from-starting-on-linux/

4.1. Pare o serviço do Apache e desabilite-o:

```
sudo systemctl stop apache2
```
e

```
sudo systemctl disable apache2
```

4.2. Inicie o nginx e garanta que ele será reiniciado ao reiniciar a máquina:

```
sudo systemctl start nginx
```
e

```
sudo systemctl enable nginx
```

### Permitir sudo sem senha para reiniciar o serviço via Node

1. Crie o arquivo para execução de comandos sudo sem senha:

```
sudo nano /etc/sudoers.d/dev
```

2. Cole o conteúdo

```
dev ALL=(ALL) NOPASSWD: /usr/sbin/service nginx start,/usr/sbin/service nginx stop,/usr/sbin/service nginx restart
```

3. Garanta que o arquivo só possa alterado via root:

```
sudo chmod 0440 /etc/sudoers.d/dev
```

4. Altere o usuário dono dos arquivos do nginx para que o Node (sendo executado a partir do usuário `dev`) seja capaz de reescrever esses arquivos:

```
sudo chown -R dev:dev /etc/nginx/sites-available
```

## Configurando HTTPS (SSL)

1. Instalar as dependências do cert bot

```
sudo apt install certbot python3-certbot-nginx
```

2. Habilite o tráfego HTTPS no nginx

```
sudo ufw allow 'Nginx Full'
sudo ufw delete allow 'Nginx HTTP'
```

3. Obtenha o certificado Let's Encrypt via cert bot

```
sudo certbot --nginx -d firestormapps.com.br -d www.firestormapps.com.br -d lojana.net -d www.lojana.net
```

4. Entre com o e-mail do responsável
5. Concorde com os termos
6. Selecione a opção para redirecionar todo o tráfego HTTP para HTTPS
7. Em teoria está tudo certo e seu site já pode ser acesso de maneira segura com HTTPS! 🥳

**DICA**: O certificado Let's Encrypt só é válido por um período de 90 dias, e precisa ser atualizado para que o HTTPS continue funcionando. O Cert bot 
possui a funcionalidade de auto atualização e ela pode ser verificada da seguinte maneira:

Rode o comando para verificar se o timer está ativo:

```
sudo systemctl status certbot.timer
```

O output deve ser algo semelhante à:

```
● certbot.timer - Run certbot twice daily
     Loaded: loaded (/lib/systemd/system/certbot.timer; enabled; vendor preset: enabled)
     Active: active (waiting) since Mon 2020-05-04 20:04:36 UTC; 2 weeks 1 days ago
    Trigger: Thu 2020-05-21 05:22:32 UTC; 9h left
   Triggers: ● certbot.service
```

É também possível simular o processo de atualização automática de certificado, executando o seguinte comando:

```
sudo certbot renew --dry-run
```

O resultado deve ser algo semelhante à:

```
Saving debug log to /var/log/letsencrypt/letsencrypt.log

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Processing /etc/letsencrypt/renewal/firestormapps.com.br.conf
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Cert not due for renewal, but simulating renewal for dry run
Plugins selected: Authenticator nginx, Installer nginx
Renewing an existing certificate
Performing the following challenges:
http-01 challenge for firestormapps.com.br
http-01 challenge for www.firestormapps.com.br
Waiting for verification...
Cleaning up challenges

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
new certificate deployed with reload of nginx server; fullchain is
/etc/letsencrypt/live/firestormapps.com.br/fullchain.pem
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
** DRY RUN: simulating 'certbot renew' close to cert expiry
**          (The test certificates below have not been saved.)

Congratulations, all renewals succeeded. The following certs have been renewed:
  /etc/letsencrypt/live/firestormapps.com.br/fullchain.pem (success)
** DRY RUN: simulating 'certbot renew' close to cert expiry
**          (The test certificates above have not been saved.)
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

IMPORTANT NOTES:
 - Your account credentials have been saved in your Certbot
   configuration directory at /etc/letsencrypt. You should make a
   secure backup of this folder now. This configuration directory will
   also contain certificates and private keys obtained by Certbot so
   making regular backups of this folder is ideal.

```

## Configurar FTP

https://phoenixnap.com/kb/install-ftp-server-on-ubuntu-vsftpd

1. Atualize as dependências do Ubuntu

```
sudo apt update
```

2. Instale o `vsftpd`

```
sudo apt install vsftpd
```

3. Inicie o serviço

```
sudo systemctl start vsftpd
```

```
sudo systemctl enable vsftpd
```

4. Faça backup do arquivo de configuração:

```
sudo cp /etc/vsftpd.conf  /etc/vsftpd.conf_default
```

5. Permita a configuração de firewall (talvez não seja necessário dependendo do host)

```
sudo ufw allow 20/tcp
```

```
sudo ufw allow 21/tcp
```

6. Abra o arquivo `sudo nano /etc/vsftpd.conf` e garanta que ele tenha a seguinte configuração:

```
listen=NO
listen_ipv6=YES
anonymous_enable=NO
local_enable=YES
write_enable=YES
dirmessage_enable=YES
use_localtime=YES
xferlog_enable=YES
connect_from_port_20=YES
chroot_local_user=YES
chroot_list_enable=YES
chroot_list_file=/etc/vsftpd.chroot_list
secure_chroot_dir=/var/run/vsftpd/empty
pam_service_name=vsftpd
rsa_cert_file=/etc/ssl/certs/ssl-cert-snakeoil.pem
rsa_private_key_file=/etc/ssl/private/ssl-cert-snakeoil.key
ssl_enable=NO
file_open_mode=0777
local_umask=022
```

7. Adicione o user `dev` aos usuários cuja pasta `/home` deve ser exposta ao FTP:

```
sudo nano /etc/vsftpd.chroot_list
```

Adicione o texto

```
dev

```

**NOTA**: deixe uma linha sobrando em branco, exatamente conforme descrito acima

8. Reinicie o serviço após alterar estes arquivos

```
sudo systemctl restart vsftpd.service
```

Mais detalhes no link: https://phoenixnap.com/kb/install-ftp-server-on-ubuntu-vsftpd

## Instalar Desktop Environment

```
sudo apt update
```

```
apt install tasksel -y
```

```
sudo tasksel
```

```
sudo systemctl set-default graphical.target
```

Instale o Ubuntu Desktop (ou Gnome Desktop Environment)

## Configure acesso remoto

1. Atualize as dependências do Ubuntu

```
sudo apt update && sudo apt upgrade
```

2. Instale o XRDP

```
sudo apt install xrdp -y
```

3. Verifique se o serviço está rodando corretamente

```
sudo systemctl status xrdp
```

4. Um novo usuário `xrdp` é adicionado automaticamente ao instalar o XRDP. Adicione este usuário ao grupo `ssl-cert` para que a configuração funcione corretamente:

```
sudo usermod -a -G ssl-cert xrdp
```

5. Adicione a seguinte configuração ao arquivo `sudo nano /etc/xrdp/startwm.sh`, após o `fi` e antes da linha `test -x /etc`

```

unset DBUS_SESSION_BUS_ADDRESS
unset XDG_RUNTIME_DIR

```

6. Reinicie o serviço

```
sudo systemctl restart xrdp
```

Mais detalhes no link: https://tecadmin.net/how-to-install-xrdp-on-ubuntu-20-04/

## Instalar o Docker

Siga as instruções da [documentação oficial](https://docs.docker.com/engine/install/ubuntu/#install-using-the-repository) para instalação do Docker Engine.

**NOTA**: Na VPS de 2GB não é possível rodar o Docker Desktop

### Instalar Redis via Docker

1. Baixe a imagem do Redis do Docker Hub

```
docker pull redis
```

2. Crie um container com a imagem baixada

```
docker run --restart=always -d -p 6379:6379 --name redis-server -i -t redis:latest
```

3. Verifique se o container está rodando

```
docker exec -it redis-server redis-cli
```

```
ping
```

O retorno do **redis-cli** que roda dentro do container deve ser `PONG`

### Configurar gerenciamento de memoria para funcionar com BullMQ

Para que o BullMQ funcione corretamente, é necessário configurar o Redis para que ele não remova os dados da memória quando a mesma estiver cheia. Para mais informações, veja a [documentação oficial do BullMQ](https://docs.bullmq.io/guide/going-to-production#max-memory-policy).

1. Acesse o container

```bash
docker exec -it redis-server bash
```

2. Acesse a CLI do Redis

```bash
redis-cli
```

3. Configure o Redis para gerenciar a memória de maneira correta

```bash
CONFIG SET maxmemory-policy noeviction
```

:::tip

**Dica**: O comando retornará `OK` quando a configuração for aplicada corretamente.

:::

____

Documentação baseada no README do projeto [restaurant-api](https://github.com/firestormapps/restaurant-api/blob/main/README.md)
