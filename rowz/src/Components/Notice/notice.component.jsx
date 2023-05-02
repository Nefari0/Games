import { NoticeContainer } from "./notice.styles";
import { updateNotice } from "../../redux/globalReducer";
import { connect } from "react-redux";

const Notice = (props) => {

    const { notice } = props.globalReducer

    return (
        <NoticeContainer>
            <p>{notice}</p>
            <button onClick={() => props.updateNotice(null)}>close</button>
        </NoticeContainer>
    )
}

const mapStateToProps = (reduxState) => {
    return reduxState
}

export default connect(mapStateToProps, {updateNotice})(Notice)

// export default Notice