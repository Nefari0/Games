import { CheckerMenu,ConfirmNewGame } from "./menu.styles"
import { useState } from "react"

export const Menu = ({newGame}) => {

    const [confirmNewGame,setConfirmNewGame] = useState(false)

    return (
        <CheckerMenu>
            <button onClick={() => setConfirmNewGame(!confirmNewGame)}>New Game</button>

            {confirmNewGame && <ConfirmNewGame>

                <h6>new game?</h6>

                <button 
                    onClick={() => {
                        newGame(true)
                        setConfirmNewGame(!confirmNewGame)}
                    }
                    >one player
                </button>

                <button 
                    onClick={() => {
                        newGame(false)
                        setConfirmNewGame(!confirmNewGame)}
                    }
                    >two player
                </button>
                    
                
                <button
                    onClick={() => setConfirmNewGame(!confirmNewGame)}
                    >cancel
                </button>

            </ConfirmNewGame>}
        </CheckerMenu>
    )
}