import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Chart } from "react-google-charts";

const ChartExample = () => {
    const [data, setData] = useState([]);

    const getData = async () => {
        const res = await axios("/shop/chart1");
        // console.log(res.data);
        var rows = [];
        rows.push(['상품코드', '댓글수'])
        res.data.forEach(row => rows.push([`[${row.pid}]`, row.count]));
        setData(rows);
    }

    useEffect(() => {
        getData();
    }, [])

    const options = {
        chart: {
            title: "상품별 댓글수"
        },
    };

    return (
        <div className='my-5'>
            <Chart
                chartType="Line"
                width="100%" height="400px"
                data={data}
                options={options} />
            <Chart
                chartType="Bar"
                width="100%" height="400px"
                data={data}
                options={options} />
            <Chart
                chartType="PieChart"
                width="100%" height="400px"
                data={data}
                options={options} />
        </div>
    )
}

export default ChartExample