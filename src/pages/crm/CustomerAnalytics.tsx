import React, { useState } from 'react';
import { BarChart3, TrendingUp, Users, DollarSign, Calendar, Eye } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

const CustomerAnalytics: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  const customerSegments = [
    { segment: 'Empresas', customers: 8, revenue: 12500000, avgOrder: 156250, color: '#3B82F6' },
    { segment: 'Instituciones', customers: 5, revenue: 8900000, avgOrder: 178000, color: '#10B981' },
    { segment: 'Particulares', customers: 12, revenue: 2100000, avgOrder: 17500, color: '#F59E0B' }
  ];

  const customerBehavior = [
    { month: 'Ene', newCustomers: 3, returningCustomers: 15, churnRate: 5 },
    { month: 'Feb', newCustomers: 5, returningCustomers: 18, churnRate: 3 },
    { month: 'Mar', newCustomers: 2, returningCustomers: 20, churnRate: 4 },
    { month: 'Abr', newCustomers: 4, returningCustomers: 22, churnRate: 2 },
    { month: 'May', newCustomers: 6, returningCustomers: 24, churnRate: 3 },
    { month: 'Jun', newCustomers: 3, returningCustomers: 25, churnRate: 1 }
  ];

  const topCustomers = [
    { name: 'Hospital Regional', revenue: 5200000, orders: 78, avgOrder: 66667 },
    { name: 'Hotel Cabo de Hornos', revenue: 3200000, orders: 56, avgOrder: 57143 },
    { name: 'Restaurant La Patagonia', revenue: 2850000, orders: 45, avgOrder: 63333 },
    { name: 'Colegio San José', revenue: 1850000, orders: 28, avgOrder: 66071 },
    { name: 'Café Central', revenue: 1650000, orders: 32, avgOrder: 51563 }
  ];

  const customerLifetime = [
    { period: '0-3 meses', customers: 8, value: 2500000 },
    { period: '3-6 meses', customers: 6, value: 4200000 },
    { period: '6-12 meses', customers: 7, value: 8900000 },
    { period: '12+ meses', customers: 4, value: 7900000 }
  ];

  const totalCustomers = customerSegments.reduce((sum, segment) => sum + segment.customers, 0);
  const totalRevenue = customerSegments.reduce((sum, segment) => sum + segment.revenue, 0);
  const avgOrderValue = customerSegments.reduce((sum, segment) => sum + (segment.revenue / segment.customers), 0) / customerSegments.length;
  const customerRetention = ((customerBehavior[customerBehavior.length - 1].returningCustomers / totalCustomers) * 100).toFixed(1);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <h2 className="text-2xl font-bold text-gray-900">Análisis de Clientes</h2>
        <div className="flex space-x-3 mt-4 sm:mt-0">
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="week">Esta semana</option>
              <option value="month">Este mes</option>
              <option value="quarter">Este trimestre</option>
              <option value="year">Este año</option>
            </select>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="p-2 rounded-lg bg-blue-50">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-500">Total Clientes</h3>
            <p className="text-2xl font-bold text-blue-600 mt-1">{totalCustomers}</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="p-2 rounded-lg bg-green-50">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-500">Ingresos por Clientes</h3>
            <p className="text-2xl font-bold text-green-600 mt-1">CLP ${totalRevenue.toLocaleString()}</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="p-2 rounded-lg bg-purple-50">
              <BarChart3 className="h-6 w-6 text-purple-600" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-500">Valor Promedio Orden</h3>
            <p className="text-2xl font-bold text-purple-600 mt-1">CLP ${Math.round(avgOrderValue).toLocaleString()}</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="p-2 rounded-lg bg-orange-50">
              <TrendingUp className="h-6 w-6 text-orange-600" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-500">Retención</h3>
            <p className="text-2xl font-bold text-orange-600 mt-1">{customerRetention}%</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Customer Segments */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Segmentación de Clientes</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={customerSegments}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="revenue"
              >
                {customerSegments.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `CLP $${value.toLocaleString()}`} />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {customerSegments.map((segment, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <div className={`w-3 h-3 rounded-full mr-2`} style={{ backgroundColor: segment.color }} />
                  <span className="text-gray-600">{segment.segment}</span>
                </div>
                <div className="text-right">
                  <span className="font-medium">{segment.customers} clientes</span>
                  <p className="text-xs text-gray-500">CLP ${segment.revenue.toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Customer Behavior */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Comportamiento de Clientes</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={customerBehavior}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="newCustomers" fill="#3B82F6" name="Nuevos" />
              <Bar dataKey="returningCustomers" fill="#10B981" name="Recurrentes" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Customers */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Top 5 Clientes por Ingresos</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cliente</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ingresos</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Órdenes</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Orden Promedio</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {topCustomers.map((customer, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className="flex items-center justify-center w-6 h-6 bg-blue-100 text-blue-800 rounded-full text-xs font-medium mr-3">
                        {index + 1}
                      </span>
                      <span className="text-sm font-medium text-gray-900">{customer.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                    CLP ${customer.revenue.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {customer.orders}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    CLP ${customer.avgOrder.toLocaleString()}
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

export default CustomerAnalytics;