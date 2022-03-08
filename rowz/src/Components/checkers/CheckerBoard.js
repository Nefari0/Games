import './CheckerBoard.css'
import React, { Component } from 'react'
import Tile from './Tile'
import data from '.././data'
import pieces from '.././pieces'

class CheckerBoard extends Component {
    constructor() {
        super()

        this.state = {
            // M:Array.from(Array(9), () => Array.from(Array(9)));
            // M:[]
            board:[
                [null,null,null,null,null,null,null,null],
                [null,null,null,null,null,null,null,null],
                [null,null,null,null,null,null,null,null],
                [null,null,null,null,null,null,null,null],
                [null,null,null,null,null,null,null,null],
                [null,null,null,null,null,null,null,null],
                [null,null,null,null,null,null,null,null],
                [null,null,null,null,null,null,null,null],
            ],
            playerGood:{},
            playerBad:{},
            selectedPiece:{}, // 
            activeLocation:{}, // player selects tile
            // data:[],
            pieces:[],
            matrix:[]
        }
        // this.changeTitle = this.changeTitle.bind(this)
    }

    componentDidMount() {
        console.log('is mounted',pieces)
        this.setState({data:[...data]})
        this.boardFactory()
        // this.setState({pieces:[...pieces]})
        // var M = Array.from(Array(3), () => Array.from(Array(8)).fill('adfdf'));
        // var M = Array.from(Array(3), () => Array.from(Array(8)).fill(null));
        // this.setState({board:[...M]})
    }

    // pieceFactory = () => {

    // }

    boardFactory = () => {
          // var newRow = []  
  // var counter = numOfTiles
    var matrix = []
    var numOfTiles = 8
    var M = Array.from(Array(9))
    // var mValues = M.forEach(el => {el = 23})
    // var M = Array.from(Array(9)).forEach(el => console.log(el))
    for(let i = 0; i < numOfTiles; i++){ // columns
    // for (let j = 0; j < numOfTiles; i++){matrix.push(i)}
    matrix.push(M)
    // matrix.push(M)
        }
        this.setState({matrix:matrix})
    }

    // play

    // piece template
    // piece = {
        // id:'',
        // player:good / bad
        // location:[row][col], // should have default value for initial game
        // isInGame:true / false, // this indicates whether piece has not been jumped by opponent
        // isKing:false,
    // }

    // select which piece
        // each piece should have unique id

    // select which move
        // move can only happen if no other piece is there
        // can only move diagonally
        // can only move one tile
        // if other piece is opponent && next tile past opponent is empty:
            // move selected piece to empty square past opponent
            // remove opponent piece from play

    // changeTitle = (prop,val) => {
    //     const {data} = this.state
    //     const updateData = [...data]
    //     this.setState({[prop]:val})
    // }
    // selectPiece = (input) => {
        // console.log('hit select piece')
        // this.setState(prevState => {
        //     // let 
        //     selectedPiece:input})
    // }

    render() {

        const { matrix } = this.state

        const mappedMatrix = matrix.map((el,id) => {
            return el.map((el2,id2) => {
                return <Tile key={[id2,id]} x={id2} y={id} />
            })
        })

        // const mappedData = data.map(el => {
        //     return <Tile changeTitle={this.changeTitle} selectPiece={this.selectPiece} key={el.id} el={el}/>
        // })

        // const mappedPieces = pieces.map(el => {
        //     return <Tile key={el.id} />
        // })

        // const mappedBoard = board.map(el => {
        //     return <Tile el={el}/>
        // })

        return(<div className='checker-table'>
            {/* {console.log('here is board',this.state.matrix)} */}
            {/* {this.state.matrix.forEach(el => console.log(el[0]))} */}
            {/* <div className='data-spec' >  */}

            {/* <span className='check-row-1' >{mappedBoard}</span> */}
            {/* <Tile /> */}
            <span className='check-row-1' >{mappedMatrix}</span>
            
            {/* <span className='check-row-1' >
                <div className='scrollitems'>{board[0][0]}</div>
                <div className='scrollitems'>{board[0][1]}</div>   
                <div className='scrollitems'></div> 
                <div className='scrollitems'></div>
                <div className='scrollitems'></div>   
                <div className='scrollitems'></div> 
                <div className='scrollitems'></div>
                <div className='scrollitems'></div>  
            </span>  */}

            {/* <span className='check-row-2' >
                <div className='scrollitems-2'></div>
                <div className='scrollitems-2'></div>   
                <div className='scrollitems-2'></div> 
                <div className='scrollitems-2'></div>
                <div className='scrollitems-2'></div>   
                <div className='scrollitems-2'></div> 
                <div className='scrollitems-2'></div>
                <div className='scrollitems-2'></div>  
            </span>  */}

            {/* <span className='check-row-2' >
                <div className='scrollitems-2'></div>
                <div className='scrollitems-2'></div>   
                <div className='scrollitems-2'></div> 
                <div className='scrollitems-2'></div>
                <div className='scrollitems-2'></div>   
                <div className='scrollitems-2'></div> 
                <div className='scrollitems-2'></div>
                <div className='scrollitems-2'></div>  
            </span>  */}
            
            

        </div>)
    }
}

export default CheckerBoard