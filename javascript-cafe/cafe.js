// -- JAVASCRIPT CAFE! -- //

// PRODUCTS //

let products = {
  whiteCoffee: {
    stock: 4,
    price: 4,
    wholesaleCost: 2,
  },

  blackCoffee: {
    stock: 7,
    price: 3.5,
    wholesaleCost: 2,
  },

  applePie: {
    stock: 10,
    price: 3,
    wholesaleCost: 2,
  },

  blueberryMuffin: {
    stock: 12,
    price: 3.2,
    wholesaleCost: 2,
  },

  biscoffMuffin: {
    stock: 12,
    price: 3.2,
    wholesaleCost: 2,
  },

  eggs: {
    stock: {
      scrambled: 4,
      fried: 4,
      poached: 4,
    },
    price: 8,
    wholesaleCost: 2,
  },
}

function displayProducts() {
  document.getElementById('whiteCoffee').innerHTML =
    'White Coffee: <br> In Stock: ' +
    products.whiteCoffee.stock +
    '<br> Cost: $' +
    products.whiteCoffee.price

  document.getElementById('blackCoffee').innerHTML =
    'Black Coffee: <br> In Stock: ' +
    products.blackCoffee.stock +
    '<br> Cost: $' +
    products.blackCoffee.price

  document.getElementById('applePie').innerHTML =
    'Apple Pie: <br> In Stock: ' +
    products.applePie.stock +
    '<br> Cost: $' +
    products.applePie.price

  document.getElementById('blueberryMuffin').innerHTML =
    'Blueberry Muffin: <br> In Stock: ' +
    products.blueberryMuffin.stock +
    '<br> Cost: $' +
    products.blueberryMuffin.price

  document.getElementById('biscoffMuffin').innerHTML =
    'Biscoff Muffin: <br> In Stock: ' +
    products.biscoffMuffin.stock +
    '<br> Cost: $' +
    products.biscoffMuffin.price

  document.getElementById('eggs').innerHTML =
    'Eggs: <br> In Stock: ' +
    '<br><span id="scrambled"> scrambled:</span> ' +
    products.eggs.stock.scrambled +
    '<br><span id="poached"> poached:</span> ' +
    products.eggs.stock.poached +
    '<br><span id="fried"> fried:</span> ' +
    products.eggs.stock.fried +
    '<br> Cost: $' +
    products.eggs.price
  outOfStock()
}

function outOfStock() {
  for (key in products) {
    if (key != 'eggs' && products[key].stock == 0) {
      document.getElementById(key).classList.add('red')
    } else if (key == 'eggs') {
      for (cook in products.eggs.stock) {
        if (products.eggs.stock[cook] == 0) {
          document.getElementById(cook).classList.add('red')
        }
      }
    }
  }
}

function restockProduct(product) {
  if (Array.isArray(product)) {
    if (cash > products[product[0]].stock[product[1]]) {
      products[product[0]].stock[product[1]]++
      cash -= products[product[0]].wholesaleCost
      // document.getElementById(product[1]).classList.remove('red')
      displayProducts()
      displayCash()
    } else {
      alert("You're too broke to restock... u should file bankruptcy")
    }
  } else if (cash > products[product].wholesaleCost) {
    products[product].stock++
    cash -= products[product].wholesaleCost
    document.getElementById(product).classList.remove('red')
    displayProducts()
    displayCash()
  } else {
    alert("You're too broke to restock... u should file bankruptcy")
  }
}

document.getElementById('restock-whiteCoffee').onclick = function () {
  restockProduct('whiteCoffee')
}

document.getElementById('restock-blackCoffee').onclick = function () {
  restockProduct('blackCoffee')
}

document.getElementById('restock-applePie').onclick = function () {
  restockProduct('applePie')
}

document.getElementById('restock-blueberryMuffin').onclick = function () {
  restockProduct('blueberryMuffin')
}

document.getElementById('restock-biscoffMuffin').onclick = function () {
  restockProduct('biscoffMuffin')
}

document.getElementById('restock-scrambledEggs').onclick = function () {
  restockProduct(['eggs', 'scrambled'])
}

document.getElementById('restock-poachedEggs').onclick = function () {
  restockProduct(['eggs', 'poached'])
}

document.getElementById('restock-friedEggs').onclick = function () {
  restockProduct(['eggs', 'fried'])
}

displayProducts()
// -- CUSTOMERS -- //

let customer = {
  order: [],
  wallet: 0,
}

// min/max order restraints

let minOrderSize = 1
let maxOrderSize = 5

function generateCustomerOrder() {
  // get a random size for order in range of 1-5

  let orderSize = getRandomInt(minOrderSize, maxOrderSize)

  // make a new array of things ordered

  let newOrder = []
  let productNames = Object.keys(products)

  for (let i = 0; i <= orderSize; i++) {
    productindex = getRandomInt(0, productNames.length)
    let productName = productNames[productindex]

    if (typeof products[productNames[productindex]].stock === 'object') {
      let options = Object.keys(products[productNames[productindex]].stock)
      let pref = options[getRandomInt(0, options.length)]
      newOrder.push([productName, pref])
    } else {
      newOrder.push(productName)
    }
  }

  // assign new order to customer object

  customer.order = newOrder

  // generate random wallet amount in range 0-20

  customer.wallet = getRandomInt(0, 35)

  displayCustomerOrder()
}

function displayCustomerOrder() {
  // display the customer order and their wallet

  document.getElementById('customerOrder').innerHTML =
    'Customer order: ' + formatOrder()

  document.getElementById('customerWallet').innerHTML =
    'Customer wallet: $' + customer.wallet
}

function formatOrder() {
  let formattedOrder = '<ul>'
  for (let i = 0; i < customer.order.length; i++) {
    formattedOrder += '<li>' + customer.order[i] + '</li>'
  }
  formattedOrder += '</ul>'
  return formattedOrder
}

document.getElementById('customerButton').onclick = generateCustomerOrder

// -- TRANSACTIONS -- //

let cash = 20

function displayCash() {
  document.getElementById('cash').innerHTML = 'Cash: ' + cash
}
displayCash()

function fillOrder() {
  // variable to keep track of sale total

  let saleTotal = 0

  // loop through customer order array
  // if product in stock sell to them and keep track of sale
  // if out of stock, alert out of stock

  for (let i = 0; i < customer.order.length; i++) {
    let productName = customer.order[i]
    if (typeof productName === 'object') {
      if (products[productName[0]].stock[productName[1]] > 0) {
        saleTotal += products[productName[0]].price

        if (saleTotal > customer.wallet) {
          alert("Sorry, you're a broke girlie..")
          return
        }

        products[productName[0]].stock[productName[1]]--
      } else {
        alert(
          'I am super sorry, we are out of ' +
            productName[1] +
            ' ' +
            productName[0]
        )
      }
    } else if (products[productName].stock > 0) {
      saleTotal += products[productName].price

      if (saleTotal > customer.wallet) {
        alert("Sorry, you're a broke girlie..")
        return
      }

      products[productName].stock--
    } else {
      alert('I am super sorry, we are out of ' + productName)
    }
  }

  // add the sale total to our Cash

  cash += saleTotal

  // clear customer order

  customer.order = []
  customer.wallet = 0
  // display new totals

  displayProducts()
  displayCash()
  displayCustomerOrder()
}
document.getElementById('fillOrder').onclick = fillOrder

// -- UTIL -- //

function getRandomInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min)) + min
}
