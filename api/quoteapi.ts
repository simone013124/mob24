import { Quote } from '../types/quote';

const QUOTES_URL = 'https://api.quotable.io/random';

export const fetchQuote = async (): Promise<Quote> => {
    const response = await fetch(QUOTES_URL);
    if (!response.ok) {
        throw new Error('Failed to fetch quote');
    }
    const data: Quote = await response.json();
    return data;
};
