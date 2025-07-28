import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
//import inventoryService from '../../services/inventoryService';
import Table from '../components/common/Table';

export default function Inventory() {
  const [items, setItems] = useState([]);
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
 //   inventoryService.getAll().then(setItems);
  }, []);

  const onAdd = async (data) => {
    await inventoryService.addItem(data);
    const updated = await inventoryService.getAll();
    setItems(updated);
    reset();
  };

  const columns = [
    { key: 'name', header: 'Item Name' },
    { key: 'category', header: 'Category' },
    { key: 'quantity', header: 'Quantity' },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Inventory Management</h1>

      {/* Add New Item */}
      <form
        onSubmit={handleSubmit(onAdd)}
        className="bg-white p-4 rounded shadow mb-6 grid grid-cols-1 md:grid-cols-4 gap-4"
      >
        <input
          {...register('name', { required: true })}
          placeholder="Item Name"
          className="border px-3 py-2 rounded"
        />
        <input
          {...register('category', { required: true })}
          placeholder="Category"
          className="border px-3 py-2 rounded"
        />
        <input
          type="number"
          {...register('quantity', { required: true, min: 1 })}
          placeholder="Quantity"
          className="border px-3 py-2 rounded"
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Add Item
        </button>
      </form>

      {/* Items Table */}
      <div className="bg-white p-4 rounded shadow">
        <Table columns={columns} data={items} />
      </div>
    </div>
  );
}
