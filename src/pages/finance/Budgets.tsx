import React, { useState } from 'react';
import { Target, Plus, Calendar, TrendingUp, TrendingDown, AlertTriangle, CheckCircle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Budgets: React.FC = () => {
  const [budgets, setBudgets] = useState([
    {
      id: 'BUD-001',
      category: 'Ventas',
      period: '2024',
      budgeted: 30000000,
      actual: 19930000,
      variance: -33.6,
      status: 'on-track',
      lastUpdate: '2024-01-20'
    },
    {
      id: 'BUD-002',
      category: 'Marketing',
      period: '2024',
      budgeted: 5400000,
      actual: 3120000,
      variance: -42.2,
      status: 'under-budget',
      lastUpdate: '2024-01-20'
    },
    {
      id: 'BUD-003',
      category: 'Operaciones',
      period: '2024',
      budgeted: 21600000,
      actual: 13950000,
      variance: -35.4,
      status: 'on-track',
      lastUpdate: '2024-01-20'
    },
    {
      id: 'BUD-004',
      category: 'Personal',
      period: '2024',
      budgeted: 38400000,
      actual: 19200000,
      variance: -50.0,
      status: 'on-track',
      lastUpdate: '2024-01-20'
    },
    {
      id: 'BUD-005',
      category: 'Tecnología',
      period: '2024',
      budgeted: 4200000,
      actual: 1680000,
      variance: -60.0,
      status: 'under-budget',
      lastUpdate: '2024-01-20'
    }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [newBudget, setNewBudget] = useState({
    category: '',
    period: '2024',
    budgeted: 0
  });

  const monthlyBudgetData = [
    { month: 'Ene', budgeted: 8333333, actual: 7950000 },
    { month: 'Feb', budgeted: 8333333, actual: 8200000 },
    { month: 'Mar', budgeted: 8333333, actual: 7800000 },
    { month: 'Abr', budgeted: 8333333, actual: 8500000 },
    { month: 'May', budgeted: 8333333, actual: 8650000 },
    { month: 'Jun', budgeted: 8333333, actual: 8900000 }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'on-track': return 'bg-green-100 text-green-800';
      case 'over-budget': return 'bg-red-100 text-red-800';
      case 'under-budget': return 'bg-blue-100 text-blue-800';
      case 'at-risk': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'on-track': return <CheckCircle className="h-4 w-4" />;
      case 'over-budget': return <TrendingUp className="h-4 w-4" />;
      case 'under-budget': return <TrendingDown className="h-4 w-4" />;
      case 'at-risk': return <AlertTriangle className="h-4 w-4" />;
      default: return <Target className="h-4 w-4" />;
    }
  };

  const getVarianceColor = (variance: number) => {
    if (variance > 10) return 'text-red-600';
    if (variance < -10) return 'text-blue-600';
    return 'text-green-600';
  };

  const handleAddBudget = (e: React.FormEvent) => {
    e.preventDefault();
    const id = `BUD-${String(budgets.length + 1).padStart(3, '0')}`;
    setBudgets([...budgets, {
      ...newBudget,
      id,
      actual: 0,
      variance: 0,
      status: 'on-track',
      lastUpdate: new Date().toISOString().split('T')[0]
    }]);
    setNewBudget({
      category: '',
      period: '2024',
      budgeted: 0
    });
    setShowForm(false);
  };

  const totalBudgeted = budgets.reduce((sum, budget) => sum + budget.budgeted, 0);
  const totalActual = budgets.reduce((sum, budget) => sum + budget.actual, 0);
  const overallVariance = ((totalActual - totalBudgeted) / totalBudgeted) * 100;
  const onTrackBudgets = budgets.filter(budget => budget.status === 'on-track').length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <h2 className="text-2xl font-bold text-gray-900">Presupuestos</h2>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors mt-4 sm:mt-0"
        >
          <Plus className="h-5 w-5" />
          <span>Nuevo Presupuesto</span>
        </button>
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
            <h3 className="text-sm font-medium text-gray-500">Presupuesto Total</h3>
            <p className="text-2xl font-bold text-blue-600 mt-1">CLP ${totalBudgeted.toLocaleString()}</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="p-2 rounded-lg bg-green-50">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-500">Ejecutado</h3>
            <p className="text-2xl font-bold text-green-600 mt-1">CLP ${totalActual.toLocaleString()}</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="p-2 rounded-lg bg-purple-50">
              <TrendingDown className="h-6 w-6 text-purple-600" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-500">Variación General</h3>
            <p className={`text-2xl font-bold mt-1 ${getVarianceColor(overallVariance)}`}>
              {overallVariance > 0 ? '+' : ''}{overallVariance.toFixed(1)}%
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="p-2 rounded-lg bg-orange-50">
              <CheckCircle className="h-6 w-6 text-orange-600" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-500">En Meta</h3>
            <p className="text-2xl font-bold text-orange-600 mt-1">{onTrackBudgets}</p>
          </div>
        </div>
      </div>

      {/* Budget vs Actual Chart */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Presupuesto vs Real - Mensual</h3>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={monthlyBudgetData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip formatter={(value) => `CLP $${value.toLocaleString()}`} />
            <Bar dataKey="budgeted" fill="#3B82F6" name="Presupuestado" />
            <Bar dataKey="actual" fill="#10B981" name="Real" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Budgets Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Control Presupuestario</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Categoría</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Período</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Presupuestado</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Real</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Variación</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Última Actualización</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {budgets.map((budget) => (
                <tr key={budget.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Target className="h-5 w-5 text-gray-400 mr-3" />
                      <span className="text-sm font-medium text-gray-900">{budget.category}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {budget.period}
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
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(budget.status)}`}>
                      {getStatusIcon(budget.status)}
                      <span className="ml-1">
                        {budget.status === 'on-track' ? 'En Meta' :
                         budget.status === 'over-budget' ? 'Sobre Presupuesto' :
                         budget.status === 'under-budget' ? 'Bajo Presupuesto' : 'En Riesgo'}
                      </span>
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {budget.lastUpdate}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Budget Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-full max-w-md shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Nuevo Presupuesto</h3>
              <form onSubmit={handleAddBudget} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Categoría</label>
                  <input
                    type="text"
                    required
                    value={newBudget.category}
                    onChange={(e) => setNewBudget({...newBudget, category: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Período</label>
                  <select
                    value={newBudget.period}
                    onChange={(e) => setNewBudget({...newBudget, period: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="2024">2024</option>
                    <option value="2025">2025</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Monto Presupuestado (CLP)</label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={newBudget.budgeted}
                    onChange={(e) => setNewBudget({...newBudget, budgeted: parseInt(e.target.value) || 0})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="flex space-x-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Crear Presupuesto
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
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

export default Budgets;