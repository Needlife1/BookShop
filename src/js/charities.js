import { sup_org } from "./organizations";

const refs = {
    list: document.querySelector('.org-list'),
    btn: document.querySelector('.btn-up'),
    icon: document.querySelector('.icon-arrow')
}

let number = 1;
let currentItemIdx = 0;
const maxItems = sup_org.length;
let itemHeight = 0;

function markupItems() {
  sup_org.forEach(item => {
    const listItem = `
      <li>
        <a
        href="${item.url}"
        target="_blank"
        class="org-item"
        >
          0${number++}
          <img
          srcset="${item.img} 1x, ${item.img2} 2x"
          src="${item.img}" alt="${item.title}"
          class="org-img"
           />
        </a>
      </li>
    `;
    refs.list.insertAdjacentHTML('beforeend', listItem);
  });
    itemHeight = refs.list.firstElementChild.clientHeight;
};

refs.btn.addEventListener('click', onScrollBtnClick);

function onScrollBtnClick() {
    let itms = 8;
    currentItemIdx = currentItemIdx + itms;

    if (currentItemIdx >= maxItems) {
        currentItemIdx = 0;
        refs.list.scrollTo({
            top: currentItemIdx * itemHeight,
            behavior: 'smooth',
        });
      refs.icon.classList.remove('transform');
      refs.btn.classList.remove('active-btn');
    } else {
        refs.list.scrollTo({
            top: currentItemIdx * itemHeight,
            behavior: 'smooth',
        });
      refs.icon.classList.add('transform');
      refs.btn.classList.add('active-btn');
    }
}

markupItems()