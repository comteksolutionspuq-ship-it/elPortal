import React, { useState } from 'react';
import { Building, Plus, MapPin, Package, TrendingUp, BarChart3, Users, Truck } from 'lucide-react';

const DistributionCenters: React.FC = () => {
  const [centers, setCenters] = useState([
    {
      id: 'DC-001',
      name: 'Centro Principal Punta Arenas',
      address: 'Av. España 1450, Punta Arenas',
      type: 'main',
      status: 'active',
      capacity: 1000,
      currentOccupancy: 750,
      zones: [
        { name: 'Zona A - Platos', capacity: 200, occupied: 150, products: 3 },
        { name: 'Zona B - Vasos', capacity: 200, occupied: 180, products: 2 },
        { name: 'Zona C - Protección', capacity: 300, occupied: 220, products: 4 },
        { name: 'Zona D - Papel', capacity: 150, occupied: 100, products: 2 },
        { name: 'Zona E - Cubiertos', capacity: 150, occupied: 100, products: 1 }
      ],
      staff: 8,
      manager: 'Carlos Mendoza',
      throughput: 450,
      efficiency: 85,
      operatingCost: 2500000,
      revenue: 8500000
    },
    {
      id: 'DC-002',
      name: 'Centro Norte',
      address: 'Av. Manuel Bulnes 2100, Punta Arenas',
      type: 'satellite',
      status: 'active',
      capacity: 400,
      currentOccupancy: 280,
      zones: [
        { name: 'Zona A - General', capacity: 200, occupied: 140, products: 5 },
        { name: 'Zona B - Especial', capacity: 200, occupied: 140, products: 3 }
      ],
      staff: 4,
      manager: 'Ana Pérez',
      throughput: 180,
      efficiency: 78,
      operatingCost: 1200000,
      revenue: 3200000
    },
    {
      id: 'DC-003',
      name: 'Centro Puerto Natales',
      address: 'Eberhard 354, Puerto Natales',
      type: 'planned',
      status: 'planning',
      capacity: 300,
      currentOccupancy: 0,
      zones: [
        { name: 'Zona A - Mixta', capacity: 150, occupied: 0, products: 0 },
        { name: 'Zona B - Reserva', capacity: 150, occupied: 0, products: 0 }
      ],
      staff: 0,
      manager: 'Por definir',
      throughput: 0,
      efficiency: 0,
      operatingCost: 800000,
      revenue: 0
    }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [selectedCenter, setSelectedCenter] = useState<string | null>(null);
  const [newCenter, setNewCenter] = useState({
    name: '',
    address: '',
    type: 'satellite',
    capacity: 0,
    manager: '',
    staff: 0
  });

  const centerTypes = [
    { id: 'main', name: 'Centro Principal' },
    { id: 'satellite', name: 'Centro Satélite' },
    { id: 'planned', name: 'Planificado' }
  ];

  const managers = ['Carlos Mendoza', 'Ana Pérez', 'Luis Martínez', 'Roberto Silva', 'María González'];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'planning': return 'bg-yellow-100 text-yellow-800';
      case 'maintenance': return 'bg-orange-100 text-orange-800';
      case 'inactive': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'main': return 'bg-blue-100 text-blue-800';
      case 'satellite': return 'bg-purple-100 text-purple-800';
      case 'planned': return 'bg-yellow-100 text-yellow-800';
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
      currentOccupancy: 0,
      zones: [],
      throughput: 0,
      efficiency: 0,
      operatingCost: 0,
      revenue: 0
    }]);
    setNewCenter({
      name: '',
      address: '',
      type: 'satellite',
      capacity: 0,
      manager: '',
      staff: 0
    });
    setShowForm(false);
  };

  const totalCapacity = centers.reduce((sum, center) => sum + center.capacity, 0);
  const totalOccupancy = centers.reduce((sum, center) => sum + center.currentOccupancy, 0);
  const activeCenters = centers.filter(center => center.status === 'active').length;
  const avgEfficiency = centers.filter(c => c.status === 'active').reduce((sum, center) => sum + center.efficiency, 0) / activeCenters || 0;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <h2 className="text-2xl font-bold text-gray-900">Centros de Distribución</h2>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors mt-4 sm:mt-0"
        >
          <Plus className="h-5 w-5" />
          <span>Nuevo Centro</span>
        </button>
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
            <p className="text-2xl font-bold text-green-600 mt-1">{totalCapacity.toLocaleString()} m³</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="p-2 rounded-lg bg-purple-50">
              <BarChart3 className="h-6 w-6 text-purple-600" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-500">Ocupación</h3>
            <p className={`text-2xl font-bold mt-1 ${getOccupancyColor((totalOccupancy / totalCapacity) * 100)}`}>
              {((totalOccupancy / totalCapacity) * 100).toFixed(1)}%
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
            <p className="text-2xl font-bold text-orange-600 mt-1">{avgEfficiency.toFixed(1)}%</p>
          </div>
        </div>
      </div>

      {/* Centers List */}
      <div className="space-y-4">
        {centers.map((center) => (
          <div key={center.id} className="bg-white rounded-lg shadow-sm border border-gray-100">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{center.name}</h3>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(center.status)}`}>
                      {center.status === 'active' ? 'Activo' :
                       center.status === 'planning' ? 'Planificación' :
                       center.status === 'maintenance' ? 'Mantenimiento' : 'Inactivo'}
                    </span>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeColor(center.type)}`}>
                      {centerTypes.find(t => t.id === center.type)?.name}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{center.address}</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div className="flex items-center text-gray-500">
                      <Package className="h-4 w-4 mr-1" />
                      {center.currentOccupancy}/{center.capacity} m³
                    </div>
                    <div className="flex items-center text-gray-500">
                      <Users className="h-4 w-4 mr-1" />
                      {center.staff} empleados
                    </div>
                    <div className="flex items-center text-gray-500">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      {center.efficiency}% eficiencia
                    </div>
                    <div className="flex items-center text-gray-500">
                      <Truck className="h-4 w-4 mr-1" />
                      {center.throughput} envíos/mes
                    </div>
                  </div>
                </div>
              </div>

              {/* Occupancy Bar */}
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Ocupación del Centro</span>
                  <span className="font-medium">{((center.currentOccupancy / center.capacity) * 100).toFixed(1)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      (center.currentOccupancy / center.capacity) >= 0.9 ? 'bg-red-600' :
                      (center.currentOccupancy / center.capacity) >= 0.75 ? 'bg-yellow-600' : 'bg-green-600'
                    }`}
                    style={{ width: `${(center.currentOccupancy / center.capacity) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Zones */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Zonas de Almacenamiento</h4>
                  <div className="space-y-2">
                    {center.zones.map((zone, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <div>
                          <span className="text-sm font-medium text-gray-700">{zone.name}</span>
                          <span className="text-xs text-gray-500 ml-2">({zone.products} productos)</span>
                        </div>
                        <div className="text-right">
                          <span className="text-sm font-medium">{zone.occupied}/{zone.capacity} m³</span>
                          <div className="w-16 bg-gray-200 rounded-full h-1 mt-1">
                            <div 
                              className={`h-1 rounded-full ${
                                (zone.occupied / zone.capacity) >= 0.9 ? 'bg-red-600' :
                                (zone.occupied / zone.capacity) >= 0.75 ? 'bg-yellow-600' : 'bg-green-600'
                              }`}
                              style={{ width: `${(zone.occupied / zone.capacity) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Información Operacional</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Manager:</span>
                      <span className="font-medium">{center.manager}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Personal:</span>
                      <span className="font-medium">{center.staff} empleados</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Throughput mensual:</span>
                      <span className="font-medium">{center.throughput} envíos</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Costo operacional:</span>
                      <span className="font-medium text-red-600">CLP ${center.operatingCost.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Ingresos generados:</span>
                      <span className="font-medium text-green-600">CLP ${center.revenue.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

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
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Centro</label>
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
                    <label className="block text-sm font-medium text-gray-700 mb-1">Capacidad (m³)</label>
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
                    <label className="block text-sm font-medium text-gray-700 mb-1">Personal Inicial</label>
                    <input
                      type="number"
                      required
                      min="0"
                      value={newCenter.staff}
                      onChange={(e) => setNewCenter({...newCenter, staff: parseInt(e.target.value) || 0})}
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