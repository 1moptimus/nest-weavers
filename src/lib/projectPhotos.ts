// Builds the ordered photo list for a project (cover first, then gallery) with a large version for the lightbox.
import type { CollectionEntry } from 'astro:content';
import { getImage } from 'astro:assets';

export interface ProjectPhoto {
  img: ImageMetadata;
  /** URL of a large optimised version (used by the lightbox). */
  full: string;
  alt: string;
}

export async function getProjectPhotos(
  project: CollectionEntry<'projects'>,
): Promise<ProjectPhoto[]> {
  const { title, cover, gallery } = project.data;
  const images = [cover, ...gallery].filter((img): img is ImageMetadata =>
    Boolean(img),
  );
  return Promise.all(
    images.map(async (img, i) => ({
      img,
      full: (await getImage({ src: img, width: 2000 })).src,
      alt: `${title}, photo ${i + 1} of ${images.length}`,
    })),
  );
}
