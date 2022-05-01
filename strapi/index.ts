import qs from "qs";

import type {
  IFetchOptions,
  IStrapiMedia,
  IStrapiURLParamsObject,
} from "types/strapi";

/**
 * Get full Strapi URL from path
 * @param {string} path Path of the URL
 * @returns {string} Full Strapi URL
 */
export function getStrapiURL(path: string = ""): string {
  return `${
    process.env.API_URL || "http://localhost:1337"
  }${path}`;
}

/**
 * Helper to make GET requests to Strapi API endpoints
 * @param {string} path Path of the API route
 * @param {Object} urlParamsObject URL params object, will be stringified
 * @param {Object} options Options passed to fetch
 * @returns Parsed API call response
 */
export async function fetchAPI<T>(
  path: string,
  urlParamsObject: IStrapiURLParamsObject = {},
  options: IFetchOptions = {}
): Promise<T> {
  /* Merge default and user options */
  const mergedOptions: IFetchOptions = {
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  };

  /* Build request URL */
  const queryString: string = qs.stringify(urlParamsObject);
  const requestUrl: string = `${getStrapiURL(
    `/api${path}${queryString ? `?${queryString}` : ""}`
  )}`;
console.log('R: ', requestUrl);

  const response: Response = await fetch(requestUrl, mergedOptions);

  if (!response.ok) {
    console.error(response.statusText);
    throw new Error(`Strapi fetchAPI error`);
  }
  const data = await response.json();
  return data;
}

export function getStrapiMedia(media: { data: IStrapiMedia } | undefined) {
  if (media?.data) {
    const { url } = media.data.attributes;
    const imageUrl = url.startsWith("/") ? getStrapiURL(url) : url;
    return imageUrl;
  }
  return "";
}

/**
 * Retreive deeply nested data from api response
 * 
 * @param obj - strapi data object
 * @param key - if present, returns only the specified value
 * @returns strapi data
 */
export function getStrapiProperty<T>(obj: any, key?: keyof T): any {
  if (key) {
    return obj.attributes[key] ?? "Doesn't Exist";
  }
  return obj.attributes;
}
