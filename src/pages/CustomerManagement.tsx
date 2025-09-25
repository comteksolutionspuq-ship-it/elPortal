import React, { useState } from 'react';
import { Users, Plus, CreditCard as Edit, Trash2, Phone, Mail, MapPin, Calendar, DollarSign } from 'lucide-react';

const CustomerManagement: React.FC = () => {
  const [customers, setCustomers] = useState([
    {
      id: 'CUST-001',
      name: 'Restaurant La Patagonia',
      type: 'business',
      contact: 'Carlos Mendoza',
      email: 'carlos@lapatagonia.cl',
      phone: '+56 9 8765 4321',
      address: 'Av. Colón 782, Punta Arenas',
      registrationDate: '2023-01-15',
      lastOrder: '2024-01-20',
      totalOrders: 45,
      totalSpent: 2850000,
      status: 'active',
      creditLimit: 500000,
      paymentTerms: '30 días'
    },
    {
      id: 'CUST-002',
      name: 'Café Central',
      type: 'business',
      contact: 'María González',
      email: 'info@cafecentral.cl',
      phone: '+56 9 7654 3210',
      address: 'Plaza Muñoz Gamero 1028',
      registrationDate: '2023-03-20',
      lastOrder: '2024-01-19',
      totalOrders: 32,
      totalSpent: 1650000,
      status: 'active',
      creditLimit: 300000,
      paymentTerms: '15 días'
    },
    {
      id: 'CUST-003',
      name: 'Hospital Regional',
      type: 'institution',
      contact: 'Dr. Roberto Silva',
      email: 'compras@hospitalregional.cl',
      phone: '+56 61 229 8000',
      address: 'Av. Manuel Bulnes 1425',
      registrationDate: '2022-08-10',
      lastOrder: '2024-01-18',
      totalOrders: 78,
      totalSpent: 5200000,
      status: 'active',
      creditLimit: 1000000,
      paymentTerms: '45 días'
    },
    {
      id: 'CUST-004',
      name: 'Colegio San José',
      type: 'institution',
      contact: 'Ana Pérez',
      email: 'administracion@colegiosanjose.cl',
      phone: '+56 9 6543 2109',
      address: 'Calle Magallanes 960',
      registrationDate: '2023-05-12',
      lastOrder: '2024-01-17',
      totalOrders: 28,
      totalSpent: 1850000,
      status: 'active',
      creditLimit: 400000,
      paymentTerms: '30 días'
    },
    {
      id: 'CUST-005',
      name: 'Hotel Cabo de Hornos',
      type: 'business',
      contact: 'Luis Martínez',
      email: 'gerencia@hotelcabodehornos.cl',
      phone: '+56 61 271 5000',
      address: 'Plaza Muñoz Gamero 1025',
      registrationDate: '2022-11-30',
      lastOrder: '2024-01-16',
      totalOrders: 56,
      totalSpent: 3200000,
      status: 'active',
      creditLimit: 600000,
      paymentTerms: '30 días'
    }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<any>(null);
  const [selectedType, setSelectedType] = useState('all');
  const [newCustomer, setNewCustomer] = useState({
    name: '',
    type: 'business',
    contact: '',
    email: '',
    phone: '',
    address: '',
    creditLimit: 0,
    paymentTerms: '30 días'
  });

  const customerTypes = [
    { id: 'all', name: 'Todos los tipos' },
    { id: 'business', name: 'Empresas' },
    { id: 'institution', name: 'Instituciones' },
    { id: 'individual', name: 'Particulares' }
  ];

  const filteredCustomers = customers.filter(customer => {
    return selectedType === 'all' || customer.type === selectedType;
  });

  const handleAddCustomer = (e: React.FormEvent) => {
    e.preventDefault();
    const id = `CUST-${String(customers.length + 1).padStart(3, '0')}`;
    setCustomers([...customers, {
      ...newCustomer,
      id,
      registrationDate: new Date().toISOString().split('T')[0],
      lastOrder: '',
      totalOrders: 0,
      totalSpent: 0,
      status: 'active'
    }]);
    setNewCustomer({
      name: '',
      type: 'business',
      contact: '',
      email: '',
      phone: '',
      address: '',
      creditLimit: 0,
      paymentTerms: '30 días'
    });
    setShowForm(false);
  };

  const deleteCustomer = (id: string) => {
    setCustomers(customers.filter(customer => customer.id !== id));
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'business': return 'bg-blue-100 text-blue-800';
      case 'institution': return 'bg-green-100 text-green-800';
      case 'individual': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeText = (type: string) => {
    switch (type) {
      case 'business': return 'Empresa';
      case 'institution': return 'Institución';
      case 'individual': return 'Particular';
      default: return 'Sin tipo';
    }
  };

  const totalCustomers = filteredCustomers.length;
  const totalRevenue = filteredCustomers.reduce((sum, customer) => sum + customer.totalSpent, 0);
  const averageOrderValue = totalRevenue / filteredCustomers.reduce((sum, customer) => sum + customer.totalOrders, 0) || 0;
  const activeCustomers = filteredCustomers.filter(customer => customer.status === 'active').length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <h2 className="text-2xl font-bold text-gray-900">Gestión de Clientes</h2>
        <div className="flex space-x-3 mt-4 sm:mt-0">
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="h-5 w-5" />
            <span>Nuevo Cliente</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <div className="flex items-center space-x-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Cliente</label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {customerTypes.map(type => (
                <option key={type.id} value={type.id}>{type.name}</option>
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
              <Users className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-500">Total Clientes</h3>
            <p className="text-2xl font-bold text-gray-900 mt-1">{totalCustomers}</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="p-2 rounded-lg bg-green-50">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-500">Ingresos Totales</h3>
            <p className="text-2xl font-bold text-green-600 mt-1">CLP ${totalRevenue.toLocaleString()}</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="p-2 rounded-lg bg-purple-50">
              <DollarSign className="h-6 w-6 text-purple-600" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-500">Valor Promedio Orden</h3>
            <p className="text-2xl font-bold text-purple-600 mt-1">CLP ${Math.round(averageOrderValue).toLocaleString()}</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="p-2 rounded-lg bg-orange-50">
              <Users className="h-6 w-6 text-orange-600" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-500">Clientes Activos</h3>
            <p className="text-2xl font-bold text-orange-600 mt-1">{activeCustomers}</p>
          </div>
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Lista de Clientes</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cliente</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contacto</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Órdenes</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Gastado</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Límite Crédito</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Última Orden</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCustomers.map((customer) => (
                <tr key={customer.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Users className="h-5 w-5 text-gray-400 mr-3" />
                      <div>
                        <div className="text-sm font-medium text-gray-900">{customer.name}</div>
                        <div className="text-sm text-gray-500">{customer.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeColor(customer.type)}`}>
                      {getTypeText(customer.type)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{customer.contact}</div>
                    <div className="text-sm text-gray-500 flex items-center">
                      <Mail className="h-3 w-3 mr-1" />
                      {customer.email}
                    </div>
                    <div className="text-sm text-gray-500 flex items-center">
                      <Phone className="h-3 w-3 mr-1" />
                      {customer.phone}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {customer.totalOrders}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                    CLP ${customer.totalSpent.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    CLP ${customer.creditLimit.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {customer.lastOrder || 'Sin órdenes'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => deleteCustomer(customer.id)}
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

      {/* Add Customer Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-full max-w-2xl shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Agregar Nuevo Cliente</h3>
              <form onSubmit={handleAddCustomer} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nombre/Razón Social</label>
                    <input
                      type="text"
                      required
                      value={newCustomer.name}
                      onChange={(e) => setNewCustomer({...newCustomer, name: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Cliente</label>
                    <select
                      value={newCustomer.type}
                      onChange={(e) => setNewCustomer({...newCustomer, type: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="business">Empresa</option>
                      <option value="institution">Institución</option>
                      <option value="individual">Particular</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Persona de Contacto</label>
                    <input
                      type="text"
                      required
                      value={newCustomer.contact}
                      onChange={(e) => setNewCustomer({...newCustomer, contact: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      required
                      value={newCustomer.email}
                      onChange={(e) => setNewCustomer({...newCustomer, email: e.target.value})}
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
                      value={newCustomer.phone}
                      onChange={(e) => setNewCustomer({...newCustomer, phone: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Límite de Crédito (CLP)</label>
                    <input
                      type="number"
                      min="0"
                      value={newCustomer.creditLimit}
                      onChange={(e) => setNewCustomer({...newCustomer, creditLimit: parseInt(e.target.value) || 0})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Dirección</label>
                  <input
                    type="text"
                    required
                    value={newCustomer.address}
                    onChange={(e) => setNewCustomer({...newCustomer, address: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Términos de Pago</label>
                  <select
                    value={newCustomer.paymentTerms}
                    onChange={(e) => setNewCustomer({...newCustomer, paymentTerms: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Contado">Contado</option>
                    <option value="15 días">15 días</option>
                    <option value="30 días">30 días</option>
                    <option value="45 días">45 días</option>
                    <option value="60 días">60 días</option>
                  </select>
                </div>

                <div className="flex space-x-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Agregar Cliente
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

export default CustomerManagement;