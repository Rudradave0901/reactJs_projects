import fs from 'node:fs';

const css = fs.readFileSync('src/css/index.css', 'utf-8');

// We will keep ::before, ::after, .active, background: url, background-image: url, :hover, @keyframes, animations, .content-pera, .section-title

// Actually, writing a precise regex regex replacer is hard.
// Let's just output a manually optimized version of the css file.
process.stdout.write(`Loaded ${css.length} CSS characters for review.\n`);
