import React, { Fragment } from "react";
import CSSTransitionGroup from "react-transition-group/CSSTransitionGroup";
import Editor, { createEditorStateWithText } from "draft-js-plugins-editor";
import createEmojiPlugin from "draft-js-emoji-plugin";
import "../CSS/editorStyles.css";
import "draft-js-emoji-plugin/lib/plugin.css";
import "draft-js-mention-plugin/lib/plugin.css";
import "draft-js-hashtag-plugin/lib/plugin.css";
import "draft-js-inline-toolbar-plugin/lib/plugin.css";

import createMentionPlugin, {
  defaultSuggestionsFilter,
} from "draft-js-mention-plugin";
import mentions from "../mentions";
import createInlineToolbarPlugin, {
  Separator,
} from "draft-js-inline-toolbar-plugin";
import {
  ItalicButton,
  BoldButton,
  UnderlineButton,
  CodeButton,
  HeadlineOneButton,
  HeadlineTwoButton,
  HeadlineThreeButton,
  UnorderedListButton,
  OrderedListButton,
  BlockquoteButton,
  CodeBlockButton,
} from "draft-js-buttons";

import createHashtagPlugin from "draft-js-hashtag-plugin";
import "draft-js-undo-plugin/lib/plugin.css";
import createUndoPlugin from "draft-js-undo-plugin";

import {
  convertToRaw,
  CompositeDecorator,
  ContentState,
  EditorState,
  Entity,
  RichUtils,
} from 'draft-js';

import "../CSS/Style.scss";

const emojiPlugin = createEmojiPlugin();

const mentionPlugin = createMentionPlugin();
const inlineToolbarPlugin = createInlineToolbarPlugin();
const { InlineToolbar } = inlineToolbarPlugin;
const hashtagPlugin = createHashtagPlugin();
const { EmojiSuggestions, EmojiSelect } = emojiPlugin;
const { MentionSuggestions } = mentionPlugin;
const undoPlugin = createUndoPlugin();
const { UndoButton, RedoButton } = undoPlugin;
const plugins = [
  emojiPlugin,
  hashtagPlugin,
  mentionPlugin,
  inlineToolbarPlugin,
  undoPlugin,
];
const text = ``;

class HeadlinesPicker extends React.Component {
  componentDidMount() {
    setTimeout(() => {
      window.addEventListener("click", this.onWindowClick);
    });
  }

  componentWillUnmount() {
    window.removeEventListener("click", this.onWindowClick);
  }

  onWindowClick = () => this.props.onOverrideContent(undefined);

  render() {
    const buttons = [HeadlineOneButton, HeadlineTwoButton, HeadlineThreeButton];
    return (
      <div>
        {buttons.map((Button, i) => (
          <Button key={i} {...this.props} />
        ))}
      </div>
    );
  }
}

class HeadlinesButton extends React.Component {
  onMouseDown = (event) => event.preventDefault();

  onClick = () => this.props.onOverrideContent(HeadlinesPicker);

  render() {
    return (
      <div onMouseDown={this.onMouseDown} className="headlineButtonWrapper">
        <button onClick={this.onClick} className="headlineButton">
          H
        </button>
      </div>
    );
  }
}

class RichEditorExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      suggestions: mentions,
      editorState: EditorState.createEmpty(),
      mentionPlugin: createMentionPlugin(),
    };

    this.handleKeyCommand = this.handleKeyCommand.bind(this);
    this.renderPlaceholder = this.renderPlaceholder.bind(this);
  }


  handleKeyCommand(command, editorState) {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return "handled";
    }
    return "not-handled";
  }
  renderPlaceholder(placeholder, editorState) {
    const contentState = editorState.getCurrentContent();
    const shouldHide =
      contentState.hasText() ||
      contentState
        .getBlockMap()
        .first()
        .getType() !== "unstyled";
    return shouldHide ? "" : placeholder;
  }
  onChange = (editorState) => {
    this.props.onChange(this.props.name || this.props.id, editorState);
    this.props.onBlur(this.props.name || this.props.id, editorState);
  };

  focus = () => {
    this.editor.focus();
  };

  onSearchChange = ({ value }) => {
    this.setState({
      suggestions: defaultSuggestionsFilter(value, mentions),
    });
  };


  render() {
    const { editorState } = this.props;
    return (
      <Fragment>
        <CSSTransitionGroup
          component="div"
          transitionName="TabsAnimation"
          transitionAppear={true}
          transitionAppearTimeout={0}
          transitionEnter={false}
          transitionLeave={false}
        >
          <div className="RichEditor-root" onClick={this.focus}>
            <Editor
              editorState={editorState}
              onChange={this.onChange}
              plugins={plugins}
              placeholder="Enter some text..."
              ref={(element) => {
                this.editor = element;
              }}
            />
            <MentionSuggestions
              onSearchChange={this.onSearchChange}
              suggestions={this.state.suggestions}
              onAddMention={this.onAddMention}
            />
            <EmojiSelect />
            <UndoButton />
            <RedoButton />
            <EmojiSuggestions />
            <InlineToolbar>
              {(externalProps) => (
                <div>
                  <BoldButton {...externalProps} />
                  <ItalicButton {...externalProps} />
                  <UnderlineButton {...externalProps} />
                  <CodeButton {...externalProps} />
                  <Separator {...externalProps} />
                  <HeadlinesButton {...externalProps} />
                  <UnorderedListButton {...externalProps} />
                  <OrderedListButton {...externalProps} />
                  <BlockquoteButton {...externalProps} />
                  <CodeBlockButton {...externalProps} />
                </div>
              )}
            </InlineToolbar>
          </div>
        </CSSTransitionGroup>
      </Fragment>
    );
  }
}
export default RichEditorExample;
