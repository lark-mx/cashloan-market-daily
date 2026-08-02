import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const reports = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/reports' }),
  schema: z.object({
    country: z.enum([
      'argentina', 'colombia', 'peru', 'vietnam',
      'mexico', 'guatemala', 'dominican-republic', 'kenya',
      'india', 'indonesia', 'bangladesh',
      'nigeria', 'uganda', 'ghana', 'tanzania'
    ]),
    countryName: z.string(),
    flag: z.string(),
    date: z.coerce.date(),
    riskScore: z.number().min(0).max(100),
    opportunityScore: z.number().min(0).max(100),
    confidence: z.number().min(0).max(100),
    headline: z.string(),
    summary: z.string(),
    risks: z.object({
      credit: z.number(), regulatory: z.number(), macro: z.number(),
      fraud: z.number(), competition: z.number(), funding: z.number()
    }),
    metrics: z.array(z.object({
      label: z.string(), value: z.union([z.string(), z.number()]), unit: z.string().optional(),
      change: z.string().optional(), direction: z.enum(['up', 'down', 'flat']).optional()
    })).default([]),
    signals: z.array(z.string()).default([]),
    chart: z.object({
      title: z.string(), labels: z.array(z.string()), values: z.array(z.number()), unit: z.string(), source: z.string()
    }).optional()
  })
});

export const collections = { reports };
