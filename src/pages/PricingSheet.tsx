import React, { useState } from 'react';
import { DollarSign, TrendingUp, TrendingDown, Calculator, Download, CreditCard as Edit, Save, X } from 'lucide-react';

const PricingSheet: React.FC = () => {
  const [products, setProducts] = useState([
    { 
      id: 'PROD-001', 
      name: 'Platos Desechables Biodegradables', 
      category: 'platos',
      currentPrice: 2500, 
      cost: 1375, 
      suggestedPrice: 2700, 
      margin: 45, 
      suggestedMargin: 49,
      competition: 2800,
      demand: 'high',
      lastUpdate: '2024-01-15'
    },
    { 
      id: 'PROD-002', 
      name: 'Vasos Plásticos 250ml', 
      category: 'vasos',
      currentPrice: 1800, 
      cost: 1116, 
      suggestedPrice: 1800, 
      margin: 38, 
      suggestedMargin: 38,
      competition: 1750,
      demand: 'medium',
      lastUpdate: '2024-01-12'
    },
    { 
      id: 'PROD-003', 
      name: 'Mascarillas N95', 
      category: 'proteccion',
      currentPrice: 850, 
      cost: 612, 
      suggestedPrice: 920, 
      margin: 28, 
      suggestedMargin: 33,
      competition: 950,
      demand: 'high',
      lastUpdate: '2024-01-10'
    },
    { 
      id: 'PROD-004', 
      name: 'Guantes Nitrilo Azules', 
      category: 'proteccion',
      currentPrice: 120, 
      cost: 78, 
      suggestedPrice: 130, 
      margin: 35, 
      suggestedMargin: 40,
      competition: 125,
      demand: 'high',
      lastUpdate: '2024-01-18'
    },
    { 
      id: 'PROD-005', 
      name: 'Servilletas de Papel', 
      category: 'papel',
      currentPrice: 950, 
      cost: 665, 
      suggestedPrice: 1050, 
      margin: 30, 
      suggestedMargin: 37,
      competition: 980,
      demand: 'medium',
      lastUpdate: '2024-01-14'
    },
    { 
      id: 'PROD-006', 
      name: 'Cubiertos Plásticos Set', 
      category: 'cubiertos',
      currentPrice: 1200, 
      cost: 780, 
      suggestedPrice: 1200, 
      margin: 35, 
      suggestedMargin: 35,
      competition: 1150,
      demand: 'low',
      lastUpdate: '2024-01-16'
    }
  ]);

  const [editingProduct, setEditingProduct] = useState<string | null>(null);
  const [tempPrice, setTempPrice] = useState<number>(0);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'Todas las categorías' },
    { id: 'platos', name: 'Platos' },
    { id: 'vasos', name: 'Vasos' },
    { id: 'proteccion', name: 'Protección' },
    { id: 'papel', name: 'Papel' },
    { id: 'cubiertos', name: 'Cubiertos' }
  ];

  const filteredProducts = products.filter(product => {
    return selectedCategory === 'all' || product.category === selectedCategory;
  });

  const startEditing = (productId: string, currentPrice: number) => {
    setEditingProduct(productId);
    setTempPrice(currentPrice);
  };

  const savePrice = (productId: string) => {
    setProducts(products.map(product => 
      product.id === productId 
        ? { 
            ...product, 
            currentPrice: tempPrice,
            margin: Math.round(((tempPrice - product.cost) / tempPrice) * 100),
            lastUpdate: new Date().toISOString().split('T')[0]
          }
        : product
    ));
    setEditingProduct(null);
  };

  const applySuggestedPrice = (productId: string) => {
    setProducts(products.map(product => 
      product.id === productId 
        ? { 
            ...product, 
            currentPrice: product.suggestedPrice,
            margin: product.suggestedMargin,
            lastUpdate: new Date().toISOString().split('T')[0]
          }
        : product
    ));
  };

  const cancelEditing = () => {
    setEditingProduct(null);
    setTempPrice(0);
  };

  const getDemandColor = (demand: string) => {
    switch (demand) {
      case 'high': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDemandText = (demand: string) => {
    switch (demand) {
      case 'high': return 'Alta';
      case 'medium': return 'Media';
      case 'low': return 'Baja';
      default: return 'Sin datos';
    }
  };

  const getMarginColor = (margin: number) => {
    if (margin >= 40) return 'text-green-600';
    if (margin >= 30) return 'text-yellow-600';
    return 'text-red-600';
  };

  const averageMargin = Math.round(filteredProducts.reduce((sum, product) => sum + product.margin, 0) / filteredProducts.length);
  const totalRevenue = filteredProducts.reduce((sum, product) => sum + (product.currentPrice * 100), 0); // Estimado
  const totalCost = filteredProducts.reduce((sum, product) => sum + (product.cost * 100), 0); // Estimado
  const totalProfit = totalRevenue - totalCost;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <h2 className="text-2xl font-bold text-gray-900">Asignación de Precios</h2>
        <div className="flex space-x-3 mt-4 sm:mt-0">
          <button className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
            <Download className="h-5 w-5" />
            <span>Exportar Precios</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <div className="flex items-center space-x-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Categoría</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {categories.map(category => (
                <option key={category.id} value={category.id}>{category.name}</option>
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
              <Calculator className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-500">Margen Promedio</h3>
            <p className={`text-2xl font-bold mt-1 ${getMarginColor(averageMargin)}`}>
              {averageMargin}%
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="p-2 rounded-lg bg-green-50">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-500">Ingresos Estimados</h3>
            <p className="text-2xl font-bold text-green-600 mt-1">CLP ${totalRevenue.toLocaleString()}</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="p-2 rounded-lg bg-red-50">
              <TrendingDown className="h-6 w-6 text-red-600" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-500">Costos Estimados</h3>
            <p className="text-2xl font-bold text-red-600 mt-1">CLP ${totalCost.toLocaleString()}</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="p-2 rounded-lg bg-purple-50">
              <TrendingUp className="h-6 w-6 text-purple-600" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-500">Ganancia Estimada</h3>
            <p className="text-2xl font-bold text-purple-600 mt-1">CLP ${totalProfit.toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* Pricing Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Análisis de Precios por Producto</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Producto</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Costo</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Precio Actual</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Margen Actual</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Precio Sugerido</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Margen Sugerido</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Competencia</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Demanda</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{product.name}</div>
                      <div className="text-sm text-gray-500">{product.id}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    CLP ${product.cost.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {editingProduct === product.id ? (
                      <div className="flex items-center space-x-2">
                        <input
                          type="number"
                          value={tempPrice}
                          onChange={(e) => setTempPrice(parseInt(e.target.value) || 0)}
                          className="w-24 px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                          onClick={() => savePrice(product.id)}
                          className="text-green-600 hover:text-green-900"
                        >
                          <Save className="h-4 w-4" />
                        </button>
                        <button
                          onClick={cancelEditing}
                          className="text-red-600 hover:text-red-900"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium text-gray-900">
                          CLP ${product.currentPrice.toLocaleString()}
                        </span>
                        <button
                          onClick={() => startEditing(product.id, product.currentPrice)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`text-sm font-medium ${getMarginColor(product.margin)}`}>
                      {product.margin}%
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-blue-600">
                        CLP ${product.suggestedPrice.toLocaleString()}
                      </span>
                      {product.suggestedPrice !== product.currentPrice && (
                        <button
                          onClick={() => applySuggestedPrice(product.id)}
                          className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded hover:bg-blue-200 transition-colors"
                        >
                          Aplicar
                        </button>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`text-sm font-medium ${getMarginColor(product.suggestedMargin)}`}>
                      {product.suggestedMargin}%
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    CLP ${product.competition.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getDemandColor(product.demand)}`}>
                      {getDemandText(product.demand)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="text-xs">
                      Actualizado: {product.lastUpdate}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pricing Recommendations */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recomendaciones de Precios</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredProducts
            .filter(product => product.suggestedPrice !== product.currentPrice)
            .map((product) => (
              <div key={product.id} className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-2">{product.name}</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Precio actual:</span>
                    <span>CLP ${product.currentPrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Precio sugerido:</span>
                    <span className="font-medium text-blue-600">CLP ${product.suggestedPrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Incremento:</span>
                    <span className={`font-medium ${product.suggestedPrice > product.currentPrice ? 'text-green-600' : 'text-red-600'}`}>
                      {product.suggestedPrice > product.currentPrice ? '+' : ''}
                      CLP ${(product.suggestedPrice - product.currentPrice).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Nuevo margen:</span>
                    <span className={`font-medium ${getMarginColor(product.suggestedMargin)}`}>
                      {product.suggestedMargin}%
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => applySuggestedPrice(product.id)}
                  className="w-full mt-3 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors text-sm"
                >
                  Aplicar Precio Sugerido
                </button>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default PricingSheet;