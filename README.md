# AcmeWebStoreSearching

## Introduction
Acme Ltd operates a web store for their customers. The product area of the site is
structured in a traditional manner using a tree of categories. Each category level
displays zero or more items and links to zero or more subcategories. The same item
can sometimes appear in multiple categories.
Customers must log in to the site to access the product area. One logged in Acme
manages the visibility of each category by customer. Some categories (and thus the
categories’ items) can be seen by all customers whilst others can be seen by only a
specific customer or customers.

To speed up item searches on the site the development team has decided to
pre-compute which items are visible to which customers. Then, when a search is
performed, the found list of items can be quickly filtered using this pre-prepared data
to ensure that only items that are visible to the customer are displayed.

## Tasks

### Task 1:
The category, item and customer visibility data will be held
in-memory in a Javascript object structure. Design a structure
to hold this data.

### Solution:
Class:
```javascript
class Category {
  constructor(name) {
    this.name = name;
    this.items = [];
    this.subcategories = [];
    this.customers = [];
    this.id = catid++;
  }
}
```
Output Example:
```javascript
Category {
  name: 'Garden',
  items: [ 21, 22, 20 ],
  subcategories: [ 6, 9 ],
  customers: [ 1 ],
  id: 7
}
```

### Task 2:
Write a Javascript function which takes the root object of the
category tree as a parameter and returns an array containing a
list of objects, one object per customer. Each object will contain
a list of the items that are visible to that customer across the
entire site.

### Solution

Please see the file `main.js` and execute the program.

This script populates lists of Customers, Categories and Items from the hardcoded json.
It allows for nested Categories, and there is an example.

You are able to fetch any provided root `Category` and find all the Categories that are linked to it via Subcategories.

As requested, the function `viewCustomerItems` takes a root `Category` name and
returns an array containing a list of the items under the Nested Categories
per `Customer`.

In the case that there are duplicated Categories, it merges the two and makes one `Category`. You can see that happening in the below output
where `Vinegar`, `Bleach` and `Broom` are under the `Category` `Cleaning` for the `Kitchen` as well as `Garden`.

The current expected output is as follows:

Data Used:
```json
{
   "Food":{
      "items":[
         "Cheese",
         "Spaghetti",
         "Milk"
      ],
      "subcategories":{
         "Poultry":{
            "items":[
               "Chicken Fillet",
               "Boneless Chicken Thighs",
               "Chicken Drumsticks"
            ],
            "customers":[
               0,
               1
            ]
         },
         "Beef":{
            "items":[
               "Steak 350g",
               "Lean Ground Beef",
               "Steak 1kg"
            ],
            "customers":[
               0
            ]
         },
         "Pork":{
            "items":[
               "Bacon",
               "Pork Belly",
               "Pork Chops"
            ],
            "customers":[
               1
            ]
         }
      },
      "customers":[
         0
      ]
   },
   "Kitchen":{
      "items":[
         "Sponges",
         "Knives",
         "Forks"
      ],
      "subcategories":{
         "Cooking":{
            "items":[
               "Chicken Spice",
               "Vinegar",
               "Chop Spice"
            ],
            "customers":[
               0,
               1
            ]
         },
         "Cleaning":{
            "items":[
               "Vinegar",
               "Bleach",
               "Broom"
            ],
            "customers":[
               0,
               1
            ]
         }
      },
      "customers":[
         1,
         2
      ]
   },
   "Garden":{
      "items":[
         "Shovel",
         "Benches",
         "Broom"
      ],
      "subcategories":{
         "Cleaning":{
            "items":[
               "Broom",
               "Leaf Blower",
               "Leaf Rake"
            ],
            "customers":[
               0,
               1
            ]
         },
         "Pool":{
            "items":[
               "HTH",
               "Creepy Crawly",
               "Saftey Net"
            ],
            "customers":[
               1
            ],
            "subcategories":{
               "Pump":{
                  "items":[
                     "Filter",
                     "Sand",
                     "Pipes"
                  ],
                  "customers":[
                     1,
                     2
                  ]
               }
            }
         }
      },
      "customers":[
         1
      ]
   }
}
```

Line:
```javascript
console.log(viewCustomerItems("Garden"))
```
Output:
```javascript
{
  Jack: [
    Item { name: 'Vinegar', id: 16 },
    Item { name: 'Bleach', id: 19 },
    Item { name: 'Broom', id: 20 },
    Item { name: 'Leaf Blower', id: 25 },
    Item { name: 'Leaf Rake', id: 26 }
  ],
  Jill: [
    Item { name: 'Shovel', id: 21 },
    Item { name: 'Benches', id: 22 },
    Item { name: 'Broom', id: 20 },
    Item { name: 'HTH', id: 27 },
    Item { name: 'Creepy Crawly', id: 28 },
    Item { name: 'Saftey Net', id: 29 },
    Item { name: 'Filter', id: 30 },
    Item { name: 'Sand', id: 31 },
    Item { name: 'Pipes', id: 32 },
    Item { name: 'Vinegar', id: 16 },
    Item { name: 'Bleach', id: 19 },
    Item { name: 'Broom', id: 20 },
    Item { name: 'Leaf Blower', id: 25 },
    Item { name: 'Leaf Rake', id: 26 },
    Item { name: 'HTH', id: 27 },
    Item { name: 'Creepy Crawly', id: 28 },
    Item { name: 'Saftey Net', id: 29 }
  ],
  Chef: [
    Item { name: 'Filter', id: 30 },
    Item { name: 'Sand', id: 31 },
    Item { name: 'Pipes', id: 32 }
  ]
}
```
