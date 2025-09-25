import React, { useState } from 'react';
import { Search, Filter, ShoppingCart, Plus, Minus, Package, User, CreditCard, Banknote, Receipt } from 'lucide-react';

const SalesPortal: React.FC = () => {
  const [cart, setCart] = useState<{[key: string]: number}>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showCart, setShowCart] = useState(true);
  const [customerName, setCustomerName] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [showCheckout, setShowCheckout] = useState(false);

  const products = [
    { id: 'PROD-001', name: 'Platos Desechables Biodegradables', category: 'platos', price: 2500, stock: 150, image: 'https://images.pexels.com/photos/6097900/pexels-photo-6097900.jpeg?auto=compress&cs=tinysrgb&w=300' },
    { id: 'PROD-002', name: 'Vasos Plásticos 250ml', category: 'vasos', price: 1800, stock: 200, image: 'https://images.pexels.com/photos/6963180/pexels-photo-6963180.jpeg?auto=compress&cs=tinysrgb&w=300' },
    { id: 'PROD-003', name: 'Mascarillas N95', category: 'proteccion', price: 850, stock: 15, image: 'https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg?auto=compress&cs=tinysrgb&w=300' },
    { id: 'PROD-004', name: 'Guantes Nitrilo Azules', category: 'proteccion', price: 120, stock: 500, image: 'https://images.pexels.com/photos/4386431/pexels-photo-4386431.jpeg?auto=compress&cs=tinysrgb&w=300' },
    { id: 'PROD-005', name: 'Servilletas de Papel', category: 'papel', price: 950, stock: 80, image: 'https://images.pexels.com/photos/6069113/pexels-photo-6069113.jpeg?auto=compress&cs=tinysrgb&w=300' },
    { id: 'PROD-006', name: 'Cubiertos Plásticos Set', category: 'cubiertos', price: 1200, stock: 120, image: 'https://images.pexels.com/photos/6097915/pexels-photo-6097915.jpeg?auto=compress&cs=tinysrgb&w=300' },
    { id: 'PROD-007', name: 'Bolsas Basura 50L', category: 'bolsas', price: 3200, stock: 45, image: 'https://images.pexels.com/photos/6069098/pexels-photo-6069098.jpeg?auto=compress&cs=tinysrgb&w=300' },
    { id: 'PROD-008', name: 'Papel Higiénico Industrial', category: 'papel', price: 8500, stock: 25, image: 'https://images.pexels.com/photos/6069132/pexels-photo-6069132.jpeg?auto=compress&cs=tinysrgb&w=300' },
  ];

  const categories = [
    { id: 'all', name: 'Todos' },
    { id: 'platos', name: 'Platos' },
    { id: 'vasos', name: 'Vasos' },
    { id: 'proteccion', name: 'Protección' },
    { id: 'papel', name: 'Papel' },
    { id: 'cubiertos', name: 'Cubiertos' },
    { id: 'bolsas', name: 'Bolsas' }
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const addToCart = (productId: string) => {
    setCart(prev => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1
    }));
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => {
      const newCart = { ...prev };
      if (newCart[productId] > 1) {
        newCart[productId]--;
      } else {
        delete newCart[productId];
      }
      return newCart;
    });
  };

  const getCartTotal = () => {
    return Object.entries(cart).reduce((total, [productId, quantity]) => {
      const product = products.find(p => p.id === productId);
      return total + (product ? product.price * quantity : 0);
    }, 0);
  };

  const getCartItemCount = () => {
    return Object.values(cart).reduce((sum, quantity) => sum + quantity, 0);
  };

  const handleCheckout = () => {
    if (Object.keys(cart).length === 0) return;
    setShowCheckout(true);
  };

  const completeSale = () => {
    // Aquí se procesaría la venta
    alert(`Venta completada por CLP $${getCartTotal().toLocaleString()}`);
    setCart({});
    setCustomerName('');
    setShowCheckout(false);
  };

  const getStockColor = (stock: number) => {
    if (stock < 20) return 'text-red-600';
    if (stock < 50) return 'text-yellow-600';
    return 'text-green-600';
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <h2 className="text-2xl font-bold text-gray-900">Punto de Venta - Caja</h2>
        <div className="flex items-center space-x-4 mt-4 sm:mt-0">
          <div className="text-right">
            <p className="text-sm text-gray-500">Cajero: María González</p>
            <p className="text-sm text-gray-500">Turno: Mañana</p>
          </div>
          <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
            Caja Abierta
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Buscar productos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {categories.map(category => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Products Grid */}
        <div className="lg:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                   onClick={() => addToCart(product.id)}>
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-32 object-cover"
                  />
                  {product.stock < 20 && (
                    <span className="absolute top-2 right-2 bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded">
                      Stock Bajo
                    </span>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2 text-sm">{product.name}</h3>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xl font-bold text-blue-600">
                      CLP ${product.price.toLocaleString()}
                    </span>
                    <span className={`text-sm font-medium ${getStockColor(product.stock)}`}>
                      Stock: {product.stock}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {cart[product.id] && (
                        <>
                          <button
                            onClick={() => removeFromCart(product.id)}
                            className="w-10 h-10 flex items-center justify-center bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Minus className="h-5 w-5" />
                          </button>
                          <span className="font-bold text-lg min-w-[2rem] text-center">{cart[product.id]}</span>
                        </>
                      )}
                      <button
                        onClick={() => addToCart(product.id)}
                        disabled={product.stock === 0}
                        className="w-10 h-10 flex items-center justify-center bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Plus className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Shopping Cart */}
        <div className="lg:block">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 sticky top-6 min-h-[600px]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Venta Actual</h3>
              <ShoppingCart className="h-6 w-6 text-blue-600" />
            </div>
            
            {/* Customer Info */}
            <div className="mb-4 p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center mb-2">
                <User className="h-4 w-4 text-gray-500 mr-2" />
                <label className="text-sm font-medium text-gray-700">Cliente:</label>
              </div>
              <input
                type="text"
                placeholder="Nombre del cliente (opcional)"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {Object.keys(cart).length === 0 ? (
              <div className="text-center py-8">
                <Package className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">Sin productos</p>
                <p className="text-sm text-gray-400">Selecciona productos para agregar</p>
              </div>
            ) : (
              <div className="space-y-3 mb-6">
                {Object.entries(cart).map(([productId, quantity]) => {
                  const product = products.find(p => p.id === productId);
                  if (!product) return null;
                  return (
                    <div key={productId} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-gray-900 leading-tight">{product.name}</h4>
                        <p className="text-sm text-gray-500">CLP ${product.price.toLocaleString()} c/u</p>
                      </div>
                      <div className="flex items-center space-x-2 ml-2">
                        <button
                          onClick={() => removeFromCart(productId)}
                          className="w-8 h-8 flex items-center justify-center bg-red-100 text-red-600 rounded hover:bg-red-200 transition-colors"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="text-sm font-bold min-w-[1.5rem] text-center">{quantity}</span>
                        <button
                          onClick={() => addToCart(productId)}
                          className="w-8 h-8 flex items-center justify-center bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
            
            {Object.keys(cart).length > 0 && (
              <div className="border-t pt-4">
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal:</span>
                    <span>CLP ${getCartTotal().toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>IVA (19%):</span>
                    <span>CLP ${Math.round(getCartTotal() * 0.19).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center font-bold text-lg border-t pt-2">
                    <span>Total:</span>
                    <span className="text-blue-600">CLP ${Math.round(getCartTotal() * 1.19).toLocaleString()}</span>
                  </div>
                </div>
                
                {/* Payment Method */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Método de Pago:</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setPaymentMethod('cash')}
                      className={`flex items-center justify-center p-2 rounded-lg border transition-colors ${
                        paymentMethod === 'cash' 
                          ? 'bg-blue-50 border-blue-500 text-blue-700' 
                          : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <Banknote className="h-4 w-4 mr-1" />
                      <span className="text-sm">Efectivo</span>
                    </button>
                    <button
                      onClick={() => setPaymentMethod('card')}
                      className={`flex items-center justify-center p-2 rounded-lg border transition-colors ${
                        paymentMethod === 'card' 
                          ? 'bg-blue-50 border-blue-500 text-blue-700' 
                          : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <CreditCard className="h-4 w-4 mr-1" />
                      <span className="text-sm">Tarjeta</span>
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <button 
                    onClick={handleCheckout}
                    className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center justify-center"
                  >
                    <Receipt className="h-5 w-5 mr-2" />
                    Procesar Venta
                  </button>
                  <button 
                    onClick={() => setCart({})}
                    className="w-full bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400 transition-colors font-medium"
                  >
                    Limpiar Carrito
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Checkout Modal */}
      {showCheckout && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-full max-w-md shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Confirmar Venta</h3>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span>Cliente:</span>
                  <span className="font-medium">{customerName || 'Cliente General'}</span>
                </div>
                <div className="flex justify-between">
                  <span>Productos:</span>
                  <span className="font-medium">{getCartItemCount()} items</span>
                </div>
                <div className="flex justify-between">
                  <span>Método de pago:</span>
                  <span className="font-medium">{paymentMethod === 'cash' ? 'Efectivo' : 'Tarjeta'}</span>
                </div>
                <div className="flex justify-between text-lg font-bold border-t pt-2">
                  <span>Total a pagar:</span>
                  <span className="text-blue-600">CLP ${Math.round(getCartTotal() * 1.19).toLocaleString()}</span>
                </div>
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={completeSale}
                  className="flex-1 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors"
                >
                  Confirmar Venta
                </button>
                <button
                  onClick={() => setShowCheckout(false)}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SalesPortal;