// lib/actions.ts
"use server"; // This tells Next.js this code ONLY runs on the server

import axios from 'axios';
import { Tour } from './types';

// You can put your backend URL here (or in a .env file later)
const API_URL = 'http://localhost:3000/api/tours';

export async function getTours(): Promise<Tour[]> {
  try {
    const res = await axios.get(API_URL, {
      headers: {
        'Cache-Control': 'no-store', // Disables caching for development
      },
    });

    const data = res.data;

    if (!data.success || !Array.isArray(data.data)) {
      console.error('API response was not as expected:', data);
      return [];
    }

    return data.data as Tour[];
  } catch (error) {
    console.error('Fetch error:', error);
    return []; // Always return an empty array on error
  }
}