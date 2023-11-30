import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Plot from 'react-plotly.js';

function MtBrunoElevation() {
    const [zData, setZData] = useState([]);

    useEffect(() => {
        axios.get('https://raw.githubusercontent.com/plotly/datasets/master/api_docs/mt_bruno_elevation.csv')
            .then(response => {
                const rows = response.data.split('\n').map(row => row.split(','));
                const unpackedData = [];

                for (let i = 0; i < 24; i++) {
                    unpackedData.push(rows.map(row => parseFloat(row[i])));
                }

                setZData(unpackedData);
            })
            .catch(error => console.error('Error fetching data: ', error));
    }, []);

    return (
        <Plot
            data={[
                { z: zData, type: 'surface' }
            ]}
            layout={{
                title: 'Mt Bruno Elevation',
                autosize: false,
                width: 500,
                height: 500,
                margin: { l: 65, r: 50, b: 65, t: 90 },
            }}
        />
    );
}

export default MtBrunoElevation;
