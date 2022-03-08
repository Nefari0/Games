import './tile.css'
import './CheckerBoard.css'
const Tile = (props) => {

    const { x,y } = props
    // console.log(typeof(x),'xcoords')
    // var elCopy = [...el]

    var count = 0

    // elCopy.forEach(element => {
    //     element = count
    //     count += 1
    //     console.log(element)
    // })

    // const mappedEl = elCopy.map(element => {
    //     element = count
    //     count += 1
    //     return <div className="tile-color" key={count} ></div>
    // })

    // const mappedEl = el.map(element => {
    //     console.log('are you reading elements',element)
    //     return <p>{element}</p>
    // })

    return(<div className='tile-color'>
    {/* // return(<div className='scrollItems-2'> */}
        {/* <p>{el.title}</p> */}
        {/* {mappedEl} */}
        {/* <input type='text' onChange={(e) => {props.changeTitle('title',e.target.value)}} /> */}
    </div>)
}

export default Tile