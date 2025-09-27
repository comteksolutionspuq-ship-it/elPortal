import React, { useState } from 'react';
import { Shield, AlertTriangle, Eye, Activity, Lock, Globe, Server, Database, Download, Filter, Calendar, Code, Bug, UserX } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

const SIEMDashboard: React.FC = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState('24h');
  const [selectedTab, setSelectedTab] = useState<'overview' | 'threats' | 'logs' | 'compliance'>('overview');
  const [selectedTenant, setSelectedTenant] = useState('tenant-001');

  const tenants = [
    { id: 'tenant-001', name: 'Distribuidora El Portal', domain: 'elportal.cl' },
    { id: 'tenant-002', name: 'EcoSupply Chile', domain: 'ecosupply.cl' },
    { id: 'tenant-003', name: 'Restaurant La Patagonia', domain: 'lapatagonia.cl' }
  ];

  const webSecurityMetrics = [
    { time: '00:00', xss: 3, sqlInjection: 2, htmlInjection: 1, csrf: 1, blocked: 6, allowed: 1 },
    { time: '04:00', xss: 1, sqlInjection: 1, htmlInjection: 0, csrf: 0, blocked: 2, allowed: 0 },
    { time: '08:00', xss: 8, sqlInjection: 5, htmlInjection: 3, csrf: 2, blocked: 16, allowed: 2 },
    { time: '12:00', xss: 6, sqlInjection: 3, htmlInjection: 2, csrf: 1, blocked: 11, allowed: 1 },
    { time: '16:00', xss: 12, sqlInjection: 8, htmlInjection: 4, csrf: 3, blocked: 24, allowed: 3 },
    { time: '20:00', xss: 4, sqlInjection: 2, htmlInjection: 1, csrf: 1, blocked: 7, allowed: 1 }
  ];

  const threatTypes = [
    { name: 'XSS Attacks', value: 34, color: '#EF4444' },
    { name: 'SQL Injection', value: 21, color: '#F59E0B' },
    { name: 'HTML Injection', value: 11, color: '#8B5CF6' },
    { name: 'CSRF', value: 8, color: '#3B82F6' },
    { name: 'Brute Force Login', value: 15, color: '#10B981' },
    { name: 'Unauthorized Access', value: 11, color: '#6B7280' }
  ];

  const securityEvents = [
    {
      id: 'WEB-001',
      timestamp: '2024-01-20 14:32:15',
      type: 'xss',
      severity: 'high',
      sourceIP: '192.168.1.45',
      targetURL: '/admin/users',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      description: 'Intento de XSS en formulario de usuarios',
      status: 'blocked',
      rule: 'WAF-XSS-001',
      tenant: 'tenant-001'
    },
    {
      id: 'WEB-002',
      timestamp: '2024-01-20 14:28:42',
      type: 'sql-injection',
      severity: 'critical',
      sourceIP: '10.0.0.15',
      targetURL: '/api/products?id=1\' OR 1=1--',
      userAgent: 'curl/7.68.0',
      description: 'Intento de SQL Injection en API de productos',
      status: 'blocked',
      rule: 'WAF-SQL-002',
      tenant: 'tenant-001'
    },
    {
      id: 'WEB-003',
      timestamp: '2024-01-20 14:25:18',
      type: 'brute-force',
      severity: 'medium',
      sourceIP: '172.16.0.8',
      targetURL: '/login',
      userAgent: 'Python-requests/2.28.1',
      description: 'Múltiples intentos de login desde misma IP',
      status: 'monitoring',
      rule: 'AUTH-BF-001',
      tenant: 'tenant-001'
    },
    {
      id: 'WEB-004',
      timestamp: '2024-01-20 14:20:55',
      type: 'unauthorized-access',
      severity: 'high',
      sourceIP: '203.0.113.45',
      targetURL: '/admin/config',
      userAgent: 'Mozilla/5.0 (compatible; Googlebot/2.1)',
      description: 'Acceso no autorizado a panel administrativo',
      status: 'blocked',
      rule: 'ACCESS-001',
      tenant: 'tenant-001'
    },
    {
      id: 'WEB-005',
      timestamp: '2024-01-20 14:18:33',
      type: 'html-injection',
      severity: 'medium',
      sourceIP: '198.51.100.23',
      targetURL: '/contact/submit',
      userAgent: 'Mozilla/5.0 (X11; Linux x86_64)',
      description: 'Intento de inyección HTML en formulario de contacto',
      status: 'blocked',
      rule: 'WAF-HTML-001',
      tenant: 'tenant-001'
    }
  ];

  const complianceStatus = [
    { framework: 'OWASP Top 10', status: 'compliant', score: 92, lastAudit: '2024-01-15' },
    { framework: 'Security Headers', status: 'compliant', score: 88, lastAudit: '2024-01-10' },
    { framework: 'WAF Rules', status: 'partial', score: 76, lastAudit: '2024-01-05' },
    { framework: 'SSL/TLS Config', status: 'compliant', score: 95, lastAudit: '2024-01-12' }
  ];

  const wafRules = [
    { id: 'WAF-XSS-001', name: 'XSS Protection', status: 'active', triggers: 34, lastUpdate: '2024-01-20' },
    { id: 'WAF-SQL-002', name: 'SQL Injection Prevention', status: 'active', triggers: 21, lastUpdate: '2024-01-20' },
    { id: 'WAF-HTML-001', name: 'HTML Injection Filter', status: 'active', triggers: 11, lastUpdate: '2024-01-19' },
    { id: 'AUTH-BF-001', name: 'Brute Force Protection', status: 'active', triggers: 15, lastUpdate: '2024-01-20' },
    { id: 'ACCESS-001', name: 'Unauthorized Access Block', status: 'active', triggers: 11, lastUpdate: '2024-01-18' }
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

  const getAttackTypeIcon = (type: string) => {
    switch (type) {
      case 'xss': return <Code className="h-4 w-4" />;
      case 'sql-injection': return <Database className="h-4 w-4" />;
      case 'html-injection': return <Globe className="h-4 w-4" />;
      case 'brute-force': return <Lock className="h-4 w-4" />;
      case 'unauthorized-access': return <UserX className="h-4 w-4" />;
      default: return <Bug className="h-4 w-4" />;
    }
  };

  const filteredEvents = securityEvents.filter(event => event.tenant === selectedTenant);
  const totalThreats = webSecurityMetrics.reduce((sum, metric) => sum + metric.xss + metric.sqlInjection + metric.htmlInjection + metric.csrf, 0);
  const blockedThreats = webSecurityMetrics.reduce((sum, metric) => sum + metric.blocked, 0);
  const blockRate = ((blockedThreats / (blockedThreats + webSecurityMetrics.reduce((sum, metric) => sum + metric.allowed, 0))) * 100).toFixed(1);
  const criticalEvents = filteredEvents.filter(event => event.severity === 'critical').length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div className="flex items-center space-x-3">
          <Shield className="h-8 w-8 text-red-600" />
          <h2 className="text-2xl font-bold text-gray-900">SIEM Web Security</h2>
        </div>
        <div className="flex space-x-2 mt-4 sm:mt-0">
          <select
            value={selectedTenant}
            onChange={(e) => setSelectedTenant(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            {tenants.map(tenant => (
              <option key={tenant.id} value={tenant.id}>{tenant.name}</option>
            ))}
          </select>
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
            Amenazas Web
          </button>
          <button
            onClick={() => setSelectedTab('logs')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedTab === 'logs'
                ? 'bg-red-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Logs WAF
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

      {/* Tenant Info */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Globe className="h-5 w-5 text-gray-400" />
            <div>
              <span className="text-sm font-medium text-gray-900">
                {tenants.find(t => t.id === selectedTenant)?.name}
              </span>
              <span className="text-sm text-gray-500 ml-2">
                ({tenants.find(t => t.id === selectedTenant)?.domain})
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Calendar className="h-5 w-5 text-gray-400" />
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
              <span>Exportar</span>
            </button>
          </div>
        </div>
      </div>

      {/* Web Security KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="p-2 rounded-lg bg-red-50">
              <Bug className="h-6 w-6 text-red-600" />
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Ataques Web Detectados</p>
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
              <p className="text-sm text-gray-500">Ataques Bloqueados</p>
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
              <p className="text-sm text-gray-500">Tasa de Bloqueo WAF</p>
              <p className="text-2xl font-bold text-blue-600">{blockRate}%</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="p-2 rounded-lg bg-orange-50">
              <AlertTriangle className="h-6 w-6 text-orange-600" />
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
          {/* Web Security Timeline */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Actividad de Seguridad Web (24h)</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={webSecurityMetrics}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="xss" stroke="#EF4444" strokeWidth={2} name="XSS" />
                <Line type="monotone" dataKey="sqlInjection" stroke="#F59E0B" strokeWidth={2} name="SQL Injection" />
                <Line type="monotone" dataKey="htmlInjection" stroke="#8B5CF6" strokeWidth={2} name="HTML Injection" />
                <Line type="monotone" dataKey="blocked" stroke="#10B981" strokeWidth={3} name="Bloqueados" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Attack Types Distribution */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Tipos de Ataques Web</h3>
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

          {/* WAF Rules Status */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Estado de Reglas WAF</h3>
            <div className="space-y-3">
              {wafRules.map((rule, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Shield className="h-5 w-5 text-gray-400" />
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">{rule.name}</h4>
                      <p className="text-xs text-gray-500">ID: {rule.id} • Actualizada: {rule.lastUpdate}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-medium text-green-600">Activa</span>
                    <p className="text-xs text-gray-500">{rule.triggers} activaciones</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Web Events */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Eventos Recientes</h3>
            <div className="space-y-3">
              {filteredEvents.slice(0, 5).map((event) => (
                <div key={event.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className={`p-1 rounded-full ${
                    event.severity === 'critical' ? 'bg-red-100' :
                    event.severity === 'high' ? 'bg-orange-100' :
                    event.severity === 'medium' ? 'bg-yellow-100' : 'bg-blue-100'
                  }`}>
                    {getAttackTypeIcon(event.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{event.description}</p>
                    <p className="text-xs text-gray-500">{event.timestamp} • {event.sourceIP}</p>
                    <p className="text-xs text-gray-400 font-mono">{event.targetURL}</p>
                  </div>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(event.status)}`}>
                    {event.status === 'blocked' ? 'Bloqueado' :
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
                <h3 className="text-lg font-semibold text-gray-900">Análisis de Amenazas Web</h3>
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
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo de Ataque</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Severidad</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">IP Origen</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">URL Objetivo</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Descripción</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredEvents.map((event) => (
                    <tr key={event.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {event.timestamp}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {getAttackTypeIcon(event.type)}
                          <span className="ml-2 text-sm font-medium text-gray-900 capitalize">
                            {event.type.replace('-', ' ')}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getSeverityColor(event.severity)}`}>
                          {event.severity === 'critical' ? 'Crítico' :
                           event.severity === 'high' ? 'Alto' :
                           event.severity === 'medium' ? 'Medio' : 'Bajo'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-mono">
                        {event.sourceIP}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 font-mono max-w-xs truncate">
                        {event.targetURL}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {event.description}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(event.status)}`}>
                          {event.status === 'blocked' ? 'Bloqueado' :
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
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Logs del WAF - {tenants.find(t => t.id === selectedTenant)?.domain}</h3>
          <div className="bg-black rounded-lg p-4 font-mono text-sm text-green-400 h-96 overflow-y-auto">
            <div className="space-y-1">
              <div>[2024-01-20 14:32:15] BLOCK: XSS attempt detected - IP: 192.168.1.45 - URL: /admin/users - Rule: WAF-XSS-001</div>
              <div>[2024-01-20 14:32:14] BLOCK: SQL Injection attempt - IP: 10.0.0.15 - URL: /api/products - Payload: 1' OR 1=1--</div>
              <div>[2024-01-20 14:32:12] WARN: Multiple failed login attempts - IP: 172.16.0.8 - Count: 5 in 2 minutes</div>
              <div>[2024-01-20 14:32:10] INFO: WAF rules updated - Version: 2024.01.20.001 - New signatures: 15</div>
              <div>[2024-01-20 14:32:08] BLOCK: Unauthorized admin access attempt - IP: 203.0.113.45 - URL: /admin/config</div>
              <div>[2024-01-20 14:32:05] BLOCK: HTML injection detected - IP: 198.51.100.23 - URL: /contact/submit</div>
              <div>[2024-01-20 14:32:03] INFO: SSL certificate validation successful - Domain: {tenants.find(t => t.id === selectedTenant)?.domain}</div>
              <div>[2024-01-20 14:32:01] INFO: Security headers check passed - HSTS, CSP, X-Frame-Options OK</div>
              <div>[2024-01-20 14:31:58] WARN: Suspicious user agent detected - Bot-like behavior from IP: 192.0.2.100</div>
              <div>[2024-01-20 14:31:55] INFO: Rate limiting applied - IP: 198.51.100.50 - Requests: 100/minute</div>
              <div>[2024-01-20 14:31:52] BLOCK: CSRF token validation failed - IP: 203.0.113.25 - Form: /api/update-profile</div>
              <div>[2024-01-20 14:31:50] INFO: Geo-blocking rule triggered - Country: CN - IP: 192.0.2.200</div>
              <div>[2024-01-20 14:31:48] WARN: File upload size exceeded - IP: 198.51.100.75 - Size: 50MB - Limit: 10MB</div>
              <div>[2024-01-20 14:31:45] INFO: WAF engine started - Mode: Prevention - Rules loaded: 1,247</div>
              <div>[2024-01-20 14:31:42] INFO: DDoS protection activated - Threshold: 1000 req/min - Current: 1,250 req/min</div>
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
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recomendaciones de Seguridad Web</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium text-yellow-800">WAF Rules - Actualización Requerida</h4>
                  <p className="text-sm text-yellow-700 mt-1">
                    Se recomienda actualizar las reglas WAF para incluir nuevas firmas de ataques XSS y SQL Injection.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <Eye className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium text-blue-800">Security Headers - Monitoreo Continuo</h4>
                  <p className="text-sm text-blue-700 mt-1">
                    Mantener configuración de headers de seguridad actualizada: HSTS, CSP, X-Frame-Options.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-4 bg-green-50 rounded-lg border border-green-200">
                <Shield className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium text-green-800">OWASP Top 10 - Excelente Cobertura</h4>
                  <p className="text-sm text-green-700 mt-1">
                    La aplicación web está bien protegida contra las principales vulnerabilidades OWASP Top 10.
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