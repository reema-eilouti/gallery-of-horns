function Picture(picture) {
    this.image_url = picture.image_url;
    this.title = picture.title;
    this.description = picture.description;
    this.keyword = picture.keyword;
    this.horns = picture.horns;
}
let keywords = [];

Picture.prototype.render = function() {

    let template = $('#photos').html();

    let html = Mustache.render(template, this);

    $('#first').append(html);


    if (keywords.includes(this.keyword) !== true) {
        keywords.push(this.keyword);
        $('#filter').append(`<option value="${this.keyword}">${this.keyword}</option>`);
    }
}

let pictures = [];

$('document').ready(function() {

    const ajaxSettings = {
        method: 'get',
        dataType: 'json'
    };

    $.ajax('./data/page-1.json', ajaxSettings)
        .then(data => {
            data.forEach(item => {
                let picture = new Picture(item);
                pictures.push(picture);
                picture.render();
            });
        });


    $('#filter').on('change', function() {
        chosenOption = '.' + this.value;
        $('div').hide();
        $(chosenOption).show();
    });

    $('#sort').on('change', function() {
        if (this.value == "title") {
            $('div').remove();
            pictures.sort((a, b) => {
                if (a.title < b.title) {
                    return -1;
                }
                if (a.title > b.title) {
                    return 1;
                }
            });

            pictures.forEach(picture => {
                picture.render();
            });

        }
        if (this.value == "horns") {
            $('div').remove();
            pictures.sort((a, b) => {
                return a.horns - b.horns;
            });

            pictures.forEach(picture => {
                picture.render();
            });

        }
    });
});