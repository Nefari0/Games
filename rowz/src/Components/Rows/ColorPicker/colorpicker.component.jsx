import { ColorPickerContainer } from "./colorpicker.styles";
import { size } from "../../rowz.plugin";

export const ColorPicker = (props) => {

    var M = Array.from(Array(360 / 20)).map((el, index) => {
        // console.log(props.stateHandler)
        var columns = Array.from(Array(10)).map((col, index_2) => {
            var color = `hsl(${index * 20} ${30 + index_2 * 10}% ${50}%)`
            var background = `background-color:${color}`
            // console.log(background)
                return (
                    <div
                        onClick={() => props.stateHandler('goodPieceColor',background+';')}
                        key={index_2}
                        style={{
                            backgroundColor: color,
                            // backgroundColor:'red',
                            margin: "0px",
                            // width: `${(size.dimensions*1.3)/11}px`,
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
            // onClick={() => console.log('click')}
            key={index}
            style={{
                // backgroundColor: `hsl(${index*10} ${80}% ${40}%)`,
                display: "flex",
                minWidth: "350px",
                maxHeight:'100px',
                // backgroundColor: "blue",
                // flexDirection:'column'
            }}
            >
            {/* {index} */}
                {columns}
            </div>
            );
        });
    
    return (
        <ColorPickerContainer>
            {/* <h>text</h> */}
            {M}
        </ColorPickerContainer>
    )
}