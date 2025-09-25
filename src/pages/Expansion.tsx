import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { MapPin, TrendingUp, Calendar, DollarSign, AlertCircle, CheckCircle } from 'lucide-react';

const Expansion: React.FC = () => {
  const projectionData = [
    { month: 'Ene', currentStore: 285000, newStore: 0, total: 285000 },
    { month: 'Feb', currentStore: 320000, newStore: 0, total: 320000 },
    { month: 'Mar', currentStore: 298000, newStore: 0, total: 298000 },
    { month: 'Abr', currentStore: 345000, newStore: 150000, total: 495000 },
    { month: 'May', currentStore: 365000, newStore: 180000, total: 545000 },
    { month: 'Jun', currentStore: 380000, newStore: 220000, total: 600000 },
    { month: 'Jul', currentStore: 395000, newStore: 250000, total: 645000 },
  ];

  const investmentData = [
    { location: 'Centro Comercial Pionero', investment: 45000, expectedROI: 18, paybackPeriod: 14 },
    { location: 'Zona Norte Industrial', investment: 38000, expectedROI: 22, paybackPeriod: 12 },
    { location: 'Puerto Natales', investment: 52000, expectedROI: 16, paybackPeriod: 16 },
  ];

  const locations = [
    {
      name: 'Centro Comercial Pionero',
      address: 'Av. España 1450, Punta Arenas',
      score: 8.5,
      pros: ['Alto tráfico peatonal', 'Fácil acceso vehicular', 'Zona comercial establecida'],
      cons: ['Arriendo más alto', 'Competencia cercana'],
      monthlyRent: 850000,
      setupCost: 3500000,
      status: 'recommended'
    },
    {
      name: 'Zona Norte Industrial',
      address: 'Av. Manuel Bulnes 2100, Punta Arenas',
      score: 7.8,
      pros: ['Menor costo de arriendo', 'Espacio amplio', 'Buen acceso para camiones'],
      cons: ['Menor visibilidad', 'Tráfico peatonal limitado'],
      monthlyRent: 650000,
      setupCost: 2800000,
      status: 'viable'
    },
    {
      name: 'Puerto Natales',
      address: 'Eberhard 354, Puerto Natales',
      score: 7.2,
      pros: ['Mercado sin competencia directa', 'Crecimiento turístico', 'Demanda local'],
      cons: ['Mayor distancia logística', 'Mercado más pequeño', 'Estacionalidad turística'],
      monthlyRent: 450000,
      setupCost: 4200000,
      status: 'consideration'
    }
  ];

  const recommendations = [
    {
      title: 'Momento Óptimo para Expansión',
      description: 'Análisis indica que abril-mayo 2024 es el período ideal para abrir nueva sucursal',
      type: 'timing',
      priority: 'high',
      icon: Calendar
    },
    {
      title: 'Financiamiento Recomendado',
      description: 'Considerar crédito comercial del 60% del capital inicial para optimizar flujo de caja',
      type: 'finance',
      priority: 'medium',
      icon: DollarSign
    },
    {
      title: 'Inventario Inicial',
      description: 'Stock inicial estimado en CLP $1.2M basado en patrones de consumo local',
      type: 'inventory',
      priority: 'medium',
      icon: CheckCircle
    },
    {
      title: 'Riesgo de Mercado',
      description: 'Monitorear competencia en zona norte, posible entrada de cadena nacional',
      type: 'risk',
      priority: 'high',
      icon: AlertCircle
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'recommended': return 'bg-green-100 text-green-800 border-green-200';
      case 'viable': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'consideration': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'recommended': return 'Altamente Recomendado';
      case 'viable': return 'Viable';
      case 'consideration': return 'En Consideración';
      default: return 'Sin Evaluar';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-l-red-500 bg-red-50';
      case 'medium': return 'border-l-yellow-500 bg-yellow-50';
      case 'low': return 'border-l-green-500 bg-green-50';
      default: return 'border-l-gray-500 bg-gray-50';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <h2 className="text-2xl font-bold text-gray-900">Análisis de Expansión</h2>
        <div className="flex space-x-3 mt-4 sm:mt-0">
          <select className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Región de Magallanes</option>
            <option>Puerto Natales</option>
            <option>Río Gallegos</option>
          </select>
        </div>
      </div>

      {/* Revenue Projections Chart */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Proyección de Ingresos con Nueva Sucursal</h3>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={projectionData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip formatter={(value) => `CLP $${value.toLocaleString()}`} />
            <Line type="monotone" dataKey="currentStore" stroke="#3B82F6" strokeWidth={3} name="Tienda Actual" />
            <Line type="monotone" dataKey="newStore" stroke="#10B981" strokeWidth={3} name="Nueva Sucursal" strokeDasharray="5 5" />
            <Line type="monotone" dataKey="total" stroke="#8B5CF6" strokeWidth={3} name="Total Proyectado" />
          </LineChart>
        </ResponsiveContainer>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
            <span>Tienda Actual - Ingresos estables</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
            <span>Nueva Sucursal - Apertura en abril</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-purple-500 rounded-full mr-2"></div>
            <span>Proyección Total - Crecimiento 85%</span>
          </div>
        </div>
      </div>

      {/* Map Placeholder and Investment Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Map Placeholder */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Ubicaciones Propuestas</h3>
          <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center mb-4">
            <div className="text-center">
              <MapPin className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">Mapa Interactivo</p>
              <p className="text-sm text-gray-400">Ubicaciones analizadas en Punta Arenas</p>
            </div>
          </div>
        </div>

        {/* Investment Analysis */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Análisis de Inversión</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={investmentData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="location" tick={{ fontSize: 12 }} />
              <YAxis />
              <Tooltip 
                formatter={(value, name) => {
                  if (name === 'investment') return [`CLP $${value.toLocaleString()}`, 'Inversión'];
                  if (name === 'expectedROI') return [`${value}%`, 'ROI Esperado'];
                  return [value, name];
                }}
              />
              <Bar dataKey="investment" fill="#3B82F6" name="Inversión (miles)" />
              <Bar dataKey="expectedROI" fill="#10B981" name="ROI %" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Location Analysis Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {locations.map((location, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <div className="flex justify-between items-start mb-3">
              <h4 className="font-semibold text-gray-900">{location.name}</h4>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(location.status)}`}>
                {getStatusText(location.status)}
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-3">{location.address}</p>
            
            <div className="mb-3">
              <div className="flex justify-between items-center text-sm mb-1">
                <span>Puntuación</span>
                <span className="font-medium">{location.score}/10</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full" 
                  style={{ width: `${location.score * 10}%` }}
                ></div>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <div className="text-sm">
                <span className="text-gray-500">Arriendo mensual:</span>
                <span className="font-medium ml-2">CLP ${location.monthlyRent.toLocaleString()}</span>
              </div>
              <div className="text-sm">
                <span className="text-gray-500">Inversión inicial:</span>
                <span className="font-medium ml-2">CLP ${location.setupCost.toLocaleString()}</span>
              </div>
            </div>

            <div className="space-y-2">
              <div>
                <h5 className="text-xs font-medium text-green-700 mb-1">Ventajas:</h5>
                <ul className="text-xs text-gray-600 list-disc list-inside">
                  {location.pros.map((pro, i) => (
                    <li key={i}>{pro}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h5 className="text-xs font-medium text-red-700 mb-1">Desventajas:</h5>
                <ul className="text-xs text-gray-600 list-disc list-inside">
                  {location.cons.map((con, i) => (
                    <li key={i}>{con}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recommendations */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recomendaciones Estratégicas</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {recommendations.map((rec, index) => {
            const Icon = rec.icon;
            return (
              <div key={index} className={`p-4 rounded-lg border-l-4 ${getPriorityColor(rec.priority)}`}>
                <div className="flex items-start">
                  <Icon className="h-5 w-5 text-gray-600 mt-0.5 mr-3" />
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-gray-900 mb-1">{rec.title}</h4>
                    <p className="text-sm text-gray-600">{rec.description}</p>
                    <span className={`inline-block mt-2 px-2 py-1 text-xs rounded ${
                      rec.priority === 'high' ? 'bg-red-100 text-red-800' :
                      rec.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {rec.priority === 'high' ? 'Alta Prioridad' :
                       rec.priority === 'medium' ? 'Media Prioridad' : 'Baja Prioridad'}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Expansion;