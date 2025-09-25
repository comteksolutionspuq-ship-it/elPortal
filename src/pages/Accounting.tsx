import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Download, FileText, Calculator, TrendingUp, TrendingDown, DollarSign, MapPin, Filter } from 'lucide-react';

const Accounting: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedLocation, setSelectedLocation] = useState('all');

  const transactions = [
    { id: 'TRX-001', date: '2024-01-20', type: 'sale', description: 'Venta - Restaurant La Patagonia', amount: 89500, category: 'Ventas', location: 'LOC-001' },
    { id: 'TRX-002', date: '2024-01-20', type: 'purchase', description: 'Compra - EcoSupply Chile', amount: -45000, category: 'Compras', location: 'LOC-001' },
    { id: 'TRX-003', date: '2024-01-19', type: 'sale', description: 'Venta - Café Central', amount: 45200, category: 'Ventas', location: 'LOC-002' },
    { id: 'TRX-004', date: '2024-01-19', type: 'expense', description: 'Combustible vehículos', amount: -25000, category: 'Gastos Operacionales', location: 'LOC-001' },
    { id: 'TRX-005', date: '2024-01-18', type: 'sale', description: 'Venta - Hospital Regional', amount: 156000, category: 'Ventas', location: 'LOC-001' },
    { id: 'TRX-006', date: '2024-01-18', type: 'expense', description: 'Mantención vehículos', amount: -18000, category: 'Mantención', location: 'LOC-002' },
    { id: 'TRX-007', date: '2024-01-17', type: 'sale', description: 'Venta - Colegio San José', amount: 78300, category: 'Ventas', location: 'LOC-002' },
    { id: 'TRX-008', date: '2024-01-17', type: 'purchase', description: 'Compra - PlastiCorp', amount: -32000, category: 'Compras', location: 'LOC-001' },
    { id: 'TRX-009', date: '2024-01-16', type: 'sale', description: 'Venta - Hotel Cabo de Hornos', amount: 134700, category: 'Ventas', location: 'LOC-001' },
    { id: 'TRX-010', date: '2024-01-16', type: 'expense', description: 'Servicios básicos', amount: -12500, category: 'Servicios', location: 'LOC-002' },
  ];

  const profitLossData = [
    { period: 'Sem 1', revenue: 285000, costs: 180000, profit: 105000 },
    { period: 'Sem 2', revenue: 320000, costs: 195000, profit: 125000 },
    { period: 'Sem 3', revenue: 298000, costs: 205000, profit: 93000 },
    { period: 'Sem 4', revenue: 345000, costs: 220000, profit: 125000 },
  ];

  const pricingAnalysis = [
    { product: 'Platos Biodegradables', currentPrice: 2500, suggestedPrice: 2700, margin: 45, recommendation: 'Aumentar 8%' },
    { product: 'Vasos Plásticos', currentPrice: 1800, suggestedPrice: 1800, margin: 38, recommendation: 'Mantener' },
    { product: 'Mascarillas N95', currentPrice: 850, suggestedPrice: 920, margin: 28, recommendation: 'Aumentar 8.2%' },
    { product: 'Guantes Nitrilo', currentPrice: 120, suggestedPrice: 130, margin: 35, recommendation: 'Aumentar 8.3%' },
  ];

  const locations = [
    { id: 'all', name: 'Todos los locales' },
    { id: 'LOC-001', name: 'Local Principal' },
    { id: 'LOC-002', name: 'Sucursal Norte' }
  ];

  const filteredTransactions = transactions.filter(transaction => {
    return selectedLocation === 'all' || transaction.location === selectedLocation;
  });

  const getTransactionColor = (type: string) => {
    switch (type) {
      case 'sale': return 'text-green-600';
      case 'purchase': return 'text-blue-600';
      case 'expense': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'sale': return <TrendingUp className="h-4 w-4" />;
      case 'purchase': return <DollarSign className="h-4 w-4" />;
      case 'expense': return <TrendingDown className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const totalRevenue = filteredTransactions.filter(t => t.type === 'sale').reduce((sum, t) => sum + t.amount, 0);
  const totalExpenses = filteredTransactions.filter(t => t.type !== 'sale').reduce((sum, t) => sum + Math.abs(t.amount), 0);
  const netProfit = totalRevenue - totalExpenses;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <h2 className="text-2xl font-bold text-gray-900">Contabilidad y Reportes</h2>
        <div className="flex space-x-3 mt-4 sm:mt-0">
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {locations.map(location => (
                <option key={location.id} value={location.id}>{location.name}</option>
              ))}
            </select>
          </div>
          <button className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
            <Download className="h-5 w-5" />
            <span>Exportar PDF</span>
          </button>
          <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            <FileText className="h-5 w-5" />
            <span>Exportar Excel</span>
          </button>
        </div>
      </div>

      {/* Financial Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="p-2 rounded-lg bg-green-50">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Ingresos Totales</p>
              <p className="text-2xl font-bold text-green-600">CLP ${totalRevenue.toLocaleString()}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="p-2 rounded-lg bg-red-50">
              <TrendingDown className="h-6 w-6 text-red-600" />
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Gastos Totales</p>
              <p className="text-2xl font-bold text-red-600">CLP ${totalExpenses.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="p-2 rounded-lg bg-blue-50">
              <Calculator className="h-6 w-6 text-blue-600" />
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Ganancia Neta</p>
              <p className={`text-2xl font-bold ${netProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                CLP ${netProfit.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Profit & Loss Chart */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Estado de Resultados</h3>
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-3 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="week">Semanal</option>
              <option value="month">Mensual</option>
              <option value="quarter">Trimestral</option>
            </select>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={profitLossData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="period" />
              <YAxis />
              <Tooltip formatter={(value) => `CLP $${value.toLocaleString()}`} />
              <Bar dataKey="revenue" fill="#10B981" name="Ingresos" />
              <Bar dataKey="costs" fill="#EF4444" name="Costos" />
              <Bar dataKey="profit" fill="#3B82F6" name="Ganancia" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pricing Analysis */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Análisis de Precios</h3>
          <div className="space-y-4">
            {pricingAnalysis.map((item, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium text-gray-900">{item.product}</h4>
                  <span className={`text-sm px-2 py-1 rounded ${
                    item.recommendation === 'Mantener' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {item.recommendation}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Precio Actual</p>
                    <p className="font-medium">CLP ${item.currentPrice.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Precio Sugerido</p>
                    <p className="font-medium">CLP ${item.suggestedPrice.toLocaleString()}</p>
                  </div>
                </div>
                <div className="mt-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500">Margen Actual</span>
                    <span className="font-medium">{item.margin}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${item.margin}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Transacciones Recientes</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Descripción</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Categoría</th>
               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Local</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Monto</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTransactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {transaction.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {transaction.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`flex items-center ${getTransactionColor(transaction.type)}`}>
                      {getTransactionIcon(transaction.type)}
                      <span className="ml-2 text-sm capitalize">
                        {transaction.type === 'sale' ? 'Venta' : 
                         transaction.type === 'purchase' ? 'Compra' : 'Gasto'}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {transaction.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {transaction.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {locations.find(loc => loc.id === transaction.location)?.name || 'Sin asignar'}
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${getTransactionColor(transaction.type)}`}>
                    CLP ${Math.abs(transaction.amount).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Accounting;