import './App.css'

function App() {

  return (
    <>
        <div id="sidebar">
            <h2>Ссылки
                <a href={"/about"} style={{fontWeight: "lighter"}}>&nbsp;?&nbsp;</a>
            </h2>
            <nav>
                <ol>
                    <li>
                        <a href={"/uncontrolled.components.form"}>Uncontrolled components</a>
                    </li>
                    <li>
                        <a href={"/react.hook.form.components.form"}>React Hook Form</a>
                    </li>
                </ol>
            </nav>
        </div>
        <div id="detail"></div>
    </>
  )
}

export default App
