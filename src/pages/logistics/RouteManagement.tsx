import React, { useState } from 'react';
import { Route, MapPin, Clock, Fuel, TrendingDown, Plus, Play, Pause, CheckCircle, AlertTriangle } from 'lucide-react';

const RouteManagement: React.FC = () => {
  const [routes, setRoutes] = useState([
    {
      id: 'ROUTE-001',
      name: 'Ruta Centro Comercial',
      description: 'Ruta optimizada para zona centro de Punta Arenas',
      status: 'active',
      frequency: 'daily',
      distance: 15.2,
      estimatedTime: 45,
      fuelConsumption: 2.1,
      driver: 'Ana Pérez',
      vehicle: 'Camión Mercedes - Patente ABC123',
      stops: [
        { id: 1, name: 'Restaurant La Patagonia', address: 'Av. Colón 782', estimatedTime: 10, status: 'completed' },
        { id: 2, name: 'Café Central', address: 'Plaza Muñoz Gamero 1028', estimatedTime: 8, status: 'completed' },
        { id: 3, name: 'Hotel Cabo de Hornos', address: 'Plaza Muñoz Gamero 1025', estimatedTime: 12, status: 'in-progress' },
        { id: 4, name: 'Colegio San José', address: 'Calle Magallanes 960', estimatedTime: 15, status: 'pending' }
      ],
      savings: 22,
      lastOptimized: '2024-01-20',
      avgDeliveryTime: 42
    },
    {
      id: 'ROUTE-002',
      name: 'Ruta Industrial Norte',
      description: 'Ruta para zona industrial y empresas del norte',
      status: 'active',
      frequency: 'weekly',
      distance: 28.5,
      estimatedTime: 85,
      fuelConsumption: 4.2,
      driver: 'Carlos Mendoza',
      vehicle: 'Camión Isuzu - Patente DEF456',
      stops: [
        { id: 1, name: 'Hospital Regional', address: 'Av. Manuel Bulnes 1425', estimatedTime: 20, status: 'pending' },
        { id: 2, name: 'Zona Franca', address: 'Av. Bulnes Km 3.5', estimatedTime: 25, status: 'pending' },
        { id: 3, name: 'Puerto Comercial', address: 'Muelle Prat s/n', estimatedTime: 30, status: 'pending' },
        { id: 4, name: 'Aeropuerto', address: 'Ruta 9 Norte Km 20', estimatedTime: 10, status: 'pending' }
      ],
      savings: 18,
      lastOptimized: '2024-01-19',
      avgDeliveryTime: 78
    },
    {
      id: 'ROUTE-003',
      name: 'Ruta Residencial Sur',
      description: 'Entregas a domicilio zona residencial sur',
      status: 'planning',
      frequency: 'on-demand',
      distance: 12.8,
      estimatedTime: 35,
      fuelConsumption: 1.8,
      driver: 'Sin asignar',
      vehicle: 'Sin asignar',
      stops: [
        { id: 1, name: 'Villa Las Flores', address: 'Pasaje Los Aromos 123', estimatedTime: 8, status: 'pending' },
        { id: 2, name: 'Barrio Punta Arenas', address: 'Calle Libertad 456', estimatedTime: 10, status: 'pending' },
        { id: 3, name: 'Sector Río Seco', address: 'Av. Río Seco 789', estimatedTime: 12, status: 'pending' },
        { id: 4, name: 'Villa Tehuelche', address: 'Calle Tehuelche 321', estimatedTime: 5, status: 'pending' }
      ],
      savings: 15,
      lastOptimized: '2024-01-18',
      avgDeliveryTime: 32
    }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState<string | null>(null);
  const [newRoute, setNewRoute] = useState({
    name: '',
    description: '',
    frequency: 'daily',
    driver: '',
    vehicle: ''
  });

  const drivers = ['Ana Pérez', 'Carlos Mendoza', 'Luis Martínez', 'Roberto Silva'];
  const vehicles = [
    'Camión Mercedes - Patente ABC123',
    'Camión Isuzu - Patente DEF456', 
    'Furgón Ford - Patente GHI789',
    'Camioneta Toyota - Patente JKL012'
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'planning': return 'bg-yellow-100 text-yellow-800';
      case 'paused': return 'bg-gray-100 text-gray-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <Play className="h-4 w-4" />;
      case 'planning': return <Clock className="h-4 w-4" />;
      case 'paused': return <Pause className="h-4 w-4" />;
      case 'completed': return <CheckCircle className="h-4 w-4" />;
      case 'in-progress': return <Play className="h-4 w-4" />;
      case 'pending': return <Clock className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const getFrequencyText = (frequency: string) => {
    switch (frequency) {
      case 'daily': return 'Diaria';
      case 'weekly': return 'Semanal';
      case 'on-demand': return 'Bajo Demanda';
      default: return 'Sin definir';
    }
  };

  const handleAddRoute = (e: React.FormEvent) => {
    e.preventDefault();
    const id = `ROUTE-${String(routes.length + 1).padStart(3, '0')}`;
    setRoutes([...routes, {
      ...newRoute,
      id,
      status: 'planning',
      distance: 0,
      estimatedTime: 0,
      fuelConsumption: 0,
      stops: [],
      savings: 0,
      lastOptimized: new Date().toISOString().split('T')[0],
      avgDeliveryTime: 0
    }]);
    setNewRoute({
      name: '',
      description: '',
      frequency: 'daily',
      driver: '',
      vehicle: ''
    });
    setShowForm(false);
  };

  const optimizeRoute = (routeId: string) => {
    setRoutes(routes.map(route => 
      route.id === routeId 
        ? { ...route, lastOptimized: new Date().toISOString().split('T')[0], savings: route.savings + 5 }
        : route
    ));
    alert('Ruta optimizada exitosamente');
  };

  const startRoute = (routeId: string) => {
    setRoutes(routes.map(route => 
      route.id === routeId ? { ...route, status: 'active' } : route
    ));
  };

  const totalRoutes = routes.length;
  const activeRoutes = routes.filter(route => route.status === 'active').length;
  const totalDistance = routes.reduce((sum, route) => sum + route.distance, 0);
  const avgSavings = routes.reduce((sum, route) => sum + route.savings, 0) / routes.length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <h2 className="text-2xl font-bold text-gray-900">Gestión de Rutas</h2>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors mt-4 sm:mt-0"
        >
          <Plus className="h-5 w-5" />
          <span>Nueva Ruta</span>
        </button>
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
            <h3 className="text-sm font-medium text-gray-500">Total Rutas</h3>
            <p className="text-2xl font-bold text-blue-600 mt-1">{totalRoutes}</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="p-2 rounded-lg bg-green-50">
              <Play className="h-6 w-6 text-green-600" />
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
            <p className="text-2xl font-bold text-orange-600 mt-1">{avgSavings.toFixed(1)}%</p>
          </div>
        </div>
      </div>

      {/* Routes List */}
      <div className="space-y-4">
        {routes.map((route) => (
          <div key={route.id} className="bg-white rounded-lg shadow-sm border border-gray-100">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{route.name}</h3>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(route.status)}`}>
                      {getStatusIcon(route.status)}
                      <span className="ml-1">
                        {route.status === 'active' ? 'Activa' :
                         route.status === 'planning' ? 'Planificación' :
                         route.status === 'paused' ? 'Pausada' : 'Completada'}
                      </span>
                    </span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {getFrequencyText(route.frequency)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{route.description}</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
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
                      {route.fuelConsumption}L
                    </div>
                    <div className="flex items-center text-green-600">
                      <TrendingDown className="h-4 w-4 mr-1" />
                      -{route.savings}% ahorro
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2 ml-4">
                  <button
                    onClick={() => optimizeRoute(route.id)}
                    className="px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                  >
                    Optimizar
                  </button>
                  {route.status === 'planning' && (
                    <button
                      onClick={() => startRoute(route.id)}
                      className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                    >
                      Activar
                    </button>
                  )}
                </div>
              </div>

              {/* Route Details */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Asignación</h4>
                  <div className="space-y-1 text-sm">
                    <div>
                      <span className="text-gray-500">Conductor:</span>
                      <span className="font-medium ml-2">{route.driver || 'Sin asignar'}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Vehículo:</span>
                      <span className="font-medium ml-2">{route.vehicle || 'Sin asignar'}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Última optimización:</span>
                      <span className="font-medium ml-2">{route.lastOptimized}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Paradas de la Ruta</h4>
                  <div className="space-y-1">
                    {route.stops.map((stop, index) => (
                      <div key={stop.id} className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-2">
                          <span className="flex items-center justify-center w-5 h-5 bg-blue-100 text-blue-800 rounded-full text-xs">
                            {index + 1}
                          </span>
                          <span className="text-gray-700">{stop.name}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-gray-500">{stop.estimatedTime}min</span>
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(stop.status)}`}>
                            {getStatusIcon(stop.status)}
                          </span>
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

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Conductor</label>
                    <select
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
                    <label className="block text-sm font-medium text-gray-700 mb-1">Vehículo</label>
                    <select
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