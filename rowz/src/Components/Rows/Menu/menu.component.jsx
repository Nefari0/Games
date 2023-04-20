import { CheckerMenu,ConfirmNewGame } from "./menu.styles"
import { useState } from "react"

export const Menu = ({newGame}) => {

    const [confirmNewGame,setConfirmNewGame] = useState(false)

    return (
        <CheckerMenu>
            <button onClick={() => setConfirmNewGame(!confirmNewGame)}>New Game</button>

            {confirmNewGame && <ConfirmNewGame>

                <h6>are you sure?</h6>

                <button 
                    onClick={() => {
                        newGame()
                        setConfirmNewGame(!confirmNewGame)}
                    }
                    >yes
                </button>
                    
                
                <button
                    onClick={() => setConfirmNewGame(!confirmNewGame)}
                    >no
                </button>

            </ConfirmNewGame>}
        </CheckerMenu>
    )
}