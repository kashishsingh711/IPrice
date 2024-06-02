let list = [];
const refreshProducts = async () => {
  const data = await fetch('./hmtTrack/prices.json')
    .then((res) => res.json())
    .then((response) => response);
  list = data;
};
setInterval(refreshProducts(), 60000);

const btn = document.getElementById('search-button');

btn.addEventListener('click', (e) => {
  e.preventDefault();
  console.log(list, typeof list);
  const searchTerm = document.getElementById('search').value;
  handleSubmit(searchTerm);
});

const handleSubmit = (searchTerm) => {
  productsList = list.filter(
    (item) => item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  console.log(productsList);
  updateProductCards(productsList);
};
const updateProductCards = (products) => {
  const elm = document.getElementById('product-cards');

  const cards = products
    .map((item) => {
      return item.itemList
        .map((subItem) => {
          console.log(subItem);
          return `
      	<div class="apple">
      		<div>
      			<img src=${subItem.image}>
      		</div>
      		<div>
      			<h3>${item.title}</h3>
      			<h3>${subItem.color}</h3>
      			<h3>${subItem.size}</h3>
      		</div>
       <div class="">
       ${subItem.info
         .map((perItem) => {
           console.log(perItem);
           return `
      			<div class="apple-col">
      				<h5>₹${perItem.price}</h5>
      				<p><a href=${perItem.link}>${perItem.site}</a></p>
      			</div>
            `;
         })
         .join('')}
         </div>
      	</div>
        `;
        })
        .join('');
    })
    .join('');
  console.log(cards);
  elm.innerHTML = cards;
  console.log(elm);
};
