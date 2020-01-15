const { ServiceBroker } = require("moleculer");
const HTTPServer = require("moleculer-web");

// create the broker for node-1
// Define Node-ID and set the transponder
//

const brokerNode1 = new ServiceBroker({
  nodeID: "node-1",
  transporter: "NATS"
});

brokerNode1.createService({
  name: "gateway",

  mixins: [HTTPServer],

  settings: {
    routes: [
      {
        aliases: {
          "GET /products": "products.listProducts"
        }
      }
    ]
  }
});

const brokerNode2 = new ServiceBroker({
  nodeID: "node-2",
  transporter:"NATS"
});


brokerNode2.createService({
  name: "products",

  actions: {


    listProducts(ctx){
      return [
        {name: "Kopi Janji Jiwa", price: 18000},
        {name: "Kopi Kenangan", price: 20000}
      ]
    }
  }
})


Promise.all([brokerNode1.start(), brokerNode2.start()])
