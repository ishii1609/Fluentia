import React from 'react'
import ProtectedRoute from './components/Protected_route'
import Public_route from './components/Public_route'
import Landing from './pages/Landing'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import AIConversation from "./pages/AIConversation";
import Reports from "./pages/Reports";
import ReportsList from './pages/ReportsList'
import { Route, Routes } from 'react-router-dom'


const App = () => {
  return (
<Routes>
 <Route path='/' element={<Landing/>}/>
  <Route path='/signup' element={<Public_route>
    <Signup/>
  </Public_route>}/>
  <Route path='/login' element={
  <Public_route>
    <Login/>
  </Public_route>
     }/>
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/practice"
        element={
          <ProtectedRoute>
            <AIConversation />
          </ProtectedRoute>
        }
      />
      <Route
        path="/reports/:conversationId"
        element={
          <ProtectedRoute>
            <Reports />
          </ProtectedRoute>
        }
      />

      <Route
        path="/reports"
        element={
          <ProtectedRoute>
            <ReportsList/>
          </ProtectedRoute>
        }
      />

</Routes>
  )
}

export default App
