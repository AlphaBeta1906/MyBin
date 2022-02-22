import { useState,useEffect,useContext } from "react"
import { useParams,Link } from "react-router-dom"
import { Prism as  SyntaxHighlighter} from "react-syntax-highlighter"
import { coldarkDark as darkTheme,coldarkCold as ligthTheme  } from "react-syntax-highlighter/dist/esm/styles/prism"
import axios from "axios"
import dayjs from "dayjs"
import CopyToClipboard from "react-copy-to-clipboard"
import { connectionError } from "../utils/utils"
import { useTheme } from "../utils/utils"

function Paste(){
    const [paste,setPaste] = useState({})
    const [raw,setRaw] = useState(false)
    const [error,setError] = useState(false)
    const [theme,setTheme] = useTheme()
    document.title = paste.title? paste.title:"MyBin"
    var {id} = useParams()

    useEffect(function(){
        axios
        .get(`https://pastebincloneapi.pythonanywhere.com/api/v1/paste/${id}`)
        .then(function(data){
            console.log(data.data)
            setPaste(data.data)            
            })
        .catch(function(err){
            setError(connectionError(err))
        })
    },[id])

    
    function rawset(){
        setRaw(!raw)
    }
    
    var date = new Date(paste.date_created)
    return (
        <article>
            <header>
                <h3 style={{marginBottom: "0px"}}>
                    {paste.title}
                </h3>
                <span>
                    Languge: <Link to={`/${paste.language}`}>{paste.language}</Link> 
                </span>
            </header>
            <div>
                <button onClick={rawset} data-tooltip="see raw">Raw</button>
                <CopyToClipboard text={paste.code}>
                    <button data-tooltip="copy syntax">Copy</button>
                </CopyToClipboard>
            </div>
            {
                error?
                <h1 style={{textAlign: "center"}}>
                    connection error
                </h1>
                :
                raw?
                <pre>
                    <code>{paste.code}</code>
                </pre>
                :
                paste.code?
                <SyntaxHighlighter 
                language={paste.language} 
                style={theme=="dark"?darkTheme:ligthTheme} 
                customStyle={{fontSize: "1.5em"}} 
                codeTagProps={{fontSize: "inherit"}}>
                    {paste.code}
                </SyntaxHighlighter>
                :
                <span aria-busy={true}></span>
            }
            <footer className="date">
                    <i className="fas fa-clock" style={{paddingRight: "10px"}}></i>
                    {dayjs(date).format("DD MMM,YYYY")}
            </footer>
        </article>
    )
}

export default Paste