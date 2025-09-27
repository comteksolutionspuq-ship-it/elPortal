import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import ControlPanel from './pages/ControlPanel';

// Logistics Modules
import DeliveryModule from './pages/logistics/DeliveryModule';
import RouteManagement from './pages/logistics/RouteManagement';
import FleetManagement from './pages/logistics/FleetManagement';
import DistributionCenters from './pages/logistics/DistributionCenters';
//import RealTimeTracking from './pages/logistics/RealTimeTracking';

// Sales & Marketing
import SalesPortal from './pages/SalesPortal';
import OnlineStore from './pages/store/OnlineStore';
import OnlineCatalog from './pages/OnlineCatalog';
//import MarketingCampaigns from './pages/marketing/MarketingCampaigns';
//import SalesAnalytics from './pages/sales/SalesAnalytics';

// Inventory
import Warehouse from './pages/Warehouse';

// Accounting & Finance
import Accounting from './pages/Accounting';
import BillingModule from './pages/accounting/BillingModule';
import CostSheet from './pages/CostSheet';
import PricingSheet from './pages/PricingSheet';
import PayrollManagement from './pages/PayrollManagement';
import FinancialAnalysis from './pages/finance/FinancialAnalysis';
//import CashFlowManagement from './pages/finance/CashFlowManagement';
import BudgetManagement from './pages/finance/BudgetManagement';

// CRM Advanced
import CustomerManagement from './pages/crm/CustomerManagement';
import SalesPipeline from './pages/crm/SalesPipeline';
import LeadTracking from './pages/crm/LeadTracking';
import BehaviorAnalysis from './pages/crm/BehaviorAnalysis';
import MarketingAutomation from './pages/crm/MarketingAutomation';
import CustomerSupport from './pages/crm/CustomerSupport';

// Business Management
import ProjectManagement from './pages/business/ProjectManagement';
import HumanResources from './pages/business/HumanResources';
import AssetManagement from './pages/business/AssetManagement';
import PlanningModule from './pages/business/PlanningModule';
import WorkflowModule from './pages/business/WorkflowModule';

// Other modules
import SupplierManagement from './pages/SupplierManagement';
import PurchaseOrders from './pages/PurchaseOrders';
import Reports from './pages/Reports';
import Expansion from './pages/Expansion';
import SIEMDashboard from './pages/siem/SIEMDashboard';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/control" element={<ControlPanel />} />
          
          {/* Logistics Routes */}
          <Route path="/logistics/delivery" element={<DeliveryModule />} />
          <Route path="/logistics/routes" element={<RouteManagement />} />
          <Route path="/logistics/fleet" element={<FleetManagement />} />
          <Route path="/logistics/distribution" element={<DistributionCenters />} />
          <Route path="/logistics/tracking" element={<RealTimeTracking />} />
          
          {/* Sales & Marketing Routes */}
          <Route path="/sales" element={<SalesPortal />} />
          <Route path="/store" element={<OnlineStore />} />
          <Route path="/catalog" element={<OnlineCatalog />} />
          <Route path="/marketing/campaigns" element={<MarketingCampaigns />} />
          <Route path="/sales/analytics" element={<SalesAnalytics />} />
          
          {/* Inventory */}
          <Route path="/warehouse" element={<Warehouse />} />
          
          {/* Accounting & Finance Routes */}
          <Route path="/accounting" element={<Accounting />} />
          <Route path="/accounting/billing" element={<BillingModule />} />
          <Route path="/accounting/costs" element={<CostSheet />} />
          <Route path="/accounting/pricing" element={<PricingSheet />} />
          <Route path="/accounting/payroll" element={<PayrollManagement />} />
          <Route path="/finance/analysis" element={<FinancialAnalysis />} />
          <Route path="/finance/cashflow" element={<CashFlowManagement />} />
          <Route path="/finance/budgets" element={<BudgetManagement />} />
          
          {/* CRM Advanced Routes */}
          <Route path="/crm/customers" element={<CustomerManagement />} />
          <Route path="/crm/pipeline" element={<SalesPipeline />} />
          <Route path="/crm/leads" element={<LeadTracking />} />
          <Route path="/crm/behavior" element={<BehaviorAnalysis />} />
          <Route path="/crm/automation" element={<MarketingAutomation />} />
          <Route path="/crm/support" element={<CustomerSupport />} />
          
          {/* Business Management Routes */}
          <Route path="/business/projects" element={<ProjectManagement />} />
          <Route path="/business/hr" element={<HumanResources />} />
          <Route path="/business/assets" element={<AssetManagement />} />
          <Route path="/business/planning" element={<PlanningModule />} />
          <Route path="/business/workflow" element={<WorkflowModule />} />
          
          {/* Other Routes */}
          <Route path="/suppliers" element={<SupplierManagement />} />
          <Route path="/purchases" element={<PurchaseOrders />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/expansion" element={<Expansion />} />
          <Route path="/siem" element={<SIEMDashboard />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;