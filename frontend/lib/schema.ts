// lib/schema.ts
import * as z from 'zod';

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

export const tourFormSchema = z.object({
  
  title: z.string().min(2, { message: 'Title is required.' }),
  destination: z.string().min(2, { message: 'Destination is required.' }),
  price: z.number().min(1, { message: "Price must be positive." }),
  startDate: z.date(),
  endDate: z.date(),
  
  image: z
    .any()
    .refine((files) => files?.length == 1, 'Image is required.')
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE,
      `Image must be less than 5MB.`
    )
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      'Only .jpg, .png, and .webp formats are supported.'
    ),
});

export type TourFormValues = z.infer<typeof tourFormSchema>;