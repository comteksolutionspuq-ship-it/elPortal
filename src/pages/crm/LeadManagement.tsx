import React, { useState } from 'react';
import { Users, Plus, Phone, Mail, Calendar, Star, Filter, Search, UserPlus, TrendingUp } from 'lucide-react';

const LeadManagement: React.FC = () => {
  const [leads, setLeads] = useState([
    {
      id: 'LEAD-001',
      name: 'Patricia Morales',
      company: 'Grupo Gastronómico Austral',
      email: 'patricia@grupoaustral.cl',
      phone: '+56 9 8765 4321',
      source: 'website',
      status: 'qualified',
      score: 85,
      lastContact: '2024-01-20',
      nextAction: 'Enviar propuesta',
      assignedTo: 'María González',
      estimatedValue: 8500000,
      notes: 'Interesado en productos biodegradables para cadena de restaurantes'
    },
    {
      id: 'LEAD-002',
      name: 'Dr. Luis Martínez',
      company: 'Clínica Magallanes',
      email: 'compras@clinicamagallanes.cl',
      phone: '+56 61 228 9000',
      source: 'referral',
      status: 'new',
      score: 70,
      lastContact: '2024-01-19',
      nextAction: 'Llamada de calificación',
      assignedTo: 'Carlos Mendoza',
      estimatedValue: 5200000,
      notes: 'Necesita equipos de protección para personal médico'
    },
    {
      id: 'LEAD-003',
      name: 'Ana Fernández',
      company: 'Corporación Educacional Magallanes',
      email: 'compras@corpeducacional.cl',
      phone: '+56 9 7654 3210',
      source: 'cold-call',
      status: 'contacted',
      score: 45,
      lastContact: '2024-01-18',
      nextAction: 'Reunión de requerimientos',
      assignedTo: 'Roberto Silva',
      estimatedValue: 3200000,
      notes: 'Proceso de licitación para suministros escolares'
    }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const [newLead, setNewLead] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    source: 'website',
    estimatedValue: 0,
    assignedTo: '',
    notes: ''
  });

  const statuses = [
    { id: 'all', name: 'Todos los estados', color: 'bg-gray-100 text-gray-800' },
    { id: 'new', name: 'Nuevo', color: 'bg-blue-100 text-blue-800' },
    { id: 'contacted', name: 'Contactado', color: 'bg-yellow-100 text-yellow-800' },
    { id: 'qualified', name: 'Calificado', color: 'bg-green-100 text-green-800' },
    { id: 'converted', name: 'Convertido', color: 'bg-purple-100 text-purple-800' },
    { id: 'lost', name: 'Perdido', color: 'bg-red-100 text-red-800' }
  ];

  const sources = [
    { id: 'website', name: 'Sitio Web' },
    { id: 'referral', name: 'Referencia' },
    { id: 'cold-call', name: 'Llamada Fría' },
    { id: 'social-media', name: 'Redes Sociales' },
    { id: 'trade-show', name: 'Feria Comercial' }
  ];

  const salesTeam = ['María González', 'Carlos Mendoza', 'Roberto Silva', 'Ana Pérez'];

  const filteredLeads = leads.filter(lead => {
    const matchesStatus = selectedStatus === 'all' || lead.status === selectedStatus;
    const matchesSearch = lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.company.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const getStatusInfo = (status: string) => {
    return statuses.find(s => s.id === status) || statuses[0];
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    if (score >= 40) return 'text-orange-600';
    return 'text-red-600';
  };

  const handleAddLead = (e: React.FormEvent) => {
    e.preventDefault();
    const id = `LEAD-${String(leads.length + 1).padStart(3, '0')}`;
    setLeads([...leads, {
      ...newLead,
      id,
      status: 'new',
      score: 50,
      lastContact: new Date().toISOString().split('T')[0],
      nextAction: 'Llamada inicial'
    }]);
    setNewLead({
      name: '',
      company: '',
      email: '',
      phone: '',
      source: 'website',
      estimatedValue: 0,
      assignedTo: '',
      notes: ''
    });
    setShowForm(false);
  };

  const totalLeads = filteredLeads.length;
  const qualifiedLeads = filteredLeads.filter(lead => lead.status === 'qualified').length;
  const totalValue = filteredLeads.reduce((sum, lead) => sum + lead.estimatedValue, 0);
  const avgScore = filteredLeads.reduce((sum, lead) => sum + lead.score, 0) / filteredLeads.length || 0;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <h2 className="text-2xl font-bold text-gray-900">Gestión de Leads</h2>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors mt-4 sm:mt-0"
        >
          <Plus className="h-5 w-5" />
          <span>Nuevo Lead</span>
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Buscar leads..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {statuses.map(status => (
                <option key={status.id} value={status.id}>{status.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="p-2 rounded-lg bg-blue-50">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-500">Total Leads</h3>
            <p className="text-2xl font-bold text-blue-600 mt-1">{totalLeads}</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="p-2 rounded-lg bg-green-50">
              <UserPlus className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-500">Leads Calificados</h3>
            <p className="text-2xl font-bold text-green-600 mt-1">{qualifiedLeads}</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="p-2 rounded-lg bg-purple-50">
              <TrendingUp className="h-6 w-6 text-purple-600" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-500">Valor Estimado</h3>
            <p className="text-2xl font-bold text-purple-600 mt-1">CLP ${totalValue.toLocaleString()}</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="p-2 rounded-lg bg-orange-50">
              <Star className="h-6 w-6 text-orange-600" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-500">Score Promedio</h3>
            <p className={`text-2xl font-bold mt-1 ${getScoreColor(avgScore)}`}>{Math.round(avgScore)}</p>
          </div>
        </div>
      </div>

      {/* Leads Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Lista de Leads</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lead</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Valor Estimado</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Asignado a</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Próxima Acción</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredLeads.map((lead) => {
                const statusInfo = getStatusInfo(lead.status);
                return (
                  <tr key={lead.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Users className="h-5 w-5 text-gray-400 mr-3" />
                        <div>
                          <div className="text-sm font-medium text-gray-900">{lead.name}</div>
                          <div className="text-sm text-gray-500">{lead.company}</div>
                          <div className="text-xs text-gray-400">{lead.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusInfo.color}`}>
                        {statusInfo.name}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`text-sm font-medium ${getScoreColor(lead.score)}`}>
                        {lead.score}/100
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                      CLP ${lead.estimatedValue.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {lead.assignedTo}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {lead.nextAction}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button className="text-blue-600 hover:text-blue-900">
                          <Phone className="h-4 w-4" />
                        </button>
                        <button className="text-green-600 hover:text-green-900">
                          <Mail className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Lead Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-full max-w-2xl shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Nuevo Lead</h3>
              <form onSubmit={handleAddLead} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nombre Contacto</label>
                    <input
                      type="text"
                      required
                      value={newLead.name}
                      onChange={(e) => setNewLead({...newLead, name: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Empresa</label>
                    <input
                      type="text"
                      required
                      value={newLead.company}
                      onChange={(e) => setNewLead({...newLead, company: e.target.value})}
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
                      value={newLead.email}
                      onChange={(e) => setNewLead({...newLead, email: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
                    <input
                      type="tel"
                      required
                      value={newLead.phone}
                      onChange={(e) => setNewLead({...newLead, phone: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Fuente</label>
                    <select
                      value={newLead.source}
                      onChange={(e) => setNewLead({...newLead, source: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {sources.map(source => (
                        <option key={source.id} value={source.id}>{source.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Valor Estimado (CLP)</label>
                    <input
                      type="number"
                      min="0"
                      value={newLead.estimatedValue}
                      onChange={(e) => setNewLead({...newLead, estimatedValue: parseInt(e.target.value) || 0})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Asignado a</label>
                  <select
                    required
                    value={newLead.assignedTo}
                    onChange={(e) => setNewLead({...newLead, assignedTo: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Seleccionar vendedor</option>
                    {salesTeam.map(member => (
                      <option key={member} value={member}>{member}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Notas</label>
                  <textarea
                    value={newLead.notes}
                    onChange={(e) => setNewLead({...newLead, notes: e.target.value})}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="flex space-x-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Crear Lead
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

export default LeadManagement;