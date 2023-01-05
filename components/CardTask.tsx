import React from 'react'

function CardTask() {
    return (
        <div className="card card-compact w-full bg-base-100 shadow-xl">
            <figure><img src="https://placeimg.com/400/225/arch" alt="Shoes" /></figure>
            <div className="card-body">
                <div className="card-actions justify-between">
                    <h2 className="card-title">Shoes!</h2>
                    <button className="btn btn-sm btn-primary">Buy Now</button>
                </div>
                <p>If a dog chews shoes whose shoes does he choose?</p>
            </div>
        </div>
    )
}

export default CardTask