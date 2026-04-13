import { defineCollection, z } from 'astro:content';

const pages = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
  }),
});

const products = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    bikilikaLink: z.string().url(),
    price: z.string(),
    description: z.string().optional(),
    image: z.string().optional(),
    images: z.array(z.string()).optional(),
  }),
});

export const collections = { pages, products };
