import { useState } from "react"

type CarefulCloseType = {
    header: string
    msg: string
}

type IWindowProps = {
    title_bar_text: string
    width: string
    close?: boolean
    close_careful?: CarefulCloseType
    close_override?: () => void
    maximize?: boolean
    startSmall?: boolean
    children?: any
}

function Window({title_bar_text, width, close, close_careful, close_override, maximize, startSmall, children}: IWindowProps) {
    const [big, setBig] = useState(startSmall ? false : true)
    const [rm, setRm] = useState(false)
    const [cClose, setCClose] = useState(close_careful?false:true)
    
    if (cClose && rm) {
        if (close_override) {
            close_override()
        } else {
            return <></>
        }
    }

    return(
        <div className="window shrunk relative" style={{
            width: `${width}`
        }}>
            <div className="title-bar">
                <div className="title-bar-text">{title_bar_text}</div>
                <div className="title-bar-controls">
                    {
                        maximize ? <button aria-label={!big ? "Maximize" : "Minimize"} onClick={() => setBig(!big)}></button> : <></>
                    }
                    {
                        close ? <button aria-label="Close" onClick={() => setRm(true)}></button> : <></>
                    }
                </div>
            </div>
            <div className="window-body" hidden={!big}>
                {children}
                {
                    close_careful && rm
                    ? <div className="popup">
                            <Window title_bar_text={close_careful.header} width="100%" close close_override={() => setRm(false)}>
                                <p>{close_careful.msg}</p>
                                <div className="flex fe">
                                    <button onClick={() => setCClose(true)}>Delete</button>
                                    <button onClick={() => setRm(false)}>Cancel</button>
                                </div>
                            </Window>
                        </div>
                    : <></>
                }
            </div>
        </div>
    )
}

export default Window