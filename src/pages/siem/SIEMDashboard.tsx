import React, { useState } from 'react';
import { Shield, AlertTriangle, Eye, Activity, Lock, Wifi, Server, Database, Download, Filter, Calendar } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

const SIEMDashboard: React.FC = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState('24h');
  const [selectedTab, setSelectedTab] = useState<'overview' | 'threats' | 'logs' | 'compliance'>('overview');

  const securityMetrics = [
    { time: '00:00', threats: 12, blocked: 11, allowed: 1 },
    { time: '04:00', threats: 8, blocked: 7, allowed: 1 },
    { time: '08:00', threats: 25, blocked: 23, allowed: 2 },
    { time: '12:00', threats: 18, blocked: 16, allowed: 2 },
    { time: '16:00', threats: 32, blocked: 28, allowed: 4 },
    { time: '20:00', threats: 15, blocked: 14, allowed: 1 }
  ];

  const threatTypes = [
    { name: 'Malware', value: 35, color: '#EF4444' },
    { name: 'Phishing', value: 28, color: '#F59E0B' },
    { name: 'Brute Force', value: 20, color: '#8B5CF6' },
    { name: 'DDoS', value: 12, color: '#3B82F6' },
    { name: 'Otros', value: 5, color: '#6B7280' }
  ];

  const securityEvents = [
    {
      id: 'EVT-001',
      timestamp: '2024-01-20 14:32:15',
      type: 'threat',
      severity: 'high',
      source: '192.168.1.45',
      destination: 'server-01.elportal.local',
      description: 'Intento de acceso no autorizado detectado',
      status: 'blocked',
      rule: 'FIREWALL-001'
    },
    {
      id: 'EVT-002',
      timestamp: '2024-01-20 14:28:42',
      type: 'authentication',
      severity: 'medium',
      source: '10.0.0.15',
      destination: 'pos-system-01',
      description: 'Múltiples intentos de login fallidos',
      status: 'monitoring',
      rule: 'AUTH-002'
    },
    {
      id: 'EVT-003',
      timestamp: '2024-01-20 14:25:18',
      type: 'network',
      severity: 'low',
      source: '172.16.0.8',
      destination: 'backup-server',
      description: 'Tráfico inusual detectado en puerto 443',
      status: 'investigating',
      rule: 'NET-003'
    },
    {
      id: 'EVT-004',
      timestamp: '2024-01-20 14:20:55',
      type: 'malware',
      severity: 'critical',
      source: 'email-server',
      destination: 'workstation-05',
      description: 'Archivo malicioso detectado en email',
      status: 'quarantined',
      rule: 'AV-001'
    }
  ];

  const complianceStatus = [
    { framework: 'ISO 27001', status: 'compliant', score: 95, lastAudit: '2024-01-15' },
    { framework: 'GDPR', status: 'compliant', score: 88, lastAudit: '2024-01-10' },
    { framework: 'SOX', status: 'partial', score: 72, lastAudit: '2024-01-05' },
    { framework: 'PCI DSS', status: 'compliant', score: 91, lastAudit: '2024-01-12' }
  ];

  const systemHealth = [
    { system: 'Firewall Principal', status: 'healthy', uptime: 99.9, lastCheck: '2024-01-20 14:30' },
    { system: 'IDS/IPS', status: 'healthy', uptime: 99.7, lastCheck: '2024-01-20 14:30' },
    { system: 'Antivirus Central', status: 'warning', uptime: 98.2, lastCheck: '2024-01-20 14:29' },
    { system: 'SIEM Collector', status: 'healthy', uptime: 99.8, lastCheck: '2024-01-20 14:30' },
    { system: 'VPN Gateway', status: 'healthy', uptime: 99.5, lastCheck: '2024-01-20 14:30' }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'blocked': return 'bg-red-100 text-red-800';
      case 'quarantined': return 'bg-purple-100 text-purple-800';
      case 'monitoring': return 'bg-yellow-100 text-yellow-800';
      case 'investigating': return 'bg-blue-100 text-blue-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getComplianceColor = (status: string) => {
    switch (status) {
      case 'compliant': return 'text-green-600';
      case 'partial': return 'text-yellow-600';
      case 'non-compliant': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getHealthColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'text-green-600';
      case 'warning': return 'text-yellow-600';
      case 'critical': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const totalThreats = securityMetrics.reduce((sum, metric) => sum + metric.threats, 0);
  const blockedThreats = securityMetrics.reduce((sum, metric) => sum + metric.blocked, 0);
  const blockRate = ((blockedThreats / totalThreats) * 100).toFixed(1);
  const criticalEvents = securityEvents.filter(event => event.severity === 'critical').length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div className="flex items-center space-x-3">
          <Shield className="h-8 w-8 text-red-600" />
          <h2 className="text-2xl font-bold text-gray-900">SIEM Security Center</h2>
        </div>
        <div className="flex space-x-2 mt-4 sm:mt-0">
          <button
            onClick={() => setSelectedTab('overview')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedTab === 'overview'
                ? 'bg-red-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setSelectedTab('threats')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedTab === 'threats'
                ? 'bg-red-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Amenazas
          </button>
          <button
            onClick={() => setSelectedTab('logs')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedTab === 'logs'
                ? 'bg-red-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Logs
          </button>
          <button
            onClick={() => setSelectedTab('compliance')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedTab === 'compliance'
                ? 'bg-red-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Compliance
          </button>
        </div>
      </div>

      {/* Time Range Selector */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
        <div className="flex items-center space-x-4">
          <Calendar className="h-5 w-5 text-gray-400" />
          <span className="text-sm font-medium text-gray-700">Período de tiempo:</span>
          <select
            value={selectedTimeRange}
            onChange={(e) => setSelectedTimeRange(e.target.value)}
            className="px-3 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <option value="1h">Última hora</option>
            <option value="24h">Últimas 24 horas</option>
            <option value="7d">Últimos 7 días</option>
            <option value="30d">Últimos 30 días</option>
          </select>
          <button className="flex items-center space-x-2 bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition-colors">
            <Download className="h-4 w-4" />
            <span>Exportar Reporte</span>
          </button>
        </div>
      </div>

      {/* Security KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="p-2 rounded-lg bg-red-50">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Amenazas Detectadas</p>
              <p className="text-2xl font-bold text-red-600">{totalThreats}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="p-2 rounded-lg bg-green-50">
              <Shield className="h-6 w-6 text-green-600" />
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Amenazas Bloqueadas</p>
              <p className="text-2xl font-bold text-green-600">{blockedThreats}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="p-2 rounded-lg bg-blue-50">
              <Activity className="h-6 w-6 text-blue-600" />
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Tasa de Bloqueo</p>
              <p className="text-2xl font-bold text-blue-600">{blockRate}%</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="p-2 rounded-lg bg-orange-50">
              <Eye className="h-6 w-6 text-orange-600" />
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Eventos Críticos</p>
              <p className="text-2xl font-bold text-orange-600">{criticalEvents}</p>
            </div>
          </div>
        </div>
      </div>

      {selectedTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Security Timeline */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Actividad de Seguridad (24h)</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={securityMetrics}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="threats" stroke="#EF4444" strokeWidth={2} name="Amenazas" />
                <Line type="monotone" dataKey="blocked" stroke="#10B981" strokeWidth={2} name="Bloqueadas" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Threat Types */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Tipos de Amenazas</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={threatTypes}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {threatTypes.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value}%`} />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {threatTypes.map((item, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <div className="flex items-center">
                    <div className={`w-3 h-3 rounded-full mr-2`} style={{ backgroundColor: item.color }} />
                    <span className="text-gray-600">{item.name}</span>
                  </div>
                  <span className="font-medium">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* System Health */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Estado de Sistemas de Seguridad</h3>
            <div className="space-y-3">
              {systemHealth.map((system, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Server className="h-5 w-5 text-gray-400" />
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">{system.system}</h4>
                      <p className="text-xs text-gray-500">Última verificación: {system.lastCheck}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`text-sm font-medium ${getHealthColor(system.status)}`}>
                      {system.status === 'healthy' ? 'Saludable' :
                       system.status === 'warning' ? 'Advertencia' : 'Crítico'}
                    </span>
                    <p className="text-xs text-gray-500">{system.uptime}% uptime</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Events */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Eventos Recientes</h3>
            <div className="space-y-3">
              {securityEvents.slice(0, 5).map((event) => (
                <div key={event.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className={`p-1 rounded-full ${
                    event.severity === 'critical' ? 'bg-red-100' :
                    event.severity === 'high' ? 'bg-orange-100' :
                    event.severity === 'medium' ? 'bg-yellow-100' : 'bg-blue-100'
                  }`}>
                    <AlertTriangle className={`h-3 w-3 ${
                      event.severity === 'critical' ? 'text-red-600' :
                      event.severity === 'high' ? 'text-orange-600' :
                      event.severity === 'medium' ? 'text-yellow-600' : 'text-blue-600'
                    }`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{event.description}</p>
                    <p className="text-xs text-gray-500">{event.timestamp} • {event.source}</p>
                  </div>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(event.status)}`}>
                    {event.status === 'blocked' ? 'Bloqueado' :
                     event.status === 'quarantined' ? 'Cuarentena' :
                     event.status === 'monitoring' ? 'Monitoreando' :
                     event.status === 'investigating' ? 'Investigando' : 'Resuelto'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {selectedTab === 'threats' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">Análisis de Amenazas</h3>
                <div className="flex space-x-2">
                  <button className="flex items-center space-x-2 bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition-colors">
                    <Filter className="h-4 w-4" />
                    <span>Filtrar</span>
                  </button>
                </div>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timestamp</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Severidad</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Origen</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Destino</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Descripción</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {securityEvents.map((event) => (
                    <tr key={event.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {event.timestamp}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 capitalize">
                          {event.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getSeverityColor(event.severity)}`}>
                          {event.severity === 'critical' ? 'Crítico' :
                           event.severity === 'high' ? 'Alto' :
                           event.severity === 'medium' ? 'Medio' : 'Bajo'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-mono">
                        {event.source}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-mono">
                        {event.destination}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {event.description}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(event.status)}`}>
                          {event.status === 'blocked' ? 'Bloqueado' :
                           event.status === 'quarantined' ? 'Cuarentena' :
                           event.status === 'monitoring' ? 'Monitoreando' :
                           event.status === 'investigating' ? 'Investigando' : 'Resuelto'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {selectedTab === 'logs' && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Logs del Sistema</h3>
          <div className="bg-black rounded-lg p-4 font-mono text-sm text-green-400 h-96 overflow-y-auto">
            <div className="space-y-1">
              <div>[2024-01-20 14:32:15] INFO: Firewall rule FIREWALL-001 triggered - Source: 192.168.1.45</div>
              <div>[2024-01-20 14:32:14] WARN: Multiple failed login attempts detected from 10.0.0.15</div>
              <div>[2024-01-20 14:32:12] ERROR: Malicious file detected in email attachment - Quarantined</div>
              <div>[2024-01-20 14:32:10] INFO: IDS signature updated - Version 2024.01.20.001</div>
              <div>[2024-01-20 14:32:08] INFO: VPN connection established - User: admin@elportal.cl</div>
              <div>[2024-01-20 14:32:05] WARN: Unusual network traffic detected on port 443</div>
              <div>[2024-01-20 14:32:03] INFO: Antivirus scan completed - 0 threats found</div>
              <div>[2024-01-20 14:32:01] INFO: System backup completed successfully</div>
              <div>[2024-01-20 14:31:58] WARN: High CPU usage detected on server-01</div>
              <div>[2024-01-20 14:31:55] INFO: User authentication successful - maria.gonzalez@elportal.cl</div>
              <div>[2024-01-20 14:31:52] ERROR: Failed to connect to external threat intelligence feed</div>
              <div>[2024-01-20 14:31:50] INFO: Firewall policy updated - Policy ID: POL-001</div>
              <div>[2024-01-20 14:31:48] WARN: Certificate expiring in 30 days - server-01.elportal.local</div>
              <div>[2024-01-20 14:31:45] INFO: SIEM correlation engine started</div>
              <div>[2024-01-20 14:31:42] INFO: Network scan completed - 15 devices discovered</div>
            </div>
          </div>
        </div>
      )}

      {selectedTab === 'compliance' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {complianceStatus.map((compliance, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                <div className="flex justify-between items-start mb-4">
                  <h4 className="text-lg font-semibold text-gray-900">{compliance.framework}</h4>
                  <span className={`text-sm font-medium ${getComplianceColor(compliance.status)}`}>
                    {compliance.status === 'compliant' ? 'Cumple' :
                     compliance.status === 'partial' ? 'Parcial' : 'No Cumple'}
                  </span>
                </div>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Puntuación de Cumplimiento</span>
                      <span className="font-medium">{compliance.score}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          compliance.score >= 90 ? 'bg-green-600' :
                          compliance.score >= 70 ? 'bg-yellow-600' : 'bg-red-600'
                        }`}
                        style={{ width: `${compliance.score}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500">
                    Última auditoría: {compliance.lastAudit}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recomendaciones de Cumplimiento</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium text-yellow-800">SOX - Mejora Requerida</h4>
                  <p className="text-sm text-yellow-700 mt-1">
                    Se requiere implementar controles adicionales de acceso a datos financieros para alcanzar el 100% de cumplimiento.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <Eye className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium text-blue-800">GDPR - Monitoreo Continuo</h4>
                  <p className="text-sm text-blue-700 mt-1">
                    Mantener el registro de actividades de procesamiento actualizado y realizar auditorías trimestrales.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-4 bg-green-50 rounded-lg border border-green-200">
                <Shield className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium text-green-800">ISO 27001 - Excelente</h4>
                  <p className="text-sm text-green-700 mt-1">
                    El sistema de gestión de seguridad de la información cumple con todos los requisitos. Continuar con las mejores prácticas.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SIEMDashboard;