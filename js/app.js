function Picture(picture) {
    this.image_url = picture.image_url;
    this.title = picture.title;
    this.description = picture.description;
    this.keyword = picture.keyword;
    this.horns = picture.horns;
}
let keywords = [];

Picture.prototype.render = function() {
    $('section').append(`
    <div class="${this.keyword}">
    <h4>${this.title}</h4>
    <img src="${this.image_url}">
    <h5>${this.description}</h5>
    </div>
  `);

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

    $.ajax('./data/page-1.json', ajaxSettings)
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