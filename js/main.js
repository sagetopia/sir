(function($) {
  $.fn.lazyInterchange = function() {
    var selectors = this.each(function() {
      if ($(this).attr('data-lazy')) {
        $(this).attr('data-interchange', $(this).attr('data-lazy'));
        $(this).removeAttr('data-lazy').removeAttr('data-src');
        $(this).foundation('interchange', 'reflow');
      }
    });
    return selectors;
  };
}(jQuery));

function updateViewportDimensions() {
	var w=window,d=document,e=d.documentElement,g=d.getElementsByTagName('body')[0],x=w.innerWidth||e.clientWidth||g.clientWidth,y=w.innerHeight||e.clientHeight||g.clientHeight;
	return { width:x,height:y };
}

function window_resize() {
  if (document.createEvent) { 
      var ev = document.createEvent('Event');
      ev.initEvent('resize', true, true);
      window.dispatchEvent(ev);
  } else { 
      element=document.documentElement;
      var event=document.createEventObject();
      element.fireEvent("onresize",event);
  }
};

var sir_tooltip = function() {
  return '<b>' + this.x + '</b><br/>' 
          + this.series.name + ': <b>$' + Highcharts.numberFormat(this.y, 0) + '</b><br/>'
          + 'Total: <b>$' + Highcharts.numberFormat(this.total, 0) + '</b>';
};

var sir_yAxis_labels = function() {
  return '$' + this.value / 1000000 + 'M';
} 

var chart_data = {
	sir: {
		type: 'line',
		title: {
      text: 'SIR Revenue and Expense Trends 2011-2015',
    },
		xAxis: ['2011', '2012', '2013', '2014', '2015'],	
		yAxis: {
    	title: {
      	text: 'Dollars ($)',
      },
      labels: {
        formatter: sir_yAxis_labels
      }
    },
    tooltip: {
    	valuePrefix: '$',
      formatter: function() {
          var s = '<b>' + this.x + '</b>';

          $.each(this.points, function () {
              s += '<br/>' + this.series.name + ': <b>$' +
                  Highcharts.numberFormat(this.y, 0) + '</b>';
          });

          return s;
      },
      shared: true
    },
    series: [{
      	name: 'Revenue',
      	data: [7983303, 8153353, 7994065, 8556633, 8968141],
      }, {
      	name: 'Expenses',
      	data: [8157875, 8148630, 8045748, 8430487, 8508465],
      }
    ],
  },
  sir_assets: {
    type: 'column',
    title: {
      text: 'SIR assets 2011-2015',
    },
    xAxis: ['2011', '2012', '2013', '2014', '2015'],
    yAxis: {
      min: 0,
      title: {
        text: 'Dollars ($)',
      },
      labels: {
        formatter: sir_yAxis_labels
      }
    },
    tooltip: {
      formatter: sir_tooltip,
    },
    series: [{
        name: 'Capital',
        data: [264639, 191651, 486614, 600297, 1174866]
      }, {
        name: 'Reserves',
        data: [5947267, 6090070, 6347414, 6610746, 6123355]
      }, {
        name: 'Current',
        data: [1112323, 1397730, 1458920, 1648313, 2482610]
      }
    ],
  },
  sir_pie: {
    type: 'pie',
    title: {
      text: 'SIR Revenue Allocation',
    },
    tooltip: {
      pointFormat: '{series.name}: <b>${point.y}</b>'
    },
    series: [{
      name: 'Revenue',
      colorByPoint: true,
      data: [{
            name: 'Membership Dues',
            y: 2980762,
            sliced: true,
            selected: true
        }, {
            name: 'Annual Meeting',
            y: 3329487
        }, {
            name: 'Education',
            y: 683024 
        }, {
            name: 'JVIR',
            y: 1062020
        }, {
            name: 'General Programming (CAP Unrestricted)',
            y: 608666
        }, {
            name: 'Other Pubs and Products',
            y: 246306
        }, {
            name: 'Other Programs',
            y: 57876,
            color: '#34657f',
        }
      ]
    }],
  },
	sir_fdn: {
		type: 'column',
		title: {
      text: 'SIR Foundation assets 2012-2015',
    },
		xAxis: ['2011', '2012', '2013', '2014', '2015'],
		yAxis: {
    	min: 0,
    	title: {
      	text: 'Dollars ($)'
    	},
      labels: {
        formatter: sir_yAxis_labels
      }
    },
    tooltip: {
      formatter: sir_tooltip,
    },
    series: [{
      	name: 'Reserves',
      	data: [3483576, 3864939, 4374047, 4562279, 4510833]
      }, {
      	name: 'Current',
      	data: [2036307, 1872365, 1392610, 1284119, 627749]
      }
    ],
  },
  sir_fdn_pie: {
		type: 'pie',
		title: {
      	text: 'SIR Foundation Expense Allocation',
    },
    tooltip: {
      	pointFormat: '{series.name}: <b>${point.y}</b>'
    },
		series: [{
    	name: 'Expenses',
    	colorByPoint: true,
    	data: [{
        	name: 'Grants/Awards',
        	y: 493721 
        }, {
        	name: 'Fundraising',
        	y: 184584,
        	sliced: true,
        	selected: true
        }, {
        	name: 'Governance Admin',
        	y: 198320
        }, {
        	name: 'Clinical Trials Research',
        	y: 202047
        }, {
        	name: 'Quality and Outcomes',
        	y: 220778
        }, {
        	name: 'GALA',
        	y: 299589
    	  }
      ],
    }]
	}
};

function sir_make_chart(el) {
	var $el = $(el);
	var chartData = chart_data[$el.data('chart')];

	var options = {
		chart: {
			type: chartData.type,
		},
		title: chartData.title,
        subtitle: chartData.subtitle,
        tooltip: chartData.tooltip,
        series: chartData.series,
        credits: false,
	};

	if (chartData.type === 'line' || chartData.type === 'column') {
		options.xAxis = {
          	categories: chartData.xAxis
        };
        options.yAxis = chartData.yAxis;
	}

	if (chartData.type === 'line') {
		options.plotOptions = {
    	series: {
      	animation: {
        		duration: 3000
      	}
    	}
    };
    options.legend = {
    	align: 'right',
    	borderWidth: 0
    };
	} else if (chartData.type === 'column') {
		options.plotOptions = {
    	column: {
      	stacking: 'normal',
      	// dataLabels: {
      	// 	enabled: true,
      	// 	color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white',
      	// 	style: {
       //  		textShadow: '0 0 3px black'
      	// 	}
      	// }
    	},
    	series: {
        animation: {
          duration: 2000
        }
      }
    };
    options.legend = {
    	align: 'right',
    	borderColor: '#CCC',
    	borderWidth: 1,
    };
	} else if (chartData.type === 'pie') {
		options.chart.plotBackgroundColor = options.chart.chartplotBorderWidth = null;
        options.chart.plotShadow = false;
        options.plotOptions = {
          	pie: {
           		allowPointSelect: true,
	            cursor: 'pointer',
	            dataLabels: {
	                enabled: true,
	                format: '<b>{point.name}</b>: {point.percentage:.1f} %',
	            },
	            showInLegend: false
          	}
        };
	}

	$el.highcharts(options);
}

$(document).foundation({
	'magellan-expedition': {
		fixed_top: 20,
	},
});

$(document).ready(function() {

  Highcharts.setOptions({
    colors: ['#c4d600', '#009cde', '#34657f', '#ed8b00', '#ffd100', '#84bd00'],
    lang: {
      thousandsSep: ',',
    }
  });

	$("#introbutton a").click(function(e) {
    e.preventDefault();

    $('html, body').animate({
      scrollTop: $('#section-1').offset().top
  	}, 1000);

    return false;
  });

  $('.icon-box a').click(function(e) {
    e.preventDefault();

    $('html, body').animate({
      scrollTop: $($(this).attr('href')).offset().top
    }, 1000);

    return false;
  });

  $(".menu li a").click(function(e) {
    	$('.mobile input[type="checkbox"]').prop('checked', false);
  });

  $('.audio-player').each(function() {
  	var $player = $(this),
  		$container = $player.find('.audio-container'),
  		$id = '#' + $player.attr('id') + ' .jp-gui';

  	$container.after( 
    	'<div class="jp-gui">\
            <ul class="jp-controls">\
                <li><a href="javascript:;" class="jp-play" tabindex="1">&#61515;</a></li>\
                <li><a href="javascript:;" class="jp-pause" tabindex="1">&#61516;</a></li>\
            </ul>\
            <div class="jp-progress">\
                <div class="jp-seek-bar">\
                    <div class="jp-play-bar"></div>\
                </div>\
            </div>\
            <div class="jp-volume-bar-holder">\
                <div class="jp-volume-bar" style="display:none">\
                    <div class="jp-volume-bar-value"></div>\
                </div>\
                <ul class="jp-controls">\
                    <li><a href="javascript:;" class="jp-mute" tabindex="1" title="mute">&#61478;</a></li>\
                    <li><a href="javascript:;" class="jp-unmute" tabindex="1" title="unmute">&#61480;</a></li>\
                </ul>\
            </div>\
      </div>')
	  .jPlayer({
   		ready: function () {
    		$(this).jPlayer('setMedia', {
     			mp3: $(this).data('audio-src'),
    		});
    		$(this).parents('.audio-player').find('.jp-volume-bar').toggle();
   		},
   		supplied: 'mp3',
   		cssSelectorAncestor: $id,
   		verticalVolume: true,
  	});
  });

	$('.audio-player').on('mouseenter mouseleave', '.jp-volume-bar-holder', function(e) {
		if (e.type == 'mouseenter') {
			$(e.currentTarget).css({height:140}).find('.jp-volume-bar').show();
		} else {
			$(e.currentTarget).css({height:30}).find('.jp-volume-bar').hide();
		}
	});

  $('.youtube').each(function() {
    $(this).css('background-image', 'url(http://i.ytimg.com/vi/' + this.id + '/sddefault.jpg)');

    $(this).append($('<div/>', {'class': 'play'}));

    $(this).on('click', function() {
      $(this).css({'background-image': 'none'}, 200);
      $(this).find('.play').hide();
    });

    $(document).delegate('#' + this.id, 'click', function() {

      var iframe_url = "https://www.youtube.com/embed/" + this.id + "?autoplay=1&autohide=1&rel=0";
      if ($(this).data('params')) iframe_url += '&' + $(this).data('params');

      var iframe = $('<iframe/>', {'frameborder': '0', 'src': iframe_url });

      $(this).append(iframe);
    });
  });

  if (Modernizr.mq('only all')) { 
    print_mq = window.matchMedia('print');
    print_mq.addListener(function(mql) {
      if (mql.matches) {
        $('.lazy').each(function() {
          $(this).lazyInterchange().css({opacity: 1});
        });
        $('.chart-container').each(function() {
          sir_make_chart($(this));
        });
      }
    });
  } else {
    window.onbeforeprint = function() { 
      $('.lazy').each(function() {
        $(this).lazyInterchange().css({opacity: 1});
      });
      $('.chart-container').each(function() {
        sir_make_chart($(this));
      });
    }
  }

});

$(window).load(function() {

  $('html').removeClass("loading");

  $(window).resize(function() {
    $('.audio.boxed').each(function() {
      if (updateViewportDimensions().width >= 768) {
        var margin = Math.max($(this).outerHeight(), $(this).find('.attachment').outerHeight()) - $(this).outerHeight();
        margin = (margin / 2) + 30;
        $(this).css({'margin-top': margin + 'px', 'margin-bottom': margin + 'px'});
      } else {
        $(this).removeAttr('style');
      }
    });
  });

  if (typeof(document.getElementsByClassName) != 'undefined') {

  	appear({
    	elements: function elements(){
      		return document.getElementsByClassName('chart-container');
    	},
    	appear: function appear(el) {
      		sir_make_chart(el);
      },
  	  bounds: 50,
  	});

    appear((function() {
      'use strict';
      var nodes = [];

      return {
        init: function init() {
          var els = document.getElementsByClassName('lazy');
          var elsl = els.length;
          for (var i = 0; i < elsl; i += 1) {
            if (!els[i].classList.contains('section-header')) {
              nodes.push(els[i]);
            }
          }
        },
        elements: nodes,
        appear: function doReveal(el) {
          $(el).lazyInterchange().animate({opacity: 1},500);
        },
        bounds: 400
      };
    }()));

    appear((function() {
      'use strict';
      var nodes = [];

      return {
        init: function init() {
          var els = document.getElementsByClassName('section-header');
          var elsl = els.length;
          for (var i = 0; i < elsl; i += 1) {
            if (els[i].hasAttribute('data-lazy')) {
              nodes.push(els[i]);
            }
          }
        },
        elements: nodes,
        appear: function doReveal(el) {
          var bg = 'url(img/header/header_bg_' + el.getAttribute('data-lazy') + (updateViewportDimensions().width < 768 ? '_m' : '') + '.jpg)';
          el.style.backgroundImage = bg;
          el.removeAttribute('data-lazy');
        },
        bounds: 1000
      };
    }()));

  	if (updateViewportDimensions().width > 767) {
  	  var els = document.getElementsByClassName('parallax');

    	window.onscroll = function() {
  			Array.prototype.forEach.call(els, function(el) {
  				var rect = el.getBoundingClientRect();
  				if (rect.bottom > 0 && rect.top < updateViewportDimensions().height) {
  					el.style.backgroundPosition = 'center ' + (el.getBoundingClientRect().top * -0.15) + 'px';
  				}
  			});
    	};
  	}
  } else {
    $('.chart-container').each(function() {
      sir_make_chart($(this));
    });
    $('.lazy').lazyInterchange().css({opacity: 1});
  }

});

window_resize();

