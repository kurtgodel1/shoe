import React, { useState } from 'react';
import Plot from 'react-plotly.js';

function ForceMassAnimation() {
    const [force, setForce] = useState(10);
    const [mass, setMass] = useState(2);
    const [position, setPosition] = useState(0);
    const [timer, setTimer] = useState(null);

    const calculateAcceleration = () => force / mass;

    const startAnimation = () => {
        if (timer) clearInterval(timer);
        
        let currentPosition = 0;
        let velocity = 0;
        const acceleration = calculateAcceleration();
        const newTimer = setInterval(() => {
            velocity += acceleration; // Increase velocity
            currentPosition += velocity; // Update position
            setPosition(currentPosition);

            if (currentPosition > 100) { // Arbitrary end condition
                clearInterval(newTimer);
            }
        }, 100); // Update every 100 milliseconds

        setTimer(newTimer);
    };

    return (
        <div>
            <input 
                type="number" 
                value={force} 
                onChange={(e) => setForce(Number(e.target.value))} 
                placeholder="Force (N)" 
            />
            <input 
                type="number" 
                value={mass} 
                onChange={(e) => setMass(Number(e.target.value))} 
                placeholder="Mass (kg)" 
            />
            <button onClick={startAnimation}>Start Animation</button>

            <Plot
                data={[
                    {
                        x: [position],
                        y: [0],
                        type: 'scatter',
                        mode: 'markers',
                        marker: { size: 12 }
                    }
                ]}
                layout={{ 
                    width: 720, 
                    height: 240, 
                    title: 'f=ma Animation', 
                    xaxis: { range: [-100, 100] },
                    yaxis: { range: [-10, 10] }
                }}            
            />
        </div>
    );
}

export default ForceMassAnimation;
