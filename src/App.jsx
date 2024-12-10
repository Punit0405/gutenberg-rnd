import React from "react";

import { useEffect, useState } from "@wordpress/element";
import { BlockEditorKeyboardShortcuts, BlockEditorProvider, BlockList, BlockInspector, WritingFlow, ObserveTyping, BlockTools, Inserter } from "@wordpress/block-editor";
import { Popover, SlotFillProvider, DropZoneProvider } from "@wordpress/components";
import { registerCoreBlocks } from "@wordpress/block-library";
import { serialize } from '@wordpress/blocks'; // Import serialize function
import { registerBlockType } from '@wordpress/blocks';
import { RichText, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl } from '@wordpress/components';

import "@wordpress/format-library";
import '@wordpress/block-editor/build-style/style.css';
import '@wordpress/block-editor/build-style/content.css';
// import '@wordpress/block-editor/build-style/default-editor-styles.css';

import '@wordpress/block-library/build-style/style.css';
import '@wordpress/block-library/build-style/editor.css';
import '@wordpress/block-library/build-style/style.css';      // Block library base styles
import '@wordpress/block-library/build-style/editor.css';     // Block editor specific styles
import '@wordpress/block-library/build-style/classic.css';     // Block editor specific styles
import '@wordpress/block-library/build-style/editor-elements.css';     // Block editor specific styles
import '@wordpress/block-library/build-style/theme.css';     // Block editor specific styles
import '@wordpress/block-library/build-style/reset.css';     // Block editor specific styles
import '@wordpress/block-library/build-style/common.css';     // Block editor specific styles





import "@wordpress/format-library";
import "@wordpress/block-editor/build-style/style.css";
import "@wordpress/block-editor/build-style/content.css";
import "@wordpress/block-library/build-style/style.css";
import "@wordpress/block-library/build-style/editor.css";


import './editor.css';
import './style.scss';
import './reset.scss';
import './custom.css';


// import "./style.scss";

export default function App() {
  const [blocks, updateBlocks] = useState([]);

  useEffect(() => {
    registerCoreBlocks();
    registerBlockType('myplugin/dynamic-block', {
      title: 'Custom Block Development Punit Test',
      category: 'common',
      attributes: {
        title: {
          type: 'string',
          default: 'Default Title'
        },
        content: {
          type: 'string',
          default: 'Default content goes here.'
        },
        color: {
          type: 'string',
          default: 'blue'
        },
      },

      edit({ attributes, setAttributes }) {
        const { title, content, color } = attributes;

        return (
          <>
            <InspectorControls>
              <PanelBody title="Block Settings">
                <TextControl
                  label="Title"
                  value={title}
                  onChange={(value) => setAttributes({ title: value })}
                />
                <TextControl
                  label="Content"
                  value={content}
                  onChange={(value) => setAttributes({ content: value })}
                />
                <TextControl
                  label="Color"
                  value={color}
                  onChange={(value) => setAttributes({ color: value })}
                />
              </PanelBody>
            </InspectorControls>
            <div style={{ color: color }}>
              <RichText
                tagName="h2"
                value={title}
                onChange={(value) => setAttributes({ title: value })}
              />
              <RichText
                tagName="p"
                value={content}
                onChange={(value) => setAttributes({ content: value })}
              />
            </div>
          </>
        );
      },

      save({ attributes }) {
        const { title, content, color } = attributes;

        return (
          <div style={{ color: color }}>
            <RichText.Content tagName="h2" value={title} />
            <RichText.Content tagName="p" value={content} />
          </div>
        );
      }
    });

  }, []);

  const saveContent = () => {
    const serializedContent = serialize(blocks); // Convert blocks to HTML
    console.log("Saved Content: ", serializedContent);
    // Send serializedContent to your backend via API
  };



  return (
    <div className="playground">
      <button onClick={saveContent}>Save Content</button>

      <SlotFillProvider>
        <DropZoneProvider>
          <BlockEditorProvider value={blocks} onInput={updateBlocks} onChange={updateBlocks}>
            <div className="custom_indianic_layout">
              <div className="custom_indianic_header"></div>
              <div className="custom_indianic_content">
                <div className="custom_indianic_left">
                  <Inserter />
                </div>
                <div className="custom_indianic_middle">
                  <BlockEditorKeyboardShortcuts />
                  <BlockTools>
                    <WritingFlow>
                      <ObserveTyping>
                        <BlockList />
                      </ObserveTyping>
                    </WritingFlow>
                  </BlockTools>
                </div>
                <div className="custom_indianic_right">
                  <BlockInspector showNoBlockSelectedMessage blocks={blocks} />
                </div>
              </div>
              <div className="custom_indianic_footer"></div>
            </div>
            <Popover.Slot />
          </BlockEditorProvider>

        </DropZoneProvider>

      </SlotFillProvider>


    </div>
  );
}