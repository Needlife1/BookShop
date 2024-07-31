import{a as l,b as m,c as u}from"./assets/scroll-up-BJ-nzIN7.js";const h="/BookShop/assets/icons-C5rtN4_I.svg",t={container:document.querySelector(".js-list"),totalQuantity:document.querySelector(".js-quantity"),clearBtn:document.querySelector(".js-clear"),pageName:document.querySelector(".js-title"),message:document.querySelector(".js-message"),booksImg:document.querySelector(".js-books"),body:document.querySelector("body")},n="booksInList";var i=null;c();t.container.addEventListener("click",s=>{var e=null;s.target.classList.contains("icon-delete")?e=s.target.parentNode:s.target.parentNode.classList.contains("icon-delete")?e=s.target.parentNode.parentNode:s.target.classList.contains("btn-delete")&&(e=s.target),e&&y(e.dataset.id)});function b(s){return s.map(({_id:e,book_image:o,title:a,list_name:r,description:p,author:d,buy_links:g})=>`
<li data-id='${e}' class='shopping-card-item'>
    <img src='${o}' alt ='${a}' class='shopping-img'>
    <div class="shopping-info">
      <h2 class='shopping_title description-title'>${a}</h2>
      <p class='shopping-list_name'>${r}</p>
      <h3 class='shopping-text description'>${p}</h3>
      <div class='shopping-socials'>
        <p class= 'shopping_author'>${d}</p>
        <ul class="socials_list">
          ${k(g)}
        </ul>
      </div>
    </div>

  <button type="button" class="js-clear btn-delete", data-id=${e}>
    <svg class="icon-delete" width="28" height="28">
      <use href="${h}#icon-trash"></use>
    </svg>
  </button>

</li>`).join("")}function k(s){return s.slice(0,2).map(e=>{let o=null,a=null;if(t.body.classList.contains("dark-theme"))switch(console.log("dark"),e.name){case"Amazon":{a="social-icon-amazon",o=`${m}`;break}case"Apple Books":{o=`${l}`,a="social-icon-book";break}default:o=`${l}`,a="social-icon-book"}else switch(e.name){case"Amazon":{o=`${u}`;break}case"Apple Books":{o=`${l}`;break}default:o=`${l}`}return`<li class = "book-icon">
      <a
        class=${a}
        href=${e.url}
        target="_blank"
      rel="nofollow noopener noreferree"
        aria-label="Book icon"
      >
      <img src=${o} class= "social-icon" alt="${e.name}" width ='32px' height='32px'/>
      </a>
  </li>`}).join("")}function c(){i=JSON.parse(localStorage.getItem(n))??[],i.length?(t.booksImg.style.display="none",t.message.style.display="none",t.container.innerHTML=b(i)):(t.container.innerHTML="",t.booksImg.style.display="block",t.message.style.display="block",t.booksImg.style.visibility="visible",t.message.style.visibility="visible")}function y(s){const e=i.filter(o=>o._id!==s);e.length==0?localStorage.removeItem(n):localStorage.setItem(n,JSON.stringify(e)),c()}
//# sourceMappingURL=commonHelpers2.js.map
