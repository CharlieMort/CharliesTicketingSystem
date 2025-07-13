import { Children, useState } from "react"

interface IProps {
    tabNames: string[]
    children: any
}

function TabMenu({tabNames, children}: IProps) {
    const [selectedTab, setSelectedTab] = useState(0)

    return <div>
        <menu role="tablist">
            {
                tabNames.map((name, idx) => {
                    return <li role="tab" aria-selected={idx==selectedTab} onClick={() => setSelectedTab(idx)}>{name}</li>
                })
            }
        </menu>
        <div className="window" role="tabpanel">
            <div className="window-body">
                {
                    Children.toArray(children).map((child, idx) => {
                        return <div style={{
                            display: idx!==selectedTab?"none":"block"
                        }}>
                            {child}
                        </div>
                    })
                }
            </div>
        </div>
    </div>
}

export default TabMenu