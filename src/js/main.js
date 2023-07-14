import * as bootstrap from "bootstrap";

//la boutique contient 8 cards cliquables séparées en 2 sections de 4 cards avec boutons oranges

//initialisation du panier d'achat
const cart = [];

//déclaration d'une fonction qui retire tous les éléments enfants et qui est utlisée pour updateCart
function removeAllChildren(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

//avec for, on englobe tous les éléments qui ont la classe card en utilisant le document.querySelectorAll
for (const card of document.querySelectorAll(".card")) {
  //pour chacun des éléments, on extrait les attributs title et price (prix) du dataset et on crée un nouvel item(objet)
  const { title, price } = card.dataset;
  const item = { title, price: Number(price) };
  //pour la card, le querySlector sélectionne le bouton et y écoute l'événement click, puis pousse l'objet item dans le cart
  card
    .querySelector("a,button")
    .addEventListener("click", () => cart.push(item));
}
//la fontion updateCart passe un argument simple cartElement (élément de la modale) qui fait apparaitre les items dans le cart et le prix total
function updateCart(cartElement) {
  //avec querySelector il trouve le ul et le total
  const cartItemsList = cartElement.querySelector("ul");
  const totalElement = cartElement.querySelector(".total");
  //pui il retire tous les enfants de ul
  removeAllChildren(cartItemsList);

  //il boucle à travers le tableau cart en utilisant le cart.entries pour obtenir l'indice et son objet
  //pour chacun des objets, il crée une nouvelle li et défini son contenu html avec les propriétés title et price
  for (const [index, { title, price }] of cart.entries()) {
    const itemElement = document.createElement("li");
    //toFixed sert à faire apparaître les 2 décimales après le point
    itemElement.innerHTML = `
      <li>
        <span>${title}: </span>
        <span>${price.toFixed(2)} CAD</span>
        <button>X</button>
      </li>
    `;
    //écoute de l'événement click sur le bouton pour supprimer l'article du panier et appeler le updateCart pour mettre à jour le panier
    itemElement.querySelector("button").addEventListener("click", () => {
      cart.splice(index, 1);
      updateCart(cartElement);
    });

    cartItemsList.appendChild(itemElement);
  }
  //au final, la fonction calcule le prix total en utilisant reduce pour mettre à jour le prix total du cart, on fixe le prix à 2 décimales après le point
  const price = cart.reduce((total, { price }) => total + price, 0);
  totalElement.innerText = `${price.toFixed(2)} CAD`;
}
//le querySelector trouve la modal et l'événement shown.bs.modal qui va appeler le updateCart
const modal = document.querySelector("#cart");
modal.addEventListener("shown.bs.modal", () => updateCart(modal));
