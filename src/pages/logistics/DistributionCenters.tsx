import React, { useState } from 'react';
import { Building, Package, MapPin, TrendingUp, Users, Clock, Plus, CreditCard as Edit, Trash2, Activity } from 'lucide-react';

const DistributionCenters: React.FC = () => {
  const [centers, setCenters] = useState([
    {
      id: 'DC-001',
      name: 'Centro Principal Punta Arenas',
      address: 'Av. España 1450, Punta Arenas',
      type: 'main',
      status: 'active',
      capacity: 500,
      currentStock: 385,
      employees: 8,
      operatingHours: '08:00 - 18:00',
      manager: 'Carlos Mendoza',
      zones: [
        { name: 'Zona A - Platos', capacity: 150, occupied: 120, products: 45 },
        { name: 'Zona B - Vasos', capacity: 100, occupied: 85, products: 32 },
        { name: 'Zona C - Protección', capacity: 200, occupied: 150, products: 68 },
        { name: 'Zona D - Papel', capacity: 50, occupied: 30, products: 15 }
      ],
      monthlyThroughput: 2500,
      efficiency: 92,
      lastInventory: '2024-01-15'
    },
    {
      id: 'DC-002',
      name: 'Centro Norte',
      address: 'Av. Manuel Bulnes 2100, Punta Arenas',
      type: 'secondary',
      status: 'active',
      capacity: 300,
      currentStock: 245,
      employees: 5,
      operatingHours: '09:00 - 17:00',
      manager: 'Ana Pérez',
      zones: [
        { name: 'Zona A - General', capacity: 200, occupied: 165, products: 85 },
        { name: 'Zona B - Urgente', capacity: 100, occupied: 80, products: 25 }
      ],
      monthlyThroughput: 1200,
      efficiency: 88,
      lastInventory: '2024-01-18'
    },
    {
      id: 'DC-003',
      name: 'Centro Puerto Natales',
      address: 'Eberhard 354, Puerto Natales',
      type: 'planned',
      status: 'planning',
      capacity: 200,
      currentStock: 0,
      employees: 0,
      operatingHours: 'Por definir',
      manager: 'Por asignar',
      zones: [
        { name: 'Zona Única', capacity: 200, occupied: 0, products: 0 }
      ],
      monthlyThroughput: 0,
      efficiency: 0,
      lastInventory: ''
    }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [selectedTab, setSelectedTab] = useState<'centers' | 'zones' | 'performance'>('centers');
  const [newCenter, setNewCenter] = useState({
    name: '',
    address: '',
    type: 'secondary',
    capacity: 0,
    manager: '',
    operatingHours: ''
  });

  const centerTypes = [
    { id: 'main', name: 'Principal' },
    { id: 'secondary', name: 'Secundario' },
    { id: 'planned', name: 'Planificado' }
  ];

  const managers = ['Carlos Mendoza', 'Ana Pérez', 'Roberto Silva', 'María González'];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'planning': return 'bg-yellow-100 text-yellow-800';
      case 'maintenance': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'main': return 'bg-blue-100 text-blue-800';
      case 'secondary': return 'bg-purple-100 text-purple-800';
      case 'planned': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getOccupancyColor = (percentage: number) => {
    if (percentage >= 90) return 'text-red-600';
    if (percentage >= 75) return 'text-yellow-600';
    return 'text-green-600';
  };

  const handleAddCenter = (e: React.FormEvent) => {
    e.preventDefault();
    const id = `DC-${String(centers.length + 1).padStart(3, '0')}`;
    setCenters([...centers, {
      ...newCenter,
      id,
      status: 'planning',
      currentStock: 0,
      employees: 0,
      zones: [],
      monthlyThroughput: 0,
      efficiency: 0,
      lastInventory: ''
    }]);
    setNewCenter({
      name: '',
      address: '',
      type: 'secondary',
      capacity: 0,
      manager: '',
      operatingHours: ''
    });
    setShowForm(false);
  };

  const deleteCenter = (id: string) => {
    setCenters(centers.filter(center => center.id !== id));
  };

  const totalCapacity = centers.reduce((sum, center) => sum + center.capacity, 0);
  const totalStock = centers.reduce((sum, center) => sum + center.currentStock, 0);
  const activeCenters = centers.filter(c => c.status === 'active').length;
  const averageEfficiency = centers.filter(c => c.status === 'active').reduce((sum, c) => sum + c.efficiency, 0) / activeCenters || 0;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <h2 className="text-2xl font-bold text-gray-900">Centros de Distribución</h2>
        <div className="flex space-x-2 mt-4 sm:mt-0">
          <button
            onClick={() => setSelectedTab('centers')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedTab === 'centers'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Centros
          </button>
          <button
            onClick={() => setSelectedTab('zones')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedTab === 'zones'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Zonas
          </button>
          <button
            onClick={() => setSelectedTab('performance')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedTab === 'performance'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Rendimiento
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="p-2 rounded-lg bg-blue-50">
              <Building className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-500">Centros Activos</h3>
            <p className="text-2xl font-bold text-blue-600 mt-1">{activeCenters}</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="p-2 rounded-lg bg-green-50">
              <Package className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-500">Capacidad Total</h3>
            <p className="text-2xl font-bold text-green-600 mt-1">{totalCapacity.toLocaleString()}</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="p-2 rounded-lg bg-purple-50">
              <Activity className="h-6 w-6 text-purple-600" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-500">Ocupación</h3>
            <p className={`text-2xl font-bold mt-1 ${getOccupancyColor((totalStock / totalCapacity) * 100)}`}>
              {((totalStock / totalCapacity) * 100).toFixed(1)}%
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="p-2 rounded-lg bg-orange-50">
              <TrendingUp className="h-6 w-6 text-orange-600" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-500">Eficiencia Promedio</h3>
            <p className="text-2xl font-bold text-orange-600 mt-1">{averageEfficiency.toFixed(1)}%</p>
          </div>
        </div>
      </div>

      {selectedTab === 'centers' && (
        <>
          <div className="flex justify-end">
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="h-5 w-5" />
              <span>Nuevo Centro</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {centers.map((center) => (
              <div key={center.id} className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                <div className="flex justify-between items-start mb-4">
                  <h4 className="font-semibold text-gray-900">{center.name}</h4>
                  <div className="flex space-x-2">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeColor(center.type)}`}>
                      {center.type === 'main' ? 'Principal' :
                       center.type === 'secondary' ? 'Secundario' : 'Planificado'}
                    </span>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(center.status)}`}>
                      {center.status === 'active' ? 'Activo' :
                       center.status === 'planning' ? 'Planificación' : 'Mantenimiento'}
                    </span>
                  </div>
                </div>
                
                <div className="space-y-3 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="h-4 w-4 mr-2" />
                    {center.address}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Users className="h-4 w-4 mr-2" />
                    {center.employees} empleados • {center.manager}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="h-4 w-4 mr-2" />
                    {center.operatingHours}
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Ocupación</span>
                      <span className="font-medium">{center.currentStock}/{center.capacity}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          (center.currentStock / center.capacity) >= 0.9 ? 'bg-red-600' :
                          (center.currentStock / center.capacity) >= 0.75 ? 'bg-yellow-600' : 'bg-green-600'
                        }`}
                        style={{ width: `${(center.currentStock / center.capacity) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  {center.status === 'active' && (
                    <>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Throughput mensual:</span>
                        <span className="font-medium">{center.monthlyThroughput} unidades</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Eficiencia:</span>
                        <span className={`font-medium ${center.efficiency >= 90 ? 'text-green-600' : center.efficiency >= 80 ? 'text-yellow-600' : 'text-red-600'}`}>
                          {center.efficiency}%
                        </span>
                      </div>
                    </>
                  )}
                </div>

                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
                  <div className="flex items-center space-x-2">
                    <button className="text-blue-600 hover:text-blue-900">
                      <Edit className="h-4 w-4" />
                    </button>
                    <button 
                      onClick={() => deleteCenter(center.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <button className="text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition-colors">
                    Ver Detalles
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {selectedTab === 'zones' && (
        <div className="space-y-6">
          {centers.filter(c => c.status === 'active').map((center) => (
            <div key={center.id} className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">{center.name} - Distribución por Zonas</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {center.zones.map((zone, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-3">{zone.name}</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Capacidad:</span>
                        <span className="font-medium">{zone.capacity}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Ocupado:</span>
                        <span className="font-medium">{zone.occupied}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Productos:</span>
                        <span className="font-medium">{zone.products}</span>
                      </div>
                      <div className="mt-2">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${
                              (zone.occupied / zone.capacity) >= 0.9 ? 'bg-red-600' :
                              (zone.occupied / zone.capacity) >= 0.75 ? 'bg-yellow-600' : 'bg-green-600'
                            }`}
                            style={{ width: `${(zone.occupied / zone.capacity) * 100}%` }}
                          ></div>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          {((zone.occupied / zone.capacity) * 100).toFixed(1)}% ocupado
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedTab === 'performance' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {centers.filter(c => c.status === 'active').map((center) => (
            <div key={center.id} className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
              <h4 className="font-semibold text-gray-900 mb-4">{center.name}</h4>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <p className="text-2xl font-bold text-blue-600">{center.monthlyThroughput}</p>
                    <p className="text-sm text-gray-600">Unidades/mes</p>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <p className="text-2xl font-bold text-green-600">{center.efficiency}%</p>
                    <p className="text-sm text-gray-600">Eficiencia</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Ocupación actual:</span>
                    <span className={`font-medium ${getOccupancyColor((center.currentStock / center.capacity) * 100)}`}>
                      {((center.currentStock / center.capacity) * 100).toFixed(1)}%
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Empleados:</span>
                    <span className="font-medium">{center.employees}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Zonas:</span>
                    <span className="font-medium">{center.zones.length}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Último inventario:</span>
                    <span className="font-medium">{center.lastInventory}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Center Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-full max-w-2xl shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Nuevo Centro de Distribución</h3>
              <form onSubmit={handleAddCenter} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nombre del Centro</label>
                  <input
                    type="text"
                    required
                    value={newCenter.name}
                    onChange={(e) => setNewCenter({...newCenter, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Dirección</label>
                  <input
                    type="text"
                    required
                    value={newCenter.address}
                    onChange={(e) => setNewCenter({...newCenter, address: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
                    <select
                      value={newCenter.type}
                      onChange={(e) => setNewCenter({...newCenter, type: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {centerTypes.map(type => (
                        <option key={type.id} value={type.id}>{type.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Capacidad</label>
                    <input
                      type="number"
                      required
                      min="0"
                      value={newCenter.capacity}
                      onChange={(e) => setNewCenter({...newCenter, capacity: parseInt(e.target.value) || 0})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Manager</label>
                    <select
                      required
                      value={newCenter.manager}
                      onChange={(e) => setNewCenter({...newCenter, manager: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Seleccionar manager</option>
                      {managers.map(manager => (
                        <option key={manager} value={manager}>{manager}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Horario de Operación</label>
                    <input
                      type="text"
                      required
                      placeholder="Ej: 08:00 - 18:00"
                      value={newCenter.operatingHours}
                      onChange={(e) => setNewCenter({...newCenter, operatingHours: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="flex space-x-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Crear Centro
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

export default DistributionCenters;