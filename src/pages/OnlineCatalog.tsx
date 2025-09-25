import React, { useState } from 'react';
import { Eye, Search, Filter, TrendingUp, BarChart3, Globe, Users } from 'lucide-react';

const OnlineCatalog: React.FC = () => {
  const [products] = useState([
    { 
      id: 'PROD-001', 
      name: 'Platos Desechables Biodegradables', 
      category: 'platos', 
      price: 2500, 
      image: 'https://images.pexels.com/photos/6097900/pexels-photo-6097900.jpeg?auto=compress&cs=tinysrgb&w=300',
      views: 1250,
      inquiries: 45,
      description: 'Platos biodegradables de alta calidad, perfectos para eventos y restaurantes.',
      stock: 150,
      featured: true
    },
    { 
      id: 'PROD-002', 
      name: 'Vasos Plásticos 250ml', 
      category: 'vasos', 
      price: 1800, 
      image: 'https://images.pexels.com/photos/6963180/pexels-photo-6963180.jpeg?auto=compress&cs=tinysrgb&w=300',
      views: 890,
      inquiries: 32,
      description: 'Vasos plásticos resistentes de 250ml, ideales para bebidas frías.',
      stock: 200,
      featured: false
    },
    { 
      id: 'PROD-003', 
      name: 'Mascarillas N95', 
      category: 'proteccion', 
      price: 850, 
      image: 'https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg?auto=compress&cs=tinysrgb&w=300',
      views: 2100,
      inquiries: 78,
      description: 'Mascarillas N95 certificadas para máxima protección respiratoria.',
      stock: 15,
      featured: true
    },
    { 
      id: 'PROD-004', 
      name: 'Guantes Nitrilo Azules', 
      category: 'proteccion', 
      price: 120, 
      image: 'https://images.pexels.com/photos/4386431/pexels-photo-4386431.jpeg?auto=compress&cs=tinysrgb&w=300',
      views: 1650,
      inquiries: 56,
      description: 'Guantes de nitrilo azules, libres de látex y altamente resistentes.',
      stock: 500,
      featured: true
    },
    { 
      id: 'PROD-005', 
      name: 'Servilletas de Papel', 
      category: 'papel', 
      price: 950, 
      image: 'https://images.pexels.com/photos/6069113/pexels-photo-6069113.jpeg?auto=compress&cs=tinysrgb&w=300',
      views: 720,
      inquiries: 28,
      description: 'Servilletas de papel absorbente de alta calidad.',
      stock: 80,
      featured: false
    },
    { 
      id: 'PROD-006', 
      name: 'Cubiertos Plásticos Set', 
      category: 'cubiertos', 
      price: 1200, 
      image: 'https://images.pexels.com/photos/6097915/pexels-photo-6097915.jpeg?auto=compress&cs=tinysrgb&w=300',
      views: 580,
      inquiries: 22,
      description: 'Set completo de cubiertos plásticos resistentes.',
      stock: 120,
      featured: false
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'catalog' | 'analytics'>('catalog');

  const categories = [
    { id: 'all', name: 'Todas las categorías' },
    { id: 'platos', name: 'Platos' },
    { id: 'vasos', name: 'Vasos' },
    { id: 'proteccion', name: 'Protección' },
    { id: 'papel', name: 'Papel' },
    { id: 'cubiertos', name: 'Cubiertos' }
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const totalViews = products.reduce((sum, product) => sum + product.views, 0);
  const totalInquiries = products.reduce((sum, product) => sum + product.inquiries, 0);
  const averageViews = Math.round(totalViews / products.length);
  const conversionRate = ((totalInquiries / totalViews) * 100).toFixed(2);

  const topProducts = [...products].sort((a, b) => b.views - a.views).slice(0, 3);
  const featuredProducts = products.filter(product => product.featured);

  const handleProductView = (productId: string) => {
    // Aquí se registraría la vista del producto
    console.log(`Producto ${productId} visualizado`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <h2 className="text-2xl font-bold text-gray-900">Catálogo Online</h2>
        <div className="flex space-x-2 mt-4 sm:mt-0">
          <button
            onClick={() => setViewMode('catalog')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              viewMode === 'catalog'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            <Globe className="h-4 w-4 inline mr-2" />
            Catálogo
          </button>
          <button
            onClick={() => setViewMode('analytics')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              viewMode === 'analytics'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            <BarChart3 className="h-4 w-4 inline mr-2" />
            Estadísticas
          </button>
        </div>
      </div>

      {viewMode === 'catalog' && (
        <>
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

          {/* Featured Products */}
          {featuredProducts.length > 0 && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Productos Destacados</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {featuredProducts.map((product) => (
                  <div key={product.id} className="border border-yellow-200 bg-yellow-50 rounded-lg p-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-32 object-cover rounded-lg mb-3"
                    />
                    <h4 className="font-semibold text-gray-900 mb-2">{product.name}</h4>
                    <p className="text-sm text-gray-600 mb-2">{product.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-blue-600">
                        CLP ${product.price.toLocaleString()}
                      </span>
                      <div className="flex items-center text-sm text-gray-500">
                        <Eye className="h-4 w-4 mr-1" />
                        {product.views}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <div 
                key={product.id} 
                className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => handleProductView(product.id)}
              >
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                  {product.stock < 20 && (
                    <span className="absolute top-2 right-2 bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded">
                      Stock Bajo
                    </span>
                  )}
                  {product.featured && (
                    <span className="absolute top-2 left-2 bg-yellow-100 text-yellow-800 text-xs font-medium px-2 py-1 rounded">
                      Destacado
                    </span>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-2">{product.name}</h3>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xl font-bold text-blue-600">
                      CLP ${product.price.toLocaleString()}
                    </span>
                    <span className="text-sm text-gray-500">
                      Stock: {product.stock}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <div className="flex items-center">
                      <Eye className="h-4 w-4 mr-1" />
                      {product.views} vistas
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      {product.inquiries} consultas
                    </div>
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
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
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
                <h3 className="text-sm font-medium text-gray-500">Consultas Totales</h3>
                <p className="text-2xl font-bold text-green-600 mt-1">{totalInquiries}</p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
              <div className="flex items-center justify-between">
                <div className="p-2 rounded-lg bg-purple-50">
                  <BarChart3 className="h-6 w-6 text-purple-600" />
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-sm font-medium text-gray-500">Vistas Promedio</h3>
                <p className="text-2xl font-bold text-purple-600 mt-1">{averageViews}</p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
              <div className="flex items-center justify-between">
                <div className="p-2 rounded-lg bg-orange-50">
                  <TrendingUp className="h-6 w-6 text-orange-600" />
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-sm font-medium text-gray-500">Tasa de Conversión</h3>
                <p className="text-2xl font-bold text-orange-600 mt-1">{conversionRate}%</p>
              </div>
            </div>
          </div>

          {/* Top Products */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Productos Más Visitados</h3>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={product.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
                        index === 0 ? 'bg-yellow-100 text-yellow-800' :
                        index === 1 ? 'bg-gray-100 text-gray-800' :
                        'bg-orange-100 text-orange-800'
                      }`}>
                        {index + 1}
                      </span>
                    </div>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-12 h-12 object-cover rounded-lg"
                    />
                    <div>
                      <h4 className="font-medium text-gray-900">{product.name}</h4>
                      <p className="text-sm text-gray-500">{product.category}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center text-sm text-gray-500 mb-1">
                      <Eye className="h-4 w-4 mr-1" />
                      {product.views} vistas
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Users className="h-4 w-4 mr-1" />
                      {product.inquiries} consultas
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Analytics Table */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Estadísticas Detalladas</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Producto</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Categoría</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vistas</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Consultas</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Conversión</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Precio</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {products.map((product) => {
                    const conversionRate = ((product.inquiries / product.views) * 100).toFixed(1);
                    return (
                      <tr key={product.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-10 h-10 object-cover rounded-lg mr-3"
                            />
                            <div>
                              <div className="text-sm font-medium text-gray-900">{product.name}</div>
                              <div className="text-sm text-gray-500">{product.id}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">
                          {product.category}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                          {product.views.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                          {product.inquiries}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-purple-600">
                          {conversionRate}%
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          CLP ${product.price.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`text-sm font-medium ${
                            product.stock < 20 ? 'text-red-600' :
                            product.stock < 50 ? 'text-yellow-600' : 'text-green-600'
                          }`}>
                            {product.stock}
                          </span>
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

export default OnlineCatalog;