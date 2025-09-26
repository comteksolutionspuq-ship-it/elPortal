import React, { useState } from 'react';
import { Shield, AlertTriangle, Eye, Activity, Lock, Wifi, Server, Database, Download, Filter, Calendar, Globe, Code, Zap } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

const SIEMDashboard: React.FC = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState('24h');
  const [selectedTab, setSelectedTab] = useState<'overview' | 'web-attacks' | 'intrusions' | 'compliance'>('overview');
  const [selectedTenant, setSelectedTenant] = useState('elportal');

  // Datos específicos para ataques web (SaaS multi-tenant)
  const webAttackMetrics = [
    { time: '00:00', xss: 5, sqli: 3, htmli: 2, csrf: 1, blocked: 10, allowed: 1 },
    { time: '04:00', xss: 2, sqli: 1, htmli: 1, csrf: 0, blocked: 4, allowed: 0 },
    { time: '08:00', xss: 12, sqli: 8, htmli: 5, csrf: 3, blocked: 26, allowed: 2 },
    { time: '12:00', xss: 8, sqli: 5, htmli: 3, csrf: 2, blocked: 16, allowed: 2 },
    { time: '16:00', xss: 15, sqli: 12, htmli: 8, csrf: 5, blocked: 35, allowed: 5 },
    { time: '20:00', xss: 6, sqli: 4, htmli: 2, csrf: 1, blocked: 12, allowed: 1 }
  ];

  const attackTypes = [
    { name: 'XSS (Cross-Site Scripting)', value: 42, color: '#EF4444' },
    { name: 'SQL Injection', value: 28, color: '#F59E0B' },
    { name: 'HTML Injection', value: 18, color: '#8B5CF6' },
    { name: 'CSRF', value: 8, color: '#3B82F6' },
    { name: 'Path Traversal', value: 4, color: '#6B7280' }
  ];

  const webSecurityEvents = [
    {
      id: 'WEB-001',
      timestamp: '2024-01-20 14:32:15',
      type: 'xss',
      severity: 'high',
      sourceIP: '203.45.67.89',
      targetURL: '/store/search?q=<script>alert(1)</script>',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      description: 'Intento de XSS en formulario de búsqueda',
      status: 'blocked',
      rule: 'WAF-XSS-001',
      tenant: 'elportal'
    },
    {
      id: 'WEB-002',
      timestamp: '2024-01-20 14:28:42',
      type: 'sqli',
      severity: 'critical',
      sourceIP: '45.123.78.90',
      targetURL: '/api/products?id=1\' OR 1=1--',
      userAgent: 'sqlmap/1.6.12',
      description: 'Intento de SQL Injection en API de productos',
      status: 'blocked',
      rule: 'WAF-SQLI-002',
      tenant: 'elportal'
    },
    {
      id: 'WEB-003',
      timestamp: '2024-01-20 14:25:18',
      type: 'auth',
      severity: 'medium',
      sourceIP: '192.168.1.100',
      targetURL: '/admin/login',
      userAgent: 'Mozilla/5.0 (compatible; Baiduspider/2.0)',
      description: 'Múltiples intentos de login administrativo',
      status: 'monitoring',
      rule: 'AUTH-BRUTE-001',
      tenant: 'elportal'
    },
    {
      id: 'WEB-004',
      timestamp: '2024-01-20 14:20:55',
      type: 'htmli',
      severity: 'medium',
      sourceIP: '78.234.56.12',
      targetURL: '/contact/submit',
      userAgent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36',
      description: 'Intento de inyección HTML en formulario de contacto',
      status: 'blocked',
      rule: 'WAF-HTML-001',
      tenant: 'elportal'
    }
  ];

  const intrusionAttempts = [
    {
      id: 'INT-001',
      timestamp: '2024-01-20 14:35:22',
      type: 'unauthorized-access',
      sourceIP: '89.45.123.67',
      targetEndpoint: '/admin/dashboard',
      method: 'GET',
      description: 'Intento de acceso a panel administrativo sin autenticación',
      status: 'blocked',
      severity: 'high'
    },
    {
      id: 'INT-002',
      timestamp: '2024-01-20 14:30:15',
      type: 'privilege-escalation',
      sourceIP: '156.78.90.123',
      targetEndpoint: '/api/admin/users',
      method: 'POST',
      description: 'Intento de escalación de privilegios en API',
      status: 'blocked',
      severity: 'critical'
    },
    {
      id: 'INT-003',
      timestamp: '2024-01-20 14:22:08',
      type: 'suspicious-login',
      sourceIP: '67.89.123.45',
      targetEndpoint: '/auth/login',
      method: 'POST',
      description: 'Login desde ubicación geográfica inusual',
      status: 'flagged',
      severity: 'medium'
    }
  ];

  const tenants = [
    { id: 'elportal', name: 'Distribuidora El Portal' },
    { id: 'demo-client', name: 'Cliente Demo' },
    { id: 'test-env', name: 'Ambiente de Pruebas' }
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
      case 'flagged': return 'bg-yellow-100 text-yellow-800';
      case 'monitoring': return 'bg-blue-100 text-blue-800';
      case 'investigating': return 'bg-purple-100 text-purple-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getAttackTypeIcon = (type: string) => {
    switch (type) {
      case 'xss': return <Code className="h-4 w-4" />;
      case 'sqli': return <Database className="h-4 w-4" />;
      case 'htmli': return <Globe className="h-4 w-4" />;
      case 'csrf': return <Shield className="h-4 w-4" />;
      case 'auth': return <Lock className="h-4 w-4" />;
      default: return <AlertTriangle className="h-4 w-4" />;
    }
  };

  const totalWebAttacks = webAttackMetrics.reduce((sum, metric) => 
    sum + metric.xss + metric.sqli + metric.htmli + metric.csrf, 0
  );
  const blockedWebAttacks = webAttackMetrics.reduce((sum, metric) => sum + metric.blocked, 0);
  const webBlockRate = ((blockedWebAttacks / (blockedWebAttacks + webAttackMetrics.reduce((sum, metric) => sum + metric.allowed, 0))) * 100).toFixed(1);
  const criticalWebEvents = webSecurityEvents.filter(event => event.severity === 'critical').length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div className="flex items-center space-x-3">
          <Shield className="h-8 w-8 text-red-600" />
          <div>
            <h2 className="text-2xl font-bold text-gray-900">SIEM Web Security Center</h2>
            <p className="text-sm text-gray-600">Monitoreo de seguridad para aplicaciones web SaaS</p>
          </div>
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
            onClick={() => setSelectedTab('web-attacks')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedTab === 'web-attacks'
                ? 'bg-red-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Ataques Web
          </button>
          <button
            onClick={() => setSelectedTab('intrusions')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedTab === 'intrusions'
                ? 'bg-red-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Intrusiones
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
          <span className="text-sm font-medium text-gray-700">Período de análisis:</span>
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

      {/* Web Security KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="p-2 rounded-lg bg-red-50">
              <Code className="h-6 w-6 text-red-600" />
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Ataques Web Detectados</p>
              <p className="text-2xl font-bold text-red-600">{totalWebAttacks}</p>
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
              <p className="text-2xl font-bold text-green-600">{blockedWebAttacks}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="p-2 rounded-lg bg-blue-50">
              <Zap className="h-6 w-6 text-blue-600" />
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Tasa de Protección</p>
              <p className="text-2xl font-bold text-blue-600">{webBlockRate}%</p>
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
              <p className="text-2xl font-bold text-orange-600">{criticalWebEvents}</p>
            </div>
          </div>
        </div>
      </div>

      {selectedTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Web Attack Timeline */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Actividad de Ataques Web (24h)</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={webAttackMetrics}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="xss" stroke="#EF4444" strokeWidth={2} name="XSS" />
                <Line type="monotone" dataKey="sqli" stroke="#F59E0B" strokeWidth={2} name="SQL Injection" />
                <Line type="monotone" dataKey="htmli" stroke="#8B5CF6" strokeWidth={2} name="HTML Injection" />
                <Line type="monotone" dataKey="csrf" stroke="#3B82F6" strokeWidth={2} name="CSRF" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Attack Types Distribution */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Tipos de Ataques Web</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={attackTypes}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {attackTypes.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value}%`} />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {attackTypes.map((item, index) => (
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

          {/* Recent Web Security Events */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Eventos de Seguridad Web Recientes</h3>
            <div className="space-y-3">
              {webSecurityEvents.slice(0, 5).map((event) => (
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
                    <p className="text-xs text-gray-400 truncate">{event.targetURL}</p>
                  </div>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(event.status)}`}>
                    {event.status === 'blocked' ? 'Bloqueado' :
                     event.status === 'flagged' ? 'Marcado' :
                     event.status === 'monitoring' ? 'Monitoreando' : 'Investigando'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* WAF Protection Status */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Estado del WAF (Web Application Firewall)</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center space-x-3">
                  <Shield className="h-5 w-5 text-green-600" />
                  <div>
                    <h4 className="text-sm font-medium text-green-800">WAF Principal</h4>
                    <p className="text-xs text-green-600">Protección activa contra ataques web</p>
                  </div>
                </div>
                <span className="text-sm font-medium text-green-600">Activo</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center space-x-3">
                  <Code className="h-5 w-5 text-blue-600" />
                  <div>
                    <h4 className="text-sm font-medium text-blue-800">Detección XSS</h4>
                    <p className="text-xs text-blue-600">Filtros avanzados contra scripts maliciosos</p>
                  </div>
                </div>
                <span className="text-sm font-medium text-blue-600">Activo</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg border border-purple-200">
                <div className="flex items-center space-x-3">
                  <Database className="h-5 w-5 text-purple-600" />
                  <div>
                    <h4 className="text-sm font-medium text-purple-800">Protección SQL</h4>
                    <p className="text-xs text-purple-600">Prevención de inyecciones SQL</p>
                  </div>
                </div>
                <span className="text-sm font-medium text-purple-600">Activo</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedTab === 'web-attacks' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">Análisis de Ataques Web</h3>
                <div className="flex space-x-2">
                  <button className="flex items-center space-x-2 bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition-colors">
                    <Filter className="h-4 w-4" />
                    <span>Filtrar por Tipo</span>
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
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Regla WAF</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {webSecurityEvents.map((event) => (
                    <tr key={event.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-mono">
                        {event.timestamp}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {getAttackTypeIcon(event.type)}
                          <span className="ml-2 text-sm font-medium text-gray-900 uppercase">
                            {event.type}
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
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(event.status)}`}>
                          {event.status === 'blocked' ? 'Bloqueado' :
                           event.status === 'flagged' ? 'Marcado' :
                           event.status === 'monitoring' ? 'Monitoreando' : 'Investigando'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">
                        {event.rule}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {selectedTab === 'intrusions' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Intentos de Intrusión</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timestamp</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">IP Origen</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Endpoint</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Método</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Descripción</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {intrusionAttempts.map((attempt) => (
                    <tr key={attempt.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-mono">
                        {attempt.timestamp}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                          {attempt.type.replace('-', ' ').toUpperCase()}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-mono">
                        {attempt.sourceIP}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 font-mono">
                        {attempt.targetEndpoint}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${
                          attempt.method === 'POST' ? 'bg-orange-100 text-orange-800' :
                          attempt.method === 'GET' ? 'bg-blue-100 text-blue-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {attempt.method}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {attempt.description}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(attempt.status)}`}>
                          {attempt.status === 'blocked' ? 'Bloqueado' :
                           attempt.status === 'flagged' ? 'Marcado' : 'Monitoreando'}
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

      {selectedTab === 'compliance' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Cumplimiento de Seguridad Web</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">OWASP Top 10 Compliance</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>A01: Broken Access Control</span>
                      <span className="text-green-600 font-medium">✓ Protegido</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>A02: Cryptographic Failures</span>
                      <span className="text-green-600 font-medium">✓ Protegido</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>A03: Injection</span>
                      <span className="text-green-600 font-medium">✓ Protegido</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>A04: Insecure Design</span>
                      <span className="text-yellow-600 font-medium">⚠ Revisión</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>A05: Security Misconfiguration</span>
                      <span className="text-green-600 font-medium">✓ Protegido</span>
                    </div>
                  </div>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">Certificaciones SSL/TLS</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Certificado SSL:</span>
                      <span className="text-green-600 font-medium">Válido hasta 2025-06-15</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Protocolo TLS:</span>
                      <span className="text-green-600 font-medium">TLS 1.3</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Cifrado:</span>
                      <span className="text-green-600 font-medium">AES-256</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">Headers de Seguridad</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Content-Security-Policy:</span>
                      <span className="text-green-600 font-medium">✓ Configurado</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>X-Frame-Options:</span>
                      <span className="text-green-600 font-medium">✓ DENY</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>X-XSS-Protection:</span>
                      <span className="text-green-600 font-medium">✓ Habilitado</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Strict-Transport-Security:</span>
                      <span className="text-green-600 font-medium">✓ Configurado</span>
                    </div>
                  </div>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">Monitoreo en Tiempo Real</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Rate Limiting:</span>
                      <span className="text-green-600 font-medium">✓ Activo</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>IP Blacklisting:</span>
                      <span className="text-green-600 font-medium">✓ 1,247 IPs bloqueadas</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Geo-blocking:</span>
                      <span className="text-green-600 font-medium">✓ 15 países bloqueados</span>
                    </div>
                  </div>
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