import React, { useState } from 'react';
import { UserCheck, Plus, CreditCard as Edit, Trash2, Phone, Mail, MapPin, Calendar, DollarSign, Package } from 'lucide-react';

const SupplierManagement: React.FC = () => {
  const [suppliers, setSuppliers] = useState([
    {
      id: 'SUPP-001',
      name: 'EcoSupply Chile',
      category: 'Productos Biodegradables',
      contact: 'Patricia Morales',
      email: 'ventas@ecosupply.cl',
      phone: '+56 2 2345 6789',
      address: 'Av. Providencia 1234, Santiago',
      registrationDate: '2022-05-15',
      lastOrder: '2024-01-15',
      totalOrders: 28,
      totalPurchased: 3850000,
      status: 'active',
      paymentTerms: '30 días',
      rating: 4.8,
      products: ['Platos Biodegradables', 'Vasos Compostables', 'Cubiertos Ecológicos']
    },
    {
      id: 'SUPP-002',
      name: 'PlastiCorp',
      category: 'Productos Plásticos',
      contact: 'Miguel Rodríguez',
      email: 'comercial@plasticorp.cl',
      phone: '+56 2 3456 7890',
      address: 'Parque Industrial Los Andes, Melipilla',
      registrationDate: '2021-08-20',
      lastOrder: '2024-01-12',
      totalOrders: 45,
      totalPurchased: 5200000,
      status: 'active',
      paymentTerms: '45 días',
      rating: 4.5,
      products: ['Vasos Plásticos', 'Cubiertos Plásticos', 'Contenedores']
    },
    {
      id: 'SUPP-003',
      name: 'SafeGuard Inc.',
      category: 'Equipos de Protección',
      contact: 'Andrea Silva',
      email: 'info@safeguard.cl',
      phone: '+56 2 4567 8901',
      address: 'Las Condes 5678, Santiago',
      registrationDate: '2020-11-10',
      lastOrder: '2024-01-10',
      totalOrders: 67,
      totalPurchased: 8900000,
      status: 'active',
      paymentTerms: '30 días',
      rating: 4.9,
      products: ['Mascarillas N95', 'Guantes Nitrilo', 'Protectores Faciales']
    },
    {
      id: 'SUPP-004',
      name: 'PaperTech',
      category: 'Productos de Papel',
      contact: 'Roberto Fernández',
      email: 'ventas@papertech.cl',
      phone: '+56 2 5678 9012',
      address: 'Zona Industrial Quilicura, Santiago',
      registrationDate: '2023-02-28',
      lastOrder: '2024-01-14',
      totalOrders: 22,
      totalPurchased: 2100000,
      status: 'active',
      paymentTerms: '15 días',
      rating: 4.3,
      products: ['Servilletas', 'Papel Higiénico', 'Toallas de Papel']
    }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [newSupplier, setNewSupplier] = useState({
    name: '',
    category: '',
    contact: '',
    email: '',
    phone: '',
    address: '',
    paymentTerms: '30 días',
    products: ''
  });

  const categories = [
    'all',
    'Productos Biodegradables',
    'Productos Plásticos',
    'Equipos de Protección',
    'Productos de Papel',
    'Otros'
  ];

  const filteredSuppliers = suppliers.filter(supplier => {
    return selectedCategory === 'all' || supplier.category === selectedCategory;
  });

  const handleAddSupplier = (e: React.FormEvent) => {
    e.preventDefault();
    const id = `SUPP-${String(suppliers.length + 1).padStart(3, '0')}`;
    setSuppliers([...suppliers, {
      ...newSupplier,
      id,
      registrationDate: new Date().toISOString().split('T')[0],
      lastOrder: '',
      totalOrders: 0,
      totalPurchased: 0,
      status: 'active',
      rating: 0,
      products: newSupplier.products.split(',').map(p => p.trim())
    }]);
    setNewSupplier({
      name: '',
      category: '',
      contact: '',
      email: '',
      phone: '',
      address: '',
      paymentTerms: '30 días',
      products: ''
    });
    setShowForm(false);
  };

  const deleteSupplier = (id: string) => {
    setSuppliers(suppliers.filter(supplier => supplier.id !== id));
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 4.5) return 'text-green-600';
    if (rating >= 4.0) return 'text-yellow-600';
    if (rating >= 3.0) return 'text-orange-600';
    return 'text-red-600';
  };

  const totalSuppliers = filteredSuppliers.length;
  const totalPurchased = filteredSuppliers.reduce((sum, supplier) => sum + supplier.totalPurchased, 0);
  const averageRating = filteredSuppliers.reduce((sum, supplier) => sum + supplier.rating, 0) / filteredSuppliers.length || 0;
  const activeSuppliers = filteredSuppliers.filter(supplier => supplier.status === 'active').length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <h2 className="text-2xl font-bold text-gray-900">Gestión de Proveedores</h2>
        <div className="flex space-x-3 mt-4 sm:mt-0">
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="h-5 w-5" />
            <span>Nuevo Proveedor</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <div className="flex items-center space-x-4">
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
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="p-2 rounded-lg bg-blue-50">
              <UserCheck className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-500">Total Proveedores</h3>
            <p className="text-2xl font-bold text-gray-900 mt-1">{totalSuppliers}</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="p-2 rounded-lg bg-green-50">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-500">Total Comprado</h3>
            <p className="text-2xl font-bold text-green-600 mt-1">CLP ${totalPurchased.toLocaleString()}</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="p-2 rounded-lg bg-yellow-50">
              <Package className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-500">Calificación Promedio</h3>
            <p className={`text-2xl font-bold mt-1 ${getRatingColor(averageRating)}`}>
              {averageRating.toFixed(1)}/5.0
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="p-2 rounded-lg bg-purple-50">
              <UserCheck className="h-6 w-6 text-purple-600" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-500">Proveedores Activos</h3>
            <p className="text-2xl font-bold text-purple-600 mt-1">{activeSuppliers}</p>
          </div>
        </div>
      </div>

      {/* Suppliers Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Lista de Proveedores</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Proveedor</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Categoría</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contacto</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Órdenes</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Comprado</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Calificación</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Última Orden</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredSuppliers.map((supplier) => (
                <tr key={supplier.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <UserCheck className="h-5 w-5 text-gray-400 mr-3" />
                      <div>
                        <div className="text-sm font-medium text-gray-900">{supplier.name}</div>
                        <div className="text-sm text-gray-500">{supplier.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {supplier.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{supplier.contact}</div>
                    <div className="text-sm text-gray-500 flex items-center">
                      <Mail className="h-3 w-3 mr-1" />
                      {supplier.email}
                    </div>
                    <div className="text-sm text-gray-500 flex items-center">
                      <Phone className="h-3 w-3 mr-1" />
                      {supplier.phone}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {supplier.totalOrders}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                    CLP ${supplier.totalPurchased.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className={`text-sm font-medium ${getRatingColor(supplier.rating)}`}>
                        {supplier.rating.toFixed(1)}
                      </span>
                      <span className="text-sm text-gray-500 ml-1">/5.0</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {supplier.lastOrder || 'Sin órdenes'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => deleteSupplier(supplier.id)}
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

      {/* Supplier Details Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSuppliers.map((supplier) => (
          <div key={supplier.id} className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <div className="flex justify-between items-start mb-4">
              <h4 className="font-semibold text-gray-900">{supplier.name}</h4>
              <span className={`text-sm font-medium ${getRatingColor(supplier.rating)}`}>
                ★ {supplier.rating.toFixed(1)}
              </span>
            </div>
            
            <div className="space-y-2 mb-4">
              <div className="text-sm">
                <span className="text-gray-500">Categoría:</span>
                <span className="font-medium ml-2">{supplier.category}</span>
              </div>
              <div className="text-sm">
                <span className="text-gray-500">Contacto:</span>
                <span className="font-medium ml-2">{supplier.contact}</span>
              </div>
              <div className="text-sm">
                <span className="text-gray-500">Términos de pago:</span>
                <span className="font-medium ml-2">{supplier.paymentTerms}</span>
              </div>
              <div className="text-sm">
                <span className="text-gray-500">Total comprado:</span>
                <span className="font-medium ml-2 text-green-600">CLP ${supplier.totalPurchased.toLocaleString()}</span>
              </div>
            </div>

            <div className="mb-4">
              <h5 className="text-sm font-medium text-gray-700 mb-2">Productos:</h5>
              <div className="flex flex-wrap gap-1">
                {supplier.products.map((product, index) => (
                  <span key={index} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    {product}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex justify-between items-center text-sm text-gray-500">
              <span>Registro: {supplier.registrationDate}</span>
              <span>{supplier.totalOrders} órdenes</span>
            </div>
          </div>
        ))}
      </div>

      {/* Add Supplier Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-full max-w-2xl shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Agregar Nuevo Proveedor</h3>
              <form onSubmit={handleAddSupplier} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nombre/Razón Social</label>
                    <input
                      type="text"
                      required
                      value={newSupplier.name}
                      onChange={(e) => setNewSupplier({...newSupplier, name: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Categoría</label>
                    <select
                      required
                      value={newSupplier.category}
                      onChange={(e) => setNewSupplier({...newSupplier, category: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Seleccionar categoría</option>
                      {categories.slice(1).map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Persona de Contacto</label>
                    <input
                      type="text"
                      required
                      value={newSupplier.contact}
                      onChange={(e) => setNewSupplier({...newSupplier, contact: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      required
                      value={newSupplier.email}
                      onChange={(e) => setNewSupplier({...newSupplier, email: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
                    <input
                      type="tel"
                      required
                      value={newSupplier.phone}
                      onChange={(e) => setNewSupplier({...newSupplier, phone: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Términos de Pago</label>
                    <select
                      value={newSupplier.paymentTerms}
                      onChange={(e) => setNewSupplier({...newSupplier, paymentTerms: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Contado">Contado</option>
                      <option value="15 días">15 días</option>
                      <option value="30 días">30 días</option>
                      <option value="45 días">45 días</option>
                      <option value="60 días">60 días</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Dirección</label>
                  <input
                    type="text"
                    required
                    value={newSupplier.address}
                    onChange={(e) => setNewSupplier({...newSupplier, address: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Productos (separados por comas)</label>
                  <textarea
                    required
                    value={newSupplier.products}
                    onChange={(e) => setNewSupplier({...newSupplier, products: e.target.value})}
                    rows={3}
                    placeholder="Ej: Platos biodegradables, Vasos compostables, Cubiertos ecológicos"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="flex space-x-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Agregar Proveedor
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

export default SupplierManagement;