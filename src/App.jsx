import { useEffect, useRef, useState } from "react"
import Navbar from "./components/Navbar"


function App() {
  const [form, setForm] = useState({ site: "", username: "", password: "" })
  const [PassArray, setPassArray] = useState([])
  const passwordRef = useRef()

  useEffect(() => {
    let passowords = localStorage.getItem("password")

    if (passowords) {
      setPassArray(JSON.parse(passowords))
    }
  }, [])


  const togglePassword = () => {
    if (passwordRef.current.type === "password") {
      passwordRef.current.type = "text"
    }
    else {
      passwordRef.current.type = "password"
    }
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const submitForm = () => {
    setPassArray([...PassArray, {...form, id: Math.random()}])
    localStorage.setItem("password", JSON.stringify([...PassArray, {...form, id: Math.random()}]))
  }

  const deletePass = (id) => {
    let newPassArray = PassArray.filter(item=>{
      return item.id != id
    })

    setPassArray(newPassArray)
    localStorage.setItem("password", JSON.stringify(newPassArray))
  }
  
  let copy = (text) => {
    navigator.clipboard.writeText(text)
  }
  

  return (
    <>
      <Navbar />

      <div className="container mx-auto bg-gray-400 mt-5 sm:rounded-2xl min-h-[80vh] pb-1.5 text-white">

        <div className="mx-2.5">
          <div className="add">

            <h1 className="text-2xl font-bold text-center">Add Password</h1>

            <div className="flex flex-wrap gap-2.5 w-full justify-center mt-2.5">

              <input name="site" onChange={handleChange} value={form.site} type="text" className="bg-white w-[500px] border-black border-2 rounded-full text-black pl-1" placeholder="Website URL" />
              <input name="username" onChange={handleChange} value={form.username} type="text" className="bg-white w-[500px] border-black border-2 rounded-full text-black pl-1" placeholder="Username" />

              <div className="relative inline">
                <input ref={passwordRef} name="password" onChange={handleChange} value={form.password} type="password" className="bg-white w-[300px] border-black border-2 rounded-full text-black pl-1" placeholder="Password" />
                <img onClick={togglePassword} src="/public/eye.gif" alt="Show" className="absolute top-[2px] right-[13px] size-6 cursor-pointer" />
              </div>

            </div>

            <div className="flex justify-center mt-1.5">
              <button onClick={submitForm} className="text-2xl cursor-pointer bg-green-700 hover:bg-green-600 text-white rounded-full px-5">Save</button>
            </div>

          </div>

          <div className="w-full mt-2.5">
            <h1 className="text-2xl font-bold">Your Passwords </h1>

            {PassArray.length == 0 && <div>Not any password.</div>}

            {PassArray.length != 0 &&
              <table className="w-[100%] text-center">
                <thead className="bg-green-500 text-white">
                  <tr>
                    <th>Site</th>
                    <th>Username</th>
                    <th>Password</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody className="bg-green-400">
                  {PassArray.map(item => {
                    return (<tr key={item.id} className="mt-10">
                      <td className="overflow-hidden"><a href={item.site}>{item.site}</a></td>
                      <td className="overflow-hidden cursor-pointer" onClick={()=>{copy(item.username)}}>{item.username}</td>
                      <td className="overflow-hidden cursor-pointer" onClick={()=>{copy(item.passoword)}}>{item.password}</td>
                      <td className="overflow-hidden"><button className="mt-1 bg-red-600 px-2 rounded-full hover:bg-red-500 cursor-pointer" onClick={()=> {deletePass(item.id)}}>Delete</button></td>
                    </tr>)
                  })}
                </tbody>
              </table>}
          </div>
        </div>
      </div>
    </>
  )
}

export default App
