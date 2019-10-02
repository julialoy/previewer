import React, { Component } from 'react';
import DOMPurify from 'dompurify';
import marked from 'marked';
import Container from 'react-bootstrap/Container';

marked.setOptions({
  renderer: new marked.Renderer(),
  pedantic: false,
  gfm: true,
  breaks: true,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  xhtml: false
});

const EXAMPLE = `
# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:
  
Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`
  
You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.com), and
> Block Quotes!
> Lot's of Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | ------------- 
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbererd lists too.
1. Use just 1s if you want! 
1. But the list goes on...
- Even if you use dashes or asterisks.
* And last but not least, let's not forget embedded images:

![React Logo w/ Text](https://goo.gl/Umyytc)
`;

const iconMax = "fas fa-window-maximize"
const iconMin = "fas fa-window-minimize"

class App extends Component {

  state = {
    value: EXAMPLE,
    editorIcon: iconMax,
    previewIcon: iconMax,
    editorIsHidden: false,
    previewIsHidden: false
  }

  handleValueChange = (evt) => {
    this.setState({ value: evt.target.value });
  }

  handleEditorMaxMin = () => {
    if (this.state.editorIcon === iconMax) {
      this.setState({ editorIcon: iconMin });
      this.setState({ previewIsHidden: true });
    } else {
      this.setState({ editorIcon: iconMax });
      this.setState({ previewIsHidden: false });
    }
  }

  handlePreviewMaxMin = () => {
    if (this.state.previewIcon === iconMax) {
      this.setState({ previewIcon: iconMin });
      this.setState({ editorIsHidden: true });
    } else {
      this.setState({ previewIcon: iconMax });
      this.setState({ editorIsHidden: false });
    }
  }

  componentDidMount() {
    const s = document.createElement("script");
    s.type = 'text/javascript';
    s.src = "https://cdn.jsdelivr.net/npm/marked/marked.min.js";
    s.async = true;
    document.body.appendChild(s);
  }

  render() {
    
    const containerStyle = this.state.previewIsHidden ? {width: '100%', height: '100%'} : {};
    const editorStyle = this.state.editorIsHidden ? {display: 'none'} : {};
    const editorRows = this.state.previewIsHidden ? "30" : "5";
    const previewStyle = this.state.previewIsHidden ? {display: 'none'} : this.state.editorIsHidden ? {} : {};

    return (
      <Container className="justify-content-center" id="app-container">
        <div style={containerStyle} id="edit-preview-div">
          <div style={editorStyle} id="editor-field">
            <div className="editor-label">Editor<i className={this.state.editorIcon} onClick={this.handleEditorMaxMin} /></div>
            <textarea id="editor" name="markdown-editor" rows={editorRows} onChange={this.handleValueChange} value={this.state.value}>
            </textarea>
          </div>
          <div  style={previewStyle} id="preview-field">
            <div className="preview-label">Preview<i className={this.state.previewIcon} onClick={this.handlePreviewMaxMin} /></div>
            <div id="preview" dangerouslySetInnerHTML={{__html:DOMPurify.sanitize(marked(this.state.value))}}>
            </div>
          </div>
        </div>
      </Container>
    );
  }
}

export default App;
