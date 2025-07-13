import { useState } from "react"
// export interface ITicketOpt {
//     type: string
//     title: string
//     options?: string[]
//     validation?: IValidation
//     value?: string
//     default?: string
// }

interface IProps {
    addFieldHandler: (formData: FormData, type: string) => void
}

interface IBuilderProps {
    setLocked: React.Dispatch<React.SetStateAction<boolean>>
}

function TextInputBuilder({setLocked}: IBuilderProps) {
    return <div>
        <div className="field-row">
            <p>Type: <b>Text Input</b></p>
                <button onClick={(e) => {
                    e.preventDefault()
                    setLocked(false)
                }}>Change</button>
            </div>
            <label htmlFor="fieldTitle">Enter Title</label>
            <input required id="fieldTitle" type="text" name="title" />
            <fieldset>
                <legend>Options</legend>
                <div className="field-row">
                    <input type="checkbox" id="fieldOptShort" name="short" />
                    <label htmlFor="fieldOptShort">Half Text Box Size</label>
                </div>
            </fieldset>
            <br></br>
            <fieldset>
                <legend>Validation</legend>
                <div className="field-row">
                    <input type="checkbox" id="fieldValOptional" name="optional" />
                    <label htmlFor="fieldValOptional">Optional</label>
                </div>
                <div className="field-row">
                    <label htmlFor="fieldValMin">Min Length</label>
                    <input id="fieldValMin" type="number" name="minLength" />
                    <label htmlFor="fieldValMax">Max Length</label>
                    <input id="fieldValMax" type="number" name="maxLength" />
                </div>
                <div className="field-row">
                    <label htmlFor="fieldValRgx">Regex Pattern</label>
                    <input id="fieldValRgx" type="text" name="pattern" />
                </div>
                <div className="field-row">
                    <label htmlFor="fieldValErr">Validation Failed Msg</label>
                    <input id="fieldValErr" type="text" name="errorMsg" />
                </div>
            </fieldset>
            <label htmlFor="default">Default Value</label>
            <input id="default" type="text" name="default" />
    </div>
}

function CheckboxBuilder({setLocked}: IBuilderProps) {
    return <div>
        <div className="field-row">
            <p>Type: <b>Check Box</b></p>
            <button onClick={(e) => {
                e.preventDefault()
                setLocked(false)
            }}>Change</button>
        </div>
        <label htmlFor="fieldTitle">Enter Title</label>
        <input required id="fieldTitle" type="text" name="title" />
    </div>
}

function MulitSelectBuilder({setLocked}: IBuilderProps) {
    const [count, setCount] = useState(2)

    return <div>
        <div className="field-row">
            <p>Type: <b>Multi Select</b></p>
            <button onClick={(e) => {
                e.preventDefault()
                setLocked(false)
            }}>Change</button>
        </div>
        <label htmlFor="fieldTitle">Enter Title</label>
        <input required id="fieldTitle" type="text" name="title" />
        <hr></hr>
        {
            [...Array(count).keys()].map((i) => <div className="field-row">
                <label htmlFor={`multiSelectOpt${i}`}>Option Name</label>
                <input required id={`multiSelectOpt${i}`} type="text" name={`option${i}`} />
            </div>)
        }
        <div className="field-row">
            <button onClick={(e) => {
                e.preventDefault()
                setCount(count+1)
            }}>Add Option</button>
            <button onClick={(e) => {
                e.preventDefault()
                setCount(count-1)
            }}>Remove Option</button>
        </div>
    </div>
}

function AddField({addFieldHandler}: IProps) {
    const [selected, setSelected] = useState("input")
    const [locked, setLocked] = useState(false)

    if (locked) {
        return <form action={(fd) => {
            addFieldHandler(fd, selected)
            setLocked(false)
        }}>
            {
                selected === "input"
                ? <TextInputBuilder setLocked={setLocked} /> :
                selected === "checkbox"
                ? <CheckboxBuilder setLocked={setLocked} /> :
                selected === "multi_select"
                ? <MulitSelectBuilder setLocked={setLocked}></MulitSelectBuilder> : <></>
            }
            <hr></hr>
            <input type="submit"></input>
        </form>
    } else {
        return <div>
        <select onChange={(e) => setSelected(e.target.value)}>
            <option selected={selected=="input"?true:false} value="input">Text Input</option>
            <option selected={selected=="multi_select"?true:false} value="multi_select">Multi Select</option>
            <option selected={selected=="checkbox"?true:false} value="checkbox">CheckBox</option>
        </select>
        <button onClick={(e) => {
            e.preventDefault()
            setLocked(true)
        }}>New Field</button>
    </div>
    }
}

export default AddField