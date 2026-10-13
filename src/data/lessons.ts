import type { L } from './site';

export interface Lesson {
  id: number;
  title: L;
  body: L;
  /** project numbers (1-6) where the lesson showed up */
  projects: number[];
}

export const LESSONS: Lesson[] = [
  {
    id: 1,
    title: {
      es: 'Liviano en producción, pesado solo en desarrollo',
      en: 'Lightweight in production, heavy only in development',
    },
    body: {
      es: 'PyTorch, sentence-transformers y Ultralytics entrenan y prueban en local; ONNX Runtime y FastEmbed corren en el servidor. Nada de torch en el deploy final.',
      en: 'PyTorch, sentence-transformers and Ultralytics train and test locally; ONNX Runtime and FastEmbed run on the server. No torch in the final deploy.',
    },
    projects: [1, 2, 5, 6],
  },
  {
    id: 2,
    title: {
      es: 'Fija versiones, no confíes en "latest"',
      en: 'Pin versions, don’t trust "latest"',
    },
    body: {
      es: 'Python 3.10 explícito y versiones exactas en requirements.txt. Los free tiers cambian el Python por defecto sin avisar, y eso rompe builds en silencio.',
      en: 'Explicit Python 3.10 and exact versions in requirements.txt. Free tiers change the default Python without notice, which silently breaks builds.',
    },
    projects: [1, 6],
  },
  {
    id: 3,
    title: {
      es: '"Compila" no es "funciona"',
      en: '"It builds" is not "it works"',
    },
    body: {
      es: 'Los proyectos parecían listos tras el build y fallaban en runtime real (memoria, esquema, un loop infinito). Siempre se probó con una pregunta real contra el servidor desplegado.',
      en: 'Projects looked done after the build yet failed at real runtime (memory, schema, an infinite loop). Every one was tested with a real request against the deployed server.',
    },
    projects: [1, 2, 3, 6],
  },
  {
    id: 4,
    title: {
      es: 'Los free tiers tienen límites reales',
      en: 'Free tiers have real limits',
    },
    body: {
      es: '512MB de RAM, cold starts de 30-60s, precios que cambian de un día a otro (Hugging Face Spaces). Hay que diseñar para esas restricciones, no asumirlas.',
      en: '512MB of RAM, 30-60s cold starts, pricing that changes overnight (Hugging Face Spaces). Design for those constraints instead of assuming them away.',
    },
    projects: [1, 2, 6],
  },
  {
    id: 5,
    title: {
      es: 'El código que genera un LLM no es seguro por defecto',
      en: 'LLM-generated code is not safe by default',
    },
    body: {
      es: 'Un agente que arma expresiones para un eval() es una vulnerabilidad de ejecución de código. Y no todo bug se arregla con código: a veces el fix real es el prompt.',
      en: 'An agent building expressions for eval() is a code-execution vulnerability. And not every bug is fixed in code: sometimes the real fix is the prompt.',
    },
    projects: [3],
  },
  {
    id: 6,
    title: {
      es: 'No todo problema necesita deep learning',
      en: 'Not every problem needs deep learning',
    },
    body: {
      es: 'El recomendador de películas no usó ninguna red neuronal: matrices ralas y similitud coseno bastaron, y fue el único deploy sin bugs de ese tipo.',
      en: 'The movie recommender used no neural network: sparse matrices and cosine similarity were enough, and it was the only deploy without bugs of that kind.',
    },
    projects: [4],
  },
  {
    id: 7,
    title: {
      es: 'Reimplementar una función simple > instalar la librería entera',
      en: 'Reimplementing a simple function > installing the whole library',
    },
    body: {
      es: 'Evaluación segura con ast en vez de eval() (proyecto 3), similitud por consulta en vez de precalculada (4), IoU/NMS a mano en vez de torchvision (5), decode loop a mano en vez de transformers (6): el mismo patrón, cuatro veces.',
      en: 'Safe evaluation with ast instead of eval() (project 3), per-query similarity instead of precomputed (4), hand-written IoU/NMS instead of torchvision (5), a hand-written decode loop instead of transformers (6): the same pattern, four times.',
    },
    projects: [3, 4, 5, 6],
  },
  {
    id: 8,
    title: {
      es: 'Medir en el entorno real gana a razonar desde otro',
      en: 'Measuring in the real environment beats reasoning from another one',
    },
    body: {
      es: 'El proyecto 6 parecía resuelto con ONNX pero seguía cayéndose en Render. Solo al loguear memoria en producción (no en Windows) apareció la causa: torch costaba 100-200MB solo por importarse.',
      en: 'Project 6 looked solved with ONNX but kept crashing on Render. Only logging memory in production (not on Windows) revealed the cause: torch cost 100-200MB just by being imported.',
    },
    projects: [6],
  },
];
