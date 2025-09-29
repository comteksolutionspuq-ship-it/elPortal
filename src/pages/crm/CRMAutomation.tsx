import React, { useState } from 'react';
import { Zap, Plus, Play, Pause, Mail, Phone, Calendar, Target, Settings, BarChart3 } from 'lucide-react';

const CRMAutomation: React.FC = () => {
  const [automations, setAutomations] = useState([
    {
      id: 'AUTO-001',
      name: 'Seguimiento de Leads Nuevos',
      description: 'Envío automático de email de bienvenida y asignación a vendedor',
      trigger: 'new-lead',
      status: 'active',
      actions: [
        { type: 'email', description: 'Enviar email de bienvenida', delay: 0 },
        { type: 'assign', description: 'Asignar a vendedor disponible', delay: 5 },
        { type: 'task', description: 'Crear tarea de seguimiento', delay: 60 }
      ],
      executions: 45,
      successRate: 92,
      lastRun: '2024-01-20 14:30'
    },
    {
      id: 'AUTO-002',
      name: 'Reactivación de Clientes Inactivos',
      description: 'Campaña automática para clientes sin compras en 60 días',
      trigger: 'customer-inactive',
      status: 'active',
      actions: [
        { type: 'email', description: 'Email con oferta especial', delay: 0 },
        { type: 'call', description: 'Llamada de seguimiento', delay: 1440 },
        { type: 'discount', description: 'Aplicar descuento 15%', delay: 2880 }
      ],
      executions: 23,
      successRate: 78,
      lastRun: '2024-01-19 09:15'
    },
    {
      id: 'AUTO-003',
      name: 'Seguimiento Post-Venta',
      description: 'Encuesta de satisfacción automática después de cada venta',
      trigger: 'sale-completed',
      status: 'active',
      actions: [
        { type: 'email', description: 'Enviar encuesta de satisfacción', delay: 1440 },
        { type: 'review', description: 'Solicitar review del producto', delay: 4320 }
      ],
      executions: 67,
      successRate: 85,
      lastRun: '2024-01-20 16:45'
    },
    {
      id: 'AUTO-004',
      name: 'Escalación de Oportunidades',
      description: 'Escalación automática de oportunidades estancadas',
      trigger: 'opportunity-stalled',
      status: 'paused',
      actions: [
        { type: 'notify', description: 'Notificar al supervisor', delay: 0 },
        { type: 'reassign', description: 'Reasignar a vendedor senior', delay: 1440 }
      ],
      executions: 12,
      successRate: 67,
      lastRun: '2024-01-18 11:20'
    }
  ]);

  const [campaigns, setCampaigns] = useState([
    {
      id: 'CAMP-001',
      name: 'Campaña Productos Biodegradables',
      type: 'email',
      status: 'active',
      targetSegment: 'Empresas',
      sent: 156,
      opened: 89,
      clicked: 23,
      converted: 8,
      revenue: 2400000,
      startDate: '2024-01-15',
      endDate: '2024-02-15'
    },
    {
      id: 'CAMP-002',
      name: 'Oferta Especial Instituciones',
      type: 'phone',
      status: 'completed',
      targetSegment: 'Instituciones',
      sent: 45,
      opened: 45,
      clicked: 32,
      converted: 12,
      revenue: 3800000,
      startDate: '2024-01-01',
      endDate: '2024-01-31'
    }
  ]);

  const [showAutomationForm, setShowAutomationForm] = useState(false);
  const [newAutomation, setNewAutomation] = useState({
    name: '',
    description: '',
    trigger: 'new-lead',
    actions: [{ type: 'email', description: '', delay: 0 }]
  });

  const triggers = [
    { id: 'new-lead', name: 'Nuevo Lead' },
    { id: 'customer-inactive', name: 'Cliente Inactivo' },
    { id: 'sale-completed', name: 'Venta Completada' },
    { id: 'opportunity-stalled', name: 'Oportunidad Estancada' }
  ];

  const actionTypes = [
    { id: 'email', name: 'Enviar Email' },
    { id: 'call', name: 'Programar Llamada' },
    { id: 'task', name: 'Crear Tarea' },
    { id: 'assign', name: 'Asignar Vendedor' },
    { id: 'notify', name: 'Notificar' },
    { id: 'discount', name: 'Aplicar Descuento' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'paused': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getActionIcon = (type: string) => {
    switch (type) {
      case 'email': return <Mail className="h-4 w-4" />;
      case 'call': return <Phone className="h-4 w-4" />;
      case 'task': return <Calendar className="h-4 w-4" />;
      default: return <Target className="h-4 w-4" />;
    }
  };

  const toggleAutomation = (id: string) => {
    setAutomations(automations.map(auto => 
      auto.id === id 
        ? { ...auto, status: auto.status === 'active' ? 'paused' : 'active' }
        : auto
    ));
  };

  const addAction = () => {
    setNewAutomation({
      ...newAutomation,
      actions: [...newAutomation.actions, { type: 'email', description: '', delay: 0 }]
    });
  };

  const handleAddAutomation = (e: React.FormEvent) => {
    e.preventDefault();
    const id = `AUTO-${String(automations.length + 1).padStart(3, '0')}`;
    setAutomations([...automations, {
      ...newAutomation,
      id,
      status: 'draft',
      executions: 0,
      successRate: 0,
      lastRun: ''
    }]);
    setNewAutomation({
      name: '',
      description: '',
      trigger: 'new-lead',
      actions: [{ type: 'email', description: '', delay: 0 }]
    });
    setShowAutomationForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <h2 className="text-2xl font-bold text-gray-900">Automatización CRM</h2>
        <button
          onClick={() => setShowAutomationForm(true)}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors mt-4 sm:mt-0"
        >
          <Plus className="h-5 w-5" />
          <span>Nueva Automatización</span>
        </button>
      </div>

      {/* Automations List */}
      <div className="space-y-4">
        {automations.map((automation) => (
          <div key={automation.id} className="bg-white rounded-lg shadow-sm border border-gray-100">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{automation.name}</h3>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(automation.status)}`}>
                      {automation.status === 'active' ? 'Activa' :
                       automation.status === 'paused' ? 'Pausada' :
                       automation.status === 'completed' ? 'Completada' : 'Borrador'}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{automation.description}</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div className="text-gray-500">
                      <span className="font-medium">Ejecuciones:</span> {automation.executions}
                    </div>
                    <div className="text-gray-500">
                      <span className="font-medium">Tasa de éxito:</span> {automation.successRate}%
                    </div>
                    <div className="text-gray-500">
                      <span className="font-medium">Última ejecución:</span> {automation.lastRun || 'Nunca'}
                    </div>
                    <div className="text-gray-500">
                      <span className="font-medium">Trigger:</span> {triggers.find(t => t.id === automation.trigger)?.name}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2 ml-4">
                  <button
                    onClick={() => toggleAutomation(automation.id)}
                    className={`flex items-center space-x-1 px-3 py-1 text-sm rounded transition-colors ${
                      automation.status === 'active' 
                        ? 'bg-yellow-600 text-white hover:bg-yellow-700' 
                        : 'bg-green-600 text-white hover:bg-green-700'
                    }`}
                  >
                    {automation.status === 'active' ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                    <span>{automation.status === 'active' ? 'Pausar' : 'Activar'}</span>
                  </button>
                  <button className="text-blue-600 hover:text-blue-900">
                    <Settings className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Actions */}
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-2">Acciones Automatizadas</h4>
                <div className="space-y-2">
                  {automation.actions.map((action, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <span className="flex items-center justify-center w-6 h-6 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                          {index + 1}
                        </span>
                        {getActionIcon(action.type)}
                        <span className="text-sm text-gray-900">{action.description}</span>
                      </div>
                      <span className="text-sm text-gray-500">
                        {action.delay === 0 ? 'Inmediato' : `${action.delay} min`}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Campaigns Performance */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Rendimiento de Campañas</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Campaña</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Enviados</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Abiertos</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Clicks</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Conversiones</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ingresos</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {campaigns.map((campaign) => (
                <tr key={campaign.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{campaign.name}</div>
                      <div className="text-sm text-gray-500">{campaign.targetSegment}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(campaign.status)}`}>
                      {campaign.type === 'email' ? 'Email' : 'Teléfono'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {campaign.sent}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {campaign.opened} ({((campaign.opened / campaign.sent) * 100).toFixed(1)}%)
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {campaign.clicked} ({((campaign.clicked / campaign.sent) * 100).toFixed(1)}%)
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                    {campaign.converted} ({((campaign.converted / campaign.sent) * 100).toFixed(1)}%)
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                    CLP ${campaign.revenue.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Automation Form Modal */}
      {showAutomationForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-10 mx-auto p-5 border w-full max-w-4xl shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Nueva Automatización</h3>
              <form onSubmit={handleAddAutomation} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                    <input
                      type="text"
                      required
                      value={newAutomation.name}
                      onChange={(e) => setNewAutomation({...newAutomation, name: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Trigger</label>
                    <select
                      value={newAutomation.trigger}
                      onChange={(e) => setNewAutomation({...newAutomation, trigger: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {triggers.map(trigger => (
                        <option key={trigger.id} value={trigger.id}>{trigger.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                  <textarea
                    required
                    value={newAutomation.description}
                    onChange={(e) => setNewAutomation({...newAutomation, description: e.target.value})}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-3">
                    <label className="block text-sm font-medium text-gray-700">Acciones</label>
                    <button
                      type="button"
                      onClick={addAction}
                      className="px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                    >
                      Agregar Acción
                    </button>
                  </div>
                  <div className="space-y-3">
                    {newAutomation.actions.map((action, index) => (
                      <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-3 p-3 border border-gray-200 rounded-lg">
                        <div>
                          <select
                            value={action.type}
                            onChange={(e) => {
                              const updatedActions = newAutomation.actions.map((a, i) => 
                                i === index ? { ...a, type: e.target.value } : a
                              );
                              setNewAutomation({ ...newAutomation, actions: updatedActions });
                            }}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            {actionTypes.map(type => (
                              <option key={type.id} value={type.id}>{type.name}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <input
                            type="text"
                            placeholder="Descripción de la acción"
                            required
                            value={action.description}
                            onChange={(e) => {
                              const updatedActions = newAutomation.actions.map((a, i) => 
                                i === index ? { ...a, description: e.target.value } : a
                              );
                              setNewAutomation({ ...newAutomation, actions: updatedActions });
                            }}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <input
                            type="number"
                            placeholder="Delay (minutos)"
                            min="0"
                            value={action.delay}
                            onChange={(e) => {
                              const updatedActions = newAutomation.actions.map((a, i) => 
                                i === index ? { ...a, delay: parseInt(e.target.value) || 0 } : a
                              );
                              setNewAutomation({ ...newAutomation, actions: updatedActions });
                            }}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Crear Automatización
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAutomationForm(false)}
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

export default CRMAutomation;