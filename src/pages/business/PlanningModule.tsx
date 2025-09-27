import React, { useState } from 'react';
import { Calendar, Target, TrendingUp, BarChart3, Plus, CheckCircle, Clock, AlertTriangle } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const PlanningModule: React.FC = () => {
  const [goals, setGoals] = useState([
    {
      id: 'GOAL-001',
      title: 'Incrementar Ventas 25%',
      description: 'Aumentar las ventas totales en un 25% durante el primer semestre 2024',
      category: 'Ventas',
      priority: 'high',
      status: 'in-progress',
      startDate: '2024-01-01',
      endDate: '2024-06-30',
      progress: 65,
      targetValue: 25000000,
      currentValue: 16250000,
      responsible: 'Roberto Silva',
      kpis: [
        { name: 'Ventas Mensuales', target: 4166667, current: 3200000 },
        { name: 'Nuevos Clientes', target: 15, current: 12 },
        { name: 'Ticket Promedio', target: 85000, current: 78000 }
      ]
    },
    {
      id: 'GOAL-002',
      title: 'Reducir Costos Operacionales 15%',
      description: 'Optimizar procesos para reducir costos operacionales en 15%',
      category: 'Operaciones',
      priority: 'medium',
      status: 'in-progress',
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      progress: 40,
      targetValue: 15,
      currentValue: 6,
      responsible: 'Carlos Mendoza',
      kpis: [
        { name: 'Costo por Entrega', target: 8500, current: 9200 },
        { name: 'Eficiencia Inventario', target: 95, current: 88 },
        { name: 'Tiempo Promedio Entrega', target: 45, current: 52 }
      ]
    },
    {
      id: 'GOAL-003',
      title: 'Apertura Sucursal Puerto Natales',
      description: 'Establecer presencia comercial en Puerto Natales',
      category: 'Expansión',
      priority: 'high',
      status: 'planning',
      startDate: '2024-03-01',
      endDate: '2024-08-31',
      progress: 25,
      targetValue: 1,
      currentValue: 0,
      responsible: 'María González',
      kpis: [
        { name: 'Inversión Inicial', target: 15000000, current: 3750000 },
        { name: 'Permisos Obtenidos', target: 8, current: 3 },
        { name: 'Personal Contratado', target: 5, current: 1 }
      ]
    }
  ]);

  const [forecasts, setForecasts] = useState([
    { month: 'Feb', sales: 3200000, costs: 2240000, profit: 960000 },
    { month: 'Mar', sales: 3450000, costs: 2415000, profit: 1035000 },
    { month: 'Abr', sales: 3650000, costs: 2555000, profit: 1095000 },
    { month: 'May', sales: 3800000, costs: 2660000, profit: 1140000 },
    { month: 'Jun', sales: 4000000, costs: 2800000, profit: 1200000 },
    { month: 'Jul', sales: 4200000, costs: 2940000, profit: 1260000 }
  ]);

  const [budgets, setBudgets] = useState([
    { category: 'Ventas', budgeted: 2500000, actual: 2350000, variance: -6 },
    { category: 'Marketing', budgeted: 450000, actual: 520000, variance: 15.6 },
    { category: 'Operaciones', budgeted: 1800000, actual: 1650000, variance: -8.3 },
    { category: 'Personal', budgeted: 3200000, actual: 3200000, variance: 0 },
    { category: 'Tecnología', budgeted: 350000, actual: 280000, variance: -20 }
  ]);

  const [showGoalForm, setShowGoalForm] = useState(false);
  const [selectedTab, setSelectedTab] = useState<'goals' | 'forecasts' | 'budgets'>('goals');

  const [newGoal, setNewGoal] = useState({
    title: '',
    description: '',
    category: '',
    priority: 'medium',
    endDate: '',
    targetValue: 0,
    responsible: ''
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'planning': return 'bg-yellow-100 text-yellow-800';
      case 'delayed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-l-red-500';
      case 'medium': return 'border-l-yellow-500';
      case 'low': return 'border-l-green-500';
      default: return 'border-l-gray-500';
    }
  };

  const getVarianceColor = (variance: number) => {
    if (variance > 0) return 'text-red-600';
    if (variance < 0) return 'text-green-600';
    return 'text-gray-600';
  };

  const handleAddGoal = (e: React.FormEvent) => {
    e.preventDefault();
    const id = `GOAL-${String(goals.length + 1).padStart(3, '0')}`;
    setGoals([...goals, {
      ...newGoal,
      id,
      startDate: new Date().toISOString().split('T')[0],
      status: 'planning',
      progress: 0,
      currentValue: 0,
      kpis: []
    }]);
    setNewGoal({
      title: '',
      description: '',
      category: '',
      priority: 'medium',
      endDate: '',
      targetValue: 0,
      responsible: ''
    });
    setShowGoalForm(false);
  };

  const totalGoals = goals.length;
  const completedGoals = goals.filter(goal => goal.status === 'completed').length;
  const averageProgress = goals.reduce((sum, goal) => sum + goal.progress, 0) / goals.length;
  const delayedGoals = goals.filter(goal => goal.status === 'delayed').length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <h2 className="text-2xl font-bold text-gray-900">Planificación Estratégica</h2>
        <div className="flex space-x-2 mt-4 sm:mt-0">
          <button
            onClick={() => setSelectedTab('goals')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedTab === 'goals'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Objetivos
          </button>
          <button
            onClick={() => setSelectedTab('forecasts')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedTab === 'forecasts'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Proyecciones
          </button>
          <button
            onClick={() => setSelectedTab('budgets')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedTab === 'budgets'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Presupuestos
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="p-2 rounded-lg bg-blue-50">
              <Target className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-500">Objetivos Totales</h3>
            <p className="text-2xl font-bold text-blue-600 mt-1">{totalGoals}</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="p-2 rounded-lg bg-green-50">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-500">Completados</h3>
            <p className="text-2xl font-bold text-green-600 mt-1">{completedGoals}</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="p-2 rounded-lg bg-purple-50">
              <TrendingUp className="h-6 w-6 text-purple-600" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-500">Progreso Promedio</h3>
            <p className="text-2xl font-bold text-purple-600 mt-1">{Math.round(averageProgress)}%</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="p-2 rounded-lg bg-red-50">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-500">Con Retraso</h3>
            <p className="text-2xl font-bold text-red-600 mt-1">{delayedGoals}</p>
          </div>
        </div>
      </div>

      {selectedTab === 'goals' && (
        <>
          <div className="flex justify-end">
            <button
              onClick={() => setShowGoalForm(true)}
              className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="h-5 w-5" />
              <span>Nuevo Objetivo</span>
            </button>
          </div>

          <div className="space-y-4">
            {goals.map((goal) => (
              <div key={goal.id} className={`bg-white rounded-lg shadow-sm border border-gray-100 border-l-4 ${getPriorityColor(goal.priority)}`}>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{goal.title}</h3>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(goal.status)}`}>
                          {goal.status === 'completed' ? 'Completado' :
                           goal.status === 'in-progress' ? 'En Progreso' :
                           goal.status === 'planning' ? 'Planificación' : 'Con Retraso'}
                        </span>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          goal.priority === 'high' ? 'bg-red-100 text-red-800' :
                          goal.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {goal.priority === 'high' ? 'Alta' : goal.priority === 'medium' ? 'Media' : 'Baja'} Prioridad
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{goal.description}</p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div className="flex items-center text-gray-500">
                          <Calendar className="h-4 w-4 mr-1" />
                          {goal.startDate} - {goal.endDate}
                        </div>
                        <div className="flex items-center text-gray-500">
                          <Target className="h-4 w-4 mr-1" />
                          {goal.category}
                        </div>
                        <div className="flex items-center text-gray-500">
                          <Clock className="h-4 w-4 mr-1" />
                          {goal.progress}% completado
                        </div>
                        <div className="text-gray-500">
                          Responsable: {goal.responsible}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Progreso del Objetivo</span>
                      <span className="font-medium">{goal.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${goal.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* KPIs */}
                  {goal.kpis.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 mb-2">KPIs Asociados</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {goal.kpis.map((kpi, index) => (
                          <div key={index} className="bg-gray-50 rounded-lg p-3">
                            <h5 className="text-sm font-medium text-gray-700">{kpi.name}</h5>
                            <div className="flex justify-between items-center mt-1">
                              <span className="text-sm text-gray-500">
                                {kpi.current.toLocaleString()} / {kpi.target.toLocaleString()}
                              </span>
                              <span className={`text-sm font-medium ${
                                kpi.current >= kpi.target ? 'text-green-600' : 'text-orange-600'
                              }`}>
                                {Math.round((kpi.current / kpi.target) * 100)}%
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-1 mt-1">
                              <div 
                                className={`h-1 rounded-full ${
                                  kpi.current >= kpi.target ? 'bg-green-600' : 'bg-orange-600'
                                }`}
                                style={{ width: `${Math.min((kpi.current / kpi.target) * 100, 100)}%` }}
                              ></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {selectedTab === 'forecasts' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Proyecciones Financieras</h3>
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={forecasts}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => `CLP $${value.toLocaleString()}`} />
                <Line type="monotone" dataKey="sales" stroke="#10B981" strokeWidth={3} name="Ventas Proyectadas" />
                <Line type="monotone" dataKey="costs" stroke="#EF4444" strokeWidth={3} name="Costos Proyectados" />
                <Line type="monotone" dataKey="profit" stroke="#3B82F6" strokeWidth={3} name="Ganancia Proyectada" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
              <h4 className="text-sm font-medium text-gray-500 mb-2">Ventas Proyectadas (6 meses)</h4>
              <p className="text-2xl font-bold text-green-600">CLP ${forecasts.reduce((sum, f) => sum + f.sales, 0).toLocaleString()}</p>
              <p className="text-sm text-gray-500 mt-1">Crecimiento esperado: 31.25%</p>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
              <h4 className="text-sm font-medium text-gray-500 mb-2">Costos Proyectados (6 meses)</h4>
              <p className="text-2xl font-bold text-red-600">CLP ${forecasts.reduce((sum, f) => sum + f.costs, 0).toLocaleString()}</p>
              <p className="text-sm text-gray-500 mt-1">Optimización esperada: 8%</p>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
              <h4 className="text-sm font-medium text-gray-500 mb-2">Ganancia Proyectada (6 meses)</h4>
              <p className="text-2xl font-bold text-blue-600">CLP ${forecasts.reduce((sum, f) => sum + f.profit, 0).toLocaleString()}</p>
              <p className="text-sm text-gray-500 mt-1">Margen esperado: 30.2%</p>
            </div>
          </div>
        </div>
      )}

      {selectedTab === 'budgets' && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Control Presupuestario</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Categoría</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Presupuestado</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Real</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Variación</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {budgets.map((budget, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <BarChart3 className="h-5 w-5 text-gray-400 mr-3" />
                        <span className="text-sm font-medium text-gray-900">{budget.category}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      CLP ${budget.budgeted.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      CLP ${budget.actual.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`text-sm font-medium ${getVarianceColor(budget.variance)}`}>
                        {budget.variance > 0 ? '+' : ''}{budget.variance.toFixed(1)}%
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {Math.abs(budget.variance) <= 5 ? (
                          <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                        ) : Math.abs(budget.variance) <= 15 ? (
                          <Clock className="h-4 w-4 text-yellow-500 mr-1" />
                        ) : (
                          <AlertTriangle className="h-4 w-4 text-red-500 mr-1" />
                        )}
                        <span className="text-sm">
                          {Math.abs(budget.variance) <= 5 ? 'En Meta' :
                           Math.abs(budget.variance) <= 15 ? 'Atención' : 'Crítico'}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add Goal Form Modal */}
      {showGoalForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-full max-w-2xl shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Nuevo Objetivo Estratégico</h3>
              <form onSubmit={handleAddGoal} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Título del Objetivo</label>
                  <input
                    type="text"
                    required
                    value={newGoal.title}
                    onChange={(e) => setNewGoal({...newGoal, title: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                  <textarea
                    required
                    value={newGoal.description}
                    onChange={(e) => setNewGoal({...newGoal, description: e.target.value})}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Categoría</label>
                    <select
                      required
                      value={newGoal.category}
                      onChange={(e) => setNewGoal({...newGoal, category: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Seleccionar categoría</option>
                      <option value="Ventas">Ventas</option>
                      <option value="Operaciones">Operaciones</option>
                      <option value="Expansión">Expansión</option>
                      <option value="Tecnología">Tecnología</option>
                      <option value="Personal">Personal</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Prioridad</label>
                    <select
                      value={newGoal.priority}
                      onChange={(e) => setNewGoal({...newGoal, priority: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="low">Baja</option>
                      <option value="medium">Media</option>
                      <option value="high">Alta</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Fecha Límite</label>
                    <input
                      type="date"
                      required
                      value={newGoal.endDate}
                      onChange={(e) => setNewGoal({...newGoal, endDate: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Valor Meta</label>
                    <input
                      type="number"
                      required
                      min="0"
                      value={newGoal.targetValue}
                      onChange={(e) => setNewGoal({...newGoal, targetValue: parseInt(e.target.value) || 0})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Responsable</label>
                  <input
                    type="text"
                    required
                    value={newGoal.responsible}
                    onChange={(e) => setNewGoal({...newGoal, responsible: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="flex space-x-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Crear Objetivo
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowGoalForm(false)}
                    className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition-colors"
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlanningModule;