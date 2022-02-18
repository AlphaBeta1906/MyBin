import { useNavigate } from "react-router-dom"
import { useState } from "react"
import axios from "axios"

function NewPaste(){
    document.title = "New paste"
    var redirect = useNavigate()    
    const [loading,setLoading] = useState(false)
    const [state,setState] = useState({
        title: "",
        code: "",
        language: "python"
    })
    function handleInput(e){
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }
    function submit(e){
        e.preventDefault()
        setLoading(true)
        setState({
            title: "",
            code: "",
            language: "python"
        })
        axios
        .post("https://pastebincloneapi.pythonanywhere.com/api/v1/paste",{
            title: state.title,
            code: state.code,
            language: state.language
        })
        .then(function(data){
            console.log(data.data.unique_id)
            redirect(`/paste/${data.data.unique_id}`)
        })
        .catch(function(error){
            console.log(error)
        })
    }

    return (
        <form onSubmit={submit} disabled>
            <label for="title">Title</label>
            <input 
            type="text" 
            name="title"
            value={state.title} 
            onInput={handleInput}
            placeholder="title of your paste" 
            required={true}
            id="title"/>
            <label for="language">Language</label>
            <select name="language" value={state.language} onChange={handleInput}>
                <option value="python">python</option>
                <option value="java">java</option>
                <option value="cpp">c++</option>
                <option value="c">c</option>
                <option value="c#">c#</option>
                <option value="ruby">ruby</option>
                <option value="go">go</option>
                <option value="rust">rust</option>
                <option value="jsx">jsx</option>
                <option value="typescript">typescript</option>
            </select>
            <label for="code">Code</label>
            <textarea 
            name="code" 
            value={state.code}
            onInput={handleInput}
            style={{height: "250px"}} 
            placeholder="your code here..." 
            required={true}
            >        
            </textarea>
            <button type="submit" aria-busy={loading}>create paste</button>
        </form>
    )
}

export default NewPaste