import type { L } from './site';

export interface Project {
  slug: string;
  num: number;
  repo: string;
  /** Live Gradio demo on Render's free tier (sleeps when idle). */
  demoUrl: string | null;
  tags: string[];
  stack: string[];
  title: L;
  tagline: L;
  summary: L;
  stats: { value: string; label: L }[];
  problem: L;
  solution: L;
  steps: { title: L; body: L }[];
  story: { title: L; body: L };
  lessons: number[];
}

export const PROJECTS: Project[] = [
  {
    slug: 'rag-chatbot',
    num: 1,
    repo: 'rag-chatbot-cv',
    demoUrl: null,
    tags: ['RAG', 'LLM', 'Embeddings'],
    stack: ['LangChain', 'Chroma', 'FastEmbed', 'Groq', 'Gradio'],
    title: { es: 'Chatbot RAG', en: 'RAG Chatbot' },
    tagline: {
      es: 'Responde preguntas sobre mi experiencia usando mis propios documentos.',
      en: 'Answers questions about my experience using my own documents.',
    },
    summary: {
      es: 'Un chatbot con retrieval-augmented generation: antes de responder, recupera los fragmentos más relevantes de mi CV y mis proyectos y se los entrega al modelo como contexto.',
      en: 'A retrieval-augmented generation chatbot: before answering, it retrieves the most relevant chunks of my CV and projects and hands them to the model as context.',
    },
    stats: [
      { value: '~330MB', label: { es: 'RAM en producción (antes >512MB)', en: 'production RAM (was >512MB)' } },
      { value: 'k=4', label: { es: 'fragmentos recuperados por pregunta', en: 'chunks retrieved per question' } },
      { value: '800/100', label: { es: 'tamaño / solape de chunk', en: 'chunk size / overlap' } },
    ],
    problem: {
      es: 'Un LLM normal solo sabe lo que memorizó al entrenarse: no sabe nada sobre mí. Preguntarle "¿quién es Nicolas?" no devuelve información real, y si insiste, inventa.',
      en: 'A plain LLM only knows what it memorized during training: it knows nothing about me. Asking "who is Nicolas?" returns no real information, and if pushed, it makes things up.',
    },
    solution: {
      es: 'RAG: se indexan mis documentos como vectores y, en cada pregunta, se buscan los 4 fragmentos más parecidos por significado y se insertan en el prompt. El modelo no se reentrena; solo lee el contexto en el momento.',
      en: 'RAG: my documents are indexed as vectors and, for each question, the 4 most semantically similar chunks are retrieved and inserted into the prompt. The model is never retrained; it just reads the context at query time.',
    },
    steps: [
      {
        title: { es: 'Indexado (una vez)', en: 'Indexing (once)' },
        body: {
          es: 'Se cargan los documentos, se trocean en chunks de 800 caracteres con 100 de solape, se generan embeddings con all-MiniLM-L6-v2 vía ONNX y se guardan en Chroma.',
          en: 'Documents are loaded, split into 800-character chunks with 100 overlap, embedded with all-MiniLM-L6-v2 via ONNX and stored in Chroma.',
        },
      },
      {
        title: { es: 'Consulta (cada mensaje)', en: 'Query (every message)' },
        body: {
          es: 'La pregunta se embebe con el mismo modelo, se recuperan los 4 chunks más cercanos y se arma un prompt que obliga al modelo a responder solo desde ese contexto.',
          en: 'The question is embedded with the same model, the 4 nearest chunks are retrieved and a prompt is built that forces the model to answer only from that context.',
        },
      },
      {
        title: { es: 'Generación', en: 'Generation' },
        body: {
          es: 'Groq (openai/gpt-oss-20b, temperatura 0.2) responde de forma factual; si la respuesta no está en el contexto, debe admitir que no la tiene en vez de inventarla.',
          en: 'Groq (openai/gpt-oss-20b, temperature 0.2) answers factually; if the answer isn’t in the context it must admit it rather than make something up.',
        },
      },
    ],
    story: {
      title: { es: 'El bug: 512MB no alcanzaban', en: 'The bug: 512MB wasn’t enough' },
      body: {
        es: 'Con sentence-transformers (PyTorch) el servicio superaba los 512MB de Render y moría por falta de memoria. Cambiar a FastEmbed (ONNX Runtime) bajó el consumo a ~330MB. Después apareció un conflicto de numpy en Python 3.12+ que se resolvió fijando Python 3.10.13.',
        en: 'With sentence-transformers (PyTorch) the service blew past Render’s 512MB and was killed for lack of memory. Switching to FastEmbed (ONNX Runtime) cut usage to ~330MB. A numpy conflict on Python 3.12+ then showed up and was fixed by pinning Python 3.10.13.',
      },
    },
    lessons: [1, 2, 3, 4],
  },
  {
    slug: 'waste-classifier',
    num: 2,
    repo: 'waste-classifier',
    demoUrl: 'https://waste-classifier-keon.onrender.com',
    tags: ['Computer Vision', 'Transfer learning', 'ONNX'],
    stack: ['PyTorch', 'MobileNetV2', 'ONNX Runtime', 'Gradio'],
    title: { es: 'Clasificador de residuos', en: 'Waste Classifier' },
    tagline: {
      es: 'Sube una foto y te dice en qué categoría de reciclaje cae.',
      en: 'Upload a photo and it tells you which recycling category it belongs to.',
    },
    summary: {
      es: 'Transfer learning sobre MobileNetV2 para clasificar residuos en 6 categorías (cartón, vidrio, metal, papel, plástico, basura), exportado a ONNX para servirlo sin PyTorch.',
      en: 'Transfer learning on MobileNetV2 to classify waste into 6 categories (cardboard, glass, metal, paper, plastic, trash), exported to ONNX so it can be served without PyTorch.',
    },
    stats: [
      { value: '78%', label: { es: 'accuracy tras 5 épocas', en: 'accuracy after 5 epochs' } },
      { value: '8.9MB', label: { es: 'modelo ONNX final', en: 'final ONNX model' } },
      { value: '900', label: { es: 'imágenes (150 por clase)', en: 'images (150 per class)' } },
    ],
    problem: {
      es: 'Entrenar una red de visión desde cero exige millones de imágenes etiquetadas y días de GPU, algo irreal para un proyecto de práctica.',
      en: 'Training a vision network from scratch needs millions of labeled images and days of GPU time, which is unrealistic for a practice project.',
    },
    solution: {
      es: 'Partir de una red ya entrenada con 1.2 millones de fotos (ImageNet), congelar sus capas convolucionales y reentrenar solo la última capa con mis 6 clases.',
      en: 'Start from a network already trained on 1.2 million photos (ImageNet), freeze its convolutional layers and retrain only the final layer on my 6 classes.',
    },
    steps: [
      {
        title: { es: 'Dataset balanceado', en: 'Balanced dataset' },
        body: {
          es: 'TrashNet está muy desbalanceado ("trash" tiene muchas menos fotos que "paper"), así que se tomaron 150 imágenes por clase para que el modelo no favorezca a las clases comunes.',
          en: 'TrashNet is heavily imbalanced ("trash" has far fewer photos than "paper"), so 150 images per class were sampled to keep the model from favouring the common classes.',
        },
      },
      {
        title: { es: 'Congelar y reemplazar', en: 'Freeze and replace' },
        body: {
          es: 'Se congela model.features y se reemplaza classifier[1] por una capa de 6 salidas. Solo esa capa se entrena, con data augmentation (flip horizontal).',
          en: 'model.features is frozen and classifier[1] is replaced by a 6-output layer. Only that layer trains, with data augmentation (horizontal flip).',
        },
      },
      {
        title: { es: 'Preprocesar idéntico en inferencia', en: 'Identical preprocessing at inference' },
        body: {
          es: 'Mismo tamaño (160×160), mismo rango, misma normalización de ImageNet y mismo orden de ejes. Si algo difiere, el modelo no falla: predice mal en silencio.',
          en: 'Same size (160×160), same range, same ImageNet normalization and same axis order. If anything differs the model doesn’t crash: it silently predicts badly.',
        },
      },
    ],
    story: {
      title: { es: 'Dos bugs de infraestructura', en: 'Two infrastructure bugs' },
      body: {
        es: 'El dataset en modo streaming reventaba con MemoryError al decodificar ciertas imágenes; se pasó a descarga normal con muestreo manual. Además gradio 5.7.1 se caía al generar el esquema de la API para gr.Label; actualizar a 5.50.0 lo resolvió.',
        en: 'Streaming the dataset crashed with MemoryError while decoding certain images; switching to a normal download with manual sampling fixed it. Separately, gradio 5.7.1 crashed generating the API schema for gr.Label; upgrading to 5.50.0 resolved it.',
      },
    },
    lessons: [1, 3, 4],
  },
  {
    slug: 'tool-agent',
    num: 3,
    repo: 'tool-agent',
    demoUrl: 'https://tool-agent-jgfi.onrender.com',
    tags: ['Agents', 'Function calling', 'LLM'],
    stack: ['Groq SDK', 'Open-Meteo', 'Wikipedia API', 'Gradio'],
    title: { es: 'Agente con herramientas', en: 'Tool-Use Agent' },
    tagline: {
      es: 'Un LLM que decide cuándo llamar a una calculadora, el clima, Wikipedia o la hora.',
      en: 'An LLM that decides when to call a calculator, the weather, Wikipedia or the clock.',
    },
    summary: {
      es: 'Un agente construido sin frameworks sobre la API nativa de function calling de Groq: el ciclo del agente, los esquemas de las herramientas y la ejecución están escritos a mano para que el protocolo sea visible.',
      en: 'An agent built without frameworks on Groq’s native function-calling API: the agent loop, tool schemas and execution are hand-written so the protocol stays visible.',
    },
    stats: [
      { value: '4', label: { es: 'herramientas reales', en: 'real tools' } },
      { value: '5', label: { es: 'pasos máx. por pregunta', en: 'max steps per question' } },
      { value: '0', label: { es: 'frameworks de agentes', en: 'agent frameworks' } },
    ],
    problem: {
      es: 'Un LLM solo genera texto: no calcula con precisión, no sabe el clima de hoy ni la hora. Si le preguntas, inventa una respuesta que suena bien pero puede ser falsa.',
      en: 'An LLM only generates text: it can’t calculate precisely and doesn’t know today’s weather or the time. Ask it and it invents an answer that sounds right but may be false.',
    },
    solution: {
      es: 'En vez de responder directo, el modelo puede pedir "ejecuta calculator con expression=23*4". Python corre la función de verdad, devuelve el resultado y el modelo termina su respuesta con datos reales.',
      en: 'Instead of answering directly, the model can ask "run calculator with expression=23*4". Python runs the real function, returns the result and the model finishes its answer with real data.',
    },
    steps: [
      {
        title: { es: 'Esquemas JSON de herramientas', en: 'JSON tool schemas' },
        body: {
          es: 'Cada herramienta se describe con nombre, propósito y argumentos. El modelo lee esa descripción para decidir si la usa y cómo.',
          en: 'Each tool is described by name, purpose and arguments. The model reads that description to decide whether and how to use it.',
        },
      },
      {
        title: { es: 'El loop del agente', en: 'The agent loop' },
        body: {
          es: 'Se pregunta al modelo con tools=TOOL_SCHEMAS; si pide una herramienta, Python la ejecuta y el resultado vuelve con role "tool"; si no, esa es la respuesta final. MAX_STEPS=5 evita ciclos infinitos.',
          en: 'The model is called with tools=TOOL_SCHEMAS; if it requests a tool, Python runs it and the result goes back with role "tool"; otherwise that’s the final answer. MAX_STEPS=5 prevents infinite loops.',
        },
      },
      {
        title: { es: 'Calculadora segura', en: 'Safe calculator' },
        body: {
          es: 'El LLM arma el string de la expresión; un eval() crudo sería ejecución de código arbitrario. Se usa ast.parse y solo se permiten números y operadores aritméticos.',
          en: 'The LLM builds the expression string; a raw eval() would be arbitrary code execution. ast.parse is used and only numbers and arithmetic operators are allowed.',
        },
      },
    ],
    story: {
      title: { es: 'El agente que no sabía rendirse', en: 'The agent that wouldn’t give up' },
      body: {
        es: 'Wikipedia devolvía 403 sin un User-Agent, y cuando una búsqueda fallaba el agente reintentaba reformulaciones hasta agotar los 5 pasos. Se arregló resolviendo primero el título real de la página y agregando al prompt la instrucción explícita de no reintentar y responder con su propio conocimiento.',
        en: 'Wikipedia returned 403 without a User-Agent, and when a search failed the agent kept retrying rewordings until it burned all 5 steps. Fixed by resolving the real page title first and adding an explicit prompt instruction not to retry and to answer from its own knowledge instead.',
      },
    },
    lessons: [3, 5, 7],
  },
  {
    slug: 'movie-recommender',
    num: 4,
    repo: 'movie-recommender',
    demoUrl: 'https://movie-recommender-ej1u.onrender.com',
    tags: ['Recommender systems', 'Classical ML', 'Sparse matrices'],
    stack: ['pandas', 'SciPy', 'scikit-learn', 'Gradio'],
    title: { es: 'Recomendador de películas', en: 'Movie Recommender' },
    tagline: {
      es: 'Filtrado colaborativo sin una sola red neuronal.',
      en: 'Collaborative filtering without a single neural network.',
    },
    summary: {
      es: 'Recomendación item-based sobre MovieLens: cada película es un vector de cómo la calificó cada usuario, y dos películas se parecen si los mismos usuarios las calificaron parecido.',
      en: 'Item-based recommendation on MovieLens: each movie is a vector of how every user rated it, and two movies are similar if the same users rated them similarly.',
    },
    stats: [
      { value: '~2,270', label: { es: 'películas con ≥10 ratings', en: 'movies with ≥10 ratings' } },
      { value: '~81K', label: { es: 'celdas con valor (de 1.38M)', en: 'filled cells (of 1.38M)' } },
      { value: '0', label: { es: 'redes neuronales', en: 'neural networks' } },
    ],
    problem: {
      es: 'No todo problema de IA necesita deep learning. Recomendar películas parecidas podría atacarse con redes profundas, pero sería sobre-ingeniería cuando el patrón real es simple.',
      en: 'Not every AI problem needs deep learning. Recommending similar movies could be tackled with deep nets, but that would be over-engineering when the real pattern is simple.',
    },
    solution: {
      es: 'Matriz rala películas × usuarios y similitud coseno entre filas. Ni géneros ni actores: la recomendación surge solo del patrón colectivo de calificaciones.',
      en: 'A sparse movies × users matrix and cosine similarity between rows. No genres, no actors: the recommendation emerges purely from the collective rating pattern.',
    },
    steps: [
      {
        title: { es: 'Filtrar por señal', en: 'Filter by signal' },
        body: {
          es: 'MIN_RATINGS=10 descarta las películas con muy pocas calificaciones: sin datos suficientes, una similitud alta es pura coincidencia. Sobreviven ~2,270 de ~9,700.',
          en: 'MIN_RATINGS=10 drops movies with too few ratings: without enough data a high similarity is pure coincidence. About 2,270 of ~9,700 survive.',
        },
      },
      {
        title: { es: 'Matriz rala (CSR)', en: 'Sparse matrix (CSR)' },
        body: {
          es: 'Solo se guardan las ~81,000 celdas con valor real, no los ~1.38 millones de huecos: la diferencia entre caber en memoria y no caber.',
          en: 'Only the ~81,000 cells with real values are stored, not the ~1.38 million gaps: the difference between fitting in memory and not.',
        },
      },
      {
        title: { es: 'Similitud por consulta', en: 'Per-query similarity' },
        body: {
          es: 'cosine_similarity compara el vector de la película elegida contra todas las demás en una sola llamada vectorizada, y se devuelven las 10 más parecidas (sin la propia).',
          en: 'cosine_similarity compares the chosen movie’s vector against all the others in one vectorized call and returns the 10 closest (excluding itself).',
        },
      },
    ],
    story: {
      title: { es: 'El bug que no ocurrió', en: 'The bug that didn’t happen' },
      body: {
        es: 'No hubo errores en producción, pero sí una decisión que evitó uno: precalcular toda la matriz película-película al arrancar. Crece con el cuadrado del catálogo, la misma trampa de memoria de los proyectos 1 y 2. Se calcula una fila por consulta y nunca se guarda la matriz completa.',
        en: 'No production errors, but there was a decision that avoided one: precomputing the whole movie×movie matrix at startup. It grows with the square of the catalogue, the same memory trap as projects 1 and 2. One row is computed per query and the full matrix is never stored.',
      },
    },
    lessons: [6, 7],
  },
  {
    slug: 'object-detector',
    num: 5,
    repo: 'object-detector',
    demoUrl: 'https://object-detector-rph8.onrender.com',
    tags: ['Computer Vision', 'Object detection', 'ONNX'],
    stack: ['YOLOv8n', 'ONNX Runtime', 'NumPy', 'Pillow', 'Gradio'],
    title: { es: 'Detector de objetos', en: 'Object Detector' },
    tagline: {
      es: 'Dibuja una caja y una etiqueta sobre cada objeto que reconoce en una foto.',
      en: 'Draws a box and a label around every object it recognizes in a photo.',
    },
    summary: {
      es: 'YOLOv8n preentrenado en COCO (80 categorías), exportado a ONNX. El preprocesamiento letterbox, la decodificación de salidas y el Non-Max Suppression están escritos a mano en NumPy, sin torch ni torchvision en producción.',
      en: 'YOLOv8n pretrained on COCO (80 categories), exported to ONNX. Letterbox preprocessing, output decoding and Non-Max Suppression are hand-written in NumPy, with no torch or torchvision in production.',
    },
    stats: [
      { value: '8,400', label: { es: 'candidatos por imagen', en: 'candidates per image' } },
      { value: '12MB', label: { es: 'modelo ONNX', en: 'ONNX model' } },
      { value: '80', label: { es: 'clases de COCO', en: 'COCO classes' } },
    ],
    problem: {
      es: 'Clasificar responde "¿qué es esto?" una vez por imagen. Pero una foto real puede tener cero, uno o veinte objetos, cada uno en un lugar distinto: hay que saber qué hay y dónde.',
      en: 'Classification answers "what is this?" once per image. But a real photo can hold zero, one or twenty objects, each somewhere different: you need to know what is there and where.',
    },
    solution: {
      es: 'YOLO predice miles de cajas candidatas por imagen, cada una con su clase y confianza. Después se filtra por umbral y se eliminan duplicados con NMS.',
      en: 'YOLO predicts thousands of candidate boxes per image, each with its class and confidence. Then a threshold filters them and NMS removes duplicates.',
    },
    steps: [
      {
        title: { es: 'Letterbox, no resize', en: 'Letterbox, not resize' },
        body: {
          es: 'Estirar una foto rectangular a 640×640 distorsiona las proporciones y descalibra las cajas. Se escala manteniendo la proporción y se rellena con gris, guardando ratio y padding para deshacerlo después.',
          en: 'Stretching a rectangular photo to 640×640 distorts proportions and miscalibrates the boxes. The image is scaled keeping its aspect ratio and padded with gray, storing ratio and padding to undo it later.',
        },
      },
      {
        title: { es: '(1, 84, 8400)', en: '(1, 84, 8400)' },
        body: {
          es: 'Cada uno de los 8,400 candidatos trae 4 números de caja y 80 probabilidades de clase. Casi todos son ruido: un umbral de confianza (≥35%) deja un puñado de detecciones reales.',
          en: 'Each of the 8,400 candidates carries 4 box numbers and 80 class probabilities. Almost all of them are noise: a confidence threshold (≥35%) leaves a handful of real detections.',
        },
      },
      {
        title: { es: 'NMS a mano', en: 'Hand-written NMS' },
        body: {
          es: 'Un mismo objeto genera varias cajas casi idénticas; NMS conserva la de mayor confianza y descarta las que se solapan (IoU alto). Un offset por clase evita que un perro suprima a un gato vecino.',
          en: 'One object produces several near-identical boxes; NMS keeps the most confident and drops overlapping ones (high IoU). A per-class offset keeps a dog from suppressing a neighbouring cat.',
        },
      },
    ],
    story: {
      title: { es: 'La decisión: 15 líneas vs. instalar torch', en: 'The decision: 15 lines vs. installing torch' },
      body: {
        es: 'No hubo bugs, pero sí una tentación: usar torchvision.ops.nms. Hubiera funcionado, a costa de instalar torch completo solo para una función. IoU + NMS en NumPy mantienen el servidor liviano.',
        en: 'No bugs, but there was a temptation: use torchvision.ops.nms. It would have worked, at the cost of installing all of torch for one function. IoU + NMS in NumPy keep the server lightweight.',
      },
    },
    lessons: [1, 7],
  },
  {
    slug: 'lora-finetune',
    num: 6,
    repo: 'lora-finetune',
    demoUrl: 'https://lora-finetune.onrender.com',
    tags: ['Fine-tuning', 'LoRA', 'LLM'],
    stack: ['peft', 'distilgpt2', 'ONNX Runtime', 'tokenizers', 'Gradio'],
    title: { es: 'Fine-tuning con LoRA', en: 'LoRA Fine-tuning' },
    tagline: {
      es: 'distilgpt2 aprende a hablar como pirata entrenando menos del 1% de sus pesos.',
      en: 'distilgpt2 learns to talk like a pirate by training under 1% of its weights.',
    },
    summary: {
      es: 'Un adaptador LoRA entrenado sobre un corpus sintético de frases pirata, fusionado y cuantizado a INT8 en ONNX, y servido con un decode loop escrito a mano (KV-cache + top-p) sin PyTorch en producción.',
      en: 'A LoRA adapter trained on a synthetic corpus of pirate sentences, merged and quantized to INT8 ONNX, and served with a hand-written decode loop (KV-cache + top-p) with no PyTorch in production.',
    },
    stats: [
      { value: '0.98%', label: { es: 'parámetros entrenados (811K de 82M)', en: 'trainable parameters (811K of 82M)' } },
      { value: '3.2MB', label: { es: 'adaptador (vs. ~330MB)', en: 'adapter (vs. ~330MB)' } },
      { value: '490→240MB', label: { es: 'RAM en reposo en Render', en: 'idle RAM on Render' } },
    ],
    problem: {
      es: 'Un fine-tuning completo actualiza los ~82M de parámetros y produce una copia entera del modelo por cada tarea. Es caro en cómputo y en almacenamiento para un cambio que, en el fondo, es pequeño.',
      en: 'Full fine-tuning updates all ~82M parameters and produces a whole copy of the model per task. It’s expensive in compute and storage for a change that is, at heart, small.',
    },
    solution: {
      es: 'LoRA congela la matriz de pesos W y aprende una actualización de rango bajo ΔW = A·B con matrices mucho más chicas. Solo A y B se entrenan; el adaptador resultante pesa 3.2MB.',
      en: 'LoRA freezes the weight matrix W and learns a low-rank update ΔW = A·B with much smaller matrices. Only A and B train; the resulting adapter weighs 3.2MB.',
    },
    steps: [
      {
        title: { es: 'Entrenar el adaptador', en: 'Train the adapter' },
        body: {
          es: 'r=16 sobre c_attn y c_proj, bucle de entrenamiento manual sin Trainer, 20 épocas sobre ~300 frases. La pérdida baja de 3.94 a 0.23 y el estilo generaliza a prompts fuera del corpus.',
          en: 'r=16 on c_attn and c_proj, a manual training loop with no Trainer, 20 epochs over ~300 sentences. Loss drops from 3.94 to 0.23 and the style generalizes to prompts outside the corpus.',
        },
      },
      {
        title: { es: 'Fusionar, exportar, cuantizar', en: 'Merge, export, quantize' },
        body: {
          es: 'merge_and_unload() combina el adaptador en los pesos, optimum exporta a ONNX y quantize_dynamic lo baja a INT8: de ~330MB a ~82MB, lo bastante chico para vivir en el repo.',
          en: 'merge_and_unload() folds the adapter into the weights, optimum exports to ONNX and quantize_dynamic brings it to INT8: from ~330MB to ~82MB, small enough to live in the repo.',
        },
      },
      {
        title: { es: 'Decode loop a mano', en: 'Hand-written decode loop' },
        body: {
          es: 'onnxruntime corre el grafo con arrays de NumPy; el KV-cache son los past_key_values.* / present.* del modelo, y el muestreo top-p son ~15 líneas. Sin torch, sin transformers, sin optimum.',
          en: 'onnxruntime runs the graph with NumPy arrays; the KV-cache is the model’s past_key_values.* / present.*, and top-p sampling is ~15 lines. No torch, no transformers, no optimum.',
        },
      },
    ],
    story: {
      title: { es: 'Cuatro intentos de deploy', en: 'Four deploy attempts' },
      body: {
        es: 'PyTorch directo murió por memoria. ONNX + optimum también, aunque medía ~425MB en Windows. Con logging de memoria en el contenedor de Render apareció la causa: tras cargar el modelo quedaban 6MB de margen, porque solo importar torch costaba 100-200MB. Se eliminó del todo: de ~490MB a ~240MB en reposo, 6 de 6 generaciones estables.',
        en: 'Plain PyTorch died on memory. ONNX + optimum did too, even though it measured ~425MB on Windows. Memory logging inside Render’s container revealed the cause: 6MB of headroom after loading the model, because merely importing torch cost 100-200MB. It was removed entirely: ~490MB down to ~240MB idle, 6 of 6 generations stable.',
      },
    },
    lessons: [1, 2, 3, 4, 7, 8],
  },
];

export const projectBySlug = (slug: string) => PROJECTS.find((p) => p.slug === slug);
