/** Keep JSON data inside its script element, even when a title contains HTML. */
export const serializeJsonLd = (data) => JSON.stringify(data).replace(/</g, '\\u003c');
