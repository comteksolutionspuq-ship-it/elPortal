import React, { useState } from 'react';
import { Users, DollarSign, Calendar, Download, Plus, CreditCard as Edit, Trash2, Calculator } from 'lucide-react';

const PayrollManagement: React.FC = () => {
  const [employees] = useState([
    {
      id: 'EMP-001',
      name: 'María González',
      position: 'Cajera',
      location: 'LOC-001',
      baseSalary: 450000,
      bonuses: 25000,
      deductions: 15000,
      hoursWorked: 180,
      overtimeHours: 8,
      status: 'active'
    },
    {
      id: 'EMP-002',
      name: 'Carlos Mendoza',
      position: 'Supervisor de Bodega',
      location: 'LOC-001',
      baseSalary: 650000,
      bonuses: 45000,
      deductions: 22000,
      hoursWorked: 180,
      overtimeHours: 12,
      status: 'active'
    },
    {
      id: 'EMP-003',
      name: 'Ana Pérez',
      position: 'Repartidora',
      location: 'LOC-002',
      baseSalary: 520000,
      bonuses: 30000,
      deductions: 18000,
      hoursWorked: 175,
      overtimeHours: 5,
      status: 'active'
    },
    {
      id: 'EMP-004',
      name: 'Roberto Silva',
      position: 'Gerente General',
      location: 'LOC-001',
      baseSalary: 1200000,
      bonuses: 150000,
      deductions: 45000,
      hoursWorked: 180,
      overtimeHours: 20,
      status: 'active'
    }
  ]);

  const [payrollPeriod, setPayrollPeriod] = useState('2024-01');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [showBonusForm, setShowBonusForm] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<string>('');
  const [bonusAmount, setBonusAmount] = useState<number>(0);
  const [bonusReason, setBonusReason] = useState<string>('');

  const locations = [
    { id: 'all', name: 'Todos los locales' },
    { id: 'LOC-001', name: 'Local Principal' },
    { id: 'LOC-002', name: 'Sucursal Norte' }
  ];

  const filteredEmployees = employees.filter(employee => {
    return selectedLocation === 'all' || employee.location === selectedLocation;
  });

  const calculateNetSalary = (employee: any) => {
    const overtimePay = (employee.baseSalary / 180) * employee.overtimeHours * 1.5; // 50% extra por hora extra
    const grossSalary = employee.baseSalary + employee.bonuses + overtimePay;
    const netSalary = grossSalary - employee.deductions;
    return { grossSalary, netSalary, overtimePay };
  };

  const totalPayroll = filteredEmployees.reduce((sum, employee) => {
    const { netSalary } = calculateNetSalary(employee);
    return sum + netSalary;
  }, 0);

  const totalBonuses = filteredEmployees.reduce((sum, employee) => sum + employee.bonuses, 0);
  const totalDeductions = filteredEmployees.reduce((sum, employee) => sum + employee.deductions, 0);
  const totalOvertime = filteredEmployees.reduce((sum, employee) => {
    const { overtimePay } = calculateNetSalary(employee);
    return sum + overtimePay;
  }, 0);

  const handleAddBonus = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí se agregaría la lógica para agregar el bono
    alert(`Bono de CLP $${bonusAmount.toLocaleString()} agregado a ${selectedEmployee} por: ${bonusReason}`);
    setShowBonusForm(false);
    setSelectedEmployee('');
    setBonusAmount(0);
    setBonusReason('');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <h2 className="text-2xl font-bold text-gray-900">Gestión de Sueldos</h2>
        <div className="flex space-x-3 mt-4 sm:mt-0">
          <button
            onClick={() => setShowBonusForm(true)}
            className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            <Plus className="h-5 w-5" />
            <span>Agregar Bono</span>
          </button>
          <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            <Download className="h-5 w-5" />
            <span>Exportar Nómina</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Período</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="month"
                value={payrollPeriod}
                onChange={(e) => setPayrollPeriod(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Local</label>
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {locations.map(location => (
                <option key={location.id} value={location.id}>{location.name}</option>
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
            <h3 className="text-sm font-medium text-gray-500">Empleados</h3>
            <p className="text-2xl font-bold text-gray-900 mt-1">{filteredEmployees.length}</p>
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
            <div className="p-2 rounded-lg bg-yellow-50">
              <Plus className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-500">Bonos Totales</h3>
            <p className="text-2xl font-bold text-yellow-600 mt-1">CLP ${totalBonuses.toLocaleString()}</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="p-2 rounded-lg bg-purple-50">
              <Calculator className="h-6 w-6 text-purple-600" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-500">Horas Extra</h3>
            <p className="text-2xl font-bold text-purple-600 mt-1">CLP ${totalOvertime.toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* Payroll Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Detalle de Nómina - {payrollPeriod}</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Empleado</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Local</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sueldo Base</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Horas Extra</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bonos</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Descuentos</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sueldo Bruto</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sueldo Líquido</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredEmployees.map((employee) => {
                const { grossSalary, netSalary, overtimePay } = calculateNetSalary(employee);
                return (
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
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {locations.find(loc => loc.id === employee.location)?.name || 'Sin asignar'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      CLP ${employee.baseSalary.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {employee.overtimeHours}h
                      </div>
                      <div className="text-sm text-gray-500">
                        CLP ${overtimePay.toLocaleString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                      CLP ${employee.bonuses.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-red-600">
                      CLP ${employee.deductions.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                      CLP ${grossSalary.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                      CLP ${netSalary.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button className="text-blue-600 hover:text-blue-900">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button className="text-green-600 hover:text-green-900">
                          <Download className="h-4 w-4" />
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

      {/* Payroll Summary */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Resumen de Nómina</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Sueldos Base:</span>
              <span className="font-medium">CLP ${filteredEmployees.reduce((sum, emp) => sum + emp.baseSalary, 0).toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Horas Extra:</span>
              <span className="font-medium text-purple-600">CLP ${totalOvertime.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Bonos:</span>
              <span className="font-medium text-green-600">CLP ${totalBonuses.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Descuentos:</span>
              <span className="font-medium text-red-600">-CLP ${totalDeductions.toLocaleString()}</span>
            </div>
            <hr className="my-3" />
            <div className="flex justify-between font-bold text-lg">
              <span className="text-gray-900">Total Nómina:</span>
              <span className="text-blue-600">CLP ${totalPayroll.toLocaleString()}</span>
            </div>
          </div>
          
          <div className="space-y-3">
            <h4 className="font-medium text-gray-900">Distribución por Local</h4>
            {locations.slice(1).map(location => {
              const locationEmployees = employees.filter(emp => emp.location === location.id);
              const locationTotal = locationEmployees.reduce((sum, emp) => {
                const { netSalary } = calculateNetSalary(emp);
                return sum + netSalary;
              }, 0);
              return (
                <div key={location.id} className="flex justify-between">
                  <span className="text-gray-600">{location.name}:</span>
                  <span className="font-medium">CLP ${locationTotal.toLocaleString()}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Add Bonus Form Modal */}
      {showBonusForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-full max-w-md shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Agregar Bono</h3>
              <form onSubmit={handleAddBonus} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Empleado</label>
                  <select
                    required
                    value={selectedEmployee}
                    onChange={(e) => setSelectedEmployee(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Seleccionar empleado</option>
                    {filteredEmployees.map(employee => (
                      <option key={employee.id} value={employee.name}>{employee.name}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Monto del Bono (CLP)</label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={bonusAmount}
                    onChange={(e) => setBonusAmount(parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Motivo del Bono</label>
                  <textarea
                    required
                    value={bonusReason}
                    onChange={(e) => setBonusReason(e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Ej: Bono por desempeño excepcional"
                  />
                </div>

                <div className="flex space-x-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors"
                  >
                    Agregar Bono
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowBonusForm(false)}
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

export default PayrollManagement;