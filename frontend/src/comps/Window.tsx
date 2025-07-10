import { useState } from "react"

type IWindowProps = {
    title_bar_text: string
    width: string
    close?: boolean
    maximize?: boolean
    startSmall?: boolean
    children?: any
}

function Window({title_bar_text, width, close, maximize, startSmall, children}: IWindowProps) {
    const [big, setBig] = useState(startSmall ? false : true)
    const [rm, setRm] = useState(false)

    if (rm) {
        return <></>
    }

    return(
        <div className="window shrunk" style={{
            width: `${width}`
        }}>
            <div className="title-bar">
                <div className="title-bar-text">{title_bar_text}</div>
                <div className="title-bar-controls">
                    {
                        maximize ? <button aria-label={big ? "Minimize" : "Maximize"} onClick={() => setBig(!big)}></button> : <></>
                    }
                    {
                        close ? <button aria-label="Close" onClick={() => setRm(true)}></button> : <></>
                    }
                </div>
            </div>
            <div className="window-body" hidden={!big}>
                {children}
            </div>
        </div>
    )
}

export default Window