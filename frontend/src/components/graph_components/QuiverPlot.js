import React from 'react';
import Plot from 'react-plotly.js';

function QuiverPlot() {
    // Sample data for quiver plot
    const x = [1, 2, 3, 4];
    const y = [1, 2, 3, 4];
    const u = [1, 0, -1, 0];
    const v = [0, 1, 0, -1];

    return (
        <Plot
            data={[
                {
                    type: 'scatter',
                    x: x,
                    y: y,
                    mode: 'markers',
                    marker: { size: 12 }
                },
                {
                    type: 'quiver',
                    x: x,
                    y: y,
                    u: u,
                    v: v,
                    scale: 0.1,
                    arrowhead: 3
                }
            ]}
            layout={{
                title: 'Quiver Plot',
                width: 600,
                height: 600,
                xaxis: { range: [0, 5] },
                yaxis: { range: [0, 5] }
            }}
        />
    );
}

export default QuiverPlot;
