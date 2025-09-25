import React, { useState } from 'react';
import { Plus, CreditCard as Edit, Trash2, MapPin, Store, Building, DollarSign, Calendar, CheckCircle, AlertCircle, Users, UserPlus, Shield, Mail, Phone } from 'lucide-react';

const ControlPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'locations' | 'employees'>('locations');
  
  const [activeLocations, setActiveLocations] = useState([
    {
      id: 'LOC-001',
      name: 'Local Principal',
      address: 'Av. España 1450, Punta Arenas',
      type: 'owned',
      status: 'active',
      monthlyRent: 0,
      purchaseValue: 85000000,
      hasWarehouse: true,
      warehouseSize: 200,
      openingDate: '2020-01-15',
      monthlyRevenue: 2800000,
      monthlyCosts: 1850000
    },
    {
      id: 'LOC-002',
      name: 'Sucursal Norte',
      address: 'Av. Manuel Bulnes 2100, Punta Arenas',
      type: 'rented',
      status: 'active',
      monthlyRent: 650000,
      purchaseValue: 0,
      hasWarehouse: true,
      warehouseSize: 120,
      openingDate: '2023-04-01',
      monthlyRevenue: 1850000,
      monthlyCosts: 1200000
    }
  ]);

  const [employees, setEmployees] = useState([
    {
      id: 'EMP-001',
      name: 'María González',
      position: 'Cajera',
      location: 'LOC-001',
      email: 'maria.gonzalez@elportal.cl',
      phone: '+56 9 8765 4321',
      salary: 450000,
      hireDate: '2022-03-15',
      status: 'active',
      role: 'cashier'
    },
    {
      id: 'EMP-002',
      name: 'Carlos Mendoza',
      position: 'Supervisor de Bodega',
      location: 'LOC-001',
      email: 'carlos.mendoza@elportal.cl',
      phone: '+56 9 7654 3210',
      salary: 650000,
      hireDate: '2021-08-10',
      status: 'active',
      role: 'supervisor'
    },
    {
      id: 'EMP-003',
      name: 'Ana Pérez',
      position: 'Repartidora',
      location: 'LOC-002',
      email: 'ana.perez@elportal.cl',
      phone: '+56 9 6543 2109',
      salary: 520000,
      hireDate: '2023-01-20',
      status: 'active',
      role: 'driver'
    },
    {
      id: 'EMP-004',
      name: 'Roberto Silva',
      position: 'Gerente General',
      location: 'LOC-001',
      email: 'roberto.silva@elportal.cl',
      phone: '+56 9 5432 1098',
      salary: 1200000,
      hireDate: '2020-01-15',
      status: 'active',
      role: 'admin'
    }
  ]);
  const [potentialLocations, setPotentialLocations] = useState([
    {
      id: 'POT-001',
      name: 'Centro Comercial Pionero',
      address: 'Av. España 1450, Punta Arenas',
      type: 'rent',
      monthlyRent: 850000,
      purchaseValue: 0,
      setupCost: 3500000,
      hasWarehouse: false,
      warehouseSize: 0,
      projectedRevenue: 2200000,
      projectedCosts: 1650000,
      score: 8.5,
      status: 'evaluation'
    },
    {
      id: 'POT-002',
      name: 'Puerto Natales',
      address: 'Eberhard 354, Puerto Natales',
      type: 'purchase',
      monthlyRent: 0,
      purchaseValue: 45000000,
      setupCost: 4200000,
      hasWarehouse: true,
      warehouseSize: 80,
      projectedRevenue: 1650000,
      projectedCosts: 1100000,
      score: 7.2,
      status: 'consideration'
    }
  ]);

  const [showLocationForm, setShowLocationForm] = useState(false);
  const [showEmployeeForm, setShowEmployeeForm] = useState(false);
  const [editingLocation, setEditingLocation] = useState<any>(null);
  const [formType, setFormType] = useState<'active' | 'potential'>('active');
  const [newLocation, setNewLocation] = useState({
    name: '',
    address: '',
    type: 'rented',
    monthlyRent: 0,
    purchaseValue: 0,
    setupCost: 0,
    hasWarehouse: false,
    warehouseSize: 0,
    projectedRevenue: 0,
    projectedCosts: 0
  });

  const [newEmployee, setNewEmployee] = useState({
    name: '',
    position: '',
    location: '',
    email: '',
    phone: '',
    salary: 0,
    role: 'cashier'
  });
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'evaluation': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'consideration': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Activo';
      case 'evaluation': return 'En Evaluación';
      case 'consideration': return 'En Consideración';
      default: return 'Sin Estado';
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-purple-100 text-purple-800';
      case 'supervisor': return 'bg-blue-100 text-blue-800';
      case 'cashier': return 'bg-green-100 text-green-800';
      case 'driver': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRoleText = (role: string) => {
    switch (role) {
      case 'admin': return 'Administrador';
      case 'supervisor': return 'Supervisor';
      case 'cashier': return 'Cajero';
      case 'driver': return 'Repartidor';
      default: return 'Empleado';
    }
  };
  const handleAddLocation = (e: React.FormEvent) => {
    e.preventDefault();
    const id = formType === 'active' ? `LOC-${String(activeLocations.length + 1).padStart(3, '0')}` : `POT-${String(potentialLocations.length + 1).padStart(3, '0')}`;
    
    if (formType === 'active') {
      setActiveLocations([...activeLocations, {
        ...newLocation,
        id,
        status: 'active',
        openingDate: new Date().toISOString().split('T')[0],
        monthlyRevenue: newLocation.projectedRevenue,
        monthlyCosts: newLocation.projectedCosts
      }]);
    } else {
      setPotentialLocations([...potentialLocations, {
        ...newLocation,
        id,
        score: 7.0,
        status: 'evaluation'
      }]);
    }
    
    setNewLocation({
      name: '',
      address: '',
      type: 'rented',
      monthlyRent: 0,
      purchaseValue: 0,
      setupCost: 0,
      hasWarehouse: false,
      warehouseSize: 0,
      projectedRevenue: 0,
      projectedCosts: 0
    });
    setShowLocationForm(false);
  };

  const handleAddEmployee = (e: React.FormEvent) => {
    e.preventDefault();
    const id = `EMP-${String(employees.length + 1).padStart(3, '0')}`;
    
    setEmployees([...employees, {
      ...newEmployee,
      id,
      hireDate: new Date().toISOString().split('T')[0],
      status: 'active'
    }]);
    
    setNewEmployee({
      name: '',
      position: '',
      location: '',
      email: '',
      phone: '',
      salary: 0,
      role: 'cashier'
    });
    setShowEmployeeForm(false);
  };
  const deleteLocation = (id: string, type: 'active' | 'potential') => {
    if (type === 'active') {
      setActiveLocations(activeLocations.filter(loc => loc.id !== id));
    } else {
      setPotentialLocations(potentialLocations.filter(loc => loc.id !== id));
    }
  };

  const deleteEmployee = (id: string) => {
    setEmployees(employees.filter(emp => emp.id !== id));
  };
  const totalActiveRevenue = activeLocations.reduce((sum, loc) => sum + loc.monthlyRevenue, 0);
  const totalActiveCosts = activeLocations.reduce((sum, loc) => sum + loc.monthlyCosts, 0);
  const totalActiveProfit = totalActiveRevenue - totalActiveCosts;
  const totalPayroll = employees.filter(emp => emp.status === 'active').reduce((sum, emp) => sum + emp.salary, 0);

  return (<div>
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <h2 className="text-2xl font-bold text-gray-900">Panel de Control - Gestión de Locales</h2>
        <div className="flex space-x-2 mt-4 sm:mt-0">
          <button
            onClick={() => setActiveTab('locations')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'locations'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Locales
          </button>
          <button
            onClick={() => setActiveTab('employees')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'employees'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Empleados
          </button>
        </div>
      </div>

      {activeTab === 'locations' && (
        <>
        <div className="flex space-x-3 mt-4 sm:mt-0">
          <button
            onClick={() => {
              setFormType('active');
              setShowLocationForm(true);
            }}
            className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            <Plus className="h-5 w-5" />
            <span>Nuevo Local</span>
          </button>
          <button
            onClick={() => {
              setFormType('potential');
              setShowLocationForm(true);
            }}
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="h-5 w-5" />
            <span>Local Potencial</span>
          </button>
        </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="p-2 rounded-lg bg-blue-50">
              <Store className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-500">Locales Activos</h3>
            <p className="text-2xl font-bold text-gray-900 mt-1">{activeLocations.length}</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="p-2 rounded-lg bg-green-50">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-500">Ingresos Totales</h3>
            <p className="text-2xl font-bold text-green-600 mt-1">CLP ${totalActiveRevenue.toLocaleString()}</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="p-2 rounded-lg bg-red-50">
              <DollarSign className="h-6 w-6 text-red-600" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-500">Costos Totales</h3>
            <p className="text-2xl font-bold text-red-600 mt-1">CLP ${totalActiveCosts.toLocaleString()}</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="p-2 rounded-lg bg-purple-50">
              <DollarSign className="h-6 w-6 text-purple-600" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-500">Ganancia Neta</h3>
            <p className={`text-2xl font-bold mt-1 ${totalActiveProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              CLP ${totalActiveProfit.toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      {/* Active Locations */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Locales Activos</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Local</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Costo Mensual</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bodega</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ingresos</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ganancia</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {activeLocations.map((location) => (
                <tr key={location.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Store className="h-5 w-5 text-gray-400 mr-3" />
                      <div>
                        <div className="text-sm font-medium text-gray-900">{location.name}</div>
                        <div className="text-sm text-gray-500">{location.address}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(location.status)}`}>
                      {location.type === 'owned' ? 'Propio' : 'Arrendado'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    CLP ${(location.monthlyRent || 0).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {location.hasWarehouse ? (
                        <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                      ) : (
                        <AlertCircle className="h-4 w-4 text-red-500 mr-1" />
                      )}
                      <span className="text-sm text-gray-900">
                        {location.hasWarehouse ? `${location.warehouseSize}m²` : 'Sin bodega'}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                    CLP ${location.monthlyRevenue.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <span className={`${(location.monthlyRevenue - location.monthlyCosts) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      CLP ${(location.monthlyRevenue - location.monthlyCosts).toLocaleString()}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => deleteLocation(location.id, 'active')}
                        className="text-red-600 hover:text-red-900"
                      >
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

      {/* Potential Locations */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Locales Potenciales</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
          {potentialLocations.map((location) => (
            <div key={location.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-start mb-3">
                <h4 className="font-semibold text-gray-900">{location.name}</h4>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(location.status)}`}>
                  {getStatusText(location.status)}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-3">{location.address}</p>
              
              <div className="space-y-2 mb-4">
                <div className="text-sm">
                  <span className="text-gray-500">Tipo:</span>
                  <span className="font-medium ml-2">{location.type === 'rent' ? 'Arriendo' : 'Compra'}</span>
                </div>
                <div className="text-sm">
                  <span className="text-gray-500">Costo inicial:</span>
                  <span className="font-medium ml-2">CLP ${(location.setupCost || 0).toLocaleString()}</span>
                </div>
                <div className="text-sm">
                  <span className="text-gray-500">Ingresos proyectados:</span>
                  <span className="font-medium ml-2 text-green-600">CLP ${location.projectedRevenue.toLocaleString()}</span>
                </div>
                <div className="text-sm">
                  <span className="text-gray-500">Puntuación:</span>
                  <span className="font-medium ml-2">{location.score}/10</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <button className="text-blue-600 hover:text-blue-900">
                    <Edit className="h-4 w-4" />
                  </button>
                  <button 
                    onClick={() => deleteLocation(location.id, 'potential')}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                <button className="text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition-colors">
                  Ver Detalles
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
        </>
      )}

      {activeTab === 'employees' && (
        <>
          <div className="flex justify-between items-center">
            <div></div>
            <button
              onClick={() => setShowEmployeeForm(true)}
              className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              <UserPlus className="h-5 w-5" />
              <span>Nuevo Empleado</span>
            </button>
          </div>

          {/* Employee Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
              <div className="flex items-center justify-between">
                <div className="p-2 rounded-lg bg-blue-50">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-sm font-medium text-gray-500">Total Empleados</h3>
                <p className="text-2xl font-bold text-gray-900 mt-1">{employees.filter(emp => emp.status === 'active').length}</p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
              <div className="flex items-center justify-between">
                <div className="p-2 rounded-lg bg-green-50">
                  <DollarSign className="h-6 w-6 text-green-600" />
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-sm font-medium text-gray-500">Nómina Total</h3>
                <p className="text-2xl font-bold text-green-600 mt-1">CLP ${totalPayroll.toLocaleString()}</p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
              <div className="flex items-center justify-between">
                <div className="p-2 rounded-lg bg-purple-50">
                  <Shield className="h-6 w-6 text-purple-600" />
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-sm font-medium text-gray-500">Administradores</h3>
                <p className="text-2xl font-bold text-purple-600 mt-1">{employees.filter(emp => emp.role === 'admin').length}</p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
              <div className="flex items-center justify-between">
                <div className="p-2 rounded-lg bg-orange-50">
                  <DollarSign className="h-6 w-6 text-orange-600" />
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-sm font-medium text-gray-500">Salario Promedio</h3>
                <p className="text-2xl font-bold text-orange-600 mt-1">
                  CLP ${Math.round(totalPayroll / employees.filter(emp => emp.status === 'active').length).toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          {/* Employees Table */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Lista de Empleados</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Empleado</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cargo</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Local</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contacto</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Salario</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha Ingreso</th>
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
                            <div className="text-sm text-gray-500">{employee.id}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm text-gray-900">{employee.position}</div>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleColor(employee.role)}`}>
                            {getRoleText(employee.role)}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {activeLocations.find(loc => loc.id === employee.location)?.name || 'Sin asignar'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          <div className="flex items-center">
                            <Mail className="h-4 w-4 text-gray-400 mr-1" />
                            {employee.email}
                          </div>
                          <div className="flex items-center mt-1">
                            <Phone className="h-4 w-4 text-gray-400 mr-1" />
                            {employee.phone}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                        CLP ${employee.salary.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {employee.hireDate}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          <button className="text-blue-600 hover:text-blue-900">
                            <Edit className="h-4 w-4" />
                          </button>
                          <button 
                            onClick={() => deleteEmployee(employee.id)}
                            className="text-red-600 hover:text-red-900"
                          >
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

      {/* Location Form Modal */}
      {showLocationForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-full max-w-2xl shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                {formType === 'active' ? 'Agregar Nuevo Local' : 'Agregar Local Potencial'}
              </h3>
              <form onSubmit={handleAddLocation} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nombre del Local</label>
                    <input
                      type="text"
                      required
                      value={newLocation.name}
                      onChange={(e) => setNewLocation({...newLocation, name: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
                    <select
                      value={newLocation.type}
                      onChange={(e) => setNewLocation({...newLocation, type: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="rented">Arrendado</option>
                      <option value="owned">Propio</option>
                      <option value="rent">Arriendo (Potencial)</option>
                      <option value="purchase">Compra (Potencial)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Dirección</label>
                  <input
                    type="text"
                    required
                    value={newLocation.address}
                    onChange={(e) => setNewLocation({...newLocation, address: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Arriendo Mensual (CLP)</label>
                    <input
                      type="number"
                      min="0"
                      value={newLocation.monthlyRent}
                      onChange={(e) => setNewLocation({...newLocation, monthlyRent: parseInt(e.target.value) || 0})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Valor de Compra (CLP)</label>
                    <input
                      type="number"
                      min="0"
                      value={newLocation.purchaseValue}
                      onChange={(e) => setNewLocation({...newLocation, purchaseValue: parseInt(e.target.value) || 0})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Costo de Instalación (CLP)</label>
                    <input
                      type="number"
                      min="0"
                      value={newLocation.setupCost}
                      onChange={(e) => setNewLocation({...newLocation, setupCost: parseInt(e.target.value) || 0})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tamaño Bodega (m²)</label>
                    <input
                      type="number"
                      min="0"
                      value={newLocation.warehouseSize}
                      onChange={(e) => setNewLocation({...newLocation, warehouseSize: parseInt(e.target.value) || 0})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="hasWarehouse"
                    checked={newLocation.hasWarehouse}
                    onChange={(e) => setNewLocation({...newLocation, hasWarehouse: e.target.checked})}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="hasWarehouse" className="ml-2 block text-sm text-gray-900">
                    Tiene bodega
                  </label>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {formType === 'active' ? 'Ingresos Mensuales (CLP)' : 'Ingresos Proyectados (CLP)'}
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={newLocation.projectedRevenue}
                      onChange={(e) => setNewLocation({...newLocation, projectedRevenue: parseInt(e.target.value) || 0})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {formType === 'active' ? 'Costos Mensuales (CLP)' : 'Costos Proyectados (CLP)'}
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={newLocation.projectedCosts}
                      onChange={(e) => setNewLocation({...newLocation, projectedCosts: parseInt(e.target.value) || 0})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="flex space-x-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                  >
                    {formType === 'active' ? 'Agregar Local' : 'Agregar Local Potencial'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowLocationForm(false)}
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
    <>
      {/* Employee Form Modal */}
      {showEmployeeForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-full max-w-2xl shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Agregar Nuevo Empleado</h3>
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
                    <label className="block text-sm font-medium text-gray-700 mb-1">Cargo</label>
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
                    <label className="block text-sm font-medium text-gray-700 mb-1">Local Asignado</label>
                    <select
                      required
                      value={newEmployee.location}
                      onChange={(e) => setNewEmployee({...newEmployee, location: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Seleccionar local</option>
                      {activeLocations.map(location => (
                        <option key={location.id} value={location.id}>{location.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Rol</label>
                    <select
                      value={newEmployee.role}
                      onChange={(e) => setNewEmployee({...newEmployee, role: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="cashier">Cajero</option>
                      <option value="supervisor">Supervisor</option>
                      <option value="driver">Repartidor</option>
                      <option value="admin">Administrador</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      required
                      value={newEmployee.email}
                      onChange={(e) => setNewEmployee({...newEmployee, email: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
                    <input
                      type="tel"
                      required
                      value={newEmployee.phone}
                      onChange={(e) => setNewEmployee({...newEmployee, phone: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

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
    </></div>
  );
};

export default ControlPanel;