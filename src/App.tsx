import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import DeliveryModule from './pages/DeliveryModule';
import Dashboard from './pages/Dashboard';
import ControlPanel from './pages/ControlPanel';
import SalesPortal from './pages/SalesPortal';
import Warehouse from './pages/Warehouse';
import Accounting from './pages/Accounting';
import CostSheet from './pages/CostSheet';
import PricingSheet from './pages/PricingSheet';
import PayrollManagement from './pages/PayrollManagement';
import OnlineCatalog from './pages/OnlineCatalog';
import CustomerManagement from './pages/CustomerManagement';
import SupplierManagement from './pages/SupplierManagement';
import PurchaseOrders from './pages/PurchaseOrders';
import Reports from './pages/Reports';
import Expansion from './pages/Expansion';
import OnlineStore from './pages/OnlineStore';
import RouteManagement from './pages/logistics/RouteManagement';
import FleetManagement from './pages/logistics/FleetManagement';
import DistributionCenters from './pages/logistics/DistributionCenters';
import TrackingMonitoring from './pages/logistics/TrackingMonitoring';
//import MarketingCampaigns from './pages/marketing/MarketingCampaigns';
import BillingModule from './pages/accounting/BillingModule';
import FinancialAnalysis from './pages/finance/FinancialAnalysis';
import CashFlow from './pages/finance/CashFlow';
import Budgets from './pages/finance/Budgets';
import Investments from './pages/finance/Investments';
import SalesPipeline from './pages/crm/SalesPipeline';
import LeadManagement from './pages/crm/LeadManagement';
import CustomerAnalytics from './pages/crm/CustomerAnalytics';
import CRMAutomation from './pages/crm/CRMAutomation';
import ProjectManagement from './pages/business/ProjectManagement';
import HumanResources from './pages/business/HumanResources';
import AssetManagement from './pages/business/AssetManagement';
import PlanningModule from './pages/business/PlanningModule';
import WorkflowModule from './pages/business/WorkflowModule';
import SIEMDashboard from './pages/siem/SIEMDashboard';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/control" element={<ControlPanel />} />
          <Route path="/delivery" element={<DeliveryModule />} />
          <Route path="/logistics/routes" element={<RouteManagement />} />
          <Route path="/logistics/fleet" element={<FleetManagement />} />
          <Route path="/logistics/distribution" element={<DistributionCenters />} />
          <Route path="/logistics/tracking" element={<TrackingMonitoring />} />
          <Route path="/sales" element={<SalesPortal />} />
          <Route path="/store" element={<OnlineStore />} />
          <Route path="/catalog" element={<OnlineCatalog />} />
          <Route path="/marketing/campaigns" element={<MarketingCampaigns />} />
          <Route path="/warehouse" element={<Warehouse />} />
          <Route path="/accounting" element={<Accounting />} />
          <Route path="/accounting/billing" element={<BillingModule />} />
          <Route path="/accounting/costs" element={<CostSheet />} />
          <Route path="/accounting/pricing" element={<PricingSheet />} />
          <Route path="/accounting/payroll" element={<PayrollManagement />} />
          <Route path="/finance/analysis" element={<FinancialAnalysis />} />
          <Route path="/finance/cashflow" element={<CashFlow />} />
          <Route path="/finance/budgets" element={<Budgets />} />
          <Route path="/finance/investments" element={<Investments />} />
          <Route path="/crm/pipeline" element={<SalesPipeline />} />
          <Route path="/crm/leads" element={<LeadManagement />} />
          <Route path="/crm/analytics" element={<CustomerAnalytics />} />
          <Route path="/crm/automation" element={<CRMAutomation />} />
          <Route path="/customers" element={<CustomerManagement />} />
          <Route path="/suppliers" element={<SupplierManagement />} />
          <Route path="/purchases" element={<PurchaseOrders />} />
          <Route path="/business/projects" element={<ProjectManagement />} />
          <Route path="/business/hr" element={<HumanResources />} />
          <Route path="/business/assets" element={<AssetManagement />} />
          <Route path="/business/planning" element={<PlanningModule />} />
          <Route path="/business/workflow" element={<WorkflowModule />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/expansion" element={<Expansion />} />
          <Route path="/siem" element={<SIEMDashboard />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;