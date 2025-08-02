// src/data/mockData.js
export const MOCK_ITEMS = {
  Food: [
    { id: 1, name: 'Milk', unit: 'Litre', minStock: 20, type: 'Consumable', status: 'Active', currentStock: 100 },
    { id: 6, name: 'Rice', unit: 'Kg', minStock: 50, type: 'Consumable', status: 'Active', currentStock: 200 },
    { id: 9, name: 'Cooking Oil', unit: 'Litre', minStock: 10, type: 'Consumable', status: 'Active', currentStock: 25 },  
    { id: 10, name: 'Sugar', unit: 'Kg', minStock: 15, type: 'Consumable', status: 'Active', currentStock: 30 },
    { id: 11, name: 'Tea Bags', unit: 'Box', minStock: 5, type: 'Consumable', status: 'Active', currentStock: 12 }
  ],
  Cleaning: [
    { id: 2, name: 'Toilet Paper', unit: 'Roll', minStock: 15, type: 'Consumable', status: 'Active', currentStock: 5 },
    { id: 4, name: 'All-Purpose Cleaner', unit: 'Bottle', minStock: 10, type: 'Consumable', status: 'Active', currentStock: 25 },
    { id: 7, name: 'Detergent', unit: 'Packet', minStock: 8, type: 'Consumable', status: 'Active', currentStock: 15 },
    { id: 12, name: 'Floor Cleaner', unit: 'Bottle', minStock: 6, type: 'Consumable', status: 'Active', currentStock: 18 },
    { id: 13, name: 'Glass Cleaner', unit: 'Bottle', minStock: 4, type: 'Consumable', status: 'Active', currentStock: 8 }
  ],
  Linen: [
    { id: 3, name: 'Bath Towels', unit: 'Piece', minStock: 30, type: 'Non-Consumable', status: 'Active', currentStock: 45 },
    { id: 5, name: 'Bed Sheets', unit: 'Set', minStock: 20, type: 'Non-Consumable', status: 'Active', currentStock: 8 },
    { id: 8, name: 'Pillow Cases', unit: 'Piece', minStock: 25, type: 'Non-Consumable', status: 'Active', currentStock: 40 },
    { id: 14, name: 'Blankets', unit: 'Piece', minStock: 15, type: 'Non-Consumable', status: 'Active', currentStock: 22 }
  ],
  Maintenance: [
    { id: 15, name: 'Light Bulbs', unit: 'Piece', minStock: 20, type: 'Consumable', status: 'Active', currentStock: 35 },
    { id: 16, name: 'Batteries', unit: 'Pack', minStock: 10, type: 'Consumable', status: 'Active', currentStock: 15 }
  ],
  Amenities: [
    { id: 17, name: 'Shampoo', unit: 'Bottle', minStock: 12, type: 'Consumable', status: 'Active', currentStock: 20 },
    { id: 18, name: 'Soap', unit: 'Bar', minStock: 25, type: 'Consumable', status: 'Active', currentStock: 45 }
  ]
};

export const MOCK_STOCK_ENTRIES = [
  { id: 1, date: '2025-08-02', item: 'Milk', category: 'Food', qty: 50, unit: 'Litre', unitPrice: 60, totalValue: 3000, batchId: 'BATCH-240802001', expiry: '2025-08-05', supplier: 'ABC Dairy', status: 'Active' },
  { id: 2, date: '2025-08-02', item: 'Toilet Paper', category: 'Cleaning', qty: 100, unit: 'Roll', unitPrice: 25, totalValue: 2500, batchId: 'BATCH-240802002', expiry: '', supplier: 'XYZ Supplies', status: 'Active' },
  { id: 3, date: '2025-08-01', item: 'Bath Towels', category: 'Linen', qty: 20, unit: 'Piece', unitPrice: 350, totalValue: 7000, batchId: 'BATCH-240801003', expiry: '', supplier: 'Linen Co.', status: 'Active' },
  { id: 4, date: '2025-08-01', item: 'Rice', category: 'Food', qty: 100, unit: 'Kg', unitPrice: 80, totalValue: 8000, batchId: 'BATCH-240801004', expiry: '2025-12-01', supplier: 'Rice Mills', status: 'Active' },
  { id: 5, date: '2025-07-31', item: 'Detergent', category: 'Cleaning', qty: 25, unit: 'Packet', unitPrice: 120, totalValue: 3000, batchId: 'BATCH-240731005', expiry: '', supplier: 'Cleaning Co.', status: 'Active' }
];

export const CATEGORIES = ['Food', 'Cleaning', 'Linen', 'Maintenance', 'Amenities'];
export const UNITS = ['Piece', 'Kg', 'Litre', 'Bottle', 'Pack', 'Box', 'Roll', 'Set', 'Meter', 'Gram'];