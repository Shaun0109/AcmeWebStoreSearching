// The ids that are incremented for each category/customer/item created
let catid = 0;
let custid = 0;
let itemid = 0;

// Contains the customers and all the categories/subcategories/items that the constomers can access
const customers = [];
const categories = [];
const items = []

// Represents a basic customer that has access to a category and its items
class Customer {
    constructor(name) {
        this.name = name;
        this.id = custid++;
    }
}

// Represents a basic item that can be added to a category
class Item {
    constructor(name) {
        this.name = name;
        this.id = itemid++;
    }
}

// This is a main category and can becomes a subcategory inside a category
class Category {
    constructor(name) {
        this.name = name;
        this.items = [];
        this.subcategories = [];
        this.customers = [];
        this.id = catid++;
    }

    addItems(itemIds) {
        itemIds.forEach(id => {
            // Add the item if it is not already added
            if (!this.items.includes(id)) {
                this.items.push(id);
            }
        });
    }

    addCustomers(customerIds) {
        customerIds.forEach(id => {
            // Add the customer if it is not already added
            if (!this.customers.includes(id)) {
                this.customers.push(id);
            }
        });
    }

    addSubCategories(categoryIds) {
        categoryIds.forEach(id => {
            // Add the subcategory if it is not already added
            if (!this.subcategories.includes(id)) {
                this.subcategories.push(id);
            }
        });
    }
}

// Populates the variables with the data so we can test the program
function populate() {

    // Create the customers
    const customerData = ["Jack", "Jill", "Chef"]
    // JSON that we will use to populate our categories/subcategories
    const categoryData = {
        "Food": {
            "items": ["Cheese", "Spaghetti", "Milk"],
            "subcategories": {
                "Poultry": {
                    "items": ["Chicken Fillet", "Boneless Chicken Thighs", "Chicken Drumsticks"],
                    "customers": [0, 1]
                },
                "Beef": {
                    "items": ["Steak 350g", "Lean Ground Beef", "Steak 1kg"],
                    "customers": [0]
                },
                "Pork": {
                    "items": ["Bacon", "Pork Belly", "Pork Chops"],
                    "customers": [1]
                }
            },
            "customers": [0]
        },
        "Kitchen": {
            "items": ["Sponges", "Knives", "Forks"],
            "subcategories": {
                "Cooking": {
                    "items": ["Chicken Spice", "Vinegar", "Chop Spice"],
                    "customers": [0, 1]
                },
                "Cleaning": {
                    "items": ["Vinegar", "Bleach", "Broom"],
                    "customers": [0, 1]
                }
            },
            "customers": [1, 2]
        },
        "Garden": {
            "items": ["Shovel", "Benches", "Broom"],
            "subcategories": {
                "Cleaning": {
                    "items": ["Broom", "Leaf Blower", "Leaf Rake"],
                    "customers": [0, 1]
                },
                "Pool": {
                    "items": ["HTH", "Creepy Crawly", "Saftey Net"],
                    "customers": [1],
                    "subcategories": {
                        "Pump": {
                            "items": ["Filter", "Sand", "Pipes"],
                            "customers": [1, 2]
                        }
                    }
                }
            },
            "customers": [1]
        }
    }

    // Populate the customers
    customerData.map(customer => customers.push(new Customer(customer)))

    createCategories(categoryData)
}

// Creates all the Items from the root
function createItems(root) {

    // Inserts the item to the main variable storing unique categories
    function insertItem(item) {
        const found = items.find(element => element.name.toLowerCase() === item.name.toLowerCase());
        if (found == undefined) {
            items.push(item)
        }
    }

    const itemsCreated = root.flatMap(item => new Item(item))

    // console.log(items)
    itemsCreated.map(item => insertItem(item))
}

// Searches the list for the item and returns it if found
function findObjectByName(list, name) {
    return list.find(element => element.name.toLowerCase() === name.toLowerCase());
}

function findObjectByID(list, id) {
    return list.find(element => element.id == id);
}

// Loop through each category in the root and create it. This function also creates any of the subcategories inside the root
function createCategories(root) {

    // Inserts the category to the main variable storing unique categories
    function insertCategory(category) {
        const found = categories.find(element => element.name.toLowerCase() === category.name.toLowerCase());
        if (found == undefined) {
            categories.push(category)
        } else {
            // I was not sure what functionality to implement for duplicated categories, so the chosen functionality:
            // Merge the categories items and customers if there are duplicated categories (illegal to have multiple categories)
            found.addItems(category.items)
            found.addCustomers(category.customers)
        }
    }

    for (const key in root) {

        // Create the items that are under each category first
        createItems(root[key]["items"])

        // Create the category
        const category = new Category(key)

        // Add the item ID to the category
        category.addItems(root[key]["items"].map(item => findObjectByName
            (items, item).id))

        // Add the customer ID to the category
        category.addCustomers(root[key]["customers"])

        // If there are additional categories, create them
        if (root[key]["subcategories"] != undefined) {
            createCategories(root[key]["subcategories"])

            // Link the subcategories
            const subcategoryIds = Object.keys(root[key]["subcategories"]).map(
                categoryName => findObjectByName
                    (categories, categoryName).id
            );
            category.addSubCategories(subcategoryIds)
        }
        insertCategory(category)
    }
}

// Fetches the category and its nested categories
function getNestedCategories(category) {
    let allowedCategories = [category]

    // Get all the subcategories of the category (match them by their id)
    const baseCategories = Object.values(categories).filter(value => category.subcategories.includes(value.id))

    // Filter subcategories with subcategories
    const additional = baseCategories.filter(value => value.subcategories.length > 0)
    if (additional.length > 0) {
        allowedCategories.push(additional.flatMap(getNestedCategories))
    }

    // Add the categories all together, flatten it and then return the values
    allowedCategories.push(baseCategories)
    return allowedCategories.flat(1);
}

// Returns an array containing a list of the items under the Nested Categories per Customer.
function viewCustomerItems(categoryName) {

    // Filter the categories to the ones we want (categoryName + subcategories)     
    const filteredCategories = getNestedCategories(categories.find(category => category.name == categoryName))

    const customerItems = {}
    for (const customer in customers) {
        const filteredItems = filteredCategories.filter(value => value.customers.includes(customers[customer].id))
        customerItems[customers[customer].name] = filteredItems.flatMap(value => value.items).flatMap(itemId => findObjectByID(items, itemId))
    }
    return customerItems
}

/**
 * Functionality:
 * 
 * This script populates lists of Customers, Categories and Items from the hardcoded json.
 * It allows for nested Categories, and there is an example.
 * 
 * You are able to fetch any root category and find all the Categories that are linked to it via Subcategories.
 * 
 * As requested, the function viewCustomerItems takes a root category name and
 * returns an array containing a list of the items under the Nested Categories
 * per Customer.
 * 
 * Here are the available root categories that can be used:
 * - Food
 *  - Poultry
 *  - Beef
 *  - Pork
 * - Kitchen
 *  - Cooking
 *  - Cleaning
 * - Garden
 *  - Cleaning
 *  - Pool
 *      - Pump
 */

populate() // Is required to generate the data
console.log(viewCustomerItems("Garden"))