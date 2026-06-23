import { EditOptionsContainer } from "./colorpicker.styles";
import Piece from "../Tile/Piece/piece.component";

export const EditOptions = (props) => {

    const {platformState,stateHandler} = props
    const {editItem} = platformState
    console.log(platformState.editItem)

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
        <EditOptionsContainer>

            <button
                style={{
                    // position:'absolute',
                    left:`${50}px`,
                    // width:'50px',
                    // height:'50px',
                }}
                onClick={() => stateHandler(`editItem`,'goodPieceColor')}
                name={'goodPieceColor'}
                editItem={editItem}
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
                    // position:'absolute',
                    left:`${0}px`,
                    // width:'50px',
                    // height:'50px',
                }}
                onClick={() => stateHandler('editItem','badPieceColor')}
                name={'badPieceColor'}
                // editItem={editItem}
            >

                <Piece
                    key={2}
                    items={badPieceSample}
                    props={{platformState}}
                    checkerBoardState={platformState}
                />
            </button>

            {/* <button>button</button>
            <button>button</button>
            <button>button</button> */}

        </EditOptionsContainer>
    )
}