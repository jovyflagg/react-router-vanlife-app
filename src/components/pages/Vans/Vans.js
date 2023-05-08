import React from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import "../../../server"
import { type } from '@testing-library/user-event/dist/type'
// import { useNavigate } from "react-router-dom";



export const Vans = () => {
    // const navigate = useNavigate();

    const [searchParams, setSearchParams] = useSearchParams()
    const [vans, setVans] = React.useState([])

    const typeFilter = searchParams.get("type")

    React.useEffect(() => {
        fetch("/api/vans")
            .then(res => res.json())
            .then(data => setVans(data.vans))
    }, [])

    const displayedVans = typeFilter
        ? vans.filter(van => van.type === typeFilter)
        : vans

    const vanElements = displayedVans.map(van => (

        <div key={van.id} className="van-tile">

            {/* <button onClick={() => navigate(`/react-router-vanlife/vans/${van.id}`)}> */}
            <Link to={`/vans/${van.id}`}>
                <img src={van.imageUrl} alt='van' />
                <div className="van-info">
                    <h3>{van.name}</h3>
                    <p>${van.price}<span>/day</span></p>
                </div>
                <i className={`van-type ${van.type} selected`}>{van.type}</i>
            </Link>
        </div>
    ))

    function handleFilterChange(key, value) {
        setSearchParams(prevParams => {
            if (value === null) {
                prevParams.delete(key)
            } else {
                prevParams.set(key, value)
            }
            return prevParams
        })
    }

    return (
        <div className="van-list-container">
            <h1>Explore our van options</h1>
            <div className='van-list-filter-buttons'>

                <button
                    onClick={() => handleFilterChange("type", "simple")}
                    className={`van-type simple ${typeFilter === "simple" ? "selected" : ""}`}
                >Simple</button>
                <button
                    onClick={() => handleFilterChange("type", "rugged")}
                    className={`van-type rugged ${typeFilter === "rugged" ? "selected" : ""}`}
                >Rugged</button>
                <button
                    onClick={() => handleFilterChange("type", "luxury")}
                    className={`van-type luxury ${typeFilter === "luxury" ? "selected" : ""}`}
                >Luxury</button>
                {typeFilter ?
                    (<button
                        onClick={() => handleFilterChange("type", null)}
                        className='van-type clear-filters'
                    >Clear filter
                    </button>
                    ) : null}

                {/* <Link  to="?type=simple">Simple</Link>
                <Link className='van-type rugged' to="?type=rugged">Rugged</Link>
                <Link className='van-type luxury' to="?type=luxury">Luxury</Link>
                <Link className='van-type clear-filters' to=".">Clear Filter</Link> */}
            </div>
            <div className="van-list">
                {vanElements}
            </div>
        </div >
    )
}