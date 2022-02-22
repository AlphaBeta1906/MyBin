import { useState } from "react"
import u from "umbrellajs"
import { useTheme } from "../utils/utils"

function ThemeSwitch(){
    const [theme,setTheme] = useTheme()
    u("html").attr("data-theme",theme)
    function switchTheme(){
        u("html").attr("data-theme",theme)
        setTheme(theme == "dark"?"light":"dark")
    }
    return (
        <div className="theme" style={{height:"1rem",width:"1rem",textAlign: "center",cursor: "pointer",fontSize: "16pt"}} onClick={switchTheme}>
                {
                    theme == "dark"?
                        (
                            <i className="fas fa-sun"></i>
                        ):
                        (
                            <i className="fas fa-moon"></i>
                        )
                }
        </div>
    )
}

export default ThemeSwitch