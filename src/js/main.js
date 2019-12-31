$(function() {
    var mp = new Map()
    var tgs = new Array()
    


    $.ajax({
        "url": "https://api.github.com/repos/youyinnn/thepain/issues",
        "method": "GET",
        "timeout": 0,
        "headers": {
            "Accept": ["application/vnd.github.symmetra-preview+json", "application/vnd.github.v3+json"]
        },
    }).done(function(response) {
        for (c of response) {
            let content = jsyaml.load(c.body)
            content.number = c.number
            mp.set(c.title.split('-')[1], content)
        }
        let ar = Array.from(mp)
        ar.sort(function (a, b) {
            return a[0] >= b[0]
        })
        for (c of ar) {
            let tt = `
                [${c[1].date}]/[${c[1].intro}]/[${c[1].title}]; [标签：${c[1].tag}]
            `
            $('#content').append(`
                <div id="${c[1].number}_event_card" class="card">
                    <div class="cheader">${tt}</div>
                    <div id="${c[1].number}_event_link" class="cfooter unselectable">
                        <div id="${c[1].number}_readinhere">本站</div>
                    </div>
                </div>
            `)

            for (lk of c[1].link) {
                if (lk.search(/baike/) > 0) {
                    $(`#${c[1].number}_event_link`).append(`
                        <a href="${lk}" target="_blank">百科</a>
                    `)
                } else             
                if (lk.search(/weibo/) > 0) {
                    $(`#${c[1].number}_event_link`).append(`
                        <a href="${lk}" target="_blank">微博</a>
                    `)
                } else {
                    $(`#${c[1].number}_event_link`).append(`
                        <a href="${lk}" target="_blank">其他</a>
                    `)
                }
            }       

            $(`#${c[1].number}_readinhere`).click(() => {
                var settings = {
                    "url": `https://api.github.com/repos/youyinnn/thepain/issues/${c[1].number}/comments`,
                    "method": "GET",
                    "timeout": 0,
                    "headers": {
                      "Authorization": "Bearer a5fe4313bddd309cc9b7b250bf65da894590c0b8"
                    },
                  };
                  
                  $.ajax(settings).done(function (response) {
                    $('#readinhere').addClass('readinhereshow')
                    $('#md').html(marked(response[0].body))
                  });
            })
        }
    })

    $(`#closereadinhere`).click(() => {
        $('#readinhere').removeClass('readinhereshow')
        $('#md').html('')
    })
})