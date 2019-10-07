const db = require('./db');


let seedData = [
    {   
        time: 8,
        address: `3150 Roswell Rd NW`,
        title: `Pizza Party in Buckhead`,
        description: `I'm making some pizzas in my oven and would love to share them and enjoy some company. Topping bar will be available for dine-in or pick-up`,
        host_id: 1,
        portions: 8,
        price: 5.00,
        tags: `pizza, party, conversation`,
        picture: ``,
        dine_in: 1,
        pick_up: 1,
    },
    {
        time: 16,
        address: `1280 Habersham Rd`,
        title: `Grill Out`,
        description: `Looking for some people to eat some burgers, dogs, and have a good time on my deck. BYOB`,
        host_id: 1,
        portions: 20,
        price: 8.00,
        tags: `burgers, outside, dogs`,
        picture: ``,
        dine_in: 1,
        pick_up: 1,
    },
    {
        time: 24,
        address: `4239 Piedmont Rd`,
        title: `Pasta Pickup`,
        description: `Made too much pasta, looking to get some off my hands. Will have different sauces and stuff available`,
        host_id: 1,
        portions: 4,
        price: 3.00,
        tags: `pasta`,
        picture: ``,
        dine_in: 0,
        pick_up: 1,
    },
]

const insertEventQuery = `
INSERT INTO events 
    (time, address, title, description, host_id, portions, price, tags, dine_in, pick_up)
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
`
let date = new Date();
date.setHours(date.getHours() + 8)
seedData.forEach((arr,i)=>{
    let dbValues = [date, arr.address, arr.title, arr.description, arr.host_id, arr.portions,
         arr.price, arr.tags, arr.dine_in, arr.pick_up]
    db.query(insertEventQuery,dbValues)
})
