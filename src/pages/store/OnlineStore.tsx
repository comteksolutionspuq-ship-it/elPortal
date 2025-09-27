import React, { useState } from 'react';
import { ShoppingCart, Heart, Eye, Star, Filter, Search, TrendingUp, Package, Users, DollarSign, Plus, Minus } from 'lucide-react';

const OnlineStore: React.FC = () => {
  const [products] = useState([
    { 
      id: 'PROD-001', 
      name: 'Platos Desechables Biodegradables', 
      category: 'platos', 
      price: 2500, 
      originalPrice: 2800,
      image: 'https://images.pexels.com/photos/6097900/pexels-photo-6097900.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 4.8,
      reviews: 124,
      stock: 150,
      description: 'Platos biodegradables de alta calidad, perfectos para eventos y restaurantes.',
      views: 2450,
      inquiries: 89,
      cartAdds: 156,
      wishlistAdds: 67,
      purchases: 89,
      featured: true,
      discount: 11
    },
    { 
      id: 'PROD-002', 
      name: 'Vasos Plásticos 250ml', 
      category: 'vasos', 
      price: 1800, 
      originalPrice: 1800,
      image: 'https://images.pexels.com/photos/6963180/pexels-photo-6963180.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 4.5,
      reviews: 98,
      stock: 200,
      description: 'Vasos plásticos resistentes de 250ml, ideales para bebidas frías.',
      views: 1890,
      inquiries: 65,
      cartAdds: 134,
      wishlistAdds: 45,
      purchases: 78,
      featured: false,
      discount: 0
    },
    { 
      id: 'PROD-003', 
      name: 'Mascarillas N95 Certificadas', 
      category: 'proteccion', 
      price: 850, 
      originalPrice: 950,
      image: 'https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 4.9,
      reviews: 256,
      stock: 15,
      description: 'Mascarillas N95 certificadas para máxima protección respiratoria.',
      views: 3200,
      inquiries: 145,
      cartAdds: 234,
      wishlistAdds: 123,
      purchases: 167,
      featured: true,
      discount: 11
    },
    { 
      id: 'PROD-004', 
      name: 'Guantes Nitrilo Azules', 
      category: 'proteccion', 
      price: 120, 
      originalPrice: 120,
      image: 'https://images.pexels.com/photos/4386431/pexels-photo-4386431.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 4.6,
      reviews: 187,
      stock: 500,
      description: 'Guantes de nitrilo azules, libres de látex y altamente resistentes.',
      views: 2100,
      inquiries: 98,
      cartAdds: 189,
      wishlistAdds: 78,
      purchases: 134,
      featured: true,
      discount: 0
    }
  ]);

  const [cart, setCart] = useState<{[key: string]: number}>({});
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState<'store' | 'analytics'>('store');

  const categories = [
    { id: 'all', name: 'Todos los productos' },
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
    { id: 'rating', name: 'Mejor Valorados' },
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

  // Analytics data
  const topViewedProducts = [...products].sort((a, b) => b.views - a.views).slice(0, 5);
  const topInquiredProducts = [...products].sort((a, b) => b.inquiries - a.inquiries).slice(0, 5);
  const topCartProducts = [...products].sort((a, b) => b.cartAdds - a.cartAdds).slice(0, 5);
  const topWishlistProducts = [...products].sort((a, b) => b.wishlistAdds - a.wishlistAdds).slice(0, 5);
  const topPurchasedProducts = [...products].sort((a, b) => b.purchases - a.purchases).slice(0, 5);

  const totalViews = products.reduce((sum, p) => sum + p.views, 0);
  const totalInquiries = products.reduce((sum, p) => sum + p.inquiries, 0);
  const totalCartAdds = products.reduce((sum, p) => sum + p.cartAdds, 0);
  const totalPurchases = products.reduce((sum, p) => sum + p.purchases, 0);
  const conversionRate = ((totalPurchases / totalViews) * 100).toFixed(2);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <h2 className="text-2xl font-bold text-gray-900">Tienda Online</h2>
        <div className="flex space-x-2 mt-4 sm:mt-0">
          <button
            onClick={() => setViewMode('store')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              viewMode === 'store'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            <ShoppingCart className="h-4 w-4 inline mr-2" />
            Tienda
          </button>
          <button
            onClick={() => setViewMode('analytics')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              viewMode === 'analytics'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            <TrendingUp className="h-4 w-4 inline mr-2" />
            Analytics
          </button>
          {getCartItemCount() > 0 && (
            <div className="relative">
              <ShoppingCart className="h-6 w-6 text-blue-600" />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {getCartItemCount()}
              </span>
            </div>
          )}
        </div>
      </div>

      {viewMode === 'store' && (
        <>
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

          {/* Shopping Cart Summary */}
          {getCartItemCount() > 0 && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-blue-900">
                    {getCartItemCount()} productos en el carrito
                  </p>
                  <p className="text-lg font-bold text-blue-600">
                    Total: CLP ${Math.round(getCartTotal() * 1.19).toLocaleString()} (IVA incluido)
                  </p>
                </div>
                <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                  Proceder al Checkout
                </button>
              </div>
            </div>
          )}

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 group">
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {product.discount > 0 && (
                    <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                      -{product.discount}%
                    </span>
                  )}
                  {product.featured && (
                    <span className="absolute top-2 right-2 bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded">
                      Destacado
                    </span>
                  )}
                  {product.stock < 20 && (
                    <span className="absolute bottom-2 left-2 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded">
                      ¡Últimas unidades!
                    </span>
                  )}
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className={`absolute top-2 right-2 p-2 rounded-full transition-colors ${
                      wishlist.includes(product.id) 
                        ? 'bg-red-100 text-red-600' 
                        : 'bg-white text-gray-400 hover:text-red-600'
                    }`}
                  >
                    <Heart className={`h-4 w-4 ${wishlist.includes(product.id) ? 'fill-current' : ''}`} />
                  </button>
                </div>
                
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                        />
                      ))}
                      <span className="text-sm text-gray-500 ml-1">({product.reviews})</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Eye className="h-4 w-4 mr-1" />
                      {product.views}
                    </div>
                  </div>
                  
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{product.name}</h3>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>
                  
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <span className="text-xl font-bold text-blue-600">
                        CLP ${product.price.toLocaleString()}
                      </span>
                      {product.discount > 0 && (
                        <span className="text-sm text-gray-500 line-through ml-2">
                          CLP ${product.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>
                    <span className={`text-sm font-medium ${
                      product.stock < 20 ? 'text-red-600' :
                      product.stock < 50 ? 'text-yellow-600' : 'text-green-600'
                    }`}>
                      Stock: {product.stock}
                    </span>
                  </div>

                  <div className="flex items-center space-x-2">
                    {cart[product.id] ? (
                      <div className="flex items-center space-x-2 flex-1">
                        <button
                          onClick={() => removeFromCart(product.id)}
                          className="w-8 h-8 flex items-center justify-center bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="font-bold text-lg min-w-[2rem] text-center">{cart[product.id]}</span>
                        <button
                          onClick={() => addToCart(product.id)}
                          className="w-8 h-8 flex items-center justify-center bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => addToCart(product.id)}
                        disabled={product.stock === 0}
                        className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 font-medium"
                      >
                        Agregar al Carrito
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {viewMode === 'analytics' && (
        <>
          {/* Analytics Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
              <div className="flex items-center justify-between">
                <div className="p-2 rounded-lg bg-blue-50">
                  <Eye className="h-6 w-6 text-blue-600" />
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-sm font-medium text-gray-500">Vistas Totales</h3>
                <p className="text-2xl font-bold text-blue-600 mt-1">{totalViews.toLocaleString()}</p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
              <div className="flex items-center justify-between">
                <div className="p-2 rounded-lg bg-green-50">
                  <Users className="h-6 w-6 text-green-600" />
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-sm font-medium text-gray-500">Consultas</h3>
                <p className="text-2xl font-bold text-green-600 mt-1">{totalInquiries}</p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
              <div className="flex items-center justify-between">
                <div className="p-2 rounded-lg bg-purple-50">
                  <ShoppingCart className="h-6 w-6 text-purple-600" />
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-sm font-medium text-gray-500">Agregados al Carrito</h3>
                <p className="text-2xl font-bold text-purple-600 mt-1">{totalCartAdds}</p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
              <div className="flex items-center justify-between">
                <div className="p-2 rounded-lg bg-orange-50">
                  <Package className="h-6 w-6 text-orange-600" />
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-sm font-medium text-gray-500">Compras</h3>
                <p className="text-2xl font-bold text-orange-600 mt-1">{totalPurchases}</p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
              <div className="flex items-center justify-between">
                <div className="p-2 rounded-lg bg-red-50">
                  <TrendingUp className="h-6 w-6 text-red-600" />
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-sm font-medium text-gray-500">Conversión</h3>
                <p className="text-2xl font-bold text-red-600 mt-1">{conversionRate}%</p>
              </div>
            </div>
          </div>

          {/* Top Products Analytics */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {/* Most Viewed */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Eye className="h-5 w-5 mr-2 text-blue-600" />
                Más Vistos
              </h3>
              <div className="space-y-3">
                {topViewedProducts.map((product, index) => (
                  <div key={product.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="text-sm font-bold text-gray-400">#{index + 1}</span>
                      <img src={product.image} alt={product.name} className="w-8 h-8 object-cover rounded" />
                      <span className="text-sm font-medium text-gray-900 truncate">{product.name}</span>
                    </div>
                    <span className="text-sm font-bold text-blue-600">{product.views}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Most Inquired */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Users className="h-5 w-5 mr-2 text-green-600" />
                Más Consultados
              </h3>
              <div className="space-y-3">
                {topInquiredProducts.map((product, index) => (
                  <div key={product.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="text-sm font-bold text-gray-400">#{index + 1}</span>
                      <img src={product.image} alt={product.name} className="w-8 h-8 object-cover rounded" />
                      <span className="text-sm font-medium text-gray-900 truncate">{product.name}</span>
                    </div>
                    <span className="text-sm font-bold text-green-600">{product.inquiries}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Most Added to Cart */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <ShoppingCart className="h-5 w-5 mr-2 text-purple-600" />
                Más Agregados al Carrito
              </h3>
              <div className="space-y-3">
                {topCartProducts.map((product, index) => (
                  <div key={product.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="text-sm font-bold text-gray-400">#{index + 1}</span>
                      <img src={product.image} alt={product.name} className="w-8 h-8 object-cover rounded" />
                      <span className="text-sm font-medium text-gray-900 truncate">{product.name}</span>
                    </div>
                    <span className="text-sm font-bold text-purple-600">{product.cartAdds}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Most Wishlisted */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Heart className="h-5 w-5 mr-2 text-red-600" />
                Más Deseados
              </h3>
              <div className="space-y-3">
                {topWishlistProducts.map((product, index) => (
                  <div key={product.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="text-sm font-bold text-gray-400">#{index + 1}</span>
                      <img src={product.image} alt={product.name} className="w-8 h-8 object-cover rounded" />
                      <span className="text-sm font-medium text-gray-900 truncate">{product.name}</span>
                    </div>
                    <span className="text-sm font-bold text-red-600">{product.wishlistAdds}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Most Purchased */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <DollarSign className="h-5 w-5 mr-2 text-orange-600" />
                Más Comprados
              </h3>
              <div className="space-y-3">
                {topPurchasedProducts.map((product, index) => (
                  <div key={product.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="text-sm font-bold text-gray-400">#{index + 1}</span>
                      <img src={product.image} alt={product.name} className="w-8 h-8 object-cover rounded" />
                      <span className="text-sm font-medium text-gray-900 truncate">{product.name}</span>
                    </div>
                    <span className="text-sm font-bold text-orange-600">{product.purchases}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Detailed Analytics Table */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Análisis Detallado de Productos</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Producto</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vistas</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Consultas</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Carrito</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Wishlist</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Compras</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Conversión</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {products.map((product) => {
                    const conversionRate = ((product.purchases / product.views) * 100).toFixed(1);
                    return (
                      <tr key={product.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <img src={product.image} alt={product.name} className="w-10 h-10 object-cover rounded-lg mr-3" />
                            <div>
                              <div className="text-sm font-medium text-gray-900">{product.name}</div>
                              <div className="text-sm text-gray-500">CLP ${product.price.toLocaleString()}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                          {product.views.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                          {product.inquiries}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-purple-600">
                          {product.cartAdds}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-red-600">
                          {product.wishlistAdds}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-orange-600">
                          {product.purchases}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {conversionRate}%
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default OnlineStore;