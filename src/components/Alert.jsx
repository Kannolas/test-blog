import { Alert } from "@mui/material";
import {AlertTitle} from "@mui/material";

function AlertCustom(props){
    return(
        <Alert severity="error" className={props.showAlert?"show-alert":"hide-alert"} style={{backgroundColor: "#490303", color:"#ff9e9e", right:"20px", bottom:"30px", width:"500px", position:"fixed", borderRadius:"5px", transition:"0.5s all", zIndex: "999"}}>
            <AlertTitle>Ошибка</AlertTitle>
            This is an error alert — <strong>{props.text}</strong>
        </Alert>
    )
}

export default AlertCustom