import React, { useState, useEffect } from 'react'
import { TopAlert } from './TopAlert';


export const Table = () => {

    const [myState, setState] = useState({
        loading: true,
        data: [],
        visited: false,
        count: 60
    });

    useEffect(() => {

        setTimeout(() => {
            async function fetchData() {
                let url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=INR&order=market_cap_desc&per_page=100&page=1&sparkline=false`;
                setState({
                    loading: { visited: true ? false : true },
                    visited: true,
                });
                let fetch_data = await fetch(url);
                let parsedData = await fetch_data.json();

                setState({
                    
                    data: parsedData,
                    loading: false,
                    visited: true,
                    count: 60
                });

            }

            fetchData();
        }, myState.visited ? 60000 : 100)

    })


    return (
        <>
            <TopAlert message={`Page will update in ${myState.count} seconds!`} />

            <div className="container">

                <h2>Cryptocurrency Prices</h2>
                <table className="table table-hover my-4 text-start">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Coin</th>
                            <th scope="col"></th>
                            <th scope="col">Price</th>
                            <th scope="col">Price Change(24 Hour)</th>
                            <th scope="col">Market Cap</th>

                        </tr>
                    </thead>

                    <tbody>
                        {!(myState.loading) && myState.data.map((element) => {
                            return (
                                <tr key={element.symbol}>
                                    <th scope="row">{element.market_cap_rank}</th>
                                    <td><img src={element.image} alt="" width="20" height="20" className="d-inline-block align-text-top" />{element.name}</td>
                                    <td>{element.symbol.toUpperCase()}</td>
                                    <td>₹ {element.current_price}</td>
                                    <td style={element.price_change_percentage_24h > 0 ? { color: "green" } : { color: "red" }}>{element.price_change_percentage_24h}%</td>
                                    <td>₹ {element.market_cap}</td>
                                </tr>
                            )
                        })}


                    </tbody>
                </table>
                {myState.loading && (

                    <div className="text-center">
                        <div className="spinner-border" role="status">
                            <span className="sr-only"></span>
                        </div>
                    </div>

                )}
            </div>
        </>
    )
}
