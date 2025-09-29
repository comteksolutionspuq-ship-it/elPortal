import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  BarChart3, 
  Truck, 
  ShoppingCart, 
  Package, 
  Calculator, 
  TrendingUp, 
  Menu, 
  X,
  Store,
  Settings,
  Users,
  UserCheck,
  ShoppingBag,
  FileText,
  Globe,
  ChevronDown,
  ChevronRight,
  Shield,
  Database,
  Building,
  CreditCard,
  Calendar,
  Briefcase,
  FileSpreadsheet,
  UserCog,
  Layers
} from 'lucide-react';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState<{[key: string]: boolean}>({});
  const location = useLocation();

  const toggleMenu = (menuKey: string) => {
    setExpandedMenus(prev => ({
      ...prev,
      [menuKey]: !prev[menuKey]
    }));
  };

  const navigation = [
    { name: 'Dashboard', href: '/', icon: BarChart3 },
    { name: 'Panel de Control', href: '/control', icon: Settings },
    { 
      name: 'Logística', 
      icon: Truck,
      submenu: [
        { name: 'Repartos', href: '/delivery' },
        { name: 'Gestión de Rutas', href: '/logistics/routes' },
        { name: 'Gestión de Flota', href: '/logistics/fleet' },
        { name: 'Centros de Distribución', href: '/logistics/distribution' },
        { name: 'Tracking y Monitoreo', href: '/logistics/tracking' }
      ]
    },
    { 
      name: 'Ventas y Marketing', 
      icon: ShoppingCart,
      submenu: [
        { name: 'Punto de Venta', href: '/sales' },
        { name: 'Tienda Online', href: '/store' },
        { name: 'Catálogo Online', href: '/catalog' },
        { name: 'Campañas Marketing', href: '/marketing/campaigns' }
      ]
    },
    { name: 'Bodega', href: '/warehouse', icon: Package },
    { 
      name: 'Contabilidad', 
      icon: Calculator,
      submenu: [
        { name: 'Transacciones', href: '/accounting' },
        { name: 'Facturación', href: '/accounting/billing' },
        { name: 'Planilla de Costos', href: '/accounting/costs' },
        { name: 'Asignación de Precios', href: '/accounting/pricing' },
        { name: 'Gestión de Sueldos', href: '/accounting/payroll' }
      ]
    },
    { 
      name: 'Finanzas', 
      icon: DollarSign,
      submenu: [
        { name: 'Análisis Financiero', href: '/finance/analysis' },
        { name: 'Flujo de Caja', href: '/finance/cashflow' },
        { name: 'Presupuestos', href: '/finance/budgets' },
        { name: 'Inversiones', href: '/finance/investments' }
      ]
    },
    { 
      name: 'CRM', 
      icon: Users,
      submenu: [
        { name: 'Pipeline de Ventas', href: '/crm/pipeline' },
        { name: 'Gestión de Leads', href: '/crm/leads' },
        { name: 'Análisis de Clientes', href: '/crm/analytics' },
        { name: 'Automatización', href: '/crm/automation' }
      ]
    },
    { name: 'Clientes', href: '/customers', icon: Users },
    { name: 'Proveedores', href: '/suppliers', icon: UserCheck },
    { name: 'Órdenes de Compra', href: '/purchases', icon: ShoppingBag },
    { 
      name: 'Gestión Empresarial', 
      icon: Building,
      submenu: [
        { name: 'Gestión de Proyectos', href: '/business/projects' },
        { name: 'Recursos Humanos', href: '/business/hr' },
        { name: 'Activos Fijos', href: '/business/assets' },
        { name: 'Planificación Estratégica', href: '/business/planning' },
        { name: 'Workflows', href: '/business/workflow' }
      ]
    },
    { name: 'Reportes', href: '/reports', icon: FileText },
    { name: 'Expansión', href: '/expansion', icon: TrendingUp },
    { name: 'SIEM Security', href: '/siem', icon: Shield },
  ];

  const isActiveMenu = (item: any) => {
    if (item.href) {
      return location.pathname === item.href;
    }
    if (item.submenu) {
      return item.submenu.some((sub: any) => location.pathname === sub.href);
    }
    return false;
  };

  return (
    <div className="h-screen bg-gray-50 flex">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:flex lg:flex-col ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <div className="flex items-center">
            <Store className="h-8 w-8 text-blue-600" />
            <span className="ml-2 text-xl font-bold text-gray-900">El Portal</span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-gray-400 hover:text-gray-600"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <nav className="mt-6 flex-1 overflow-y-auto">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = isActiveMenu(item);
            
            if (item.submenu) {
              const isExpanded = expandedMenus[item.name];
              return (
                <div key={item.name}>
                  <button
                    onClick={() => toggleMenu(item.name)}
                    className={`w-full flex items-center justify-between px-6 py-3 text-sm font-medium transition-colors duration-200 ${
                      isActive
                        ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <div className="flex items-center">
                      <Icon className="h-5 w-5 mr-3" />
                      {item.name}
                    </div>
                    {isExpanded ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </button>
                  {isExpanded && (
                    <div className="bg-gray-50">
                      {item.submenu.map((subItem: any) => (
                        <Link
                          key={subItem.name}
                          to={subItem.href}
                          className={`block px-12 py-2 text-sm transition-colors duration-200 ${
                            location.pathname === subItem.href
                              ? 'text-blue-700 bg-blue-100'
                              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                          }`}
                          onClick={() => setSidebarOpen(false)}
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }
            
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center px-6 py-3 text-sm font-medium transition-colors duration-200 ${
                  isActive
                    ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
                onClick={() => setSidebarOpen(false)}
              >
                <Icon className="h-5 w-5 mr-3" />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <div className="bg-white shadow-sm border-b border-gray-200 flex-shrink-0">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="lg:hidden text-gray-400 hover:text-gray-600"
                >
                  <Menu className="h-6 w-6" />
                </button>
                <h1 className="ml-4 lg:ml-0 text-2xl font-semibold text-gray-900">
                  Distribuidora El Portal
                </h1>
              </div>
              <div className="flex items-center">
                <span className="text-sm text-gray-500">Punta Arenas, Chile</span>
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layoumt;
