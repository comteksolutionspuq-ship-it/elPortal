import React, { useState } from 'react';
import { ShoppingBag, Plus, CreditCard as Edit, Trash2, CheckCircle, Clock, AlertCircle, Package } from 'lucide-react';

const PurchaseOrders: React.FC = () => {
  const [orders, setOrders] = useState([
    {
      id: 'PO-001',
      supplier: 'EcoSupply Chile',
      orderDate: '2024-01-15',
      expectedDate: '2024-01-25',
      status: 'pending',
      priority: 'high',
      items: [
        { product: 'Platos Biodegradables', quantity: 500, unitPrice: 1375, total: 687500 },
        { product: 'Vasos Compostables', quantity: 300, unitPrice: 950, total: 285000 }
      ],
      subtotal: 972500,
      tax: 184975,
      total: 1157475,
      notes: 'Entrega urgente para evento corporativo'
    },
    {
      id: 'PO-002',
      supplier: 'PlastiCorp',
      orderDate: '2024-01-12',
      expectedDate: '2024-01-22',
      status: 'approved',
      priority: 'medium',
      items: [
        { product: 'Vasos Plásticos 250ml', quantity: 1000, unitPrice: 1116, total: 1116000 },
        { product: 'Cubiertos Plásticos Set', quantity: 200, unitPrice: 780, total: 156000 }
      ],
      subtotal: 1272000,
      tax: 241680,
      total: 1513680,
      notes: 'Reposición stock regular'
    },
    {
      id: 'PO-003',
      supplier: 'SafeGuard Inc.',
      orderDate: '2024-01-10',
      expectedDate: '2024-01-20',
      status: 'received',
      priority: 'high',
      items: [
        { product: 'Mascarillas N95', quantity: 1000, unitPrice: 612, total: 612000 },
        { product: 'Guantes Nitrilo Azules', quantity: 2000, unitPrice: 78, total: 156000 }
      ],
      subtotal: 768000,
      tax: 145920,
      total: 913920,
      notes: 'Pedido completado y recibido'
    },
    {
      id: 'PO-004',
      supplier: 'PaperTech',
      orderDate: '2024-01-08',
      expectedDate: '2024-01-18',
      status: 'cancelled',
      priority: 'low',
      items: [
        { product: 'Servilletas de Papel', quantity: 500, unitPrice: 665, total: 332500 }
      ],
      subtotal: 332500,
      tax: 63175,
      total: 395675,
      notes: 'Cancelado por problemas de calidad'
    }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [newOrder, setNewOrder] = useState({
    supplier: '',
    expectedDate: '',
    priority: 'medium',
    notes: '',
    items: [{ product: '', quantity: 0, unitPrice: 0 }]
  });

  const suppliers = [
    'EcoSupply Chile',
    'PlastiCorp',
    'SafeGuard Inc.',
    'PaperTech'
  ];

  const statuses = [
    { id: 'all', name: 'Todos los estados' },
    { id: 'pending', name: 'Pendiente' },
    { id: 'approved', name: 'Aprobado' },
    { id: 'received', name: 'Recibido' },
    { id: 'cancelled', name: 'Cancelado' }
  ];

  const filteredOrders = orders.filter(order => {
    return selectedStatus === 'all' || order.status === selectedStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-blue-100 text-blue-800';
      case 'received': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'approved': return <CheckCircle className="h-4 w-4" />;
      case 'received': return <Package className="h-4 w-4" />;
      case 'cancelled': return <AlertCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'Pendiente';
      case 'approved': return 'Aprobado';
      case 'received': return 'Recibido';
      case 'cancelled': return 'Cancelado';
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

  const addItem = () => {
    setNewOrder({
      ...newOrder,
      items: [...newOrder.items, { product: '', quantity: 0, unitPrice: 0 }]
    });
  };

  const removeItem = (index: number) => {
    setNewOrder({
      ...newOrder,
      items: newOrder.items.filter((_, i) => i !== index)
    });
  };

  const updateItem = (index: number, field: string, value: any) => {
    const updatedItems = newOrder.items.map((item, i) => 
      i === index ? { ...item, [field]: value } : item
    );
    setNewOrder({ ...newOrder, items: updatedItems });
  };

  const handleAddOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const id = `PO-${String(orders.length + 1).padStart(3, '0')}`;
    const itemsWithTotals = newOrder.items.map(item => ({
      ...item,
      total: item.quantity * item.unitPrice
    }));
    const subtotal = itemsWithTotals.reduce((sum, item) => sum + item.total, 0);
    const tax = subtotal * 0.19;
    const total = subtotal + tax;

    setOrders([...orders, {
      ...newOrder,
      id,
      orderDate: new Date().toISOString().split('T')[0],
      status: 'pending',
      items: itemsWithTotals,
      subtotal,
      tax,
      total
    }]);
    
    setNewOrder({
      supplier: '',
      expectedDate: '',
      priority: 'medium',
      notes: '',
      items: [{ product: '', quantity: 0, unitPrice: 0 }]
    });
    setShowForm(false);
  };

  const updateOrderStatus = (orderId: string, newStatus: string) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  const deleteOrder = (id: string) => {
    setOrders(orders.filter(order => order.id !== id));
  };

  const totalOrders = filteredOrders.length;
  const totalValue = filteredOrders.reduce((sum, order) => sum + order.total, 0);
  const pendingOrders = filteredOrders.filter(order => order.status === 'pending').length;
  const receivedOrders = filteredOrders.filter(order => order.status === 'received').length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <h2 className="text-2xl font-bold text-gray-900">Órdenes de Compra</h2>
        <div className="flex space-x-3 mt-4 sm:mt-0">
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="h-5 w-5" />
            <span>Nueva Orden</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <div className="flex items-center space-x-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {statuses.map(status => (
                <option key={status.id} value={status.id}>{status.name}</option>
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
              <ShoppingBag className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-500">Total Órdenes</h3>
            <p className="text-2xl font-bold text-gray-900 mt-1">{totalOrders}</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="p-2 rounded-lg bg-green-50">
              <Package className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-500">Valor Total</h3>
            <p className="text-2xl font-bold text-green-600 mt-1">CLP ${totalValue.toLocaleString()}</p>
          </div>
        </div>

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
            <div className="p-2 rounded-lg bg-purple-50">
              <CheckCircle className="h-6 w-6 text-purple-600" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-500">Recibidas</h3>
            <p className="text-2xl font-bold text-purple-600 mt-1">{receivedOrders}</p>
          </div>
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.map((order) => (
          <div key={order.id} className={`bg-white rounded-lg shadow-sm border border-gray-100 border-l-4 ${getPriorityColor(order.priority)}`}>
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{order.id}</h3>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      {getStatusIcon(order.status)}
                      <span className="ml-1">{getStatusText(order.status)}</span>
                    </span>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      order.priority === 'high' ? 'bg-red-100 text-red-800' :
                      order.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {order.priority === 'high' ? 'Alta' : order.priority === 'medium' ? 'Media' : 'Baja'} Prioridad
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">Proveedor: <span className="font-medium">{order.supplier}</span></p>
                  <p className="text-sm text-gray-600 mb-1">Fecha de orden: {order.orderDate}</p>
                  <p className="text-sm text-gray-600">Fecha esperada: {order.expectedDate}</p>
                  {order.notes && (
                    <p className="text-sm text-gray-500 mt-2 italic">{order.notes}</p>
                  )}
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-900">CLP ${order.total.toLocaleString()}</p>
                  <p className="text-sm text-gray-500">{order.items.length} productos</p>
                </div>
              </div>

              {/* Order Items */}
              <div className="border-t border-gray-200 pt-4">
                <h4 className="text-sm font-medium text-gray-900 mb-3">Productos:</h4>
                <div className="space-y-2">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex justify-between items-center text-sm">
                      <span className="text-gray-600">{item.product}</span>
                      <div className="flex space-x-4 text-right">
                        <span className="text-gray-500">Cant: {item.quantity}</span>
                        <span className="text-gray-500">Precio: CLP ${item.unitPrice.toLocaleString()}</span>
                        <span className="font-medium text-gray-900">CLP ${item.total.toLocaleString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="border-t border-gray-200 mt-3 pt-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal:</span>
                    <span className="text-gray-900">CLP ${order.subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">IVA (19%):</span>
                    <span className="text-gray-900">CLP ${order.tax.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-base font-semibold border-t border-gray-200 pt-2 mt-2">
                    <span className="text-gray-900">Total:</span>
                    <span className="text-gray-900">CLP ${order.total.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200">
                <div className="flex space-x-2">
                  {order.status === 'pending' && (
                    <button
                      onClick={() => updateOrderStatus(order.id, 'approved')}
                      className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                    >
                      Aprobar
                    </button>
                  )}
                  {order.status === 'approved' && (
                    <button
                      onClick={() => updateOrderStatus(order.id, 'received')}
                      className="px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                    >
                      Marcar Recibido
                    </button>
                  )}
                  {(order.status === 'pending' || order.status === 'approved') && (
                    <button
                      onClick={() => updateOrderStatus(order.id, 'cancelled')}
                      className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                    >
                      Cancelar
                    </button>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <button className="text-blue-600 hover:text-blue-900">
                    <Edit className="h-4 w-4" />
                  </button>
                  <button 
                    onClick={() => deleteOrder(order.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Order Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-10 mx-auto p-5 border w-full max-w-4xl shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Nueva Orden de Compra</h3>
              <form onSubmit={handleAddOrder} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Proveedor</label>
                    <select
                      required
                      value={newOrder.supplier}
                      onChange={(e) => setNewOrder({...newOrder, supplier: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Seleccionar proveedor</option>
                      {suppliers.map(supplier => (
                        <option key={supplier} value={supplier}>{supplier}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Fecha Esperada</label>
                    <input
                      type="date"
                      required
                      value={newOrder.expectedDate}
                      onChange={(e) => setNewOrder({...newOrder, expectedDate: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Prioridad</label>
                    <select
                      value={newOrder.priority}
                      onChange={(e) => setNewOrder({...newOrder, priority: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="low">Baja</option>
                      <option value="medium">Media</option>
                      <option value="high">Alta</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Notas</label>
                  <textarea
                    value={newOrder.notes}
                    onChange={(e) => setNewOrder({...newOrder, notes: e.target.value})}
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-3">
                    <label className="block text-sm font-medium text-gray-700">Productos</label>
                    <button
                      type="button"
                      onClick={addItem}
                      className="px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                    >
                      Agregar Producto
                    </button>
                  </div>
                  <div className="space-y-3">
                    {newOrder.items.map((item, index) => (
                      <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-3 p-3 border border-gray-200 rounded-lg">
                        <div>
                          <input
                            type="text"
                            placeholder="Nombre del producto"
                            required
                            value={item.product}
                            onChange={(e) => updateItem(index, 'product', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <input
                            type="number"
                            placeholder="Cantidad"
                            required
                            min="1"
                            value={item.quantity}
                            onChange={(e) => updateItem(index, 'quantity', parseInt(e.target.value) || 0)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <input
                            type="number"
                            placeholder="Precio unitario"
                            required
                            min="0"
                            value={item.unitPrice}
                            onChange={(e) => updateItem(index, 'unitPrice', parseInt(e.target.value) || 0)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-900">
                            CLP ${(item.quantity * item.unitPrice).toLocaleString()}
                          </span>
                          {newOrder.items.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeItem(index)}
                              className="text-red-600 hover:text-red-900"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Crear Orden
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

export default PurchaseOrders;