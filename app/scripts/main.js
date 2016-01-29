(function(){
    'use strict';
    var mu = $.Deferred();
    $('script#mu-bootjs').load(function() { mu.resolve(window.mu); });
    Handlebars.registerHelper('mu-date-time', function(ts) {
        var date = moment(new Date(ts));
        if (date.isBefore(moment().endOf('d').add('d', 6))) {
            return date.calendar();
        }
        return date.format('LLL');
    });
    Handlebars.registerHelper('mu-time-span', function(duration) {
        return moment.duration(duration).humanize();
    });
    $('div.mu-upcoming-events').each(function(i, div) {
        var jqdiv = $(div);
        var defaults = {
            status: 'upcoming',
            order: 'time',
            'limited_events': 'False',
            desc: 'false',
            offset: '0',
            format: 'json',
            page: '20',
            fields: '',
        };
        var template;
        $.when($.ajax({
            url: 'https://api.meetup.com/2/events',
            data: _.defaults(_.pick(jqdiv.data(), ['event_id', 'group_domain', 'group_id', 'group_urlname', 'member_id', 'time', 'venue_id', 'sig_id', 'sig'].concat(_.keys(defaults))), defaults),
            dataType: 'jsonp'
        }), mu).then(function (a, mu) {
            if (a[1] !== 'success' || _.has(a[0], 'status')) {
                console.error(a);
            } else {
                jqdiv.append(template(a[0].results));
                mu.rsvpBtns('div.mu-upcoming-events');
            }
        });
        template = Handlebars.compile($('script.template', div).html());
    });
})();
