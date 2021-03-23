function Picture(picture) {
    this.image_url = picture.image_url;
    this.title = picture.title;
    this.description = picture.description;
    this.keyword = picture.keyword;
    this.horns = picture.horns;
}
let keywords = [];

Picture.prototype.render = function() {

    let template = $('#photos2').html();

    let html = Mustache.render(template, this);

    $('#second').append(html);


    if (keywords.includes(this.keyword) !== true) {
        keywords.push(this.keyword);
        $('select').append(`<option value="${this.keyword}">${this.keyword}</option>`);
    }
}



$('document').ready(function() {

    const ajaxSettings = {
        method: 'get',
        dataType: 'json'
    };

    $.ajax('./data/page-2.json', ajaxSettings)
        .then(data => {
            data.forEach(item => {
                let picture = new Picture(item);
                picture.render();
            });
        });

    $('select').on('change', function() {
        chosenOption = '.' + this.value;
        $('div').hide();
        $(chosenOption).show();
    });
});