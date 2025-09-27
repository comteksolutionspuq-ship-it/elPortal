import React, { useState } from 'react';
import { Target, DollarSign, Calendar, User, Phone, Mail, Plus, TrendingUp, Clock, CheckCircle } from 'lucide-react';

const SalesPipeline: React.FC = () => {
  const [opportunities, setOpportunities] = useState([
    {
      id: 'OPP-001',
      title: 'Contrato Hospital Regional - Equipos Médicos',
      company: 'Hospital Regional de Magallanes',
      contact: 'Dr. Roberto Silva',
      email: 'compras@hospitalregional.cl',
      phone: '+56 61 229 8000',
      value: 15000000,
      probability: 85,
      stage: 'negotiation',
      expectedCloseDate: '2024-02-15',
      lastActivity: '2024-01-20',
      nextActivity: 'Presentación final',
      source: 'referral',
      assignedTo: 'María González',
      notes: 'Cliente muy interesado, necesita aprobación del comité'
    },
    {
      id: 'OPP-002',
      title: 'Expansión Cadena Restaurantes',
      company: 'Grupo Gastronómico Austral',
      contact: 'Patricia Morales',
      email: 'patricia@grupoaustral.cl',
      phone: '+56 9 8765 4321',
      value: 8500000,
      probability: 60,
      stage: 'proposal',
      expectedCloseDate: '2024-02-28',
      lastActivity: '2024-01-18',
      nextActivity: 'Envío de propuesta',
      source: 'website',
      assignedTo: 'Carlos Mendoza',
      notes: 'Requiere descuentos por volumen'
    },
    {
      id: 'OPP-003',
      title: 'Suministros Escolares Anuales',
      company: 'Corporación Educacional Magallanes',
      contact: 'Ana Fernández',
      email: 'compras@corpeducacional.cl',
      phone: '+56 9 7654 3210',
      value: 4200000,
      probability: 40,
      stage: 'qualification',
      expectedCloseDate: '2024-03-15',
      lastActivity: '2024-01-15',
      nextActivity: 'Reunión de requerimientos',
      source: 'cold-call',
      assignedTo: 'Roberto Silva',
      notes: 'Proceso de licitación, múltiples competidores'
    },
    {
      id: 'OPP-004',
      title: 'Productos Biodegradables Premium',
      company: 'EcoRestaurant Patagonia',
      contact: 'Luis Martínez',
      email: 'luis@ecopatagonia.cl',
      phone: '+56 9 6543 2109',
      value: 2800000,
      probability: 90,
      stage: 'closing',
      expectedCloseDate: '2024-01-25',
      lastActivity: '2024-01-19',
      nextActivity: 'Firma de contrato',
      source: 'referral',
      assignedTo: 'María González',
      notes: 'Cliente confirmó interés, solo falta firma'
    }
  ]);

  const [activities, setActivities] = useState([
    {
      id: 'ACT-001',
      opportunityId: 'OPP-001',
      type: 'call',
      description: 'Llamada de seguimiento - Confirmación de requerimientos',
      date: '2024-01-20',
      duration: 30,
      outcome: 'positive',
      nextAction: 'Enviar propuesta técnica'
    },
    {
      id: 'ACT-002',
      opportunityId: 'OPP-002',
      type: 'meeting',
      description: 'Reunión presencial - Presentación de productos',
      date: '2024-01-18',
      duration: 60,
      outcome: 'positive',
      nextAction: 'Preparar cotización formal'
    },
    {
      id: 'ACT-003',
      opportunityId: 'OPP-004',
      type: 'email',
      description: 'Envío de contrato final para revisión',
      date: '2024-01-19',
      duration: 15,
      outcome: 'pending',
      nextAction: 'Seguimiento telefónico'
    }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [newOpportunity, setNewOpportunity] = useState({
    title: '',
    company: '',
    contact: '',
    email: '',
    phone: '',
    value: 0,
    expectedCloseDate: '',
    source: 'website',
    assignedTo: ''
  });

  const stages = [
    { id: 'lead', name: 'Lead', probability: 10, color: 'bg-gray-100 text-gray-800' },
    { id: 'qualification', name: 'Calificación', probability: 25, color: 'bg-yellow-100 text-yellow-800' },
    { id: 'proposal', name: 'Propuesta', probability: 50, color: 'bg-blue-100 text-blue-800' },
    { id: 'negotiation', name: 'Negociación', probability: 75, color: 'bg-purple-100 text-purple-800' },
    { id: 'closing', name: 'Cierre', probability: 90, color: 'bg-green-100 text-green-800' },
    { id: 'won', name: 'Ganada', probability: 100, color: 'bg-green-100 text-green-800' },
    { id: 'lost', name: 'Perdida', probability: 0, color: 'bg-red-100 text-red-800' }
  ];

  const sources = [
    { id: 'website', name: 'Sitio Web' },
    { id: 'referral', name: 'Referencia' },
    { id: 'cold-call', name: 'Llamada Fría' },
    { id: 'social-media', name: 'Redes Sociales' },
    { id: 'trade-show', name: 'Feria Comercial' }
  ];

  const salesTeam = ['María González', 'Carlos Mendoza', 'Roberto Silva', 'Ana Pérez'];

  const getStageInfo = (stageId: string) => {
    return stages.find(stage => stage.id === stageId) || stages[0];
  };

  const handleAddOpportunity = (e: React.FormEvent) => {
    e.preventDefault();
    const id = `OPP-${String(opportunities.length + 1).padStart(3, '0')}`;
    setOpportunities([...opportunities, {
      ...newOpportunity,
      id,
      probability: 25,
      stage: 'qualification',
      lastActivity: new Date().toISOString().split('T')[0],
      nextActivity: 'Llamada de calificación',
      notes: ''
    }]);
    setNewOpportunity({
      title: '',
      company: '',
      contact: '',
      email: '',
      phone: '',
      value: 0,
      expectedCloseDate: '',
      source: 'website',
      assignedTo: ''
    });
    setShowForm(false);
  };

  const moveToNextStage = (opportunityId: string) => {
    setOpportunities(opportunities.map(opp => {
      if (opp.id === opportunityId) {
        const currentStageIndex = stages.findIndex(stage => stage.id === opp.stage);
        const nextStage = stages[currentStageIndex + 1];
        if (nextStage) {
          return {
            ...opp,
            stage: nextStage.id,
            probability: nextStage.probability,
            lastActivity: new Date().toISOString().split('T')[0]
          };
        }
      }
      return opp;
    }));
  };

  const totalValue = opportunities.reduce((sum, opp) => sum + opp.value, 0);
  const weightedValue = opportunities.reduce((sum, opp) => sum + (opp.value * opp.probability / 100), 0);
  const avgDealSize = totalValue / opportunities.length;
  const winRate = (opportunities.filter(opp => opp.stage === 'won').length / opportunities.length) * 100;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <h2 className="text-2xl font-bold text-gray-900">Pipeline de Ventas</h2>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors mt-4 sm:mt-0"
        >
          <Plus className="h-5 w-5" />
          <span>Nueva Oportunidad</span>
        </button>
      </div>

      {/* Pipeline KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="p-2 rounded-lg bg-blue-50">
              <Target className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-500">Valor Total Pipeline</h3>
            <p className="text-2xl font-bold text-blue-600 mt-1">CLP ${totalValue.toLocaleString()}</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="p-2 rounded-lg bg-green-50">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-500">Valor Ponderado</h3>
            <p className="text-2xl font-bold text-green-600 mt-1">CLP ${Math.round(weightedValue).toLocaleString()}</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="p-2 rounded-lg bg-purple-50">
              <TrendingUp className="h-6 w-6 text-purple-600" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-500">Tamaño Promedio</h3>
            <p className="text-2xl font-bold text-purple-600 mt-1">CLP ${Math.round(avgDealSize).toLocaleString()}</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="p-2 rounded-lg bg-orange-50">
              <CheckCircle className="h-6 w-6 text-orange-600" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-500">Tasa de Cierre</h3>
            <p className="text-2xl font-bold text-orange-600 mt-1">{winRate.toFixed(1)}%</p>
          </div>
        </div>
      </div>

      {/* Pipeline Stages */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Etapas del Pipeline</h3>
        <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
          {stages.map((stage) => {
            const stageOpportunities = opportunities.filter(opp => opp.stage === stage.id);
            const stageValue = stageOpportunities.reduce((sum, opp) => sum + opp.value, 0);
            return (
              <div key={stage.id} className="border border-gray-200 rounded-lg p-4">
                <div className="text-center mb-3">
                  <h4 className="font-medium text-gray-900">{stage.name}</h4>
                  <p className="text-sm text-gray-500">{stage.probability}% prob.</p>
                </div>
                <div className="space-y-2">
                  <div className="text-center">
                    <p className="text-lg font-bold text-blue-600">{stageOpportunities.length}</p>
                    <p className="text-xs text-gray-500">oportunidades</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium text-green-600">
                      CLP ${(stageValue / 1000000).toFixed(1)}M
                    </p>
                    <p className="text-xs text-gray-500">valor total</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Opportunities List */}
      <div className="space-y-4">
        {opportunities.map((opportunity) => {
          const stageInfo = getStageInfo(opportunity.stage);
          return (
            <div key={opportunity.id} className="bg-white rounded-lg shadow-sm border border-gray-100">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{opportunity.title}</h3>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${stageInfo.color}`}>
                        {stageInfo.name}
                      </span>
                      <span className="text-sm font-medium text-green-600">
                        {opportunity.probability}% prob.
                      </span>
                    </div>
                    <p className="text-sm font-medium text-gray-700">{opportunity.company}</p>
                    <p className="text-sm text-gray-500 mb-2">Contacto: {opportunity.contact}</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div className="flex items-center text-gray-500">
                        <DollarSign className="h-4 w-4 mr-1" />
                        CLP ${opportunity.value.toLocaleString()}
                      </div>
                      <div className="flex items-center text-gray-500">
                        <Calendar className="h-4 w-4 mr-1" />
                        Cierre: {opportunity.expectedCloseDate}
                      </div>
                      <div className="flex items-center text-gray-500">
                        <User className="h-4 w-4 mr-1" />
                        {opportunity.assignedTo}
                      </div>
                      <div className="flex items-center text-gray-500">
                        <Clock className="h-4 w-4 mr-1" />
                        Última actividad: {opportunity.lastActivity}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 ml-4">
                    <button className="text-blue-600 hover:text-blue-900">
                      <Phone className="h-4 w-4" />
                    </button>
                    <button className="text-green-600 hover:text-green-900">
                      <Mail className="h-4 w-4" />
                    </button>
                    {opportunity.stage !== 'won' && opportunity.stage !== 'lost' && (
                      <button
                        onClick={() => moveToNextStage(opportunity.id)}
                        className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                      >
                        Avanzar Etapa
                      </button>
                    )}
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

                {/* Opportunity Details */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Información de Contacto</h4>
                    <div className="space-y-1 text-sm">
                      <div className="flex items-center">
                        <Mail className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-gray-600">{opportunity.email}</span>
                      </div>
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-gray-600">{opportunity.phone}</span>
                      </div>
                      <div className="flex items-center">
                        <Target className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-gray-600">Fuente: {sources.find(s => s.id === opportunity.source)?.name}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Próximas Acciones</h4>
                    <div className="space-y-1 text-sm">
                      <div>
                        <span className="text-gray-500">Próxima actividad:</span>
                        <span className="font-medium ml-2">{opportunity.nextActivity}</span>
                      </div>
                      {opportunity.notes && (
                        <div>
                          <span className="text-gray-500">Notas:</span>
                          <p className="text-gray-600 mt-1">{opportunity.notes}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Opportunity Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-full max-w-2xl shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Nueva Oportunidad de Venta</h3>
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
                    <label className="block text-sm font-medium text-gray-700 mb-1">Empresa</label>
                    <input
                      type="text"
                      required
                      value={newOpportunity.company}
                      onChange={(e) => setNewOpportunity({...newOpportunity, company: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Contacto</label>
                    <input
                      type="text"
                      required
                      value={newOpportunity.contact}
                      onChange={(e) => setNewOpportunity({...newOpportunity, contact: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      required
                      value={newOpportunity.email}
                      onChange={(e) => setNewOpportunity({...newOpportunity, email: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
                    <input
                      type="tel"
                      required
                      value={newOpportunity.phone}
                      onChange={(e) => setNewOpportunity({...newOpportunity, phone: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">Asignado a</label>
                  <select
                    required
                    value={newOpportunity.assignedTo}
                    onChange={(e) => setNewOpportunity({...newOpportunity, assignedTo: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Seleccionar vendedor</option>
                    {salesTeam.map(member => (
                      <option key={member} value={member}>{member}</option>
                    ))}
                  </select>
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