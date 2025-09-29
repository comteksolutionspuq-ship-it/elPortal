import React, { useState } from 'react';
import { TrendingUp, Plus, DollarSign, Calendar, BarChart3, Target, AlertTriangle, CheckCircle } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const Investments: React.FC = () => {
  const [investments, setInvestments] = useState([
    {
      id: 'INV-001',
      name: 'Expansión Sucursal Norte',
      type: 'expansion',
      amount: 15000000,
      currentValue: 18500000,
      roi: 23.3,
      startDate: '2023-04-01',
      maturityDate: '2025-04-01',
      status: 'active',
      risk: 'medium',
      expectedReturn: 25,
      actualReturn: 23.3
    },
    {
      id: 'INV-002',
      name: 'Sistema de Inventario RFID',
      type: 'technology',
      amount: 8500000,
      currentValue: 9200000,
      roi: 8.2,
      startDate: '2023-08-15',
      maturityDate: '2026-08-15',
      status: 'active',
      risk: 'low',
      expectedReturn: 15,
      actualReturn: 8.2
    },
    {
      id: 'INV-003',
      name: 'Flota de Vehículos Eléctricos',
      type: 'equipment',
      amount: 25000000,
      currentValue: 22000000,
      roi: -12.0,
      startDate: '2023-10-01',
      maturityDate: '2028-10-01',
      status: 'underperforming',
      risk: 'high',
      expectedReturn: 18,
      actualReturn: -12.0
    },
    {
      id: 'INV-004',
      name: 'Certificación ISO 9001',
      type: 'certification',
      amount: 4500000,
      currentValue: 6200000,
      roi: 37.8,
      startDate: '2023-06-01',
      maturityDate: '2024-06-01',
      status: 'completed',
      risk: 'low',
      expectedReturn: 20,
      actualReturn: 37.8
    }
  ]);

  const [portfolioData] = useState([
    { month: 'Ene', value: 52000000, returns: 1200000 },
    { month: 'Feb', value: 53200000, returns: 1350000 },
    { month: 'Mar', value: 54100000, returns: 1180000 },
    { month: 'Abr', value: 55800000, returns: 1650000 },
    { month: 'May', value: 56900000, returns: 1420000 },
    { month: 'Jun', value: 58200000, returns: 1580000 }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [newInvestment, setNewInvestment] = useState({
    name: '',
    type: 'expansion',
    amount: 0,
    expectedReturn: 0,
    maturityDate: '',
    risk: 'medium'
  });

  const investmentTypes = [
    { id: 'expansion', name: 'Expansión' },
    { id: 'technology', name: 'Tecnología' },
    { id: 'equipment', name: 'Equipamiento' },
    { id: 'certification', name: 'Certificaciones' },
    { id: 'real-estate', name: 'Bienes Raíces' }
  ];

  const riskLevels = [
    { id: 'low', name: 'Bajo', color: 'bg-green-100 text-green-800' },
    { id: 'medium', name: 'Medio', color: 'bg-yellow-100 text-yellow-800' },
    { id: 'high', name: 'Alto', color: 'bg-red-100 text-red-800' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'underperforming': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRiskColor = (risk: string) => {
    const riskLevel = riskLevels.find(r => r.id === risk);
    return riskLevel?.color || 'bg-gray-100 text-gray-800';
  };

  const getROIColor = (roi: number) => {
    if (roi >= 20) return 'text-green-600';
    if (roi >= 10) return 'text-blue-600';
    if (roi >= 0) return 'text-yellow-600';
    return 'text-red-600';
  };

  const handleAddInvestment = (e: React.FormEvent) => {
    e.preventDefault();
    const id = `INV-${String(investments.length + 1).padStart(3, '0')}`;
    setInvestments([...investments, {
      ...newInvestment,
      id,
      currentValue: newInvestment.amount,
      roi: 0,
      startDate: new Date().toISOString().split('T')[0],
      status: 'pending',
      actualReturn: 0
    }]);
    setNewInvestment({
      name: '',
      type: 'expansion',
      amount: 0,
      expectedReturn: 0,
      maturityDate: '',
      risk: 'medium'
    });
    setShowForm(false);
  };

  const totalInvested = investments.reduce((sum, inv) => sum + inv.amount, 0);
  const totalCurrentValue = investments.reduce((sum, inv) => sum + inv.currentValue, 0);
  const portfolioROI = ((totalCurrentValue - totalInvested) / totalInvested) * 100;
  const activeInvestments = investments.filter(inv => inv.status === 'active').length;

  const investmentDistribution = investmentTypes.map(type => {
    const typeInvestments = investments.filter(inv => inv.type === type.id);
    const totalAmount = typeInvestments.reduce((sum, inv) => sum + inv.amount, 0);
    return {
      name: type.name,
      value: totalAmount,
      color: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'][investmentTypes.indexOf(type)]
    };
  }).filter(item => item.value > 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <h2 className="text-2xl font-bold text-gray-900">Inversiones</h2>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors mt-4 sm:mt-0"
        >
          <Plus className="h-5 w-5" />
          <span>Nueva Inversión</span>
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="p-2 rounded-lg bg-blue-50">
              <DollarSign className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-500">Total Invertido</h3>
            <p className="text-2xl font-bold text-blue-600 mt-1">CLP ${totalInvested.toLocaleString()}</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="p-2 rounded-lg bg-green-50">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-500">Valor Actual</h3>
            <p className="text-2xl font-bold text-green-600 mt-1">CLP ${totalCurrentValue.toLocaleString()}</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="p-2 rounded-lg bg-purple-50">
              <BarChart3 className="h-6 w-6 text-purple-600" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-500">ROI del Portfolio</h3>
            <p className={`text-2xl font-bold mt-1 ${getROIColor(portfolioROI)}`}>
              {portfolioROI.toFixed(1)}%
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="p-2 rounded-lg bg-orange-50">
              <Target className="h-6 w-6 text-orange-600" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-500">Inversiones Activas</h3>
            <p className="text-2xl font-bold text-orange-600 mt-1">{activeInvestments}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Portfolio Performance */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Rendimiento del Portfolio</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={portfolioData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => `CLP $${value.toLocaleString()}`} />
              <Line type="monotone" dataKey="value" stroke="#3B82F6" strokeWidth={3} name="Valor Portfolio" />
              <Line type="monotone" dataKey="returns" stroke="#10B981" strokeWidth={3} name="Retornos" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Investment Distribution */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Distribución de Inversiones</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={investmentDistribution}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {investmentDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `CLP $${value.toLocaleString()}`} />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {investmentDistribution.map((item, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <div className={`w-3 h-3 rounded-full mr-2`} style={{ backgroundColor: item.color }} />
                  <span className="text-gray-600">{item.name}</span>
                </div>
                <span className="font-medium">CLP ${item.value.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Investments Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Portfolio de Inversiones</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Inversión</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Monto Inicial</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Valor Actual</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ROI</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Riesgo</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vencimiento</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {investments.map((investment) => (
                <tr key={investment.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <TrendingUp className="h-5 w-5 text-gray-400 mr-3" />
                      <div>
                        <div className="text-sm font-medium text-gray-900">{investment.name}</div>
                        <div className="text-sm text-gray-500">{investment.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {investmentTypes.find(t => t.id === investment.type)?.name}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    CLP ${investment.amount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                    CLP ${investment.currentValue.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`text-sm font-medium ${getROIColor(investment.roi)}`}>
                      {investment.roi > 0 ? '+' : ''}{investment.roi.toFixed(1)}%
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRiskColor(investment.risk)}`}>
                      {riskLevels.find(r => r.id === investment.risk)?.name}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(investment.status)}`}>
                      {investment.status === 'active' ? 'Activa' :
                       investment.status === 'completed' ? 'Completada' :
                       investment.status === 'underperforming' ? 'Bajo Rendimiento' : 'Pendiente'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {investment.maturityDate}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Investment Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-full max-w-2xl shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Nueva Inversión</h3>
              <form onSubmit={handleAddInvestment} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nombre de la Inversión</label>
                  <input
                    type="text"
                    required
                    value={newInvestment.name}
                    onChange={(e) => setNewInvestment({...newInvestment, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
                    <select
                      value={newInvestment.type}
                      onChange={(e) => setNewInvestment({...newInvestment, type: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {investmentTypes.map(type => (
                        <option key={type.id} value={type.id}>{type.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nivel de Riesgo</label>
                    <select
                      value={newInvestment.risk}
                      onChange={(e) => setNewInvestment({...newInvestment, risk: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {riskLevels.map(risk => (
                        <option key={risk.id} value={risk.id}>{risk.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Monto (CLP)</label>
                    <input
                      type="number"
                      required
                      min="0"
                      value={newInvestment.amount}
                      onChange={(e) => setNewInvestment({...newInvestment, amount: parseInt(e.target.value) || 0})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Retorno Esperado (%)</label>
                    <input
                      type="number"
                      required
                      min="0"
                      step="0.1"
                      value={newInvestment.expectedReturn}
                      onChange={(e) => setNewInvestment({...newInvestment, expectedReturn: parseFloat(e.target.value) || 0})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de Vencimiento</label>
                  <input
                    type="date"
                    required
                    value={newInvestment.maturityDate}
                    onChange={(e) => setNewInvestment({...newInvestment, maturityDate: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="flex space-x-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Crear Inversión
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

export default Investments;