import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, TrendingDown, Package, Truck, DollarSign, AlertTriangle } from 'lucide-react';

const Dashboard: React.FC = () => {
  const salesData = [
    { month: 'Ene', sales: 45000, costs: 30000 },
    { month: 'Feb', sales: 52000, costs: 35000 },
    { month: 'Mar', sales: 48000, costs: 32000 },
    { month: 'Abr', sales: 61000, costs: 40000 },
    { month: 'May', sales: 55000, costs: 37000 },
    { month: 'Jun', sales: 67000, costs: 45000 },
  ];

  const productData = [
    { name: 'Platos Desechables', value: 35, color: '#3B82F6' },
    { name: 'Vasos Plásticos', value: 25, color: '#10B981' },
    { name: 'Mascarillas', value: 20, color: '#F59E0B' },
    { name: 'Guantes', value: 15, color: '#EF4444' },
    { name: 'Otros', value: 5, color: '#8B5CF6' },
  ];

  const kpis = [
    {
      title: 'Ventas Totales',
      value: 'CLP $328,000',
      change: '+12.5%',
      trend: 'up',
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Gastos',
      value: 'CLP $219,000',
      change: '+8.2%',
      trend: 'up',
      icon: TrendingUp,
      color: 'text-red-600',
      bgColor: 'bg-red-50'
    },
    {
      title: 'Entregas',
      value: '142',
      change: '+18.1%',
      trend: 'up',
      icon: Truck,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Rotación Inventario',
      value: '2.4x',
      change: '-5.4%',
      trend: 'down',
      icon: Package,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    },
  ];

  const alerts = [
    {
      title: 'Stock Bajo: Mascarillas N95',
      message: 'Solo quedan 15 unidades en inventario',
      type: 'warning'
    },
    {
      title: 'Precio Sugerido: Platos Biodegradables',
      message: 'Incrementar precio en 8% basado en análisis de margen',
      type: 'info'
    },
    {
      title: 'Ruta Optimizada',
      message: 'Nueva ruta disponible que reduce tiempo en 15%',
      type: 'success'
    }
  ];

  return (
    <div className="space-y-6">
      {/* KPIs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, index) => {
          const Icon = kpi.icon;
          const TrendIcon = kpi.trend === 'up' ? TrendingUp : TrendingDown;
          return (
            <div key={index} className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
              <div className="flex items-center justify-between">
                <div className={`p-2 rounded-lg ${kpi.bgColor}`}>
                  <Icon className={`h-6 w-6 ${kpi.color}`} />
                </div>
                <div className={`flex items-center text-sm ${kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                  <TrendIcon className="h-4 w-4 mr-1" />
                  {kpi.change}
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-sm font-medium text-gray-500">{kpi.title}</h3>
                <p className="text-2xl font-bold text-gray-900 mt-1">{kpi.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Trend Chart */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Tendencia de Ventas vs Costos</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => `CLP $${value.toLocaleString()}`} />
              <Line type="monotone" dataKey="sales" stroke="#3B82F6" strokeWidth={3} name="Ventas" />
              <Line type="monotone" dataKey="costs" stroke="#EF4444" strokeWidth={3} name="Costos" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Product Distribution Chart */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Distribución de Productos</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={productData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {productData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `${value}%`} />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {productData.map((item, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <div className={`w-3 h-3 rounded-full mr-2`} style={{ backgroundColor: item.color }} />
                  <span className="text-gray-600">{item.name}</span>
                </div>
                <span className="font-medium">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Alerts Section */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Alertas y Recomendaciones</h3>
        <div className="space-y-4">
          {alerts.map((alert, index) => (
            <div key={index} className={`p-4 rounded-lg border-l-4 ${
              alert.type === 'warning' ? 'bg-yellow-50 border-yellow-400' :
              alert.type === 'info' ? 'bg-blue-50 border-blue-400' :
              'bg-green-50 border-green-400'
            }`}>
              <div className="flex">
                <AlertTriangle className={`h-5 w-5 ${
                  alert.type === 'warning' ? 'text-yellow-400' :
                  alert.type === 'info' ? 'text-blue-400' :
                  'text-green-400'
                }`} />
                <div className="ml-3">
                  <h4 className="text-sm font-medium text-gray-900">{alert.title}</h4>
                  <p className="text-sm text-gray-600 mt-1">{alert.message}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;