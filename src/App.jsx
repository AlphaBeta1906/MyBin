import { lazy,Suspense } from "react"
import { BrowserRouter,Routes,Route } from "react-router-dom"
import NavBar from "./components/Nav"

const NewPaste = lazy(function(){
  return import("./components/NewPaste")
})

const Home = lazy(function(){
  return import("./components/Home")
})

const Paste = lazy(function(){
  return import("./components/Paste")
})

function App() {
    return (    
      <div>
          <BrowserRouter forceRefresh={true}>
            <NavBar/>
              <div className="container" >
                <Suspense fallback={<center><span aria-busy={true}></span></center>}>
                    <Routes>
                        <Route exact path="/" element={<Home/>} />
                        <Route path="/newpaste" element={<NewPaste/>} />
                        <Route path="/paste/:id" element={<Paste/>} />
                    </Routes>              
                </Suspense>
              </div>
          </BrowserRouter>
    </div>
    )
}

export default App