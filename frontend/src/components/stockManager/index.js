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
    const [revenue, setRevenue] = useState(0);
    
    var isStockManager = false;
    location.pathname === '/stockManager' ? isStockManager = true : isStockManager = false; 

    useEffect(() =>{
       
        const fetchData = async () => { 
            apiClient.get('/api/showAll/Edmund').then(response => {
                
                response.data.map( function(stock) {
                    setInvestmentTotal((prev) => parseFloat(prev) + parseFloat(stock.currentValue));
                });
            
                console.log(investmentTotal);
            })
            .catch(error =>{
                console.log(error);
            })

            apiClient.get('/api/revenue').then(response => {
                console.log(response);
                var total = 0.00;
                setBoaChecking(response.data[0].boaChecking);
                total += response.data[0].boaChecking;
                setBoaSavings(response.data[0].boaSavings);
                total += response.data[0].boaSavings;
                setBecuChecking(response.data[0].becuChecking);
                total += response.data[0].becuChecking;
                setBecuSavings(response.data[0].becuSavings);
                total += response.data[0].becuSavings;
                setAmericanExpress(response.data[0].americanExpress);
                total += response.data[0].americanExpress;
                setAmeritrade(response.data[0].ameritrade);
                total += response.data[0].ameritrade;
                setBarclays(response.data[0].barclays);
                total += response.data[0].barclays;
                setCrypto(response.data[0].crypto);
                total += response.data[0].crypto;
                setIBond(response.data[0].ibond);
                total += response.data[0].ibond;

                setRevenue(total);

                response.data.map( function(revenue, i){
                    console.log(revenue);
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
                        ${boaChecking}
                    </div>
                    <div className="stockmanager-col">
                        <input className="stockmanager-input"   
                            type="text" 
                            name="boaChecking" 
                            value={boaChecking}
                            onChange={e => handleChange(e)}
                        />
                    </div>
                </div>

                <div className="stockmanager-table">
                    <div className="stockmanager-col-type">
                        <label className="label-padding">Bank of America Savings</label>
                    </div>
                    <div className="stockmanager-col">
                        ${boaSavings}
                    </div>
                    <div className="stockmanager-col">
                        <input className="stockmanager-input"   
                            type="text" 
                            name="boaSavings" 
                            value={boaSavings}
                            onChange={e => handleChange(e)}
                        />
                    </div>
                </div>

                <div className="stockmanager-table">
                    <div className="stockmanager-col-type">
                        <label className="label-padding">Ameritrade Balance</label>
                    </div>
                    <div className="stockmanager-col">
                        ${ameritrade}
                    </div>
                    <div className="stockmanager-col">
                        <input className="stockmanager-input"   
                            type="text" 
                            name="ameritrade" 
                            value={ameritrade}
                            onChange={e => handleChange(e)}
                        />
                    </div>
                </div>

                <div className="stockmanager-table">
                    <div className="stockmanager-col-type">
                        <label className="label-padding">BECU Checking</label>
                    </div>
                    <div className="stockmanager-col">
                        ${becuChecking}
                    </div>
                    <div className="stockmanager-col">
                        <input className="stockmanager-input"   
                            type="text" 
                            name="becuChecking" 
                            value={becuChecking}
                            onChange={e => handleChange(e)}
                        />
                    </div>
                </div>

                <div className="stockmanager-table">
                    <div className="stockmanager-col-type">
                        <label className="label-padding">BECU Savings</label>
                    </div>
                    <div className="stockmanager-col">
                        ${becuSavings}
                    </div>
                    <div className="stockmanager-col">
                        <input className="stockmanager-input"   
                            type="text" 
                            name="becuSavings" 
                            value={becuSavings}
                            onChange={e => handleChange(e)}
                        />
                    </div>
                </div>

                <div className="stockmanager-table">
                    <div className="stockmanager-col-type">
                        <label className="label-padding">American Express Savings</label>
                    </div>
                    <div className="stockmanager-col">
                        ${americanExpress}
                    </div>
                    <div className="stockmanager-col">
                        <input className="stockmanager-input"   
                            type="text" 
                            name="americanExpress" 
                            value={americanExpress}
                            onChange={e => handleChange(e)}
                        />
                    </div>
                </div>

                <div className="stockmanager-table">
                    <div className="stockmanager-col-type">
                        <label className="label-padding">IBond</label>
                    </div>
                    <div className="stockmanager-col">
                        ${iBond}
                    </div>
                    <div className="stockmanager-col">
                        <input className="stockmanager-input"   
                            type="text" 
                            name="iBond" 
                            value={iBond}
                            onChange={e => handleChange(e)}
                        />
                    </div>
                </div>

                <div className="stockmanager-table">
                    <div className="stockmanager-col-type">
                        <label className="label-padding">Barclays</label>
                    </div>
                    <div className="stockmanager-col">
                        ${barclays}
                    </div>
                    <div className="stockmanager-col">
                        <input className="stockmanager-input"   
                            type="text" 
                            name="barclays" 
                            value={barclays}
                            onChange={e => handleChange(e)}
                        />
                    </div>
                </div>

                <div className="stockmanager-table">
                    <div className="stockmanager-col-type">
                        <label className="label-padding">Crypto</label>
                    </div>
                    <div className="stockmanager-col">
                        ${crypto}
                    </div>
                    <div className="stockmanager-col">
                        <input className="stockmanager-input"   
                            type="text" 
                            name="crypto" 
                            value={crypto}
                            onChange={e => handleChange(e)}
                        />
                    </div>
                </div>
        
                <div className='submit-align-right'>
                    <input type="submit" value="Update"></input>
                </div>

            <h4>Edmund's Stock Total ${investmentTotal.toFixed(3)}</h4>
            <h4>Edmund's Revenue Total ${revenue.toFixed(3)}</h4>    
            <h4>Edmund's Total ${(investmentTotal + revenue).toFixed(3)}</h4>
            </form>
            ) : (<div></div>)}
            
            
        </div>
    );
};
export default Index;