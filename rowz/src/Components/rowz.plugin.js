import { css } from 'styled-components'

export const colors = {
    baseColor:'#F5DEB3',//wheat
    secondaryColor:'#FF8B5C',//coral
    tertiary:'#CDB6BA',
    backgroundColor:'#BCA6AA'
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

{/* <svg id="SvgjsSvg3254" width="318" height="152" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlnsXlink="http://www.w3.org/1999/xlink" xmlnsSvgjs="http://svgjs.dev/svgjs" class="apexcharts-svg" xmlnsData="ApexChartsNS" transform="translate(0, 0)" style="background: transparent none repeat scroll 0% 0%;">
<svg id="SvgjsSvg3254" width="318" height="152" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.dev/svgjs" class="apexcharts-svg" xmlns:data="ApexChartsNS" transform="translate(0, 0)" style="background: transparent none repeat scroll 0% 0%;">

</svg> */}

