import {
  convertToCoreMessages,
  createDataStreamResponse,
  DataStreamWriter,
  JSONValue,
  streamText
} from 'ai';
import { manualResearcher } from '../agents/manual-researcher';
import { deepResearch } from '../tools/deep-research';
import { ExtendedCoreMessage } from '../types';
import { getMaxAllowedTokens, truncateMessages } from '../utils/context-window';
import { handleStreamFinish } from './handle-stream-finish';
import { executeToolCall } from './tool-execution';
import { BaseStreamConfig } from './types';

export function createManualToolStreamResponse(config: BaseStreamConfig) {
  return createDataStreamResponse({
    execute: async (dataStream: DataStreamWriter) => {
      const { messages, model, chatId, searchMode, isDeepResearch } = config;
      try {
        const coreMessages = convertToCoreMessages(messages);
        const truncatedMessages = truncateMessages(
          coreMessages,
          getMaxAllowedTokens(model)
        );

        const { toolCallDataAnnotation, toolCallMessages } =
          await executeToolCall(
            truncatedMessages,
            dataStream,
            model,
            searchMode
          );

        let researchResult: any;

        if (isDeepResearch) {
          researchResult = await deepResearch({
            query: messages[messages.length - 1].content,
            breadth: 3,
            depth: 2,
          });

          // Prepend research learnings to the messages for the language model
          const result = researchResult.learnings.join('\n')
          truncatedMessages[0].content = [...truncatedMessages, ...result].join('\n')
        }

        const researcherConfig = manualResearcher({
          messages: [...truncatedMessages, ...toolCallMessages], // Use updated messages
          model,
          isSearchEnabled: searchMode
        })

        const result = streamText({
          ...researcherConfig,
          onFinish: async result => {
            const annotations: ExtendedCoreMessage[] = [
              ...(toolCallDataAnnotation ? [toolCallDataAnnotation] : []),
              {
                role: 'data',
                content: {
                  type: 'reasoning',
                  data: result.reasoning
                } as JSONValue
              }
            ]

            await handleStreamFinish({
              responseMessages: result.response.messages,
              originalMessages: messages,
              model,
              chatId,
              dataStream,
              skipRelatedQuestions: true,
              annotations,
            });
          },
        });

        result.mergeIntoDataStream(dataStream, {
          sendReasoning: true,
        });
      } catch (error) {
        console.error('Stream execution error:', error);
      }
    },
    onError: error => {
      console.error('Stream error:', error);
      return error instanceof Error ? error.message : String(error);
    },
  });
}