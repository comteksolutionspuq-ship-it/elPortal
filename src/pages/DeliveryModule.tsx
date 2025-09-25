import React, { useState } from 'react';
import { MapPin, Clock, CheckCircle, Truck, Route } from 'lucide-react';

const DeliveryModule: React.FC = () => {
  const [orders, setOrders] = useState([
    { id: 'PED-001', customer: 'Restaurant La Patagonia', address: 'Av. Colón 782, Punta Arenas', status: 'pending', priority: 'high', items: 12, value: 89500 },
    { id: 'PED-002', customer: 'Café Central', address: 'Plaza Muñoz Gamero 1028', status: 'on-route', priority: 'medium', items: 8, value: 45200 },
    { id: 'PED-003', customer: 'Hospital Regional', address: 'Av. Manuel Bulnes 1425', status: 'delivered', priority: 'high', items: 25, value: 156000 },
    { id: 'PED-004', customer: 'Colegio San José', address: 'Calle Magallanes 960', status: 'pending', priority: 'low', items: 15, value: 78300 },
    { id: 'PED-005', customer: 'Hotel Cabo de Hornos', address: 'Plaza Muñoz Gamero 1025', status: 'on-route', priority: 'medium', items: 20, value: 134700 }
  ]);

  const routes = [
    { id: 'RUTA-1', name: 'Ruta Centro', orders: ['PED-001', 'PED-002'], distance: '12.5 km', time: '45 min', savings: '15%' },
    { id: 'RUTA-2', name: 'Ruta Norte', orders: ['PED-004', 'PED-005'], distance: '18.2 km', time: '52 min', savings: '22%' },
  ];

  const updateOrderStatus = (orderId: string, newStatus: string) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'on-route': return 'bg-blue-100 text-blue-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'on-route': return <Truck className="h-4 w-4" />;
      case 'delivered': return <CheckCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
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

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <h2 className="text-2xl font-bold text-gray-900">Módulo de Repartos</h2>
        <div className="flex space-x-3 mt-4 sm:mt-0">
          <select className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Todos los estados</option>
            <option>Pendiente</option>
            <option>En ruta</option>
            <option>Entregado</option>
          </select>
        </div>
      </div>

      {/* Map Placeholder */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Mapa de Rutas</h3>
        <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center">
          <div className="text-center">
            <MapPin className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">Vista de mapa interactivo</p>
            <p className="text-sm text-gray-400">Rutas optimizadas y ubicaciones de entrega</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Orders List */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Órdenes de Entrega</h3>
            </div>
            <div className="divide-y divide-gray-200">
              {orders.map((order) => (
                <div key={order.id} className={`p-6 border-l-4 ${getPriorityColor(order.priority)}`}>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="font-semibold text-gray-900">{order.id}</h4>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                          {getStatusIcon(order.status)}
                          <span className="ml-1 capitalize">
                            {order.status === 'pending' ? 'Pendiente' : 
                             order.status === 'on-route' ? 'En Ruta' : 'Entregado'}
                          </span>
                        </span>
                      </div>
                      <p className="text-sm font-medium text-gray-700">{order.customer}</p>
                      <p className="text-sm text-gray-500 mb-2">{order.address}</p>
                      <div className="flex space-x-4 text-sm text-gray-500">
                        <span>{order.items} items</span>
                        <span>CLP ${order.value.toLocaleString()}</span>
                      </div>
                    </div>
                    <div className="flex flex-col space-y-2 ml-4">
                      {order.status === 'pending' && (
                        <button
                          onClick={() => updateOrderStatus(order.id, 'on-route')}
                          className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                        >
                          Despachar
                        </button>
                      )}
                      {order.status === 'on-route' && (
                        <button
                          onClick={() => updateOrderStatus(order.id, 'delivered')}
                          className="px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                        >
                          Entregar
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Route Optimization */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Optimización de Rutas</h3>
            <div className="space-y-4">
              {routes.map((route) => (
                <div key={route.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900">{route.name}</h4>
                    <span className="text-sm text-green-600 font-medium">-{route.savings}</span>
                  </div>
                  <div className="text-sm text-gray-600 space-y-1">
                    <div className="flex justify-between">
                      <span>Distancia:</span>
                      <span>{route.distance}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tiempo est.:</span>
                      <span>{route.time}</span>
                    </div>
                    <div className="mt-2">
                      <span className="text-xs text-gray-500">Órdenes: {route.orders.join(', ')}</span>
                    </div>
                  </div>
                  <button className="w-full mt-3 px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
                    <Route className="h-4 w-4 inline mr-2" />
                    Aplicar Ruta
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Statistics */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Estadísticas del Día</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Total órdenes:</span>
                <span className="font-medium">{orders.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Entregadas:</span>
                <span className="font-medium text-green-600">{orders.filter(o => o.status === 'delivered').length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">En ruta:</span>
                <span className="font-medium text-blue-600">{orders.filter(o => o.status === 'on-route').length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Pendientes:</span>
                <span className="font-medium text-yellow-600">{orders.filter(o => o.status === 'pending').length}</span>
              </div>
              <hr className="my-3" />
              <div className="flex justify-between font-semibold">
                <span className="text-gray-900">Valor total:</span>
                <span>CLP ${orders.reduce((sum, order) => sum + order.value, 0).toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryModule;