import { PlayerOptions } from "./singleplayer.options.styles"

export const MultiPlayerOptions = ({state,handleInput}) => {
    const { singlePlayer,clientId } = state

    const copyInvite = () => {
        const inviteURL = 
        navigator.clipboard.writeText(`${window.location.origin}/#/game=checkergame/id=${clientId}/rotation=0/singleplayer=${state.singlePlayer}`)
        handleInput('clientId',clientId) // Makes certain shared games will use same id
    }

    return (
        <PlayerOptions>
            {/* <button
                style={{
                    position:'relative',
                    zIndex:'110',
                }}
                onClick={() => handleInput('singlePlayer',!state.singlePlayer)}
            >
                single player{singlePlayer ? ' on' : ' off'}
            </button> */}
            {
                !singlePlayer &&
                <button onClick={() => copyInvite()}>invite</button>
            }
        </PlayerOptions>
    )
}