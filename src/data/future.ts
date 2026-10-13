import type { L } from './site';

export type Area = 'infra' | 'quality' | 'model' | 'data' | 'product';
export type Effort = 'low' | 'medium' | 'high';

export interface FutureItem {
  area: Area;
  effort: Effort;
  title: L;
  body: L;
}

/** Scaling / next-step options per project, keyed by project slug. */
export const FUTURE: Record<string, FutureItem[]> = {
  'rag-chatbot': [
    {
      area: 'quality',
      effort: 'medium',
      title: { es: 'Búsqueda híbrida + reranking', en: 'Hybrid search + reranking' },
      body: {
        es: 'Combinar BM25 con embeddings y reordenar los candidatos con un cross-encoder: mejora la recuperación en preguntas con nombres propios o siglas, donde los vectores solos fallan.',
        en: 'Combine BM25 with embeddings and re-rank candidates with a cross-encoder: better retrieval on questions with proper names or acronyms, where vectors alone fail.',
      },
    },
    {
      area: 'data',
      effort: 'medium',
      title: { es: 'Vector store persistente e indexado incremental', en: 'Persistent vector store and incremental indexing' },
      body: {
        es: 'Pasar de Chroma en memoria (se reindexa en cada arranque) a pgvector o Qdrant, indexando solo los documentos nuevos o modificados. Permite crecer de un CV a una base de conocimiento real.',
        en: 'Move from in-memory Chroma (re-indexed on every boot) to pgvector or Qdrant, indexing only new or changed documents. Lets it grow from a CV into a real knowledge base.',
      },
    },
    {
      area: 'product',
      effort: 'low',
      title: { es: 'Citas, streaming y memoria de conversación', en: 'Citations, streaming and conversation memory' },
      body: {
        es: 'Mostrar de qué fragmento salió cada respuesta, emitir los tokens a medida que se generan y recordar el hilo de la conversación. Sube la confianza del usuario sin tocar el modelo.',
        en: 'Show which chunk each answer came from, stream tokens as they’re generated and remember the conversation thread. Raises user trust without touching the model.',
      },
    },
    {
      area: 'quality',
      effort: 'medium',
      title: { es: 'Evaluación automática', en: 'Automated evaluation' },
      body: {
        es: 'Un set de preguntas con respuesta conocida y métricas de fidelidad y relevancia (estilo RAGAS) que corra en CI, para saber si un cambio de chunking o de modelo mejora o empeora algo.',
        en: 'A set of questions with known answers plus faithfulness and relevance metrics (RAGAS-style) running in CI, to tell whether a chunking or model change helps or hurts.',
      },
    },
  ],
  'waste-classifier': [
    {
      area: 'model',
      effort: 'medium',
      title: { es: 'Más datos y fine-tuning de más capas', en: 'More data and deeper fine-tuning' },
      body: {
        es: 'Usar el dataset completo en vez de 150 imágenes por clase y descongelar los últimos bloques de MobileNetV2, midiendo con matriz de confusión. El 78% actual tiene mucho margen.',
        en: 'Use the full dataset instead of 150 images per class and unfreeze the last MobileNetV2 blocks, measured with a confusion matrix. The current 78% has plenty of headroom.',
      },
    },
    {
      area: 'infra',
      effort: 'medium',
      title: { es: 'Inferencia en el navegador', en: 'In-browser inference' },
      body: {
        es: 'Con onnxruntime-web el modelo de 8.9MB correría en el dispositivo del usuario: sin servidor, sin cold start, sin costo por solicitud y con la foto sin salir del teléfono.',
        en: 'With onnxruntime-web the 8.9MB model would run on the user’s device: no server, no cold start, no per-request cost, and the photo never leaves the phone.',
      },
    },
    {
      area: 'product',
      effort: 'high',
      title: { es: 'Varios residuos por foto', en: 'Multiple items per photo' },
      body: {
        es: 'Combinar este clasificador con un detector (como el proyecto 5) para separar cada objeto de la imagen y clasificarlo por separado, que es como se ve la basura de verdad.',
        en: 'Pair this classifier with a detector (like project 5) to isolate each object in the image and classify them separately, which is how real waste looks.',
      },
    },
    {
      area: 'data',
      effort: 'medium',
      title: { es: 'Bucle de retroalimentación', en: 'Feedback loop' },
      body: {
        es: 'Permitir corregir la etiqueta y guardar las fotos mal clasificadas para reentrenar (active learning). Y sumar reglas por municipio: lo que se recicla varía según dónde estés.',
        en: 'Let users correct the label and store misclassified photos for retraining (active learning). Plus per-municipality rules: what’s recyclable varies by location.',
      },
    },
  ],
  'tool-agent': [
    {
      area: 'product',
      effort: 'medium',
      title: { es: 'Registro de herramientas y soporte MCP', en: 'Tool registry and MCP support' },
      body: {
        es: 'Convertir las 4 herramientas en un registro enchufable y exponerlas vía Model Context Protocol, para sumar calendario, búsqueda web o SQL de solo lectura sin tocar el loop del agente.',
        en: 'Turn the 4 tools into a pluggable registry and expose them via Model Context Protocol, so calendar, web search or read-only SQL can be added without touching the agent loop.',
      },
    },
    {
      area: 'infra',
      effort: 'medium',
      title: { es: 'Llamadas en paralelo y resiliencia', en: 'Parallel calls and resilience' },
      body: {
        es: 'Ejecutar en paralelo las herramientas independientes (clima y hora a la vez), con timeouts, reintentos con backoff y circuit breakers para que una API caída no tumbe la respuesta.',
        en: 'Run independent tools in parallel (weather and time at once), with timeouts, retries with backoff and circuit breakers so one failing API doesn’t sink the answer.',
      },
    },
    {
      area: 'quality',
      effort: 'medium',
      title: { es: 'Observabilidad y evaluación', en: 'Observability and evaluation' },
      body: {
        es: 'Trazar cada paso (Langfuse u OpenTelemetry), medir costo y latencia por consulta y correr un set de tareas con resultado esperado para detectar regresiones al cambiar de modelo o de prompt.',
        en: 'Trace every step (Langfuse or OpenTelemetry), measure cost and latency per query and run a task suite with expected outcomes to catch regressions when swapping model or prompt.',
      },
    },
    {
      area: 'product',
      effort: 'high',
      title: { es: 'Sesiones, memoria y control de acceso', en: 'Sessions, memory and access control' },
      body: {
        es: 'Memoria persistente por usuario, autenticación y límites de uso por cuenta. Es lo que separa una demo pública de un agente que alguien pueda usar de verdad.',
        en: 'Per-user persistent memory, authentication and per-account rate limits. It’s what separates a public demo from an agent someone can genuinely rely on.',
      },
    },
  ],
  'movie-recommender': [
    {
      area: 'infra',
      effort: 'medium',
      title: { es: 'Vecinos aproximados (ANN)', en: 'Approximate nearest neighbours' },
      body: {
        es: 'Con el MovieLens completo (25M de calificaciones) la similitud exacta por consulta deja de alcanzar. FAISS o HNSW devuelven los vecinos más cercanos en milisegundos con una pérdida mínima de exactitud.',
        en: 'With the full MovieLens (25M ratings) exact per-query similarity stops being enough. FAISS or HNSW return the nearest neighbours in milliseconds with minimal accuracy loss.',
      },
    },
    {
      area: 'model',
      effort: 'high',
      title: { es: 'Factorización de matrices o modelo de dos torres', en: 'Matrix factorization or two-tower model' },
      body: {
        es: 'ALS (o su versión implícita) aprende vectores latentes que capturan gustos más allá de la coincidencia directa; un modelo de dos torres permite además mezclar género, sinopsis y contexto.',
        en: 'ALS (or its implicit variant) learns latent vectors that capture taste beyond direct overlap; a two-tower model can also blend genre, synopsis and context.',
      },
    },
    {
      area: 'product',
      effort: 'medium',
      title: { es: 'Personalización y arranque en frío', en: 'Personalization and cold start' },
      body: {
        es: 'Recomendar desde el historial del usuario y no solo desde una película, y resolver el caso de usuarios y películas nuevos con un fallback por popularidad o por contenido.',
        en: 'Recommend from a user’s history rather than a single movie, and handle new users and new movies with a popularity or content-based fallback.',
      },
    },
    {
      area: 'quality',
      effort: 'medium',
      title: { es: 'Evaluación offline y A/B', en: 'Offline evaluation and A/B testing' },
      body: {
        es: 'Medir precision@k y NDCG sobre calificaciones apartadas, y comparar variantes con tests A/B en vivo. Hoy "se ve razonable"; ahí pasaría a ser un número.',
        en: 'Measure precision@k and NDCG on held-out ratings and compare variants with live A/B tests. Today it “looks reasonable”; there it would become a number.',
      },
    },
  ],
  'object-detector': [
    {
      area: 'model',
      effort: 'medium',
      title: { es: 'Fine-tuning con un dataset propio', en: 'Fine-tuning on a custom dataset' },
      body: {
        es: 'Entrenar YOLO con tus propias clases (productos, herramientas, plagas) y exportarlo con el mismo pipeline. Es donde un detector deja de ser demo y resuelve un problema concreto.',
        en: 'Train YOLO on your own classes (products, tools, pests) and export it through the same pipeline. It’s where a detector stops being a demo and solves a concrete problem.',
      },
    },
    {
      area: 'product',
      effort: 'medium',
      title: { es: 'Video, seguimiento y conteo', en: 'Video, tracking and counting' },
      body: {
        es: 'Procesar un stream o una webcam, asignar un ID persistente a cada objeto con ByteTrack y contar entradas y salidas de una zona. La misma red, otro problema de producto.',
        en: 'Process a stream or webcam, give each object a persistent ID with ByteTrack and count entries and exits of a zone. Same network, a different product problem.',
      },
    },
    {
      area: 'infra',
      effort: 'high',
      title: { es: 'Aceleración y despliegue en el borde', en: 'Acceleration and edge deployment' },
      body: {
        es: 'Cuantización estática INT8, OpenVINO o TensorRT, o correrlo en una Raspberry Pi o un Jetson junto a la cámara, para no enviar video a ningún servidor.',
        en: 'Static INT8 quantization, OpenVINO or TensorRT, or run it on a Raspberry Pi or Jetson next to the camera so no video leaves the device.',
      },
    },
    {
      area: 'infra',
      effort: 'medium',
      title: { es: 'API por lotes con cola', en: 'Batch API with a queue' },
      body: {
        es: 'Exponer una API (FastAPI) con cola de trabajos para procesar muchas imágenes de forma asíncrona, en vez de una a la vez a través de la interfaz web.',
        en: 'Expose an API (FastAPI) with a job queue to process many images asynchronously, instead of one at a time through the web UI.',
      },
    },
  ],
  'lora-finetune': [
    {
      area: 'data',
      effort: 'medium',
      title: { es: 'Una tarea real, con datos reales', en: 'A real task, on real data' },
      body: {
        es: 'Reemplazar el corpus pirata sintético por pares instrucción-respuesta de un dominio concreto (soporte, documentación interna) y medir si el adaptador realmente mejora la tarea.',
        en: 'Replace the synthetic pirate corpus with instruction-response pairs from a concrete domain (support, internal docs) and measure whether the adapter genuinely improves the task.',
      },
    },
    {
      area: 'model',
      effort: 'high',
      title: { es: 'Modelo base más grande con QLoRA', en: 'A larger base model with QLoRA' },
      body: {
        es: 'Pasar de distilgpt2 a un modelo de 0.5-3B parámetros entrenado con QLoRA en una GPU gratuita (Colab, Kaggle). El adaptador seguiría pesando decenas de MB.',
        en: 'Move from distilgpt2 to a 0.5-3B-parameter model trained with QLoRA on a free GPU (Colab, Kaggle). The adapter would still weigh tens of MB.',
      },
    },
    {
      area: 'product',
      effort: 'medium',
      title: { es: 'Varios adaptadores sobre un mismo modelo', en: 'Many adapters on one base model' },
      body: {
        es: 'Un adaptador por tono, cliente o idioma, intercambiables en tiempo de ejecución sobre los mismos pesos base: es lo que hace rentable a LoRA en producción.',
        en: 'One adapter per tone, customer or language, swappable at runtime over the same base weights: it’s what makes LoRA pay off in production.',
      },
    },
    {
      area: 'infra',
      effort: 'high',
      title: { es: 'Inferencia con GPU y cuantización 4-bit', en: 'GPU inference and 4-bit quantization' },
      body: {
        es: 'Servir con llama.cpp (GGUF 4-bit) o vLLM, con tokens en streaming. Hoy el límite es un servidor de 512MB; con otro presupuesto, la latencia deja de ser el problema.',
        en: 'Serve with llama.cpp (4-bit GGUF) or vLLM, streaming tokens. Today the limit is a 512MB server; with a different budget, latency stops being the problem.',
      },
    },
  ],
};
