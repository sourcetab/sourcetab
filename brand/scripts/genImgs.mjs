import {Buffer} from 'buffer';
import {rmSync, mkdirSync, readFileSync, readdirSync} from 'fs';
import sharp from 'sharp';
import {DOMParser, XMLSerializer} from '@xmldom/xmldom';

const domParser = new DOMParser();
const xmlToString = new XMLSerializer().serializeToString;

// Clear directories
for (const dir of ['./icons/png', './promotiles/png']) {
  rmSync(dir, {recursive: true, force: true});
  mkdirSync(dir);
}

const iconSvg = readFileSync('./icons/icon.svg', 'utf8');

// Generate icons
for (const size of [16, 19, 38, 48, 64, 128, 300, 500]) {
  const doc = domParser.parseFromString(iconSvg, 'image/svg+xml');
  doc.documentElement.setAttribute('width', size.toString());
  doc.documentElement.setAttribute('height', size.toString());
  sharp(Buffer.from(xmlToString(doc)))
    .png()
    .toFile(`./icons/png/${size}.png`);
}

// Generate promotiles
for (const size of readdirSync('promotiles')
  .map((v) => v.match(/^(.*).svg$/)?.[1])
  .filter(Boolean)) {
  const svgIconDoc = domParser.parseFromString(iconSvg, 'image/svg+xml');
  const doc = domParser.parseFromString(
    readFileSync(`./promotiles/${size}.svg`, 'utf8'),
    'image/svg+xml',
  );
  // eslint-disable-next-line unicorn/prefer-query-selector
  const docIcon = doc.getElementById('icon');
  const docIconNew = doc.createElement('g');

  docIconNew.setAttribute('filter', docIcon.getAttribute('filter'));
  const docIconSize = Number.parseInt(docIcon.getAttribute('r'), 10) * 2;
  docIconNew.setAttribute(
    'transform',
    `translate(${
      Number.parseInt(docIcon.getAttribute('cx'), 10) - docIconSize / 2
    }, ${
      Number.parseInt(docIcon.getAttribute('cy'), 10) - docIconSize / 2
    }) scale(${docIconSize / 100})`,
  );
  for (let i = 0; i < svgIconDoc.documentElement.childNodes.length; i += 1) {
    // eslint-disable-next-line unicorn/prefer-dom-node-append
    docIconNew.appendChild(
      svgIconDoc.documentElement.childNodes[i].cloneNode(true),
    );
  }

  docIcon.parentNode.replaceChild(docIconNew, docIcon);
  sharp(Buffer.from(xmlToString(doc)))
    .png()
    .toFile(`./promotiles/png/${size}.png`);
}
