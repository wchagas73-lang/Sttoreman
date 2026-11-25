# STTOREMEN | Catálogo digital

Catálogo estático para GitHub + Cloudflare Pages. Não utiliza banco de dados.

## Arquivos principais
- `index.html`: página da loja e catálogo
- `styles.css`: visual responsivo preto e dourado
- `products.js`: cadastro dos produtos, categorias, preços, cores, tamanhos e fotos
- `script.js`: filtros, detalhes, sacola e envio do pedido pelo WhatsApp
- `assets/img/`: fotos dos produtos
- `.github/workflows/extrair-catalogo.yml`: importação automática e segura de atualizações

## Cadastro de produtos

Edite `products.js`. Cada produto deve ter:
- ID único
- Nome, categoria, preço e descrição
- Cores e tamanhos disponíveis
- Lista de caminhos das imagens

Os 16 produtos atuais são exemplos de estrutura. Nomes, preços, descrições, cores, tamanhos e fotos precisam ser confirmados com a loja antes da publicação comercial. Até lá, o catálogo usa uma imagem provisória.

## Fotos dos produtos

1. Crie uma pasta por produto, por exemplo `assets/img/P001/`.
2. Coloque fotos em WebP, preferencialmente nomeadas `01.webp`, `02.webp`, `03.webp` etc.
3. No produto correspondente em `products.js`, informe os caminhos:
   `images:["assets/img/P001/01.webp","assets/img/P001/02.webp","assets/img/P001/03.webp"]`
4. A primeira foto será a imagem principal; as demais aparecem como miniaturas na galeria.

## Atualização automática por ZIP

O workflow não substitui a página nem altera `index.html`, `styles.css` ou `script.js`. Ele importa somente:
- `products.js`
- Arquivos dentro de `assets/img/`

Para atualizar pelo celular:

1. Monte um arquivo chamado exatamente `catalogo-upload.zip`.
2. Dentro do ZIP, coloque os caminhos a partir da raiz, sem uma pasta extra envolvendo tudo.
3. Inclua `products.js` e/ou arquivos em `assets/img/`.
4. Envie esse ZIP para a raiz da branch `main`.
5. O GitHub Actions importa os arquivos permitidos, remove o ZIP e cria um commit automático.

Exemplo de estrutura interna do ZIP:

```
products.js
assets/
  img/
    P001/
      01.webp
      02.webp
    P002/
      01.webp
```

O workflow valida caminhos para impedir gravação fora das pastas permitidas. Ele não apaga fotos antigas automaticamente; se uma foto deixar de ser usada, ela poderá ser removida manualmente do GitHub.

## WhatsApp

O número configurado em `script.js` é `5532999953215`. Para alterar, use DDI + DDD + número, somente dígitos, na constante `WHATSAPP_NUMBER`.

## Cloudflare Pages

Para publicação estática:
- Framework preset: None
- Build command: vazio
- Build output directory: raiz do projeto (`/`)

Se o projeto já estiver conectado ao Cloudflare Pages, um commit na branch principal normalmente inicia uma nova implantação automática. Confirme o status em Deployments no painel Cloudflare.
