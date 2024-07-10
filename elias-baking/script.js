// --- PRODUCS --- //

// Stock is the ingredient quantity and cost on hand
let stock = {
  brownies: {
    flour: {
      quantity: 1500,
      unit: 'g',
      cost: 1.89,
    },
    cocoaPowder: {
      quantity: 250,
      unit: 'g',
      cost: 3.89,
    },
    salt: {
      quantity: 100,
      unit: 'tsp',
      cost: 2.49,
    },
    butter: {
      quantity: 500,
      unit: 'g',
      cost: 6.79,
    },
    sweetChoc: {
      quantity: 250,
      unit: 'g',
      cost: 5.99,
    },
    darkChoc: {
      quantity: 250,
      unit: 'g',
      cost: 5.99,
    },
    sugar: {
      quantity: 1500,
      unit: 'g',
      cost: 2.99,
    },
    eggs: {
      quantity: 12,
      unit: 'large',
      cost: 6.99,
    },
    vanilla: {
      quantity: 20,
      unit: 'tbsp',
      cost: 3.5,
    },
  },

  chocolateBar: {
    sweetChoc: {
      quantity: 250,
      unit: 'g',
      cost: 5.99,
    },
    darkChoc: {
      quantity: 250,
      unit: 'g',
      cost: 5.99,
    },
    pistachioCream: {
      quantity: 600,
      unit: 'g',
      cost: 18,
    },
  },
}

// Recipe is the amount needed of an ingredient for each recipe
let recipe = {
  brownies: {
    flour: {
      unit: 'g',
      quantityNo: 62,
      cost: (62 / stock.brownies.flour.quantity) * stock.brownies.flour.cost,
      alt: 'Flour',
    },
    cocoaPowder: {
      unit: 'g',
      quantityNo: 50,
      cost:
        (50 / stock.brownies.cocoaPowder.quantity) *
        stock.brownies.cocoaPowder.cost,
      alt: 'Cocoa Powder',
    },
    salt: {
      unit: 'tsp',
      quantityNo: 1.5,
      cost: (1.5 / stock.brownies.salt.quantity) * stock.brownies.salt.cost,
      alt: 'Salt',
    },
    butter: {
      unit: 'g',
      quantityNo: 115,
      cost: (115 / stock.brownies.butter.quantity) * stock.brownies.butter.cost,
      alt: 'Butter',
    },
    sweetChoc: {
      unit: 'g',
      quantityNo: 118,
      cost:
        (118 / stock.brownies.sweetChoc.quantity) *
        stock.brownies.sweetChoc.cost,
      alt: 'Creamy Milk Chocolate',
    },
    darkChoc: {
      unit: 'g',
      quantityNo: 118,
      cost:
        (118 / stock.brownies.darkChoc.quantity) * stock.brownies.darkChoc.cost,
      alt: 'Dark Chcocolate',
    },
    sugar: {
      unit: 'g',
      quantityNo: 250,
      cost: (250 / stock.brownies.sugar.quantity) * stock.brownies.sugar.cost,
      alt: 'Sugar',
    },
    eggs: {
      unit: 'Large',
      quantityNo: 3,
      cost: (3 / stock.brownies.eggs.quantity) * stock.brownies.eggs.cost,
      alt: 'Eggs',
    },
    vanilla: {
      unit: 'tbsp',
      quantityNo: 1.5,
      cost:
        (1.5 / stock.brownies.vanilla.quantity) * stock.brownies.vanilla.cost,
      alt: 'Vanilla',
    },
  },

  chocolateBar: {
    sweetChoc: {
      unit: 'g',
      quantityNo: 125,
      cost:
        (125 / stock.chocolateBar.sweetChoc.quantity) *
        stock.chocolateBar.sweetChoc.cost,
      alt: 'Creamy Milk Chocolate',
    },
    darkChoc: {
      unit: 'g',
      quantityNo: 25,
      cost:
        (25 / stock.chocolateBar.darkChoc.quantity) *
        stock.chocolateBar.darkChoc.cost,
      alt: 'Dark Chocolate',
    },
    pistachioCream: {
      unit: 'g',
      quantityNo: 100,
      cost:
        (100 / stock.chocolateBar.pistachioCream.quantity) *
        stock.chocolateBar.pistachioCream.cost,
      alt: 'Pistachio Cream',
    },
  },
}

// --- FUNCTIONS --- //

let batch = 1

//Displays products
function displayProducts() {
  let ingredients = Object.keys(recipe.brownies)
  let bar = Object.keys(recipe.chocolateBar)

  for (let i = 0; i < ingredients.length; i++) {
    document.getElementById(ingredients[i]).innerHTML =
      recipe.brownies[ingredients[i]].alt +
      ' <br> Quantity: ' +
      recipe.brownies[ingredients[i]].quantityNo * batch +
      recipe.brownies[ingredients[i]].unit +
      ' <br> Cost: $' +
      (Math.round(recipe.brownies[ingredients[i]].cost * 100) / 100) * batch
  }

  for (let i = 0; i < bar.length; i++) {
    document.getElementById(bar[i] + 'Bar').innerHTML =
      recipe.chocolateBar[bar[i]].alt +
      ' <br> Quantity: ' +
      recipe.chocolateBar[bar[i]].quantityNo * batch +
      recipe.chocolateBar[bar[i]].unit +
      ' <br> Cost: $' +
      (Math.round(recipe.chocolateBar[bar[i]].cost * 100) / 100) * batch
  }
}

displayProducts()

// Calculates total cost of ingredients required
function totalCost() {
  let cost = 0

  //Brownies
  let ingredients = Object.keys(recipe.brownies)
  for (let i = 0; i < ingredients.length; i++) {
    cost += recipe.brownies[ingredients[i]].cost * batch
  }

  //ChocolateBar
  let bar = Object.keys(recipe.chocolateBar)
  for (let i = 0; i < bar.length; i++) {
    cost += recipe.chocolateBar[bar[i]].cost * batch
  }

  document.getElementById('total').innerHTML =
    'Total cost: $' + Math.round(cost * 100) / 100
}

totalCost()

// Updates quantities and costs depending how many batches is being made.
function updateBatch() {
  const batchInput = document.getElementById('batchInput').value
  batch = Number(batchInput)
  console.log('Batch updated to: ' + batch)
  displayProducts()
  totalCost()
  foodCount()
  scratchCost()
}

// Calculate cost of ingredients if full sized ingredients had to be purchased
function scratchCost() {
  let cost = 0

  //Brownies
  let ingredients = Object.keys(stock.brownies)
  for (let i = 0; i < ingredients.length; i++) {
    let stockQuantity = stock.brownies[ingredients[i]].quantity
    let stockOriginalQuantity = stock.brownies[ingredients[i]].quantity
    let recipeQuantity = recipe.brownies[ingredients[i]].quantityNo * batch
    let stockNeeded = 1
    while (stockQuantity < recipeQuantity) {
      stockNeeded++
      stockQuantity += stockOriginalQuantity
    }

    cost += stock.brownies[ingredients[i]].cost * stockNeeded
  }

  //ChocolateBar
  let bar = Object.keys(recipe.chocolateBar)
  for (let i = 0; i < bar.length; i++) {
    let stockQuantity = stock.chocolateBar[bar[i]].quantity
    let stockOriginalQuantity = stock.chocolateBar[bar[i]].quantity
    let recipeQuantity = recipe.chocolateBar[bar[i]].quantityNo * batch
    let stockNeeded = 1
    while (stockQuantity < recipeQuantity) {
      stockNeeded++
      stockQuantity += stockOriginalQuantity
    }

    cost += stock.chocolateBar[bar[i]].cost * stockNeeded
  }

  document.getElementById('scratchTotal').innerHTML =
    'No ingredients on hand? Starting cost is: $' + Math.round(cost * 100) / 100
}

scratchCost()

// Calculate food count
function foodCount() {
  //Brownies
  let brownieCount = 18 * batch
  let brownieCooktime = 30 * batch
  document.getElementById('brownieCount').innerHTML =
    'Produces ' +
    brownieCount +
    ' brownies and takes ' +
    brownieCooktime +
    'm to cook.'

  //ChocolateBar
  let barCount = 3 * batch
  document.getElementById('barCount').innerHTML =
    'Produces ' + barCount + ' bars.'
}
foodCount()

// -- BUTTONS -- //

let brownieVisibility = document.getElementById('brownieSection')
let chocBarVisibility = document.getElementById('chocBarSection')
let shopListVisibility = document.getElementById('shoppingListSection')

let brownieButton = document.getElementById('brownie')
let chocBarButton = document.getElementById('barChoc')
let shopListButton = document.getElementById('shoppingList')

document.getElementById('brownie').onclick = function () {
  //change visibility of sections
  brownieVisibility.classList.remove('invisible')
  chocBarVisibility.classList.add('invisible')
  shopListVisibility.classList.add('invisible')

  //change button colours
  brownieButton.classList.remove('grey')
  chocBarButton.classList.add('grey')
  shopListButton.classList.add('grey')
}

document.getElementById('barChoc').onclick = function () {
  //change visibility of sections
  chocBarVisibility.classList.remove('invisible')
  brownieVisibility.classList.add('invisible')
  shopListVisibility.classList.add('invisible')

  //change button colours
  chocBarButton.classList.remove('grey')
  brownieButton.classList.add('grey')
  shopListButton.classList.add('grey')
}

document.getElementById('shoppingList').onclick = function () {
  //change visibility of sections
  shopListVisibility.classList.remove('invisible')
  brownieVisibility.classList.add('invisible')
  chocBarVisibility.classList.add('invisible')

  //change button colours
  shopListButton.classList.remove('grey')
  chocBarButton.classList.add('grey')
  brownieButton.classList.add('grey')
}
