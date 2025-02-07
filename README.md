# Lens (wip)

![Lens](/app/opengraph-image.png)

A minimalistic AI-powered search engine that helps you find information on the internet.

## Features

- **AI-powered search**: Get answers to your questions using Groq's Models.
- **Web search**: Search the web using Tavily's API.
- **URL Specific search**: Get information from a specific URL.
- **Academic Search**: Search for academic papers. 

## LLM used
- [DeepSeek R1 (Distil-Llama 70B)](https://console.groq.com/docs/reasoning)

## Built with
- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vercel AI SDK](https://sdk.vercel.ai/docs)
- [Shadcn/UI](https://ui.shadcn.com/)
- [Tavily](https://tavily.com/)

### Local development

To run the example locally you need to:

1. Sign up for accounts with the AI providers you want to use. OpenAI and Anthropic are required, Tavily is required for the web search feature.
2. Obtain API keys for each provider.
3. Set the required environment variables as shown in the `.env.example` file, but in a new file called `.env.local`.
4. `pnpm install` to install the required dependencies.
5. `pnpm dev` to launch the development server.

# License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
