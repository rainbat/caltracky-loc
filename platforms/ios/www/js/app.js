//https://beautifier.io
//https://jshint.com
calOptionsIdWork = "";
calOptionsWork = "Work";
calOptionsIdTrack = "";
calOptionsTrack = "Track";
Icon1 = "Weight";
Icon2 = "Bloodpressure";
Icon3 = "Mood";
Icon4 = "Off";
Icon5 = "Off";
Icon6 = "Off";
Icon7 = "Off";
Icon8 = "Off";
Favourite1 = "Kebab essen";
Favourite2 = "Lachen";
Favourite3 = "";
Favourite4 = "";
Favourite5 = "";
Favourite6 = "";
Favourite7 = "";
Favourite8 = "";
var tmp = [];
tmpFile = "";
log('loading of app.js');

function syncToday() {
    //https://github.com/katzer/cordova-plugin-local-notifications
    /*cordova.plugins.notification.local.schedule({
        title: '.. forgot me ?',
        trigger: {
            in: 1,
            unit: 'hour'
        }
    });*/
    window.plugins.calendar.listCalendars(
        function(msg) {
            msg.forEach(function(entry) {
                if (entry.name == "Work") calOptionsIdWork = entry.id;
                if (entry.name == "Track") calOptionsIdTrack = entry.id;
            });
            log("calOptionsIdWork:" + calOptionsIdWork);
            log("calOptionsIdTrack:" + calOptionsIdTrack);
        },
        function(msg) {
            log("Error listCalendars");
        }
    );
    if (calOptionsIdWork == "" || calOptionsIdTrack == "") {
        $("#cards").append("<b>Calendars with Name <i>Work</i> and <i>Track</i> not found. <br/>Please add them manually !</b>");
    }
    var calOptions = window.plugins.calendar.getCalendarOptions();
    calOptions.calendarName = "Work";
    calOptions.calendarId = calOptionsIdWork;
    window.plugins.calendar.findEventWithOptions(
        null,
        null,
        null,
        new Date.today(),
        new Date.today().addDays(1),
        calOptions,
        function(msg) {
            log('Calendar Work and Track found.');
            showStatus('Calendar Work and Track found');
            $("#cards").empty();
            msg.forEach(function(entry) {
                var spart = entry.startDate.split(' ');
                var epart = entry.endDate.split(' ');
                tmp_card = addCard(entry.id, entry.title, spart[1], epart[1]);
                if (entry.title.indexOf("Options") == -1) $("#cards").append(tmp_card);
            });
        },
        function(msg) {
            log("Error findEventWithOptions: " + msg);
        }
    );
    //});
    //$('#syncTrackStatus').on('click', function () {
    var calOptions = window.plugins.calendar.getCalendarOptions();
    calOptions.calendarName = "Track";
    calOptions.calendarId = calOptionsIdTrack;
    window.plugins.calendar.findEventWithOptions(
        null,
        null,
        null,
        new Date.today(),
        new Date.today().addDays(1),
        calOptions,
        function(msg) {
            log('Calendar success: ');
            $("#track").empty();
            $("#track").append("<table border=1>");
            msg.forEach(function(entry) {
                var spart = entry.startDate.split(' ');
                var epart = entry.endDate.split(' ');
                $("#track").append("<tr><td>" + spart[1] + " " + epart[1] + " " + entry.title + "</td></tr>");
                if (entry.title.indexOf("(Start Drive)") >= 0) {
                    $("#" + entry.message + " > div > div > button[id=wt-drive]").prop("disabled", true);
                    $("#" + entry.message + " > div > div > button[id=wt-drive] > i").removeClass();
                    $("#" + entry.message + " > div > div > button[id=wt-drive] > i").addClass("fa fa-3x fa-refresh fa-spin");
                }
                if (entry.title.indexOf("(Start Work)") >= 0) {
                    $("#" + entry.message + " > div > div > button[id=wt-work]").prop("disabled", true);
                    $("#" + entry.message + " > div > div > button[id=wt-work] > i").removeClass();
                    $("#" + entry.message + " > div > div > button[id=wt-work] > i").addClass("fa fa-3x fa-refresh fa-spin");
                }
                if (entry.title.indexOf("(Memo)") >= 0) {
                    //$("#" + entry.message + " > div > div > button[id=wt-note] > i").addClass("fa fa-3x fa-refresh fa-spin");
                }
            });
            $("#track").append("</table>");
        },
        function(msg) {
            log("Error syncTrackStatus: " + msg);
        }
    );
}

function addFav(nr) {
    var title = "";
    if (nr == 1) title = Favourite1;
    if (nr == 2) title = Favourite2;
    if (nr == 3) title = Favourite3;
    if (nr == 4) title = Favourite4;
    if (nr == 5) title = Favourite5;
    if (nr == 6) title = Favourite6;
    if (nr == 7) title = Favourite7;
    if (nr == 8) title = Favourite8;
    if (title != "") {
        var calOptions = window.plugins.calendar.getCalendarOptions();
        calOptions.calendarName = "Work";
        calOptions.calendarId = calOptionsIdWork;
        window.plugins.calendar.createEventWithOptions(
            title,
            "Home",
            "from favourites",
            new Date(),
            new Date(moment().add(1, 'hours')),
            calOptions,
            function(msg) {
                log("Success createEventWithOptions: " + JSON.stringify(msg));
                syncToday();
            },
            function(msg) {
                log("Error createEventWithOptions: " + msg);
            }
        );
    }
}

function syncOptions() {
    var calOptions = window.plugins.calendar.getCalendarOptions();
    calOptions.calendarName = "Work";
    calOptions.calendarId = calOptionsIdWork;
    window.plugins.calendar.listCalendars(
        function(msg) {
            msg.forEach(function(entry) {
                if (entry.name == "Work") calOptionsIdWork = entry.id;
                if (entry.name == "Track") calOptionsIdTrack = entry.id;
            });
            log("calOptionsIdWork:" + calOptionsIdWork);
            log("calOptionsIdTrack:" + calOptionsIdTrack);
        },
        function(msg) {
            log("Error listCalendars");
        }
    );
    window.plugins.calendar.findEventWithOptions(
        "CalTracky Options",
        null,
        null,
        new Date.parse("2018-01-01"),
        new Date.parse("2022-31-12"),
        calOptions,
        function(msg) {
            log('Calendar Found Options success: ' + msg.length);
            if (msg.length == 0) {
                window.plugins.calendar.createEventWithOptions(
                    "CalTracky Options",
                    "Home",
                    "WorkCalendar=Word\nTrackCalendar=Track\nIcon1=Weight\nIcon2=Bloodpressure\nIcon3=Mood\nIcon4=Off\nIcon5=Off\nIcon6=Off\nIcon7=Off\nIcon8=Off\nFavourite1:=Kebab essen\nFavourite2:=Lachen",
                    new Date(),
                    new Date(moment().add(1, 'hours')),
                    calOptions,
                    function(msg) {
                        log("Success createEventWithOptions: " + JSON.stringify(msg));
                    },
                    function(msg) {
                        log("Error createEventWithOptions: " + msg);
                    }
                );
                Favourite1 = "Kebab essen";
                Favourite2 = "Lachen";
            } else {
                var lines = msg[0].message.split("\n");
                for (var i = lines.length - 1; i >= 0; i--) {
                    var name = lines[i].split("=")[0];
                    var value = lines[i].split("=")[1];
                    if (name == "calOptionsWork") calOptionsWork = value;
                    if (name == "calOptionsTrack") calOptionstrack = value;
                    if (name == "Icon1") Icon1 = value;
                    if (name == "Icon2") Icon2 = value;
                    if (name == "Icon3") Icon3 = value;
                    if (name == "Icon4") Icon4 = value;
                    if (name == "Icon5") Icon5 = value;
                    if (name == "Icon6") Icon6 = value;
                    if (name == "Icon7") Icon7 = value;
                    if (name == "Icon8") Icon8 = value;
                    if (name == "Favourite1") Favourite1 = value;
                    if (name == "Favourite2") Favourite2 = value;
                    if (name == "Favourite3") Favourite3 = value;
                    if (name == "Favourite4") Favourite4 = value;
                    if (name == "Favourite5") Favourite5 = value;
                    if (name == "Favourite6") Favourite6 = value;
                    if (name == "Favourite7") Favourite7 = value;
                    if (name == "Favourite8") Favourite8 = value;
                }
            }
        },
        function(msg) {
            log("Error findEventWithOptions: " + msg);
        }
    );
    $("#cards_fav").empty();
    if (Favourite1 != "") $("#cards_fav").append('<a class="ui-btn" id="today" onClick="addFav(1)">create <b>' + Favourite1 + '</b></a>');
    if (Favourite2 != "") $("#cards_fav").append('<a class="ui-btn" id="today" onClick="addFav(2)">create <b>' + Favourite2 + '</b></a>');
    if (Favourite3 != "") $("#cards_fav").append('<a class="ui-btn" id="today" onClick="addFav(3)">create <b>' + Favourite3 + '</b></a>');
    if (Favourite4 != "") $("#cards_fav").append('<a class="ui-btn" id="today" onClick="addFav(4)">create <b>' + Favourite4 + '</b></a>');
    if (Favourite5 != "") $("#cards_fav").append('<a class="ui-btn" id="today" onClick="addFav(5)">create <b>' + Favourite5 + '</b></a>');
    if (Favourite6 != "") $("#cards_fav").append('<a class="ui-btn" id="today" onClick="addFav(6)">create <b>' + Favourite6 + '</b></a>');
    if (Favourite7 != "") $("#cards_fav").append('<a class="ui-btn" id="today" onClick="addFav(7)">create <b>' + Favourite7 + '</b></a>');
    if (Favourite8 != "") $("#cards_fav").append('<a class="ui-btn" id="today" onClick="addFav(8)">create <b>' + Favourite8 + '</b></a>');
}

function saveMemo() {
    var filterOptions = window.plugins.calendar.getCalendarOptions();
    filterOptions.calendarName = "Track";
    filterOptions.calendarId = calOptionsIdTrack;
    var newOptions = window.plugins.calendar.getCalendarOptions();
    newOptions.calendarName = "Track";
    newOptions.calendarId = calOptionsIdTrack;
    window.plugins.calendar.modifyEventWithOptions(
        $("#title").val() + " (Memo)",
        "Home",
        null,
        new Date.today(),
        new Date.today().addDays(1),
        $("#title").val() + " (Memo)",
        "Home",
        $("#memo").val(),
        new Date(),
        new Date(moment().add(1, 'hours')),
        filterOptions,
        newOptions,
        function(msg) {
            log("Success modifyEventWithOptions: " + JSON.stringify(msg));
            $(':mobile-pagecontainer').pagecontainer('change', '#menu');
        },
        function(msg) {
            log("Error modifyEventWithOptions: " + msg);
        }
    );
}

function getLogTime() {
    return new Date().toString("yyyy-MM-dd HH:mm:ss");
}

function showStatus(str) {
    ct = getLogTime();
    $("#footer1").empty();
    $("#footer1").append(ct + " " + str);
    $("#footer2").empty();
    $("#footer2").append(ct + " " + str);
    $("#footer5").empty();
    $("#footer5").append(ct + " " + str);
}

function log(str) {
    ct = getLogTime();
    //tmp.push(ct + " " + str);
    tmp.push(str);
    $("#log").empty();
    $("#log").append("<table border=1>");
    var out = tmp.reverse();
    for (var i = 0; i < out.length; i++) {
        $("#log").append("<tr><td>" + out[i] + "</td></tr>");
    }
    $("#log").append("</table>");
}

function updateStatus(id, title, className) {
    if (className.indexOf("fa-car") >= 0) {
        $("#" + id + " > div > div > button[id=wt-work]").prop("disabled", true);
        $("#" + id + " > div > div > button[id=wt-drive]").prop("disabled", true);
        $("#" + id + " > div > div > button[id=wt-drive] > i").removeClass();
        $("#" + id + " > div > div > button[id=wt-drive] > i").addClass("fa fa-3x fa-refresh fa-spin");
        var calOptions = window.plugins.calendar.getCalendarOptions();
        calOptions.calendarName = "Track";
        calOptions.calendarId = calOptionsIdTrack;
        window.plugins.calendar.createEventWithOptions(
            title + " (Start Drive)",
            "Home",
            id,
            new Date(),
            new Date(moment().add(1, 'hours')),
            calOptions,
            function(msg) {
                log("Success createEventWithOptions: " + JSON.stringify(msg));
            },
            function(msg) {
                log("Error createEventWithOptions: " + msg);
            }
        );
    }
    if (className.indexOf("fa-user-md") >= 0) {
        $("#" + id + " > div > div > button[id=wt-drive]").prop("disabled", true);
        $("#" + id + " > div > div > button[id=wt-work]").prop("disabled", true);
        $("#" + id + " > div > div > button[id=wt-work] > i").removeClass();
        $("#" + id + " > div > div > button[id=wt-work] > i").addClass("fa fa-3x fa-refresh fa-spin");
        var calOptions = window.plugins.calendar.getCalendarOptions();
        calOptions.calendarName = "Track";
        calOptions.calendarId = calOptionsIdTrack;
        window.plugins.calendar.createEventWithOptions(
            title + " (Start Work)",
            "Home",
            id,
            new Date(),
            new Date(moment().add(1, 'hours')),
            calOptions,
            function(msg) {
                log("Success createEventWithOptions: " + JSON.stringify(msg));
            },
            function(msg) {
                log("Error createEventWithOptions: " + msg);
            }
        );
    }
    if (className.indexOf("fa-file-text") >= 0) {
        $(':mobile-pagecontainer').pagecontainer('change', '#details');
        $("#title").val(title);
        $("#memo").val("");
        var calOptions = window.plugins.calendar.getCalendarOptions();
        calOptions.calendarName = "Track";
        calOptions.calendarId = calOptionsIdTrack;
        window.plugins.calendar.findEventWithOptions(
            title + " (Memo)",
            "Home",
            null,
            new Date.today(),
            new Date.today().addDays(1),
            calOptions,
            function(msg) {
                log("Number of Memo for " + title + " " + msg.length);
                if (msg.length == 0) {
                    window.plugins.calendar.createEventWithOptions(
                        title + " (Memo)",
                        "Home",
                        "Some notes about this event.",
                        new Date(),
                        new Date(moment().add(1, 'hours')),
                        calOptions,
                        function(msg) {
                            log("Success createEventWithOptions: " + JSON.stringify(msg));
                        },
                        function(msg) {
                            log("Error createEventWithOptions: " + msg);
                        }
                    );
                } else {
                    log('Calendar Memo success: ' + msg[0].message);
                    $("#memo").val(msg[0].message);
                }
            },
            function(msg) {
                log("Error syncTrackStatus: " + msg);
            }
        );
    }
    if (className.indexOf("fa-pause") >= 0) {
        $("#" + id + " > div > div > button[id=wt-drive]").prop("disabled", false);
        $("#" + id + " > div > div > button[id=wt-drive] > i").removeClass();
        $("#" + id + " > div > div > button[id=wt-drive] > i").addClass("fa fa-car fa-3x");
        $("#" + id + " > div > div > button[id=wt-work]").prop("disabled", false);
        $("#" + id + " > div > div > button[id=wt-work] > i").removeClass();
        $("#" + id + " > div > div > button[id=wt-work] > i").addClass("fa fa-user-md fa-3x");
        var calOptions = window.plugins.calendar.getCalendarOptions();
        calOptions.calendarName = "Track";
        calOptions.calendarId = calOptionsIdTrack;
        window.plugins.calendar.findEventWithOptions(
            title + " (Start Drive)",
            "Home",
            id,
            new Date.today(),
            new Date.today().addDays(1),
            calOptions,
            function(msg) {
                var filterOptions = window.plugins.calendar.getCalendarOptions();
                filterOptions.calendarName = "Track";
                filterOptions.calendarId = calOptionsIdTrack;
                var newOptions = window.plugins.calendar.getCalendarOptions();
                newOptions.calendarName = "Track";
                newOptions.calendarId = calOptionsIdTrack;
                window.plugins.calendar.modifyEventWithOptions(
                    title + " (Start Drive)",
                    "Home",
                    id,
                    Date.parse(msg[0].startDate),
                    Date.parse(msg[0].endDate),
                    title + " (End Drive)",
                    "Home",
                    id,
                    Date.parse(msg[0].startDate),
                    new Date(),
                    filterOptions,
                    newOptions,
                    function(msg) {
                        log("Success modifyEventWithOptions: " + JSON.stringify(msg));
                    },
                    function(msg) {
                        log("Error modifyEventWithOptions: " + msg);
                    }
                );
            },
            function(msg) {
                alert("Error modifyEventWithOptions: " + msg);
            }
        );
        var calOptions = window.plugins.calendar.getCalendarOptions();
        calOptions.calendarName = "Track";
        calOptions.calendarId = calOptionsIdTrack;
        window.plugins.calendar.findEventWithOptions(
            title + " (Start Work)",
            "Home",
            id,
            new Date.today(),
            new Date.today().addDays(1),
            calOptions,
            function(msg) {
                var filterOptions = window.plugins.calendar.getCalendarOptions();
                filterOptions.calendarName = "Track";
                filterOptions.calendarId = calOptionsIdTrack;
                var newOptions = window.plugins.calendar.getCalendarOptions();
                newOptions.calendarName = "Track";
                newOptions.calendarId = calOptionsIdTrack;
                window.plugins.calendar.modifyEventWithOptions(
                    title + " (Start Work)",
                    "Home",
                    id,
                    Date.parse(msg[0].startDate),
                    Date.parse(msg[0].endDate),
                    title + " (End Work)",
                    "Home",
                    id,
                    Date.parse(msg[0].startDate),
                    new Date(),
                    filterOptions,
                    newOptions,
                    function(msg) {
                        log("Success modifyEventWithOptions: " + JSON.stringify(msg));
                    },
                    function(msg) {
                        log("Error modifyEventWithOptions: " + msg);
                    }
                );
            },
            function(msg) {
                alert("Error modifyEventWithOptions: " + msg);
            }
        );
    }
}

function addCard(id, title, startDate, endDate) {
    var tmp = `
        <div class="card" id="` + id + `" title="` + title + `">
          <div class="card-header">
               <button id="wt-detail-1761377128" type="button" class="btn btn-inverse wt-button wt-info">
                <p class="wt-infotext">` + startDate + ` - ` + endDate + `</p>
                <p class="wt-infotext">` + title + `</p>
                <p class="wt-infotext">
                    <a href="#" id="memos">Memos</a> &nbsp;
                </p>
                <p class="wt-infotext wt-infodetail">Telefon: xyz</p>
              </button>
          </div>
          <div class="card-content">
            <div class="card-content-inner">
              <button id="wt-drive"                         type="button" class="btn btn-raised btn-worktime wt-button"><i class="fa fa-car fa-3x"></i></button>
              <button id="wt-work"                          type="button" class="btn btn-raised btn-worktime wt-button"><i class="fa fa-user-md fa-3x"></i></button>
              <button id="wt-break"                         type="button" class="btn btn-raised btn-worktime wt-button"><i class="fa fa-pause fa-2x"></i></button>
              <button id="wt-note"     data-type="textarea" type="button" class="btn btn-raised btn-worktime wt-button"><i class="fa fa-file-text-o fa-3x"></i></button>
              <br/><br/>
              <!--button id="wt-flatrate" data-type="textarea" type="button" class="btn btn-raised btn-worktime wt-button"><i class="icon-ecg fa-3x"></i></button>
              <button id="wt-flatrate" data-type="textarea" type="button" class="btn btn-raised btn-worktime wt-button"><i class="icon-hot fa-3x"></i></button>
              <button id="wt-flatrate" data-type="textarea" type="button" class="btn btn-raised btn-worktime wt-button"><i class="icon-pill fa-3x"></i></button>
              <button id="wt-flatrate" data-type="textarea" type="button" class="btn btn-raised btn-worktime wt-button"><i class="icon-pill fa-3x"></i></button>
              <br/><br/>
              <button id="wt-flatrate" data-type="textarea" type="button" class="btn btn-raised btn-worktime wt-button"><i class="icon-ecg fa-3x"></i></button>
              <button id="wt-flatrate" data-type="textarea" type="button" class="btn btn-raised btn-worktime wt-button"><i class="icon-hot fa-3x"></i></button>
              <button id="wt-flatrate" data-type="textarea" type="button" class="btn btn-raised btn-worktime wt-button"><i class="icon-pill fa-3x"></i></button>
              <button id="wt-flatrate" data-type="textarea" type="button" class="btn btn-raised btn-worktime wt-button"><i class="icon-pill fa-3x"></i></button--> 
           </div>
          </div>
          <div class="card-footer"><hr/></div>
        </div>
      </div>
      <script>
        $("#` + id + `").click( function(e){
          log( e.currentTarget.id + " " + e.currentTarget.title + " " + e.target.className );
          updateStatus(e.currentTarget.id,e.currentTarget.title,e.target.className);
        });
      </script>
    `;
    return tmp;
}

function distance(lat1, lon1, lat2, lon2, unit) {
    if ((lat1 == lat2) && (lon1 == lon2)) {
        return 0;
    } else {
        var radlat1 = Math.PI * lat1 / 180;
        var radlat2 = Math.PI * lat2 / 180;
        var theta = lon1 - lon2;
        var radtheta = Math.PI * theta / 180;
        var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        if (dist > 1) {
            dist = 1;
        }
        dist = Math.acos(dist);
        dist = dist * 180 / Math.PI;
        dist = dist * 60 * 1.1515;
        if (unit == "K") {
            dist = dist * 1.609344
        }
        if (unit == "N") {
            dist = dist * 0.8684
        }
        return dist;
    }
}