import React from 'react';
import styled from 'styled-components'
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import FontIcon from 'material-ui/FontIcon';
import Avatar from 'material-ui/Avatar';
import Divider from 'material-ui/Divider';
import { List, ListItem } from 'material-ui/List';

const ChatWindow = styled.div`
  position: relative;
  display: inline-flex;
  flex-direction: column;
  justify-content: flex-end;
  height: 800 px;
  width: 80%;
  box-sizing: border-box;
`
const ChatPanel = styled.div`
  position: relative;
  display: inline-flex;
  flex-direction: column;
  justify-content: flex-end;
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  z-index: 1;
`

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 20px ;
  z-index: 1;
  color: #fafafa !important;
  border-bottom: 1px solid;
`

const Title = styled.p`
  text-align: center;
  font-size: 24px;
`

const NoDots = styled.div`
  hr {
    visibility: hidden;
  }
`

const OutputText = styled.div`
  white-space: normal !important;
  word-break: break-all !important;
  overflow: initial !important;
  width: 100%;
  height: auto !important;
`

const InputPanel = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  align-self: center;
  border-top: 1px solid #fafafa;
`

const Scrollable = styled.div`
  height: 400px;
  overflow: auto;
`

export default class Chatroom extends React.Component {
    constructor(props, context) {

        super(props, context);

        this.state = {
            chatHistory: [],
            input: ''
        };

        this.onInput = this.onInput.bind(this)
        this.onSendMessage = this.onSendMessage.bind(this)
        this.onMessageReceived = this.onMessageReceived.bind(this)
        this.updateChatHistory = this.updateChatHistory.bind(this)
        this.scrollChatToBottom = this.scrollChatToBottom.bind(this)
    }

    componentDidMount() {
        this.props.registerHandler(this.onMessageReceived)
        this.scrollChatToBottom()
    }

    componentDidUpdate() {
        this.scrollChatToBottom()
    }

    componentWillUnmount() {
        this.props.unregisterHandler()
    }

    onInput(e) {
        this.setState({
            input: e.target.value
        })
    }

    onSendMessage() {
        if (!this.state.input)
            return

        this.props.onSendMessage(this.state.input, (err) => {
            if (err)
                return console.error(err)

            return this.setState({ input: '' })
        })
    }

    onMessageReceived(entry) {
        console.log('onMessageReceived:', entry)
        this.updateChatHistory(entry)
    }

    updateChatHistory(entry) {
        this.setState({ chatHistory: this.state.chatHistory.concat(entry) })
    }

    scrollChatToBottom() {
        // this.panel.scrollTo(0, this.panel.scrollHeight)
    }

    render() {
        return (
            <div style={{ height: '100%' }}>
                <ChatWindow>
                    <Header>
                        <Title style={{ color: '#3d3d3d' }}>
                            Message Board
                        </Title>
                        {/*<RaisedButton*/}
                        {/*    primary*/}
                        {/*    icon={*/}
                        {/*        <FontIcon*/}
                        {/*            style={{ fontSize: 24 }}*/}
                        {/*            className="material-icons"*/}
                        {/*        >*/}
                        {/*            {'close'}*/}
                        {/*        </FontIcon>*/}
                        {/*    }*/}
                        {/*    onClick={this.props.onLeave}*/}
                        {/*/>*/}
                    </Header>
                    <ChatPanel>
                        <Scrollable>
                            <List>
                                {
                                    this.state.chatHistory.map(
                                        ({ user, message, time}, i) => [
                                            <NoDots>
                                                <ListItem
                                                    key={i}
                                                    style={{ color: '#3d3d3d'}}
                                                    leftAvatar={<Avatar src={`https://robohash.org/${user.id}?size=200x200`} />}
                                                    primaryText={`${user.name || "anonymous"}  ${new Date(time).toLocaleDateString()} ${new Date(time).toLocaleTimeString()}`}
                                                    secondaryText={
                                                        message &&
                                                        <OutputText style={{ color: '#3d3d3d' }} >
                                                            { message }
                                                        </OutputText>
                                                    }
                                                />
                                            </NoDots>,
                                            <Divider inset />
                                        ]
                                    )
                                }
                            </List>
                        </Scrollable>
                        <InputPanel>
                            <TextField
                                textareaStyle={{ color: '#3d3d3d' }}
                                hintStyle={{ color: '#3d3d3d' }}
                                floatingLabelStyle={{ color: '#3d3d3d' }}
                                hintText="Enter a message."
                                floatingLabelText="Enter a message."
                                multiLine
                                rows={4}
                                rowsMax={4}
                                onChange={this.onInput}
                                value={this.state.input}
                                onKeyPress={e => (e.key === 'Enter' ? this.onSendMessage() : null)}
                            />
                            <FloatingActionButton
                                onClick={this.onSendMessage}
                                style={{ marginLeft: 20 }}
                            >
                                <FontIcon
                                    style={{ fontSize: 32 }}
                                    className="material-icons"
                                >
                                    {'chat_bubble_outline'}
                                </FontIcon>
                            </FloatingActionButton>
                        </InputPanel>
                    </ChatPanel>
                </ChatWindow>
            </div>
        )
    }
}