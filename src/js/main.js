$(function() {
    var mp = new Map()
    var tgs = new Array()

    var oauth_token_base64 = 'OGZhZTVhOWFhODYxNWY1OWZhNDMxOTJlNDMwZDQxN2JhNDVmZDU1Yg=='
    var oauth_token = b64.decode(oauth_token_base64)

    startFakeProgress()
    // ANCHOR issues fetch
    $.ajax({
        "url": "https://api.github.com/repos/youyinnn/thepain/issues",
        "method": "GET",
        "timeout": 0,
        "headers": {
            "Accept": ["application/vnd.github.symmetra-preview+json", "application/vnd.github.v3+json"]
        },
    }).done(function(response) {
        finishFakeProgress()
        for (c of response) {
            let content = jsyaml.load(c.body)
            content.number = c.number
            mp.set(c.title.split('-')[1], content)
        }
        let ar = Array.from(mp)
        ar.sort(function(a, b) {
            return a[0] <= b[0] ? 1 : -1
        })
        for (c of ar) {
            let yr = c[1].date.split('-')[0]
            if ($(`#year-${yr}`).length === 0) {
                $('#content').append(`
                    <div id="year-${yr}" class="event-year">${yr}</div>
                `)
            }
            let tt = `
                [${c[1].date}]/[${c[1].pos}]/[${c[1].intro}]/[${c[1].title}]/[${c[1].tag}]
            `
            $('#content').append(`
                <div id="event-card-${c[1].number}" class="card">
                    <div class="cheader">${tt}</div>
                    <div id="${c[1].number}-event-link" class="cfooter unselectable">
                        <div 
                            id="${c[1].number}-readinhere"
                            title="${c[1].title}"
                        >本站</div>
                    </div>
                </div>
            `)

            for (lk of c[1].link) {
                $(`#${c[1].number}-event-link`).append(`
                    <a href="${lk.link}" target="_blank">${lk.src}</a>
                `)
            }

            animateCSS(`#event-card-${c[1].number}`, 'fadeIn')

            $(`#${c[1].number}-readinhere`).click(function() {
                startFakeProgress()
                var settings = {
                    "url": `https://api.github.com/repos/youyinnn/thepain/issues/${$(this).attr('id').split('-')[0]}/comments`,
                    "method": "GET",
                    "timeout": 0,
                    "headers": {
                        "Authorization": `Bearer ${oauth_token}`
                    }
                }
                let tt = $(this).attr('title')

                $.ajax(settings).done(function(response) {
                    let bd
                    if (response.length !== 0) {
                        bd = response[0].body
                    } else {
                        bd = `本站没有关于【${tt}】的内容，请查看其他的信息源。`
                    }
                    $('#readinhere').addClass('readinhereshow')
                    $('#md').html(marked(bd))
                    finishFakeProgress()
                });
            })
        }
    })

    $(`#closereadinhere`).click(() => {
        $('#readinhere').removeClass('readinhereshow')
        setTimeout(() => {
            $('#md').html('')
        }, 700);
    })

    function animateCSS(element, animationName, callback) {
        const node = document.querySelector(element)
        node.classList.add('animated', animationName)
    
        function handleAnimationEnd() {
            node.classList.remove('animated', animationName)
            node.removeEventListener('animationend', handleAnimationEnd)
    
            if (typeof callback === 'function') callback()
        }
    
        node.addEventListener('animationend', handleAnimationEnd)
    }

    var fakeprogressclear, fakeprogress = 0
    function startFakeProgress() {
        $('#fakeprogressbar').css('width', '0%')
        $('#fakeprogressbarbox').css('opacity', 1)
        clearInterval(fakeprogressclear)
        fakeprogressclear = setInterval(() => {
            if (fakeprogress >= 0 && fakeprogress < 40) {
                fakeprogress += 6
                $('#fakeprogressbar').css('width', fakeprogress + '%')
            } else if (fakeprogress >= 40 && fakeprogress < 60) {
                fakeprogress += 3
                $('#fakeprogressbar').css('width', fakeprogress + '%')
            } else if (fakeprogress >= 60 && fakeprogress < 98) {
                fakeprogress += 1
                $('#fakeprogressbar').css('width', fakeprogress + '%')
            }
            if (fakeprogress === 99) {
                clearInterval(fakeprogressclear)
            }
        }, 300);
    }

    function finishFakeProgress() {
        clearInterval(fakeprogressclear)
        setTimeout(() => {
            $('#fakeprogressbar').css('width', '100%')
        }, 100);
        setTimeout(() => {
            $('#fakeprogressbarbox').css('opacity', 0)
            setTimeout(() => {
                $('#fakeprogressbar').css('width', '0%')
            }, 200);
        }, 300)
    }
})

/*
 *  base64.js
 *
 *  Licensed under the BSD 3-Clause License.
 *    http://opensource.org/licenses/BSD-3-Clause
 *
 *  References:
 *    http://en.wikipedia.org/wiki/Base64
 */
;
(function(global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ?
        module.exports = factory(global) :
        typeof define === 'function' && define.amd ?
        define(factory) : factory(global)
}((
    typeof self !== 'undefined' ? self :
    typeof window !== 'undefined' ? window :
    typeof global !== 'undefined' ? global :
    this
), function(global) {
    'use strict';
    // existing version for noConflict()
    var _Base64 = global.b64;
    var version = "2.4.6";
    // if node.js, we use Buffer
    var buffer;
    if (typeof module !== 'undefined' && module.exports) {
        try {
            buffer = require('buffer').Buffer;
        } catch (err) {}
    }
    // constants
    var b64chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
    var b64tab = function(bin) {
        var t = {};
        for (var i = 0, l = bin.length; i < l; i++) t[bin.charAt(i)] = i;
        return t;
    }(b64chars);
    var fromCharCode = String.fromCharCode;
    // encoder stuff
    var cb_utob = function(c) {
        if (c.length < 2) {
            var cc = c.charCodeAt(0);
            return cc < 0x80 ? c :
                cc < 0x800 ? (fromCharCode(0xc0 | (cc >>> 6)) +
                    fromCharCode(0x80 | (cc & 0x3f))) :
                (fromCharCode(0xe0 | ((cc >>> 12) & 0x0f)) +
                    fromCharCode(0x80 | ((cc >>> 6) & 0x3f)) +
                    fromCharCode(0x80 | (cc & 0x3f)));
        } else {
            var cc = 0x10000 +
                (c.charCodeAt(0) - 0xD800) * 0x400 +
                (c.charCodeAt(1) - 0xDC00);
            return (fromCharCode(0xf0 | ((cc >>> 18) & 0x07)) +
                fromCharCode(0x80 | ((cc >>> 12) & 0x3f)) +
                fromCharCode(0x80 | ((cc >>> 6) & 0x3f)) +
                fromCharCode(0x80 | (cc & 0x3f)));
        }
    };
    var re_utob = /[\uD800-\uDBFF][\uDC00-\uDFFFF]|[^\x00-\x7F]/g;
    var utob = function(u) {
        return u.replace(re_utob, cb_utob);
    };
    var cb_encode = function(ccc) {
        var padlen = [0, 2, 1][ccc.length % 3],
            ord = ccc.charCodeAt(0) << 16 |
            ((ccc.length > 1 ? ccc.charCodeAt(1) : 0) << 8) |
            ((ccc.length > 2 ? ccc.charCodeAt(2) : 0)),
            chars = [
                b64chars.charAt(ord >>> 18),
                b64chars.charAt((ord >>> 12) & 63),
                padlen >= 2 ? '=' : b64chars.charAt((ord >>> 6) & 63),
                padlen >= 1 ? '=' : b64chars.charAt(ord & 63)
            ];
        return chars.join('');
    };
    var btoa = global.btoa ? function(b) {
        return global.btoa(b);
    } : function(b) {
        return b.replace(/[\s\S]{1,3}/g, cb_encode);
    };
    var _encode = buffer ?
        buffer.from && Uint8Array && buffer.from !== Uint8Array.from ?
        function(u) {
            return (u.constructor === buffer.constructor ? u : buffer.from(u))
                .toString('b64')
        } :
        function(u) {
            return (u.constructor === buffer.constructor ? u : new buffer(u))
                .toString('b64')
        } :
        function(u) {
            return btoa(utob(u))
        };
    var encode = function(u, urisafe) {
        return !urisafe ?
            _encode(String(u)) :
            _encode(String(u)).replace(/[+\/]/g, function(m0) {
                return m0 == '+' ? '-' : '_';
            }).replace(/=/g, '');
    };
    var encodeURI = function(u) {
        return encode(u, true)
    };
    // decoder stuff
    var re_btou = new RegExp([
        '[\xC0-\xDF][\x80-\xBF]',
        '[\xE0-\xEF][\x80-\xBF]{2}',
        '[\xF0-\xF7][\x80-\xBF]{3}'
    ].join('|'), 'g');
    var cb_btou = function(cccc) {
        switch (cccc.length) {
            case 4:
                var cp = ((0x07 & cccc.charCodeAt(0)) << 18) |
                    ((0x3f & cccc.charCodeAt(1)) << 12) |
                    ((0x3f & cccc.charCodeAt(2)) << 6) |
                    (0x3f & cccc.charCodeAt(3)),
                    offset = cp - 0x10000;
                return (fromCharCode((offset >>> 10) + 0xD800) +
                    fromCharCode((offset & 0x3FF) + 0xDC00));
            case 3:
                return fromCharCode(
                    ((0x0f & cccc.charCodeAt(0)) << 12) |
                    ((0x3f & cccc.charCodeAt(1)) << 6) |
                    (0x3f & cccc.charCodeAt(2))
                );
            default:
                return fromCharCode(
                    ((0x1f & cccc.charCodeAt(0)) << 6) |
                    (0x3f & cccc.charCodeAt(1))
                );
        }
    };
    var btou = function(b) {
        return b.replace(re_btou, cb_btou);
    };
    var cb_decode = function(cccc) {
        var len = cccc.length,
            padlen = len % 4,
            n = (len > 0 ? b64tab[cccc.charAt(0)] << 18 : 0) |
            (len > 1 ? b64tab[cccc.charAt(1)] << 12 : 0) |
            (len > 2 ? b64tab[cccc.charAt(2)] << 6 : 0) |
            (len > 3 ? b64tab[cccc.charAt(3)] : 0),
            chars = [
                fromCharCode(n >>> 16),
                fromCharCode((n >>> 8) & 0xff),
                fromCharCode(n & 0xff)
            ];
        chars.length -= [0, 0, 2, 1][padlen];
        return chars.join('');
    };
    var atob = global.atob ? function(a) {
        return global.atob(a);
    } : function(a) {
        return a.replace(/[\s\S]{1,4}/g, cb_decode);
    };
    var _decode = buffer ?
        buffer.from && Uint8Array && buffer.from !== Uint8Array.from ?
        function(a) {
            return (a.constructor === buffer.constructor ?
                a : buffer.from(a, 'b64')).toString();
        } :
        function(a) {
            return (a.constructor === buffer.constructor ?
                a : new buffer(a, 'b64')).toString();
        } :
        function(a) {
            return btou(atob(a))
        };
    var decode = function(a) {
        return _decode(
            String(a).replace(/[-_]/g, function(m0) {
                return m0 == '-' ? '+' : '/'
            })
            .replace(/[^A-Za-z0-9\+\/]/g, '')
        );
    };
    var noConflict = function() {
        var b64 = global.b64;
        global.b64 = _Base64;
        return b64;
    };
    // export b64
    global.b64 = {
        VERSION: version,
        atob: atob,
        btoa: btoa,
        fromBase64: decode,
        toBase64: encode,
        utob: utob,
        encode: encode,
        encodeURI: encodeURI,
        btou: btou,
        decode: decode,
        noConflict: noConflict
    };
    // if ES5 is available, make b64.extendString() available
    if (typeof Object.defineProperty === 'function') {
        var noEnum = function(v) {
            return {
                value: v,
                enumerable: false,
                writable: true,
                configurable: true
            };
        };
        global.b64.extendString = function() {
            Object.defineProperty(
                String.prototype, 'fromBase64', noEnum(function() {
                    return decode(this)
                }));
            Object.defineProperty(
                String.prototype, 'toBase64', noEnum(function(urisafe) {
                    return encode(this, urisafe)
                }));
            Object.defineProperty(
                String.prototype, 'toBase64URI', noEnum(function() {
                    return encode(this, true)
                }));
        };
    }
    //
    // export b64 to the namespace
    //
    if (global['Meteor']) { // Meteor.js
        b64 = global.b64;
    }
    // module.exports and AMD are mutually exclusive.
    // module.exports has precedence.
    if (typeof module !== 'undefined' && module.exports) {
        module.exports.b64 = global.b64;
    } else if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define([], function() {
            return global.b64
        });
    }
    // that's it!
    return {
        b64: global.b64
    }
}));