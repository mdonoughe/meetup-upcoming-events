!function(){"use strict";var a=$.Deferred();$("script#mu-bootjs").load(function(){a.resolve(window.mu)}),Handlebars.registerHelper("mu-date-time",function(a){var b=moment(new Date(a));return b.isBefore(moment().endOf("d").add("d",6))?b.calendar():b.format("LLL")}),Handlebars.registerHelper("mu-time-span",function(a){return moment.duration(a).humanize()}),$("div.mu-upcoming-events").each(function(b,c){var d,e=$(c),f={status:"upcoming",order:"time",limited_events:"False",desc:"false",offset:"0",format:"json",page:"20",fields:""};$.when($.ajax({url:"http://api.meetup.com/2/events",data:_.defaults(_.pick(e.data(),["event_id","group_domain","group_id","group_urlname","member_id","time","venue_id","sig_id","sig"].concat(_.keys(f))),f),dataType:"jsonp"}),a).then(function(a,b){"success"!==a[1]||_.has(a[0],"status")?console.error(a):(e.append(d(a[0].results)),b.rsvpBtns("div.mu-upcoming-events"))}),d=Handlebars.compile($("script.template",c).html())})}();