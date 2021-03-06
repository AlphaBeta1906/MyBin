import { useEffect,useState,lazy } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import { connectionError } from "../utils/utils"

const Card = lazy(function(){
    return import("./Card")
})



function Home(props){
    const [page,setPage] = useState(1)
    const [pastes,setPastes] = useState([])
    const [loading,setLoading] = useState(false)
    const [complete,setComplete] = useState(false)
    const [sort,setSort] = useState("latest")
    const [error,setError] = useState(false)
    var {language} = useParams()
    document.title = "Home"
    var url = language == undefined?`https://pastebincloneapi.pythonanywhere.com/api/v1/pastes/${sort}/`:`https://pastebincloneapi.pythonanywhere.com/api/v1/pastes/${sort}/${language}`

    function fetch(page=1){
        setLoading(true)
        axios
        .get(`${url}?page=${page}`)
        .then(function(data){
            if (data.data.pastes.length === 0) {
                setComplete(true)
            }else{
                setPastes(oldArr => [...oldArr,...data.data.pastes])
            }
            setLoading(false)
            
        }).catch(function(err){
            if(connectionError(err)){
                setError(true)
            }
            console.log(error)
        })
        
    }    

    useEffect(function(){
        setComplete(false)
        setPastes([])   
        setPage(1)
        fetch(1)
    },[language])


    useEffect(function(){
        setLoading(true)
        axios
        .get(url)
        .then(function(data){
            setPastes(data.data.pastes)
            setLoading(false)
        })
        .catch(function(err){
            connectionError(err)
        })
    },[sort])


    function addPage(){
        setPage(page+1)
        fetch(page === 1?2:page)
    }

    function changeShort(e){
        setLoading(true)
        setComplete(false)
        setPage(1)
        setSort(e.target.value)
    }
    return (
        <div className="container">
            <lavel htmlFor="sort">Sort</lavel>
            <select name="sort" value={sort} onChange={changeShort}>
                <option value="latest">Latest</option>
                <option value="oldest">oldest</option>
            </select>
            {
                error?
                <h1 style={{textAlign: "center"}}>
                    Conection error
                </h1>
                :
                loading && pastes.length <= 0?
                <center>
                    <span aria-busy="true" />
                </center>
                :
                <div>
                    {                
                            pastes.map(function(paste){                        
                            return (       
                                <Card
                                id={paste.id}
                                title={paste.title}
                                language={paste.language}
                                unique_id={paste.unique_id}
                                date_created={paste.date_created}
                                />
                            )
                        })
                    }
                    {
                        loading?
                        <center>
                            <span aria-busy="true" />
                        </center>
                        :
                        !complete && pastes.length >= 9?
                        <button onClick={addPage}>Load more </button>
                        :
                        <span/>
                    }
                </div>
            }
        </div>
        
    )
}

export default Home