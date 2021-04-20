import React, {useState} from 'react';
import {Header} from './components/Header'
import {Register} from './components/Auth/Register'
import {Footer} from './components/Footer'
import {Details} from './components/Dash/Details'
import {RentalProvider} from './context/RentalDetail'

function App() {
    // const [log, setLog] = useState(false)
    return (
        <RentalProvider>
            <Header />
            {/* 
            {!log ?
                <Login /> 
            :
                <Dashboard /> 
            } */}
            
            <Register /> 
            <Footer />
        </RentalProvider>  
    )
}
export default App;