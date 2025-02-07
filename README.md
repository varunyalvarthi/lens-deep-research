# Lens

![Lens](/app/opengraph-image.png)

A minimalistic AI-powered search engine that helps you find and analyze information on the internet with advanced AI models.

## Features

- **AI-Powered Search**: Get answers using Groq's AI models.
- **Web Search**: Retrieve results from the internet using Tavily's API.
- **URL-Specific Search**: Extract insights from a given webpage.
- **Academic Search**: Locate scholarly papers and research materials.
- **Deep Research**: Perform iterative, multi-step research leveraging AI-driven search refinement (see details below).

## LLM Used

- [Gemini 2.0](https://ai.google.dev/)

## Built With

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vercel AI SDK](https://sdk.vercel.ai/docs)
- [Shadcn/UI](https://ui.shadcn.com/)
- [Tavily](https://tavily.com/)

## Deep Research: AI-Powered Knowledge Discovery

The **Deep Research** feature enables comprehensive AI-driven investigation of topics by:

1. **Generating multiple search queries**: AI formulates distinct SERP queries based on the initial user input and prior learnings.
2. **Extracting insights from search results**: AI processes search content to summarize key learnings and highlight critical entities, dates, and metrics.
3. **Generating follow-up queries**: AI refines and expands the research direction based on gathered insights.
4. **Iterating across multiple depths**: Searches recursively analyze deeper information layers based on structured research goals.
5. **Optimizing research efficiency**: Using parallelized, rate-limited search execution for speed and precision.

This enables a more effective way to explore complex topics with AI-powered intelligence and automation.

## Local Development

To run the project locally:

1. Sign up for accounts with required AI providers (Google AI, Tavily).
2. Obtain API keys for each provider.
3. Copy `.env.example` to `.env.local` and set environment variables.
4. Install dependencies: `pnpm install`.
5. Run `docker composer up -d` to redis.
6. Start the development server: `pnpm dev`.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
