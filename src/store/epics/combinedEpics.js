import { combineEpics } from "redux-observable";

import { loginUser } from "./userEpics/loginEpics";
import { sendMessage } from "./messageEpics/sendMessageEpics";
import { getRooms, subscribeToRoom } from "./roomEpics";
import { initConnection } from "./connectionEpics";
import { getSubscriptions } from "./subscriptionEpics";


export default combineEpics(initConnection, loginUser, getRooms, getSubscriptions, subscribeToRoom, sendMessage);