import { PlayerOptions } from "./singleplayer.options.styles"

export const MultiPlayerOptions = ({state,handleInput}) => {
    const { singlePlayer,clientId } = state

    // const copyInvite = () => {
    //     navigator.clipboard.writeText(`${window.location.origin}/#/game=checkergame/id=${clientId}/rotation=0/singleplayer=${state.singlePlayer}`)
    //     handleInput('clientId',clientId) // Makes certain shared games will use same id
    // }

    const copyInvite = () => {
        const text = `${window.location.origin}/#/game=checkergame/id=${clientId}/rotation=0/singleplayer=${state.singlePlayer}`;

        // Modern clipboard (works on localhost + HTTPS)
        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(text);
        } 
        // Fallback for HTTP production
        else {
            const textarea = document.createElement("textarea");
            textarea.value = text;

            // Avoid scrolling/jumping
            textarea.style.position = "fixed";
            textarea.style.left = "-9999px";

            document.body.appendChild(textarea);
            textarea.select();

            try {
                document.execCommand("copy");
            } catch (err) {
                console.warn("Copy failed", err);
            }

            document.body.removeChild(textarea);
        }

        handleInput('clientId', clientId);
    };

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