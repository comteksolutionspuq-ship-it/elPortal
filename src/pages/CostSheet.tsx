import React, { useState } from 'react';
import { Calculator, Download, Plus, CreditCard as Edit, Trash2, TrendingUp, TrendingDown } from 'lucide-react';

const CostSheet: React.FC = () => {
  const [costs, setCosts] = useState([
    { id: 'COST-001', category: 'Arriendo', subcategory: 'Local Principal', amount: 0, type: 'fixed', location: 'LOC-001', date: '2024-01-01', description: 'Local propio - sin arriendo' },
    { id: 'COST-002', category: 'Arriendo', subcategory: 'Sucursal Norte', amount: 650000, type: 'fixed', location: 'LOC-002', date: '2024-01-01', description: 'Arriendo mensual sucursal' },
    { id: 'COST-003', category: 'Servicios Básicos', subcategory: 'Electricidad', amount: 85000, type: 'variable', location: 'LOC-001', date: '2024-01-15', description: 'Consumo eléctrico enero' },
    { id: 'COST-004', category: 'Servicios Básicos', subcategory: 'Agua', amount: 25000, type: 'variable', location: 'LOC-001', date: '2024-01-15', description: 'Consumo agua enero' },
    { id: 'COST-005', category: 'Combustible', subcategory: 'Vehículos Reparto', amount: 120000, type: 'variable', location: 'LOC-001', date: '2024-01-20', description: 'Combustible flota enero' },
    { id: 'COST-006', category: 'Sueldos', subcategory: 'Personal Operativo', amount: 1850000, type: 'fixed', location: 'LOC-001', date: '2024-01-30', description: 'Nómina enero local principal' },
    { id: 'COST-007', category: 'Sueldos', subcategory: 'Personal Operativo', amount: 970000, type: 'fixed', location: 'LOC-002', date: '2024-01-30', description: 'Nómina enero sucursal norte' },
    { id: 'COST-008', category: 'Mantención', subcategory: 'Vehículos', amount: 45000, type: 'variable', location: 'LOC-001', date: '2024-01-18', description: 'Mantención preventiva camión' },
    { id: 'COST-009', category: 'Seguros', subcategory: 'Vehículos', amount: 35000, type: 'fixed', location: 'LOC-001', date: '2024-01-01', description: 'Seguro flota mensual' },
    { id: 'COST-010', category: 'Marketing', subcategory: 'Publicidad Digital', amount: 25000, type: 'variable', location: 'LOC-001', date: '2024-01-10', description: 'Campaña redes sociales' }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [newCost, setNewCost] = useState({
    category: '',
    subcategory: '',
    amount: 0,
    type: 'fixed',
    location: '',
    description: ''
  });

  const locations = [
    { id: 'all', name: 'Todos los locales' },
    { id: 'LOC-001', name: 'Local Principal' },
    { id: 'LOC-002', name: 'Sucursal Norte' }
  ];

  const categories = [
    'all',
    'Arriendo',
    'Servicios Básicos',
    'Combustible',
    'Sueldos',
    'Mantención',
    'Seguros',
    'Marketing',
    'Compras',
    'Otros'
  ];

  const filteredCosts = costs.filter(cost => {
    const matchesLocation = selectedLocation === 'all' || cost.location === selectedLocation;
    const matchesCategory = selectedCategory === 'all' || cost.category === selectedCategory;
    return matchesLocation && matchesCategory;
  });

  const handleAddCost = (e: React.FormEvent) => {
    e.preventDefault();
    const id = `COST-${String(costs.length + 1).padStart(3, '0')}`;
    setCosts([...costs, {
      ...newCost,
      id,
      date: new Date().toISOString().split('T')[0]
    }]);
    setNewCost({
      category: '',
      subcategory: '',
      amount: 0,
      type: 'fixed',
      location: '',
      description: ''
    });
    setShowForm(false);
  };

  const deleteCost = (id: string) => {
    setCosts(costs.filter(cost => cost.id !== id));
  };

  const totalCosts = filteredCosts.reduce((sum, cost) => sum + cost.amount, 0);
  const fixedCosts = filteredCosts.filter(cost => cost.type === 'fixed').reduce((sum, cost) => sum + cost.amount, 0);
  const variableCosts = filteredCosts.filter(cost => cost.type === 'variable').reduce((sum, cost) => sum + cost.amount, 0);

  const costsByCategory = categories.slice(1).map(category => {
    const categoryTotal = filteredCosts.filter(cost => cost.category === category).reduce((sum, cost) => sum + cost.amount, 0);
    return { category, total: categoryTotal };
  }).filter(item => item.total > 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <h2 className="text-2xl font-bold text-gray-900">Planilla de Costos</h2>
        <div className="flex space-x-3 mt-4 sm:mt-0">
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="h-5 w-5" />
            <span>Nuevo Costo</span>
          </button>
          <button className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
            <Download className="h-5 w-5" />
            <span>Exportar</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Local</label>
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {locations.map(location => (
                <option key={location.id} value={location.id}>{location.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Categoría</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'Todas las categorías' : category}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="p-2 rounded-lg bg-red-50">
              <Calculator className="h-6 w-6 text-red-600" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-500">Costos Totales</h3>
            <p className="text-2xl font-bold text-red-600 mt-1">CLP ${totalCosts.toLocaleString()}</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="p-2 rounded-lg bg-blue-50">
              <TrendingUp className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-500">Costos Fijos</h3>
            <p className="text-2xl font-bold text-blue-600 mt-1">CLP ${fixedCosts.toLocaleString()}</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="p-2 rounded-lg bg-orange-50">
              <TrendingDown className="h-6 w-6 text-orange-600" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-500">Costos Variables</h3>
            <p className="text-2xl font-bold text-orange-600 mt-1">CLP ${variableCosts.toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* Costs by Category */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Costos por Categoría</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {costsByCategory.map((item, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-2">{item.category}</h4>
              <p className="text-xl font-bold text-red-600">CLP ${item.total.toLocaleString()}</p>
              <div className="mt-2">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-red-600 h-2 rounded-full" 
                    style={{ width: `${(item.total / totalCosts) * 100}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  {((item.total / totalCosts) * 100).toFixed(1)}% del total
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Costs Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Detalle de Costos</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Categoría</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subcategoría</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Local</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Monto</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCosts.map((cost) => (
                <tr key={cost.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {cost.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {cost.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {cost.subcategory}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      cost.type === 'fixed' ? 'bg-blue-100 text-blue-800' : 'bg-orange-100 text-orange-800'
                    }`}>
                      {cost.type === 'fixed' ? 'Fijo' : 'Variable'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {locations.find(loc => loc.id === cost.location)?.name || 'Sin asignar'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-red-600">
                    CLP ${cost.amount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {cost.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => deleteCost(cost.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Cost Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-full max-w-2xl shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Agregar Nuevo Costo</h3>
              <form onSubmit={handleAddCost} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Categoría</label>
                    <select
                      required
                      value={newCost.category}
                      onChange={(e) => setNewCost({...newCost, category: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Seleccionar categoría</option>
                      {categories.slice(1).map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Subcategoría</label>
                    <input
                      type="text"
                      required
                      value={newCost.subcategory}
                      onChange={(e) => setNewCost({...newCost, subcategory: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Costo</label>
                    <select
                      value={newCost.type}
                      onChange={(e) => setNewCost({...newCost, type: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="fixed">Fijo</option>
                      <option value="variable">Variable</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Local</label>
                    <select
                      required
                      value={newCost.location}
                      onChange={(e) => setNewCost({...newCost, location: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Seleccionar local</option>
                      {locations.slice(1).map(location => (
                        <option key={location.id} value={location.id}>{location.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Monto (CLP)</label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={newCost.amount}
                    onChange={(e) => setNewCost({...newCost, amount: parseInt(e.target.value) || 0})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                  <textarea
                    required
                    value={newCost.description}
                    onChange={(e) => setNewCost({...newCost, description: e.target.value})}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="flex space-x-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Agregar Costo
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition-colors"
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CostSheet;
