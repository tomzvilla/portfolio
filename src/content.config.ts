import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { workSchema } from './content/work-schema';

const work = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/work' }),
  schema: ({ image }) => workSchema(image),
});

export const collections = { work };
