import { createOptimizedPicture } from '../../scripts/lib-franklin.js';



export default function decorate(block) {
  /* change to Div , a */
  const teasergriddiv = document.createElement('div');
  teasergriddiv.className='card-teaser-grid';
  [...block.children].forEach((row) => {
    const teaseritemdiv = document.createElement('div');
    teaseritemdiv.className='card-teaser-item';
    teaseritemdiv.innerHTML = row.innerHTML;
    [...teaseritemdiv.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) div.className = 'cards-card-image';
      else div.className = 'cards-card-body';
    });
    teasergriddiv.append(teaseritemdiv);
  });
  teasergriddiv.querySelectorAll('img').forEach((img) => img.closest('picture').replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }])));
  block.textContent = '';
  block.append(teasergriddiv);
}



