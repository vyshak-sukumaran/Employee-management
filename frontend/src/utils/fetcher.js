export const BasePath = import.meta.env.VITE_BACKEND_URL;

/**
 * Custom fetcher
 * @param {string} url  
 * @param {RequestInit} options
 * @returns {Promise<Response>}
 */
export default async function fetcher(url, options={}) {
    const res = await fetch(`${BasePath}${url}`, {
        credentials: 'include',
        ...options
    });
    return res.json();
}