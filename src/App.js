// src/App.js
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import Footer from './components/Footer';
import AdminDashboardPage from './pages/AdminDashboardPage';
import './styles/App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <Header />
            <HomePage />
            <Footer />
          </Route>
          
          <Route path="/admin">
            <AdminDashboardPage />
          </Route>
          
          {/* Redirect to home for any other route */}
          <Route path="*">
            <Header />
            <HomePage />
            <Footer />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;