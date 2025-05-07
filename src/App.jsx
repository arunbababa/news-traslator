import { useState } from "react"
import { Navbar } from "./Components/Navbar"
import { NewsBorad } from "./Components/NewsBorad"

const App = () => {

  const [category, setCategory] = useState("general");

  return (
    <div>
      <Navbar setCategory={setCategory} />
      <NewsBorad category={category} />
    </div>

  )
}

export default App