import React, { useState } from 'react';
import { Route, MapPin, Clock, Fuel, TrendingDown, Plus, CreditCard as Edit, Trash2, Navigation, Zap } from 'lucide-react';

const RouteManagement: React.FC = () => {
  const [routes, setRoutes] = useState([
    {
      id: 'ROUTE-001',
      name: 'Ruta Centro Comercial',
      description: 'Ruta optimizada para zona centro y comercial',
      status: 'active',
      priority: 'high',
      distance: 12.5,
      estimatedTime: 45,
      fuelCost: 2500,
      stops: [
        { id: 1, name: 'Restaurant La Patagonia', address: 'Av. Colón 782', order: 'PED-001', estimatedTime: 10 },
        { id: 2, name: 'Café Central', address: 'Plaza Muñoz Gamero 1028', order: 'PED-002', estimatedTime: 8 },
        { id: 3, name: 'Hotel Cabo de Hornos', address: 'Plaza Muñoz Gamero 1025', order: 'PED-005', estimatedTime: 12 }
      ],
      driver: 'Ana Pérez',
      vehicle: 'Camión Mercedes - PAT-001',
      optimizationSavings: 15,
      lastUsed: '2024-01-20',
      frequency: 'daily'
    },
    {
      id: 'ROUTE-002',
      name: 'Ruta Norte Industrial',
      description: 'Cobertura zona norte e industrial',
      status: 'active',
      priority: 'medium',
      distance: 18.2,
      estimatedTime: 52,
      fuelCost: 3200,
      stops: [
        { id: 1, name: 'Hospital Regional', address: 'Av. Manuel Bulnes 1425', order: 'PED-003', estimatedTime: 15 },
        { id: 2, name: 'Colegio San José', address: 'Calle Magallanes 960', order: 'PED-004', estimatedTime: 10 },
        { id: 3, name: 'Empresa Constructora Sur', address: 'Zona Industrial Norte', order: 'PED-006', estimatedTime: 20 }
      ],
      driver: 'Carlos Mendoza',
      vehicle: 'Camioneta Ford - PAT-002',
      optimizationSavings: 22,
      lastUsed: '2024-01-19',
      frequency: 'weekly'
    },
    {
      id: 'ROUTE-003',
      name: 'Ruta Express Urgente',
      description: 'Ruta para entregas urgentes y de alta prioridad',
      status: 'standby',
      priority: 'high',
      distance: 8.7,
      estimatedTime: 25,
      fuelCost: 1800,
      stops: [
        { id: 1, name: 'Clínica Magallanes', address: 'Av. España 1532', order: 'PED-007', estimatedTime: 8 }
      ],
      driver: 'Luis Martínez',
      vehicle: 'Moto Delivery - PAT-003',
      optimizationSavings: 35,
      lastUsed: '2024-01-18',
      frequency: 'on-demand'
    }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState<string | null>(null);
  const [newRoute, setNewRoute] = useState({
    name: '',
    description: '',
    priority: 'medium',
    driver: '',
    vehicle: '',
    frequency: 'daily'
  });

  const drivers = ['Ana Pérez', 'Carlos Mendoza', 'Luis Martínez', 'Roberto Silva'];
  const vehicles = [
    'Camión Mercedes - PAT-001',
    'Camioneta Ford - PAT-002', 
    'Moto Delivery - PAT-003',
    'Van Hyundai - PAT-004'
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'standby': return 'bg-yellow-100 text-yellow-800';
      case 'maintenance': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-l-red-500';
      case 'medium': return 'border-l-yellow-500';
      case 'low': return 'border-l-green-500';
      default: return 'border-l-gray-500';
    }
  };

  const getFrequencyColor = (frequency: string) => {
    switch (frequency) {
      case 'daily': return 'bg-blue-100 text-blue-800';
      case 'weekly': return 'bg-purple-100 text-purple-800';
      case 'on-demand': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleAddRoute = (e: React.FormEvent) => {
    e.preventDefault();
    const id = `ROUTE-${String(routes.length + 1).padStart(3, '0')}`;
    setRoutes([...routes, {
      ...newRoute,
      id,
      status: 'standby',
      distance: 0,
      estimatedTime: 0,
      fuelCost: 0,
      stops: [],
      optimizationSavings: 0,
      lastUsed: ''
    }]);
    setNewRoute({
      name: '',
      description: '',
      priority: 'medium',
      driver: '',
      vehicle: '',
      frequency: 'daily'
    });
    setShowForm(false);
  };

  const deleteRoute = (id: string) => {
    setRoutes(routes.filter(route => route.id !== id));
  };

  const optimizeRoute = (id: string) => {
    alert(`Optimizando ruta ${id}...`);
  };

  const totalRoutes = routes.length;
  const activeRoutes = routes.filter(r => r.status === 'active').length;
  const totalDistance = routes.reduce((sum, route) => sum + route.distance, 0);
  const averageSavings = routes.reduce((sum, route) => sum + route.optimizationSavings, 0) / routes.length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <h2 className="text-2xl font-bold text-gray-900">Planificación de Rutas</h2>
        <div className="flex space-x-3 mt-4 sm:mt-0">
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="h-5 w-5" />
            <span>Nueva Ruta</span>
          </button>
          <button className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
            <Zap className="h-5 w-5" />
            <span>Optimizar Todas</span>
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="p-2 rounded-lg bg-blue-50">
              <Route className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-500">Rutas Totales</h3>
            <p className="text-2xl font-bold text-blue-600 mt-1">{totalRoutes}</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="p-2 rounded-lg bg-green-50">
              <Navigation className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-500">Rutas Activas</h3>
            <p className="text-2xl font-bold text-green-600 mt-1">{activeRoutes}</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="p-2 rounded-lg bg-purple-50">
              <MapPin className="h-6 w-6 text-purple-600" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-500">Distancia Total</h3>
            <p className="text-2xl font-bold text-purple-600 mt-1">{totalDistance.toFixed(1)} km</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="p-2 rounded-lg bg-orange-50">
              <TrendingDown className="h-6 w-6 text-orange-600" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-500">Ahorro Promedio</h3>
            <p className="text-2xl font-bold text-orange-600 mt-1">{averageSavings.toFixed(1)}%</p>
          </div>
        </div>
      </div>

      {/* Routes List */}
      <div className="space-y-4">
        {routes.map((route) => (
          <div key={route.id} className={`bg-white rounded-lg shadow-sm border border-gray-100 border-l-4 ${getPriorityColor(route.priority)}`}>
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{route.name}</h3>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(route.status)}`}>
                      {route.status === 'active' ? 'Activa' : 
                       route.status === 'standby' ? 'En Espera' : 'Mantenimiento'}
                    </span>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getFrequencyColor(route.frequency)}`}>
                      {route.frequency === 'daily' ? 'Diaria' :
                       route.frequency === 'weekly' ? 'Semanal' : 'Bajo Demanda'}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{route.description}</p>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                    <div className="flex items-center text-gray-500">
                      <MapPin className="h-4 w-4 mr-1" />
                      {route.distance} km
                    </div>
                    <div className="flex items-center text-gray-500">
                      <Clock className="h-4 w-4 mr-1" />
                      {route.estimatedTime} min
                    </div>
                    <div className="flex items-center text-gray-500">
                      <Fuel className="h-4 w-4 mr-1" />
                      CLP ${route.fuelCost.toLocaleString()}
                    </div>
                    <div className="flex items-center text-gray-500">
                      <TrendingDown className="h-4 w-4 mr-1" />
                      -{route.optimizationSavings}% ahorro
                    </div>
                    <div className="text-gray-500">
                      {route.stops.length} paradas
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2 ml-4">
                  <button 
                    onClick={() => optimizeRoute(route.id)}
                    className="text-green-600 hover:text-green-900"
                  >
                    <Zap className="h-4 w-4" />
                  </button>
                  <button className="text-blue-600 hover:text-blue-900">
                    <Edit className="h-4 w-4" />
                  </button>
                  <button 
                    onClick={() => deleteRoute(route.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Route Details */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-3">Información del Conductor</h4>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="text-sm">
                      <span className="text-gray-500">Conductor:</span>
                      <span className="font-medium ml-2">{route.driver}</span>
                    </div>
                    <div className="text-sm mt-1">
                      <span className="text-gray-500">Vehículo:</span>
                      <span className="font-medium ml-2">{route.vehicle}</span>
                    </div>
                    <div className="text-sm mt-1">
                      <span className="text-gray-500">Último uso:</span>
                      <span className="font-medium ml-2">{route.lastUsed || 'Nunca'}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-3">Paradas de la Ruta</h4>
                  <div className="space-y-2">
                    {route.stops.map((stop, index) => (
                      <div key={stop.id} className="flex items-center justify-between text-sm bg-gray-50 rounded-lg p-2">
                        <div className="flex items-center space-x-2">
                          <span className="flex items-center justify-center w-5 h-5 bg-blue-100 text-blue-800 rounded-full text-xs font-bold">
                            {index + 1}
                          </span>
                          <div>
                            <span className="font-medium text-gray-900">{stop.name}</span>
                            <p className="text-xs text-gray-500">{stop.address}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-xs text-gray-500">{stop.estimatedTime} min</span>
                          <p className="text-xs text-blue-600">{stop.order}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Route Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-full max-w-2xl shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Nueva Ruta</h3>
              <form onSubmit={handleAddRoute} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nombre de la Ruta</label>
                  <input
                    type="text"
                    required
                    value={newRoute.name}
                    onChange={(e) => setNewRoute({...newRoute, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                  <textarea
                    required
                    value={newRoute.description}
                    onChange={(e) => setNewRoute({...newRoute, description: e.target.value})}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Prioridad</label>
                    <select
                      value={newRoute.priority}
                      onChange={(e) => setNewRoute({...newRoute, priority: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="low">Baja</option>
                      <option value="medium">Media</option>
                      <option value="high">Alta</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Frecuencia</label>
                    <select
                      value={newRoute.frequency}
                      onChange={(e) => setNewRoute({...newRoute, frequency: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="daily">Diaria</option>
                      <option value="weekly">Semanal</option>
                      <option value="on-demand">Bajo Demanda</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Conductor Asignado</label>
                    <select
                      required
                      value={newRoute.driver}
                      onChange={(e) => setNewRoute({...newRoute, driver: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Seleccionar conductor</option>
                      {drivers.map(driver => (
                        <option key={driver} value={driver}>{driver}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Vehículo Asignado</label>
                    <select
                      required
                      value={newRoute.vehicle}
                      onChange={(e) => setNewRoute({...newRoute, vehicle: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Seleccionar vehículo</option>
                      {vehicles.map(vehicle => (
                        <option key={vehicle} value={vehicle}>{vehicle}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex space-x-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Crear Ruta
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

export default RouteManagement;