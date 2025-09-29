import React, { useState } from 'react';
import { Megaphone, Plus, Eye, Mail, Phone, Target, BarChart3, Calendar, Users, TrendingUp } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const MarketingCampaigns: React.FC = () => {
  const [campaigns, setCampaigns] = useState([
    {
      id: 'CAMP-001',
      name: 'Campaña Productos Biodegradables',
      type: 'email',
      status: 'active',
      startDate: '2024-01-15',
      endDate: '2024-02-15',
      budget: 500000,
      spent: 320000,
      targetAudience: 'Empresas',
      reach: 1250,
      impressions: 8500,
      clicks: 340,
      conversions: 45,
      revenue: 2400000,
      ctr: 4.0,
      conversionRate: 13.2,
      roas: 7.5
    },
    {
      id: 'CAMP-002',
      name: 'Oferta Especial Instituciones',
      type: 'phone',
      status: 'completed',
      startDate: '2024-01-01',
      endDate: '2024-01-31',
      budget: 300000,
      spent: 285000,
      targetAudience: 'Instituciones',
      reach: 450,
      impressions: 450,
      clicks: 320,
      conversions: 85,
      revenue: 3800000,
      ctr: 71.1,
      conversionRate: 26.6,
      roas: 13.3
    },
    {
      id: 'CAMP-003',
      name: 'Lanzamiento Tienda Online',
      type: 'social',
      status: 'planning',
      startDate: '2024-02-01',
      endDate: '2024-03-01',
      budget: 750000,
      spent: 0,
      targetAudience: 'Particulares',
      reach: 0,
      impressions: 0,
      clicks: 0,
      conversions: 0,
      revenue: 0,
      ctr: 0,
      conversionRate: 0,
      roas: 0
    }
  ]);

  const [performanceData] = useState([
    { week: 'Sem 1', impressions: 2100, clicks: 84, conversions: 12 },
    { week: 'Sem 2', impressions: 2800, clicks: 112, conversions: 18 },
    { week: 'Sem 3', impressions: 3200, clicks: 128, conversions: 22 },
    { week: 'Sem 4', impressions: 2400, clicks: 96, conversions: 15 }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [newCampaign, setNewCampaign] = useState({
    name: '',
    type: 'email',
    startDate: '',
    endDate: '',
    budget: 0,
    targetAudience: 'Empresas'
  });

  const campaignTypes = [
    { id: 'email', name: 'Email Marketing', icon: Mail },
    { id: 'phone', name: 'Telemarketing', icon: Phone },
    { id: 'social', name: 'Redes Sociales', icon: Users },
    { id: 'digital', name: 'Publicidad Digital', icon: Target }
  ];

  const audiences = ['Empresas', 'Instituciones', 'Particulares', 'Todos'];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'planning': return 'bg-yellow-100 text-yellow-800';
      case 'paused': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    const campaignType = campaignTypes.find(t => t.id === type);
    const Icon = campaignType?.icon || Target;
    return <Icon className="h-4 w-4" />;
  };

  const handleAddCampaign = (e: React.FormEvent) => {
    e.preventDefault();
    const id = `CAMP-${String(campaigns.length + 1).padStart(3, '0')}`;
    setCampaigns([...campaigns, {
      ...newCampaign,
      id,
      status: 'planning',
      spent: 0,
      reach: 0,
      impressions: 0,
      clicks: 0,
      conversions: 0,
      revenue: 0,
      ctr: 0,
      conversionRate: 0,
      roas: 0
    }]);
    setNewCampaign({
      name: '',
      type: 'email',
      startDate: '',
      endDate: '',
      budget: 0,
      targetAudience: 'Empresas'
    });
    setShowForm(false);
  };

  const totalBudget = campaigns.reduce((sum, campaign) => sum + campaign.budget, 0);
  const totalSpent = campaigns.reduce((sum, campaign) => sum + campaign.spent, 0);
  const totalRevenue = campaigns.reduce((sum, campaign) => sum + campaign.revenue, 0);
  const overallROAS = totalSpent > 0 ? totalRevenue / totalSpent : 0;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <h2 className="text-2xl font-bold text-gray-900">Campañas de Marketing</h2>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors mt-4 sm:mt-0"
        >
          <Plus className="h-5 w-5" />
          <span>Nueva Campaña</span>
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
            <p className="text-2xl font-bold text-blue-600 mt-1">CLP ${totalBudget.toLocaleString()}</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="p-2 rounded-lg bg-red-50">
              <TrendingUp className="h-6 w-6 text-red-600" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-500">Gastado</h3>
            <p className="text-2xl font-bold text-red-600 mt-1">CLP ${totalSpent.toLocaleString()}</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="p-2 rounded-lg bg-green-50">
              <BarChart3 className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-500">Ingresos Generados</h3>
            <p className="text-2xl font-bold text-green-600 mt-1">CLP ${totalRevenue.toLocaleString()}</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="p-2 rounded-lg bg-purple-50">
              <TrendingUp className="h-6 w-6 text-purple-600" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-500">ROAS General</h3>
            <p className="text-2xl font-bold text-purple-600 mt-1">{overallROAS.toFixed(1)}x</p>
          </div>
        </div>
      </div>

      {/* Performance Chart */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Rendimiento Semanal de Campañas</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={performanceData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="week" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="impressions" fill="#3B82F6" name="Impresiones" />
            <Bar dataKey="clicks" fill="#10B981" name="Clicks" />
            <Bar dataKey="conversions" fill="#F59E0B" name="Conversiones" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Campaigns List */}
      <div className="space-y-4">
        {campaigns.map((campaign) => (
          <div key={campaign.id} className="bg-white rounded-lg shadow-sm border border-gray-100">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{campaign.name}</h3>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(campaign.status)}`}>
                      {campaign.status === 'active' ? 'Activa' :
                       campaign.status === 'completed' ? 'Completada' :
                       campaign.status === 'planning' ? 'Planificación' : 'Pausada'}
                    </span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {getTypeIcon(campaign.type)}
                      <span className="ml-1">{campaignTypes.find(t => t.id === campaign.type)?.name}</span>
                    </span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div className="text-gray-500">
                      <span className="font-medium">Audiencia:</span> {campaign.targetAudience}
                    </div>
                    <div className="text-gray-500">
                      <span className="font-medium">Período:</span> {campaign.startDate} - {campaign.endDate}
                    </div>
                    <div className="text-gray-500">
                      <span className="font-medium">Presupuesto:</span> CLP ${campaign.budget.toLocaleString()}
                    </div>
                    <div className="text-gray-500">
                      <span className="font-medium">Gastado:</span> CLP ${campaign.spent.toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>

              {/* Campaign Metrics */}
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 text-center">
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-lg font-bold text-blue-600">{campaign.reach.toLocaleString()}</p>
                  <p className="text-xs text-gray-500">Alcance</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-lg font-bold text-green-600">{campaign.impressions.toLocaleString()}</p>
                  <p className="text-xs text-gray-500">Impresiones</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-lg font-bold text-purple-600">{campaign.clicks}</p>
                  <p className="text-xs text-gray-500">Clicks</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-lg font-bold text-orange-600">{campaign.conversions}</p>
                  <p className="text-xs text-gray-500">Conversiones</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-lg font-bold text-red-600">{campaign.ctr.toFixed(1)}%</p>
                  <p className="text-xs text-gray-500">CTR</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-lg font-bold text-yellow-600">{campaign.conversionRate.toFixed(1)}%</p>
                  <p className="text-xs text-gray-500">Conv. Rate</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-lg font-bold text-green-600">{campaign.roas.toFixed(1)}x</p>
                  <p className="text-xs text-gray-500">ROAS</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-lg font-bold text-blue-600">CLP ${(campaign.revenue / 1000000).toFixed(1)}M</p>
                  <p className="text-xs text-gray-500">Ingresos</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Campaign Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-full max-w-2xl shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Nueva Campaña</h3>
              <form onSubmit={handleAddCampaign} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nombre de la Campaña</label>
                  <input
                    type="text"
                    required
                    value={newCampaign.name}
                    onChange={(e) => setNewCampaign({...newCampaign, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Campaña</label>
                    <select
                      value={newCampaign.type}
                      onChange={(e) => setNewCampaign({...newCampaign, type: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {campaignTypes.map(type => (
                        <option key={type.id} value={type.id}>{type.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Audiencia Objetivo</label>
                    <select
                      value={newCampaign.targetAudience}
                      onChange={(e) => setNewCampaign({...newCampaign, targetAudience: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {audiences.map(audience => (
                        <option key={audience} value={audience}>{audience}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Fecha Inicio</label>
                    <input
                      type="date"
                      required
                      value={newCampaign.startDate}
                      onChange={(e) => setNewCampaign({...newCampaign, startDate: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Fecha Fin</label>
                    <input
                      type="date"
                      required
                      value={newCampaign.endDate}
                      onChange={(e) => setNewCampaign({...newCampaign, endDate: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Presupuesto (CLP)</label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={newCampaign.budget}
                    onChange={(e) => setNewCampaign({...newCampaign, budget: parseInt(e.target.value) || 0})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="flex space-x-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Crear Campaña
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

export default MarketingCampaigns;