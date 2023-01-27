import { css } from 'styled-components'

export const colors = {
    secondaryColor:'coral',
    baseColor:'wheat',
}

export const size  = {
    multiplier:1
}

export const  menuStyling = css`
    position:absolute;
    height:100px;
    width:100px;
`

export const openMenu = css`
    top:${-50 * (size.multiplier)}px;
`

export const boardPlacement = css`
    margin-top: ${30 * size.multiplier}px;
`

export const playerStatusPlacement = css`
    top: ${450 * size.multiplier}px;

    @media (max-width:400px) {
        top:${350 * size.multiplier}px;
        width:130px;
    }
`