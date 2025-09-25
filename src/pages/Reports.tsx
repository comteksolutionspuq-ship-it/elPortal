import React, { useState } from 'react';
import { FileText, Download, Calendar, BarChart3, TrendingUp, DollarSign, Package, Users } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

const Reports: React.FC = () => {
  const [selectedReport, setSelectedReport] = useState('sales');
  const [dateRange, setDateRange] = useState('month');

  const reportTypes = [
    { id: 'sales', name: 'Reporte de Ventas', icon: DollarSign },
    { id: 'inventory', name: 'Reporte de Inventario', icon: Package },
    { id: 'customers', name: 'Reporte de Clientes', icon: Users },
    { id: 'financial', name: 'Reporte Financiero', icon: BarChart3 }
  ];

  const salesData = [
    { period: 'Ene', sales: 2850000, orders: 45, customers: 12 },
    { period: 'Feb', sales: 3200000, orders: 52, customers: 15 },
    { period: 'Mar', sales: 2980000, orders: 48, customers: 13 },
    { period: 'Abr', sales: 3450000, orders: 61, customers: 18 },
    { period: 'May', sales: 3650000, orders: 55, customers: 16 },
    { period: 'Jun', sales: 3800000, orders: 67, customers: 20 }
  ];

  const inventoryData = [
    { category: 'Platos', stock: 150, value: 375000, rotation: 2.4 },
    { category: 'Vasos', stock: 200, value: 360000, rotation: 3.1 },
    { category: 'Protección', stock: 515, value: 437750, rotation: 4.2 },
    { category: 'Papel', stock: 80, value: 76000, rotation: 1.8 },
    { category: 'Cubiertos', stock: 120, value: 144000, rotation: 2.7 }
  ];

  const customerData = [
    { type: 'Empresas', count: 8, revenue: 12500000, avgOrder: 156250 },
    { type: 'Instituciones', count: 5, revenue: 8900000, avgOrder: 178000 },
    { type: 'Particulares', count: 12, revenue: 2100000, avgOrder: 17500 }
  ];

  const financialData = [
    { month: 'Ene', revenue: 2850000, costs: 1995000, profit: 855000 },
    { month: 'Feb', revenue: 3200000, costs: 2240000, profit: 960000 },
    { month: 'Mar', revenue: 2980000, costs: 2086000, profit: 894000 },
    { month: 'Abr', revenue: 3450000, costs: 2415000, profit: 1035000 },
    { month: 'May', revenue: 3650000, costs: 2555000, profit: 1095000 },
    { month: 'Jun', revenue: 3800000, costs: 2660000, profit: 1140000 }
  ];

  const pieColors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

  const generateReport = (type: string) => {
    // Aquí se generaría el reporte real
    alert(`Generando reporte de ${reportTypes.find(r => r.id === type)?.name}`);
  };

  const exportReport = (format: string) => {
    alert(`Exportando reporte en formato ${format.toUpperCase()}`);
  };

  const renderSalesReport = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <h4 className="text-sm font-medium text-gray-500 mb-2">Ventas Totales</h4>
          <p className="text-2xl font-bold text-green-600">CLP ${salesData.reduce((sum, item) => sum + item.sales, 0).toLocaleString()}</p>
          <p className="text-sm text-gray-500 mt-1">Últimos 6 meses</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <h4 className="text-sm font-medium text-gray-500 mb-2">Órdenes Totales</h4>
          <p className="text-2xl font-bold text-blue-600">{salesData.reduce((sum, item) => sum + item.orders, 0)}</p>
          <p className="text-sm text-gray-500 mt-1">Promedio: {Math.round(salesData.reduce((sum, item) => sum + item.orders, 0) / salesData.length)} por mes</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <h4 className="text-sm font-medium text-gray-500 mb-2">Clientes Únicos</h4>
          <p className="text-2xl font-bold text-purple-600">{Math.max(...salesData.map(item => item.customers))}</p>
          <p className="text-sm text-gray-500 mt-1">Máximo mensual</p>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Tendencia de Ventas</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={salesData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="period" />
            <YAxis />
            <Tooltip formatter={(value) => `CLP $${value.toLocaleString()}`} />
            <Line type="monotone" dataKey="sales" stroke="#10B981" strokeWidth={3} name="Ventas" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  const renderInventoryReport = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <h4 className="text-sm font-medium text-gray-500 mb-2">Valor Total Inventario</h4>
          <p className="text-2xl font-bold text-blue-600">CLP ${inventoryData.reduce((sum, item) => sum + item.value, 0).toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <h4 className="text-sm font-medium text-gray-500 mb-2">Productos en Stock</h4>
          <p className="text-2xl font-bold text-green-600">{inventoryData.reduce((sum, item) => sum + item.stock, 0)}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <h4 className="text-sm font-medium text-gray-500 mb-2">Rotación Promedio</h4>
          <p className="text-2xl font-bold text-orange-600">{(inventoryData.reduce((sum, item) => sum + item.rotation, 0) / inventoryData.length).toFixed(1)}x</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Stock por Categoría</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={inventoryData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="stock" fill="#3B82F6" name="Stock" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Valor por Categoría</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={inventoryData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {inventoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `CLP $${value.toLocaleString()}`} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );

  const renderCustomersReport = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <h4 className="text-sm font-medium text-gray-500 mb-2">Total Clientes</h4>
          <p className="text-2xl font-bold text-blue-600">{customerData.reduce((sum, item) => sum + item.count, 0)}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <h4 className="text-sm font-medium text-gray-500 mb-2">Ingresos por Clientes</h4>
          <p className="text-2xl font-bold text-green-600">CLP ${customerData.reduce((sum, item) => sum + item.revenue, 0).toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <h4 className="text-sm font-medium text-gray-500 mb-2">Orden Promedio</h4>
          <p className="text-2xl font-bold text-purple-600">CLP ${Math.round(customerData.reduce((sum, item) => sum + item.avgOrder, 0) / customerData.length).toLocaleString()}</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Análisis por Tipo de Cliente</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cantidad</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ingresos</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Orden Promedio</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">% del Total</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {customerData.map((customer, index) => {
                const totalRevenue = customerData.reduce((sum, item) => sum + item.revenue, 0);
                const percentage = ((customer.revenue / totalRevenue) * 100).toFixed(1);
                return (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{customer.type}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{customer.count}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">CLP ${customer.revenue.toLocaleString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">CLP ${customer.avgOrder.toLocaleString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{percentage}%</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderFinancialReport = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <h4 className="text-sm font-medium text-gray-500 mb-2">Ingresos Totales</h4>
          <p className="text-2xl font-bold text-green-600">CLP ${financialData.reduce((sum, item) => sum + item.revenue, 0).toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <h4 className="text-sm font-medium text-gray-500 mb-2">Costos Totales</h4>
          <p className="text-2xl font-bold text-red-600">CLP ${financialData.reduce((sum, item) => sum + item.costs, 0).toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <h4 className="text-sm font-medium text-gray-500 mb-2">Ganancia Neta</h4>
          <p className="text-2xl font-bold text-blue-600">CLP ${financialData.reduce((sum, item) => sum + item.profit, 0).toLocaleString()}</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Estado de Resultados</h3>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={financialData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip formatter={(value) => `CLP $${value.toLocaleString()}`} />
            <Bar dataKey="revenue" fill="#10B981" name="Ingresos" />
            <Bar dataKey="costs" fill="#EF4444" name="Costos" />
            <Bar dataKey="profit" fill="#3B82F6" name="Ganancia" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  const renderReport = () => {
    switch (selectedReport) {
      case 'sales': return renderSalesReport();
      case 'inventory': return renderInventoryReport();
      case 'customers': return renderCustomersReport();
      case 'financial': return renderFinancialReport();
      default: return renderSalesReport();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <h2 className="text-2xl font-bold text-gray-900">Reportes y Análisis</h2>
        <div className="flex space-x-3 mt-4 sm:mt-0">
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="week">Esta semana</option>
              <option value="month">Este mes</option>
              <option value="quarter">Este trimestre</option>
              <option value="year">Este año</option>
            </select>
          </div>
          <button
            onClick={() => exportReport('pdf')}
            className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
          >
            <Download className="h-5 w-5" />
            <span>PDF</span>
          </button>
          <button
            onClick={() => exportReport('excel')}
            className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            <Download className="h-5 w-5" />
            <span>Excel</span>
          </button>
        </div>
      </div>

      {/* Report Type Selector */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Tipo de Reporte</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {reportTypes.map((report) => {
            const Icon = report.icon;
            return (
              <button
                key={report.id}
                onClick={() => setSelectedReport(report.id)}
                className={`p-4 rounded-lg border-2 transition-colors ${
                  selectedReport === report.id
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="h-8 w-8 mx-auto mb-2" />
                <p className="text-sm font-medium">{report.name}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Report Content */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-gray-900">
            {reportTypes.find(r => r.id === selectedReport)?.name}
          </h3>
          <button
            onClick={() => generateReport(selectedReport)}
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <FileText className="h-5 w-5" />
            <span>Generar Reporte</span>
          </button>
        </div>
        {renderReport()}
      </div>
    </div>
  );
};

export default Reports;