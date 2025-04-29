import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css';
import Getdata from './Components/Getdata';
import Voyestimation from './Components/Voyestimation';
import Grid from './Components/Grid';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Private from './Components/private';
import Sidebar from './Components/Sidebar';
import Modals from './Components/Modal';
import GetCalculationTable from './Components/GetCalculationTable';
//import ProtectedRoute from './Components/ProtectedRoute'
import TestChild from './Components/TestChild';
import Context from './Components/Context';
import Formula from './Components/Formula';
import VslTypeChange from './Components/VslTypeChange';
import OperationField from './Components/OperationField';
import Testgetfromdb from './Components/Testgetfromdb';
import SearchIndependent from './Components/SearchIndependent';
import Charterer from './Components/ChartererUrl';
import PortStatus from './Components/PortStatusUrl';
import GetDistanceTest from './Components/GetDistanceTest';
import SearchSuggestion from './Components/SearchSuggestion';

function App() {

  return (
    <>
      <Context>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path="/private" element={<Private />} />
            <Route path='/Signup' element={<Signup />} />
            <Route path='/login' element={<Login />} />
            <Route path='/Grid' element={<Grid />} />
            <Route path='/Getdata' element={<Getdata />} />
            <Route path='/voyestimation' element={<Voyestimation />} />
            {/* <ProtectedRoute >                                */}

            {/* </ProtectedRoute>}/>   */}
            <Route path='/sidebar' element={<Sidebar />} />
            <Route path='/modals' element={<Modals />} />
            <Route path='/child' element={<TestChild />} />
            <Route path='/getcalculation' element={<GetCalculationTable />} />
            <Route path='/formula' element={<Formula />} />           
            <Route path='/vsltypechange' element={<VslTypeChange />} />
            <Route path='/datagrid' element={<TestChild/>}/>
            <Route path='/operation' element={<OperationField/>}/>
            <Route path='/commodity' element={<Testgetfromdb/>}/>
            <Route path='/independent' element={<SearchIndependent/>}/>
            <Route path='/charterer' element={<Charterer/>}/> 
            <Route path='/portstate' element={<PortStatus/>}/> 
            <Route path='/getdistance' element={<GetDistanceTest/>}/>
            <Route path='/suggestion' element={<SearchSuggestion/>}/>
          </Routes>
        </BrowserRouter>
      </Context>
    </>
  );
}

export default App;
