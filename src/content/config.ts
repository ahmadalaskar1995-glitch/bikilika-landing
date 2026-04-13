import { defineCollection, z } from 'astro:content';

const productsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    bikilikaLink: z.string().url(),
    price: z.string(),
    image: z.string().optional(),
    images: z.array(z.string()).optional(),
    description: z.string().optional(),
  }),
});

const pagesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    slug: z.string().regex(/^[a-z0-9-]+$/),
    description: z.string().optional(),
  }),
});

export const collections = {
  products: productsCollection,
  pages: pagesCollection,
};