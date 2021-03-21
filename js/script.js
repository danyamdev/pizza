document.addEventListener('DOMContentLoaded',() => {
  'use string';

  const getData = async (url) => {
    const req = await fetch(url);

    if (!req.ok) {
      throw new Error('Ошибка..')
    }

    return await req.json();
  };

  const render = () => {
    const pizzaItems = document.querySelector('.pizza__items');

    const renderGood = (good) => {
      let price = '';

      if (good.price.length == 1) 
        price = '<div data-size=26 class="active" data-count="0">26 см</div>';
      else if (good.price.length == 2) 
        price = `<div data-size=30  data-count="0" class="active">30 см</div>
                <div data-size=40  data-count="1">40 см</div>`;
      else 
        price = `<div data-size=26  data-count="0" class="active">26 см</div>
                <div data-size=30  data-count="1">30 см</div>
                <div data-size=40  data-count="2">40 см</div>`;

      pizzaItems.insertAdjacentHTML('beforeend', `
        <li class="pizza__item">
          <div class="pizza__img">
            <img src="${good.photo}" alt="${good.name}">
          </div>
          <div class="pizza__title">
            <h2>${good.name}</h2>
          </div>
          <div class="pizza__description">
            <p>${good.description}</p>
          </div>
          <div class="pizza__dimensions">${price}</div>
          <div class="pizza__price">
            <div class="pizza__gram">${good.gram[0]} г</div>
            <div class="pizza__value">${good.price[0]} <span class="rub">i</span></div>
          </div>
        </li>
      `);
    };

    const createGoodsList = (goodsList) => {
      goodsList.forEach(good => renderGood(good));
      tabs('.pizza__dimensions', '.pizza__dimensions div', goodsList);
    };

    getData('dbase/db.json')
      .then(response => createGoodsList(response))
      .catch(error => console.log(error));
  };

  const tabs = (selectorSize, selectorActive, goods) => {

    const pizzaDimensions = document.querySelectorAll(selectorSize);
    let pizzaValue = document.querySelectorAll('.pizza__value');
    let pizzaGram = document.querySelectorAll('.pizza__gram');

    const deactive = (btns) => btns.forEach(btn => btn.classList.remove('active'));

    pizzaDimensions.forEach((item, i) => {
      item.addEventListener('click', (e) => {
          const target = e.target;
          if (target && target.getAttribute('data-size')) {
            const price = goods[i].price;
            const gram = goods[i].gram;
            const count = target.dataset.count;

            deactive(item.querySelectorAll(selectorActive));
            
            if (target.getAttribute('data-size') == 26) {
              pizzaValue[i].innerHTML = `${price[count]} <span class="rub">i</span>`;
              pizzaGram[i].innerHTML = `${gram[count]} г`;
            }
            if (target.getAttribute('data-size') == 30) {
              pizzaValue[i].innerHTML = `${price[count]} <span class="rub">i</span>`;
              pizzaGram[i].innerHTML = `${gram[count]} г`;
            }
            if (target.getAttribute('data-size') == 40) {
              pizzaValue[i].innerHTML = `${price[count]} <span class="rub">i</span>`;
              pizzaGram[i].innerHTML = `${gram[count]} г`;
            }

            target.classList.add('active');
          }
        })
      });
  }

  render();
  // const slider = tns({
  //   container: '.my-slider',
  //   responsive: {
  //     640: {
  //       edgePadding: 20,
  //       gutter: 20,
  //       items: 2
  //     },
  //     768: {
  //       items: 2,
  //       gutter: 30
  //     },
  //     900: {
  //       items: 3
  //     }
  //   }
  // });  
}); 
