import cssUrl from '@/assets/icons/css.glb?url'
import html5Url from '@/assets/icons/html5.glb?url'
import javascriptUrl from '@/assets/icons/javascript.glb?url'
import sqlUrl from '@/assets/icons/sql.glb?url'
import swiftUrl from '@/assets/icons/swift.glb?url'
import typescriptUrl from '@/assets/icons/typescript.glb?url'

/* "Languages we work in". Each entry has its 3D icon (from 3D Coding Icons and 3D SQL Icon),
   shown left to right in this order. Edit the words freely. */
export const languages = [
  { key: 'html5', name: 'HTML', model: html5Url, detail: 'Structure that means something: real headings, real buttons, real lists.' },
  { key: 'javascript', name: 'JavaScript', model: javascriptUrl, detail: 'Interaction that stays quick, with no work on the page you never see.' },
  { key: 'css', name: 'CSS', model: cssUrl, detail: 'Layout, type and motion. Tailwind for speed, plain CSS where it fits better.' },
  { key: 'typescript', name: 'TypeScript', model: typescriptUrl, detail: 'Types from the API response to the button, so mistakes show up early.' },
  // A database cylinder: tipped ~11° toward the camera so its top shows, as in its own file.
  { key: 'sql', name: 'SQL', model: sqlUrl, tilt: 0.19, detail: 'Well-shaped data in Postgres, MySQL or SQLite, with queries that stay quick as it grows.' },
  // The model file calls this icon 'swift', but it shows curly braces, so it stands for data here.
  { key: 'swift', name: 'JSON and APIs', model: swiftUrl, detail: 'Clean data between the page and everything behind it: REST, GraphQL and webhooks.' },
]
