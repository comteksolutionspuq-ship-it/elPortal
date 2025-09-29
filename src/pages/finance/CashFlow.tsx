import React, { useState } from 'react';
import { TrendingUp, TrendingDown, DollarSign, Calendar, Download, Plus, ArrowUpCircle, ArrowDownCircle } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const CashFlow: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [showForm, setShowForm] = useState(false);

  const cashFlowData = [
    { period: 'Ene', inflows: 2850000, outflows: 2100000, netFlow: 750000, balance: 5750000 },
    { period: 'Feb', inflows: 3200000, outflows: 2350000, netFlow: 850000, balance: 6600000 },
    { period: 'Mar', inflows: 2980000, outflows: 2200000, netFlow: 780000, balance: 7380000 },
    { period: 'Abr', inflows: 3450000, outflows: 2500000, netFlow: 950000, balance: 8330000 },
    { period: 'May', inflows: 3650000, outflows: 2650000, netFlow: 1000000, balance: 9330000 },
    { period: 'Jun', inflows: 3800000, outflows: 2750000, netFlow: 1050000, balance: 10380000 }
  ];

  const transactions = [
    {
      id: 'CF-001',
      date: '2024-01-20',
      type: 'inflow',
      category: 'Ventas',
      description: 'Pago Restaurant La Patagonia',
      amount: 89500,
      account: 'Cuenta Corriente Principal',
      reference: 'INV-001'
    },
    {
      id: 'CF-002',
      date: '2024-01-20',
      type: 'outflow',
      category: 'Compras',
      description: 'Pago a EcoSupply Chile',
      amount: -45000,
      account: 'Cuenta Corriente Principal',
      reference: 'PO-001'
    },
    {
      id: 'CF-003',
      date: '2024-01-19',
      type: 'inflow',
      category: 'Ventas',
      description: 'Pago Café Central',
      amount: 45200,
      account: 'Cuenta Corriente Principal',
      reference: 'INV-002'
    },
    {
      id: 'CF-004',
      date: '2024-01-19',
      type: 'outflow',
      category: 'Gastos Operacionales',
      description: 'Combustible vehículos',
      amount: -25000,
      account: 'Cuenta Corriente Principal',
      reference: 'EXPENSE-001'
    }
  ];

  const [newTransaction, setNewTransaction] = useState({
    type: 'inflow',
    category: '',
    description: '',
    amount: 0,
    account: 'Cuenta Corriente Principal',
    reference: ''
  });

  const categories = {
    inflow: ['Ventas', 'Cobros', 'Inversiones', 'Préstamos', 'Otros Ingresos'],
    outflow: ['Compras', 'Gastos Operacionales', 'Sueldos', 'Servicios', 'Impuestos', 'Otros Gastos']
  };

  const accounts = [
    'Cuenta Corriente Principal',
    'Cuenta de Ahorros',
    'Caja Chica',
    'Cuenta USD'
  ];

  const handleAddTransaction = (e: React.FormEvent) => {
    e.preventDefault();
    const id = `CF-${String(transactions.length + 1).padStart(3, '0')}`;
    const amount = newTransaction.type === 'outflow' ? -Math.abs(newTransaction.amount) : Math.abs(newTransaction.amount);
    
    // Aquí se agregaría la transacción real
    alert(`Transacción ${id} agregada: CLP $${Math.abs(amount).toLocaleString()}`);
    
    setNewTransaction({
      type: 'inflow',
      category: '',
      description: '',
      amount: 0,
      account: 'Cuenta Corriente Principal',
      reference: ''
    });
    setShowForm(false);
  };

  const totalInflows = cashFlowData.reduce((sum, item) => sum + item.inflows, 0);
  const totalOutflows = cashFlowData.reduce((sum, item) => sum + Math.abs(item.outflows), 0);
  const netCashFlow = totalInflows - totalOutflows;
  const currentBalance = cashFlowData[cashFlowData.length - 1].balance;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <h2 className="text-2xl font-bold text-gray-900">Flujo de Caja</h2>
        <div className="flex space-x-3 mt-4 sm:mt-0">
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="h-5 w-5" />
            <span>Nueva Transacción</span>
          </button>
          <button className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
            <Download className="h-5 w-5" />
            <span>Exportar</span>
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="p-2 rounded-lg bg-green-50">
              <ArrowUpCircle className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-500">Ingresos Totales</h3>
            <p className="text-2xl font-bold text-green-600 mt-1">CLP ${totalInflows.toLocaleString()}</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="p-2 rounded-lg bg-red-50">
              <ArrowDownCircle className="h-6 w-6 text-red-600" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-500">Egresos Totales</h3>
            <p className="text-2xl font-bold text-red-600 mt-1">CLP ${totalOutflows.toLocaleString()}</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="p-2 rounded-lg bg-blue-50">
              <TrendingUp className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-500">Flujo Neto</h3>
            <p className={`text-2xl font-bold mt-1 ${netCashFlow >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              CLP ${netCashFlow.toLocaleString()}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="p-2 rounded-lg bg-purple-50">
              <DollarSign className="h-6 w-6 text-purple-600" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-500">Saldo Actual</h3>
            <p className="text-2xl font-bold text-purple-600 mt-1">CLP ${currentBalance.toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* Cash Flow Chart */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Flujo de Caja Mensual</h3>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={cashFlowData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="period" />
            <YAxis />
            <Tooltip formatter={(value) => `CLP $${value.toLocaleString()}`} />
            <Line type="monotone" dataKey="inflows" stroke="#10B981" strokeWidth={3} name="Ingresos" />
            <Line type="monotone" dataKey="outflows" stroke="#EF4444" strokeWidth={3} name="Egresos" />
            <Line type="monotone" dataKey="balance" stroke="#3B82F6" strokeWidth={3} name="Saldo" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Transacciones Recientes</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Categoría</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Descripción</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cuenta</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Monto</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {transactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {transaction.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {transaction.type === 'inflow' ? (
                        <ArrowUpCircle className="h-4 w-4 text-green-600 mr-2" />
                      ) : (
                        <ArrowDownCircle className="h-4 w-4 text-red-600 mr-2" />
                      )}
                      <span className="text-sm text-gray-900">
                        {transaction.type === 'inflow' ? 'Ingreso' : 'Egreso'}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {transaction.category}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {transaction.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {transaction.account}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <span className={transaction.amount >= 0 ? 'text-green-600' : 'text-red-600'}>
                      CLP ${Math.abs(transaction.amount).toLocaleString()}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Transaction Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-full max-w-2xl shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Nueva Transacción</h3>
              <form onSubmit={handleAddTransaction} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
                    <select
                      value={newTransaction.type}
                      onChange={(e) => setNewTransaction({...newTransaction, type: e.target.value, category: ''})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="inflow">Ingreso</option>
                      <option value="outflow">Egreso</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Categoría</label>
                    <select
                      required
                      value={newTransaction.category}
                      onChange={(e) => setNewTransaction({...newTransaction, category: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Seleccionar categoría</option>
                      {categories[newTransaction.type as keyof typeof categories].map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                  <input
                    type="text"
                    required
                    value={newTransaction.description}
                    onChange={(e) => setNewTransaction({...newTransaction, description: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Monto (CLP)</label>
                    <input
                      type="number"
                      required
                      min="0"
                      value={newTransaction.amount}
                      onChange={(e) => setNewTransaction({...newTransaction, amount: parseInt(e.target.value) || 0})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Cuenta</label>
                    <select
                      value={newTransaction.account}
                      onChange={(e) => setNewTransaction({...newTransaction, account: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {accounts.map(account => (
                        <option key={account} value={account}>{account}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Referencia</label>
                  <input
                    type="text"
                    value={newTransaction.reference}
                    onChange={(e) => setNewTransaction({...newTransaction, reference: e.target.value})}
                    placeholder="Ej: INV-001, PO-002"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="flex space-x-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Agregar Transacción
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

export default CashFlow;