/*
|--------------------------------------------------------------------------
| Apply accept
|--------------------------------------------------------------------------
*/

// Set approve button href
$(document).on('click', '.btn-pre-accept-apply', function(event) {
    event.preventDefault();
    var route = $(this).data('href');

    $('form[name=acceptApply]').attr('action', route);
});

// Reset approve button href
$(document).on('hidden.bs.modal', '#modalAcceptApply', function() {
    $(this).find('form[name=acceptApply]').attr('action', '#');
});

$(document).on('submit', 'form[name=acceptApply]', function(event) {
    event.preventDefault();

    var $modal = $(this).closest('.modal');
    var $button = $(this).find('button[type=submit]');
    var $buttonValue = $button.html();
    var url = $(this).attr('action');
    var data = $(this).serialize();

    $.ajax({
        type: 'POST',
        url: url,
        data: data,
        beforeSend: function() {
            $button.html('<i class="fa fa-spinner fa-pulse fa-fw"></i>');
        },
        success: function(response) {
            notification('success', "La candidature a été acceptée et envoyée.");
            $button.html('<i class="fa fa-check"></i>');

            // Update the apply icon on sidebar
            if (response > 0) {
                $(".totalAppliesInvalid").html(response);
                $(".totalAppliesInvalid").removeClass('hidden');
            } else {
                $(".totalAppliesInvalid").addClass('hidden');
            }

            $('.applyActions').remove();
            $('.applyStatus').html('<span class="badge bgSuccess">Acceptée</span>');

            $modal.modal('toggle');
        },
        error: function (response) {
            console.error(response);
            notification('danger', "Une erreur est survenue.");
            $('.error').remove();
            $.each(response.responseJSON.errors, function (i) {
                $.each(response.responseJSON.errors[i], function (key, val) {
                    $('#' + i).after('<div class="error">' + val + '</div>');
                });
            });
        },
        complete: function() {
            $button.html($buttonValue);
        }
    });
});

/*
|--------------------------------------------------------------------------
| Apply refuse
|--------------------------------------------------------------------------
*/

// Set disapprove button href
$(document).on('click', '.btn-pre-refuse-apply', function(event) {
    event.preventDefault();
    var route = $(this).data('href');

    $('form[name=refuseApply]').attr('action', route);
});

// Reset refuse button href
$(document).on('hidden.bs.modal', '#modalRefuseApply', function() {
    $(this).find('form[name=refuseApply]').attr('action', '#');
});

$(document).on('submit', 'form[name=refuseApply]', function(event) {
    event.preventDefault();

    var $modal = $(this).closest('.modal');
    var $button = $(this).find('button[type=submit]');
    var $buttonValue = $button.html();
    var url = $(this).attr('action');
    var data = $(this).serialize();

    $.ajax({
        type: 'POST',
        url: url,
        data: data,
        beforeSend: function() {
            $button.html('<i class="fa fa-spinner fa-pulse fa-fw"></i>');
        },
        success: function(response) {
            notification('success', "La candidature a été refusée.");
            $button.html('<i class="fa fa-check"></i>');

            // Update the apply icon on sidebar
            if (response > 0) {
                $(".totalAppliesInvalid").html(response);
                $(".totalAppliesInvalid").removeClass('hidden');
            } else {
                $(".totalAppliesInvalid").addClass('hidden');
            }

            $('.showCv').html('<span class="smallText">CV : </span>Non');
            $('.applyActions').remove();
            $('.applyStatus').html('<span class="badge bgDanger">Refusée</span>');

            $modal.modal('toggle');
        },
        error: function (response) {
            console.error(response);
            notification('danger', "Une erreur est survenue.");
            $('.error').remove();
            $.each(response.responseJSON.errors, function (i) {
                $.each(response.responseJSON.errors[i], function (key, val) {
                    $('#' + i).after('<div class="error">' + val + '</div>');
                });
            });
        },
        complete: function() {
            $button.html($buttonValue);
        }
    });
});


/*
|--------------------------------------------------------------------------
| Apply deletion
|--------------------------------------------------------------------------
*/

// Set delete button href
$(document).on('click', '.btn-pre-delete-apply', function(event) {
    event.preventDefault();
    var route = $(this).data('href');

    $('#btn-delete-apply').attr('href', route);
});

// Reset delete button href
$(document).on('hidden.bs.modal', '#modalDeleteApply', function() {
    $(this).find('#btn-delete-apply').attr('href', '#');
});

$(document).on('click', '#btn-delete-apply', function(event) {
    event.preventDefault();

    var $modal = $(this).closest('.modal');
    var $button = $(this);
    var $buttonValue = $button.html();
    var url = $(this).attr('href');

    $.ajax({
        type: 'GET',
        url: url,
        beforeSend: function() {
            $button.html('<i class="fa fa-spinner fa-pulse fa-fw"></i>');
        },
        success: function(response) {
            notification('success', "La candidature a été supprimée.");
            $button.html('<i class="fa fa-check"></i>');

            // Update the apply icon on sidebar
            if (response > 0) {
                $(".totalAppliesInvalid").html(response);
                $(".totalAppliesInvalid").removeClass('hidden');
            } else {
                $(".totalAppliesInvalid").addClass('hidden');
            }

            $("#applies-content").load(location.href + " #applies-content>*", "");
            $modal.modal('toggle');
        },
        error: function (response) {
            console.error(response);
            notification('danger', "Une erreur est survenue.");
        },
        complete: function() {
            $button.html($buttonValue);
        }
    });
});

/*
|--------------------------------------------------------------------------
| Applies filter
|--------------------------------------------------------------------------
*/

$(document).on('change', '#filterApplies', function(event) {
    var value = $(this).val();

    $.ajax({
        type: 'GET',
        url: "/dashboard/applies/filter/" + value,
        beforeSend: function() {
            $("#applies-content").find('tbody').html('<tr><td colspan="6" align="center"><i class="fa fa-spinner fa-pulse fa-fw fa-3x"></i></td></tr>');
        },
        success: function (response) {
            $("#applies-content").html($(response).find('#applies-content').html());
            $(".paginationBlock").html($(response).find('.paginationBlock').html());
        },
        error: function(response) {
            console.error(response);
            notification('danger', "Une erreur est survenue lors du filtre.");
        }
    });
});