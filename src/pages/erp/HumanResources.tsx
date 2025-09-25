import React, { useState } from 'react';
import { Users, Plus, Calendar, Clock, Award, AlertCircle, TrendingUp, UserCheck, Edit, Trash2 } from 'lucide-react';

const HumanResources: React.FC = () => {
  const [employees, setEmployees] = useState([
    {
      id: 'EMP-001',
      name: 'María González',
      position: 'Cajera',
      department: 'Ventas',
      location: 'LOC-001',
      hireDate: '2022-03-15',
      salary: 450000,
      status: 'active',
      performance: 4.5,
      vacationDays: 15,
      usedVacationDays: 8,
      certifications: ['Atención al Cliente', 'Manejo de Caja'],
      lastReview: '2024-01-15',
      nextReview: '2024-07-15'
    },
    {
      id: 'EMP-002',
      name: 'Carlos Mendoza',
      position: 'Supervisor de Bodega',
      department: 'Logística',
      location: 'LOC-001',
      hireDate: '2021-08-10',
      salary: 650000,
      status: 'active',
      performance: 4.8,
      vacationDays: 20,
      usedVacationDays: 12,
      certifications: ['Gestión de Inventarios', 'Seguridad Industrial', 'Liderazgo'],
      lastReview: '2024-01-10',
      nextReview: '2024-07-10'
    },
    {
      id: 'EMP-003',
      name: 'Ana Pérez',
      position: 'Repartidora',
      department: 'Logística',
      location: 'LOC-002',
      hireDate: '2023-01-20',
      salary: 520000,
      status: 'active',
      performance: 4.2,
      vacationDays: 15,
      usedVacationDays: 5,
      certifications: ['Licencia Profesional', 'Primeros Auxilios'],
      lastReview: '2024-01-20',
      nextReview: '2024-07-20'
    },
    {
      id: 'EMP-004',
      name: 'Roberto Silva',
      position: 'Gerente General',
      department: 'Administración',
      location: 'LOC-001',
      hireDate: '2020-01-15',
      salary: 1200000,
      status: 'active',
      performance: 4.9,
      vacationDays: 25,
      usedVacationDays: 15,
      certifications: ['MBA', 'Gestión Empresarial', 'Liderazgo Estratégico'],
      lastReview: '2024-01-15',
      nextReview: '2024-07-15'
    }
  ]);

  const [vacationRequests, setVacationRequests] = useState([
    {
      id: 'VAC-001',
      employeeId: 'EMP-001',
      employeeName: 'María González',
      startDate: '2024-02-15',
      endDate: '2024-02-22',
      days: 7,
      reason: 'Vacaciones familiares',
      status: 'pending',
      requestDate: '2024-01-20'
    },
    {
      id: 'VAC-002',
      employeeId: 'EMP-003',
      employeeName: 'Ana Pérez',
      startDate: '2024-03-01',
      endDate: '2024-03-05',
      days: 4,
      reason: 'Descanso personal',
      status: 'approved',
      requestDate: '2024-01-18'
    }
  ]);

  const [showEmployeeForm, setShowEmployeeForm] = useState(false);
  const [showVacationForm, setShowVacationForm] = useState(false);
  const [selectedTab, setSelectedTab] = useState<'employees' | 'vacations' | 'performance'>('employees');

  const [newEmployee, setNewEmployee] = useState({
    name: '',
    position: '',
    department: '',
    location: '',
    salary: 0,
    vacationDays: 15
  });

  const departments = ['Ventas', 'Logística', 'Administración', 'Contabilidad', 'Recursos Humanos'];
  const locations = [
    { id: 'LOC-001', name: 'Local Principal' },
    { id: 'LOC-002', name: 'Sucursal Norte' }
  ];

  const getPerformanceColor = (performance: number) => {
    if (performance >= 4.5) return 'text-green-600';
    if (performance >= 4.0) return 'text-yellow-600';
    if (performance >= 3.5) return 'text-orange-600';
    return 'text-red-600';
  };

  const getVacationStatus = (used: number, total: number) => {
    const percentage = (used / total) * 100;
    if (percentage >= 80) return 'text-red-600';
    if (percentage >= 60) return 'text-yellow-600';
    return 'text-green-600';
  };

  const handleAddEmployee = (e: React.FormEvent) => {
    e.preventDefault();
    const id = `EMP-${String(employees.length + 1).padStart(3, '0')}`;
    setEmployees([...employees, {
      ...newEmployee,
      id,
      hireDate: new Date().toISOString().split('T')[0],
      status: 'active',
      performance: 0,
      usedVacationDays: 0,
      certifications: [],
      lastReview: '',
      nextReview: ''
    }]);
    setNewEmployee({
      name: '',
      position: '',
      department: '',
      location: '',
      salary: 0,
      vacationDays: 15
    });
    setShowEmployeeForm(false);
  };

  const approveVacation = (id: string) => {
    setVacationRequests(vacationRequests.map(req => 
      req.id === id ? { ...req, status: 'approved' } : req
    ));
  };

  const rejectVacation = (id: string) => {
    setVacationRequests(vacationRequests.map(req => 
      req.id === id ? { ...req, status: 'rejected' } : req
    ));
  };

  const totalEmployees = employees.length;
  const averagePerformance = employees.reduce((sum, emp) => sum + emp.performance, 0) / employees.length;
  const totalPayroll = employees.reduce((sum, emp) => sum + emp.salary, 0);
  const pendingVacations = vacationRequests.filter(req => req.status === 'pending').length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <h2 className="text-2xl font-bold text-gray-900">Recursos Humanos</h2>
        <div className="flex space-x-2 mt-4 sm:mt-0">
          <button
            onClick={() => setSelectedTab('employees')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedTab === 'employees'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Empleados
          </button>
          <button
            onClick={() => setSelectedTab('vacations')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedTab === 'vacations'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Vacaciones
          </button>
          <button
            onClick={() => setSelectedTab('performance')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedTab === 'performance'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Desempeño
          </button>
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
            <h3 className="text-sm font-medium text-gray-500">Total Empleados</h3>
            <p className="text-2xl font-bold text-blue-600 mt-1">{totalEmployees}</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="p-2 rounded-lg bg-green-50">
              <Award className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-500">Desempeño Promedio</h3>
            <p className={`text-2xl font-bold mt-1 ${getPerformanceColor(averagePerformance)}`}>
              {averagePerformance.toFixed(1)}/5.0
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="p-2 rounded-lg bg-purple-50">
              <TrendingUp className="h-6 w-6 text-purple-600" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-500">Nómina Total</h3>
            <p className="text-2xl font-bold text-purple-600 mt-1">CLP ${totalPayroll.toLocaleString()}</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="p-2 rounded-lg bg-orange-50">
              <AlertCircle className="h-6 w-6 text-orange-600" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-500">Vacaciones Pendientes</h3>
            <p className="text-2xl font-bold text-orange-600 mt-1">{pendingVacations}</p>
          </div>
        </div>
      </div>

      {selectedTab === 'employees' && (
        <>
          <div className="flex justify-end">
            <button
              onClick={() => setShowEmployeeForm(true)}
              className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="h-5 w-5" />
              <span>Nuevo Empleado</span>
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Lista de Empleados</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Empleado</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Departamento</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Salario</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Desempeño</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vacaciones</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Próxima Evaluación</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {employees.map((employee) => (
                    <tr key={employee.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Users className="h-5 w-5 text-gray-400 mr-3" />
                          <div>
                            <div className="text-sm font-medium text-gray-900">{employee.name}</div>
                            <div className="text-sm text-gray-500">{employee.position}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {employee.department}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                        CLP ${employee.salary.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`text-sm font-medium ${getPerformanceColor(employee.performance)}`}>
                          {employee.performance.toFixed(1)}/5.0
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm">
                          <span className={`font-medium ${getVacationStatus(employee.usedVacationDays, employee.vacationDays)}`}>
                            {employee.usedVacationDays}/{employee.vacationDays}
                          </span>
                          <div className="w-full bg-gray-200 rounded-full h-1 mt-1">
                            <div 
                              className="bg-blue-600 h-1 rounded-full" 
                              style={{ width: `${(employee.usedVacationDays / employee.vacationDays) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {employee.nextReview || 'No programada'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          <button className="text-blue-600 hover:text-blue-900">
                            <Edit className="h-4 w-4" />
                          </button>
                          <button className="text-red-600 hover:text-red-900">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {selectedTab === 'vacations' && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Solicitudes de Vacaciones</h3>
          </div>
          <div className="divide-y divide-gray-200">
            {vacationRequests.map((request) => (
              <div key={request.id} className="p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h4 className="font-medium text-gray-900">{request.employeeName}</h4>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        request.status === 'approved' ? 'bg-green-100 text-green-800' :
                        request.status === 'rejected' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {request.status === 'approved' ? 'Aprobado' :
                         request.status === 'rejected' ? 'Rechazado' : 'Pendiente'}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                      <div>
                        <span className="font-medium">Desde:</span> {request.startDate}
                      </div>
                      <div>
                        <span className="font-medium">Hasta:</span> {request.endDate}
                      </div>
                      <div>
                        <span className="font-medium">Días:</span> {request.days}
                      </div>
                      <div>
                        <span className="font-medium">Solicitado:</span> {request.requestDate}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">
                      <span className="font-medium">Motivo:</span> {request.reason}
                    </p>
                  </div>
                  {request.status === 'pending' && (
                    <div className="flex space-x-2 ml-4">
                      <button
                        onClick={() => approveVacation(request.id)}
                        className="px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                      >
                        Aprobar
                      </button>
                      <button
                        onClick={() => rejectVacation(request.id)}
                        className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                      >
                        Rechazar
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedTab === 'performance' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {employees.map((employee) => (
            <div key={employee.id} className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold text-gray-900">{employee.name}</h4>
                <span className={`text-lg font-bold ${getPerformanceColor(employee.performance)}`}>
                  {employee.performance.toFixed(1)}/5.0
                </span>
              </div>
              <div className="space-y-3">
                <div className="text-sm">
                  <span className="text-gray-500">Posición:</span>
                  <span className="font-medium ml-2">{employee.position}</span>
                </div>
                <div className="text-sm">
                  <span className="text-gray-500">Última evaluación:</span>
                  <span className="font-medium ml-2">{employee.lastReview || 'Sin evaluar'}</span>
                </div>
                <div className="text-sm">
                  <span className="text-gray-500">Próxima evaluación:</span>
                  <span className="font-medium ml-2">{employee.nextReview || 'No programada'}</span>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Certificaciones:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {employee.certifications.map((cert, index) => (
                      <span key={index} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {cert}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Employee Form Modal */}
      {showEmployeeForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-full max-w-2xl shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Nuevo Empleado</h3>
              <form onSubmit={handleAddEmployee} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nombre Completo</label>
                    <input
                      type="text"
                      required
                      value={newEmployee.name}
                      onChange={(e) => setNewEmployee({...newEmployee, name: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Posición</label>
                    <input
                      type="text"
                      required
                      value={newEmployee.position}
                      onChange={(e) => setNewEmployee({...newEmployee, position: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Departamento</label>
                    <select
                      required
                      value={newEmployee.department}
                      onChange={(e) => setNewEmployee({...newEmployee, department: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Seleccionar departamento</option>
                      {departments.map(dept => (
                        <option key={dept} value={dept}>{dept}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Local</label>
                    <select
                      required
                      value={newEmployee.location}
                      onChange={(e) => setNewEmployee({...newEmployee, location: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Seleccionar local</option>
                      {locations.map(location => (
                        <option key={location.id} value={location.id}>{location.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Salario Mensual (CLP)</label>
                    <input
                      type="number"
                      required
                      min="0"
                      value={newEmployee.salary}
                      onChange={(e) => setNewEmployee({...newEmployee, salary: parseInt(e.target.value) || 0})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Días de Vacaciones</label>
                    <input
                      type="number"
                      required
                      min="0"
                      value={newEmployee.vacationDays}
                      onChange={(e) => setNewEmployee({...newEmployee, vacationDays: parseInt(e.target.value) || 15})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="flex space-x-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Agregar Empleado
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowEmployeeForm(false)}
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

export default HumanResources;