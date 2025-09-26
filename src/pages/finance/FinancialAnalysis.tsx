import React, { useState } from 'react';
import { TrendingUp, TrendingDown, DollarSign, PieChart, BarChart3, Calendar, Download, Filter } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart as RechartsPieChart, Pie, Cell } from 'recharts';

const FinancialAnalysis: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('year');
  const [selectedMetric, setSelectedMetric] = useState('revenue');

  const financialData = [
    { period: 'Ene', revenue: 2850000, expenses: 1995000, profit: 855000, margin: 30.0 },
    { period: 'Feb', revenue: 3200000, expenses: 2240000, profit: 960000, margin: 30.0 },
    { period: 'Mar', revenue: 2980000, expenses: 2086000, profit: 894000, margin: 30.0 },
    { period: 'Abr', revenue: 3450000, expenses: 2415000, profit: 1035000, margin: 30.0 },
    { period: 'May', revenue: 3650000, expenses: 2555000, profit: 1095000, margin: 30.0 },
    { period: 'Jun', revenue: 3800000, expenses: 2660000, profit: 1140000, margin: 30.0 },
    { period: 'Jul', revenue: 4000000, expenses: 2800000, profit: 1200000, margin: 30.0 },
    { period: 'Ago', revenue: 4200000, expenses: 2940000, profit: 1260000, margin: 30.0 },
    { period: 'Sep', revenue: 3950000, expenses: 2765000, profit: 1185000, margin: 30.0 },
    { period: 'Oct', revenue: 4100000, expenses: 2870000, profit: 1230000, margin: 30.0 },
    { period: 'Nov', revenue: 4350000, expenses: 3045000, profit: 1305000, margin: 30.0 },
    { period: 'Dic', revenue: 4500000, expenses: 3150000, profit: 1350000, margin: 30.0 }
  ];

  const expenseBreakdown = [
    { category: 'Costo de Ventas', amount: 18500000, percentage: 45, color: '#EF4444' },
    { category: 'Sueldos y Salarios', category: 'Sueldos y Salarios', amount: 12800000, percentage: 31, color: '#3B82F6' },
    { category: 'Gastos Operacionales', amount: 6200000, percentage: 15, color: '#F59E0B' },
    { category: 'Marketing y Publicidad', amount: 2100000, percentage: 5, color: '#10B981' },
    { category: 'Otros Gastos', amount: 1650000, percentage: 4, color: '#8B5CF6' }
  ];

  const kpiData = [
    {
      name: 'ROI (Return on Investment)',
      value: 28.5,
      unit: '%',
      trend: 'up',
      change: '+2.3%',
      description: 'Retorno sobre la inversión'
    },
    {
      name: 'EBITDA',
      value: 15200000,
      unit: 'CLP',
      trend: 'up',
      change: '+12.8%',
      description: 'Ganancias antes de intereses, impuestos, depreciación y amortización'
    },
    {
      name: 'Margen Bruto',
      value: 55.2,
      unit: '%',
      trend: 'up',
      change: '+1.8%',
      description: 'Porcentaje de ganancia bruta sobre ventas'
    },
    {
      name: 'Ratio de Liquidez',
      value: 2.4,
      unit: 'x',
      trend: 'down',
      change: '-0.2',
      description: 'Capacidad para cubrir obligaciones a corto plazo'
    },
    {
      name: 'Rotación de Inventario',
      value: 8.5,
      unit: 'x',
      trend: 'up',
      change: '+0.7',
      description: 'Veces que se renueva el inventario por año'
    },
    {
      name: 'Días de Cobranza',
      value: 32,
      unit: 'días',
      trend: 'down',
      change: '-3 días',
      description: 'Tiempo promedio para cobrar cuentas por cobrar'
    }
  ];

  const ratioAnalysis = [
    { name: 'Ratio Corriente', current: 2.4, industry: 2.1, status: 'good' },
    { name: 'Ratio Ácido', current: 1.8, industry: 1.5, status: 'excellent' },
    { name: 'Ratio de Endeudamiento', current: 0.35, industry: 0.45, status: 'excellent' },
    { name: 'ROE', current: 18.5, industry: 15.2, status: 'good' },
    { name: 'ROA', current: 12.3, industry: 9.8, status: 'excellent' }
  ];

  const getRatioColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'text-green-600';
      case 'good': return 'text-blue-600';
      case 'warning': return 'text-yellow-600';
      case 'poor': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getTrendIcon = (trend: string) => {
    return trend === 'up' ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />;
  };

  const getTrendColor = (trend: string) => {
    return trend === 'up' ? 'text-green-600' : 'text-red-600';
  };

  const totalRevenue = financialData.reduce((sum, item) => sum + item.revenue, 0);
  const totalExpenses = financialData.reduce((sum, item) => sum + item.expenses, 0);
  const totalProfit = totalRevenue - totalExpenses;
  const profitMargin = ((totalProfit / totalRevenue) * 100).toFixed(1);

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
              <option value="month">Este mes</option>
              <option value="quarter">Este trimestre</option>
              <option value="year">Este año</option>
              <option value="custom">Período personalizado</option>
            </select>
          </div>
          <button className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
            <Download className="h-5 w-5" />
            <span>Exportar Análisis</span>
          </button>
        </div>
      </div>

      {/* Financial Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
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
              <DollarSign className="h-6 w-6 text-blue-600" />
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
              <PieChart className="h-6 w-6 text-purple-600" />
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Margen de Ganancia</p>
              <p className="text-2xl font-bold text-purple-600">{profitMargin}%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Financial Trend Chart */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Tendencias Financieras</h3>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={financialData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="period" />
            <YAxis />
            <Tooltip formatter={(value) => `CLP $${value.toLocaleString()}`} />
            <Line type="monotone" dataKey="revenue" stroke="#10B981" strokeWidth={3} name="Ingresos" />
            <Line type="monotone" dataKey="expenses" stroke="#EF4444" strokeWidth={3} name="Gastos" />
            <Line type="monotone" dataKey="profit" stroke="#3B82F6" strokeWidth={3} name="Ganancia" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Expense Breakdown */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Distribución de Gastos</h3>
          <ResponsiveContainer width="100%" height={300}>
            <RechartsPieChart>
              <Pie
                data={expenseBreakdown}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={120}
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

        {/* KPIs Grid */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Indicadores Clave (KPIs)</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {kpiData.map((kpi, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-medium text-gray-900">{kpi.name}</h4>
                  <div className={`flex items-center text-sm ${getTrendColor(kpi.trend)}`}>
                    {getTrendIcon(kpi.trend)}
                    <span className="ml-1">{kpi.change}</span>
                  </div>
                </div>
                <div className="flex items-baseline space-x-1">
                  <span className="text-2xl font-bold text-gray-900">
                    {kpi.unit === 'CLP' ? `CLP $${kpi.value.toLocaleString()}` : `${kpi.value}${kpi.unit}`}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1">{kpi.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Ratio Analysis */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Análisis de Ratios Financieros</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ratio</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Valor Actual</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Promedio Industria</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Evaluación</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Recomendación</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {ratioAnalysis.map((ratio, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {ratio.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {ratio.current}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {ratio.industry}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`text-sm font-medium ${getRatioColor(ratio.status)}`}>
                      {ratio.status === 'excellent' ? 'Excelente' :
                       ratio.status === 'good' ? 'Bueno' :
                       ratio.status === 'warning' ? 'Atención' : 'Deficiente'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {ratio.status === 'excellent' ? 'Mantener nivel actual' :
                     ratio.status === 'good' ? 'Continuar mejorando' :
                     ratio.status === 'warning' ? 'Revisar estrategia' : 'Acción inmediata requerida'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Monthly Performance */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Rendimiento Mensual Detallado</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Período</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ingresos</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gastos</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ganancia</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Margen</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Crecimiento</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {financialData.map((data, index) => {
                const previousMonth = index > 0 ? financialData[index - 1] : null;
                const growth = previousMonth 
                  ? (((data.revenue - previousMonth.revenue) / previousMonth.revenue) * 100).toFixed(1)
                  : '0.0';
                return (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {data.period}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                      CLP ${data.revenue.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-red-600">
                      CLP ${data.expenses.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                      CLP ${data.profit.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {data.margin.toFixed(1)}%
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`text-sm font-medium ${parseFloat(growth) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {parseFloat(growth) >= 0 ? '+' : ''}{growth}%
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FinancialAnalysis;