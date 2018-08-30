import React, { Component } from "react";
import { connect } from "react-redux";
import { sendMessage } from "@actions/messageActions";
import "./ChatInput.css"

class ChatInput extends Component {

    constructor(props) {
        super(props);
        this.state = { message:"" };
        this.sendMessage = this.sendMessage.bind(this);
        this.handlerKeyup = this.handlerKeyup.bind(this);
        this.handlerChange = this.handlerChange.bind(this);
    }


	componentDidMount() {
		componentHandler.upgradeDom();
    }
    
    sendMessage(e) {
        e.preventDefault();
        e.stopPropagation();
        this.props.dispatch(sendMessage({rid:this.props.rid, msg:this.state.message, _id: Date.now().toString(16)}));
    }

    handlerKeyup(e) {
        const keyCode = e.whick || e.keyCode;
        console.log('handlerKeyup:',keyCode);
        if (keyCode === 13) {
            e.preventDefault();
            this.sendMessage(e);
        }
    }

    handlerChange(e) {
        const name = e.target.name;
        console.log(name + ':' + e.target.value);
        this.setState({[name]:  e.target.value})
    }

	render() {
		return (
            <div className="chatinput mdl-color--white mdl-shadow--2dp">
                <div className="mdl-cell--hide-desktop mdl-cell--hide-tablet chatinput__action-container">
                    <button className="mdl-button mdl-js-button mdl-button--icon"><i className="material-icons mdl-color-text--grey-600">tag_faces</i></button>
                    <button className="mdl-button mdl-js-button mdl-button--icon"><i className="material-icons mdl-color-text--grey-600">attach_file</i></button>
                    <button className="mdl-button mdl-js-button mdl-button--icon"><i className="material-icons mdl-color-text--grey-600">mic</i></button>
                    <button className="mdl-button mdl-js-button mdl-button--icon"><i className="material-icons mdl-color-text--grey-600">videocam</i></button>
                    <button className="mdl-button mdl-js-button mdl-button--icon"><i className="material-icons mdl-color-text--grey-600">location_on</i></button>
                </div>
                <form className="chatinput__message-input">
                    <div className="mdl-textfield mdl-js-textfield mdl-border">
                        <input className="mdl-textfield__input" type="text" id="message" name="message" value={this.state.message} onKeyDown={this.handlerKeyup} onChange={this.handlerChange}/>
                        <label className="mdl-textfield__label" htmlFor="message">Your Message</label>
                    </div>
                    <button className="mdl-button mdl-js-button mdl-button--icon" type="button" onClick={this.sendMessage}><i className="material-icons">send</i></button>
                </form>
            </div>
		);
    }
}

export default connect(state => state)(ChatInput);