import React, { useState } from 'react';
import { Plus, Calendar, Users, DollarSign, Clock, CheckCircle, AlertTriangle, BarChart3, CreditCard as Edit, Trash2 } from 'lucide-react';

const ProjectManagement: React.FC = () => {
  const [projects, setProjects] = useState([
    {
      id: 'PROJ-001',
      name: 'Expansión Sucursal Norte',
      description: 'Apertura de nueva sucursal en zona norte de Punta Arenas',
      status: 'in-progress',
      priority: 'high',
      startDate: '2024-01-15',
      endDate: '2024-03-30',
      budget: 15000000,
      spent: 8500000,
      progress: 65,
      manager: 'Roberto Silva',
      team: ['María González', 'Carlos Mendoza', 'Ana Pérez'],
      tasks: [
        { id: 1, name: 'Búsqueda de local', status: 'completed', assignee: 'Roberto Silva' },
        { id: 2, name: 'Negociación arriendo', status: 'completed', assignee: 'Roberto Silva' },
        { id: 3, name: 'Remodelación local', status: 'in-progress', assignee: 'Carlos Mendoza' },
        { id: 4, name: 'Instalación equipos', status: 'pending', assignee: 'Ana Pérez' },
        { id: 5, name: 'Contratación personal', status: 'in-progress', assignee: 'María González' }
      ]
    },
    {
      id: 'PROJ-002',
      name: 'Sistema de Inventario Automatizado',
      description: 'Implementación de sistema RFID para control automático de inventario',
      status: 'planning',
      priority: 'medium',
      startDate: '2024-02-01',
      endDate: '2024-05-15',
      budget: 8500000,
      spent: 1200000,
      progress: 15,
      manager: 'Carlos Mendoza',
      team: ['Ana Pérez', 'Luis Martínez'],
      tasks: [
        { id: 1, name: 'Análisis de requerimientos', status: 'completed', assignee: 'Carlos Mendoza' },
        { id: 2, name: 'Selección de proveedor', status: 'in-progress', assignee: 'Ana Pérez' },
        { id: 3, name: 'Instalación hardware', status: 'pending', assignee: 'Luis Martínez' },
        { id: 4, name: 'Configuración software', status: 'pending', assignee: 'Carlos Mendoza' }
      ]
    },
    {
      id: 'PROJ-003',
      name: 'Certificación ISO 9001',
      description: 'Obtención de certificación de calidad ISO 9001 para la empresa',
      status: 'completed',
      priority: 'high',
      startDate: '2023-08-01',
      endDate: '2024-01-15',
      budget: 4500000,
      spent: 4200000,
      progress: 100,
      manager: 'María González',
      team: ['Roberto Silva', 'Ana Pérez'],
      tasks: [
        { id: 1, name: 'Documentación procesos', status: 'completed', assignee: 'María González' },
        { id: 2, name: 'Auditoría interna', status: 'completed', assignee: 'Roberto Silva' },
        { id: 3, name: 'Auditoría externa', status: 'completed', assignee: 'Ana Pérez' },
        { id: 4, name: 'Certificación', status: 'completed', assignee: 'María González' }
      ]
    }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [newProject, setNewProject] = useState({
    name: '',
    description: '',
    priority: 'medium',
    startDate: '',
    endDate: '',
    budget: 0,
    manager: ''
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'planning': return 'bg-yellow-100 text-yellow-800';
      case 'on-hold': return 'bg-gray-100 text-gray-800';
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

  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    const id = `PROJ-${String(projects.length + 1).padStart(3, '0')}`;
    setProjects([...projects, {
      ...newProject,
      id,
      status: 'planning',
      spent: 0,
      progress: 0,
      team: [],
      tasks: []
    }]);
    setNewProject({
      name: '',
      description: '',
      priority: 'medium',
      startDate: '',
      endDate: '',
      budget: 0,
      manager: ''
    });
    setShowForm(false);
  };

  const totalBudget = projects.reduce((sum, project) => sum + project.budget, 0);
  const totalSpent = projects.reduce((sum, project) => sum + project.spent, 0);
  const activeProjects = projects.filter(p => p.status === 'in-progress').length;
  const completedProjects = projects.filter(p => p.status === 'completed').length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <h2 className="text-2xl font-bold text-gray-900">Gestión de Proyectos</h2>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors mt-4 sm:mt-0"
        >
          <Plus className="h-5 w-5" />
          <span>Nuevo Proyecto</span>
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="p-2 rounded-lg bg-blue-50">
              <BarChart3 className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-500">Proyectos Activos</h3>
            <p className="text-2xl font-bold text-blue-600 mt-1">{activeProjects}</p>
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
            <p className="text-2xl font-bold text-green-600 mt-1">{completedProjects}</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="p-2 rounded-lg bg-purple-50">
              <DollarSign className="h-6 w-6 text-purple-600" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-500">Presupuesto Total</h3>
            <p className="text-2xl font-bold text-purple-600 mt-1">CLP ${totalBudget.toLocaleString()}</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="p-2 rounded-lg bg-orange-50">
              <DollarSign className="h-6 w-6 text-orange-600" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-500">Gastado</h3>
            <p className="text-2xl font-bold text-orange-600 mt-1">CLP ${totalSpent.toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* Projects List */}
      <div className="space-y-4">
        {projects.map((project) => (
          <div key={project.id} className={`bg-white rounded-lg shadow-sm border border-gray-100 border-l-4 ${getPriorityColor(project.priority)}`}>
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{project.name}</h3>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                      {project.status === 'completed' ? 'Completado' :
                       project.status === 'in-progress' ? 'En Progreso' :
                       project.status === 'planning' ? 'Planificación' : 'En Pausa'}
                    </span>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      project.priority === 'high' ? 'bg-red-100 text-red-800' :
                      project.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {project.priority === 'high' ? 'Alta' : project.priority === 'medium' ? 'Media' : 'Baja'} Prioridad
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{project.description}</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div className="flex items-center text-gray-500">
                      <Calendar className="h-4 w-4 mr-1" />
                      {project.startDate} - {project.endDate}
                    </div>
                    <div className="flex items-center text-gray-500">
                      <Users className="h-4 w-4 mr-1" />
                      {project.team.length + 1} miembros
                    </div>
                    <div className="flex items-center text-gray-500">
                      <DollarSign className="h-4 w-4 mr-1" />
                      CLP ${project.spent.toLocaleString()} / ${project.budget.toLocaleString()}
                    </div>
                    <div className="flex items-center text-gray-500">
                      <Clock className="h-4 w-4 mr-1" />
                      {project.progress}% completado
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2 ml-4">
                  <button className="text-blue-600 hover:text-blue-900">
                    <Edit className="h-4 w-4" />
                  </button>
                  <button className="text-red-600 hover:text-red-900">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Progreso del Proyecto</span>
                  <span className="font-medium">{project.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full" 
                    style={{ width: `${project.progress}%` }}
                  ></div>
                </div>
              </div>

              {/* Team and Tasks */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Equipo del Proyecto</h4>
                  <div className="space-y-1">
                    <div className="text-sm">
                      <span className="font-medium text-blue-600">{project.manager}</span>
                      <span className="text-gray-500 ml-2">(Manager)</span>
                    </div>
                    {project.team.map((member, index) => (
                      <div key={index} className="text-sm text-gray-600">{member}</div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Tareas Principales</h4>
                  <div className="space-y-1">
                    {project.tasks.slice(0, 4).map((task) => (
                      <div key={task.id} className="flex items-center text-sm">
                        {task.status === 'completed' ? (
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        ) : task.status === 'in-progress' ? (
                          <Clock className="h-4 w-4 text-blue-500 mr-2" />
                        ) : (
                          <AlertTriangle className="h-4 w-4 text-gray-400 mr-2" />
                        )}
                        <span className={task.status === 'completed' ? 'line-through text-gray-500' : 'text-gray-700'}>
                          {task.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Project Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-full max-w-2xl shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Nuevo Proyecto</h3>
              <form onSubmit={handleAddProject} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nombre del Proyecto</label>
                  <input
                    type="text"
                    required
                    value={newProject.name}
                    onChange={(e) => setNewProject({...newProject, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                  <textarea
                    required
                    value={newProject.description}
                    onChange={(e) => setNewProject({...newProject, description: e.target.value})}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Fecha Inicio</label>
                    <input
                      type="date"
                      required
                      value={newProject.startDate}
                      onChange={(e) => setNewProject({...newProject, startDate: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Fecha Fin</label>
                    <input
                      type="date"
                      required
                      value={newProject.endDate}
                      onChange={(e) => setNewProject({...newProject, endDate: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Presupuesto (CLP)</label>
                    <input
                      type="number"
                      required
                      min="0"
                      value={newProject.budget}
                      onChange={(e) => setNewProject({...newProject, budget: parseInt(e.target.value) || 0})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Prioridad</label>
                    <select
                      value={newProject.priority}
                      onChange={(e) => setNewProject({...newProject, priority: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="low">Baja</option>
                      <option value="medium">Media</option>
                      <option value="high">Alta</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Manager del Proyecto</label>
                  <input
                    type="text"
                    required
                    value={newProject.manager}
                    onChange={(e) => setNewProject({...newProject, manager: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="flex space-x-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Crear Proyecto
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

export default ProjectManagement;