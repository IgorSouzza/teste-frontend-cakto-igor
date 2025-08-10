# Teste Front-end

_Simula a criação de um fluxo de mini-checkout para a venda de um curso digital. O objetivo central é demonstrar a implementação da lógica de negócio, incluindo o cálculo dinâmico de taxas de parcelamento e a exibição de um resumo do pedido em tempo real._

## 🚀 Decisões Técnicas

- Para a organização do código-fonte, foi adotada a abordagem de **Feature-Based Folders** (pastas baseadas em funcionalidades). Neste modelo, em vez de agrupar arquivos por seu tipo técnico (como components, hooks, services), todos os artefatos relacionados a uma mesma funcionalidade de negócio são encapsulados em um único diretório. Por exemplo, toda a lógica do checkout, incluindo seus componentes, tipos e serviços, reside no diretório src/features/checkout.
- **Zustand**: Escolhido pela simplicidade e performance, gerenciando o estado global com o mínimo de boilerplate e evitando re-renderizações desnecessárias.
- **React Hook Form**: Utilizado para garantir formulários de alta performance, minimizando re-renderizações ao usar componentes não controlados e simplificando a lógica de validação.
- **TailwindCSS**: Adotado para agilizar o desenvolvimento de interfaces. Sua abordagem utility-first permite construir layouts consistentes diretamente no JSX.
- **Framer Motion**: Selecionado para criar microinterações e animações fluidas, melhorando o feedback visual e a experiência do usuário de forma declarativa.
- **Next.js Server Actions**: Implementado para simplificar e proteger as chamadas ao back-end, permitindo executar lógica no servidor sem a necessidade de criar APIs manualmente.

A escolha do **TypeScript** foi fundamental para adicionar uma camada de segurança de tipos, prevenindo bugs comuns em tempo de desenvolvimento e melhorando a clareza das interfaces.

## ⚙️ Como Rodar Localmente

Siga os passos abaixo para configurar e executar o projeto em seu ambiente de desenvolvimento.

1.  **Clone o repositório**

    ```bash
    git clone https://github.com/IgorSouzza/teste-frontend-cakto-igor
    cd teste-frontend-cakto-igor
    ```

2.  **Instale as dependências**
    Este projeto utiliza `npm` para gerenciamento de pacotes. Execute o comando abaixo na raiz do projeto:

    ```bash
    npm install
    ```

3.  **Execute o projeto**
    Para iniciar o servidor de desenvolvimento ou rodar a aplicação principal, use:
    ```bash
    npm run dev
    ```
    _(Lembre-se de ajustar este comando se o seu script no `package.json` for diferente, como `npm start`)_.

## ✅ Testes

A integridade da lógica de negócio é validada através de uma suíte de testes automatizados. Para executar todos os testes e verificar se tudo está funcionando como esperado, utilize o comando:

```bash
npm run test
```

## 🌍 Versão online
[Acesse a versão online aqui](https://teste-frontend-cakto-igor.vercel.app/checkout/1)


## 💡 Se tivesse mais tempo, o que você faria para aumentar a conversão deste checkout?

- Adicionaria elementos que geram confiança, como selos de segurança ('Compra Segura'), logos das bandeiras de cartão, e talvez um pequeno depoimento de um cliente satisfeito.
- Inclusão de um cronômetro para o fim da oferta ou um aviso de 'últimas vagas com este preço' para incentivar a decisão no momento.
- Implementaria uma automação simples que, caso o usuário preencha o e-mail mas não conclua a compra, enviaria um lembrete amigável após algumas horas, talvez até com um pequeno benefício para incentivá-lo a voltar.