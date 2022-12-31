import React, {useState, useEffect} from 'react';
import Navigation from './navigation';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import apiClient from '../../services/api';
// import { setDatasets } from 'react-chartjs-2/dist/utils';

function Index() {

    let location = useLocation();
    const navigate = useNavigate();
    
    const [investmentTotal, setInvestmentTotal] = useState(0);
    const [boaChecking, setBoaChecking] = useState(0);
    const [boaSavings, setBoaSavings] = useState(0);
    const [becuChecking, setBecuChecking] = useState(0);
    const [becuSavings, setBecuSavings] = useState(0);
    const [americanExpress, setAmericanExpress] = useState(0);
    const [ameritrade, setAmeritrade] = useState(0);
    const [barclays, setBarclays] = useState(0);
    const [crypto, setCrypto] = useState(0);
    const [iBond, setIBond] = useState(0);

    const[initialState, setInitialState] = useState({});
    
    var isStockManager = false;
    location.pathname === '/stockManager' ? isStockManager = true : isStockManager = false; 

    useEffect(() =>{
       
        const fetchData = async () => { 
            apiClient.get('/api/showAll/Edmund').then(response => {
                
                response.data.map( function(stock) {
                    setInvestmentTotal((prev) => parseFloat(prev) + parseFloat(stock.currentValue));
                });

            })
            .catch(error =>{
                console.log(error);
            })

            apiClient.get('/api/revenue').then(response => {

                // initialise ['total'] so we can sum it below
                initialState['total'] = 0;

                Object.keys(response.data[0]).map((key, index) => {
                    //key = name revenue, response.data[0][key] = value revenue
                    if (key !== 'id' && key !== 'created_at' && key !== 'updated_at'){
                        // set revenue type to initial state as key value pair
                        initialState[key] = response.data[0][key];
                        // sum up values to total
                        initialState['total'] += parseFloat(response.data[0][key]);
                    }
                });

            })
            .catch(error => {
                console.log(error);
            })

        }
        fetchData()
        
        .catch(console.error);
        
    }, [])
    
    function handleChange(event){
        
        // get value and name attributes from event
        const {value, name} = (event.target);
        if (name === 'boaChecking'){

            setBoaChecking(value);
        }
        if (name === 'boaSavings'){
            setBoaSavings(value);
        }
        if (name === 'ameritrade'){
            setAmeritrade(value);
        }
        if (name === 'becuChecking'){
            setBecuChecking(value);
        }
        if (name === 'becuSavings'){
            setBecuSavings(value);
        }
        if (name === 'americanExpress'){
            setAmericanExpress(value);
        }
        if (name === 'iBond'){
            setIBond(value);
        }
        if (name === 'barclays'){
            setBarclays(value);
        }
        if (name === 'crypto'){
            setCrypto(value);
        }
    }

    function handleSubmit(event){
        event.preventDefault();
        // create object with revenue data to pass to laravel
        var revenueData = {
            boaChecking: boaChecking,
            boaSavings: boaSavings,
            becuChecking: becuChecking,
            becuSavings: becuSavings,
            americanExpress: americanExpress,
            ameritrade: ameritrade,
            barclays: barclays,
            crypto: crypto,
            iBond: iBond
        }

        //stringify data so that it can be used in laravel
        revenueData = JSON.stringify(revenueData);
        
        apiClient.get(`/api/revenue/${revenueData}`).then(response => {
            console.log(response);
            //return to stock orders page
            navigate('/stockManager');
        })
        .catch(error => {
            console.error(error);
            alert('Error in updating order');
        });
    }

    return (
        <div>
            <NavLink className='nav-links remove-link-underline' to='/stockManager'><h2>Stock Manager</h2></NavLink>
            < Navigation />

            {/* SHOW INPUTS FOR CASH / NON STOCKS AND TOTAL CASH HELD BY ME ONLY */}
            
            {isStockManager ? (
                <form onSubmit={e => handleSubmit(e)}>
                <div className="stockmanager-table">
                        <div className="stockmanager-col-type">
                            <label className="label-padding">Type</label>
                        </div>
                        <div className="stockmanager-col">
                            <label className="label-padding">Amount</label>
                        </div>
                        <div className="stockmanager-col">
                        </div>
                </div>

                <div className="stockmanager-table">
                    <div className="stockmanager-col-type">
                        <label className="label-padding">Bank of America Checking</label>
                    </div>
                    <div className="stockmanager-col">
                        ${initialState.boaChecking}
                    </div>
                    <div className="stockmanager-col">
                        <input className="stockmanager-input"   
                            type="text" 
                            name="boaChecking" 
                            value={initialState.boaChecking}
                            onChange={e => handleChange(e)}
                        />
                    </div>
                </div>

                <div className="stockmanager-table">
                    <div className="stockmanager-col-type">
                        <label className="label-padding">Bank of America Savings</label>
                    </div>
                    <div className="stockmanager-col">
                        ${initialState.boaSavings}
                    </div>
                    <div className="stockmanager-col">
                        <input className="stockmanager-input"   
                            type="text" 
                            name="boaSavings" 
                            value={initialState.boaSavings}
                            onChange={e => handleChange(e)}
                        />
                    </div>
                </div>

                <div className="stockmanager-table">
                    <div className="stockmanager-col-type">
                        <label className="label-padding">Ameritrade Balance</label>
                    </div>
                    <div className="stockmanager-col">
                        ${initialState.ameritrade}
                    </div>
                    <div className="stockmanager-col">
                        <input className="stockmanager-input"   
                            type="text" 
                            name="ameritrade" 
                            value={initialState.ameritrade}
                            onChange={e => handleChange(e)}
                        />
                    </div>
                </div>

                <div className="stockmanager-table">
                    <div className="stockmanager-col-type">
                        <label className="label-padding">BECU Checking</label>
                    </div>
                    <div className="stockmanager-col">
                        ${initialState.becuChecking}
                    </div>
                    <div className="stockmanager-col">
                        <input className="stockmanager-input"   
                            type="text" 
                            name="becuChecking" 
                            value={initialState.becuChecking}
                            onChange={e => handleChange(e)}
                        />
                    </div>
                </div>

                <div className="stockmanager-table">
                    <div className="stockmanager-col-type">
                        <label className="label-padding">BECU Savings</label>
                    </div>
                    <div className="stockmanager-col">
                        ${initialState.becuSavings}
                    </div>
                    <div className="stockmanager-col">
                        <input className="stockmanager-input"   
                            type="text" 
                            name="becuSavings" 
                            value={initialState.becuSavings}
                            onChange={e => handleChange(e)}
                        />
                    </div>
                </div>

                <div className="stockmanager-table">
                    <div className="stockmanager-col-type">
                        <label className="label-padding">American Express Savings</label>
                    </div>
                    <div className="stockmanager-col">
                        ${initialState.americanExpress}
                    </div>
                    <div className="stockmanager-col">
                        <input className="stockmanager-input"   
                            type="text" 
                            name="americanExpress" 
                            value={initialState.americanExpress}
                            onChange={e => handleChange(e)}
                        />
                    </div>
                </div>

                <div className="stockmanager-table">
                    <div className="stockmanager-col-type">
                        <label className="label-padding">IBond</label>
                    </div>
                    <div className="stockmanager-col">
                        ${initialState.ibond}
                    </div>
                    <div className="stockmanager-col">
                        <input className="stockmanager-input"   
                            type="text" 
                            name="iBond" 
                            value={initialState.ibond}
                            onChange={e => handleChange(e)}
                        />
                    </div>
                </div>

                <div className="stockmanager-table">
                    <div className="stockmanager-col-type">
                        <label className="label-padding">Barclays</label>
                    </div>
                    <div className="stockmanager-col">
                        ${initialState.barclays}
                    </div>
                    <div className="stockmanager-col">
                        <input className="stockmanager-input"   
                            type="text" 
                            name="barclays" 
                            value={initialState.barclays}
                            onChange={e => handleChange(e)}
                        />
                    </div>
                </div>

                <div className="stockmanager-table">
                    <div className="stockmanager-col-type">
                        <label className="label-padding">Crypto</label>
                    </div>
                    <div className="stockmanager-col">
                        ${initialState.crypto}
                    </div>
                    <div className="stockmanager-col">
                        <input className="stockmanager-input"   
                            type="text" 
                            name="crypto" 
                            value={initialState.crypto}
                            onChange={e => handleChange(e)}
                        />
                    </div>
                </div>
        
                <div className='submit-align-right'>
                    <input type="submit" value="Update"></input>
                </div>

            <h4>Edmund's Stock Total ${investmentTotal.toFixed(3)}</h4>
            <h4>Edmund's Revenue Total ${initialState.total}</h4>    
            <h4>Edmund's Total ${(investmentTotal + initialState.total).toFixed(3)}</h4>
            </form>
            ) : (<div></div>)}
            
            
        </div>
    );
};
export default Index;