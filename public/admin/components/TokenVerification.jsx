// src/App.js
import React, { useState } from 'react';
import { 
  BrowserRouter as Router, 
  Switch, 
  Route, 
  Redirect 
} from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import Footer from './components/Footer';
import TokenVerification from './admin/components/TokenVerification';
import AdminDashboard from './admin/pages/AdminDashboard';
import ProductsPage from './admin/pages/ProductsPage';
import SlidersPage from './admin/pages/SlidersPage';
import './styles/App.css';

function App() {
  const [authenticated, setAuthenticated] = useState(
    localStorage.getItem('adminToken') !== null
  );

  return (
    <Router>
      <div className="App">
        <Switch>
          {/* Public route */}
          <Route exact path="/">
            <Header />
            <HomePage />
            <Footer />
          </Route>
          
          {/* Admin routes */}
          <Route path="/admin">
            {authenticated ? (
              <Switch>
                <Route exact path="/admin">
                  <AdminDashboard />
                </Route>
                <Route path="/admin/dashboard">
                  <AdminDashboard />
                </Route>
                <Route path="/admin/products">
                  <ProductsPage />
                </Route>
                <Route path="/admin/sliders">
                  <SlidersPage />
                </Route>
                <Redirect to="/admin" />
              </Switch>
            ) : (
              <TokenVerification setAuthenticated={setAuthenticated} />
            )}
          </Route>
          
          {/* Redirect to home for any other route */}
          <Route path="*">
            <Redirect to="/" />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;