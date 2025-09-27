import React, { useState } from 'react';
import { MapPin, Clock, CheckCircle, Truck, Route, Package, AlertTriangle } from 'lucide-react';

const DeliveryModule: React.FC = () => {
  const [orders, setOrders] = useState([
    { id: 'PED-001', customer: 'Restaurant La Patagonia', address: 'Av. Colón 782, Punta Arenas', status: 'pending', priority: 'high', items: 12, value: 89500, estimatedTime: 25, driver: '', vehicle: '' },
    { id: 'PED-002', customer: 'Café Central', address: 'Plaza Muñoz Gamero 1028', status: 'on-route', priority: 'medium', items: 8, value: 45200, estimatedTime: 15, driver: 'Ana Pérez', vehicle: 'PAT-001' },
    { id: 'PED-003', customer: 'Hospital Regional', address: 'Av. Manuel Bulnes 1425', status: 'delivered', priority: 'high', items: 25, value: 156000, estimatedTime: 30, driver: 'Carlos Mendoza', vehicle: 'PAT-002' },
    { id: 'PED-004', customer: 'Colegio San José', address: 'Calle Magallanes 960', status: 'pending', priority: 'low', items: 15, value: 78300, estimatedTime: 20, driver: '', vehicle: '' },
    { id: 'PED-005', customer: 'Hotel Cabo de Hornos', address: 'Plaza Muñoz Gamero 1025', status: 'on-route', priority: 'medium', items: 20, value: 134700, estimatedTime: 18, driver: 'Luis Martínez', vehicle: 'PAT-003' }
  ]);

  const [drivers] = useState([
    { id: 'DRV-001', name: 'Ana Pérez', status: 'available', currentOrder: '', vehicle: 'PAT-001' },
    { id: 'DRV-002', name: 'Carlos Mendoza', status: 'busy', currentOrder: 'PED-002', vehicle: 'PAT-002' },
    { id: 'DRV-003', name: 'Luis Martínez', status: 'busy', currentOrder: 'PED-005', vehicle: 'PAT-003' }
  ]);

  const updateOrderStatus = (orderId: string, newStatus: string) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  const assignDriver = (orderId: string, driverId: string) => {
    const driver = drivers.find(d => d.id === driverId);
    if (driver) {
      setOrders(orders.map(order => 
        order.id === orderId 
          ? { ...order, driver: driver.name, vehicle: driver.vehicle, status: 'assigned' }
          : order
      ));
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'assigned': return 'bg-blue-100 text-blue-800';
      case 'on-route': return 'bg-purple-100 text-purple-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'delayed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'assigned': return <Package className="h-4 w-4" />;
      case 'on-route': return <Truck className="h-4 w-4" />;
      case 'delivered': return <CheckCircle className="h-4 w-4" />;
      case 'delayed': return <AlertTriangle className="h-4 w-4" />;
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

  const getDriverStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-800';
      case 'busy': return 'bg-red-100 text-red-800';
      case 'break': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const pendingOrders = orders.filter(o => o.status === 'pending').length;
  const onRouteOrders = orders.filter(o => o.status === 'on-route').length;
  const deliveredOrders = orders.filter(o => o.status === 'delivered').length;
  const totalValue = orders.reduce((sum, order) => sum + order.value, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <h2 className="text-2xl font-bold text-gray-900">Gestión de Repartos</h2>
        <div className="flex space-x-3 mt-4 sm:mt-0">
          <select className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Todos los estados</option>
            <option>Pendiente</option>
            <option>En ruta</option>
            <option>Entregado</option>
          </select>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="p-2 rounded-lg bg-yellow-50">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-500">Pendientes</h3>
            <p className="text-2xl font-bold text-yellow-600 mt-1">{pendingOrders}</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="p-2 rounded-lg bg-blue-50">
              <Truck className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-500">En Ruta</h3>
            <p className="text-2xl font-bold text-blue-600 mt-1">{onRouteOrders}</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="p-2 rounded-lg bg-green-50">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-500">Entregadas</h3>
            <p className="text-2xl font-bold text-green-600 mt-1">{deliveredOrders}</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="p-2 rounded-lg bg-purple-50">
              <Package className="h-6 w-6 text-purple-600" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-500">Valor Total</h3>
            <p className="text-2xl font-bold text-purple-600 mt-1">CLP ${totalValue.toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* Map Placeholder */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Mapa de Entregas en Tiempo Real</h3>
        <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center">
          <div className="text-center">
            <MapPin className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">Vista de mapa interactivo</p>
            <p className="text-sm text-gray-400">Rutas optimizadas y ubicaciones de entrega en tiempo real</p>
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
                             order.status === 'assigned' ? 'Asignado' :
                             order.status === 'on-route' ? 'En Ruta' : 
                             order.status === 'delivered' ? 'Entregado' : 'Retrasado'}
                          </span>
                        </span>
                      </div>
                      <p className="text-sm font-medium text-gray-700">{order.customer}</p>
                      <p className="text-sm text-gray-500 mb-2">{order.address}</p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm text-gray-500">
                        <span>{order.items} items</span>
                        <span>CLP ${order.value.toLocaleString()}</span>
                        <span>{order.estimatedTime} min</span>
                        <span>{order.driver || 'Sin asignar'}</span>
                      </div>
                    </div>
                    <div className="flex flex-col space-y-2 ml-4">
                      {order.status === 'pending' && (
                        <>
                          <select 
                            onChange={(e) => assignDriver(order.id, e.target.value)}
                            className="text-sm border border-gray-300 rounded px-2 py-1"
                          >
                            <option value="">Asignar conductor</option>
                            {drivers.filter(d => d.status === 'available').map(driver => (
                              <option key={driver.id} value={driver.id}>{driver.name}</option>
                            ))}
                          </select>
                          <button
                            onClick={() => updateOrderStatus(order.id, 'on-route')}
                            className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                          >
                            Despachar
                          </button>
                        </>
                      )}
                      {order.status === 'on-route' && (
                        <button
                          onClick={() => updateOrderStatus(order.id, 'delivered')}
                          className="px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                        >
                          Marcar Entregado
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Drivers Status */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Estado de Conductores</h3>
            <div className="space-y-3">
              {drivers.map((driver) => (
                <div key={driver.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">{driver.name}</h4>
                    <p className="text-xs text-gray-500">{driver.vehicle}</p>
                    {driver.currentOrder && (
                      <p className="text-xs text-blue-600">Orden: {driver.currentOrder}</p>
                    )}
                  </div>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getDriverStatusColor(driver.status)}`}>
                    {driver.status === 'available' ? 'Disponible' :
                     driver.status === 'busy' ? 'Ocupado' : 'En Descanso'}
                  </span>
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
                <span className="font-medium text-green-600">{deliveredOrders}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">En ruta:</span>
                <span className="font-medium text-blue-600">{onRouteOrders}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Pendientes:</span>
                <span className="font-medium text-yellow-600">{pendingOrders}</span>
              </div>
              <hr className="my-3" />
              <div className="flex justify-between font-semibold">
                <span className="text-gray-900">Valor total:</span>
                <span>CLP ${totalValue.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryModule;