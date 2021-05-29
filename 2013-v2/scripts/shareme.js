$(document).ready(function() {
  $('#shareme').sharrre({
    share: {
      googlePlus: true,
      facebook: true,
      twitter: true
    },
    shorterTotal: false,
    enableTracking: true,
    buttons: {
      facebook: {layout: 'box_count'},
      googlePlus: {size: 'tall', annotation:'bubble'},
      twitter: {count: 'vertical'}
    },
    hover: function(api, options){
      $(api.element).find('.buttons').show();
    },
    hide: function(api, options){
      $(api.element).find('.buttons').hide();
    }
  });
});