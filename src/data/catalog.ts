export type Locale = 'es' | 'en';
// Edit these entries to add, rename, reorder or hide categories.
// Products may belong to several categories; an empty category has a contact message.
export const categories = [
  { id: 'erp', label: { es: 'Software ERP', en: 'ERP software' }, visible: true },
  { id: 'pos', label: { es: 'Punto de venta', en: 'Point of sale' }, visible: true },
  { id: 'custom', label: { es: 'Software a medida', en: 'Custom software' }, visible: true },
  { id: 'akashic', label: { es: 'Akashic Vault', en: 'Akashic Vault' }, visible: true },
  { id: 'websites', label: { es: 'Páginas web a medida', en: 'Custom websites' }, visible: true },
  { id: 'landing', label: { es: 'Landing pages', en: 'Landing pages' }, visible: true },
];
export const assignments: Record<string, string[]> = {
  'akashic-vault': ['akashic'],
  openmultipos: ['erp', 'pos', 'custom'],
  'easy-drink': ['pos'],
  'akashic-tv': ['custom'],
  invitacion: ['websites', 'custom'],
  tasktone: ['custom', 'websites'],
};
export const siteConfig = {
  name: 'SD Tech Systems',
  author: 'Juan Sebastián Duque Valencia',
  email: 'jsduquevalencia96@gmail.com',
  github: 'https://github.com/JSX2011',
  defaultLocale: 'es' as Locale,
};

// Routes to full, anonymous product showcases (relative to each language root).
export const interactiveDemos: Record<string,string> = { invitacion: 'demos/invitacion/' };
