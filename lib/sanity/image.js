import imageUrlBuilder from '@sanity/image-url';
import { client } from './client';

const builder = imageUrlBuilder(client);

export function urlForImage(source) {
  if (!source || !source.asset) {
    return null;
  }
  return builder.image(source);
}

export function getImageUrl(source, width = 800, height = 450) {
  const url = urlForImage(source);
  if (!url) {
    return '/images/placeholder.jpg';
  }
  return url.width(width).height(height).format('webp').quality(85).url();
}
