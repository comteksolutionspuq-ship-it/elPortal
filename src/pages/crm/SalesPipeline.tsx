import React, { useState } from 'react';
import { Target, DollarSign, Calendar, User, TrendingUp, Plus, CreditCard as Edit, Trash2, CheckCircle, Clock, AlertTriangle } from 'lucide-react';

const SalesPipeline: React.FC = () => {
  const [opportunities, setOpportunities] = useState([
    {
      id: 'OPP-001',
      title: 'Contrato Hospital Regional - Suministros Médicos',
      customer: 'Hospital Regional Magallanes',
      value: 15000000,
      probability: 85,
      stage: 'negotiation',
      expectedCloseDate: '2024-02-15',
      owner: 'Roberto Silva',
      source: 'referral',
      lastActivity: '2024-01-20',
      nextActivity: '2024-01-22',
      description: 'Contrato anual para suministro de equipos de protección médica',
      activities: [
        { date: '2024-01-20', type: 'call', description: 'Llamada de seguimiento - Interés confirmado' },
        { date: '2024-01-18', type: 'meeting', description: 'Reunión con director médico' },
        { date: '2024-01-15', type: 'proposal', description: 'Envío de propuesta comercial' }
      ]
    },
    {
      id: 'OPP-002',
      title: 'Expansión Cadena Restaurantes Patagonia',
      customer: 'Grupo Gastronómico Patagonia',
      value: 8500000,
      probability: 60,
      stage: 'proposal',
      expectedCloseDate: '2024-02-28',
      owner: 'María González',
      source: 'website',
      lastActivity: '2024-01-19',
      nextActivity: '2024-01-25',
      description: 'Suministro para 5 nuevos restaurantes en la región',
      activities: [
        { date: '2024-01-19', type: 'email', description: 'Envío de catálogo actualizado' },
        { date: '2024-01-16', type: 'meeting', description: 'Presentación de productos' }
      ]
    },
    {
      id: 'OPP-003',
      title: 'Contrato Colegio San José - Suministros Anuales',
      customer: 'Colegio San José',
      value: 4200000,
      probability: 90,
      stage: 'closing',
      expectedCloseDate: '2024-01-30',
      owner: 'Ana Pérez',
      source: 'cold-call',
      lastActivity: '2024-01-20',
      nextActivity: '2024-01-23',
      description: 'Contrato anual para suministros de cafetería y limpieza',
      activities: [
        { date: '2024-01-20', type: 'contract', description: 'Revisión final de contrato' },
        { date: '2024-01-17', type: 'negotiation', description: 'Negociación de términos de pago' }
      ]
    },
    {
      id: 'OPP-004',
      title: 'Hotel Cabo de Hornos - Suministros Eventos',
      customer: 'Hotel Cabo de Hornos',
      value: 2800000,
      probability: 40,
      stage: 'qualification',
      expectedCloseDate: '2024-03-15',
      owner: 'Carlos Mendoza',
      source: 'trade-show',
      lastActivity: '2024-01-18',
      nextActivity: '2024-01-24',
      description: 'Suministros para eventos corporativos y banquetes',
      activities: [
        { date: '2024-01-18', type: 'demo', description: 'Demostración de productos premium' }
      ]
    }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [selectedStage, setSelectedStage] = useState('all');
  const [newOpportunity, setNewOpportunity] = useState({
    title: '',
    customer: '',
    value: 0,
    probability: 50,
    stage: 'prospecting',
    expectedCloseDate: '',
    owner: '',
    source: 'website',
    description: ''
  });

  const stages = [
    { id: 'all', name: 'Todas las etapas', color: 'gray' },
    { id: 'prospecting', name: 'Prospección', color: 'blue' },
    { id: 'qualification', name: 'Calificación', color: 'yellow' },
    { id: 'proposal', name: 'Propuesta', color: 'orange' },
    { id: 'negotiation', name: 'Negociación', color: 'purple' },
    { id: 'closing', name: 'Cierre', color: 'green' },
    { id: 'won', name: 'Ganada', color: 'emerald' },
    { id: 'lost', name: 'Perdida', color: 'red' }
  ];

  const sources = [
    { id: 'website', name: 'Sitio Web' },
    { id: 'referral', name: 'Referencia' },
    { id: 'cold-call', name: 'Llamada Fría' },
    { id: 'trade-show', name: 'Feria Comercial' },
    { id: 'social-media', name: 'Redes Sociales' }
  ];

  const owners = ['Roberto Silva', 'María González', 'Ana Pérez', 'Carlos Mendoza'];

  const filteredOpportunities = opportunities.filter(opp => {
    return selectedStage === 'all' || opp.stage === selectedStage;
  });

  const getStageColor = (stage: string) => {
    const stageObj = stages.find(s => s.id === stage);
    const color = stageObj?.color || 'gray';
    return `bg-${color}-100 text-${color}-800`;
  };

  const getProbabilityColor = (probability: number) => {
    if (probability >= 80) return 'text-green-600';
    if (probability >= 60) return 'text-yellow-600';
    if (probability >= 40) return 'text-orange-600';
    return 'text-red-600';
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'call': return <User className="h-4 w-4" />;
      case 'meeting': return <Calendar className="h-4 w-4" />;
      case 'email': return <Target className="h-4 w-4" />;
      case 'proposal': return <CheckCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const handleAddOpportunity = (e: React.FormEvent) => {
    e.preventDefault();
    const id = `OPP-${String(opportunities.length + 1).padStart(3, '0')}`;
    setOpportunities([...opportunities, {
      ...newOpportunity,
      id,
      lastActivity: new Date().toISOString().split('T')[0],
      nextActivity: '',
      activities: []
    }]);
    setNewOpportunity({
      title: '',
      customer: '',
      value: 0,
      probability: 50,
      stage: 'prospecting',
      expectedCloseDate: '',
      owner: '',
      source: 'website',
      description: ''
    });
    setShowForm(false);
  };

  const updateStage = (id: string, newStage: string) => {
    setOpportunities(opportunities.map(opp => 
      opp.id === id ? { ...opp, stage: newStage } : opp
    ));
  };

  const deleteOpportunity = (id: string) => {
    setOpportunities(opportunities.filter(opp => opp.id !== id));
  };

  const totalValue = filteredOpportunities.reduce((sum, opp) => sum + opp.value, 0);
  const weightedValue = filteredOpportunities.reduce((sum, opp) => sum + (opp.value * opp.probability / 100), 0);
  const averageProbability = filteredOpportunities.reduce((sum, opp) => sum + opp.probability, 0) / filteredOpportunities.length || 0;
  const opportunitiesThisMonth = filteredOpportunities.filter(opp => 
    new Date(opp.expectedCloseDate) <= new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)
  ).length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <h2 className="text-2xl font-bold text-gray-900">Pipeline de Ventas</h2>
        <div className="flex space-x-3 mt-4 sm:mt-0">
          <select
            value={selectedStage}
            onChange={(e) => setSelectedStage(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {stages.map(stage => (
              <option key={stage.id} value={stage.id}>{stage.name}</option>
            ))}
          </select>
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="h-5 w-5" />
            <span>Nueva Oportunidad</span>
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
            <h3 className="text-sm font-medium text-gray-500">Oportunidades</h3>
            <p className="text-2xl font-bold text-blue-600 mt-1">{filteredOpportunities.length}</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="p-2 rounded-lg bg-green-50">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-500">Valor Total Pipeline</h3>
            <p className="text-2xl font-bold text-green-600 mt-1">CLP ${totalValue.toLocaleString()}</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="p-2 rounded-lg bg-purple-50">
              <TrendingUp className="h-6 w-6 text-purple-600" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-500">Valor Ponderado</h3>
            <p className="text-2xl font-bold text-purple-600 mt-1">CLP ${Math.round(weightedValue).toLocaleString()}</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="p-2 rounded-lg bg-orange-50">
              <Calendar className="h-6 w-6 text-orange-600" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-500">Cierres Este Mes</h3>
            <p className="text-2xl font-bold text-orange-600 mt-1">{opportunitiesThisMonth}</p>
          </div>
        </div>
      </div>

      {/* Pipeline Stages */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Etapas del Pipeline</h3>
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
          {stages.slice(1, -1).map((stage) => {
            const stageOpportunities = opportunities.filter(opp => opp.stage === stage.id);
            const stageValue = stageOpportunities.reduce((sum, opp) => sum + opp.value, 0);
            return (
              <div key={stage.id} className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-2">{stage.name}</h4>
                <div className="space-y-2">
                  <div className="text-sm">
                    <span className="text-gray-500">Oportunidades:</span>
                    <span className="font-bold ml-2">{stageOpportunities.length}</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-gray-500">Valor:</span>
                    <span className="font-bold ml-2 text-green-600">CLP ${stageValue.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`bg-${stage.color}-600 h-2 rounded-full`}
                      style={{ width: `${(stageOpportunities.length / opportunities.length) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Opportunities List */}
      <div className="space-y-4">
        {filteredOpportunities.map((opportunity) => (
          <div key={opportunity.id} className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{opportunity.title}</h3>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStageColor(opportunity.stage)}`}>
                    {stages.find(s => s.id === opportunity.stage)?.name}
                  </span>
                  <span className={`text-sm font-medium ${getProbabilityColor(opportunity.probability)}`}>
                    {opportunity.probability}% probabilidad
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-3">{opportunity.description}</p>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                  <div className="flex items-center text-gray-500">
                    <User className="h-4 w-4 mr-1" />
                    {opportunity.customer}
                  </div>
                  <div className="flex items-center text-gray-500">
                    <DollarSign className="h-4 w-4 mr-1" />
                    CLP ${opportunity.value.toLocaleString()}
                  </div>
                  <div className="flex items-center text-gray-500">
                    <Calendar className="h-4 w-4 mr-1" />
                    {opportunity.expectedCloseDate}
                  </div>
                  <div className="text-gray-500">
                    Responsable: {opportunity.owner}
                  </div>
                  <div className="text-gray-500">
                    Fuente: {sources.find(s => s.id === opportunity.source)?.name}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2 ml-4">
                <button className="text-blue-600 hover:text-blue-900">
                  <Edit className="h-4 w-4" />
                </button>
                <button 
                  onClick={() => deleteOpportunity(opportunity.id)}
                  className="text-red-600 hover:text-red-900"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Progreso de la Oportunidad</span>
                <span className="font-medium">{opportunity.probability}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full" 
                  style={{ width: `${opportunity.probability}%` }}
                ></div>
              </div>
            </div>

            {/* Recent Activities */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-3">Actividades Recientes</h4>
                <div className="space-y-2">
                  {opportunity.activities.slice(0, 3).map((activity, index) => (
                    <div key={index} className="flex items-start space-x-2 text-sm">
                      <div className="p-1 rounded-full bg-blue-100 mt-0.5">
                        {getActivityIcon(activity.type)}
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-900">{activity.description}</p>
                        <p className="text-gray-500 text-xs">{activity.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-3">Acciones Rápidas</h4>
                <div className="space-y-2">
                  <button
                    onClick={() => updateStage(opportunity.id, 'won')}
                    className="w-full text-left px-3 py-2 text-sm bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors"
                  >
                    Marcar como Ganada
                  </button>
                  <button
                    onClick={() => updateStage(opportunity.id, 'lost')}
                    className="w-full text-left px-3 py-2 text-sm bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors"
                  >
                    Marcar como Perdida
                  </button>
                  <button className="w-full text-left px-3 py-2 text-sm bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors">
                    Programar Seguimiento
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Opportunity Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-full max-w-2xl shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Nueva Oportunidad</h3>
              <form onSubmit={handleAddOpportunity} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Título de la Oportunidad</label>
                  <input
                    type="text"
                    required
                    value={newOpportunity.title}
                    onChange={(e) => setNewOpportunity({...newOpportunity, title: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Cliente</label>
                    <input
                      type="text"
                      required
                      value={newOpportunity.customer}
                      onChange={(e) => setNewOpportunity({...newOpportunity, customer: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Valor Estimado (CLP)</label>
                    <input
                      type="number"
                      required
                      min="0"
                      value={newOpportunity.value}
                      onChange={(e) => setNewOpportunity({...newOpportunity, value: parseInt(e.target.value) || 0})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Probabilidad (%)</label>
                    <input
                      type="number"
                      required
                      min="0"
                      max="100"
                      value={newOpportunity.probability}
                      onChange={(e) => setNewOpportunity({...newOpportunity, probability: parseInt(e.target.value) || 50})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Fecha Esperada de Cierre</label>
                    <input
                      type="date"
                      required
                      value={newOpportunity.expectedCloseDate}
                      onChange={(e) => setNewOpportunity({...newOpportunity, expectedCloseDate: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Responsable</label>
                    <select
                      required
                      value={newOpportunity.owner}
                      onChange={(e) => setNewOpportunity({...newOpportunity, owner: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Seleccionar responsable</option>
                      {owners.map(owner => (
                        <option key={owner} value={owner}>{owner}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Fuente</label>
                    <select
                      value={newOpportunity.source}
                      onChange={(e) => setNewOpportunity({...newOpportunity, source: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {sources.map(source => (
                        <option key={source.id} value={source.id}>{source.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                  <textarea
                    required
                    value={newOpportunity.description}
                    onChange={(e) => setNewOpportunity({...newOpportunity, description: e.target.value})}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="flex space-x-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Crear Oportunidad
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

export default SalesPipeline;