import AddField from "./AddField";
import Window from "./Window";
import empty_template from "../tickets/empty_template.json"
import { useState } from "react";
import TabMenu from "./TabMenu";
import type { ITicketTemplate } from "../main_pages/ManageTickets";

interface IValidation {
    maxLength?: number
    minLength?: number
    pattern?: string
    optional?: boolean
    errorMsg: string
}
export interface ITicketOpt {
    type: string
    title: string
    options?: string[]
    validation?: IValidation
    value?: string
    default?: string
}

interface IProps {
    closeHandler?: () => void
    PostTemplate: (template: ITicketTemplate, title: string) => void
}

function CreateTemplate({closeHandler, PostTemplate}: IProps) {
    const [template, setTemplate] = useState<ITicketTemplate>(JSON.parse(JSON.stringify(empty_template)))
    const [title, setTitle] = useState("")

    function addFieldHandler(formData: FormData, type: string) {
        let form = Object.fromEntries(formData.entries())
        console.log(form)
        
        let newTicketOpt: ITicketOpt = {
            title: form.title.toString(),
            type: type,
            value: "",
            default: form.default?.toString(),
            options: [],
            validation: form.errorMsg ? {
                maxLength: form.maxLength?parseInt(form.maxLength.toString()):undefined,
                minLength: form.minLength?parseInt(form.minLength.toString()):undefined,
                pattern: form.pattern?form.pattern.toString():undefined,
                optional: form.optional?true:false,
                errorMsg: form.errorMsg.toString()
            } : undefined
        }

        switch(type) {
            case "input":
                if (form.short && newTicketOpt.options) {
                    newTicketOpt.options.push("short")
                }
                break;
            case "multi_select":
                let i = 0;
                newTicketOpt.options = []
                console.log("options")
                while (Object.hasOwn(form, `option${i}`)) {
                    newTicketOpt.options.push(form[`option${i}`].toString())
                    i++
                }
                break;
        }

        let newTemplate = JSON.parse(JSON.stringify(template))
        console.log(newTemplate)
        newTemplate.opts.push(newTicketOpt)

        setTemplate(newTemplate)
    }

    return <Window title_bar_text={`Create Template`} width="100%" maximize close close_careful={{header:"Discard Template ?", msg: "Are you sure ?"}} close_override={closeHandler}>
        <h3>Create Template</h3>
        <div>
            <label htmlFor="templateTitle">Enter Template Name</label>
            <input required id="templateTitle" type="text" name="title" value={title} onChange={(e) => setTitle(e.target.value)}/>
            <hr></hr>
            <TabMenu tabNames={["Fields"]}>
                <div>
                    <p>Options</p>
                    {
                        template.opts?.map((opt) => {
                            return <p>{opt.title} - {opt.type}</p>
                        })
                    }
                    <AddField addFieldHandler={addFieldHandler} />
                </div>
            </TabMenu>
            <hr></hr>
            <input type="submit" onClick={() => PostTemplate(template, title)}/>
            <input type="reset" onClick={() => setTemplate(JSON.parse(JSON.stringify(empty_template)))} />
        </div>
        
    </Window>
}


export default CreateTemplate