import React, { useState } from 'react';
import { Package, Plus, Calendar, DollarSign, MapPin, AlertTriangle, CheckCircle, CreditCard as Edit, Trash2, Wrench } from 'lucide-react';

const AssetManagement: React.FC = () => {
  const [assets, setAssets] = useState([
    {
      id: 'AST-001',
      name: 'Camión de Reparto Mercedes',
      category: 'Vehículos',
      location: 'LOC-001',
      purchaseDate: '2022-03-15',
      purchaseValue: 45000000,
      currentValue: 38000000,
      condition: 'good',
      status: 'active',
      maintenanceDate: '2024-01-15',
      nextMaintenance: '2024-04-15',
      warranty: '2025-03-15',
      supplier: 'Mercedes-Benz Chile',
      serialNumber: 'MB2022-001',
      description: 'Camión de reparto para distribución urbana'
    },
    {
      id: 'AST-002',
      name: 'Sistema POS Principal',
      category: 'Equipos Tecnológicos',
      location: 'LOC-001',
      purchaseDate: '2023-06-10',
      purchaseValue: 850000,
      currentValue: 680000,
      condition: 'excellent',
      status: 'active',
      maintenanceDate: '2024-01-10',
      nextMaintenance: '2024-07-10',
      warranty: '2026-06-10',
      supplier: 'TechSolutions',
      serialNumber: 'POS-2023-001',
      description: 'Sistema punto de venta con impresora térmica'
    },
    {
      id: 'AST-003',
      name: 'Estantería Metálica Bodega',
      category: 'Mobiliario',
      location: 'LOC-001',
      purchaseDate: '2021-11-20',
      purchaseValue: 1200000,
      currentValue: 800000,
      condition: 'good',
      status: 'active',
      maintenanceDate: '2023-11-20',
      nextMaintenance: '2024-11-20',
      warranty: 'expired',
      supplier: 'MetalWorks',
      serialNumber: 'MW-EST-001',
      description: 'Estantería industrial para almacenamiento'
    },
    {
      id: 'AST-004',
      name: 'Aire Acondicionado Split',
      category: 'Equipos HVAC',
      location: 'LOC-002',
      purchaseDate: '2023-02-28',
      purchaseValue: 650000,
      currentValue: 520000,
      condition: 'fair',
      status: 'maintenance',
      maintenanceDate: '2024-01-20',
      nextMaintenance: '2024-02-20',
      warranty: '2026-02-28',
      supplier: 'ClimaTech',
      serialNumber: 'CT-AC-002',
      description: 'Sistema de climatización para sucursal norte'
    }
  ]);

  const [maintenanceRecords, setMaintenanceRecords] = useState([
    {
      id: 'MAINT-001',
      assetId: 'AST-001',
      assetName: 'Camión de Reparto Mercedes',
      date: '2024-01-15',
      type: 'preventive',
      description: 'Cambio de aceite y filtros',
      cost: 85000,
      technician: 'Taller Mercedes Punta Arenas',
      status: 'completed'
    },
    {
      id: 'MAINT-002',
      assetId: 'AST-004',
      assetName: 'Aire Acondicionado Split',
      date: '2024-01-20',
      type: 'corrective',
      description: 'Reparación de compresor',
      cost: 120000,
      technician: 'ClimaTech Service',
      status: 'in-progress'
    }
  ]);

  const [showAssetForm, setShowAssetForm] = useState(false);
  const [showMaintenanceForm, setShowMaintenanceForm] = useState(false);
  const [selectedTab, setSelectedTab] = useState<'assets' | 'maintenance'>('assets');

  const [newAsset, setNewAsset] = useState({
    name: '',
    category: '',
    location: '',
    purchaseDate: '',
    purchaseValue: 0,
    condition: 'excellent',
    supplier: '',
    serialNumber: '',
    description: ''
  });

  const [newMaintenance, setNewMaintenance] = useState({
    assetId: '',
    type: 'preventive',
    description: '',
    cost: 0,
    technician: ''
  });

  const categories = [
    'Vehículos',
    'Equipos Tecnológicos',
    'Mobiliario',
    'Equipos HVAC',
    'Maquinaria',
    'Herramientas',
    'Otros'
  ];

  const locations = [
    { id: 'LOC-001', name: 'Local Principal' },
    { id: 'LOC-002', name: 'Sucursal Norte' }
  ];

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case 'excellent': return 'bg-green-100 text-green-800';
      case 'good': return 'bg-blue-100 text-blue-800';
      case 'fair': return 'bg-yellow-100 text-yellow-800';
      case 'poor': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'maintenance': return 'bg-yellow-100 text-yellow-800';
      case 'retired': return 'bg-red-100 text-red-800';
      case 'disposed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleAddAsset = (e: React.FormEvent) => {
    e.preventDefault();
    const id = `AST-${String(assets.length + 1).padStart(3, '0')}`;
    setAssets([...assets, {
      ...newAsset,
      id,
      currentValue: newAsset.purchaseValue,
      status: 'active',
      maintenanceDate: '',
      nextMaintenance: '',
      warranty: ''
    }]);
    setNewAsset({
      name: '',
      category: '',
      location: '',
      purchaseDate: '',
      purchaseValue: 0,
      condition: 'excellent',
      supplier: '',
      serialNumber: '',
      description: ''
    });
    setShowAssetForm(false);
  };

  const handleAddMaintenance = (e: React.FormEvent) => {
    e.preventDefault();
    const id = `MAINT-${String(maintenanceRecords.length + 1).padStart(3, '0')}`;
    const asset = assets.find(a => a.id === newMaintenance.assetId);
    setMaintenanceRecords([...maintenanceRecords, {
      ...newMaintenance,
      id,
      assetName: asset?.name || '',
      date: new Date().toISOString().split('T')[0],
      status: 'completed'
    }]);
    setNewMaintenance({
      assetId: '',
      type: 'preventive',
      description: '',
      cost: 0,
      technician: ''
    });
    setShowMaintenanceForm(false);
  };

  const totalAssets = assets.length;
  const totalValue = assets.reduce((sum, asset) => sum + asset.currentValue, 0);
  const activeAssets = assets.filter(asset => asset.status === 'active').length;
  const maintenanceNeeded = assets.filter(asset => {
    const nextMaintenance = new Date(asset.nextMaintenance);
    const today = new Date();
    return nextMaintenance <= today;
  }).length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <h2 className="text-2xl font-bold text-gray-900">Gestión de Activos Fijos</h2>
        <div className="flex space-x-2 mt-4 sm:mt-0">
          <button
            onClick={() => setSelectedTab('assets')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedTab === 'assets'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Activos
          </button>
          <button
            onClick={() => setSelectedTab('maintenance')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedTab === 'maintenance'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Mantenimiento
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="p-2 rounded-lg bg-blue-50">
              <Package className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-500">Total Activos</h3>
            <p className="text-2xl font-bold text-blue-600 mt-1">{totalAssets}</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="p-2 rounded-lg bg-green-50">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-500">Valor Total</h3>
            <p className="text-2xl font-bold text-green-600 mt-1">CLP ${totalValue.toLocaleString()}</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="p-2 rounded-lg bg-purple-50">
              <CheckCircle className="h-6 w-6 text-purple-600" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-500">Activos Activos</h3>
            <p className="text-2xl font-bold text-purple-600 mt-1">{activeAssets}</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="p-2 rounded-lg bg-orange-50">
              <AlertTriangle className="h-6 w-6 text-orange-600" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-500">Mantenimiento Pendiente</h3>
            <p className="text-2xl font-bold text-orange-600 mt-1">{maintenanceNeeded}</p>
          </div>
        </div>
      </div>

      {selectedTab === 'assets' && (
        <>
          <div className="flex justify-end">
            <button
              onClick={() => setShowAssetForm(true)}
              className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="h-5 w-5" />
              <span>Nuevo Activo</span>
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Registro de Activos</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Activo</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Categoría</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ubicación</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Valor Actual</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Condición</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Próximo Mantenimiento</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {assets.map((asset) => (
                    <tr key={asset.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Package className="h-5 w-5 text-gray-400 mr-3" />
                          <div>
                            <div className="text-sm font-medium text-gray-900">{asset.name}</div>
                            <div className="text-sm text-gray-500">{asset.serialNumber}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {asset.category}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center text-sm text-gray-500">
                          <MapPin className="h-4 w-4 mr-1" />
                          {locations.find(loc => loc.id === asset.location)?.name || 'Sin asignar'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                        CLP ${asset.currentValue.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getConditionColor(asset.condition)}`}>
                          {asset.condition === 'excellent' ? 'Excelente' :
                           asset.condition === 'good' ? 'Bueno' :
                           asset.condition === 'fair' ? 'Regular' : 'Malo'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(asset.status)}`}>
                          {asset.status === 'active' ? 'Activo' :
                           asset.status === 'maintenance' ? 'Mantenimiento' :
                           asset.status === 'retired' ? 'Retirado' : 'Desechado'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {asset.nextMaintenance || 'No programado'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          <button className="text-blue-600 hover:text-blue-900">
                            <Edit className="h-4 w-4" />
                          </button>
                          <button className="text-green-600 hover:text-green-900">
                            <Wrench className="h-4 w-4" />
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

      {selectedTab === 'maintenance' && (
        <>
          <div className="flex justify-end">
            <button
              onClick={() => setShowMaintenanceForm(true)}
              className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              <Plus className="h-5 w-5" />
              <span>Nuevo Mantenimiento</span>
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Historial de Mantenimiento</h3>
            </div>
            <div className="divide-y divide-gray-200">
              {maintenanceRecords.map((record) => (
                <div key={record.id} className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="font-medium text-gray-900">{record.assetName}</h4>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          record.type === 'preventive' ? 'bg-blue-100 text-blue-800' : 'bg-orange-100 text-orange-800'
                        }`}>
                          {record.type === 'preventive' ? 'Preventivo' : 'Correctivo'}
                        </span>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          record.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {record.status === 'completed' ? 'Completado' : 'En Progreso'}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{record.description}</p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-500">
                        <div>
                          <span className="font-medium">Fecha:</span> {record.date}
                        </div>
                        <div>
                          <span className="font-medium">Costo:</span> CLP ${record.cost.toLocaleString()}
                        </div>
                        <div>
                          <span className="font-medium">Técnico:</span> {record.technician}
                        </div>
                        <div>
                          <span className="font-medium">ID:</span> {record.id}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Add Asset Form Modal */}
      {showAssetForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-full max-w-2xl shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Nuevo Activo</h3>
              <form onSubmit={handleAddAsset} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nombre del Activo</label>
                    <input
                      type="text"
                      required
                      value={newAsset.name}
                      onChange={(e) => setNewAsset({...newAsset, name: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Categoría</label>
                    <select
                      required
                      value={newAsset.category}
                      onChange={(e) => setNewAsset({...newAsset, category: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Seleccionar categoría</option>
                      {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Ubicación</label>
                    <select
                      required
                      value={newAsset.location}
                      onChange={(e) => setNewAsset({...newAsset, location: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Seleccionar ubicación</option>
                      {locations.map(location => (
                        <option key={location.id} value={location.id}>{location.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de Compra</label>
                    <input
                      type="date"
                      required
                      value={newAsset.purchaseDate}
                      onChange={(e) => setNewAsset({...newAsset, purchaseDate: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Valor de Compra (CLP)</label>
                    <input
                      type="number"
                      required
                      min="0"
                      value={newAsset.purchaseValue}
                      onChange={(e) => setNewAsset({...newAsset, purchaseValue: parseInt(e.target.value) || 0})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Condición</label>
                    <select
                      value={newAsset.condition}
                      onChange={(e) => setNewAsset({...newAsset, condition: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="excellent">Excelente</option>
                      <option value="good">Bueno</option>
                      <option value="fair">Regular</option>
                      <option value="poor">Malo</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Proveedor</label>
                    <input
                      type="text"
                      required
                      value={newAsset.supplier}
                      onChange={(e) => setNewAsset({...newAsset, supplier: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Número de Serie</label>
                    <input
                      type="text"
                      required
                      value={newAsset.serialNumber}
                      onChange={(e) => setNewAsset({...newAsset, serialNumber: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                  <textarea
                    required
                    value={newAsset.description}
                    onChange={(e) => setNewAsset({...newAsset, description: e.target.value})}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="flex space-x-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Agregar Activo
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAssetForm(false)}
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

      {/* Add Maintenance Form Modal */}
      {showMaintenanceForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-full max-w-2xl shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Nuevo Mantenimiento</h3>
              <form onSubmit={handleAddMaintenance} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Activo</label>
                  <select
                    required
                    value={newMaintenance.assetId}
                    onChange={(e) => setNewMaintenance({...newMaintenance, assetId: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Seleccionar activo</option>
                    {assets.map(asset => (
                      <option key={asset.id} value={asset.id}>{asset.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Mantenimiento</label>
                  <select
                    value={newMaintenance.type}
                    onChange={(e) => setNewMaintenance({...newMaintenance, type: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="preventive">Preventivo</option>
                    <option value="corrective">Correctivo</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                  <textarea
                    required
                    value={newMaintenance.description}
                    onChange={(e) => setNewMaintenance({...newMaintenance, description: e.target.value})}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Costo (CLP)</label>
                    <input
                      type="number"
                      required
                      min="0"
                      value={newMaintenance.cost}
                      onChange={(e) => setNewMaintenance({...newMaintenance, cost: parseInt(e.target.value) || 0})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Técnico/Proveedor</label>
                    <input
                      type="text"
                      required
                      value={newMaintenance.technician}
                      onChange={(e) => setNewMaintenance({...newMaintenance, technician: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="flex space-x-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors"
                  >
                    Registrar Mantenimiento
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowMaintenanceForm(false)}
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

export default AssetManagement;