import { css } from 'styled-components'

export const colors = {
    // secondaryColor:'blue',
    secondaryColor:'#FF7F50',
    // baseColor:'wheat',
    baseColor:'#F5DEB3'
}

export const size  = {
    multiplier:1,
    dimensions:350
}
// export const dimensions = 450

export const  menuStyling = css`
    position:absolute;
    height:100px;
    width:100px;
`

export const openMenu = css`
    top:${-50 * (size.multiplier)}px;
`

export const boardPlacement = css`
// margin:auto;
    margin-top: ${70 * size.multiplier}px;
    margin-left:30px;
`