define([], function() {
    return [function(require, module, exports) {
        (function(global) {
            (function() {
                var legacy_beautify_html = function(modules) {
                    var installedModules = {};

                    function __webpack_require__(moduleId) {
                        if (installedModules[moduleId]) {
                            return installedModules[moduleId].exports
                        }
                        var module = installedModules[moduleId] = {
                            i: moduleId,
                            l: false,
                            exports: {}
                        };
                        modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
                        module.l = true;
                        return module.exports
                    }
                    __webpack_require__.m = modules;
                    __webpack_require__.c = installedModules;
                    __webpack_require__.i = function(value) {
                        return value
                    };
                    __webpack_require__.d = function(exports, name, getter) {
                        if (!__webpack_require__.o(exports, name)) {
                            Object.defineProperty(exports, name, {
                                configurable: false,
                                enumerable: true,
                                get: getter
                            })
                        }
                    };
                    __webpack_require__.n = function(module) {
                        var getter = module && module.__esModule ? function getDefault() {
                            return module["default"]
                        } : function getModuleExports() {
                            return module
                        };
                        __webpack_require__.d(getter, "a", getter);
                        return getter
                    };
                    __webpack_require__.o = function(object, property) {
                        return Object.prototype.hasOwnProperty.call(object, property)
                    };
                    __webpack_require__.p = "";
                    return __webpack_require__(__webpack_require__.s = 3)
                }([function(module, exports, __webpack_require__) {
                    var mergeOpts = __webpack_require__(2).mergeOpts;
                    var acorn = __webpack_require__(1);
                    var lineBreak = acorn.lineBreak;
                    var allLineBreaks = acorn.allLineBreaks;

                    function ltrim(s) {
                        return s.replace(/^\s+/g, "")
                    }

                    function rtrim(s) {
                        return s.replace(/\s+$/g, "")
                    }

                    function Beautifier(html_source, options, js_beautify, css_beautify) {
                        html_source = html_source || "";
                        var multi_parser, indent_inner_html, indent_body_inner_html, indent_head_inner_html, indent_size, indent_character, wrap_line_length, brace_style, unformatted, content_unformatted, preserve_newlines, max_preserve_newlines, indent_handlebars, wrap_attributes, wrap_attributes_indent_size, is_wrap_attributes_force, is_wrap_attributes_force_expand_multiline, is_wrap_attributes_force_aligned, end_with_newline, extra_liners, eol;
                        options = options || {};
                        options = mergeOpts(options, "html");
                        if ((options.wrap_line_length === undefined || parseInt(options.wrap_line_length, 10) === 0) && (options.max_char !== undefined && parseInt(options.max_char, 10) !== 0)) {
                            options.wrap_line_length = options.max_char
                        }
                        indent_inner_html = options.indent_inner_html === undefined ? false : options.indent_inner_html;
                        indent_body_inner_html = options.indent_body_inner_html === undefined ? true : options.indent_body_inner_html;
                        indent_head_inner_html = options.indent_head_inner_html === undefined ? true : options.indent_head_inner_html;
                        indent_size = options.indent_size === undefined ? 4 : parseInt(options.indent_size, 10);
                        indent_character = options.indent_char === undefined ? " " : options.indent_char;
                        brace_style = options.brace_style === undefined ? "collapse" : options.brace_style;
                        wrap_line_length = parseInt(options.wrap_line_length, 10) === 0 ? 32786 : parseInt(options.wrap_line_length || 250, 10);
                        unformatted = options.unformatted || ["a", "abbr", "area", "audio", "b", "bdi", "bdo", "br", "button", "canvas", "cite", "code", "data", "datalist", "del", "dfn", "em", "embed", "i", "iframe", "img", "input", "ins", "kbd", "keygen", "label", "map", "mark", "math", "meter", "noscript", "object", "output", "progress", "q", "ruby", "s", "samp", "select", "small", "span", "strong", "sub", "sup", "svg", "template", "textarea", "time", "u", "var", "video", "wbr", "text", "acronym", "address", "big", "dt", "ins", "strike", "tt"];
                        content_unformatted = options.content_unformatted || ["pre"];
                        preserve_newlines = options.preserve_newlines === undefined ? true : options.preserve_newlines;
                        max_preserve_newlines = preserve_newlines ? isNaN(parseInt(options.max_preserve_newlines, 10)) ? 32786 : parseInt(options.max_preserve_newlines, 10) : 0;
                        indent_handlebars = options.indent_handlebars === undefined ? false : options.indent_handlebars;
                        wrap_attributes = options.wrap_attributes === undefined ? "auto" : options.wrap_attributes;
                        wrap_attributes_indent_size = isNaN(parseInt(options.wrap_attributes_indent_size, 10)) ? indent_size : parseInt(options.wrap_attributes_indent_size, 10);
                        is_wrap_attributes_force = wrap_attributes.substr(0, "force".length) === "force";
                        is_wrap_attributes_force_expand_multiline = wrap_attributes === "force-expand-multiline";
                        is_wrap_attributes_force_aligned = wrap_attributes === "force-aligned";
                        end_with_newline = options.end_with_newline === undefined ? false : options.end_with_newline;
                        extra_liners = typeof options.extra_liners === "object" && options.extra_liners ? options.extra_liners.concat() : typeof options.extra_liners === "string" ? options.extra_liners.split(",") : "head,body,/html".split(",");
                        eol = options.eol ? options.eol : "auto";
                        if (options.indent_with_tabs) {
                            indent_character = "\t";
                            indent_size = 1
                        }
                        if (eol === "auto") {
                            eol = "\n";
                            if (html_source && lineBreak.test(html_source || "")) {
                                eol = html_source.match(lineBreak)[0]
                            }
                        }
                        eol = eol.replace(/\\r/, "\r").replace(/\\n/, "\n");
                        html_source = html_source.replace(allLineBreaks, "\n");

                        function Parser() {
                            this.pos = 0;
                            this.token = "";
                            this.current_mode = "CONTENT";
                            this.tags = {
                                parent: "parent1",
                                parentcount: 1,
                                parent1: ""
                            };
                            this.tag_type = "";
                            this.token_text = this.last_token = this.last_text = this.token_type = "";
                            this.newlines = 0;
                            this.indent_content = indent_inner_html;
                            this.indent_body_inner_html = indent_body_inner_html;
                            this.indent_head_inner_html = indent_head_inner_html;
                            this.Utils = {
                                whitespace: "\n\r\t ".split(""),
                                single_token: options.void_elements || ["area", "base", "br", "col", "embed", "hr", "img", "input", "keygen", "link", "menuitem", "meta", "param", "source", "track", "wbr", "!doctype", "?xml", "?php", "basefont", "isindex"],
                                extra_liners: extra_liners,
                                in_array: function(what, arr) {
                                    for (var i = 0; i < arr.length; i++) {
                                        if (what === arr[i]) {
                                            return true
                                        }
                                    }
                                    return false
                                }
                            };
                            this.is_whitespace = function(text) {
                                for (var n = 0; n < text.length; n++) {
                                    if (!this.Utils.in_array(text.charAt(n), this.Utils.whitespace)) {
                                        return false
                                    }
                                }
                                return true
                            };
                            this.traverse_whitespace = function() {
                                var input_char = "";
                                input_char = this.input.charAt(this.pos);
                                if (this.Utils.in_array(input_char, this.Utils.whitespace)) {
                                    this.newlines = 0;
                                    while (this.Utils.in_array(input_char, this.Utils.whitespace)) {
                                        if (preserve_newlines && input_char === "\n" && this.newlines <= max_preserve_newlines) {
                                            this.newlines += 1
                                        }
                                        this.pos++;
                                        input_char = this.input.charAt(this.pos)
                                    }
                                    return true
                                }
                                return false
                            };
                            this.space_or_wrap = function(content) {
                                if (this.line_char_count >= this.wrap_line_length) {
                                    this.print_newline(false, content);
                                    this.print_indentation(content);
                                    return true
                                } else {
                                    this.line_char_count++;
                                    content.push(" ");
                                    return false
                                }
                            };
                            this.get_content = function() {
                                var input_char = "",
                                    content = [],
                                    handlebarsStarted = 0;
                                while (this.input.charAt(this.pos) !== "<" || handlebarsStarted === 2) {
                                    if (this.pos >= this.input.length) {
                                        return content.length ? content.join("") : ["", "TK_EOF"]
                                    }
                                    if (handlebarsStarted < 2 && this.traverse_whitespace()) {
                                        this.space_or_wrap(content);
                                        continue
                                    }
                                    input_char = this.input.charAt(this.pos);
                                    if (indent_handlebars) {
                                        if (input_char === "{") {
                                            handlebarsStarted += 1
                                        } else if (handlebarsStarted < 2) {
                                            handlebarsStarted = 0
                                        }
                                        if (input_char === "}" && handlebarsStarted > 0) {
                                            if (handlebarsStarted-- === 0) {
                                                break
                                            }
                                        }
                                        var peek3 = this.input.substr(this.pos, 3);
                                        if (peek3 === "{{#" || peek3 === "{{/") {
                                            break
                                        } else if (peek3 === "{{!") {
                                            return [this.get_tag(), "TK_TAG_HANDLEBARS_COMMENT"]
                                        } else if (this.input.substr(this.pos, 2) === "{{") {
                                            if (this.get_tag(true) === "{{else}}") {
                                                break
                                            }
                                        }
                                    }
                                    this.pos++;
                                    this.line_char_count++;
                                    content.push(input_char)
                                }
                                return content.length ? content.join("") : ""
                            };
                            this.get_contents_to = function(name) {
                                if (this.pos === this.input.length) {
                                    return ["", "TK_EOF"]
                                }
                                var content = "";
                                var reg_match = new RegExp("</" + name + "\\s*>", "igm");
                                reg_match.lastIndex = this.pos;
                                var reg_array = reg_match.exec(this.input);
                                var end_script = reg_array ? reg_array.index : this.input.length;
                                if (this.pos < end_script) {
                                    content = this.input.substring(this.pos, end_script);
                                    this.pos = end_script
                                }
                                return content
                            };
                            this.record_tag = function(tag) {
                                if (this.tags[tag + "count"]) {
                                    this.tags[tag + "count"]++;
                                    this.tags[tag + this.tags[tag + "count"]] = this.indent_level
                                } else {
                                    this.tags[tag + "count"] = 1;
                                    this.tags[tag + this.tags[tag + "count"]] = this.indent_level
                                }
                                this.tags[tag + this.tags[tag + "count"] + "parent"] = this.tags.parent;
                                this.tags.parent = tag + this.tags[tag + "count"]
                            };
                            this.retrieve_tag = function(tag) {
                                if (this.tags[tag + "count"]) {
                                    var temp_parent = this.tags.parent;
                                    while (temp_parent) {
                                        if (tag + this.tags[tag + "count"] === temp_parent) {
                                            break
                                        }
                                        temp_parent = this.tags[temp_parent + "parent"]
                                    }
                                    if (temp_parent) {
                                        this.indent_level = this.tags[tag + this.tags[tag + "count"]];
                                        this.tags.parent = this.tags[temp_parent + "parent"]
                                    }
                                    delete this.tags[tag + this.tags[tag + "count"] + "parent"];
                                    delete this.tags[tag + this.tags[tag + "count"]];
                                    if (this.tags[tag + "count"] === 1) {
                                        delete this.tags[tag + "count"]
                                    } else {
                                        this.tags[tag + "count"]--
                                    }
                                }
                            };
                            this.indent_to_tag = function(tag) {
                                if (!this.tags[tag + "count"]) {
                                    return
                                }
                                var temp_parent = this.tags.parent;
                                while (temp_parent) {
                                    if (tag + this.tags[tag + "count"] === temp_parent) {
                                        break
                                    }
                                    temp_parent = this.tags[temp_parent + "parent"]
                                }
                                if (temp_parent) {
                                    this.indent_level = this.tags[tag + this.tags[tag + "count"]]
                                }
                            };
                            this.get_tag = function(peek) {
                                var input_char = "",
                                    content = [],
                                    comment = "",
                                    space = false,
                                    first_attr = true,
                                    has_wrapped_attrs = false,
                                    tag_start, tag_end, tag_start_char, orig_pos = this.pos,
                                    orig_line_char_count = this.line_char_count,
                                    is_tag_closed = false,
                                    tail;
                                peek = peek !== undefined ? peek : false;
                                do {
                                    if (this.pos >= this.input.length) {
                                        if (peek) {
                                            this.pos = orig_pos;
                                            this.line_char_count = orig_line_char_count
                                        }
                                        return content.length ? content.join("") : ["", "TK_EOF"]
                                    }
                                    input_char = this.input.charAt(this.pos);
                                    this.pos++;
                                    if (this.Utils.in_array(input_char, this.Utils.whitespace)) {
                                        space = true;
                                        continue
                                    }
                                    if (input_char === "'" || input_char === '"') {
                                        input_char += this.get_unformatted(input_char);
                                        space = true
                                    }
                                    if (input_char === "=") {
                                        space = false
                                    }
                                    tail = this.input.substr(this.pos - 1);
                                    if (is_wrap_attributes_force_expand_multiline && has_wrapped_attrs && !is_tag_closed && (input_char === ">" || input_char === "/")) {
                                        if (tail.match(/^\/?\s*>/)) {
                                            space = false;
                                            is_tag_closed = true;
                                            this.print_newline(false, content);
                                            this.print_indentation(content)
                                        }
                                    }
                                    if (content.length && content[content.length - 1] !== "=" && input_char !== ">" && space) {
                                        var wrapped = this.space_or_wrap(content);
                                        var indentAttrs = wrapped && input_char !== "/" && !is_wrap_attributes_force;
                                        space = false;
                                        if (is_wrap_attributes_force && input_char !== "/") {
                                            var force_first_attr_wrap = false;
                                            if (is_wrap_attributes_force_expand_multiline && first_attr) {
                                                var is_only_attribute = tail.match(/^\S*(="([^"]|\\")*")?\s*\/?\s*>/) !== null;
                                                force_first_attr_wrap = !is_only_attribute
                                            }
                                            if (!first_attr || force_first_attr_wrap) {
                                                this.print_newline(false, content);
                                                this.print_indentation(content);
                                                indentAttrs = true
                                            }
                                        }
                                        if (indentAttrs) {
                                            has_wrapped_attrs = true;
                                            var alignment_size = wrap_attributes_indent_size;
                                            if (is_wrap_attributes_force_aligned) {
                                                alignment_size = content.indexOf(" ") + 1
                                            }
                                            for (var count = 0; count < alignment_size; count++) {
                                                content.push(" ")
                                            }
                                        }
                                        if (first_attr) {
                                            for (var i = 0; i < content.length; i++) {
                                                if (content[i] === " ") {
                                                    first_attr = false;
                                                    break
                                                }
                                            }
                                        }
                                    }
                                    if (indent_handlebars && tag_start_char === "<") {
                                        if (input_char + this.input.charAt(this.pos) === "{{") {
                                            input_char += this.get_unformatted("}}");
                                            if (content.length && content[content.length - 1] !== " " && content[content.length - 1] !== "<") {
                                                input_char = " " + input_char
                                            }
                                            space = true
                                        }
                                    }
                                    if (input_char === "<" && !tag_start_char) {
                                        tag_start = this.pos - 1;
                                        tag_start_char = "<"
                                    }
                                    if (indent_handlebars && !tag_start_char) {
                                        if (content.length >= 2 && content[content.length - 1] === "{" && content[content.length - 2] === "{") {
                                            if (input_char === "#" || input_char === "/" || input_char === "!") {
                                                tag_start = this.pos - 3
                                            } else {
                                                tag_start = this.pos - 2
                                            }
                                            tag_start_char = "{"
                                        }
                                    }
                                    this.line_char_count++;
                                    content.push(input_char);
                                    if (content[1] && (content[1] === "!" || content[1] === "?" || content[1] === "%")) {
                                        content = [this.get_comment(tag_start)];
                                        break
                                    }
                                    if (indent_handlebars && content[1] && content[1] === "{" && content[2] && content[2] === "!") {
                                        content = [this.get_comment(tag_start)];
                                        break
                                    }
                                    if (indent_handlebars && tag_start_char === "{" && content.length > 2 && content[content.length - 2] === "}" && content[content.length - 1] === "}") {
                                        break
                                    }
                                } while (input_char !== ">");
                                var tag_complete = content.join("");
                                var tag_index;
                                var tag_offset;
                                if (tag_complete.indexOf(" ") !== -1) {
                                    tag_index = tag_complete.indexOf(" ")
                                } else if (tag_complete.indexOf("\n") !== -1) {
                                    tag_index = tag_complete.indexOf("\n")
                                } else if (tag_complete.charAt(0) === "{") {
                                    tag_index = tag_complete.indexOf("}")
                                } else {
                                    tag_index = tag_complete.indexOf(">")
                                }
                                if (tag_complete.charAt(0) === "<" || !indent_handlebars) {
                                    tag_offset = 1
                                } else {
                                    tag_offset = tag_complete.charAt(2) === "#" ? 3 : 2
                                }
                                var tag_check = tag_complete.substring(tag_offset, tag_index).toLowerCase();
                                if (tag_complete.charAt(tag_complete.length - 2) === "/" || this.Utils.in_array(tag_check, this.Utils.single_token)) {
                                    if (!peek) {
                                        this.tag_type = "SINGLE"
                                    }
                                } else if (indent_handlebars && tag_complete.charAt(0) === "{" && tag_check === "else") {
                                    if (!peek) {
                                        this.indent_to_tag("if");
                                        this.tag_type = "HANDLEBARS_ELSE";
                                        this.indent_content = true;
                                        this.traverse_whitespace()
                                    }
                                } else if (this.is_unformatted(tag_check, unformatted) || this.is_unformatted(tag_check, content_unformatted)) {
                                    comment = this.get_unformatted("</" + tag_check + ">", tag_complete);
                                    content.push(comment);
                                    tag_end = this.pos - 1;
                                    this.tag_type = "SINGLE"
                                } else if (tag_check === "script" && (tag_complete.search("type") === -1 || tag_complete.search("type") > -1 && tag_complete.search(/\b(text|application|dojo)\/(x-)?(javascript|ecmascript|jscript|livescript|(ld\+)?json|method|aspect)/) > -1)) {
                                    if (!peek) {
                                        this.record_tag(tag_check);
                                        this.tag_type = "SCRIPT"
                                    }
                                } else if (tag_check === "style" && (tag_complete.search("type") === -1 || tag_complete.search("type") > -1 && tag_complete.search("text/css") > -1)) {
                                    if (!peek) {
                                        this.record_tag(tag_check);
                                        this.tag_type = "STYLE"
                                    }
                                } else if (tag_check.charAt(0) === "!") {
                                    if (!peek) {
                                        this.tag_type = "SINGLE";
                                        this.traverse_whitespace()
                                    }
                                } else if (!peek) {
                                    if (tag_check.charAt(0) === "/") {
                                        this.retrieve_tag(tag_check.substring(1));
                                        this.tag_type = "END"
                                    } else {
                                        this.record_tag(tag_check);
                                        if (tag_check.toLowerCase() !== "html") {
                                            this.indent_content = true
                                        }
                                        this.tag_type = "START"
                                    }
                                    if (this.traverse_whitespace()) {
                                        this.space_or_wrap(content)
                                    }
                                    if (this.Utils.in_array(tag_check, this.Utils.extra_liners)) {
                                        this.print_newline(false, this.output);
                                        if (this.output.length && this.output[this.output.length - 2] !== "\n") {
                                            this.print_newline(true, this.output)
                                        }
                                    }
                                }
                                if (peek) {
                                    this.pos = orig_pos;
                                    this.line_char_count = orig_line_char_count
                                }
                                return content.join("")
                            };
                            this.get_comment = function(start_pos) {
                                var comment = "",
                                    delimiter = ">",
                                    matched = false;
                                this.pos = start_pos;
                                var input_char = this.input.charAt(this.pos);
                                this.pos++;
                                while (this.pos <= this.input.length) {
                                    comment += input_char;
                                    if (comment.charAt(comment.length - 1) === delimiter.charAt(delimiter.length - 1) && comment.indexOf(delimiter) !== -1) {
                                        break
                                    }
                                    if (!matched && comment.length < 10) {
                                        if (comment.indexOf("<![if") === 0) {
                                            delimiter = "<![endif]>";
                                            matched = true
                                        } else if (comment.indexOf("<![cdata[") === 0) {
                                            delimiter = "]]>";
                                            matched = true
                                        } else if (comment.indexOf("<![") === 0) {
                                            delimiter = "]>";
                                            matched = true
                                        } else if (comment.indexOf("\x3c!--") === 0) {
                                            delimiter = "--\x3e";
                                            matched = true
                                        } else if (comment.indexOf("{{!--") === 0) {
                                            delimiter = "--}}";
                                            matched = true
                                        } else if (comment.indexOf("{{!") === 0) {
                                            if (comment.length === 5 && comment.indexOf("{{!--") === -1) {
                                                delimiter = "}}";
                                                matched = true
                                            }
                                        } else if (comment.indexOf("<?") === 0) {
                                            delimiter = "?>";
                                            matched = true
                                        } else if (comment.indexOf("<%") === 0) {
                                            delimiter = "%>";
                                            matched = true
                                        }
                                    }
                                    input_char = this.input.charAt(this.pos);
                                    this.pos++
                                }
                                return comment
                            };

                            function tokenMatcher(delimiter) {
                                var token = "";
                                var add = function(str) {
                                    var newToken = token + str.toLowerCase();
                                    token = newToken.length <= delimiter.length ? newToken : newToken.substr(newToken.length - delimiter.length, delimiter.length)
                                };
                                var doesNotMatch = function() {
                                    return token.indexOf(delimiter) === -1
                                };
                                return {
                                    add: add,
                                    doesNotMatch: doesNotMatch
                                }
                            }
                            this.get_unformatted = function(delimiter, orig_tag) {
                                if (orig_tag && orig_tag.toLowerCase().indexOf(delimiter) !== -1) {
                                    return ""
                                }
                                var input_char = "";
                                var content = "";
                                var space = true;
                                var delimiterMatcher = tokenMatcher(delimiter);
                                do {
                                    if (this.pos >= this.input.length) {
                                        return content
                                    }
                                    input_char = this.input.charAt(this.pos);
                                    this.pos++;
                                    if (this.Utils.in_array(input_char, this.Utils.whitespace)) {
                                        if (!space) {
                                            this.line_char_count--;
                                            continue
                                        }
                                        if (input_char === "\n" || input_char === "\r") {
                                            content += "\n";
                                            this.line_char_count = 0;
                                            continue
                                        }
                                    }
                                    content += input_char;
                                    delimiterMatcher.add(input_char);
                                    this.line_char_count++;
                                    space = true;
                                    if (indent_handlebars && input_char === "{" && content.length && content.charAt(content.length - 2) === "{") {
                                        content += this.get_unformatted("}}")
                                    }
                                } while (delimiterMatcher.doesNotMatch());
                                return content
                            };
                            this.get_token = function() {
                                var token;
                                if (this.last_token === "TK_TAG_SCRIPT" || this.last_token === "TK_TAG_STYLE") {
                                    var type = this.last_token.substr(7);
                                    token = this.get_contents_to(type);
                                    if (typeof token !== "string") {
                                        return token
                                    }
                                    return [token, "TK_" + type]
                                }
                                if (this.current_mode === "CONTENT") {
                                    token = this.get_content();
                                    if (typeof token !== "string") {
                                        return token
                                    } else {
                                        return [token, "TK_CONTENT"]
                                    }
                                }
                                if (this.current_mode === "TAG") {
                                    token = this.get_tag();
                                    if (typeof token !== "string") {
                                        return token
                                    } else {
                                        var tag_name_type = "TK_TAG_" + this.tag_type;
                                        return [token, tag_name_type]
                                    }
                                }
                            };
                            this.get_full_indent = function(level) {
                                level = this.indent_level + level || 0;
                                if (level < 1) {
                                    return ""
                                }
                                return Array(level + 1).join(this.indent_string)
                            };
                            this.is_unformatted = function(tag_check, unformatted) {
                                if (!this.Utils.in_array(tag_check, unformatted)) {
                                    return false
                                }
                                if (tag_check.toLowerCase() !== "a" || !this.Utils.in_array("a", unformatted)) {
                                    return true
                                }
                                var next_tag = this.get_tag(true);
                                var tag = (next_tag || "").match(/^\s*<\s*\/?([a-z]*)\s*[^>]*>\s*$/);
                                if (!tag || this.Utils.in_array(tag[1], unformatted)) {
                                    return true
                                } else {
                                    return false
                                }
                            };
                            this.printer = function(js_source, indent_character, indent_size, wrap_line_length, brace_style) {
                                this.input = js_source || "";
                                this.input = this.input.replace(/\r\n|[\r\u2028\u2029]/g, "\n");
                                this.output = [];
                                this.indent_character = indent_character;
                                this.indent_string = "";
                                this.indent_size = indent_size;
                                this.brace_style = brace_style;
                                this.indent_level = 0;
                                this.wrap_line_length = wrap_line_length;
                                this.line_char_count = 0;
                                for (var i = 0; i < this.indent_size; i++) {
                                    this.indent_string += this.indent_character
                                }
                                this.print_newline = function(force, arr) {
                                    this.line_char_count = 0;
                                    if (!arr || !arr.length) {
                                        return
                                    }
                                    if (force || arr[arr.length - 1] !== "\n") {
                                        if (arr[arr.length - 1] !== "\n") {
                                            arr[arr.length - 1] = rtrim(arr[arr.length - 1])
                                        }
                                        arr.push("\n")
                                    }
                                };
                                this.print_indentation = function(arr) {
                                    for (var i = 0; i < this.indent_level; i++) {
                                        arr.push(this.indent_string);
                                        this.line_char_count += this.indent_string.length
                                    }
                                };
                                this.print_token = function(text) {
                                    if (this.is_whitespace(text) && !this.output.length) {
                                        return
                                    }
                                    if (text || text !== "") {
                                        if (this.output.length && this.output[this.output.length - 1] === "\n") {
                                            this.print_indentation(this.output);
                                            text = ltrim(text)
                                        }
                                    }
                                    this.print_token_raw(text)
                                };
                                this.print_token_raw = function(text) {
                                    if (this.newlines > 0) {
                                        text = rtrim(text)
                                    }
                                    if (text && text !== "") {
                                        if (text.length > 1 && text.charAt(text.length - 1) === "\n") {
                                            this.output.push(text.slice(0, -1));
                                            this.print_newline(false, this.output)
                                        } else {
                                            this.output.push(text)
                                        }
                                    }
                                    for (var n = 0; n < this.newlines; n++) {
                                        this.print_newline(n > 0, this.output)
                                    }
                                    this.newlines = 0
                                };
                                this.indent = function() {
                                    this.indent_level++
                                };
                                this.unindent = function() {
                                    if (this.indent_level > 0) {
                                        this.indent_level--
                                    }
                                }
                            };
                            return this
                        }
                        this.beautify = function() {
                            multi_parser = new Parser;
                            multi_parser.printer(html_source, indent_character, indent_size, wrap_line_length, brace_style);
                            while (true) {
                                var t = multi_parser.get_token();
                                multi_parser.token_text = t[0];
                                multi_parser.token_type = t[1];
                                if (multi_parser.token_type === "TK_EOF") {
                                    break
                                }
                                switch (multi_parser.token_type) {
                                    case "TK_TAG_START":
                                        multi_parser.print_newline(false, multi_parser.output);
                                        multi_parser.print_token(multi_parser.token_text);
                                        if (multi_parser.indent_content) {
                                            if ((multi_parser.indent_body_inner_html || !multi_parser.token_text.match(/<body(?:.*)>/)) && (multi_parser.indent_head_inner_html || !multi_parser.token_text.match(/<head(?:.*)>/))) {
                                                multi_parser.indent()
                                            }
                                            multi_parser.indent_content = false
                                        }
                                        multi_parser.current_mode = "CONTENT";
                                        break;
                                    case "TK_TAG_STYLE":
                                    case "TK_TAG_SCRIPT":
                                        multi_parser.print_newline(false, multi_parser.output);
                                        multi_parser.print_token(multi_parser.token_text);
                                        multi_parser.current_mode = "CONTENT";
                                        break;
                                    case "TK_TAG_END":
                                        if (multi_parser.last_token === "TK_CONTENT" && multi_parser.last_text === "") {
                                            var tag_name = (multi_parser.token_text.match(/\w+/) || [])[0];
                                            var tag_extracted_from_last_output = null;
                                            if (multi_parser.output.length) {
                                                tag_extracted_from_last_output = multi_parser.output[multi_parser.output.length - 1].match(/(?:<|{{#)\s*(\w+)/)
                                            }
                                            if (tag_extracted_from_last_output === null || tag_extracted_from_last_output[1] !== tag_name && !multi_parser.Utils.in_array(tag_extracted_from_last_output[1], unformatted)) {
                                                multi_parser.print_newline(false, multi_parser.output)
                                            }
                                        }
                                        multi_parser.print_token(multi_parser.token_text);
                                        multi_parser.current_mode = "CONTENT";
                                        break;
                                    case "TK_TAG_SINGLE":
                                        var tag_check = multi_parser.token_text.match(/^\s*<([a-z-]+)/i);
                                        if (!tag_check || !multi_parser.Utils.in_array(tag_check[1], unformatted)) {
                                            multi_parser.print_newline(false, multi_parser.output)
                                        }
                                        multi_parser.print_token(multi_parser.token_text);
                                        multi_parser.current_mode = "CONTENT";
                                        break;
                                    case "TK_TAG_HANDLEBARS_ELSE":
                                        var foundIfOnCurrentLine = false;
                                        for (var lastCheckedOutput = multi_parser.output.length - 1; lastCheckedOutput >= 0; lastCheckedOutput--) {
                                            if (multi_parser.output[lastCheckedOutput] === "\n") {
                                                break
                                            } else {
                                                if (multi_parser.output[lastCheckedOutput].match(/{{#if/)) {
                                                    foundIfOnCurrentLine = true;
                                                    break
                                                }
                                            }
                                        }
                                        if (!foundIfOnCurrentLine) {
                                            multi_parser.print_newline(false, multi_parser.output)
                                        }
                                        multi_parser.print_token(multi_parser.token_text);
                                        if (multi_parser.indent_content) {
                                            multi_parser.indent();
                                            multi_parser.indent_content = false
                                        }
                                        multi_parser.current_mode = "CONTENT";
                                        break;
                                    case "TK_TAG_HANDLEBARS_COMMENT":
                                        multi_parser.print_token(multi_parser.token_text);
                                        multi_parser.current_mode = "TAG";
                                        break;
                                    case "TK_CONTENT":
                                        multi_parser.print_token(multi_parser.token_text);
                                        multi_parser.current_mode = "TAG";
                                        break;
                                    case "TK_STYLE":
                                    case "TK_SCRIPT":
                                        if (multi_parser.token_text !== "") {
                                            multi_parser.print_newline(false, multi_parser.output);
                                            var text = multi_parser.token_text,
                                                _beautifier, script_indent_level = 1;
                                            if (multi_parser.token_type === "TK_SCRIPT") {
                                                _beautifier = typeof js_beautify === "function" && js_beautify
                                            } else if (multi_parser.token_type === "TK_STYLE") {
                                                _beautifier = typeof css_beautify === "function" && css_beautify
                                            }
                                            if (options.indent_scripts === "keep") {
                                                script_indent_level = 0
                                            } else if (options.indent_scripts === "separate") {
                                                script_indent_level = -multi_parser.indent_level
                                            }
                                            var indentation = multi_parser.get_full_indent(script_indent_level);
                                            if (_beautifier) {
                                                var Child_options = function() {
                                                    this.eol = "\n"
                                                };
                                                Child_options.prototype = options;
                                                var child_options = new Child_options;
                                                text = _beautifier(text.replace(/^\s*/, indentation), child_options)
                                            } else {
                                                var white = text.match(/^\s*/)[0];
                                                var _level = white.match(/[^\n\r]*$/)[0].split(multi_parser.indent_string).length - 1;
                                                var reindent = multi_parser.get_full_indent(script_indent_level - _level);
                                                text = text.replace(/^\s*/, indentation).replace(/\r\n|\r|\n/g, "\n" + reindent).replace(/\s+$/, "")
                                            }
                                            if (text) {
                                                multi_parser.print_token_raw(text);
                                                multi_parser.print_newline(true, multi_parser.output)
                                            }
                                        }
                                        multi_parser.current_mode = "TAG";
                                        break;
                                    default:
                                        if (multi_parser.token_text !== "") {
                                            multi_parser.print_token(multi_parser.token_text)
                                        }
                                        break
                                }
                                multi_parser.last_token = multi_parser.token_type;
                                multi_parser.last_text = multi_parser.token_text
                            }
                            var sweet_code = multi_parser.output.join("").replace(/[\r\n\t ]+$/, "");
                            if (end_with_newline) {
                                sweet_code += "\n"
                            }
                            if (eol !== "\n") {
                                sweet_code = sweet_code.replace(/[\n]/g, eol)
                            }
                            return sweet_code
                        }
                    }
                    module.exports.Beautifier = Beautifier
                }, function(module, exports) {
                    var nonASCIIwhitespace = /[\u1680\u180e\u2000-\u200a\u202f\u205f\u3000\ufeff]/;
                    var nonASCIIidentifierStartChars = "ªµºÀ-ÖØ-öø-ˁˆ-ˑˠ-ˤˬˮͰ-ʹͶͷͺ-ͽΆΈ-ΊΌΎ-ΡΣ-ϵϷ-ҁҊ-ԧԱ-Ֆՙա-ևא-תװ-ײؠ-يٮٯٱ-ۓەۥۦۮۯۺ-ۼۿܐܒ-ܯݍ-ޥޱߊ-ߪߴߵߺࠀ-ࠕࠚࠤࠨࡀ-ࡘࢠࢢ-ࢬऄ-हऽॐक़-ॡॱ-ॷॹ-ॿঅ-ঌএঐও-নপ-রলশ-হঽৎড়ঢ়য়-ৡৰৱਅ-ਊਏਐਓ-ਨਪ-ਰਲਲ਼ਵਸ਼ਸਹਖ਼-ੜਫ਼ੲ-ੴઅ-ઍએ-ઑઓ-નપ-રલળવ-હઽૐૠૡଅ-ଌଏଐଓ-ନପ-ରଲଳଵ-ହଽଡ଼ଢ଼ୟ-ୡୱஃஅ-ஊஎ-ஐஒ-கஙசஜஞடணதந-பம-ஹௐఅ-ఌఎ-ఐఒ-నప-ళవ-హఽౘౙౠౡಅ-ಌಎ-ಐಒ-ನಪ-ಳವ-ಹಽೞೠೡೱೲഅ-ഌഎ-ഐഒ-ഺഽൎൠൡൺ-ൿඅ-ඖක-නඳ-රලව-ෆก-ะาำเ-ๆກຂຄງຈຊຍດ-ທນ-ຟມ-ຣລວສຫອ-ະາຳຽເ-ໄໆໜ-ໟༀཀ-ཇཉ-ཬྈ-ྌက-ဪဿၐ-ၕၚ-ၝၡၥၦၮ-ၰၵ-ႁႎႠ-ჅჇჍა-ჺჼ-ቈቊ-ቍቐ-ቖቘቚ-ቝበ-ኈኊ-ኍነ-ኰኲ-ኵኸ-ኾዀዂ-ዅወ-ዖዘ-ጐጒ-ጕጘ-ፚᎀ-ᎏᎠ-Ᏼᐁ-ᙬᙯ-ᙿᚁ-ᚚᚠ-ᛪᛮ-ᛰᜀ-ᜌᜎ-ᜑᜠ-ᜱᝀ-ᝑᝠ-ᝬᝮ-ᝰក-ឳៗៜᠠ-ᡷᢀ-ᢨᢪᢰ-ᣵᤀ-ᤜᥐ-ᥭᥰ-ᥴᦀ-ᦫᧁ-ᧇᨀ-ᨖᨠ-ᩔᪧᬅ-ᬳᭅ-ᭋᮃ-ᮠᮮᮯᮺ-ᯥᰀ-ᰣᱍ-ᱏᱚ-ᱽᳩ-ᳬᳮ-ᳱᳵᳶᴀ-ᶿḀ-ἕἘ-Ἕἠ-ὅὈ-Ὅὐ-ὗὙὛὝὟ-ώᾀ-ᾴᾶ-ᾼιῂ-ῄῆ-ῌῐ-ΐῖ-Ίῠ-Ῥῲ-ῴῶ-ῼⁱⁿₐ-ₜℂℇℊ-ℓℕℙ-ℝℤΩℨK-ℭℯ-ℹℼ-ℿⅅ-ⅉⅎⅠ-ↈⰀ-Ⱞⰰ-ⱞⱠ-ⳤⳫ-ⳮⳲⳳⴀ-ⴥⴧⴭⴰ-ⵧⵯⶀ-ⶖⶠ-ⶦⶨ-ⶮⶰ-ⶶⶸ-ⶾⷀ-ⷆⷈ-ⷎⷐ-ⷖⷘ-ⷞⸯ々-〇〡-〩〱-〵〸-〼ぁ-ゖゝ-ゟァ-ヺー-ヿㄅ-ㄭㄱ-ㆎㆠ-ㆺㇰ-ㇿ㐀-䶵一-鿌ꀀ-ꒌꓐ-ꓽꔀ-ꘌꘐ-ꘟꘪꘫꙀ-ꙮꙿ-ꚗꚠ-ꛯꜗ-ꜟꜢ-ꞈꞋ-ꞎꞐ-ꞓꞠ-Ɦꟸ-ꠁꠃ-ꠅꠇ-ꠊꠌ-ꠢꡀ-ꡳꢂ-ꢳꣲ-ꣷꣻꤊ-ꤥꤰ-ꥆꥠ-ꥼꦄ-ꦲꧏꨀ-ꨨꩀ-ꩂꩄ-ꩋꩠ-ꩶꩺꪀ-ꪯꪱꪵꪶꪹ-ꪽꫀꫂꫛ-ꫝꫠ-ꫪꫲ-ꫴꬁ-ꬆꬉ-ꬎꬑ-ꬖꬠ-ꬦꬨ-ꬮꯀ-ꯢ가-힣ힰ-ퟆퟋ-ퟻ豈-舘並-龎ﬀ-ﬆﬓ-ﬗיִײַ-ﬨשׁ-זּטּ-לּמּנּסּףּפּצּ-ﮱﯓ-ﴽﵐ-ﶏﶒ-ﷇﷰ-ﷻﹰ-ﹴﹶ-ﻼＡ-Ｚａ-ｚｦ-ﾾￂ-ￇￊ-ￏￒ-ￗￚ-ￜ";
                    var nonASCIIidentifierChars = "̀-ͯ҃-֑҇-ׇֽֿׁׂׅׄؐ-ؚؠ-ىٲ-ۓۧ-ۨۻ-ۼܰ-݊ࠀ-ࠔࠛ-ࠣࠥ-ࠧࠩ-࠭ࡀ-ࡗࣤ-ࣾऀ-ःऺ-़ा-ॏ॑-ॗॢ-ॣ०-९ঁ-ঃ়া-ৄেৈৗয়-ৠਁ-ਃ਼ਾ-ੂੇੈੋ-੍ੑ੦-ੱੵઁ-ઃ઼ા-ૅે-ૉો-્ૢ-ૣ૦-૯ଁ-ଃ଼ା-ୄେୈୋ-୍ୖୗୟ-ୠ୦-୯ஂா-ூெ-ைொ-்ௗ௦-௯ఁ-ఃె-ైొ-్ౕౖౢ-ౣ౦-౯ಂಃ಼ಾ-ೄೆ-ೈೊ-್ೕೖೢ-ೣ೦-೯ംഃെ-ൈൗൢ-ൣ൦-൯ංඃ්ා-ුූෘ-ෟෲෳิ-ฺเ-ๅ๐-๙ິ-ູ່-ໍ໐-໙༘༙༠-༩༹༵༷ཁ-ཇཱ-྄྆-྇ྍ-ྗྙ-ྼ࿆က-ဩ၀-၉ၧ-ၭၱ-ၴႂ-ႍႏ-ႝ፝-፟ᜎ-ᜐᜠ-ᜰᝀ-ᝐᝲᝳក-ឲ៝០-៩᠋-᠍᠐-᠙ᤠ-ᤫᤰ-᤻ᥑ-ᥭᦰ-ᧀᧈ-ᧉ᧐-᧙ᨀ-ᨕᨠ-ᩓ᩠-᩿᩼-᪉᪐-᪙ᭆ-ᭋ᭐-᭙᭫-᭳᮰-᮹᯦-᯳ᰀ-ᰢ᱀-᱉ᱛ-ᱽ᳐-᳒ᴀ-ᶾḁ-ἕ‌‍‿⁀⁔⃐-⃥⃜⃡-⃰ⶁ-ⶖⷠ-ⷿ〡-〨゙゚Ꙁ-ꙭꙴ-꙽ꚟ꛰-꛱ꟸ-ꠀ꠆ꠋꠣ-ꠧꢀ-ꢁꢴ-꣄꣐-꣙ꣳ-ꣷ꤀-꤉ꤦ-꤭ꤰ-ꥅꦀ-ꦃ꦳-꧀ꨀ-ꨧꩀ-ꩁꩌ-ꩍ꩐-꩙ꩻꫠ-ꫩꫲ-ꫳꯀ-ꯡ꯬꯭꯰-꯹ﬠ-ﬨ︀-️︠-︦︳︴﹍-﹏０-９＿";
                    var nonASCIIidentifierStart = new RegExp("[" + nonASCIIidentifierStartChars + "]");
                    var nonASCIIidentifier = new RegExp("[" + nonASCIIidentifierStartChars + nonASCIIidentifierChars + "]");
                    exports.newline = /[\n\r\u2028\u2029]/;
                    exports.lineBreak = new RegExp("\r\n|" + exports.newline.source);
                    exports.allLineBreaks = new RegExp(exports.lineBreak.source, "g");
                    exports.isIdentifierStart = function(code) {
                        if (code < 65) return code === 36 || code === 64;
                        if (code < 91) return true;
                        if (code < 97) return code === 95;
                        if (code < 123) return true;
                        return code >= 170 && nonASCIIidentifierStart.test(String.fromCharCode(code))
                    };
                    exports.isIdentifierChar = function(code) {
                        if (code < 48) return code === 36;
                        if (code < 58) return true;
                        if (code < 65) return false;
                        if (code < 91) return true;
                        if (code < 97) return code === 95;
                        if (code < 123) return true;
                        return code >= 170 && nonASCIIidentifier.test(String.fromCharCode(code))
                    }
                }, function(module, exports) {
                    function mergeOpts(allOptions, targetType) {
                        var finalOpts = {};
                        var name;
                        for (name in allOptions) {
                            if (name !== targetType) {
                                finalOpts[name] = allOptions[name]
                            }
                        }
                        if (targetType in allOptions) {
                            for (name in allOptions[targetType]) {
                                finalOpts[name] = allOptions[targetType][name]
                            }
                        }
                        return finalOpts
                    }
                    module.exports.mergeOpts = mergeOpts
                }, function(module, exports, __webpack_require__) {
                    var Beautifier = __webpack_require__(0).Beautifier;

                    function style_html(html_source, options, js_beautify, css_beautify) {
                        var beautifier = new Beautifier(html_source, options, js_beautify, css_beautify);
                        return beautifier.beautify()
                    }
                    module.exports = style_html
                }]);
                var style_html = legacy_beautify_html;
                if (typeof define === "function" && define.amd) {
                    var js_beautify = require("./beautify.js");
					var css_beautify = require("./beautify-css.js");
					exports.html_beautify = function (html_source, options) {
						return style_html(html_source, options, js_beautify.js_beautify, css_beautify.css_beautify)
					}
                    /*define(["require", "./beautify", "./beautify-css"], function(requireamd) {
                        var js_beautify = requireamd("./beautify");
                        var css_beautify = requireamd("./beautify-css");
                        return {
                            html_beautify: function(html_source, options) {
                                return style_html(html_source, options, js_beautify.js_beautify, css_beautify.css_beautify)
                            }
                        }
                    })*/
                } else if (typeof exports !== "undefined") {
                    var js_beautify = require("./beautify.js");
                    var css_beautify = require("./beautify-css.js");
                    exports.html_beautify = function(html_source, options) {
                        return style_html(html_source, options, js_beautify.js_beautify, css_beautify.css_beautify)
                    }
                } else if (typeof window !== "undefined") {
                    window.html_beautify = function(html_source, options) {
                        return style_html(html_source, options, window.js_beautify, window.css_beautify)
                    }
                } else if (typeof global !== "undefined") {
                    global.html_beautify = function(html_source, options) {
                        return style_html(html_source, options, global.js_beautify, global.css_beautify)
                    }
                }
            })()
        }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
    }, {
        "./beautify-css.js": 1065,
        "./beautify.js": 1067
    }]
});