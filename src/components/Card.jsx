import { Link } from "react-router-dom"
import dayjs from "dayjs"
import "animate.css"

function Card(props){
    var date = new Date(props.date_created)
    return (
        <article className="animate__animated animate__fadeInUp">
            <Link to={`/paste/${props.unique_id}`} style={{fontSize: "1.5rem",textDecoration: "none"}}>{props.title}</Link>
            <span style={{display: "block"}}>
                Language : <Link to={`/${props.language}`}>{props.language}</Link> 
            </span>
            <footer className="date">
                <i className="fas fa-clock" style={{paddingRight: "10px"}}></i>
                {dayjs(date).format("DD MMM,YYYY")}
            </footer>
        </article>
    )
}

export default Card