import React from "react"

export interface IChoice {
    text: string,
    result: string
}

export interface IMultiChoiceProps {
    choice_title: string
    choices: IChoice[]
    submitHandler: (key: string, newVal: string) => void
    iden: string
}

const MultiChoice = ({choices, choice_title, submitHandler, iden}: IMultiChoiceProps) => {
    return (
        <div className="choice_wrapper">
            <div className="choices_wrapper">
                {
                    choices.map((choice: IChoice) => {
                        return(
                            <input type="button" value={choice.text} className={`choice_block num_blocks_${choices.length}`} onClick={(e) => submitHandler(iden, choice.result)}/>
                        )
                    })
                }
            </div>
            <h1 className="choice_title">^^ Select {choice_title} ^^</h1>
        </div>
    )
}

export default MultiChoice