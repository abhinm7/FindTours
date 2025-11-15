import * as z from 'zod';

export const tourSchema = z.object({
  title: z.string().min(2),
  destination: z.string().min(2),
  price: z.number().min(1),
  startDate: z.string(),
  endDate: z.string(),
  image: z.any(),
});

export type TourFormValues = z.infer<typeof tourSchema>;