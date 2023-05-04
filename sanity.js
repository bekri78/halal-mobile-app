import { createClient } from '@sanity/client';
import imageUrlBuilder from "@sanity/image-url";

// connexion backend
const sanityClient = createClient({
  projectId: "3zooz0j8",
  dataset: "production",
  useCdn: true,
  apiVersion: "2023-05-03"
});

export const urlFor = (source) => imageUrlBuilder(sanityClient).image(source);
export default sanityClient;
