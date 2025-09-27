import React, { useState } from 'react';
import { TrendingUp, TrendingDown, DollarSign, BarChart3, PieChart, Calculator, Calendar, Download } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart as RechartsPieChart, Pie, Cell } from 'recharts';

const FinancialAnalysis: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedMetric, setSelectedMetric] = useState('revenue');

  const financialData = [
    { period: 'Ene', revenue: 2850000, costs: 1995000, profit: 855000, ebitda: 1200000 },
    { period: 'Feb', revenue: 3200000, costs: 2240000, profit: 960000, ebitda: 1350000 },
    { period: 'Mar', revenue: 2980000, costs: 2086000, profit: 894000, ebitda: 1280000 },
    { period: 'Abr', revenue: 3450000, costs: 2415000, profit: 1035000, ebitda: 1480000 },
    { period: 'May', revenue: 3650000, costs: 2555000, profit: 1095000, ebitda: 1560000 },
    { period: 'Jun', revenue: 3800000, costs: 2660000, profit: 1140000, ebitda: 1620000 }
  ];

  const expenseBreakdown = [
    { category: 'Sueldos', amount: 2820000, percentage: 35, color: '#3B82F6' },
    { category: 'Arriendo', amount: 650000, percentage: 8, color: '#10B981' },
    { category: 'Combustible', amount: 480000, percentage: 6, color: '#F59E0B' },
    { category: 'Mantención', amount: 320000, percentage: 4, color: '#EF4444' },
    { category: 'Servicios', amount: 240000, percentage: 3, color: '#8B5CF6' },
    { category: 'Otros', amount: 3490000, percentage: 44, color: '#6B7280' }
  ];

  const kpis = [
    {
      name: 'ROI',
      value: 28.5,
      unit: '%',
      trend: 'up',
      change: '+3.2%',
      benchmark: 25,
      status: 'good'
    },
    {
      name: 'EBITDA',
      value: 1620000,
      unit: 'CLP',
      trend: 'up',
      change: '+8.1%',
      benchmark: 1500000,
      status: 'excellent'
    },
    {
      name: 'Margen Bruto',
      value: 42.3,
      unit: '%',
      trend: 'up',
      change: '+1.8%',
      benchmark: 40,
      status: 'good'
    },
    {
      name: 'Liquidez',
      value: 2.4,
      unit: 'ratio',
      trend: 'down',
      change: '-0.3',
      benchmark: 2.0,
      status: 'good'
    },
    {
      name: 'Rotación Inventario',
      value: 6.8,
      unit: 'veces/año',
      trend: 'up',
      change: '+0.5',
      benchmark: 6.0,
      status: 'excellent'
    },
    {
      name: 'Días de Cobro',
      value: 32,
      unit: 'días',
      trend: 'down',
      change: '-3 días',
      benchmark: 30,
      status: 'warning'
    }
  ];

  const ratios = [
    { name: 'Ratio Corriente', value: 2.4, benchmark: 2.0, industry: 1.8 },
    { name: 'Ratio Ácido', value: 1.8, benchmark: 1.5, industry: 1.3 },
    { name: 'Endeudamiento', value: 0.35, benchmark: 0.40, industry: 0.45 },
    { name: 'ROE', value: 0.18, benchmark: 0.15, industry: 0.12 },
    { name: 'ROA', value: 0.12, benchmark: 0.10, industry: 0.08 }
  ];

  const getKPIColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'text-green-600';
      case 'good': return 'text-blue-600';
      case 'warning': return 'text-yellow-600';
      case 'critical': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getKPIBgColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'bg-green-50';
      case 'good': return 'bg-blue-50';
      case 'warning': return 'bg-yellow-50';
      case 'critical': return 'bg-red-50';
      default: return 'bg-gray-50';
    }
  };

  const getTrendIcon = (trend: string) => {
    return trend === 'up' ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />;
  };

  const getTrendColor = (trend: string) => {
    return trend === 'up' ? 'text-green-600' : 'text-red-600';
  };

  const getRatioStatus = (value: number, benchmark: number) => {
    const ratio = value / benchmark;
    if (ratio >= 1.1) return 'excellent';
    if (ratio >= 0.9) return 'good';
    if (ratio >= 0.8) return 'warning';
    return 'critical';
  };

  const totalRevenue = financialData.reduce((sum, item) => sum + item.revenue, 0);
  const totalCosts = financialData.reduce((sum, item) => sum + item.costs, 0);
  const totalProfit = totalRevenue - totalCosts;
  const profitMargin = (totalProfit / totalRevenue) * 100;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <h2 className="text-2xl font-bold text-gray-900">Análisis Financiero</h2>
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
          <button className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
            <Download className="h-5 w-5" />
            <span>Exportar Reporte</span>
          </button>
        </div>
      </div>

      {/* Financial Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="p-2 rounded-lg bg-green-50">
              <DollarSign className="h-6 w-6 text-green-600" />
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
              <p className="text-sm text-gray-500">Costos Totales</p>
              <p className="text-2xl font-bold text-red-600">CLP ${totalCosts.toLocaleString()}</p>
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
              <p className="text-2xl font-bold text-blue-600">CLP ${totalProfit.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="p-2 rounded-lg bg-purple-50">
              <BarChart3 className="h-6 w-6 text-purple-600" />
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Margen de Ganancia</p>
              <p className="text-2xl font-bold text-purple-600">{profitMargin.toFixed(1)}%</p>
            </div>
          </div>
        </div>
      </div>

      {/* KPIs Grid */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Indicadores Clave de Rendimiento (KPIs)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {kpis.map((kpi, index) => (
            <div key={index} className={`p-4 rounded-lg border ${getKPIBgColor(kpi.status)}`}>
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-medium text-gray-900">{kpi.name}</h4>
                <div className={`flex items-center text-sm ${getTrendColor(kpi.trend)}`}>
                  {getTrendIcon(kpi.trend)}
                  <span className="ml-1">{kpi.change}</span>
                </div>
              </div>
              <div className="flex items-end justify-between">
                <div>
                  <p className={`text-2xl font-bold ${getKPIColor(kpi.status)}`}>
                    {kpi.unit === 'CLP' ? `CLP ${kpi.value.toLocaleString()}` : 
                     kpi.unit === '%' ? `${kpi.value}%` : 
                     `${kpi.value} ${kpi.unit}`}
                  </p>
                  <p className="text-xs text-gray-500">
                    Benchmark: {kpi.unit === 'CLP' ? `CLP ${kpi.benchmark.toLocaleString()}` : 
                               kpi.unit === '%' ? `${kpi.benchmark}%` : 
                               `${kpi.benchmark} ${kpi.unit}`}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Financial Trend Chart */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Tendencias Financieras</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={financialData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="period" />
              <YAxis />
              <Tooltip formatter={(value) => `CLP $${value.toLocaleString()}`} />
              <Line type="monotone" dataKey="revenue" stroke="#10B981" strokeWidth={3} name="Ingresos" />
              <Line type="monotone" dataKey="costs" stroke="#EF4444" strokeWidth={3} name="Costos" />
              <Line type="monotone" dataKey="profit" stroke="#3B82F6" strokeWidth={3} name="Ganancia" />
              <Line type="monotone" dataKey="ebitda" stroke="#8B5CF6" strokeWidth={3} name="EBITDA" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Expense Breakdown */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Distribución de Gastos</h3>
          <ResponsiveContainer width="100%" height={250}>
            <RechartsPieChart>
              <Pie
                data={expenseBreakdown}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="amount"
              >
                {expenseBreakdown.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `CLP $${value.toLocaleString()}`} />
            </RechartsPieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {expenseBreakdown.map((item, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <div className={`w-3 h-3 rounded-full mr-2`} style={{ backgroundColor: item.color }} />
                  <span className="text-gray-600">{item.category}</span>
                </div>
                <div className="text-right">
                  <span className="font-medium">CLP ${item.amount.toLocaleString()}</span>
                  <span className="text-gray-500 ml-2">({item.percentage}%)</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Financial Ratios */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Ratios Financieros vs Industria</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ratio</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Valor Actual</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Benchmark</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Industria</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {ratios.map((ratio, index) => {
                const status = getRatioStatus(ratio.value, ratio.benchmark);
                return (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {ratio.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {ratio.value.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {ratio.benchmark.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {ratio.industry.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        status === 'excellent' ? 'bg-green-100 text-green-800' :
                        status === 'good' ? 'bg-blue-100 text-blue-800' :
                        status === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {status === 'excellent' ? 'Excelente' :
                         status === 'good' ? 'Bueno' :
                         status === 'warning' ? 'Atención' : 'Crítico'}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Monthly Comparison */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Comparación Mensual</h3>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={financialData}>
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
    </div>
  );
};

export default FinancialAnalysis;