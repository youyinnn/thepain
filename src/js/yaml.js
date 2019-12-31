! function(e) {
    if ("object" == typeof exports && "undefined" != typeof module) module.exports = e();
    else if ("function" == typeof define && define.amd) define([], e);
    else {
        ("undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this).jsyaml = e()
    }
}(function() {
    return function o(a, s, c) {
        function u(t, e) {
            if (!s[t]) {
                if (!a[t]) {
                    var n = "function" == typeof require && require;
                    if (!e && n) return n(t, !0);
                    if (l) return l(t, !0);
                    var i = new Error("Cannot find module '" + t + "'");
                    throw i.code = "MODULE_NOT_FOUND", i
                }
                var r = s[t] = {
                    exports: {}
                };
                a[t][0].call(r.exports, function(e) {
                    return u(a[t][1][e] || e)
                }, r, r.exports, o, a, s, c)
            }
            return s[t].exports
        }
        for (var l = "function" == typeof require && require, e = 0; e < c.length; e++) u(c[e]);
        return u
    }({
        1: [function(e, t, n) {
            "use strict";
            var i = e("./js-yaml/loader"),
                r = e("./js-yaml/dumper");

            function o(e) {
                return function() {
                    throw new Error("Function " + e + " is deprecated and cannot be used.")
                }
            }
            t.exports.Type = e("./js-yaml/type"), t.exports.Schema = e("./js-yaml/schema"), t.exports.FAILSAFE_SCHEMA = e("./js-yaml/schema/failsafe"), t.exports.JSON_SCHEMA = e("./js-yaml/schema/json"), t.exports.CORE_SCHEMA = e("./js-yaml/schema/core"), t.exports.DEFAULT_SAFE_SCHEMA = e("./js-yaml/schema/default_safe"), t.exports.DEFAULT_FULL_SCHEMA = e("./js-yaml/schema/default_full"), t.exports.load = i.load, t.exports.loadAll = i.loadAll, t.exports.safeLoad = i.safeLoad, t.exports.safeLoadAll = i.safeLoadAll, t.exports.dump = r.dump, t.exports.safeDump = r.safeDump, t.exports.YAMLException = e("./js-yaml/exception"), t.exports.MINIMAL_SCHEMA = e("./js-yaml/schema/failsafe"), t.exports.SAFE_SCHEMA = e("./js-yaml/schema/default_safe"), t.exports.DEFAULT_SCHEMA = e("./js-yaml/schema/default_full"), t.exports.scan = o("scan"), t.exports.parse = o("parse"), t.exports.compose = o("compose"), t.exports.addConstructor = o("addConstructor")
        }, {
            "./js-yaml/dumper": 3,
            "./js-yaml/exception": 4,
            "./js-yaml/loader": 5,
            "./js-yaml/schema": 7,
            "./js-yaml/schema/core": 8,
            "./js-yaml/schema/default_full": 9,
            "./js-yaml/schema/default_safe": 10,
            "./js-yaml/schema/failsafe": 11,
            "./js-yaml/schema/json": 12,
            "./js-yaml/type": 13
        }],
        2: [function(e, t, n) {
            "use strict";

            function i(e) {
                return null == e
            }
            t.exports.isNothing = i, t.exports.isObject = function(e) {
                return "object" == typeof e && null !== e
            }, t.exports.toArray = function(e) {
                return Array.isArray(e) ? e : i(e) ? [] : [e]
            }, t.exports.repeat = function(e, t) {
                var n, i = "";
                for (n = 0; n < t; n += 1) i += e;
                return i
            }, t.exports.isNegativeZero = function(e) {
                return 0 === e && Number.NEGATIVE_INFINITY === 1 / e
            }, t.exports.extend = function(e, t) {
                var n, i, r, o;
                if (t)
                    for (n = 0, i = (o = Object.keys(t)).length; n < i; n += 1) e[r = o[n]] = t[r];
                return e
            }
        }, {}],
        3: [function(e, t, n) {
            "use strict";
            var c = e("./common"),
                d = e("./exception"),
                i = e("./schema/default_full"),
                r = e("./schema/default_safe"),
                p = Object.prototype.toString,
                u = Object.prototype.hasOwnProperty,
                o = 9,
                h = 10,
                a = 32,
                f = 33,
                m = 34,
                g = 35,
                y = 37,
                x = 38,
                v = 39,
                A = 42,
                b = 44,
                w = 45,
                C = 58,
                k = 62,
                j = 63,
                S = 64,
                I = 91,
                O = 93,
                E = 96,
                F = 123,
                _ = 124,
                N = 125,
                s = {
                    0: "\\0",
                    7: "\\a",
                    8: "\\b",
                    9: "\\t",
                    10: "\\n",
                    11: "\\v",
                    12: "\\f",
                    13: "\\r",
                    27: "\\e",
                    34: '\\"',
                    92: "\\\\",
                    133: "\\N",
                    160: "\\_",
                    8232: "\\L",
                    8233: "\\P"
                },
                l = ["y", "Y", "yes", "Yes", "YES", "on", "On", "ON", "n", "N", "no", "No", "NO", "off", "Off", "OFF"];

            function M(e) {
                var t, n, i;
                if (t = e.toString(16).toUpperCase(), e <= 255) n = "x", i = 2;
                else if (e <= 65535) n = "u", i = 4;
                else {
                    if (!(e <= 4294967295)) throw new d("code point within a string may not be greater than 0xFFFFFFFF");
                    n = "U", i = 8
                }
                return "\\" + n + c.repeat("0", i - t.length) + t
            }

            function T(e) {
                this.schema = e.schema || i, this.indent = Math.max(1, e.indent || 2), this.noArrayIndent = e.noArrayIndent || !1, this.skipInvalid = e.skipInvalid || !1, this.flowLevel = c.isNothing(e.flowLevel) ? -1 : e.flowLevel, this.styleMap = function(e, t) {
                    var n, i, r, o, a, s, c;
                    if (null === t) return {};
                    for (n = {}, r = 0, o = (i = Object.keys(t)).length; r < o; r += 1) a = i[r], s = String(t[a]), "!!" === a.slice(0, 2) && (a = "tag:yaml.org,2002:" + a.slice(2)), (c = e.compiledTypeMap.fallback[a]) && u.call(c.styleAliases, s) && (s = c.styleAliases[s]), n[a] = s;
                    return n
                }(this.schema, e.styles || null), this.sortKeys = e.sortKeys || !1, this.lineWidth = e.lineWidth || 80, this.noRefs = e.noRefs || !1, this.noCompatMode = e.noCompatMode || !1, this.condenseFlow = e.condenseFlow || !1, this.implicitTypes = this.schema.compiledImplicit, this.explicitTypes = this.schema.compiledExplicit, this.tag = null, this.result = "", this.duplicates = [], this.usedDuplicates = null
            }

            function L(e, t) {
                for (var n, i = c.repeat(" ", t), r = 0, o = -1, a = "", s = e.length; r < s;) r = -1 === (o = e.indexOf("\n", r)) ? (n = e.slice(r), s) : (n = e.slice(r, o + 1), o + 1), n.length && "\n" !== n && (a += i), a += n;
                return a
            }

            function D(e, t) {
                return "\n" + c.repeat(" ", e.indent * t)
            }

            function U(e) {
                return e === a || e === o
            }

            function q(e) {
                return 32 <= e && e <= 126 || 161 <= e && e <= 55295 && 8232 !== e && 8233 !== e || 57344 <= e && e <= 65533 && 65279 !== e || 65536 <= e && e <= 1114111
            }

            function Y(e) {
                return q(e) && 65279 !== e && e !== b && e !== I && e !== O && e !== F && e !== N && e !== C && e !== g
            }

            function R(e) {
                return /^\n* /.test(e)
            }
            var B = 1,
                P = 2,
                W = 3,
                K = 4,
                $ = 5;

            function H(e, t, n, i, r) {
                var o, a, s = !1,
                    c = !1,
                    u = -1 !== i,
                    l = -1,
                    p = function(e) {
                        return q(e) && 65279 !== e && !U(e) && e !== w && e !== j && e !== C && e !== b && e !== I && e !== O && e !== F && e !== N && e !== g && e !== x && e !== A && e !== f && e !== _ && e !== k && e !== v && e !== m && e !== y && e !== S && e !== E
                    }(e.charCodeAt(0)) && !U(e.charCodeAt(e.length - 1));
                if (t)
                    for (o = 0; o < e.length; o++) {
                        if (!q(a = e.charCodeAt(o))) return $;
                        p = p && Y(a)
                    } else {
                        for (o = 0; o < e.length; o++) {
                            if ((a = e.charCodeAt(o)) === h) s = !0, u && (c = c || i < o - l - 1 && " " !== e[l + 1], l = o);
                            else if (!q(a)) return $;
                            p = p && Y(a)
                        }
                        c = c || u && i < o - l - 1 && " " !== e[l + 1]
                    }
                return s || c ? 9 < n && R(e) ? $ : c ? K : W : p && !r(e) ? B : P
            }

            function G(i, r, o, a) {
                i.dump = function() {
                    if (0 === r.length) return "''";
                    if (!i.noCompatMode && -1 !== l.indexOf(r)) return "'" + r + "'";
                    var e = i.indent * Math.max(1, o),
                        t = -1 === i.lineWidth ? -1 : Math.max(Math.min(i.lineWidth, 40), i.lineWidth - e),
                        n = a || -1 < i.flowLevel && o >= i.flowLevel;
                    switch (H(r, n, i.indent, t, function(e) {
                        return function(e, t) {
                            var n, i;
                            for (n = 0, i = e.implicitTypes.length; n < i; n += 1)
                                if (e.implicitTypes[n].resolve(t)) return !0;
                            return !1
                        }(i, e)
                    })) {
                        case B:
                            return r;
                        case P:
                            return "'" + r.replace(/'/g, "''") + "'";
                        case W:
                            return "|" + V(r, i.indent) + Z(L(r, e));
                        case K:
                            return ">" + V(r, i.indent) + Z(L(function(t, n) {
                                var e, i, r = /(\n+)([^\n]*)/g,
                                    o = function() {
                                        var e = t.indexOf("\n");
                                        return e = -1 !== e ? e : t.length, r.lastIndex = e, z(t.slice(0, e), n)
                                    }(),
                                    a = "\n" === t[0] || " " === t[0];
                                for (; i = r.exec(t);) {
                                    var s = i[1],
                                        c = i[2];
                                    e = " " === c[0], o += s + (a || e || "" === c ? "" : "\n") + z(c, n), a = e
                                }
                                return o
                            }(r, t), e));
                        case $:
                            return '"' + function(e) {
                                for (var t, n, i, r = "", o = 0; o < e.length; o++) 55296 <= (t = e.charCodeAt(o)) && t <= 56319 && 56320 <= (n = e.charCodeAt(o + 1)) && n <= 57343 ? (r += M(1024 * (t - 55296) + n - 56320 + 65536), o++) : (i = s[t], r += !i && q(t) ? e[o] : i || M(t));
                                return r
                            }(r) + '"';
                        default:
                            throw new d("impossible error: invalid scalar style")
                    }
                }()
            }

            function V(e, t) {
                var n = R(e) ? String(t) : "",
                    i = "\n" === e[e.length - 1];
                return n + (i && ("\n" === e[e.length - 2] || "\n" === e) ? "+" : i ? "" : "-") + "\n"
            }

            function Z(e) {
                return "\n" === e[e.length - 1] ? e.slice(0, -1) : e
            }

            function z(e, t) {
                if ("" === e || " " === e[0]) return e;
                for (var n, i, r = / [^ ]/g, o = 0, a = 0, s = 0, c = ""; n = r.exec(e);) t < (s = n.index) - o && (i = o < a ? a : s, c += "\n" + e.slice(o, i), o = i + 1), a = s;
                return c += "\n", e.length - o > t && o < a ? c += e.slice(o, a) + "\n" + e.slice(a + 1) : c += e.slice(o), c.slice(1)
            }

            function J(e, t, n) {
                var i, r, o, a, s, c;
                for (o = 0, a = (r = n ? e.explicitTypes : e.implicitTypes).length; o < a; o += 1)
                    if (((s = r[o]).instanceOf || s.predicate) && (!s.instanceOf || "object" == typeof t && t instanceof s.instanceOf) && (!s.predicate || s.predicate(t))) {
                        if (e.tag = n ? s.tag : "?", s.represent) {
                            if (c = e.styleMap[s.tag] || s.defaultStyle, "[object Function]" === p.call(s.represent)) i = s.represent(t, c);
                            else {
                                if (!u.call(s.represent, c)) throw new d("!<" + s.tag + '> tag resolver accepts not "' + c + '" style');
                                i = s.represent[c](t, c)
                            }
                            e.dump = i
                        }
                        return !0
                    } return !1
            }

            function Q(e, t, n, i, r, o) {
                e.tag = null, e.dump = n, J(e, n, !1) || J(e, n, !0);
                var a = p.call(e.dump);
                i && (i = e.flowLevel < 0 || e.flowLevel > t);
                var s, c, u = "[object Object]" === a || "[object Array]" === a;
                if (u && (c = -1 !== (s = e.duplicates.indexOf(n))), (null !== e.tag && "?" !== e.tag || c || 2 !== e.indent && 0 < t) && (r = !1), c && e.usedDuplicates[s]) e.dump = "*ref_" + s;
                else {
                    if (u && c && !e.usedDuplicates[s] && (e.usedDuplicates[s] = !0), "[object Object]" === a) i && 0 !== Object.keys(e.dump).length ? (function(e, t, n, i) {
                        var r, o, a, s, c, u, l = "",
                            p = e.tag,
                            f = Object.keys(n);
                        if (!0 === e.sortKeys) f.sort();
                        else if ("function" == typeof e.sortKeys) f.sort(e.sortKeys);
                        else if (e.sortKeys) throw new d("sortKeys must be a boolean or a function");
                        for (r = 0, o = f.length; r < o; r += 1) u = "", i && 0 === r || (u += D(e, t)), s = n[a = f[r]], Q(e, t + 1, a, !0, !0, !0) && ((c = null !== e.tag && "?" !== e.tag || e.dump && 1024 < e.dump.length) && (e.dump && h === e.dump.charCodeAt(0) ? u += "?" : u += "? "), u += e.dump, c && (u += D(e, t)), Q(e, t + 1, s, !0, c) && (e.dump && h === e.dump.charCodeAt(0) ? u += ":" : u += ": ", l += u += e.dump));
                        e.tag = p, e.dump = l || "{}"
                    }(e, t, e.dump, r), c && (e.dump = "&ref_" + s + e.dump)) : (function(e, t, n) {
                        var i, r, o, a, s, c = "",
                            u = e.tag,
                            l = Object.keys(n);
                        for (i = 0, r = l.length; i < r; i += 1) s = e.condenseFlow ? '"' : "", 0 !== i && (s += ", "), a = n[o = l[i]], Q(e, t, o, !1, !1) && (1024 < e.dump.length && (s += "? "), s += e.dump + (e.condenseFlow ? '"' : "") + ":" + (e.condenseFlow ? "" : " "), Q(e, t, a, !1, !1) && (c += s += e.dump));
                        e.tag = u, e.dump = "{" + c + "}"
                    }(e, t, e.dump), c && (e.dump = "&ref_" + s + " " + e.dump));
                    else if ("[object Array]" === a) {
                        var l = e.noArrayIndent && 0 < t ? t - 1 : t;
                        i && 0 !== e.dump.length ? (function(e, t, n, i) {
                            var r, o, a = "",
                                s = e.tag;
                            for (r = 0, o = n.length; r < o; r += 1) Q(e, t + 1, n[r], !0, !0) && (i && 0 === r || (a += D(e, t)), e.dump && h === e.dump.charCodeAt(0) ? a += "-" : a += "- ", a += e.dump);
                            e.tag = s, e.dump = a || "[]"
                        }(e, l, e.dump, r), c && (e.dump = "&ref_" + s + e.dump)) : (function(e, t, n) {
                            var i, r, o = "",
                                a = e.tag;
                            for (i = 0, r = n.length; i < r; i += 1) Q(e, t, n[i], !1, !1) && (0 !== i && (o += "," + (e.condenseFlow ? "" : " ")), o += e.dump);
                            e.tag = a, e.dump = "[" + o + "]"
                        }(e, l, e.dump), c && (e.dump = "&ref_" + s + " " + e.dump))
                    } else {
                        if ("[object String]" !== a) {
                            if (e.skipInvalid) return !1;
                            throw new d("unacceptable kind of an object to dump " + a)
                        }
                        "?" !== e.tag && G(e, e.dump, t, o)
                    }
                    null !== e.tag && "?" !== e.tag && (e.dump = "!<" + e.tag + "> " + e.dump)
                }
                return !0
            }

            function X(e, t) {
                var n, i, r = [],
                    o = [];
                for (function e(t, n, i) {
                        var r, o, a;
                        if (null !== t && "object" == typeof t)
                            if (-1 !== (o = n.indexOf(t))) - 1 === i.indexOf(o) && i.push(o);
                            else if (n.push(t), Array.isArray(t))
                            for (o = 0, a = t.length; o < a; o += 1) e(t[o], n, i);
                        else
                            for (r = Object.keys(t), o = 0, a = r.length; o < a; o += 1) e(t[r[o]], n, i)
                    }(e, r, o), n = 0, i = o.length; n < i; n += 1) t.duplicates.push(r[o[n]]);
                t.usedDuplicates = new Array(i)
            }

            function ee(e, t) {
                var n = new T(t = t || {});
                return n.noRefs || X(e, n), Q(n, 0, e, !0, !0) ? n.dump + "\n" : ""
            }
            t.exports.dump = ee, t.exports.safeDump = function(e, t) {
                return ee(e, c.extend({
                    schema: r
                }, t))
            }
        }, {
            "./common": 2,
            "./exception": 4,
            "./schema/default_full": 9,
            "./schema/default_safe": 10
        }],
        4: [function(e, t, n) {
            "use strict";

            function i(e, t) {
                Error.call(this), this.name = "YAMLException", this.reason = e, this.mark = t, this.message = (this.reason || "(unknown reason)") + (this.mark ? " " + this.mark.toString() : ""), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = (new Error).stack || ""
            }((i.prototype = Object.create(Error.prototype)).constructor = i).prototype.toString = function(e) {
                var t = this.name + ": ";
                return t += this.reason || "(unknown reason)", !e && this.mark && (t += " " + this.mark.toString()), t
            }, t.exports = i
        }, {}],
        5: [function(e, t, n) {
            "use strict";
            var g = e("./common"),
                i = e("./exception"),
                r = e("./mark"),
                o = e("./schema/default_safe"),
                a = e("./schema/default_full"),
                y = Object.prototype.hasOwnProperty,
                x = 1,
                v = 2,
                A = 3,
                b = 4,
                w = 1,
                C = 2,
                k = 3,
                c = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/,
                s = /[\x85\u2028\u2029]/,
                u = /[,\[\]\{\}]/,
                l = /^(?:!|!!|![a-z\-]+!)$/i,
                p = /^(?:!|[^,\[\]\{\}])(?:%[0-9a-f]{2}|[0-9a-z\-#;\/\?:@&=\+\$,_\.!~\*'\(\)\[\]])*$/i;

            function f(e) {
                return Object.prototype.toString.call(e)
            }

            function j(e) {
                return 10 === e || 13 === e
            }

            function S(e) {
                return 9 === e || 32 === e
            }

            function I(e) {
                return 9 === e || 32 === e || 10 === e || 13 === e
            }

            function O(e) {
                return 44 === e || 91 === e || 93 === e || 123 === e || 125 === e
            }

            function d(e) {
                return 48 === e ? "\0" : 97 === e ? "" : 98 === e ? "\b" : 116 === e ? "\t" : 9 === e ? "\t" : 110 === e ? "\n" : 118 === e ? "\v" : 102 === e ? "\f" : 114 === e ? "\r" : 101 === e ? "" : 32 === e ? " " : 34 === e ? '"' : 47 === e ? "/" : 92 === e ? "\\" : 78 === e ? "" : 95 === e ? " " : 76 === e ? "\u2028" : 80 === e ? "\u2029" : ""
            }
            for (var E = new Array(256), F = new Array(256), h = 0; h < 256; h++) E[h] = d(h) ? 1 : 0, F[h] = d(h);

            function m(e, t) {
                this.input = e, this.filename = t.filename || null, this.schema = t.schema || a, this.onWarning = t.onWarning || null, this.legacy = t.legacy || !1, this.json = t.json || !1, this.listener = t.listener || null, this.implicitTypes = this.schema.compiledImplicit, this.typeMap = this.schema.compiledTypeMap, this.length = e.length, this.position = 0, this.line = 0, this.lineStart = 0, this.lineIndent = 0, this.documents = []
            }

            function _(e, t) {
                return new i(t, new r(e.filename, e.input, e.position, e.line, e.position - e.lineStart))
            }

            function N(e, t) {
                throw _(e, t)
            }

            function M(e, t) {
                e.onWarning && e.onWarning.call(null, _(e, t))
            }
            var T = {
                YAML: function(e, t, n) {
                    var i, r, o;
                    null !== e.version && N(e, "duplication of %YAML directive"), 1 !== n.length && N(e, "YAML directive accepts exactly one argument"), null === (i = /^([0-9]+)\.([0-9]+)$/.exec(n[0])) && N(e, "ill-formed argument of the YAML directive"), r = parseInt(i[1], 10), o = parseInt(i[2], 10), 1 !== r && N(e, "unacceptable YAML version of the document"), e.version = n[0], e.checkLineBreaks = o < 2, 1 !== o && 2 !== o && M(e, "unsupported YAML version of the document")
                },
                TAG: function(e, t, n) {
                    var i, r;
                    2 !== n.length && N(e, "TAG directive accepts exactly two arguments"), i = n[0], r = n[1], l.test(i) || N(e, "ill-formed tag handle (first argument) of the TAG directive"), y.call(e.tagMap, i) && N(e, 'there is a previously declared suffix for "' + i + '" tag handle'), p.test(r) || N(e, "ill-formed tag prefix (second argument) of the TAG directive"), e.tagMap[i] = r
                }
            };

            function L(e, t, n, i) {
                var r, o, a, s;
                if (t < n) {
                    if (s = e.input.slice(t, n), i)
                        for (r = 0, o = s.length; r < o; r += 1) 9 === (a = s.charCodeAt(r)) || 32 <= a && a <= 1114111 || N(e, "expected valid JSON character");
                    else c.test(s) && N(e, "the stream contains non-printable characters");
                    e.result += s
                }
            }

            function D(e, t, n, i) {
                var r, o, a, s;
                for (g.isObject(n) || N(e, "cannot merge mappings; the provided source object is unacceptable"), a = 0, s = (r = Object.keys(n)).length; a < s; a += 1) o = r[a], y.call(t, o) || (t[o] = n[o], i[o] = !0)
            }

            function U(e, t, n, i, r, o, a, s) {
                var c, u;
                if (Array.isArray(r))
                    for (c = 0, u = (r = Array.prototype.slice.call(r)).length; c < u; c += 1) Array.isArray(r[c]) && N(e, "nested arrays are not supported inside keys"), "object" == typeof r && "[object Object]" === f(r[c]) && (r[c] = "[object Object]");
                if ("object" == typeof r && "[object Object]" === f(r) && (r = "[object Object]"), r = String(r), null === t && (t = {}), "tag:yaml.org,2002:merge" === i)
                    if (Array.isArray(o))
                        for (c = 0, u = o.length; c < u; c += 1) D(e, t, o[c], n);
                    else D(e, t, o, n);
                else e.json || y.call(n, r) || !y.call(t, r) || (e.line = a || e.line, e.position = s || e.position, N(e, "duplicated mapping key")), t[r] = o, delete n[r];
                return t
            }

            function q(e) {
                var t;
                10 === (t = e.input.charCodeAt(e.position)) ? e.position++ : 13 === t ? (e.position++, 10 === e.input.charCodeAt(e.position) && e.position++) : N(e, "a line break is expected"), e.line += 1, e.lineStart = e.position
            }

            function Y(e, t, n) {
                for (var i = 0, r = e.input.charCodeAt(e.position); 0 !== r;) {
                    for (; S(r);) r = e.input.charCodeAt(++e.position);
                    if (t && 35 === r)
                        for (; 10 !== (r = e.input.charCodeAt(++e.position)) && 13 !== r && 0 !== r;);
                    if (!j(r)) break;
                    for (q(e), r = e.input.charCodeAt(e.position), i++, e.lineIndent = 0; 32 === r;) e.lineIndent++, r = e.input.charCodeAt(++e.position)
                }
                return -1 !== n && 0 !== i && e.lineIndent < n && M(e, "deficient indentation"), i
            }

            function R(e) {
                var t, n = e.position;
                return !(45 !== (t = e.input.charCodeAt(n)) && 46 !== t || t !== e.input.charCodeAt(n + 1) || t !== e.input.charCodeAt(n + 2) || (n += 3, 0 !== (t = e.input.charCodeAt(n)) && !I(t)))
            }

            function B(e, t) {
                1 === t ? e.result += " " : 1 < t && (e.result += g.repeat("\n", t - 1))
            }

            function P(e, t) {
                var n, i, r = e.tag,
                    o = e.anchor,
                    a = [],
                    s = !1;
                for (null !== e.anchor && (e.anchorMap[e.anchor] = a), i = e.input.charCodeAt(e.position); 0 !== i && 45 === i && I(e.input.charCodeAt(e.position + 1));)
                    if (s = !0, e.position++, Y(e, !0, -1) && e.lineIndent <= t) a.push(null), i = e.input.charCodeAt(e.position);
                    else if (n = e.line, $(e, t, A, !1, !0), a.push(e.result), Y(e, !0, -1), i = e.input.charCodeAt(e.position), (e.line === n || e.lineIndent > t) && 0 !== i) N(e, "bad indentation of a sequence entry");
                else if (e.lineIndent < t) break;
                return !!s && (e.tag = r, e.anchor = o, e.kind = "sequence", e.result = a, !0)
            }

            function W(e) {
                var t, n, i, r, o = !1,
                    a = !1;
                if (33 !== (r = e.input.charCodeAt(e.position))) return !1;
                if (null !== e.tag && N(e, "duplication of a tag property"), 60 === (r = e.input.charCodeAt(++e.position)) ? (o = !0, r = e.input.charCodeAt(++e.position)) : 33 === r ? (a = !0, n = "!!", r = e.input.charCodeAt(++e.position)) : n = "!", t = e.position, o) {
                    for (; 0 !== (r = e.input.charCodeAt(++e.position)) && 62 !== r;);
                    e.position < e.length ? (i = e.input.slice(t, e.position), r = e.input.charCodeAt(++e.position)) : N(e, "unexpected end of the stream within a verbatim tag")
                } else {
                    for (; 0 !== r && !I(r);) 33 === r && (a ? N(e, "tag suffix cannot contain exclamation marks") : (n = e.input.slice(t - 1, e.position + 1), l.test(n) || N(e, "named tag handle cannot contain such characters"), a = !0, t = e.position + 1)), r = e.input.charCodeAt(++e.position);
                    i = e.input.slice(t, e.position), u.test(i) && N(e, "tag suffix cannot contain flow indicator characters")
                }
                return i && !p.test(i) && N(e, "tag name cannot contain such characters: " + i), o ? e.tag = i : y.call(e.tagMap, n) ? e.tag = e.tagMap[n] + i : "!" === n ? e.tag = "!" + i : "!!" === n ? e.tag = "tag:yaml.org,2002:" + i : N(e, 'undeclared tag handle "' + n + '"'), !0
            }

            function K(e) {
                var t, n;
                if (38 !== (n = e.input.charCodeAt(e.position))) return !1;
                for (null !== e.anchor && N(e, "duplication of an anchor property"), n = e.input.charCodeAt(++e.position), t = e.position; 0 !== n && !I(n) && !O(n);) n = e.input.charCodeAt(++e.position);
                return e.position === t && N(e, "name of an anchor node must contain at least one character"), e.anchor = e.input.slice(t, e.position), !0
            }

            function $(e, t, n, i, r) {
                var o, a, s, c, u, l, p, f, d = 1,
                    h = !1,
                    m = !1;
                if (null !== e.listener && e.listener("open", e), e.tag = null, e.anchor = null, e.kind = null, e.result = null, o = a = s = b === n || A === n, i && Y(e, !0, -1) && (h = !0, e.lineIndent > t ? d = 1 : e.lineIndent === t ? d = 0 : e.lineIndent < t && (d = -1)), 1 === d)
                    for (; W(e) || K(e);) Y(e, !0, -1) ? (h = !0, s = o, e.lineIndent > t ? d = 1 : e.lineIndent === t ? d = 0 : e.lineIndent < t && (d = -1)) : s = !1;
                if (s && (s = h || r), 1 !== d && b !== n || (p = x === n || v === n ? t : t + 1, f = e.position - e.lineStart, 1 === d ? s && (P(e, f) || function(e, t, n) {
                        var i, r, o, a, s, c = e.tag,
                            u = e.anchor,
                            l = {},
                            p = {},
                            f = null,
                            d = null,
                            h = null,
                            m = !1,
                            g = !1;
                        for (null !== e.anchor && (e.anchorMap[e.anchor] = l), s = e.input.charCodeAt(e.position); 0 !== s;) {
                            if (i = e.input.charCodeAt(e.position + 1), o = e.line, a = e.position, 63 !== s && 58 !== s || !I(i)) {
                                if (!$(e, n, v, !1, !0)) break;
                                if (e.line === o) {
                                    for (s = e.input.charCodeAt(e.position); S(s);) s = e.input.charCodeAt(++e.position);
                                    if (58 === s) I(s = e.input.charCodeAt(++e.position)) || N(e, "a whitespace character is expected after the key-value separator within a block mapping"), m && (U(e, l, p, f, d, null), f = d = h = null), r = m = !(g = !0), f = e.tag, d = e.result;
                                    else {
                                        if (!g) return e.tag = c, e.anchor = u, !0;
                                        N(e, "can not read an implicit mapping pair; a colon is missed")
                                    }
                                } else {
                                    if (!g) return e.tag = c, e.anchor = u, !0;
                                    N(e, "can not read a block mapping entry; a multiline key may not be an implicit key")
                                }
                            } else 63 === s ? (m && (U(e, l, p, f, d, null), f = d = h = null), r = m = g = !0) : m ? r = !(m = !1) : N(e, "incomplete explicit mapping pair; a key node is missed; or followed by a non-tabulated empty line"), e.position += 1, s = i;
                            if ((e.line === o || e.lineIndent > t) && ($(e, t, b, !0, r) && (m ? d = e.result : h = e.result), m || (U(e, l, p, f, d, h, o, a), f = d = h = null), Y(e, !0, -1), s = e.input.charCodeAt(e.position)), e.lineIndent > t && 0 !== s) N(e, "bad indentation of a mapping entry");
                            else if (e.lineIndent < t) break
                        }
                        return m && U(e, l, p, f, d, null), g && (e.tag = c, e.anchor = u, e.kind = "mapping", e.result = l), g
                    }(e, f, p)) || function(e, t) {
                        var n, i, r, o, a, s, c, u, l, p, f = !0,
                            d = e.tag,
                            h = e.anchor,
                            m = {};
                        if (91 === (p = e.input.charCodeAt(e.position))) s = !(r = 93), i = [];
                        else {
                            if (123 !== p) return !1;
                            r = 125, s = !0, i = {}
                        }
                        for (null !== e.anchor && (e.anchorMap[e.anchor] = i), p = e.input.charCodeAt(++e.position); 0 !== p;) {
                            if (Y(e, !0, t), (p = e.input.charCodeAt(e.position)) === r) return e.position++, e.tag = d, e.anchor = h, e.kind = s ? "mapping" : "sequence", e.result = i, !0;
                            f || N(e, "missed comma between flow collection entries"), l = null, o = a = !1, 63 === p && I(e.input.charCodeAt(e.position + 1)) && (o = a = !0, e.position++, Y(e, !0, t)), n = e.line, $(e, t, x, !1, !0), u = e.tag, c = e.result, Y(e, !0, t), p = e.input.charCodeAt(e.position), !a && e.line !== n || 58 !== p || (o = !0, p = e.input.charCodeAt(++e.position), Y(e, !0, t), $(e, t, x, !1, !0), l = e.result), s ? U(e, i, m, u, c, l) : o ? i.push(U(e, null, m, u, c, l)) : i.push(c), Y(e, !0, t), 44 === (p = e.input.charCodeAt(e.position)) ? (f = !0, p = e.input.charCodeAt(++e.position)) : f = !1
                        }
                        N(e, "unexpected end of the stream within a flow collection")
                    }(e, p) ? m = !0 : (a && function(e, t) {
                        var n, i, r, o, a, s = w,
                            c = !1,
                            u = !1,
                            l = t,
                            p = 0,
                            f = !1;
                        if (124 === (o = e.input.charCodeAt(e.position))) i = !1;
                        else {
                            if (62 !== o) return !1;
                            i = !0
                        }
                        for (e.kind = "scalar", e.result = ""; 0 !== o;)
                            if (43 === (o = e.input.charCodeAt(++e.position)) || 45 === o) w === s ? s = 43 === o ? k : C : N(e, "repeat of a chomping mode identifier");
                            else {
                                if (!(0 <= (r = 48 <= (a = o) && a <= 57 ? a - 48 : -1))) break;
                                0 == r ? N(e, "bad explicit indentation width of a block scalar; it cannot be less than one") : u ? N(e, "repeat of an indentation width identifier") : (l = t + r - 1, u = !0)
                            } if (S(o)) {
                            for (; S(o = e.input.charCodeAt(++e.position)););
                            if (35 === o)
                                for (; !j(o = e.input.charCodeAt(++e.position)) && 0 !== o;);
                        }
                        for (; 0 !== o;) {
                            for (q(e), e.lineIndent = 0, o = e.input.charCodeAt(e.position);
                                (!u || e.lineIndent < l) && 32 === o;) e.lineIndent++, o = e.input.charCodeAt(++e.position);
                            if (!u && e.lineIndent > l && (l = e.lineIndent), j(o)) p++;
                            else {
                                if (e.lineIndent < l) {
                                    s === k ? e.result += g.repeat("\n", c ? 1 + p : p) : s === w && c && (e.result += "\n");
                                    break
                                }
                                for (i ? S(o) ? (f = !0, e.result += g.repeat("\n", c ? 1 + p : p)) : f ? (f = !1, e.result += g.repeat("\n", p + 1)) : 0 === p ? c && (e.result += " ") : e.result += g.repeat("\n", p) : e.result += g.repeat("\n", c ? 1 + p : p), u = c = !0, p = 0, n = e.position; !j(o) && 0 !== o;) o = e.input.charCodeAt(++e.position);
                                L(e, n, e.position, !1)
                            }
                        }
                        return !0
                    }(e, p) || function(e, t) {
                        var n, i, r;
                        if (39 !== (n = e.input.charCodeAt(e.position))) return !1;
                        for (e.kind = "scalar", e.result = "", e.position++, i = r = e.position; 0 !== (n = e.input.charCodeAt(e.position));)
                            if (39 === n) {
                                if (L(e, i, e.position, !0), 39 !== (n = e.input.charCodeAt(++e.position))) return !0;
                                i = e.position, e.position++, r = e.position
                            } else j(n) ? (L(e, i, r, !0), B(e, Y(e, !1, t)), i = r = e.position) : e.position === e.lineStart && R(e) ? N(e, "unexpected end of the document within a single quoted scalar") : (e.position++, r = e.position);
                        N(e, "unexpected end of the stream within a single quoted scalar")
                    }(e, p) || function(e, t) {
                        var n, i, r, o, a, s, c, u, l, p;
                        if (34 !== (s = e.input.charCodeAt(e.position))) return !1;
                        for (e.kind = "scalar", e.result = "", e.position++, n = i = e.position; 0 !== (s = e.input.charCodeAt(e.position));) {
                            if (34 === s) return L(e, n, e.position, !0), e.position++, !0;
                            if (92 === s) {
                                if (L(e, n, e.position, !0), j(s = e.input.charCodeAt(++e.position))) Y(e, !1, t);
                                else if (s < 256 && E[s]) e.result += F[s], e.position++;
                                else if (0 < (a = 120 === (p = s) ? 2 : 117 === p ? 4 : 85 === p ? 8 : 0)) {
                                    for (r = a, o = 0; 0 < r; r--) s = e.input.charCodeAt(++e.position), l = void 0, 0 <= (a = 48 <= (u = s) && u <= 57 ? u - 48 : 97 <= (l = 32 | u) && l <= 102 ? l - 97 + 10 : -1) ? o = (o << 4) + a : N(e, "expected hexadecimal character");
                                    e.result += (c = o) <= 65535 ? String.fromCharCode(c) : String.fromCharCode(55296 + (c - 65536 >> 10), 56320 + (c - 65536 & 1023)), e.position++
                                } else N(e, "unknown escape sequence");
                                n = i = e.position
                            } else j(s) ? (L(e, n, i, !0), B(e, Y(e, !1, t)), n = i = e.position) : e.position === e.lineStart && R(e) ? N(e, "unexpected end of the document within a double quoted scalar") : (e.position++, i = e.position)
                        }
                        N(e, "unexpected end of the stream within a double quoted scalar")
                    }(e, p) ? m = !0 : ! function(e) {
                        var t, n, i;
                        if (42 !== (i = e.input.charCodeAt(e.position))) return !1;
                        for (i = e.input.charCodeAt(++e.position), t = e.position; 0 !== i && !I(i) && !O(i);) i = e.input.charCodeAt(++e.position);
                        return e.position === t && N(e, "name of an alias node must contain at least one character"), n = e.input.slice(t, e.position), e.anchorMap.hasOwnProperty(n) || N(e, 'unidentified alias "' + n + '"'), e.result = e.anchorMap[n], Y(e, !0, -1), !0
                    }(e) ? function(e, t, n) {
                        var i, r, o, a, s, c, u, l, p = e.kind,
                            f = e.result;
                        if (I(l = e.input.charCodeAt(e.position)) || O(l) || 35 === l || 38 === l || 42 === l || 33 === l || 124 === l || 62 === l || 39 === l || 34 === l || 37 === l || 64 === l || 96 === l) return !1;
                        if ((63 === l || 45 === l) && (I(i = e.input.charCodeAt(e.position + 1)) || n && O(i))) return !1;
                        for (e.kind = "scalar", e.result = "", r = o = e.position, a = !1; 0 !== l;) {
                            if (58 === l) {
                                if (I(i = e.input.charCodeAt(e.position + 1)) || n && O(i)) break
                            } else if (35 === l) {
                                if (I(e.input.charCodeAt(e.position - 1))) break
                            } else {
                                if (e.position === e.lineStart && R(e) || n && O(l)) break;
                                if (j(l)) {
                                    if (s = e.line, c = e.lineStart, u = e.lineIndent, Y(e, !1, -1), e.lineIndent >= t) {
                                        a = !0, l = e.input.charCodeAt(e.position);
                                        continue
                                    }
                                    e.position = o, e.line = s, e.lineStart = c, e.lineIndent = u;
                                    break
                                }
                            }
                            a && (L(e, r, o, !1), B(e, e.line - s), r = o = e.position, a = !1), S(l) || (o = e.position + 1), l = e.input.charCodeAt(++e.position)
                        }
                        return L(e, r, o, !1), !!e.result || (e.kind = p, e.result = f, !1)
                    }(e, p, x === n) && (m = !0, null === e.tag && (e.tag = "?")) : (m = !0, null === e.tag && null === e.anchor || N(e, "alias node should not have any properties")), null !== e.anchor && (e.anchorMap[e.anchor] = e.result)) : 0 === d && (m = s && P(e, f))), null !== e.tag && "!" !== e.tag)
                    if ("?" === e.tag) {
                        for (c = 0, u = e.implicitTypes.length; c < u; c += 1)
                            if ((l = e.implicitTypes[c]).resolve(e.result)) {
                                e.result = l.construct(e.result), e.tag = l.tag, null !== e.anchor && (e.anchorMap[e.anchor] = e.result);
                                break
                            }
                    } else y.call(e.typeMap[e.kind || "fallback"], e.tag) ? (l = e.typeMap[e.kind || "fallback"][e.tag], null !== e.result && l.kind !== e.kind && N(e, "unacceptable node kind for !<" + e.tag + '> tag; it should be "' + l.kind + '", not "' + e.kind + '"'), l.resolve(e.result) ? (e.result = l.construct(e.result), null !== e.anchor && (e.anchorMap[e.anchor] = e.result)) : N(e, "cannot resolve a node with !<" + e.tag + "> explicit tag")) : N(e, "unknown tag !<" + e.tag + ">");
                return null !== e.listener && e.listener("close", e), null !== e.tag || null !== e.anchor || m
            }

            function H(e) {
                var t, n, i, r, o = e.position,
                    a = !1;
                for (e.version = null, e.checkLineBreaks = e.legacy, e.tagMap = {}, e.anchorMap = {}; 0 !== (r = e.input.charCodeAt(e.position)) && (Y(e, !0, -1), r = e.input.charCodeAt(e.position), !(0 < e.lineIndent || 37 !== r));) {
                    for (a = !0, r = e.input.charCodeAt(++e.position), t = e.position; 0 !== r && !I(r);) r = e.input.charCodeAt(++e.position);
                    for (i = [], (n = e.input.slice(t, e.position)).length < 1 && N(e, "directive name must not be less than one character in length"); 0 !== r;) {
                        for (; S(r);) r = e.input.charCodeAt(++e.position);
                        if (35 === r) {
                            for (; 0 !== (r = e.input.charCodeAt(++e.position)) && !j(r););
                            break
                        }
                        if (j(r)) break;
                        for (t = e.position; 0 !== r && !I(r);) r = e.input.charCodeAt(++e.position);
                        i.push(e.input.slice(t, e.position))
                    }
                    0 !== r && q(e), y.call(T, n) ? T[n](e, n, i) : M(e, 'unknown document directive "' + n + '"')
                }
                Y(e, !0, -1), 0 === e.lineIndent && 45 === e.input.charCodeAt(e.position) && 45 === e.input.charCodeAt(e.position + 1) && 45 === e.input.charCodeAt(e.position + 2) ? (e.position += 3, Y(e, !0, -1)) : a && N(e, "directives end mark is expected"), $(e, e.lineIndent - 1, b, !1, !0), Y(e, !0, -1), e.checkLineBreaks && s.test(e.input.slice(o, e.position)) && M(e, "non-ASCII line breaks are interpreted as content"), e.documents.push(e.result), e.position === e.lineStart && R(e) ? 46 === e.input.charCodeAt(e.position) && (e.position += 3, Y(e, !0, -1)) : e.position < e.length - 1 && N(e, "end of the stream or a document separator is expected")
            }

            function G(e, t) {
                t = t || {}, 0 !== (e = String(e)).length && (10 !== e.charCodeAt(e.length - 1) && 13 !== e.charCodeAt(e.length - 1) && (e += "\n"), 65279 === e.charCodeAt(0) && (e = e.slice(1)));
                var n = new m(e, t);
                for (n.input += "\0"; 32 === n.input.charCodeAt(n.position);) n.lineIndent += 1, n.position += 1;
                for (; n.position < n.length - 1;) H(n);
                return n.documents
            }

            function V(e, t, n) {
                var i, r, o = G(e, n);
                if ("function" != typeof t) return o;
                for (i = 0, r = o.length; i < r; i += 1) t(o[i])
            }

            function Z(e, t) {
                var n = G(e, t);
                if (0 !== n.length) {
                    if (1 === n.length) return n[0];
                    throw new i("expected a single document in the stream, but found more")
                }
            }
            t.exports.loadAll = V, t.exports.load = Z, t.exports.safeLoadAll = function(e, t, n) {
                if ("function" != typeof t) return V(e, g.extend({
                    schema: o
                }, n));
                V(e, t, g.extend({
                    schema: o
                }, n))
            }, t.exports.safeLoad = function(e, t) {
                return Z(e, g.extend({
                    schema: o
                }, t))
            }
        }, {
            "./common": 2,
            "./exception": 4,
            "./mark": 6,
            "./schema/default_full": 9,
            "./schema/default_safe": 10
        }],
        6: [function(e, t, n) {
            "use strict";
            var s = e("./common");

            function i(e, t, n, i, r) {
                this.name = e, this.buffer = t, this.position = n, this.line = i, this.column = r
            }
            i.prototype.getSnippet = function(e, t) {
                var n, i, r, o, a;
                if (!this.buffer) return null;
                for (e = e || 4, t = t || 75, n = "", i = this.position; 0 < i && -1 === "\0\r\n\u2028\u2029".indexOf(this.buffer.charAt(i - 1));)
                    if (i -= 1, this.position - i > t / 2 - 1) {
                        n = " ... ", i += 5;
                        break
                    } for (r = "", o = this.position; o < this.buffer.length && -1 === "\0\r\n\u2028\u2029".indexOf(this.buffer.charAt(o));)
                    if ((o += 1) - this.position > t / 2 - 1) {
                        r = " ... ", o -= 5;
                        break
                    } return a = this.buffer.slice(i, o), s.repeat(" ", e) + n + a + r + "\n" + s.repeat(" ", e + this.position - i + n.length) + "^"
            }, i.prototype.toString = function(e) {
                var t, n = "";
                return this.name && (n += 'in "' + this.name + '" '), n += "at line " + (this.line + 1) + ", column " + (this.column + 1), e || (t = this.getSnippet()) && (n += ":\n" + t), n
            }, t.exports = i
        }, {
            "./common": 2
        }],
        7: [function(e, t, n) {
            "use strict";
            var i = e("./common"),
                r = e("./exception"),
                o = e("./type");

            function a(e, t, i) {
                var r = [];
                return e.include.forEach(function(e) {
                    i = a(e, t, i)
                }), e[t].forEach(function(n) {
                    i.forEach(function(e, t) {
                        e.tag === n.tag && e.kind === n.kind && r.push(t)
                    }), i.push(n)
                }), i.filter(function(e, t) {
                    return -1 === r.indexOf(t)
                })
            }

            function s(e) {
                this.include = e.include || [], this.implicit = e.implicit || [], this.explicit = e.explicit || [], this.implicit.forEach(function(e) {
                    if (e.loadKind && "scalar" !== e.loadKind) throw new r("There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported.")
                }), this.compiledImplicit = a(this, "implicit", []), this.compiledExplicit = a(this, "explicit", []), this.compiledTypeMap = function() {
                    var e, t, n = {
                        scalar: {},
                        sequence: {},
                        mapping: {},
                        fallback: {}
                    };

                    function i(e) {
                        n[e.kind][e.tag] = n.fallback[e.tag] = e
                    }
                    for (e = 0, t = arguments.length; e < t; e += 1) arguments[e].forEach(i);
                    return n
                }(this.compiledImplicit, this.compiledExplicit)
            }
            s.DEFAULT = null, s.create = function() {
                var e, t;
                switch (arguments.length) {
                    case 1:
                        e = s.DEFAULT, t = arguments[0];
                        break;
                    case 2:
                        e = arguments[0], t = arguments[1];
                        break;
                    default:
                        throw new r("Wrong number of arguments for Schema.create function")
                }
                if (e = i.toArray(e), t = i.toArray(t), !e.every(function(e) {
                        return e instanceof s
                    })) throw new r("Specified list of super schemas (or a single Schema object) contains a non-Schema object.");
                if (!t.every(function(e) {
                        return e instanceof o
                    })) throw new r("Specified list of YAML types (or a single Type object) contains a non-Type object.");
                return new s({
                    include: e,
                    explicit: t
                })
            }, t.exports = s
        }, {
            "./common": 2,
            "./exception": 4,
            "./type": 13
        }],
        8: [function(e, t, n) {
            "use strict";
            var i = e("../schema");
            t.exports = new i({
                include: [e("./json")]
            })
        }, {
            "../schema": 7,
            "./json": 12
        }],
        9: [function(e, t, n) {
            "use strict";
            var i = e("../schema");
            t.exports = i.DEFAULT = new i({
                include: [e("./default_safe")],
                explicit: [e("../type/js/undefined"), e("../type/js/regexp"), e("../type/js/function")]
            })
        }, {
            "../schema": 7,
            "../type/js/function": 18,
            "../type/js/regexp": 19,
            "../type/js/undefined": 20,
            "./default_safe": 10
        }],
        10: [function(e, t, n) {
            "use strict";
            var i = e("../schema");
            t.exports = new i({
                include: [e("./core")],
                implicit: [e("../type/timestamp"), e("../type/merge")],
                explicit: [e("../type/binary"), e("../type/omap"), e("../type/pairs"), e("../type/set")]
            })
        }, {
            "../schema": 7,
            "../type/binary": 14,
            "../type/merge": 22,
            "../type/omap": 24,
            "../type/pairs": 25,
            "../type/set": 27,
            "../type/timestamp": 29,
            "./core": 8
        }],
        11: [function(e, t, n) {
            "use strict";
            var i = e("../schema");
            t.exports = new i({
                explicit: [e("../type/str"), e("../type/seq"), e("../type/map")]
            })
        }, {
            "../schema": 7,
            "../type/map": 21,
            "../type/seq": 26,
            "../type/str": 28
        }],
        12: [function(e, t, n) {
            "use strict";
            var i = e("../schema");
            t.exports = new i({
                include: [e("./failsafe")],
                implicit: [e("../type/null"), e("../type/bool"), e("../type/int"), e("../type/float")]
            })
        }, {
            "../schema": 7,
            "../type/bool": 15,
            "../type/float": 16,
            "../type/int": 17,
            "../type/null": 23,
            "./failsafe": 11
        }],
        13: [function(e, t, n) {
            "use strict";
            var i = e("./exception"),
                r = ["kind", "resolve", "construct", "instanceOf", "predicate", "represent", "defaultStyle", "styleAliases"],
                o = ["scalar", "sequence", "mapping"];
            t.exports = function(t, e) {
                if (e = e || {}, Object.keys(e).forEach(function(e) {
                        if (-1 === r.indexOf(e)) throw new i('Unknown option "' + e + '" is met in definition of "' + t + '" YAML type.')
                    }), this.tag = t, this.kind = e.kind || null, this.resolve = e.resolve || function() {
                        return !0
                    }, this.construct = e.construct || function(e) {
                        return e
                    }, this.instanceOf = e.instanceOf || null, this.predicate = e.predicate || null, this.represent = e.represent || null, this.defaultStyle = e.defaultStyle || null, this.styleAliases = function(e) {
                        var n = {};
                        return null !== e && Object.keys(e).forEach(function(t) {
                            e[t].forEach(function(e) {
                                n[String(e)] = t
                            })
                        }), n
                    }(e.styleAliases || null), -1 === o.indexOf(this.kind)) throw new i('Unknown kind "' + this.kind + '" is specified for "' + t + '" YAML type.')
            }
        }, {
            "./exception": 4
        }],
        14: [function(e, t, n) {
            "use strict";
            var c;
            try {
                c = e("buffer").Buffer
            } catch (e) {}
            var i = e("../type"),
                u = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=\n\r";
            t.exports = new i("tag:yaml.org,2002:binary", {
                kind: "scalar",
                resolve: function(e) {
                    if (null === e) return !1;
                    var t, n, i = 0,
                        r = e.length,
                        o = u;
                    for (n = 0; n < r; n++)
                        if (!(64 < (t = o.indexOf(e.charAt(n))))) {
                            if (t < 0) return !1;
                            i += 6
                        } return i % 8 == 0
                },
                construct: function(e) {
                    var t, n, i = e.replace(/[\r\n=]/g, ""),
                        r = i.length,
                        o = u,
                        a = 0,
                        s = [];
                    for (t = 0; t < r; t++) t % 4 == 0 && t && (s.push(a >> 16 & 255), s.push(a >> 8 & 255), s.push(255 & a)), a = a << 6 | o.indexOf(i.charAt(t));
                    return 0 == (n = r % 4 * 6) ? (s.push(a >> 16 & 255), s.push(a >> 8 & 255), s.push(255 & a)) : 18 == n ? (s.push(a >> 10 & 255), s.push(a >> 2 & 255)) : 12 == n && s.push(a >> 4 & 255), c ? c.from ? c.from(s) : new c(s) : s
                },
                predicate: function(e) {
                    return c && c.isBuffer(e)
                },
                represent: function(e) {
                    var t, n, i = "",
                        r = 0,
                        o = e.length,
                        a = u;
                    for (t = 0; t < o; t++) t % 3 == 0 && t && (i += a[r >> 18 & 63], i += a[r >> 12 & 63], i += a[r >> 6 & 63], i += a[63 & r]), r = (r << 8) + e[t];
                    return 0 == (n = o % 3) ? (i += a[r >> 18 & 63], i += a[r >> 12 & 63], i += a[r >> 6 & 63], i += a[63 & r]) : 2 == n ? (i += a[r >> 10 & 63], i += a[r >> 4 & 63], i += a[r << 2 & 63], i += a[64]) : 1 == n && (i += a[r >> 2 & 63], i += a[r << 4 & 63], i += a[64], i += a[64]), i
                }
            })
        }, {
            "../type": 13
        }],
        15: [function(e, t, n) {
            "use strict";
            var i = e("../type");
            t.exports = new i("tag:yaml.org,2002:bool", {
                kind: "scalar",
                resolve: function(e) {
                    if (null === e) return !1;
                    var t = e.length;
                    return 4 === t && ("true" === e || "True" === e || "TRUE" === e) || 5 === t && ("false" === e || "False" === e || "FALSE" === e)
                },
                construct: function(e) {
                    return "true" === e || "True" === e || "TRUE" === e
                },
                predicate: function(e) {
                    return "[object Boolean]" === Object.prototype.toString.call(e)
                },
                represent: {
                    lowercase: function(e) {
                        return e ? "true" : "false"
                    },
                    uppercase: function(e) {
                        return e ? "TRUE" : "FALSE"
                    },
                    camelcase: function(e) {
                        return e ? "True" : "False"
                    }
                },
                defaultStyle: "lowercase"
            })
        }, {
            "../type": 13
        }],
        16: [function(e, t, n) {
            "use strict";
            var i = e("../common"),
                r = e("../type"),
                o = new RegExp("^(?:[-+]?(?:0|[1-9][0-9_]*)(?:\\.[0-9_]*)?(?:[eE][-+]?[0-9]+)?|\\.[0-9_]+(?:[eE][-+]?[0-9]+)?|[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+\\.[0-9_]*|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$");
            var a = /^[-+]?[0-9]+e/;
            t.exports = new r("tag:yaml.org,2002:float", {
                kind: "scalar",
                resolve: function(e) {
                    return null !== e && !(!o.test(e) || "_" === e[e.length - 1])
                },
                construct: function(e) {
                    var t, n, i, r;
                    return n = "-" === (t = e.replace(/_/g, "").toLowerCase())[0] ? -1 : 1, r = [], 0 <= "+-".indexOf(t[0]) && (t = t.slice(1)), ".inf" === t ? 1 == n ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY : ".nan" === t ? NaN : 0 <= t.indexOf(":") ? (t.split(":").forEach(function(e) {
                        r.unshift(parseFloat(e, 10))
                    }), t = 0, i = 1, r.forEach(function(e) {
                        t += e * i, i *= 60
                    }), n * t) : n * parseFloat(t, 10)
                },
                predicate: function(e) {
                    return "[object Number]" === Object.prototype.toString.call(e) && (e % 1 != 0 || i.isNegativeZero(e))
                },
                represent: function(e, t) {
                    var n;
                    if (isNaN(e)) switch (t) {
                        case "lowercase":
                            return ".nan";
                        case "uppercase":
                            return ".NAN";
                        case "camelcase":
                            return ".NaN"
                    } else if (Number.POSITIVE_INFINITY === e) switch (t) {
                        case "lowercase":
                            return ".inf";
                        case "uppercase":
                            return ".INF";
                        case "camelcase":
                            return ".Inf"
                    } else if (Number.NEGATIVE_INFINITY === e) switch (t) {
                        case "lowercase":
                            return "-.inf";
                        case "uppercase":
                            return "-.INF";
                        case "camelcase":
                            return "-.Inf"
                    } else if (i.isNegativeZero(e)) return "-0.0";
                    return n = e.toString(10), a.test(n) ? n.replace("e", ".e") : n
                },
                defaultStyle: "lowercase"
            })
        }, {
            "../common": 2,
            "../type": 13
        }],
        17: [function(e, t, n) {
            "use strict";
            var i = e("../common"),
                r = e("../type");
            t.exports = new r("tag:yaml.org,2002:int", {
                kind: "scalar",
                resolve: function(e) {
                    if (null === e) return !1;
                    var t, n, i, r, o = e.length,
                        a = 0,
                        s = !1;
                    if (!o) return !1;
                    if ("-" !== (t = e[a]) && "+" !== t || (t = e[++a]), "0" === t) {
                        if (a + 1 === o) return !0;
                        if ("b" === (t = e[++a])) {
                            for (a++; a < o; a++)
                                if ("_" !== (t = e[a])) {
                                    if ("0" !== t && "1" !== t) return !1;
                                    s = !0
                                } return s && "_" !== t
                        }
                        if ("x" === t) {
                            for (a++; a < o; a++)
                                if ("_" !== (t = e[a])) {
                                    if (!(48 <= (i = e.charCodeAt(a)) && i <= 57 || 65 <= i && i <= 70 || 97 <= i && i <= 102)) return !1;
                                    s = !0
                                } return s && "_" !== t
                        }
                        for (; a < o; a++)
                            if ("_" !== (t = e[a])) {
                                if (!(48 <= (n = e.charCodeAt(a)) && n <= 55)) return !1;
                                s = !0
                            } return s && "_" !== t
                    }
                    if ("_" === t) return !1;
                    for (; a < o; a++)
                        if ("_" !== (t = e[a])) {
                            if (":" === t) break;
                            if (!(48 <= (r = e.charCodeAt(a)) && r <= 57)) return !1;
                            s = !0
                        } return !(!s || "_" === t) && (":" !== t || /^(:[0-5]?[0-9])+$/.test(e.slice(a)))
                },
                construct: function(e) {
                    var t, n, i = e,
                        r = 1,
                        o = [];
                    return -1 !== i.indexOf("_") && (i = i.replace(/_/g, "")), "-" !== (t = i[0]) && "+" !== t || ("-" === t && (r = -1), t = (i = i.slice(1))[0]), "0" === i ? 0 : "0" === t ? "b" === i[1] ? r * parseInt(i.slice(2), 2) : "x" === i[1] ? r * parseInt(i, 16) : r * parseInt(i, 8) : -1 !== i.indexOf(":") ? (i.split(":").forEach(function(e) {
                        o.unshift(parseInt(e, 10))
                    }), i = 0, n = 1, o.forEach(function(e) {
                        i += e * n, n *= 60
                    }), r * i) : r * parseInt(i, 10)
                },
                predicate: function(e) {
                    return "[object Number]" === Object.prototype.toString.call(e) && e % 1 == 0 && !i.isNegativeZero(e)
                },
                represent: {
                    binary: function(e) {
                        return 0 <= e ? "0b" + e.toString(2) : "-0b" + e.toString(2).slice(1)
                    },
                    octal: function(e) {
                        return 0 <= e ? "0" + e.toString(8) : "-0" + e.toString(8).slice(1)
                    },
                    decimal: function(e) {
                        return e.toString(10)
                    },
                    hexadecimal: function(e) {
                        return 0 <= e ? "0x" + e.toString(16).toUpperCase() : "-0x" + e.toString(16).toUpperCase().slice(1)
                    }
                },
                defaultStyle: "decimal",
                styleAliases: {
                    binary: [2, "bin"],
                    octal: [8, "oct"],
                    decimal: [10, "dec"],
                    hexadecimal: [16, "hex"]
                }
            })
        }, {
            "../common": 2,
            "../type": 13
        }],
        18: [function(e, t, n) {
            "use strict";
            var o;
            try {
                o = e("esprima")
            } catch (e) {
                "undefined" != typeof window && (o = window.esprima)
            }
            var i = e("../../type");
            t.exports = new i("tag:yaml.org,2002:js/function", {
                kind: "scalar",
                resolve: function(e) {
                    if (null === e) return !1;
                    try {
                        var t = "(" + e + ")",
                            n = o.parse(t, {
                                range: !0
                            });
                        return "Program" === n.type && 1 === n.body.length && "ExpressionStatement" === n.body[0].type && ("ArrowFunctionExpression" === n.body[0].expression.type || "FunctionExpression" === n.body[0].expression.type)
                    } catch (e) {
                        return !1
                    }
                },
                construct: function(e) {
                    var t, n = "(" + e + ")",
                        i = o.parse(n, {
                            range: !0
                        }),
                        r = [];
                    if ("Program" !== i.type || 1 !== i.body.length || "ExpressionStatement" !== i.body[0].type || "ArrowFunctionExpression" !== i.body[0].expression.type && "FunctionExpression" !== i.body[0].expression.type) throw new Error("Failed to resolve function");
                    return i.body[0].expression.params.forEach(function(e) {
                        r.push(e.name)
                    }), t = i.body[0].expression.body.range, "BlockStatement" === i.body[0].expression.body.type ? new Function(r, n.slice(t[0] + 1, t[1] - 1)) : new Function(r, "return " + n.slice(t[0], t[1]))
                },
                predicate: function(e) {
                    return "[object Function]" === Object.prototype.toString.call(e)
                },
                represent: function(e) {
                    return e.toString()
                }
            })
        }, {
            "../../type": 13
        }],
        19: [function(e, t, n) {
            "use strict";
            var i = e("../../type");
            t.exports = new i("tag:yaml.org,2002:js/regexp", {
                kind: "scalar",
                resolve: function(e) {
                    if (null === e) return !1;
                    if (0 === e.length) return !1;
                    var t = e,
                        n = /\/([gim]*)$/.exec(e),
                        i = "";
                    if ("/" === t[0]) {
                        if (n && (i = n[1]), 3 < i.length) return !1;
                        if ("/" !== t[t.length - i.length - 1]) return !1
                    }
                    return !0
                },
                construct: function(e) {
                    var t = e,
                        n = /\/([gim]*)$/.exec(e),
                        i = "";
                    return "/" === t[0] && (n && (i = n[1]), t = t.slice(1, t.length - i.length - 1)), new RegExp(t, i)
                },
                predicate: function(e) {
                    return "[object RegExp]" === Object.prototype.toString.call(e)
                },
                represent: function(e) {
                    var t = "/" + e.source + "/";
                    return e.global && (t += "g"), e.multiline && (t += "m"), e.ignoreCase && (t += "i"), t
                }
            })
        }, {
            "../../type": 13
        }],
        20: [function(e, t, n) {
            "use strict";
            var i = e("../../type");
            t.exports = new i("tag:yaml.org,2002:js/undefined", {
                kind: "scalar",
                resolve: function() {
                    return !0
                },
                construct: function() {},
                predicate: function(e) {
                    return void 0 === e
                },
                represent: function() {
                    return ""
                }
            })
        }, {
            "../../type": 13
        }],
        21: [function(e, t, n) {
            "use strict";
            var i = e("../type");
            t.exports = new i("tag:yaml.org,2002:map", {
                kind: "mapping",
                construct: function(e) {
                    return null !== e ? e : {}
                }
            })
        }, {
            "../type": 13
        }],
        22: [function(e, t, n) {
            "use strict";
            var i = e("../type");
            t.exports = new i("tag:yaml.org,2002:merge", {
                kind: "scalar",
                resolve: function(e) {
                    return "<<" === e || null === e
                }
            })
        }, {
            "../type": 13
        }],
        23: [function(e, t, n) {
            "use strict";
            var i = e("../type");
            t.exports = new i("tag:yaml.org,2002:null", {
                kind: "scalar",
                resolve: function(e) {
                    if (null === e) return !0;
                    var t = e.length;
                    return 1 === t && "~" === e || 4 === t && ("null" === e || "Null" === e || "NULL" === e)
                },
                construct: function() {
                    return null
                },
                predicate: function(e) {
                    return null === e
                },
                represent: {
                    canonical: function() {
                        return "~"
                    },
                    lowercase: function() {
                        return "null"
                    },
                    uppercase: function() {
                        return "NULL"
                    },
                    camelcase: function() {
                        return "Null"
                    }
                },
                defaultStyle: "lowercase"
            })
        }, {
            "../type": 13
        }],
        24: [function(e, t, n) {
            "use strict";
            var i = e("../type"),
                c = Object.prototype.hasOwnProperty,
                u = Object.prototype.toString;
            t.exports = new i("tag:yaml.org,2002:omap", {
                kind: "sequence",
                resolve: function(e) {
                    if (null === e) return !0;
                    var t, n, i, r, o, a = [],
                        s = e;
                    for (t = 0, n = s.length; t < n; t += 1) {
                        if (i = s[t], o = !1, "[object Object]" !== u.call(i)) return !1;
                        for (r in i)
                            if (c.call(i, r)) {
                                if (o) return !1;
                                o = !0
                            } if (!o) return !1;
                        if (-1 !== a.indexOf(r)) return !1;
                        a.push(r)
                    }
                    return !0
                },
                construct: function(e) {
                    return null !== e ? e : []
                }
            })
        }, {
            "../type": 13
        }],
        25: [function(e, t, n) {
            "use strict";
            var i = e("../type"),
                s = Object.prototype.toString;
            t.exports = new i("tag:yaml.org,2002:pairs", {
                kind: "sequence",
                resolve: function(e) {
                    if (null === e) return !0;
                    var t, n, i, r, o, a = e;
                    for (o = new Array(a.length), t = 0, n = a.length; t < n; t += 1) {
                        if (i = a[t], "[object Object]" !== s.call(i)) return !1;
                        if (1 !== (r = Object.keys(i)).length) return !1;
                        o[t] = [r[0], i[r[0]]]
                    }
                    return !0
                },
                construct: function(e) {
                    if (null === e) return [];
                    var t, n, i, r, o, a = e;
                    for (o = new Array(a.length), t = 0, n = a.length; t < n; t += 1) i = a[t], r = Object.keys(i), o[t] = [r[0], i[r[0]]];
                    return o
                }
            })
        }, {
            "../type": 13
        }],
        26: [function(e, t, n) {
            "use strict";
            var i = e("../type");
            t.exports = new i("tag:yaml.org,2002:seq", {
                kind: "sequence",
                construct: function(e) {
                    return null !== e ? e : []
                }
            })
        }, {
            "../type": 13
        }],
        27: [function(e, t, n) {
            "use strict";
            var i = e("../type"),
                r = Object.prototype.hasOwnProperty;
            t.exports = new i("tag:yaml.org,2002:set", {
                kind: "mapping",
                resolve: function(e) {
                    if (null === e) return !0;
                    var t, n = e;
                    for (t in n)
                        if (r.call(n, t) && null !== n[t]) return !1;
                    return !0
                },
                construct: function(e) {
                    return null !== e ? e : {}
                }
            })
        }, {
            "../type": 13
        }],
        28: [function(e, t, n) {
            "use strict";
            var i = e("../type");
            t.exports = new i("tag:yaml.org,2002:str", {
                kind: "scalar",
                construct: function(e) {
                    return null !== e ? e : ""
                }
            })
        }, {
            "../type": 13
        }],
        29: [function(e, t, n) {
            "use strict";
            var i = e("../type"),
                p = new RegExp("^([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])$"),
                f = new RegExp("^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:[Tt]|[ \\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\\.([0-9]*))?(?:[ \\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?$");
            t.exports = new i("tag:yaml.org,2002:timestamp", {
                kind: "scalar",
                resolve: function(e) {
                    return null !== e && (null !== p.exec(e) || null !== f.exec(e))
                },
                construct: function(e) {
                    var t, n, i, r, o, a, s, c, u = 0,
                        l = null;
                    if (null === (t = p.exec(e)) && (t = f.exec(e)), null === t) throw new Error("Date resolve error");
                    if (n = +t[1], i = +t[2] - 1, r = +t[3], !t[4]) return new Date(Date.UTC(n, i, r));
                    if (o = +t[4], a = +t[5], s = +t[6], t[7]) {
                        for (u = t[7].slice(0, 3); u.length < 3;) u += "0";
                        u = +u
                    }
                    return t[9] && (l = 6e4 * (60 * +t[10] + +(t[11] || 0)), "-" === t[9] && (l = -l)), c = new Date(Date.UTC(n, i, r, o, a, s, u)), l && c.setTime(c.getTime() - l), c
                },
                instanceOf: Date,
                represent: function(e) {
                    return e.toISOString()
                }
            })
        }, {
            "../type": 13
        }],
        "/": [function(e, t, n) {
            "use strict";
            var i = e("./lib/js-yaml.js");
            t.exports = i
        }, {
            "./lib/js-yaml.js": 1
        }]
    }, {}, [])("/")
});