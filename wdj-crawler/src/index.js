import fetch from 'node-fetch';
import cheerio from 'cheerio';
import fs from 'fs';
import path from 'path';
import urlParser from 'url';

const getUrl = link => {
  if (!link.includes('http')) {
    return `http://localhost:3000/${link}`;
  }

  if (link.endsWith('/')) {
    return `http://localhost:3000${link}`;
  }

  return link;
};

const seenUrls = {};

const crawl = async ({ url }) => {
  if (seenUrls[url]) {
    return;
  }

  console.log('CRAWLING: ', url);

  seenUrls[url] = true;

  const response = await fetch(url);
  const html = await response.text();

  const $ = cheerio.load(html);

  const links = $('a')
    .map((i, link) => link.attribs.href)
    .get();

  const imageUrls = $('img')
    .map((i, image) => image.attribs.src)
    .get();

  console.log('IMAGES: ', imageUrls);

  imageUrls.forEach(imageUrl => {
    fetch(getUrl(imageUrl))
      .then(response => {
        const fileName = path.basename(imageUrl);
        const dest = fs.createWriteStream(`images/${fileName}`);
        response.body.pipe(dest);
      })
      .catch(error => console.log('ERROR: ', error.message));
  });

  const { host } = urlParser.parse(url);

  links.filter(link => link.includes(host)).forEach(link => crawl({ url: getUrl(link) }));
};

crawl({ url: 'https://goit.ua/' });
