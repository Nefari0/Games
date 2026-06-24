import { ColorPickerContainer } from "./colorpicker.styles";
import { EditOptions } from "./editoptions.component";
import { GoodPlayer,BadPlayer } from "../Tile/Piece/piece.styles";
import Piece from "../Tile/Piece/piece.component";
import { TileStyles } from "../Tile/tile.styles";
import { size } from "../../rowz.plugin";

export const ColorPicker = (props) => {

    const { platformState } = props

    var M = Array.from(Array(360 / 20)).map((el, index) => {
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

            {M}

        </ColorPickerContainer>
    )
}