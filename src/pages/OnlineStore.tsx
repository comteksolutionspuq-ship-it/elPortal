import React, { useState } from 'react';
import { ShoppingCart, Heart, Eye, Search, Filter, Star, Plus, Minus, CreditCard, Truck, Shield } from 'lucide-react';

const OnlineStore: React.FC = () => {
  const [products] = useState([
    { 
      id: 'PROD-001', 
      name: 'Platos Desechables Biodegradables', 
      category: 'platos', 
      price: 2500, 
      originalPrice: 2800,
      image: 'https://images.pexels.com/photos/6097900/pexels-photo-6097900.jpeg?auto=compress&cs=tinysrgb&w=300',
      description: 'Platos biodegradables de alta calidad, perfectos para eventos y restaurantes.',
      stock: 150,
      rating: 4.8,
      reviews: 24,
      featured: true,
      discount: 11,
      views: 1250,
      inquiries: 45,
      cartAdds: 89,
      wishlistAdds: 34,
      purchases: 67
    },
    { 
      id: 'PROD-002', 
      name: 'Vasos Plásticos 250ml', 
      category: 'vasos', 
      price: 1800, 
      originalPrice: 1800,
      image: 'https://images.pexels.com/photos/6963180/pexels-photo-6963180.jpeg?auto=compress&cs=tinysrgb&w=300',
      description: 'Vasos plásticos resistentes de 250ml, ideales para bebidas frías.',
      stock: 200,
      rating: 4.5,
      reviews: 18,
      featured: false,
      discount: 0,
      views: 890,
      inquiries: 32,
      cartAdds: 56,
      wishlistAdds: 23,
      purchases: 45
    },
    { 
      id: 'PROD-003', 
      name: 'Mascarillas N95', 
      category: 'proteccion', 
      price: 850, 
      originalPrice: 950,
      image: 'https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg?auto=compress&cs=tinysrgb&w=300',
      description: 'Mascarillas N95 certificadas para máxima protección respiratoria.',
      stock: 15,
      rating: 4.9,
      reviews: 42,
      featured: true,
      discount: 11,
      views: 2100,
      inquiries: 78,
      cartAdds: 156,
      wishlistAdds: 89,
      purchases: 134
    },
    { 
      id: 'PROD-004', 
      name: 'Guantes Nitrilo Azules', 
      category: 'proteccion', 
      price: 120, 
      originalPrice: 120,
      image: 'https://images.pexels.com/photos/4386431/pexels-photo-4386431.jpeg?auto=compress&cs=tinysrgb&w=300',
      description: 'Guantes de nitrilo azules, libres de látex y altamente resistentes.',
      stock: 500,
      rating: 4.7,
      reviews: 31,
      featured: true,
      discount: 0,
      views: 1650,
      inquiries: 56,
      cartAdds: 98,
      wishlistAdds: 45,
      purchases: 78
    },
    { 
      id: 'PROD-005', 
      name: 'Servilletas de Papel', 
      category: 'papel', 
      price: 950, 
      originalPrice: 1100,
      image: 'https://images.pexels.com/photos/6069113/pexels-photo-6069113.jpeg?auto=compress&cs=tinysrgb&w=300',
      description: 'Servilletas de papel absorbente de alta calidad.',
      stock: 80,
      rating: 4.3,
      reviews: 15,
      featured: false,
      discount: 14,
      views: 720,
      inquiries: 28,
      cartAdds: 42,
      wishlistAdds: 18,
      purchases: 29
    },
    { 
      id: 'PROD-006', 
      name: 'Cubiertos Plásticos Set', 
      category: 'cubiertos', 
      price: 1200, 
      originalPrice: 1200,
      image: 'https://images.pexels.com/photos/6097915/pexels-photo-6097915.jpeg?auto=compress&cs=tinysrgb&w=300',
      description: 'Set completo de cubiertos plásticos resistentes.',
      stock: 120,
      rating: 4.4,
      reviews: 22,
      featured: false,
      discount: 0,
      views: 580,
      inquiries: 22,
      cartAdds: 35,
      wishlistAdds: 12,
      purchases: 28
    }
  ]);

  const [cart, setCart] = useState<{[key: string]: number}>({});
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);

  const categories = [
    { id: 'all', name: 'Todas las categorías' },
    { id: 'platos', name: 'Platos' },
    { id: 'vasos', name: 'Vasos' },
    { id: 'proteccion', name: 'Protección' },
    { id: 'papel', name: 'Papel' },
    { id: 'cubiertos', name: 'Cubiertos' }
  ];

  const sortOptions = [
    { id: 'featured', name: 'Destacados' },
    { id: 'price-low', name: 'Precio: Menor a Mayor' },
    { id: 'price-high', name: 'Precio: Mayor a Menor' },
    { id: 'rating', name: 'Mejor Calificados' },
    { id: 'popular', name: 'Más Populares' }
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'price-low': return a.price - b.price;
      case 'price-high': return b.price - a.price;
      case 'rating': return b.rating - a.rating;
      case 'popular': return b.views - a.views;
      default: return b.featured ? 1 : -1;
    }
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

  const toggleWishlist = (productId: string) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
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

  const completePurchase = () => {
    alert(`Compra completada por CLP $${Math.round(getCartTotal() * 1.19).toLocaleString()}`);
    setCart({});
    setShowCheckout(false);
  };

  // Analytics data
  const mostViewed = [...products].sort((a, b) => b.views - a.views).slice(0, 5);
  const mostInquired = [...products].sort((a, b) => b.inquiries - a.inquiries).slice(0, 5);
  const mostAddedToCart = [...products].sort((a, b) => b.cartAdds - a.cartAdds).slice(0, 5);
  const mostWishlisted = [...products].sort((a, b) => b.wishlistAdds - a.wishlistAdds).slice(0, 5);
  const mostPurchased = [...products].sort((a, b) => b.purchases - a.purchases).slice(0, 5);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <h2 className="text-2xl font-bold text-gray-900">Tienda Online</h2>
        <div className="flex items-center space-x-4 mt-4 sm:mt-0">
          <button
            onClick={() => setShowCart(true)}
            className="relative flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <ShoppingCart className="h-5 w-5" />
            <span>Carrito</span>
            {getCartItemCount() > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {getCartItemCount()}
              </span>
            )}
          </button>
          <button className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors">
            <Heart className="h-5 w-5" />
            <span>Wishlist ({wishlist.length})</span>
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4">
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
          <div className="flex space-x-4">
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
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {sortOptions.map(option => (
                <option key={option.id} value={option.id}>{option.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Featured Products */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Productos Destacados</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {products.filter(p => p.featured).slice(0, 3).map((product) => (
            <div key={product.id} className="border border-yellow-200 bg-yellow-50 rounded-lg p-4">
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-32 object-cover rounded-lg mb-3"
                />
                {product.discount > 0 && (
                  <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                    -{product.discount}%
                  </span>
                )}
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">{product.name}</h4>
              <div className="flex items-center mb-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                  ))}
                </div>
                <span className="text-sm text-gray-500 ml-2">({product.reviews})</span>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-lg font-bold text-blue-600">
                    CLP ${product.price.toLocaleString()}
                  </span>
                  {product.originalPrice > product.price && (
                    <span className="text-sm text-gray-500 line-through ml-2">
                      CLP ${product.originalPrice.toLocaleString()}
                    </span>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className={`p-2 rounded-lg transition-colors ${
                      wishlist.includes(product.id) 
                        ? 'bg-red-100 text-red-600' 
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <Heart className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => addToCart(product.id)}
                    className="bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Agregar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
            <div className="relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              {product.discount > 0 && (
                <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                  -{product.discount}%
                </span>
              )}
              {product.stock < 20 && (
                <span className="absolute top-2 left-2 bg-orange-500 text-white text-xs font-medium px-2 py-1 rounded">
                  Últimas unidades
                </span>
              )}
              <button
                onClick={() => toggleWishlist(product.id)}
                className={`absolute bottom-2 right-2 p-2 rounded-full transition-colors ${
                  wishlist.includes(product.id) 
                    ? 'bg-red-100 text-red-600' 
                    : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Heart className="h-4 w-4" />
              </button>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 mb-2">{product.name}</h3>
              <div className="flex items-center mb-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`h-3 w-3 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                  ))}
                </div>
                <span className="text-xs text-gray-500 ml-2">({product.reviews})</span>
              </div>
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>
              <div className="flex justify-between items-center mb-3">
                <div>
                  <span className="text-lg font-bold text-blue-600">
                    CLP ${product.price.toLocaleString()}
                  </span>
                  {product.originalPrice > product.price && (
                    <span className="text-sm text-gray-500 line-through ml-2">
                      CLP ${product.originalPrice.toLocaleString()}
                    </span>
                  )}
                </div>
                <span className="text-sm text-gray-500">
                  Stock: {product.stock}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {cart[product.id] && (
                    <>
                      <button
                        onClick={() => removeFromCart(product.id)}
                        className="w-8 h-8 flex items-center justify-center bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="font-bold text-lg min-w-[2rem] text-center">{cart[product.id]}</span>
                    </>
                  )}
                  <button
                    onClick={() => addToCart(product.id)}
                    disabled={product.stock === 0}
                    className="flex-1 bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 text-sm"
                  >
                    <Plus className="h-4 w-4 inline mr-1" />
                    {cart[product.id] ? 'Agregar' : 'Al Carrito'}
                  </button>
                </div>
              </div>
              <div className="flex justify-between items-center text-xs text-gray-500 mt-2">
                <div className="flex items-center">
                  <Eye className="h-3 w-3 mr-1" />
                  {product.views} vistas
                </div>
                <div>
                  {product.purchases} compras
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Analytics Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Analytics de Productos</h3>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Más Vistos</h4>
            <div className="space-y-2">
              {mostViewed.map((product, index) => (
                <div key={product.id} className="flex items-center text-sm">
                  <span className="w-4 text-gray-500">{index + 1}.</span>
                  <span className="ml-2 truncate">{product.name}</span>
                  <span className="ml-auto text-blue-600">{product.views}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Más Consultados</h4>
            <div className="space-y-2">
              {mostInquired.map((product, index) => (
                <div key={product.id} className="flex items-center text-sm">
                  <span className="w-4 text-gray-500">{index + 1}.</span>
                  <span className="ml-2 truncate">{product.name}</span>
                  <span className="ml-auto text-green-600">{product.inquiries}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Más al Carrito</h4>
            <div className="space-y-2">
              {mostAddedToCart.map((product, index) => (
                <div key={product.id} className="flex items-center text-sm">
                  <span className="w-4 text-gray-500">{index + 1}.</span>
                  <span className="ml-2 truncate">{product.name}</span>
                  <span className="ml-auto text-purple-600">{product.cartAdds}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Más Deseados</h4>
            <div className="space-y-2">
              {mostWishlisted.map((product, index) => (
                <div key={product.id} className="flex items-center text-sm">
                  <span className="w-4 text-gray-500">{index + 1}.</span>
                  <span className="ml-2 truncate">{product.name}</span>
                  <span className="ml-auto text-red-600">{product.wishlistAdds}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Más Comprados</h4>
            <div className="space-y-2">
              {mostPurchased.map((product, index) => (
                <div key={product.id} className="flex items-center text-sm">
                  <span className="w-4 text-gray-500">{index + 1}.</span>
                  <span className="ml-2 truncate">{product.name}</span>
                  <span className="ml-auto text-orange-600">{product.purchases}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Cart Modal */}
      {showCart && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-full max-w-2xl shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Carrito de Compras</h3>
              {Object.keys(cart).length === 0 ? (
                <div className="text-center py-8">
                  <ShoppingCart className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500">Tu carrito está vacío</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {Object.entries(cart).map(([productId, quantity]) => {
                    const product = products.find(p => p.id === productId);
                    if (!product) return null;
                    return (
                      <div key={productId} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-center space-x-4">
                          <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded-lg" />
                          <div>
                            <h4 className="font-medium text-gray-900">{product.name}</h4>
                            <p className="text-sm text-gray-500">CLP ${product.price.toLocaleString()} c/u</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => removeFromCart(productId)}
                              className="w-8 h-8 flex items-center justify-center bg-red-100 text-red-600 rounded hover:bg-red-200 transition-colors"
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="font-bold min-w-[2rem] text-center">{quantity}</span>
                            <button
                              onClick={() => addToCart(productId)}
                              className="w-8 h-8 flex items-center justify-center bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>
                          <span className="font-bold text-lg">
                            CLP ${(product.price * quantity).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center text-lg font-bold">
                      <span>Total (+ IVA):</span>
                      <span className="text-blue-600">CLP ${Math.round(getCartTotal() * 1.19).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              )}
              <div className="flex space-x-3 pt-4">
                {Object.keys(cart).length > 0 && (
                  <button
                    onClick={handleCheckout}
                    className="flex-1 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors"
                  >
                    Proceder al Checkout
                  </button>
                )}
                <button
                  onClick={() => setShowCart(false)}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition-colors"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Checkout Modal */}
      {showCheckout && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-full max-w-md shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Finalizar Compra</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Resumen del Pedido</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>Productos ({getCartItemCount()}):</span>
                      <span>CLP ${getCartTotal().toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>IVA (19%):</span>
                      <span>CLP ${Math.round(getCartTotal() * 0.19).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Envío:</span>
                      <span className="text-green-600">Gratis</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg border-t pt-2">
                      <span>Total:</span>
                      <span className="text-blue-600">CLP ${Math.round(getCartTotal() * 1.19).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Shield className="h-4 w-4 text-green-600" />
                    <span>Compra 100% segura</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Truck className="h-4 w-4 text-blue-600" />
                    <span>Entrega en 24-48 horas</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <CreditCard className="h-4 w-4 text-purple-600" />
                    <span>Múltiples métodos de pago</span>
                  </div>
                </div>
              </div>
              <div className="flex space-x-3 pt-6">
                <button
                  onClick={completePurchase}
                  className="flex-1 bg-green-600 text-white py-3 px-4 rounded-md hover:bg-green-700 transition-colors font-medium"
                >
                  Confirmar Compra
                </button>
                <button
                  onClick={() => setShowCheckout(false)}
                  className="flex-1 bg-gray-300 text-gray-700 py-3 px-4 rounded-md hover:bg-gray-400 transition-colors"
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

export default OnlineStore;