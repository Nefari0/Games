import { EditOptionsContainer } from "./colorpicker.styles";
import Piece from "../Tile/Piece/piece.component";
import { CloseButton } from "../Tile/Piece/SVG";
import { CloseController } from "../Tile/ControlPanel/controls.styles";

export const EditOptions = (props) => {

    const {platformState,stateHandler} = props
    const {editItem,colorPickerOpen} = platformState

    const goodPieceSample = {
        id:1,
        player:'good',
        x:0,
        y:-.2,
        isInGame:true,
        isKing:false,
        pendingDeath:false,
    }

    const badPieceSample = {
        id:1,
        player:'bad',
        x:0,
        y:-.2,
        isInGame:true,
        isKing:false,
        pendingDeath:false,
    }

    return (
        <EditOptionsContainer colorPickerOpen={colorPickerOpen}>

            <button
                style={{
                    opacity:`${editItem==='goodPieceColor' ? 1 : .8}`,
                    transform: `scale(${editItem==='goodPieceColor' ? 1:.8})`,
                    transition: "all 1000ms",
                    left:`${50}px`,
                }}
                onClick={() => stateHandler(`editItem`,'goodPieceColor')}
                name={'goodPieceColor'}
            >
                <Piece
                    key={1}
                    items={goodPieceSample}
                    props={{platformState}}
                    checkerBoardState={platformState}
                />
            </button>

            <button 
                style={{
                    opacity:`${editItem==='badPieceColor' ? 1 : .8}`,
                    transform: `scale(${editItem==='badPieceColor' ? 1:.8})`,
                     transition: "all 1000ms",
                    left:`${0}px`,
                }}
                onClick={() => stateHandler('editItem','badPieceColor')}
            >

                <Piece
                    key={2}
                    items={badPieceSample}
                    props={{platformState}}
                    checkerBoardState={platformState}
                />
            </button>

            <button
                style={{
                    right:'10px'
                }}
                onClick={() => stateHandler('colorPickerOpen',false)}
            >
                <CloseController 
                    style={{
                        position:'absolute',
                        top:'3px',
                        left:'3px'
                    }}
                >
                    {CloseButton('#fff')}
                </CloseController>
            </button>

        </EditOptionsContainer>
    )
}