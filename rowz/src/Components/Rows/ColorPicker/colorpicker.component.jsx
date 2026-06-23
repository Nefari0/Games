import { ColorPickerContainer } from "./colorpicker.styles";
import { EditOptions } from "./editoptions.component";
import { GoodPlayer,BadPlayer } from "../Tile/Piece/piece.styles";
import Piece from "../Tile/Piece/piece.component";
import { TileStyles } from "../Tile/tile.styles";
import { size } from "../../rowz.plugin";

// const goodPieceSample = {
//     id:1,
//     player:'good',
//     x:0,
//     y:-.1,
//     isInGame:true,
//     isKing:false,
//     pendingDeath:false,
// }

// const badPieceSample = {
//     id:1,
//     player:'bad',
//     x:0,
//     y:-.1,
//     isInGame:true,
//     isKing:false,
//     pendingDeath:false,
// }

export const ColorPicker = (props) => {

    const { platformState } = props

    var M = Array.from(Array(360 / 20)).map((el, index) => {
        // console.log(platFormState.editItem)
        var columns = Array.from(Array(10)).map((col, index_2) => {
            var color = `hsl(${index * 20} ${30 + index_2 * 10}% ${50}%)`
            var background = `background-color:${color}`
                return (
                    <div
                        onClick={() => props.stateHandler(platformState.editItem,background+';')}
                        key={index_2}
                        style={{
                            backgroundColor: color,
                            margin: "0px",
                            width:'30px',
                            height: "20px",
                        }}
                        
                    >
                        {/* {index_2} */}
                    </div>
                );
        });
        return (
            <div
            key={index}
            style={{display: "flex",}}
            >
                {columns}
            </div>
            );
        });
    
    return (
        <ColorPickerContainer colorPickerOpen={platformState.colorPickerOpen}>
            {/* <EditOptions /> */}
            {/* <EditOptions>

                <button
                    style={{
                        position:'absolute',
                        left:`${50}px`,
                        width:'50px',
                        height:'50px',
                    }}
                    onClick={() => props.stateHandler(`editItem`,'goodPieceColor')}
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
                        position:'absolute',
                        left:`${badPieceSample.x}`,
                        width:'50px',
                        height:'50px',
                    }}
                    onClick={() => props.stateHandler('editItem','badPieceColor')}
                >

                    <Piece
                        key={2}
                        items={badPieceSample}
                        props={{platformState}}
                        checkerBoardState={platformState}
                    />
                </button>

            </EditOptions> */}

            {M}

        </ColorPickerContainer>
    )
}