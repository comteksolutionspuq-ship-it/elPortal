import React, { useState } from 'react';
import { Truck, Plus, Fuel, Wrench, Calendar, MapPin, AlertTriangle, CheckCircle, CreditCard as Edit, Trash2, Activity } from 'lucide-react';

const FleetManagement: React.FC = () => {
  const [vehicles, setVehicles] = useState([
    {
      id: 'VEH-001',
      name: 'Camión Mercedes Principal',
      type: 'truck',
      plate: 'PAT-001',
      model: 'Mercedes Sprinter 2022',
      capacity: '3.5 toneladas',
      status: 'active',
      condition: 'excellent',
      mileage: 45000,
      lastMaintenance: '2024-01-15',
      nextMaintenance: '2024-04-15',
      fuelEfficiency: 12.5,
      monthlyFuelCost: 180000,
      driver: 'Ana Pérez',
      location: 'LOC-001',
      insurance: '2025-03-15',
      technicalReview: '2024-08-15'
    },
    {
      id: 'VEH-002',
      name: 'Camioneta Ford Reparto',
      type: 'van',
      plate: 'PAT-002',
      model: 'Ford Transit 2021',
      capacity: '1.5 toneladas',
      status: 'active',
      condition: 'good',
      mileage: 62000,
      lastMaintenance: '2024-01-10',
      nextMaintenance: '2024-04-10',
      fuelEfficiency: 15.2,
      monthlyFuelCost: 145000,
      driver: 'Carlos Mendoza',
      location: 'LOC-002',
      insurance: '2025-01-20',
      technicalReview: '2024-06-20'
    },
    {
      id: 'VEH-003',
      name: 'Moto Delivery Express',
      type: 'motorcycle',
      plate: 'PAT-003',
      model: 'Honda CB 190R 2023',
      capacity: '50 kg',
      status: 'maintenance',
      condition: 'good',
      mileage: 15000,
      lastMaintenance: '2024-01-20',
      nextMaintenance: '2024-03-20',
      fuelEfficiency: 45.0,
      monthlyFuelCost: 35000,
      driver: 'Luis Martínez',
      location: 'LOC-001',
      insurance: '2025-12-15',
      technicalReview: '2024-12-15'
    }
  ]);

  const [maintenanceHistory, setMaintenanceHistory] = useState([
    {
      id: 'MAINT-001',
      vehicleId: 'VEH-001',
      vehicleName: 'Camión Mercedes Principal',
      date: '2024-01-15',
      type: 'preventive',
      description: 'Cambio de aceite, filtros y revisión general',
      cost: 85000,
      mileage: 45000,
      technician: 'Taller Mercedes Punta Arenas',
      status: 'completed'
    },
    {
      id: 'MAINT-002',
      vehicleId: 'VEH-003',
      vehicleName: 'Moto Delivery Express',
      date: '2024-01-20',
      type: 'corrective',
      description: 'Reparación de frenos y cambio de neumáticos',
      cost: 45000,
      mileage: 15000,
      technician: 'Taller Honda',
      status: 'in-progress'
    }
  ]);

  const [showVehicleForm, setShowVehicleForm] = useState(false);
  const [showMaintenanceForm, setShowMaintenanceForm] = useState(false);
  const [selectedTab, setSelectedTab] = useState<'vehicles' | 'maintenance' | 'analytics'>('vehicles');

  const [newVehicle, setNewVehicle] = useState({
    name: '',
    type: 'truck',
    plate: '',
    model: '',
    capacity: '',
    driver: '',
    location: ''
  });

  const [newMaintenance, setNewMaintenance] = useState({
    vehicleId: '',
    type: 'preventive',
    description: '',
    cost: 0,
    technician: ''
  });

  const vehicleTypes = [
    { id: 'truck', name: 'Camión' },
    { id: 'van', name: 'Camioneta' },
    { id: 'motorcycle', name: 'Motocicleta' },
    { id: 'car', name: 'Automóvil' }
  ];

  const drivers = ['Ana Pérez', 'Carlos Mendoza', 'Luis Martínez', 'Roberto Silva'];
  const locations = [
    { id: 'LOC-001', name: 'Local Principal' },
    { id: 'LOC-002', name: 'Sucursal Norte' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'maintenance': return 'bg-yellow-100 text-yellow-800';
      case 'inactive': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case 'excellent': return 'text-green-600';
      case 'good': return 'text-blue-600';
      case 'fair': return 'text-yellow-600';
      case 'poor': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getVehicleIcon = (type: string) => {
    switch (type) {
      case 'truck': return <Truck className="h-5 w-5" />;
      case 'van': return <Truck className="h-5 w-5" />;
      case 'motorcycle': return <Activity className="h-5 w-5" />;
      default: return <Truck className="h-5 w-5" />;
    }
  };

  const handleAddVehicle = (e: React.FormEvent) => {
    e.preventDefault();
    const id = `VEH-${String(vehicles.length + 1).padStart(3, '0')}`;
    setVehicles([...vehicles, {
      ...newVehicle,
      id,
      status: 'active',
      condition: 'excellent',
      mileage: 0,
      lastMaintenance: '',
      nextMaintenance: '',
      fuelEfficiency: 0,
      monthlyFuelCost: 0,
      insurance: '',
      technicalReview: ''
    }]);
    setNewVehicle({
      name: '',
      type: 'truck',
      plate: '',
      model: '',
      capacity: '',
      driver: '',
      location: ''
    });
    setShowVehicleForm(false);
  };

  const handleAddMaintenance = (e: React.FormEvent) => {
    e.preventDefault();
    const id = `MAINT-${String(maintenanceHistory.length + 1).padStart(3, '0')}`;
    const vehicle = vehicles.find(v => v.id === newMaintenance.vehicleId);
    setMaintenanceHistory([...maintenanceHistory, {
      ...newMaintenance,
      id,
      vehicleName: vehicle?.name || '',
      date: new Date().toISOString().split('T')[0],
      mileage: vehicle?.mileage || 0,
      status: 'completed'
    }]);
    setNewMaintenance({
      vehicleId: '',
      type: 'preventive',
      description: '',
      cost: 0,
      technician: ''
    });
    setShowMaintenanceForm(false);
  };

  const totalVehicles = vehicles.length;
  const activeVehicles = vehicles.filter(v => v.status === 'active').length;
  const totalFuelCost = vehicles.reduce((sum, v) => sum + v.monthlyFuelCost, 0);
  const averageEfficiency = vehicles.reduce((sum, v) => sum + v.fuelEfficiency, 0) / vehicles.length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <h2 className="text-2xl font-bold text-gray-900">Gestión de Flota</h2>
        <div className="flex space-x-2 mt-4 sm:mt-0">
          <button
            onClick={() => setSelectedTab('vehicles')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedTab === 'vehicles'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Vehículos
          </button>
          <button
            onClick={() => setSelectedTab('maintenance')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedTab === 'maintenance'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Mantenimiento
          </button>
          <button
            onClick={() => setSelectedTab('analytics')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedTab === 'analytics'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Analytics
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="p-2 rounded-lg bg-blue-50">
              <Truck className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-500">Total Vehículos</h3>
            <p className="text-2xl font-bold text-blue-600 mt-1">{totalVehicles}</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="p-2 rounded-lg bg-green-50">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-500">Vehículos Activos</h3>
            <p className="text-2xl font-bold text-green-600 mt-1">{activeVehicles}</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="p-2 rounded-lg bg-orange-50">
              <Fuel className="h-6 w-6 text-orange-600" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-500">Costo Combustible</h3>
            <p className="text-2xl font-bold text-orange-600 mt-1">CLP ${totalFuelCost.toLocaleString()}</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="p-2 rounded-lg bg-purple-50">
              <Activity className="h-6 w-6 text-purple-600" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-500">Eficiencia Promedio</h3>
            <p className="text-2xl font-bold text-purple-600 mt-1">{averageEfficiency.toFixed(1)} km/L</p>
          </div>
        </div>
      </div>

      {selectedTab === 'vehicles' && (
        <>
          <div className="flex justify-end">
            <button
              onClick={() => setShowVehicleForm(true)}
              className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="h-5 w-5" />
              <span>Nuevo Vehículo</span>
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Flota de Vehículos</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vehículo</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Conductor</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Condición</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kilometraje</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Próximo Mantenimiento</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Costo Combustible</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {vehicles.map((vehicle) => (
                    <tr key={vehicle.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="p-2 rounded-lg bg-gray-100 mr-3">
                            {getVehicleIcon(vehicle.type)}
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">{vehicle.name}</div>
                            <div className="text-sm text-gray-500">{vehicle.model} • {vehicle.plate}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {vehicle.driver}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(vehicle.status)}`}>
                          {vehicle.status === 'active' ? 'Activo' :
                           vehicle.status === 'maintenance' ? 'Mantenimiento' : 'Inactivo'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`text-sm font-medium ${getConditionColor(vehicle.condition)}`}>
                          {vehicle.condition === 'excellent' ? 'Excelente' :
                           vehicle.condition === 'good' ? 'Bueno' :
                           vehicle.condition === 'fair' ? 'Regular' : 'Malo'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {vehicle.mileage.toLocaleString()} km
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {vehicle.nextMaintenance || 'No programado'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-orange-600">
                        CLP ${vehicle.monthlyFuelCost.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          <button className="text-blue-600 hover:text-blue-900">
                            <Edit className="h-4 w-4" />
                          </button>
                          <button className="text-green-600 hover:text-green-900">
                            <Wrench className="h-4 w-4" />
                          </button>
                          <button className="text-red-600 hover:text-red-900">
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
        </>
      )}

      {selectedTab === 'maintenance' && (
        <>
          <div className="flex justify-end">
            <button
              onClick={() => setShowMaintenanceForm(true)}
              className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              <Plus className="h-5 w-5" />
              <span>Nuevo Mantenimiento</span>
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Historial de Mantenimiento</h3>
            </div>
            <div className="divide-y divide-gray-200">
              {maintenanceHistory.map((record) => (
                <div key={record.id} className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="font-medium text-gray-900">{record.vehicleName}</h4>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          record.type === 'preventive' ? 'bg-blue-100 text-blue-800' : 'bg-orange-100 text-orange-800'
                        }`}>
                          {record.type === 'preventive' ? 'Preventivo' : 'Correctivo'}
                        </span>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          record.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {record.status === 'completed' ? 'Completado' : 'En Progreso'}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{record.description}</p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-500">
                        <div>
                          <span className="font-medium">Fecha:</span> {record.date}
                        </div>
                        <div>
                          <span className="font-medium">Costo:</span> CLP ${record.cost.toLocaleString()}
                        </div>
                        <div>
                          <span className="font-medium">Kilometraje:</span> {record.mileage.toLocaleString()} km
                        </div>
                        <div>
                          <span className="font-medium">Técnico:</span> {record.technician}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {selectedTab === 'analytics' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {vehicles.map((vehicle) => (
            <div key={vehicle.id} className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold text-gray-900">{vehicle.name}</h4>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(vehicle.status)}`}>
                  {vehicle.status === 'active' ? 'Activo' :
                   vehicle.status === 'maintenance' ? 'Mantenimiento' : 'Inactivo'}
                </span>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Kilometraje:</span>
                  <span className="font-medium">{vehicle.mileage.toLocaleString()} km</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Eficiencia:</span>
                  <span className="font-medium">{vehicle.fuelEfficiency} km/L</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Costo mensual combustible:</span>
                  <span className="font-medium text-orange-600">CLP ${vehicle.monthlyFuelCost.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Capacidad:</span>
                  <span className="font-medium">{vehicle.capacity}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Próximo mantenimiento:</span>
                  <span className={`font-medium ${
                    vehicle.nextMaintenance && new Date(vehicle.nextMaintenance) <= new Date() 
                      ? 'text-red-600' : 'text-green-600'
                  }`}>
                    {vehicle.nextMaintenance || 'No programado'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Vehicle Form Modal */}
      {showVehicleForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-full max-w-2xl shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Nuevo Vehículo</h3>
              <form onSubmit={handleAddVehicle} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nombre del Vehículo</label>
                    <input
                      type="text"
                      required
                      value={newVehicle.name}
                      onChange={(e) => setNewVehicle({...newVehicle, name: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
                    <select
                      value={newVehicle.type}
                      onChange={(e) => setNewVehicle({...newVehicle, type: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {vehicleTypes.map(type => (
                        <option key={type.id} value={type.id}>{type.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Patente</label>
                    <input
                      type="text"
                      required
                      value={newVehicle.plate}
                      onChange={(e) => setNewVehicle({...newVehicle, plate: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Modelo</label>
                    <input
                      type="text"
                      required
                      value={newVehicle.model}
                      onChange={(e) => setNewVehicle({...newVehicle, model: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Capacidad</label>
                    <input
                      type="text"
                      required
                      value={newVehicle.capacity}
                      onChange={(e) => setNewVehicle({...newVehicle, capacity: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Conductor Asignado</label>
                    <select
                      required
                      value={newVehicle.driver}
                      onChange={(e) => setNewVehicle({...newVehicle, driver: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Seleccionar conductor</option>
                      {drivers.map(driver => (
                        <option key={driver} value={driver}>{driver}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Ubicación Base</label>
                  <select
                    required
                    value={newVehicle.location}
                    onChange={(e) => setNewVehicle({...newVehicle, location: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Seleccionar ubicación</option>
                    {locations.map(location => (
                      <option key={location.id} value={location.id}>{location.name}</option>
                    ))}
                  </select>
                </div>

                <div className="flex space-x-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Agregar Vehículo
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowVehicleForm(false)}
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

      {/* Add Maintenance Form Modal */}
      {showMaintenanceForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-full max-w-2xl shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Nuevo Mantenimiento</h3>
              <form onSubmit={handleAddMaintenance} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Vehículo</label>
                  <select
                    required
                    value={newMaintenance.vehicleId}
                    onChange={(e) => setNewMaintenance({...newMaintenance, vehicleId: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Seleccionar vehículo</option>
                    {vehicles.map(vehicle => (
                      <option key={vehicle.id} value={vehicle.id}>{vehicle.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Mantenimiento</label>
                  <select
                    value={newMaintenance.type}
                    onChange={(e) => setNewMaintenance({...newMaintenance, type: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="preventive">Preventivo</option>
                    <option value="corrective">Correctivo</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                  <textarea
                    required
                    value={newMaintenance.description}
                    onChange={(e) => setNewMaintenance({...newMaintenance, description: e.target.value})}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Costo (CLP)</label>
                    <input
                      type="number"
                      required
                      min="0"
                      value={newMaintenance.cost}
                      onChange={(e) => setNewMaintenance({...newMaintenance, cost: parseInt(e.target.value) || 0})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Técnico/Taller</label>
                    <input
                      type="text"
                      required
                      value={newMaintenance.technician}
                      onChange={(e) => setNewMaintenance({...newMaintenance, technician: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="flex space-x-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors"
                  >
                    Registrar Mantenimiento
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowMaintenanceForm(false)}
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

export default RouteManagement;