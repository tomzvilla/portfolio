import { z } from 'astro/zod';

/** Schema de un proyecto (spec §8). `image` es el helper de Astro; en tests se reemplaza por z.string(). */
export function workSchema<I extends z.ZodTypeAny>(image: () => I) {
  return z
    .object({
      title: z.string(),
      client: z.string(),
      period: z.string(),
      order: z.number().int().positive(),
      role: z.string(),
      stack: z.array(z.string()),
      problem: z.string(),
      summary: z.string(),
      confidential: z.boolean(),
      links: z.array(z.object({ label: z.string(), href: z.string().url() })).optional(),
      images: z.array(z.object({ src: image(), alt: z.string().min(1) })).optional(),
      video: z.string().optional(),
    })
    .superRefine((d, ctx) => {
      if (d.confidential && (d.images?.length || d.video || d.links?.length)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Un proyecto confidencial no puede tener imágenes, video ni links',
        });
      }
    });
}
