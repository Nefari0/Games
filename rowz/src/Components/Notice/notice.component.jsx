import { useEffect,useState } from "react";
import { PopupContainer } from "./notice.styles";
import { updateNotice,updateAlert } from "../../redux/globalReducer";
import { connect } from "react-redux";

// export const ALERT_CLASSES = {
//     alert:'alert',
//     notice:'notice'
// }

const delay = 1

const Alert = (props) => {

    const { notice,alert } = props.globalReducer
    const [ text, setText ] = useState(null)

    useEffect(() => {initNotice()},[notice])

    const initNotice = () => {
        if (notice != null) {
            props.updateAlert(null)
            setText(notice)
            setTimeout(function () {props.updateNotice(null)}, delay);
        } else if (alert != null) {
            setText(null)
        }
}

    return (
        <PopupContainer notice={notice} alert={alert}>
            <h1>{text}{alert}</h1>
            {alert && <button onClick={() => props.updateAlert(null)}>close</button>}
        </PopupContainer>
    )
}

const mapStateToProps = (reduxState) => {
    return reduxState
}

export default connect(mapStateToProps, {updateNotice,updateAlert})(Alert)