import React, { useState } from 'react';
import { Plus, Minus, AlertTriangle, Package, Search, Filter, MapPin } from 'lucide-react';

const Warehouse: React.FC = () => {
  const [products, setProducts] = useState([
    { id: 'PROD-001', name: 'Platos Desechables Biodegradables', category: 'platos', stock: 150, minStock: 50, supplier: 'EcoSupply Chile', lastOrder: '2024-01-15', price: 2500, location: 'LOC-001' },
    { id: 'PROD-002', name: 'Vasos Plásticos 250ml', category: 'vasos', stock: 200, minStock: 75, supplier: 'PlastiCorp', lastOrder: '2024-01-12', price: 1800, location: 'LOC-001' },
    { id: 'PROD-003', name: 'Mascarillas N95', category: 'proteccion', stock: 15, minStock: 30, supplier: 'SafeGuard Inc.', lastOrder: '2024-01-10', price: 850, location: 'LOC-002' },
    { id: 'PROD-004', name: 'Guantes Nitrilo Azules', category: 'proteccion', stock: 500, minStock: 100, supplier: 'SafeGuard Inc.', lastOrder: '2024-01-18', price: 120, location: 'LOC-001' },
    { id: 'PROD-005', name: 'Servilletas de Papel', category: 'papel', stock: 80, minStock: 40, supplier: 'PaperTech', lastOrder: '2024-01-14', price: 950, location: 'LOC-002' },
    { id: 'PROD-006', name: 'Cubiertos Plásticos Set', category: 'cubiertos', stock: 120, minStock: 60, supplier: 'PlastiCorp', lastOrder: '2024-01-16', price: 1200, location: 'LOC-001' },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: '',
    stock: 0,
    minStock: 0,
    supplier: '',
    price: 0
  });

  const categories = [
    { id: 'all', name: 'Todas las categorías' },
    { id: 'platos', name: 'Platos' },
    { id: 'vasos', name: 'Vasos' },
    { id: 'proteccion', name: 'Protección' },
    { id: 'papel', name: 'Papel' },
    { id: 'cubiertos', name: 'Cubiertos' },
    { id: 'bolsas', name: 'Bolsas' }
  ];

  const locations = [
    { id: 'all', name: 'Todos los locales' },
    { id: 'LOC-001', name: 'Local Principal' },
    { id: 'LOC-002', name: 'Sucursal Norte' }
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || product.category === filterCategory;
    const matchesLocation = selectedLocation === 'all' || product.location === selectedLocation;
    return matchesSearch && matchesCategory && matchesLocation;
  });

  const updateStock = (productId: string, change: number) => {
    setProducts(products.map(product => 
      product.id === productId 
        ? { ...product, stock: Math.max(0, product.stock + change) }
        : product
    ));
  };

  const getStockStatus = (stock: number, minStock: number) => {
    if (stock <= minStock) return 'critical';
    if (stock <= minStock * 1.5) return 'low';
    return 'normal';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'critical': return 'bg-red-100 text-red-800';
      case 'low': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-green-100 text-green-800';
    }
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const id = `PROD-${String(products.length + 1).padStart(3, '0')}`;
    setProducts([...products, { 
      ...newProduct, 
      id,
      lastOrder: new Date().toISOString().split('T')[0]
    }]);
    setNewProduct({ name: '', category: '', stock: 0, minStock: 0, supplier: '', price: 0 });
    setShowForm(false);
  };

  const lowStockProducts = products.filter(p => getStockStatus(p.stock, p.minStock) === 'critical').length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Gestión de Bodega</h2>
          {lowStockProducts > 0 && (
            <div className="flex items-center mt-2 text-red-600">
              <AlertTriangle className="h-5 w-5 mr-2" />
              <span className="text-sm font-medium">{lowStockProducts} productos con stock crítico</span>
            </div>
          )}
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors mt-4 sm:mt-0"
        >
          <Plus className="h-5 w-5" />
          <span>Nuevo Producto</span>
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Buscar productos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex space-x-4">
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>{category.name}</option>
                ))}
              </select>
            </div>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {locations.map(location => (
                  <option key={location.id} value={location.id}>{location.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Producto</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Categoría</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Local</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Proveedor</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Último Pedido</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Precio</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProducts.map((product) => {
                const status = getStockStatus(product.stock, product.minStock);
                return (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Package className="h-5 w-5 text-gray-400 mr-3" />
                        <div>
                          <div className="text-sm font-medium text-gray-900">{product.name}</div>
                          <div className="text-sm text-gray-500">{product.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="capitalize text-sm text-gray-500">{product.category}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-500">
                        {locations.find(loc => loc.id === product.location)?.name || 'Sin asignar'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className="text-sm font-medium text-gray-900 mr-2">{product.stock}</span>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(status)}`}>
                          {status === 'critical' ? 'Crítico' : status === 'low' ? 'Bajo' : 'Normal'}
                        </span>
                      </div>
                      <div className="text-xs text-gray-400">Mín: {product.minStock}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {product.supplier}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {product.lastOrder}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      CLP ${product.price.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => updateStock(product.id, -10)}
                          className="inline-flex items-center px-2 py-1 border border-gray-300 text-xs rounded text-gray-700 bg-white hover:bg-gray-50"
                        >
                          <Minus className="h-3 w-3 mr-1" />
                          -10
                        </button>
                        <button
                          onClick={() => updateStock(product.id, 10)}
                          className="inline-flex items-center px-2 py-1 border border-gray-300 text-xs rounded text-gray-700 bg-white hover:bg-gray-50"
                        >
                          <Plus className="h-3 w-3 mr-1" />
                          +10
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* New Product Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-full max-w-md shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Registrar Nuevo Producto</h3>
              <form onSubmit={handleAddProduct} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nombre del Producto</label>
                  <input
                    type="text"
                    required
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Categoría</label>
                  <select
                    required
                    value={newProduct.category}
                    onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Seleccionar categoría</option>
                    <option value="platos">Platos</option>
                    <option value="vasos">Vasos</option>
                    <option value="proteccion">Protección</option>
                    <option value="papel">Papel</option>
                    <option value="cubiertos">Cubiertos</option>
                    <option value="bolsas">Bolsas</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Stock Inicial</label>
                    <input
                      type="number"
                      required
                      min="0"
                      value={newProduct.stock}
                      onChange={(e) => setNewProduct({...newProduct, stock: parseInt(e.target.value)})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Stock Mínimo</label>
                    <input
                      type="number"
                      required
                      min="0"
                      value={newProduct.minStock}
                      onChange={(e) => setNewProduct({...newProduct, minStock: parseInt(e.target.value)})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Proveedor</label>
                  <input
                    type="text"
                    required
                    value={newProduct.supplier}
                    onChange={(e) => setNewProduct({...newProduct, supplier: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Precio (CLP)</label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({...newProduct, price: parseInt(e.target.value)})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex space-x-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Registrar Producto
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

export default Warehouse;
