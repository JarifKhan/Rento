'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';

export default function AdminPropertiesPage() {
  const [form, setForm] = useState({
    title: '',
    location: '',
    price: '',
    type: 'apartment',
    bedrooms: 1,
    bathrooms: 1,
    area: 500,
    features: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: name === 'bedrooms' || name === 'bathrooms' || name === 'area' ? Number(value) : value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage(null);
    try {
      const res = await fetch('/api/admin/properties', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          features: form.features.split(',').map(f => f.trim()).filter(Boolean),
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to add property');
      setMessage('Property added successfully');
      setForm({ title: '', location: '', price: '', type: 'apartment', bedrooms: 1, bathrooms: 1, area: 500, features: '' });
    } catch (err: any) {
      setMessage(err.message || 'Something went wrong');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Add Property</h1>
      {message && (
        <div className="mb-4 text-sm p-2 rounded bg-slate-100 text-slate-700">{message}</div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="title" value={form.title} onChange={handleChange} placeholder="Title" className="w-full border p-2 rounded" required />
        <input name="location" value={form.location} onChange={handleChange} placeholder="Location" className="w-full border p-2 rounded" required />
        <input name="price" value={form.price} onChange={handleChange} placeholder="Price (e.g. 25,000)" className="w-full border p-2 rounded" required />
        <select name="type" value={form.type} onChange={handleChange} className="w-full border p-2 rounded">
          <option value="apartment">Apartment</option>
          <option value="house">House</option>
          <option value="studio">Studio</option>
          <option value="penthouse">Penthouse</option>
        </select>
        <div className="grid grid-cols-3 gap-3">
          <input name="bedrooms" type="number" min={0} value={form.bedrooms} onChange={handleChange} placeholder="Bedrooms" className="w-full border p-2 rounded" />
          <input name="bathrooms" type="number" min={0} value={form.bathrooms} onChange={handleChange} placeholder="Bathrooms" className="w-full border p-2 rounded" />
          <input name="area" type="number" min={0} value={form.area} onChange={handleChange} placeholder="Area (sqft)" className="w-full border p-2 rounded" />
        </div>
        <input name="features" value={form.features} onChange={handleChange} placeholder="Features (comma-separated)" className="w-full border p-2 rounded" />
        <button disabled={submitting} className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50">
          <Plus className="h-4 w-4" />
          {submitting ? 'Adding...' : 'Add Property'}
        </button>
      </form>
    </div>
  );
}
