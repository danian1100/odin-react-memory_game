export default function Card({id, name, image, handleOnClick}){
    return (
            <div className="card" onClick={() => handleOnClick(id)}
                style={{border: '2px solid', margin: '10px', 
                    backgroundColor: 'grey'}}
                >
                <h2>{name}</h2>
                <img src={image} alt={name} />
            </div>
    )
}