(function ($) {
    "use strict"; // Start of use strict

    // Toggle the side navigation
    $("#sidebarToggle, #sidebarToggleTop").on('click', function (e) {
        $("body").toggleClass("sidebar-toggled");
        var $sidebarAnchor = $(".sidebar");
        $sidebarAnchor.toggleClass("toggled");
        if ($sidebarAnchor.hasClass("toggled")) {
            $('.sidebar .collapse').collapse('hide');
        }

    });

    // Close any open menu accordions when window is resized below 768px
    $(window).resize(function () {
        if ($(window).width() < 768) {
            $('.sidebar .collapse').collapse('hide');
        }

    });

    // Prevent the content wrapper from scrolling when the fixed side navigation hovered over
    $('body.fixed-nav .sidebar').on('mousewheel DOMMouseScroll wheel', function (e) {
        if ($(window).width() > 768) {
            var e0 = e.originalEvent,
                delta = e0.wheelDelta || -e0.detail;
            this.scrollTop += (delta < 0 ? 1 : -1) * 30;
            e.preventDefault();
        }
    });

    // Scroll to top button appear
    $(document).on('scroll', function () {
        var scrollDistance = $(this).scrollTop();
        if (scrollDistance > 100) {
            $('.scroll-to-top').fadeIn();
        } else {
            $('.scroll-to-top').fadeOut();
        }
    });

    // Smooth scrolling using jQuery easing
    $(document).on('click', 'a.scroll-to-top', function (e) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: ($($anchor.attr('href')).offset().top)
        }, 1000, 'easeInOutExpo');
        e.preventDefault();
    });


    // Card Table中全选所有行
    $(document).on('click', '.card table thead input[type=checkbox].check-all', function (e) {
        var $anchor = $(this);
        var $checkboxes = $anchor.closest('table').find('tbody tr td input[type=checkbox]');
        $.each($checkboxes, function (index, value) {
            $(value).prop("checked", !$(value).prop("checked"));
        });
    });

    // Sweetalert2 提醒删除内容警告
    $(document).on('click', 'a.btn-delete-content', function (e) {
        e.preventDefault();
        e.stopPropagation();

        Swal.fire({
            title: '您将要删除内容!',
            text: "删除操作不可恢复，确定要删除吗？",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: '删除',
            cancelButtonText: '取消'
        }).then(function (result) {
            if (result.value) {

                /**
                 * Todo: 此处要使用ajax判断alias是否唯一，如果不唯一则替换为服务器返回的唯一alias
                 */

                Swal.fire({
                    title: '删除成功!',
                    text: '内容已经删除成功.',
                    type: 'success',
                    confirmButtonText: '确定'
                })
            }
        })
    });

    // 机器别名的自动生成
    $(document).on('input', 'input[type=text].transliterate', function (e) {
        var inputValue = $(this).val();
        var $parentAnchor = $(this).closest("div.form-row");

        var alias = slugify(inputValue).replace(/-/ig, '_');

        /**
         * Todo: 此处要使用ajax判断alias是否唯一，如果不唯一则替换为服务器返回的唯一alias
         */


        $parentAnchor.find("span.text-alias").text(alias);

        $parentAnchor.find("input[type=hidden].input-alias").val(alias);

        $parentAnchor.find("div.form-alias").removeClass('d-none');

    });

    // 编辑机器别名
    $(document).on('click', 'a.js-modify-alias', function (e) {
        e.preventDefault();
        e.stopPropagation();

        var $parentAnchor = $(this).closest('div.form-alias');

        $parentAnchor.removeClass('form-inline');

        $parentAnchor.find('div.text-alias-wrapper').addClass('d-none');
        $parentAnchor.find('div.input-alias-wrapper').removeClass('d-none');
        $parentAnchor.find('input[type=hidden].input-alias').attr('type', 'text');
        $parentAnchor.find('div.small.text-muted').removeClass('d-none');

    });


    // 选择字段类型 Select change事件
    $(document).on('change', 'div.select-field-form select', function (e) {
        var $parentAnchor = $(this).closest('div.form-row');
        var $divWrapper = $parentAnchor.closest('div.select-field-form');

        $divWrapper.find('div.field-info').removeClass('d-none');
    });

    // 编辑字段设置，选择字段的数量
    $(document).on('change', 'select#select_field_limit', function (e) {
        var $parentAnchor = $(this).closest('div.select-field-limit');

        if ($(this).val() === '-1') {
            $parentAnchor.find('input[type=number].input-field-limit').attr("disabled", 'disabled');
            $parentAnchor.find('input[type=number].input-field-limit').addClass('d-none');
        }
        if ($(this).val() === 'limit') {
            $parentAnchor.find('input[type=number].input-field-limit').removeAttr('disabled');
            $parentAnchor.find('input[type=number].input-field-limit').removeClass('d-none');
        }
    });


    // Sweetalert2 提醒删除字段警告
    $(document).on('click', 'a.btn-delete-field', function (e) {
        e.preventDefault();
        e.stopPropagation();

        Swal.fire({
            title: '您将要删除字段!',
            text: "删除后该字段保存的内容都将删除。删除操作不可恢复，确定要删除吗？",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: '删除',
            cancelButtonText: '取消'
        }).then(function (result) {
            if (result.value) {

                /**
                 * Todo: 此处要使用ajax判断alias是否唯一，如果不唯一则替换为服务器返回的唯一alias
                 */

                Swal.fire({
                    title: '删除成功!',
                    text: '字段已经删除成功.',
                    type: 'success',
                    confirmButtonText: '确定'
                })
            }
        })
    });

    //允许的扩展名分割符统一替换成小写逗号（,）
    $(document).on('input', 'input[type=text].input-allow-extension-name', function (e) {
        var $inputValue = $(this).val();

        var relacedValue = $inputValue.replace(/[，| |\-|_|\－]/, ',');

        $(this).val(relacedValue);
    });


})(jQuery); // End of use strict
