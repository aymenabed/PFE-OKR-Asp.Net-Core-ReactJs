import React, { Fragment } from "react";
import CSSTransitionGroup from "react-transition-group/CSSTransitionGroup";
import {
  Button,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Row,
  Col,
} from "reactstrap";
import Rodal from "rodal";
import DateFnsUtils from "@date-io/date-fns";
import PerfectScrollbar from "react-perfect-scrollbar";
import { toast, Slide } from "react-toastify";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import "date-fns";
import "../CSS/Style.scss";
/*material-ui*/
import {
  MuiPickersUtilsProvider,
  KeyboardDateTimePicker,
} from "@material-ui/pickers";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
/*draft-js*/
import { EditorState, convertFromRaw, convertToRaw } from "draft-js";
import {  RichUtils } from "draft-js";
import { fromJS } from "immutable";
import Editor, {
  createEditorStateWithText,
  composeDecorators,
} from "draft-js-plugins-editor";
import createColorBlockPlugin from "./colorBlockPlugin";
import createEmojiPlugin from "draft-js-emoji-plugin";
import createHashtagPlugin from "draft-js-hashtag-plugin";
import createMentionPlugin, {
  defaultSuggestionsFilter,
} from "draft-js-mention-plugin";
import createUndoPlugin from "draft-js-undo-plugin";
import createImagePlugin from "draft-js-image-plugin";
import createAlignmentPlugin from "draft-js-alignment-plugin";
import createFocusPlugin from "draft-js-focus-plugin";
import createResizeablePlugin from "draft-js-resizeable-plugin";
import createBlockDndPlugin from "draft-js-drag-n-drop-plugin";
import createDragNDropUploadPlugin from "@mikeljames/draft-js-drag-n-drop-upload-plugin";
import createInlineToolbarPlugin, {
  Separator,
} from "draft-js-inline-toolbar-plugin";
import createLinkPlugin from "draft-js-anchor-plugin";
import createVideoPlugin from "draft-js-video-plugin";
import VideoAdd from "./VideoAdd";
import mockUpload from "./mockUpload";
import ColorPicker, { colorPickerPlugin } from "draft-js-color-picker";
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
import "draft-js-emoji-plugin/lib/plugin.css";
import "draft-js-mention-plugin/lib/plugin.css";
import "draft-js-hashtag-plugin/lib/plugin.css";
import "draft-js-inline-toolbar-plugin/lib/plugin.css";
import "draft-js-undo-plugin/lib/plugin.css";
import "draft-js-sticker-plugin/lib/plugin.css";
import "draft-js-focus-plugin/lib/plugin.css";
import "draft-js-image-plugin/lib/plugin.css";
import "prismjs/themes/prism.css";
import "../CSS/editorStyles.css";
import alignmentToolStyles from "../CSS/alignmentToolStyles.css";
import buttonStyles from "../CSS/buttonStyles.css";
import mentions from "../mentions";

const focusPlugin = createFocusPlugin();
const resizeablePlugin = createResizeablePlugin();
const blockDndPlugin = createBlockDndPlugin();
const alignmentPlugin = createAlignmentPlugin({
  theme: {
    alignmentToolStyles,
    buttonStyles,
  },
});
const emojiPlugin = createEmojiPlugin();
const mentionPlugin = createMentionPlugin();
const inlineToolbarPlugin = createInlineToolbarPlugin();
const hashtagPlugin = createHashtagPlugin();
const undoPlugin = createUndoPlugin();
const linkPlugin = createLinkPlugin();
const { EmojiSuggestions, EmojiSelect } = emojiPlugin;
const { InlineToolbar } = inlineToolbarPlugin;
const { MentionSuggestions } = mentionPlugin;
const { UndoButton, RedoButton } = undoPlugin;
const text = ``;
const decorator = composeDecorators(
  resizeablePlugin.decorator,
  alignmentPlugin.decorator,
  focusPlugin.decorator,
  blockDndPlugin.decorator
);
const videoPlugin = createVideoPlugin({ decorator });
const colorBlockPlugin = createColorBlockPlugin({ decorator });
const imagePlugin = createImagePlugin({ decorator });
const dragNDropFileUploadPlugin = createDragNDropUploadPlugin({
  handleUpload: mockUpload,
  addImage: imagePlugin.addImage,
});
const plugins = [
  focusPlugin,
  alignmentPlugin,
  resizeablePlugin,
  colorBlockPlugin,
  emojiPlugin,
  hashtagPlugin,
  mentionPlugin,
  inlineToolbarPlugin,
  undoPlugin,
  dragNDropFileUploadPlugin,
  blockDndPlugin,
  imagePlugin,
  linkPlugin,
  videoPlugin,
];
const presetColors = [
  "#ff00aa",
  "#F5A623",
  "#F8E71C",
  "#8B572A",
  "#7ED321",
  "#417505",
  "#BD10E0",
  "#9013FE",
  "#4A90E2",
  "#50E3C2",
  "#B8E986",
  "#000000",
  "#4A4A4A",
  "#9B9B9B",
  "#FFFFFF",
];

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
  static defaultProps = {
    placeholder: 'Write something...'
  }
  constructor(props) {
    super(props);
    this.state = {
      suggestions: mentions,
      editorState: EditorState.createEmpty(),
      clientModeOn: false,
    };
    this.updateEditorState = (editorState) => this.props.editorState;
    this.getEditorState = () => this.props.editorState;
    this.handleKeyCommand = this.handleKeyCommand.bind(this);
    this.renderPlaceholder = this.renderPlaceholder.bind(this);
    this.picker = colorPickerPlugin(
      this.updateEditorState,
      this.getEditorState
    );

  }

  componentDidMount() {
    this.setState({ clientModeOn: true });
  }

  handleKeyCommand(command, editorState) {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return 'handled';
    }
    return 'not-handled';
  }

  renderPlaceholder(placeholder, editorState) {
    const contentState = editorState.getCurrentContent();
    const shouldHide = contentState.hasText() || contentState.getBlockMap().first().getType() !== 'unstyled';
    return shouldHide ? '' : placeholder;
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
    if (!this.state.clientModeOn) {
      return null;
    }
    const { editorState } = this.props;
    const inlineStyles = this.picker.exporter(this.props.editorState);
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
          <div style={{ flex: "1 0 25%" }}>
                      <ColorPicker
                        toggleColor={(color) => this.picker.addColor(color)}
                        presetColors={presetColors}
                        color={this.picker.currentColor(editorState)}
                      />
                    </div>
          <div className="RichEditor-root" onClick={this.focus}>
            <Editor
            customStyleFn={this.picker.customStyleFn}
              editorState={editorState}
              onChange={this.onChange}
              plugins={plugins}
              handleKeyCommand={this.handleKeyCommand}
              placeholder={this.renderPlaceholder(this.props.placeholder, editorState)}
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
            <VideoAdd
                      editorState={editorState}
                      onChange={this.onChange}
                      modifier={videoPlugin.addVideo}
                    />
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
