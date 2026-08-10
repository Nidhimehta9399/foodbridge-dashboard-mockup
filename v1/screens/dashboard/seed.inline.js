/* ============================================================
   seed.inline.js — verbatim mirror of ../../seed-data/seed.json
   ------------------------------------------------------------
   The prototype is opened straight from disk (file://), where
   fetch() of a local JSON file is blocked by CORS. So the seed is
   also shipped as a script that assigns window.SEED.
   ⚠ seed-data/seed.json stays canonical — edit both together.
   ============================================================ */
window.SEED = {
  tenant: { name: "Murli", user: { name: "Mahesh", role: "Admin" }, currency: "INR", roundOffEnabled: true, asOf: "2026-08-10T12:00:00+05:30" },

  kpis: [
    { id: "todayOrders",     label: "Today Orders",     value: 384.63,    icon: "▤",  tone: "today" },
    { id: "yesterdayOrders", label: "Yesterday Orders", value: 3000.00,   icon: "▤",  tone: "yesterday" },
    { id: "thisMonth",       label: "This Month",       value: 5085.09,   icon: "🛒", tone: "month" },
    { id: "lastMonth",       label: "Last Month",       value: 5573.91,   icon: "▭",  tone: "lastmonth" },
    { id: "allTimeSales",    label: "All-Time Sales",   value: 187070.70, icon: "▭",  tone: "alltime" }
  ],

  productSales: [
    { id: "p-250ml-pet", name: "250ML PET", code: "34567", unit: "Bottle",
      periods: { today: { qty: 18, sales: 244.53 }, yesterday: null, thisMonth: { qty: 60, sales: 812.34 }, lastMonth: { qty: 210, sales: 2843.19 }, allTime: { qty: 2193, sales: 109986.39 } } },
    { id: "p-natural-water", name: "NATURAL WATER", code: "4534", unit: "Bottle",
      periods: { today: null, yesterday: null, thisMonth: null, lastMonth: { qty: 3, sales: 2384.34 }, allTime: { qty: 35, sales: 27817.26 } } },
    { id: "p-500ml-pet", name: "500ML PET", code: "89744", unit: "Bottle",
      periods: { today: { qty: 7, sales: 96.60 }, yesterday: null, thisMonth: { qty: 14, sales: 193.20 }, lastMonth: { qty: 1, sales: 14.40 }, allTime: { qty: 207, sales: 19533.22 } } },
    { id: "p-soda-650", name: "SODA 650ML", code: "435345", unit: "Bottle",
      periods: { today: null, yesterday: null, thisMonth: { qty: 8, sales: 942.05 }, lastMonth: null, allTime: { qty: 88, sales: 10364.95 } } },
    { id: "p-apple", name: "Apple", code: "33888s", unit: "Bottle",
      periods: { today: null, yesterday: null, thisMonth: null, lastMonth: null, allTime: { qty: 12, sales: 6300.00 } } },
    { id: "p-1ltr", name: "1LTR BOTTLE", code: "42534", unit: "Bottle",
      periods: { today: null, yesterday: null, thisMonth: null, lastMonth: { qty: 4, sales: 331.98 }, allTime: { qty: 71, sales: 5890.24 } } },
    { id: "p-cookies-250", name: "250gm Box Cookies", code: "a125", unit: "Packet",
      periods: { today: null, yesterday: { qty: 50, sales: 3000.00 }, thisMonth: { qty: 50, sales: 3000.00 }, lastMonth: null, allTime: { qty: 50, sales: 3000.00 } } },
    { id: "p-rusk-200", name: "Rusk Toast 200gm", code: "rt200", unit: "Packet",
      periods: { today: null, yesterday: null, thisMonth: null, lastMonth: null, allTime: { qty: 89, sales: 2718.64 } } },
    { id: "p-bread-100", name: "Mini Bread 100gm", code: "mb100", unit: "Packet",
      periods: { today: { qty: 4, sales: 43.50 }, yesterday: null, thisMonth: { qty: 12, sales: 137.50 }, lastMonth: null, allTime: { qty: 146, sales: 1460.00 } } }
  ],

  orders: [
    { id: "20268106252263", date: "2026-08-10", time: "11:55 am", customer: { name: "Raj Traders", phone: "53197286440" , email: null }, amount: 141.60, paymentStatus: "Payment Pending", status: "Inprogress", fulfilment: [],
      items: [ { name: "250ML PET", qty: 8, unit: "Bottle", rate: 13.58, amount: 108.64 }, { name: "Mini Bread 100gm", qty: 3, unit: "Packet", rate: 10.99, amount: 32.96 } ] },
    { id: "20268106224169", date: "2026-08-10", time: "11:52 am", customer: { name: "Raman", phone: "985673456" , email: "raman@gmail.com" }, amount: 31.50, paymentStatus: "Payment Pending", status: "Inprogress", fulfilment: [],
      items: [ { name: "500ML PET", qty: 2, unit: "Bottle", rate: 15.75, amount: 31.50 } ] },
    { id: "20268105593268", date: "2026-08-10", time: "11:29 am", customer: { name: "A New Customer", phone: "9384594893" , email: null }, amount: 114.50, paymentStatus: "Payment Pending", status: "Inprogress", fulfilment: [],
      items: [ { name: "250ML PET", qty: 6, unit: "Bottle", rate: 13.58, amount: 81.48 }, { name: "500ML PET", qty: 2, unit: "Bottle", rate: 16.51, amount: 33.02 } ] },
    { id: "20268104464628", date: "2026-08-10", time: "10:16 am", customer: { name: "A New Customer", phone: "9384594893" , email: null }, amount: 97.02, paymentStatus: "Payment Pending", status: "Inprogress", fulfilment: [],
      items: [ { name: "250ML PET", qty: 4, unit: "Bottle", rate: 13.58, amount: 54.32 }, { name: "500ML PET", qty: 3, unit: "Bottle", rate: 14.23, amount: 42.70 } ] },
    { id: "2026891504367", date: "2026-08-09", time: "08:30 pm", customer: { name: null, phone: "5343433353" , email: null }, amount: 3000.00, paymentStatus: "Payment Pending", status: "Inprogress", fulfilment: [],
      items: [ { name: "250gm Box Cookies", qty: 50, unit: "Packet", rate: 60.00, amount: 3000.00 } ] },
    { id: "20268815255429", date: "2026-08-08", time: "08:55 pm", customer: { name: null, phone: "2333633534" , email: null }, amount: 262.50, paymentStatus: "Payment Pending", status: "Inprogress", fulfilment: [],
      items: [ { name: "SODA 650ML", qty: 2, unit: "Bottle", rate: 131.25, amount: 262.50 } ] },
    { id: "20268813551797", date: "2026-08-08", time: "07:25 pm", customer: { name: "Mahesh Kumar", phone: "744444444" , email: "mahesh.kumar@example.com" }, amount: 15.75, paymentStatus: "Payment Pending", status: "Delivered", fulfilment: [ { kind: "dispatch", count: 1 }, { kind: "delivery", count: 1 } ],
      items: [ { name: "500ML PET", qty: 1, unit: "Bottle", rate: 15.75, amount: 15.75 } ] },
    { id: "20268812521720", date: "2026-08-08", time: "06:12 pm", customer: { name: "Aai Mata General Store", phone: "82736450195" , email: null }, amount: 171.51, paymentStatus: "Payment Pending", status: "Dispatched", fulfilment: [ { kind: "dispatch", count: 1 } ],
      items: [ { name: "250ML PET", qty: 9, unit: "Bottle", rate: 13.58, amount: 122.22 }, { name: "Mini Bread 100gm", qty: 5, unit: "Packet", rate: 9.86, amount: 49.29 } ] },
    { id: "20268811484102", date: "2026-08-08", time: "01:39 pm", customer: { name: "Ganraj Kirana Mart", phone: "41589627074" , email: null }, amount: 54.00, paymentStatus: "Payment Pending", status: "Cancelled", fulfilment: [],
      items: [ { name: "Rusk Toast 200gm", qty: 2, unit: "Packet", rate: 27.00, amount: 54.00 } ] }
  ],
  orderStatuses: [ "Inprogress", "Dispatched", "Delivered", "Cancelled" ],
  followUpReminders: 12,

  followUpCustomers: [
    { id: "fc-1", name: "Aai Mata General Store", phone: "82736450195", catalogue: "Default", daysSinceOrder: 3, email: null, address: "Hadapsar, Pune" },
    { id: "fc-2", name: "Ganraj Kirana Mart", phone: "41589627074", catalogue: "Catalogue 2", daysSinceOrder: 3, email: "ganraj.mart@example.com", address: "Sangola Rd, Pune" },
    { id: "fc-3", name: "Shree Ram Super Market", phone: "56820973184", catalogue: "Catalogue 2", daysSinceOrder: 9, email: null, address: "Kondhwa, Pune" },
    { id: "fc-4", name: "New Bharat General Store", phone: "64082719536", catalogue: "Catalogue 2", daysSinceOrder: 6, email: "bharat.store@example.com", address: "Hadapsar, Pune" },
    { id: "fc-5", name: "Laxmi Provision Store", phone: "97315042861", catalogue: "Default", daysSinceOrder: 2, email: null, address: "Sangola Rd, Pune" },
    { id: "fc-6", name: "Shivam Grocery Store", phone: "28946175318", catalogue: "Default", daysSinceOrder: 14, email: null, address: null },
    { id: "fc-7", name: "Shree Datta Super Store", phone: "70631984512", catalogue: "Default", daysSinceOrder: 4, email: null, address: null },
    { id: "fc-8", name: "Balaji General Store", phone: "85273140697", catalogue: "Default", daysSinceOrder: 1, email: null, address: null },
    { id: "fc-9", name: "Krishna Kirana & General Store", phone: "19468572033", catalogue: "Default", daysSinceOrder: 21, email: "krishna.kirana@example.com", address: null },
    { id: "fc-10", name: "Vaibhav kirana Store", phone: "31857042968", catalogue: "Catalogue 2", daysSinceOrder: 8, email: null, address: null },
    { id: "fc-11", name: "Agrawal Sweets", phone: "60471382950", catalogue: "Default", daysSinceOrder: 4, email: null, address: null },
    { id: "fc-12", name: "Kunal Sweet Shop", phone: "52938176045", catalogue: "Default", daysSinceOrder: 10, email: null, address: null }
  ],

  discountByCustomer: [
    { date: "2026-08-10", time: "02:37 pm", customer: { name: "3322256544", phone: "3322256544" }, orderValue: 88.00, discount: 0.00, discountPct: 0, netValue: 88.00 , orders: [
        { id: "2026081009074934", date: "2026-08-10", products: [
            { name: "Sweet Bun 02 Pcs", code: "a113", qty: 1, unit: "Box", orderValue: 80.00, discount: 0.00, netValue: 80.00 },
            { name: "Cream Donut 60gm", code: "a116", qty: 1, unit: "Pc", orderValue: 8.00, discount: 0.00, netValue: 8.00 }
        ] }
      ] },
    { date: "2026-08-08", time: "01:15 pm", customer: { name: "Kunal Sweet Shop", phone: "3426645432" }, orderValue: 1776.15, discount: 32.95, discountPct: 1.9, netValue: 1743.20 , orders: [
        { id: "20268811155320", date: "2026-08-08", products: [
            { name: "250gm Box Cookies", code: "a125", qty: 24, unit: "Packet", orderValue: 1440.00, discount: 28.80, netValue: 1411.20 },
            { name: "Sweet Bun 02 Pcs", code: "a113", qty: 4, unit: "Box", orderValue: 336.15, discount: 4.15, netValue: 332.00 }
        ] }
      ] },
    { date: "2026-08-08", time: "07:25 pm", customer: { name: "Mahesh Kumar", phone: "744444444" }, orderValue: 20830.50, discount: 0.00, discountPct: 0, netValue: 20830.50 , orders: [
        { id: "20268813551797", date: "2026-08-08", products: [
            { name: "250ML PET", code: "34567", qty: 1200, unit: "Bottle", orderValue: 16296.00, discount: 0.00, netValue: 16296.00 },
            { name: "500ML PET", code: "89744", qty: 290, unit: "Bottle", orderValue: 4534.50, discount: 0.00, netValue: 4534.50 }
        ] }
      ] },
    { date: "2026-08-08", time: "03:07 pm", customer: { name: "Raman", phone: "985673456" }, orderValue: 725.80, discount: 7.84, discountPct: 1.1, netValue: 717.96 , orders: [
        { id: "20268106224169", date: "2026-08-08", products: [
            { name: "500ML PET", code: "89744", qty: 40, unit: "Bottle", orderValue: 630.00, discount: 6.30, netValue: 623.70 },
            { name: "Mini Bread 100gm", code: "mb100", qty: 10, unit: "Packet", orderValue: 95.80, discount: 1.54, netValue: 94.26 }
        ] }
      ] },
    { date: "2026-08-08", time: "01:51 pm", customer: { name: "New Bharat General Store", phone: "64082719536" }, orderValue: 89.25, discount: 0.00, discountPct: 0, netValue: 89.25 , orders: [
        { id: "20268811371245", date: "2026-08-08", products: [
            { name: "250ML PET", code: "34567", qty: 5, unit: "Bottle", orderValue: 67.90, discount: 0.00, netValue: 67.90 },
            { name: "Rusk Toast 200gm", code: "rt200", qty: 1, unit: "Packet", orderValue: 21.35, discount: 0.00, netValue: 21.35 }
        ] }
      ] },
    { date: "2026-08-08", time: "01:48 pm", customer: { name: "a new customer", phone: "9384594893" }, orderValue: 78.75, discount: 4.61, discountPct: 5.9, netValue: 74.14 , orders: [
        { id: "20268811348907", date: "2026-08-08", products: [
            { name: "SODA 650ML", code: "435345", qty: 1, unit: "Bottle", orderValue: 78.75, discount: 4.61, netValue: 74.14 }
        ] }
      ] },
    { date: "2026-08-08", time: "01:40 pm", customer: { name: "Aai Mata General Store", phone: "82736450195" }, orderValue: 171.51, discount: 0.00, discountPct: 0, netValue: 171.51 , orders: [
        { id: "20268812521720", date: "2026-08-08", products: [
            { name: "250ML PET", code: "34567", qty: 9, unit: "Bottle", orderValue: 122.22, discount: 0.00, netValue: 122.22 },
            { name: "Mini Bread 100gm", code: "mb100", qty: 5, unit: "Packet", orderValue: 49.29, discount: 0.00, netValue: 49.29 }
        ] }
      ] },
    { date: "2026-08-08", time: "01:39 pm", customer: { name: "Ganraj Kirana Mart", phone: "41589627074" }, orderValue: 54.00, discount: 0.00, discountPct: 0, netValue: 54.00 , orders: [
        { id: "20268811484102", date: "2026-08-08", products: [
            { name: "Rusk Toast 200gm", code: "rt200", qty: 2, unit: "Packet", orderValue: 54.00, discount: 0.00, netValue: 54.00 }
        ] }
      ] }
  ],
  discountByRoute: [
    { date: "2026-08-08", time: "08:10 pm", route: "Hadapsar Route", orders: 14, orderValue: 21625.06, discount: 12.45, discountPct: 0.1, netValue: 21612.61 },
    { date: "2026-08-07", time: "07:40 pm", route: "Sangola Route", orders: 6, orderValue: 1284.30, discount: 48.20, discountPct: 3.8, netValue: 1236.10 },
    { date: "2026-07-28", time: "11:49 pm", route: "Kondhwa Route", orders: 3, orderValue: 412.75, discount: 0.00, discountPct: 0, netValue: 412.75 }
  ],
  discountFilters: [ "All", "Discounted only", "No discount" ],

  orderCycle: [
    { customer: "Shubham Kashid", ordersTotal: 12, lastOrdered: "2026-06-02", lastOrderedAgo: "2 months ago", cadenceLabel: "Every 5.5d", cadenceDays: 5.5, daysSince: 69, status: "not_ordering" },
    { customer: "Raghav patil", ordersTotal: 5, lastOrdered: "2026-07-03", lastOrderedAgo: "1 month ago", cadenceLabel: "Every 2 weeks", cadenceDays: 14, daysSince: 37, status: "overdue" },
    { customer: "Dixit Store", ordersTotal: 5, lastOrdered: "2026-07-11", lastOrderedAgo: "1 month ago", cadenceLabel: "Every 2d", cadenceDays: 2, daysSince: 30, status: "overdue" },
    { customer: "Vaibhav kirana Store", ordersTotal: 3, lastOrdered: "2026-07-28", lastOrderedAgo: "1 week ago", cadenceLabel: "Every week", cadenceDays: 7, daysSince: 8, status: "overdue" },
    { customer: "Agrawal Sweets", ordersTotal: 8, lastOrdered: "2026-07-28", lastOrderedAgo: "1 week ago", cadenceLabel: "Every week", cadenceDays: 7, daysSince: 11, status: "overdue" },
    { customer: "Kunal Sweet Shop", ordersTotal: 13, lastOrdered: "2026-07-28", lastOrderedAgo: "1 week ago", cadenceLabel: "Every 3d", cadenceDays: 3, daysSince: 13, status: "overdue" },
    { customer: "New Bharat General Store", ordersTotal: 21, lastOrdered: "2026-08-04", lastOrderedAgo: "6 days ago", cadenceLabel: "Every week", cadenceDays: 7, daysSince: 6, status: "due_soon" },
    { customer: "Aai Mata General Store", ordersTotal: 17, lastOrdered: "2026-08-08", lastOrderedAgo: "2 days ago", cadenceLabel: "Every 5d", cadenceDays: 5, daysSince: 2, status: "on_track" },
    { customer: "Raj Traders", ordersTotal: 34, lastOrdered: "2026-08-10", lastOrderedAgo: "today", cadenceLabel: "Every 3d", cadenceDays: 3, daysSince: 0, status: "on_track" },
    { customer: "Nishant", ordersTotal: 12, lastOrdered: "2026-08-08", lastOrderedAgo: "3 days ago", cadenceLabel: "Every 2d", cadenceDays: 2, daysSince: 3, status: "overdue" }
  ],
  orderCycleWindows: [ "Any time", "Over 7 days ago", "Over 14 days ago", "Over 30 days ago", "Over 60 days ago" ],

  salesmanRouteReport: [
    { route: "Hadapsar Route 07/08/2026 01:01", date: "2026-08-07", salesman: "Mahesh", cash: 71, upi: 0, totalCollected: 71, openingCash: 500, expense: 300, handedOver: 270, difference: -1 },
    { route: "Sangola Route - 23 Jun 2026 11:51 Tue 28 Jul 23:49", date: "2026-07-28", salesman: "Mahesh", cash: 160, upi: 0, totalCollected: 160, openingCash: 200, expense: 0, handedOver: 360, difference: 0 }
  ],
  routeTemplates: [ "Pune Route", "Hadapsar Route", "Sangola Route", "Kondhwa Route" ],
  routes: [ "Hadapsar Route", "Sangola Route", "Kondhwa Route" ],
  staff: [ "Mahesh", "Sunil", "Pravin" ]
};
