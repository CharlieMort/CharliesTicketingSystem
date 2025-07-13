import MultiSelect from "./MultiSelect"
import TextInput from "./TextInput"
import type { ITicketOpt } from "./CreateTicket"
import CheckBox from "./Checkbox"
import TabMenu from "./TabMenu"
import AddField from "./AddField"
import type { ITicketTemplate } from "../main_pages/ManageTickets"

interface IProps {
    opts: ITicketOpt[]
    classNames?: string
    setTemplate?: React.Dispatch<any>
}

function HandleOption(opt: ITicketOpt, setTemplate: React.Dispatch<any> | undefined = undefined) {
    switch(opt.type) {
        case "input":
            return <TextInput opt={opt} />
        case "multi_select":
            return <MultiSelect opt={opt} />
        case "checkbox":
            return <CheckBox opt={opt} />
        case "add_field":
            if (!setTemplate) {
                console.error("Cant add field if we cant update the template - Set setTemplate you idiot")
                return
            }
            return <AddField opt={opt} setTemplate={setTemplate} />
    }
}

function Options({opts, classNames, setTemplate}: IProps) {    
    return <div className={`wfull flex fw sb ${classNames}`}>
        {
            opts.map((opt, idx) => {
                if (opt.type != "tabs") {
                    return HandleOption(opt, setTemplate)
                } else if (opt.type === "tabs" && opt.options) {
                    return <TabMenu tabNames={opt.options?opt.options:[]}>
                        {
                            opt.options.map((tabName, idx) => {
                                return <div>
                                    {
                                        opts.map((option) => {
                                            console.log(option.type)
                                            // console.log(`${opt.title}/${tabName}/`)
                                            if (option.type.startsWith(`${opt.title}/${tabName}/`)) {
                                                let newOpt = JSON.parse(JSON.stringify(option))
                                                newOpt.type = newOpt.type.split(`${opt.title}/${tabName}/`)[1]
                                                return HandleOption(newOpt, setTemplate)
                                            }

                                            return <></>
                                        })
                                    }
                                </div>
                            })
                        }
                    </TabMenu>
                }
            })
        }
    </div>
}

export default Options