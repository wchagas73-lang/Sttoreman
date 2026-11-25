# STTOREMEN | Catálogo digital

Pacote estático para GitHub + Cloudflare Pages. Não utiliza banco de dados.

## Estrutura
- `index.html`: página da loja e catálogo
- `styles.css`: visual responsivo preto e dourado
- `products.js`: cadastro dos produtos, categorias, preços, cores, tamanhos e fotos
- `script.js`: filtros, detalhes, sacola e envio do pedido pelo WhatsApp
- `assets/img/`: fotos dos produtos
- `.github/workflows/extrair-catalogo.yml`: extração automática de `catalogo-upload.zip`

## Importante antes de publicar
Os 16 itens em `products.js` são exemplos de estrutura, não representam estoque confirmado. Substitua nomes, preços, descrições e fotos pelos dados reais da loja. As imagens estão apontando para `assets/img/placeholder.svg` até serem trocadas.

O WhatsApp já está configurado para `5532999953215`. Para alterar, edite `WHATSAPP_NUMBER` em `script.js`, usando DDI + DDD + número, somente dígitos.

## Como cadastrar fotos
1. Crie uma pasta para cada produto dentro de `assets/img/`, por exemplo `assets/img/P001/`.
2. Coloque fotos otimizadas em WebP: `01.webp`, `02.webp`, `03.webp` etc.
3. Em `products.js`, altere `images` para:
   `images:["assets/img/P001/01.webp","assets/img/P001/02.webp","assets/img/P001/03.webp"]`
4. A primeira imagem será a principal. As demais aparecem como miniaturas no detalhe.

## Publicação no Cloudflare Pages
Para este projeto estático:
- Build command: vazio
- Build output directory: `/` (raiz do projeto)
- Framework preset: None

Se o painel exigir um diretório de saída, use a raiz conforme a configuração disponível na conta.

## Extração automática no GitHub
O workflow observa o arquivo `catalogo-upload.zip` na raiz do repositório. Quando esse arquivo é enviado para a branch principal, a ação extrai os arquivos para a raiz, remove o ZIP e faz um commit automático.

**Primeira instalação:** o GitHub só executa um workflow que já esteja presente na branch padrão. Por isso, faça uma primeira publicação dos arquivos deste pacote (incluindo `.github/workflows/extrair-catalogo.yml`) no repositório. Depois, para futuras atualizações em lote, envie um ZIP chamado exatamente `catalogo-upload.zip` para a raiz. A ação fará a extração.

Não envie o ZIP de atualização junto com arquivos extraídos manualmente no mesmo commit, para evitar sobrescritas inesperadas.
