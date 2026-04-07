import { mkdir, writeFile } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import https from 'https';
import { HttpsProxyAgent } from 'https-proxy-agent';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUTPUT_DIR = join(__dirname, '..', 'public', 'assets', 'pokemon');

// Resolve proxy: --proxy <url>  OR  env vars
const proxyArgIndex = process.argv.indexOf('--proxy');
const PROXY =
  (proxyArgIndex !== -1 ? process.argv[proxyArgIndex + 1] : null) ||
  process.env.HTTPS_PROXY ||
  process.env.https_proxy ||
  process.env.HTTP_PROXY ||
  process.env.http_proxy ||
  null;

if (PROXY) {
  console.log(`Using proxy: ${PROXY}\n`);
} else {
  console.log('No proxy configured — connecting directly.\n');
}

const agent = PROXY ? new HttpsProxyAgent(PROXY) : undefined;

const POKEMON = [
  { id: 1,  name: 'Pikachu',    pokeId: 25  },
  { id: 2,  name: 'Bulbasaur',  pokeId: 1   },
  { id: 3,  name: 'Charmander', pokeId: 4   },
  { id: 4,  name: 'Squirtle',   pokeId: 7   },
  { id: 5,  name: 'Eevee',      pokeId: 133 },
  { id: 6,  name: 'Jigglypuff', pokeId: 39  },
  { id: 7,  name: 'Snorlax',    pokeId: 143 },
  { id: 8,  name: 'Mewtwo',     pokeId: 150 },
  { id: 9,  name: 'Gengar',     pokeId: 94  },
  { id: 10, name: 'Lucario',    pokeId: 448 },
  { id: 11, name: 'Togepi',     pokeId: 175 },
  { id: 12, name: 'Psyduck',    pokeId: 54  },
  { id: 13, name: 'Meowth',     pokeId: 52  },
  { id: 14, name: 'Dragonite',  pokeId: 149 },
  { id: 15, name: 'Lapras',     pokeId: 131 },
  { id: 16, name: 'Mew',        pokeId: 151 },
  { id: 17, name: 'Ditto',      pokeId: 132 },
  { id: 18, name: 'Rayquaza',   pokeId: 384 },
  { id: 19, name: 'Mudkip',     pokeId: 258 },
  { id: 20, name: 'Piplup',     pokeId: 393 },
  { id: 21, name: 'Scorbunny',  pokeId: 813 },
  { id: 22, name: 'Grookey',    pokeId: 810 },
  { id: 23, name: 'Sobble',     pokeId: 816 },
  { id: 24, name: 'Mimikyu',    pokeId: 778 },
  { id: 25, name: 'Vulpix',     pokeId: 37  },
];

async function download(url, dest) {
  return new Promise((resolve, reject) => {
    const options = new URL(url);
    if (agent) options.agent = agent;

    https.get(options, (res) => {
      if (res.statusCode !== 200) {
        res.resume();
        return reject(new Error(`HTTP ${res.statusCode} for ${url}`));
      }
      const chunks = [];
      res.on('data', (chunk) => chunks.push(chunk));
      res.on('end', async () => {
        try {
          await writeFile(dest, Buffer.concat(chunks));
          resolve();
        } catch (e) {
          reject(e);
        }
      });
      res.on('error', reject);
    }).on('error', reject);
  });
}

async function main() {
  await mkdir(OUTPUT_DIR, { recursive: true });

  for (const p of POKEMON) {
    const url = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${p.pokeId}.png`;
    const dest = join(OUTPUT_DIR, `${p.pokeId}.png`);
    process.stdout.write(`Downloading ${p.name} (${p.pokeId})... `);
    try {
      await download(url, dest);
      console.log('✓');
    } catch (e) {
      console.log(`✗  ${e.message}`);
    }
  }

  console.log('\nAll done! Images saved to public/assets/pokemon/');
}

main();
