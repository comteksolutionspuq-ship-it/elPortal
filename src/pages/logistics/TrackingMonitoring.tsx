import React, { useState } from 'react';
import { MapPin, Clock, CheckCircle, Truck, Package, AlertTriangle, Eye, Navigation } from 'lucide-react';

const TrackingMonitoring: React.FC = () => {
  const [deliveries, setDeliveries] = useState([
    {
      id: 'DEL-001',
      orderId: 'PED-001',
      customer: 'Restaurant La Patagonia',
      address: 'Av. Colón 782, Punta Arenas',
      driver: 'Ana Pérez',
      vehicle: 'Mercedes ABC-123',
      status: 'in-transit',
      priority: 'high',
      estimatedArrival: '14:30',
      actualArrival: null,
      distance: 8.5,
      progress: 65,
      lastUpdate: '14:15',
      coordinates: { lat: -53.1638, lng: -70.9171 },
      route: 'ROUTE-001'
    },
    {
      id: 'DEL-002',
      orderId: 'PED-002',
      customer: 'Café Central',
      address: 'Plaza Muñoz Gamero 1028',
      driver: 'Carlos Mendoza',
      vehicle: 'Isuzu DEF-456',
      status: 'delivered',
      priority: 'medium',
      estimatedArrival: '13:45',
      actualArrival: '13:42',
      distance: 12.2,
      progress: 100,
      lastUpdate: '13:42',
      coordinates: { lat: -53.1559, lng: -70.9109 },
      route: 'ROUTE-001'
    },
    {
      id: 'DEL-003',
      orderId: 'PED-003',
      customer: 'Hospital Regional',
      address: 'Av. Manuel Bulnes 1425',
      driver: 'Luis Martínez',
      vehicle: 'Ford GHI-789',
      status: 'preparing',
      priority: 'high',
      estimatedArrival: '15:20',
      actualArrival: null,
      distance: 15.8,
      progress: 15,
      lastUpdate: '14:10',
      coordinates: { lat: -53.1478, lng: -70.9147 },
      route: 'ROUTE-002'
    },
    {
      id: 'DEL-004',
      orderId: 'PED-004',
      customer: 'Colegio San José',
      address: 'Calle Magallanes 960',
      driver: 'Ana Pérez',
      vehicle: 'Mercedes ABC-123',
      status: 'delayed',
      priority: 'low',
      estimatedArrival: '16:00',
      actualArrival: null,
      distance: 6.3,
      progress: 45,
      lastUpdate: '15:30',
      coordinates: { lat: -53.1521, lng: -70.9085 },
      route: 'ROUTE-001'
    }
  ]);

  const [selectedDelivery, setSelectedDelivery] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'preparing': return 'bg-yellow-100 text-yellow-800';
      case 'in-transit': return 'bg-blue-100 text-blue-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'delayed': return 'bg-red-100 text-red-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'preparing': return <Package className="h-4 w-4" />;
      case 'in-transit': return <Truck className="h-4 w-4" />;
      case 'delivered': return <CheckCircle className="h-4 w-4" />;
      case 'delayed': return <AlertTriangle className="h-4 w-4" />;
      case 'failed': return <AlertTriangle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'preparing': return 'Preparando';
      case 'in-transit': return 'En Tránsito';
      case 'delivered': return 'Entregado';
      case 'delayed': return 'Retrasado';
      case 'failed': return 'Fallido';
      default: return 'Sin estado';
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

  const updateDeliveryStatus = (deliveryId: string, newStatus: string) => {
    setDeliveries(deliveries.map(delivery => 
      delivery.id === deliveryId 
        ? { 
            ...delivery, 
            status: newStatus,
            actualArrival: newStatus === 'delivered' ? new Date().toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit' }) : delivery.actualArrival,
            progress: newStatus === 'delivered' ? 100 : delivery.progress,
            lastUpdate: new Date().toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit' })
          }
        : delivery
    ));
  };

  const totalDeliveries = deliveries.length;
  const inTransit = deliveries.filter(d => d.status === 'in-transit').length;
  const delivered = deliveries.filter(d => d.status === 'delivered').length;
  const delayed = deliveries.filter(d => d.status === 'delayed').length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <h2 className="text-2xl font-bold text-gray-900">Tracking y Monitoreo</h2>
        <div className="flex space-x-2 mt-4 sm:mt-0">
          <button
            onClick={() => setViewMode('list')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              viewMode === 'list'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Lista
          </button>
          <button
            onClick={() => setViewMode('map')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              viewMode === 'map'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Mapa
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="p-2 rounded-lg bg-blue-50">
              <Package className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-500">Total Entregas</h3>
            <p className="text-2xl font-bold text-blue-600 mt-1">{totalDeliveries}</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="p-2 rounded-lg bg-orange-50">
              <Truck className="h-6 w-6 text-orange-600" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-500">En Tránsito</h3>
            <p className="text-2xl font-bold text-orange-600 mt-1">{inTransit}</p>
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
            <p className="text-2xl font-bold text-green-600 mt-1">{delivered}</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="p-2 rounded-lg bg-red-50">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-500">Retrasadas</h3>
            <p className="text-2xl font-bold text-red-600 mt-1">{delayed}</p>
          </div>
        </div>
      </div>

      {viewMode === 'map' && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Mapa de Entregas en Tiempo Real</h3>
          <div className="bg-gray-100 rounded-lg h-96 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">Vista de Mapa Interactivo</p>
              <p className="text-sm text-gray-400">Ubicaciones en tiempo real de vehículos y entregas</p>
              <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div className="flex items-center justify-center">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                  <span>En Tránsito</span>
                </div>
                <div className="flex items-center justify-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                  <span>Entregado</span>
                </div>
                <div className="flex items-center justify-center">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                  <span>Preparando</span>
                </div>
                <div className="flex items-center justify-center">
                  <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                  <span>Retrasado</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {viewMode === 'list' && (
        <div className="space-y-4">
          {deliveries.map((delivery) => (
            <div key={delivery.id} className={`bg-white rounded-lg shadow-sm border border-gray-100 border-l-4 ${getPriorityColor(delivery.priority)}`}>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{delivery.id}</h3>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(delivery.status)}`}>
                        {getStatusIcon(delivery.status)}
                        <span className="ml-1">{getStatusText(delivery.status)}</span>
                      </span>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        delivery.priority === 'high' ? 'bg-red-100 text-red-800' :
                        delivery.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {delivery.priority === 'high' ? 'Alta' : delivery.priority === 'medium' ? 'Media' : 'Baja'} Prioridad
                      </span>
                    </div>
                    <p className="text-sm font-medium text-gray-700">{delivery.customer}</p>
                    <p className="text-sm text-gray-500 mb-2">{delivery.address}</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div className="flex items-center text-gray-500">
                        <Truck className="h-4 w-4 mr-1" />
                        {delivery.driver}
                      </div>
                      <div className="flex items-center text-gray-500">
                        <Navigation className="h-4 w-4 mr-1" />
                        {delivery.vehicle}
                      </div>
                      <div className="flex items-center text-gray-500">
                        <MapPin className="h-4 w-4 mr-1" />
                        {delivery.distance} km
                      </div>
                      <div className="flex items-center text-gray-500">
                        <Clock className="h-4 w-4 mr-1" />
                        ETA: {delivery.estimatedArrival}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 ml-4">
                    <button className="text-blue-600 hover:text-blue-900">
                      <Eye className="h-4 w-4" />
                    </button>
                    {delivery.status === 'in-transit' && (
                      <button
                        onClick={() => updateDeliveryStatus(delivery.id, 'delivered')}
                        className="px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                      >
                        Marcar Entregado
                      </button>
                    )}
                    {delivery.status === 'preparing' && (
                      <button
                        onClick={() => updateDeliveryStatus(delivery.id, 'in-transit')}
                        className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                      >
                        Iniciar Entrega
                      </button>
                    )}
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Progreso de Entrega</span>
                    <span className="font-medium">{delivery.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        delivery.status === 'delivered' ? 'bg-green-600' :
                        delivery.status === 'delayed' ? 'bg-red-600' :
                        delivery.status === 'in-transit' ? 'bg-blue-600' : 'bg-yellow-600'
                      }`}
                      style={{ width: `${delivery.progress}%` }}
                    ></div>
                  </div>
                </div>

                {/* Delivery Timeline */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Estado de la Entrega</h4>
                    <div className="space-y-2">
                      <div className={`flex items-center text-sm ${delivery.progress >= 25 ? 'text-green-600' : 'text-gray-400'}`}>
                        <CheckCircle className="h-4 w-4 mr-2" />
                        <span>Pedido preparado</span>
                      </div>
                      <div className={`flex items-center text-sm ${delivery.progress >= 50 ? 'text-green-600' : 'text-gray-400'}`}>
                        <CheckCircle className="h-4 w-4 mr-2" />
                        <span>En ruta</span>
                      </div>
                      <div className={`flex items-center text-sm ${delivery.progress >= 75 ? 'text-green-600' : 'text-gray-400'}`}>
                        <CheckCircle className="h-4 w-4 mr-2" />
                        <span>Cerca del destino</span>
                      </div>
                      <div className={`flex items-center text-sm ${delivery.progress === 100 ? 'text-green-600' : 'text-gray-400'}`}>
                        <CheckCircle className="h-4 w-4 mr-2" />
                        <span>Entregado</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Información de Entrega</h4>
                    <div className="space-y-1 text-sm">
                      <div>
                        <span className="text-gray-500">Orden:</span>
                        <span className="font-medium ml-2">{delivery.orderId}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Ruta asignada:</span>
                        <span className="font-medium ml-2">{delivery.route}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Última actualización:</span>
                        <span className="font-medium ml-2">{delivery.lastUpdate}</span>
                      </div>
                      {delivery.actualArrival && (
                        <div>
                          <span className="text-gray-500">Hora de entrega:</span>
                          <span className="font-medium ml-2 text-green-600">{delivery.actualArrival}</span>
                        </div>
                      )}
                      <div>
                        <span className="text-gray-500">Coordenadas:</span>
                        <span className="font-medium ml-2 font-mono text-xs">
                          {delivery.coordinates.lat.toFixed(4)}, {delivery.coordinates.lng.toFixed(4)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Real-time Updates */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Actualizaciones en Tiempo Real</h3>
        <div className="space-y-3">
          <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
            <div className="p-1 bg-blue-100 rounded-full">
              <Truck className="h-4 w-4 text-blue-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">Vehículo ABC-123 ha llegado a destino</p>
              <p className="text-xs text-gray-500">Hace 2 minutos • Ana Pérez</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
            <div className="p-1 bg-green-100 rounded-full">
              <CheckCircle className="h-4 w-4 text-green-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">Entrega DEL-002 completada exitosamente</p>
              <p className="text-xs text-gray-500">Hace 5 minutos • Carlos Mendoza</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
            <div className="p-1 bg-yellow-100 rounded-full">
              <AlertTriangle className="h-4 w-4 text-yellow-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">Retraso reportado en entrega DEL-004</p>
              <p className="text-xs text-gray-500">Hace 8 minutos • Luis Martínez</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackingMonitoring;