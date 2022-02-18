import { useEffect,useState,lazy } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"

const Card = lazy(function(){
    return import("./Card")
})



function Home(props){
    const [page,setPage] = useState(1)
    const [pastes,setBlog] = useState([])
    const [loading,setLoading] = useState(false)
    const [complete,setComplete] = useState(false)
    const tag_param = useParams().tag
    document.title = "Home"
    console.log(tag_param)
    useEffect(function(){
        setLoading(true)
        axios
        .get(`https://pastebincloneapi.pythonanywhere.com/api/v1/pastes?page=${page}`)
        .then(function(data){
            if (data.data.pastes.length === 0) {
                setComplete(true)
            }else{
                setBlog(oldArr => [...oldArr,...data.data.pastes])
            }
            setLoading(false)
            
        })
    },[page])

    function addPage(){
        setPage(page+1)
    }

    return (
        <div className="container">
            {
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
                        <button onClick={addPage}>Load more</button>
                        :
                        <span/>
                    }
                </div>
            }
        </div>
        
    )
}

export default Home