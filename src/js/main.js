$(function () {
    let rawcontent = $('#content').html()
    let content = jsyaml.load(rawcontent)
    var mp = new Map()
    // var tgs = new Array()
    // for (c of content) {
    //     let dt = c.date.split('-')
    //     mp.set(c.date, c)
    // }
    // console.log(mp)
    $('#content').html('')
})