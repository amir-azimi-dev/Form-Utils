"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import {
    ClassicEditor,
    Alignment,
    AutoLink,
    Autosave,
    BalloonToolbar,
    BlockQuote,
    BlockToolbar,
    Bold,
    Bookmark,
    Code,
    CodeBlock,
    Essentials,
    FontBackgroundColor,
    FontColor,
    FontFamily,
    FontSize,
    FullPage,
    GeneralHtmlSupport,
    Heading,
    Highlight,
    HorizontalLine,
    HtmlComment,
    HtmlEmbed,
    Indent,
    IndentBlock,
    Italic,
    Link,
    List,
    ListProperties,
    Paragraph,
    RemoveFormat,
    ShowBlocks,
    SpecialCharacters,
    Strikethrough,
    Style,
    Subscript,
    Superscript,
    Table,
    TableCaption,
    TableCellProperties,
    TableColumnResize,
    TableProperties,
    TableToolbar,
    TodoList,
    Underline,
    WordCount,
    HeadingOption,
    StyleDefinition,
} from "ckeditor5";
import { EditorConfig } from "ckeditor5";
import EditorPropType from "./editor.props.types";

import "ckeditor5/ckeditor5.css";
import "./editor.css";

const LICENSE_KEY = "GPL";

function Editor({ value, placeholder, isValid, error, onChange }: EditorPropType) {
    const [editorInstance, setEditorInstance] = useState<ClassicEditor | null>(null);
    const [isLayoutReady, setIsLayoutReady] = useState<boolean>(false);
    const [isFocused, setIsFocused] = useState<boolean>(false);
    const editorContainerRef = useRef<null | HTMLDivElement>(null);
    const editorRef = useRef<null | HTMLDivElement>(null);
    const editorWordCountRef = useRef<null | HTMLDivElement>(null);
    const editorMenuBarRef = useRef<null | HTMLDivElement>(null);

    useEffect(() => {
        if (editorInstance && value === "") {
            editorInstance.setData("");
        }

    }, [value]);

    useEffect(() => {
        setIsLayoutReady(true);

        return () => {
            setIsLayoutReady(false);
        };

    }, []);

    const { editorConfig }: { editorConfig: EditorConfig } = useMemo(() => {
        if (!isLayoutReady) {
            return { editorConfig: {} as EditorConfig };
        }

        return {
            editorConfig: {
                initialData: value ? value : "",
                licenseKey: LICENSE_KEY,
                placeholder,
                language: "fa",
                toolbar: {
                    items: [
                        "showBlocks",
                        "|",
                        "heading",
                        "style",
                        "|",
                        "fontSize",
                        "fontFamily",
                        "fontColor",
                        "fontBackgroundColor",
                        "|",
                        "bold",
                        "italic",
                        "underline",
                        "strikethrough",
                        "subscript",
                        "superscript",
                        "code",
                        "removeFormat",
                        "|",
                        "specialCharacters",
                        "horizontalLine",
                        "link",
                        "bookmark",
                        "insertTable",
                        "highlight",
                        "blockQuote",
                        "codeBlock",
                        "htmlEmbed",
                        "|",
                        "alignment",
                        "|",
                        "bulletedList",
                        "numberedList",
                        "todoList",
                        "outdent",
                        "indent"
                    ],
                    shouldNotGroupWhenFull: true
                },
                plugins: [
                    Alignment,
                    AutoLink,
                    Autosave,
                    BalloonToolbar,
                    BlockQuote,
                    BlockToolbar,
                    Bold,
                    Bookmark,
                    Code,
                    CodeBlock,
                    Essentials,
                    FontBackgroundColor,
                    FontColor,
                    FontFamily,
                    FontSize,
                    FullPage,
                    GeneralHtmlSupport,
                    Heading,
                    Highlight,
                    HorizontalLine,
                    HtmlComment,
                    HtmlEmbed,
                    Indent,
                    IndentBlock,
                    Italic,
                    Link,
                    List,
                    ListProperties,
                    Paragraph,
                    RemoveFormat,
                    ShowBlocks,
                    SpecialCharacters,
                    Strikethrough,
                    Style,
                    Subscript,
                    Superscript,
                    Table,
                    TableCaption,
                    TableCellProperties,
                    TableColumnResize,
                    TableProperties,
                    TableToolbar,
                    TodoList,
                    Underline,
                    WordCount
                ],
                balloonToolbar: ["bold", "italic", "|", "link", "|", "bulletedList", "numberedList"],
                blockToolbar: [
                    "fontSize",
                    "fontColor",
                    "fontBackgroundColor",
                    "|",
                    "bold",
                    "italic",
                    "|",
                    "link",
                    "insertTable",
                    "|",
                    "bulletedList",
                    "numberedList",
                    "outdent",
                    "indent"
                ],
                fontFamily: {
                    supportAllValues: true
                },
                fontSize: {
                    options: [10, 12, 14, "default", 18, 20, 22],
                    supportAllValues: true
                },
                heading: {
                    options: [
                        {
                            model: "paragraph",
                            title: "Paragraph",
                            class: "ck-heading_paragraph",
                            view: undefined
                        },
                        {
                            model: "heading1",
                            title: "Heading 1",
                            view: "h1",
                            class: "ck-heading_heading1"
                        },
                        {
                            model: "heading2",
                            title: "Heading 2",
                            view: "h2",
                            class: "ck-heading_heading2"
                        },
                        {
                            model: "heading3",
                            title: "Heading 3",
                            view: "h3",
                            class: "ck-heading_heading3"
                        },
                        {
                            model: "heading4",
                            title: "Heading 4",
                            view: "h4",
                            class: "ck-heading_heading4"
                        },
                        {
                            model: "heading5",
                            title: "Heading 5",
                            view: "h5",
                            class: "ck-heading_heading5"
                        },
                        {
                            model: "heading6",
                            title: "Heading 6",
                            view: "h6",
                            class: "ck-heading_heading6"
                        }
                    ] as HeadingOption[]
                },
                htmlSupport: {
                    allow: [
                        {
                            name: /^.*$/,
                            styles: true,
                            attributes: true,
                            classes: true
                        }
                    ]
                },
                link: {
                    addTargetToExternalLinks: true,
                    defaultProtocol: "https://",
                    decorators: {
                        toggleDownloadable: {
                            mode: "manual",
                            label: "Downloadable",
                            attributes: {
                                download: "file"
                            }
                        }
                    }
                },
                list: {
                    properties: {
                        styles: true,
                        startIndex: true,
                        reversed: true
                    }
                },
                menuBar: {
                    isVisible: true
                },
                style: {
                    definitions: [
                        {
                            name: "Article category",
                            element: "h3",
                            classes: ["category"]
                        },
                        {
                            name: "Heading 2",
                            element: "h2",
                            classes: ["h"]
                        },
                        {
                            name: "Subtitle",
                            element: "h3",
                            classes: ["document-subtitle"]
                        },
                        {
                            name: "Info box",
                            element: "p",
                            classes: ["info-box"]
                        },
                        {
                            name: "Side quote",
                            element: "blockquote",
                            classes: ["side-quote"]
                        },
                        {
                            name: "Marker",
                            element: "span",
                            classes: ["marker"]
                        },
                        {
                            name: "Spoiler",
                            element: "span",
                            classes: ["spoiler"]
                        },
                        {
                            name: "Code (dark)",
                            element: "pre",
                            classes: ["fancy-code", "fancy-code-dark"]
                        },
                        {
                            name: "Code (bright)",
                            element: "pre",
                            classes: ["fancy-code", "fancy-code-bright"]
                        }
                    ] as StyleDefinition[]
                },
                table: {
                    contentToolbar: ["tableColumn", "tableRow", "mergeTableCells", "tableProperties", "tableCellProperties"]
                }
            }
        };
    }, [isLayoutReady]);

    return (
        <div className="min-h-64">
            {isLayoutReady ? (
                <div
                    className={`main-container relative z-0 border ${isFocused ? (
                        error ? "border-red-500" : isValid ? "border-green-500" : ""
                    ) : (
                        error ? "border-red-300" : isValid ? "border-green-300" : ""
                    )}`}
                >
                    <div
                        className="editor-container editor-container_classic-editor editor-container_include-block-toolbar editor-container_include-style editor-container_include-word-count"
                        ref={editorContainerRef}
                    >
                        <div className="editor-container__editor">
                            <div ref={editorRef}>
                                {isLayoutReady && editorConfig && (
                                    <CKEditor
                                        onReady={editor => {
                                            setEditorInstance(editor);
                                            const wordCount = editor.plugins.get("WordCount");
                                            editorWordCountRef.current?.appendChild(wordCount.wordCountContainer);
                                            const menuBarViewElement = editor.ui.view.menuBarView?.element;
                                            menuBarViewElement && editorMenuBarRef.current?.appendChild(menuBarViewElement);
                                        }}
                                        onAfterDestroy={() => {
                                            const editorWordCountRefChildren = editorWordCountRef.current?.children;
                                            editorWordCountRefChildren && Array.from(editorWordCountRefChildren).forEach(child => child.remove());

                                            const editorMenuBarRefChildren = editorMenuBarRef.current?.children;
                                            editorMenuBarRefChildren && Array.from(editorMenuBarRefChildren).forEach(child => child.remove());
                                        }}
                                        editor={ClassicEditor}
                                        config={editorConfig}

                                        onFocus={() => setIsFocused(true)}
                                        onBlur={() => setIsFocused(false)}
                                        onChange={(_, editor) => onChange(editor.getData())}
                                    />
                                )}
                            </div>
                        </div>
                        <div className="flex-center justify-between">
                            <p className="mt-1 mr-3 text-red-500 text-xs">{error && error}</p>
                            <div className="editor_container__word-count" ref={editorWordCountRef}></div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="h-64 bg-gray-100 animate-pulse"></div>
            )
            }
        </div>
    );
}

export default Editor;