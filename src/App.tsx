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

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/control" element={<ControlPanel />} />
          <Route path="/delivery" element={<DeliveryModule />} />
          <Route path="/sales" element={<SalesPortal />} />
          <Route path="/warehouse" element={<Warehouse />} />
          <Route path="/accounting" element={<Accounting />} />
          <Route path="/accounting/costs" element={<CostSheet />} />
          <Route path="/accounting/pricing" element={<PricingSheet />} />
          <Route path="/accounting/payroll" element={<PayrollManagement />} />
          <Route path="/customers" element={<CustomerManagement />} />
          <Route path="/suppliers" element={<SupplierManagement />} />
          <Route path="/purchases" element={<PurchaseOrders />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/catalog" element={<OnlineCatalog />} />
          <Route path="/expansion" element={<Expansion />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;