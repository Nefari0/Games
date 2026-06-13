import { PlayerOptions } from "./singleplayer.options.styles"

export const MultiPlayerOptions = ({state,handleInput}) => {
    const { singlePlayer,clientId } = state

    const copyInvite = () => {
        navigator.clipboard.writeText(`${window.location.href.replace(/\d+$/, "0")}`)
        handleInput('clientId',clientId)
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