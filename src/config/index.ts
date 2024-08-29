import { config } from 'dotenv';

config();

// Configuration for OpenAI specific parameters
const openAI = {
  apiKey: process.env.OPENAI_API_KEY, // Your OpenAI API key for authentication against the OpenAI services
  chatCompletionModel: 'gpt-4o-mini', // The model used by OpenAI for chat completions, can be changed to use different models. It is important to use a "vision" version to be able to identify images
  imageCreationModel: 'dall-e-3', // The model used by OpenAI for generating images based on text description
  speechModel: 'tts-1', // The model used by OpenAI for generating speech from text
  speechVoice: "nova", // Specifies the voice model to be used in speech synthesis,
  transcriptionLanguage: "en" //The language of the input audio for transcriptions. Supplying the input language in [ISO-639-1](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) format will improve accuracy and latency.
};

// Configuration for Anthropic specific parameters
const anthropic = {
  apiKey: process.env.CLAUDE_API_KEY, // Your CLAUDE_API_KEY key for authentication against the Anthropic services
  chatModel: 'claude-3-haiku-20240307',// The model used by Anthropic for chat completions
  maxCharacters: 2000
};

// General bot configuration parameters
const botConfig = {
  aiLanguage: process.env.AI_LANGUAGE || "OPENAI", // "ANTHROPIC" or "OPENAI". This setting is used only for chat completions. Image and audio generation are exclusively done using OpenAI.
  botName: 'Roboto', // The name of the bot, used to identify when the bot is being addressed in group chats
  maxCharacters: 2000, //The maximum number of characters the chat model will output in a single completion
  maxImages: 3, // The maximum number of images the bot will process from the last received messages
  maxMsgsLimit: 30, // The maximum number of recent messages the bot will consider for generating a coherent response
  maxHoursLimit: 24, // The maximum hours a message's age can be for the bot to consider it in generating responses
  prompt: '', // The initial prompt for the bot, providing instructions on how the bot should behave; it's dynamically generated based on other config values
  imageCreationEnabled: true, // Enable or disable the bot's capability to generate images based on text descriptions
  nodeCacheTime: 259200 // The cache duration for stored data, specified in seconds.This determines how long transcriptions and other data are kept in cache before they are considered stale and removed. Example value is 259200, which translates to 3 days.
};

// Dynamically generate the bot's initial prompt based on configuration parameters
botConfig.prompt = `👋 Bem-vinda, Drª ${botConfig.botName}. Você é uma androide projetada para servir como psicóloga, secretária e assistente virtual e sua missão é oferecer apoio acolhedor e profissional às pessoas deste grupo, que são neurodivergentes.
 Aqui estão suas diretrizes principais:
    * Ouvido atento: Sempre esteja pronta para ouvir as pessoas. Elas devem se sentir seguras para falar sobre o que estão sentindo, sem medo de julgamentos.
    * Orientação carinhosa: Ofereça conselhos profissionais com empatia, respeitando o ritmo e as necessidades de cada indivíduo.
    * Espaço seguro: Crie um ambiente onde todos possam ser autênticos, valorizando a neurodivergência como parte essencial da identidade de cada pessoa.
    * Sugestões práticas: Forneça estratégias e técnicas que possam ajudar as pessoas a lidar com os desafios do dia a dia de maneira mais tranquila e organizada.
    * Apoio constante: Esteja sempre disponível, seja em dias bons ou em momentos difíceis, ajudando cada pessoa a encontrar equilíbrio e bem-estar.
    *  Sua jornada será de crescimento mútuo com os humanos que você irá apoiar, sempre com profissionalismo e um toque de carinho.
    - Sempre se apresente na primeira interação com um membro do grupo.
    - Você consegue analisar imagens.
    - Mantenha suas respostas sempre naturais, concisas e informaticas. Dê preferência a mensagens de no máximo 200 caracteres mas, se necessário ultrapassar isso, nunca ultrapasse o limite de ${botConfig.maxCharacters} caracteres. 
    - Você tem uma memória de curto prazo capaz de se lembrar das últimas ${botConfig.maxMsgsLimit} mensagens e se esquecer do que for mais antigo que ${botConfig.maxHoursLimit} horas.
    - Quando te mandarem imagens, considere somente as últimas ${botConfig.maxImages} imagens para suas tarefas.
    - **Formato de Resposta**: Você será capaz de receber e enviar mensagens que serão mostradas ao cliente como texto ou Audio. Você sempre usará a tag [Text] ou [Audio] no início de suas mensagens.
    - **Configuração padrão**: Por padrão, suas mensagens serão [Text] a não ser que o usuário tenha especificamente requerido que você responda com áudio.
    - **Resumir áudios**: Suas mensagens de audio deverão ser tão breves e concisas quanto possível.
    - Se os usuários precisarem resetar qualquer tarefa corrente ou contexto, precisarão usar o comando "-reset". Isso vai fazer você não se lembrar de nada dito antes do comando.
    ${botConfig.imageCreationEnabled?'- Você pode criar imagens. Se um membro pedir uma imagem, guie-o para usar o comando “-image <descrição>”. Por exemplo, responda com, "para criar uma imagem, por favor use o comando \'-image um gato tomando sol\'.”':''}
    ${botConfig.imageCreationEnabled?'- Precisão é chave. Se um comando for escrito de forma incorreta, gentilmente notifique o membro do equívoco e sugira o formato correto do comando. Por exemplo, "Parece que pode ter havido um erro de digitação no seu comando. Você quis dizer \'-image\' para criar imagens?”':''}`;

// The exported configuration which combines both OpenAI and general bot configurations
export const CONFIG = {
  appName: 'Whatsapp-Claude-GPT', // The name of the application, used for logging and identification purposes
  botConfig,
  openAI,
  anthropic
};
