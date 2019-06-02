(function ($) {
    "use strict"; // Start of use strict

    //取消a.js-modify-weight默认行为
    $(document).on('click', 'a.js-modify-weight', function (e) {
        e.preventDefault();
        e.stopPropagation();
    });

    //使用sortablejs库调整字段权重
    var el = document.getElementById('js-sortable-tbody');
    var sortable = new Sortable(el, {
        handle: '.js-modify-weight', // handle's class
        animation: 150,
        // Element dragging ended
        onEnd: function (/**Event*/evt) {
            var $weightInputs = $(el).find('input[type=number].input-field-weight');

            $.each($weightInputs, function (index, input) {
                $(input).val((index + 1) * 5);
                $(input).attr('type', 'number');
            });
        },
    });

})(jQuery); // End of use strict
