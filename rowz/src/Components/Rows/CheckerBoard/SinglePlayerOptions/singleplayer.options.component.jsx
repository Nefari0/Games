import { PlayerOptions } from "./singleplayer.options.styles"

export const MultiPlayerOptions = ({state,handleInput}) => {
    const { singlePlayer } = state
    // console.log(singlePlayer)
    return (
        <PlayerOptions>
            <button
                style={{
                    position:'relative',
                    // left:'50%',
                    // bottom:'-50px',
                    zIndex:'110',
                }}
                onClick={() => handleInput('singlePlayer',!state.singlePlayer)}
            >
                single player{singlePlayer ? ' on' : ' off'}
            </button>
            {/* INVITE OPTION NOT FUNCTIONAL  */}
            {/* {
                !singlePlayer &&
                <button>invite</button>
            } */}
        </PlayerOptions>
    )
}