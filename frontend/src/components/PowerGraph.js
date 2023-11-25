import React, { useState } from 'react';
import Plot from 'react-plotly.js';
import Submit from './SubmitButton';

function PowerGraph() {
    const [n, setN] = useState(2); // Default power
    const [xData, setXData] = useState([]);
    const [yData, setYData] = useState([]);

    const fetchData = (event) => {
        event.preventDefault();
        fetch(`http://localhost:8000/api/calculate_power_function/?n=${n}`)
            .then(response => response.json())
            .then(data => {
                setXData(data.x);
                setYData(data.y);
            })
            .catch(error => console.error('Error:', error));
    };

    return (
        <div>
            <form onSubmit={fetchData}>
                <label>
                    Enter Power (n): 
                    <input 
                        type="number" 
                        value={n} 
                        onChange={(e) => setN(e.target.value)} 
                    />
                </label>
                <Submit />
            </form>
            <Plot
                data={[{
                    x: xData, 
                    y: yData, 
                    type: 'scatter', 
                    mode: 'lines+markers',
                    marker: {color: 'blue'}
                }]}
                layout={{ width: 720, height: 440, title: 'Graph of x^n' }}
            />
        </div>
    );
}

export default PowerGraph;
