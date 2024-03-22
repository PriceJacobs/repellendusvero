import React, { useState, useRef, ReactElement } from 'react';
import { convertFromRaw, EditorState, RawDraftContentState } from 'draft-js';
import Editor, { composeDecorators } from '@draft-js-plugins/editor';
import createFocusPlugin from '@draft-js-plugins/focus';
import createColorBlockPlugin from './colorBlockPlugin';
import editorStyles from './editorStyles.css';

const focusPlugin = createFocusPlugin();

const decorator = composeDecorators(focusPlugin.decorator);

const colorBlockPlugin = createColorBlockPlugin({ decorator });
const plugins = [focusPlugin, colorBlockPlugin];

/* eslint-disable */
const initialState: RawDraftContentState = {
  entityMap: {
    '0': {
      type: 'colorBlock',
      mutability: 'IMMUTABLE',
      data: {},
    },
  },
  blocks: [
    {
      key: '9gm3s',
      text: 'This is a simple example. Click on the block to focus on it.',
      type: 'unstyled',
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {},
    },
    {
      key: 'ov7r',
      text: ' ',
      type: 'atomic',
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [
        {
          offset: 0,
          length: 1,
          key: 0,
        },
      ],
      data: {},
    },
    {
      key: 'e23a8',
      text:
        'More text here to demonstrate how inline left/right alignment works …',
      type: 'unstyled',
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {},
    },
  ],
};
/* eslint-enable */

const CustomImageEditor = (): ReactElement => {
  const [editorState, setEditorState] = useState(
    EditorState.createWithContent(convertFromRaw(initialState))
  );
  const editor = useRef<Editor>();

  return (
    <div
      className={editorStyles.editor}
      onClick={(): void => {
        editor.current.focus();
      }}
    >
      <Editor
        editorState={editorState}
        onChange={(value): void => {
          setEditorState(value);
        }}
        plugins={plugins}
        ref={(element) => {
          editor.current = element;
        }}
      />
    </div>
  );
};

export default CustomImageEditor;
