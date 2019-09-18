document.addEventListener('animationstart', (e) => {
  console.log(e.animationName)
  switch (e.animationName) {
    case "bf-marker-price":

      const SQM_PRICE_CLASS = 'bf-sqm-price'

      const commonAncestor = e.target.parentNode.parentNode;
      if (commonAncestor.querySelector(`.${SQM_PRICE_CLASS}`)) {
        console.log('Already marked')
        return;
      }

      const priceEl = e.target;
      const price = parseInt(priceEl.textContent.replace(/\D/g, ""));

      const areaEl = commonAncestor.querySelector('.search-result-kenmerken li:nth-child(1) span:nth-child(1)');
      const area = parseInt(areaEl.textContent);


      if (isNaN(price) || isNaN(area)) {
        console.warn(`No price (${price}) or area (${area}) found`)
        return;
      }

      const sqmPrice = Math.round(price / area);
      const sqmPriceFormatted = new Intl.NumberFormat('nl-NL', { style: 'currency', currency: 'EUR', minimumFractionDigits: 0 }).format(sqmPrice);

      const sqmPriceEl = document.createElement('span');
      sqmPriceEl.classList.add(SQM_PRICE_CLASS)
      sqmPriceEl.textContent = `${sqmPriceFormatted} / m²`;
      sqmPriceEl.title = `${price} / ${area}`
      priceEl.after(sqmPriceEl);

      break;
  }
});
