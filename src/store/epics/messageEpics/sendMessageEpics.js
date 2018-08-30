import { Observable } from "rxjs";
import { SEND_MESSAGE } from "@actions/actionNames";

import { storeSubscriptions } from "@actions/subscriptionActions";
// Epic to Login to the Server.
export const sendMessage = (action$, store, { realtimeAPI }) =>{
    console.log('AAAAA');
	return action$.ofType(SEND_MESSAGE)
    .mergeMap(action => {
        console.log(action);
        if (store.getState().connection.isConnected && store.getState().user.isLoggedIn)
            return realtimeAPI.callMethod("sendMessage", action.payload);
        else
            return Observable.of({ msg: "error", error: "Not Loggedin or Not Connected to Server" });
    }).map(msg => {
        switch (msg.msg) {
        case "result":
            return storeSubscriptions(msg.result);
        default:
            return ({ type: "ADD_ERROR", payload: msg.error });
        }
    });
}