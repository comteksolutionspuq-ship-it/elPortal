import React, { useState } from 'react';
import { GitBranch, Play, Pause, CheckCircle, Clock, AlertTriangle, Plus, Edit, Trash2, Users } from 'lucide-react';

const WorkflowModule: React.FC = () => {
  const [workflows, setWorkflows] = useState([
    {
      id: 'WF-001',
      name: 'Proceso de Compras',
      description: 'Flujo completo desde solicitud hasta recepción de productos',
      status: 'active',
      category: 'Compras',
      steps: [
        { id: 1, name: 'Solicitud de Compra', assignee: 'Carlos Mendoza', status: 'completed', duration: 1 },
        { id: 2, name: 'Aprobación Gerencia', assignee: 'Roberto Silva', status: 'completed', duration: 2 },
        { id: 3, name: 'Cotización Proveedores', assignee: 'María González', status: 'in-progress', duration: 3 },
        { id: 4, name: 'Orden de Compra', assignee: 'Carlos Mendoza', status: 'pending', duration: 1 },
        { id: 5, name: 'Recepción Productos', assignee: 'Ana Pérez', status: 'pending', duration: 1 }
      ],
      instances: 12,
      avgDuration: 8,
      successRate: 95
    },
    {
      id: 'WF-002',
      name: 'Onboarding Empleados',
      description: 'Proceso de incorporación de nuevos empleados',
      status: 'active',
      category: 'RRHH',
      steps: [
        { id: 1, name: 'Documentación Legal', assignee: 'María González', status: 'completed', duration: 1 },
        { id: 2, name: 'Inducción Corporativa', assignee: 'Roberto Silva', status: 'completed', duration: 2 },
        { id: 3, name: 'Capacitación Específica', assignee: 'Carlos Mendoza', status: 'in-progress', duration: 5 },
        { id: 4, name: 'Evaluación Inicial', assignee: 'Roberto Silva', status: 'pending', duration: 1 },
        { id: 5, name: 'Asignación Definitiva', assignee: 'María González', status: 'pending', duration: 1 }
      ],
      instances: 3,
      avgDuration: 10,
      successRate: 100
    },
    {
      id: 'WF-003',
      name: 'Gestión de Reclamos',
      description: 'Proceso para manejo y resolución de reclamos de clientes',
      status: 'active',
      category: 'Atención al Cliente',
      steps: [
        { id: 1, name: 'Recepción Reclamo', assignee: 'María González', status: 'completed', duration: 0.5 },
        { id: 2, name: 'Investigación', assignee: 'Carlos Mendoza', status: 'completed', duration: 2 },
        { id: 3, name: 'Propuesta Solución', assignee: 'Roberto Silva', status: 'in-progress', duration: 1 },
        { id: 4, name: 'Implementación', assignee: 'Ana Pérez', status: 'pending', duration: 2 },
        { id: 5, name: 'Seguimiento', assignee: 'María González', status: 'pending', duration: 3 }
      ],
      instances: 8,
      avgDuration: 8.5,
      successRate: 87.5
    }
  ]);

  const [activeInstances, setActiveInstances] = useState([
    {
      id: 'INST-001',
      workflowId: 'WF-001',
      workflowName: 'Proceso de Compras',
      title: 'Compra Mascarillas N95',
      currentStep: 3,
      assignee: 'María González',
      startDate: '2024-01-18',
      dueDate: '2024-01-26',
      priority: 'high',
      progress: 60
    },
    {
      id: 'INST-002',
      workflowId: 'WF-002',
      workflowName: 'Onboarding Empleados',
      title: 'Incorporación Luis Martínez',
      currentStep: 3,
      assignee: 'Carlos Mendoza',
      startDate: '2024-01-15',
      dueDate: '2024-01-25',
      priority: 'medium',
      progress: 60
    },
    {
      id: 'INST-003',
      workflowId: 'WF-003',
      workflowName: 'Gestión de Reclamos',
      title: 'Reclamo Entrega Tardía - Hospital Regional',
      currentStep: 3,
      assignee: 'Roberto Silva',
      startDate: '2024-01-20',
      dueDate: '2024-01-28',
      priority: 'high',
      progress: 50
    }
  ]);

  const [showWorkflowForm, setShowWorkflowForm] = useState(false);
  const [selectedTab, setSelectedTab] = useState<'workflows' | 'instances' | 'analytics'>('workflows');

  const [newWorkflow, setNewWorkflow] = useState({
    name: '',
    description: '',
    category: '',
    steps: [{ name: '', assignee: '', duration: 1 }]
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'delayed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4" />;
      case 'in-progress': return <Play className="h-4 w-4" />;
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'delayed': return <AlertTriangle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
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

  const addStep = () => {
    setNewWorkflow({
      ...newWorkflow,
      steps: [...newWorkflow.steps, { name: '', assignee: '', duration: 1 }]
    });
  };

  const removeStep = (index: number) => {
    setNewWorkflow({
      ...newWorkflow,
      steps: newWorkflow.steps.filter((_, i) => i !== index)
    });
  };

  const updateStep = (index: number, field: string, value: any) => {
    const updatedSteps = newWorkflow.steps.map((step, i) => 
      i === index ? { ...step, [field]: value } : step
    );
    setNewWorkflow({ ...newWorkflow, steps: updatedSteps });
  };

  const handleAddWorkflow = (e: React.FormEvent) => {
    e.preventDefault();
    const id = `WF-${String(workflows.length + 1).padStart(3, '0')}`;
    const stepsWithIds = newWorkflow.steps.map((step, index) => ({
      ...step,
      id: index + 1,
      status: 'pending'
    }));
    
    setWorkflows([...workflows, {
      ...newWorkflow,
      id,
      status: 'active',
      steps: stepsWithIds,
      instances: 0,
      avgDuration: 0,
      successRate: 0
    }]);
    
    setNewWorkflow({
      name: '',
      description: '',
      category: '',
      steps: [{ name: '', assignee: '', duration: 1 }]
    });
    setShowWorkflowForm(false);
  };

  const totalWorkflows = workflows.length;
  const activeWorkflows = workflows.filter(wf => wf.status === 'active').length;
  const totalInstances = activeInstances.length;
  const avgSuccessRate = workflows.reduce((sum, wf) => sum + wf.successRate, 0) / workflows.length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <h2 className="text-2xl font-bold text-gray-900">Gestión de Workflows</h2>
        <div className="flex space-x-2 mt-4 sm:mt-0">
          <button
            onClick={() => setSelectedTab('workflows')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedTab === 'workflows'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Workflows
          </button>
          <button
            onClick={() => setSelectedTab('instances')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedTab === 'instances'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Instancias Activas
          </button>
          <button
            onClick={() => setSelectedTab('analytics')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedTab === 'analytics'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Analíticas
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="p-2 rounded-lg bg-blue-50">
              <GitBranch className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-500">Total Workflows</h3>
            <p className="text-2xl font-bold text-blue-600 mt-1">{totalWorkflows}</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="p-2 rounded-lg bg-green-50">
              <Play className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-500">Workflows Activos</h3>
            <p className="text-2xl font-bold text-green-600 mt-1">{activeWorkflows}</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="p-2 rounded-lg bg-purple-50">
              <Clock className="h-6 w-6 text-purple-600" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-500">Instancias Activas</h3>
            <p className="text-2xl font-bold text-purple-600 mt-1">{totalInstances}</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="p-2 rounded-lg bg-orange-50">
              <CheckCircle className="h-6 w-6 text-orange-600" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-500">Tasa de Éxito</h3>
            <p className="text-2xl font-bold text-orange-600 mt-1">{Math.round(avgSuccessRate)}%</p>
          </div>
        </div>
      </div>

      {selectedTab === 'workflows' && (
        <>
          <div className="flex justify-end">
            <button
              onClick={() => setShowWorkflowForm(true)}
              className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="h-5 w-5" />
              <span>Nuevo Workflow</span>
            </button>
          </div>

          <div className="space-y-4">
            {workflows.map((workflow) => (
              <div key={workflow.id} className="bg-white rounded-lg shadow-sm border border-gray-100">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{workflow.name}</h3>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(workflow.status)}`}>
                          {workflow.status === 'active' ? 'Activo' : 'Inactivo'}
                        </span>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {workflow.category}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{workflow.description}</p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div className="text-gray-500">
                          <span className="font-medium">Instancias:</span> {workflow.instances}
                        </div>
                        <div className="text-gray-500">
                          <span className="font-medium">Duración promedio:</span> {workflow.avgDuration} días
                        </div>
                        <div className="text-gray-500">
                          <span className="font-medium">Tasa de éxito:</span> {workflow.successRate}%
                        </div>
                        <div className="text-gray-500">
                          <span className="font-medium">Pasos:</span> {workflow.steps.length}
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

                  {/* Workflow Steps */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-3">Pasos del Workflow</h4>
                    <div className="space-y-2">
                      {workflow.steps.map((step, index) => (
                        <div key={step.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <span className="flex items-center justify-center w-6 h-6 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                              {index + 1}
                            </span>
                            <div>
                              <h5 className="text-sm font-medium text-gray-900">{step.name}</h5>
                              <div className="flex items-center space-x-2 text-xs text-gray-500">
                                <Users className="h-3 w-3" />
                                <span>{step.assignee}</span>
                                <span>•</span>
                                <span>{step.duration} día{step.duration !== 1 ? 's' : ''}</span>
                              </div>
                            </div>
                          </div>
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(step.status)}`}>
                            {getStatusIcon(step.status)}
                            <span className="ml-1">
                              {step.status === 'completed' ? 'Completado' :
                               step.status === 'in-progress' ? 'En Progreso' : 'Pendiente'}
                            </span>
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {selectedTab === 'instances' && (
        <div className="space-y-4">
          {activeInstances.map((instance) => (
            <div key={instance.id} className={`bg-white rounded-lg shadow-sm border border-gray-100 border-l-4 ${getPriorityColor(instance.priority)}`}>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{instance.title}</h3>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        instance.priority === 'high' ? 'bg-red-100 text-red-800' :
                        instance.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {instance.priority === 'high' ? 'Alta' : instance.priority === 'medium' ? 'Media' : 'Baja'} Prioridad
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{instance.workflowName}</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div className="text-gray-500">
                        <span className="font-medium">Paso actual:</span> {instance.currentStep}
                      </div>
                      <div className="text-gray-500">
                        <span className="font-medium">Asignado a:</span> {instance.assignee}
                      </div>
                      <div className="text-gray-500">
                        <span className="font-medium">Inicio:</span> {instance.startDate}
                      </div>
                      <div className="text-gray-500">
                        <span className="font-medium">Vencimiento:</span> {instance.dueDate}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Progreso</span>
                    <span className="font-medium">{instance.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${instance.progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedTab === 'analytics' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {workflows.map((workflow) => (
            <div key={workflow.id} className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
              <h4 className="font-semibold text-gray-900 mb-4">{workflow.name}</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Instancias ejecutadas:</span>
                  <span className="font-medium">{workflow.instances}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Duración promedio:</span>
                  <span className="font-medium">{workflow.avgDuration} días</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Tasa de éxito:</span>
                  <span className={`font-medium ${workflow.successRate >= 90 ? 'text-green-600' : workflow.successRate >= 70 ? 'text-yellow-600' : 'text-red-600'}`}>
                    {workflow.successRate}%
                  </span>
                </div>
                <div className="mt-4">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${workflow.successRate >= 90 ? 'bg-green-600' : workflow.successRate >= 70 ? 'bg-yellow-600' : 'bg-red-600'}`}
                      style={{ width: `${workflow.successRate}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Workflow Form Modal */}
      {showWorkflowForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-10 mx-auto p-5 border w-full max-w-4xl shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Nuevo Workflow</h3>
              <form onSubmit={handleAddWorkflow} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nombre del Workflow</label>
                    <input
                      type="text"
                      required
                      value={newWorkflow.name}
                      onChange={(e) => setNewWorkflow({...newWorkflow, name: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Categoría</label>
                    <select
                      required
                      value={newWorkflow.category}
                      onChange={(e) => setNewWorkflow({...newWorkflow, category: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Seleccionar categoría</option>
                      <option value="Compras">Compras</option>
                      <option value="RRHH">Recursos Humanos</option>
                      <option value="Atención al Cliente">Atención al Cliente</option>
                      <option value="Ventas">Ventas</option>
                      <option value="Operaciones">Operaciones</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                  <textarea
                    required
                    value={newWorkflow.description}
                    onChange={(e) => setNewWorkflow({...newWorkflow, description: e.target.value})}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-3">
                    <label className="block text-sm font-medium text-gray-700">Pasos del Workflow</label>
                    <button
                      type="button"
                      onClick={addStep}
                      className="px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                    >
                      Agregar Paso
                    </button>
                  </div>
                  <div className="space-y-3">
                    {newWorkflow.steps.map((step, index) => (
                      <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-3 p-3 border border-gray-200 rounded-lg">
                        <div>
                          <input
                            type="text"
                            placeholder="Nombre del paso"
                            required
                            value={step.name}
                            onChange={(e) => updateStep(index, 'name', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <input
                            type="text"
                            placeholder="Responsable"
                            required
                            value={step.assignee}
                            onChange={(e) => updateStep(index, 'assignee', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <input
                            type="number"
                            placeholder="Duración (días)"
                            required
                            min="1"
                            value={step.duration}
                            onChange={(e) => updateStep(index, 'duration', parseInt(e.target.value) || 1)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div className="flex items-center">
                          {newWorkflow.steps.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeStep(index)}
                              className="text-red-600 hover:text-red-900"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          )}
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
                    Crear Workflow
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowWorkflowForm(false)}
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

export default WorkflowModule;