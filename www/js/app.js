var tmp = [];

calOptionsIdWork = "";
calOptionsWork = "Work";
calOptionsIdTrack = "";
calOptionsTrack = "Track";

tmpFile = "";

log('loading of app.js');

function getLogTime(){
  return new Date().toString("yyyy-MM-dd HH:mm:ss");
}

function showStatus( str ){
    
    ct = getLogTime();

    $("#footer1").empty(); $("#footer1").append( ct + " " + str );
    $("#footer2").empty(); $("#footer2").append( ct + " " + str );
    $("#footer5").empty(); $("#footer5").append( ct + " " + str );

}

function log( str ){
    
    ct = getLogTime();

    tmp.push( ct + " " + str );

    $("#log").empty();    

    $("#log").append("<table border=1>");

    var out = tmp.reverse();

    for( var i=0; i< out.length; i++){    
      $("#log").append( "<tr><td>" + out[i] + "</td></tr>" );
    }

    $("#log").append("</table>");

}

function updateStatus( id, title, className){

  if( className.indexOf("fa-car") >= 0 ){
  
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
      new Date( moment().add(1, 'hours') ),
      
      calOptions,
      
      function(msg) { log("Success createEventWithOptions: " + JSON.stringify(msg)); },
      function(msg) { log("Error createEventWithOptions: " + msg); }
    );
  
  }

  if( className.indexOf("fa-user-md") >= 0 ){
  
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
      new Date( moment().add(1, 'hours') ),
      
      calOptions,
      
      function(msg) { log("Success createEventWithOptions: " + JSON.stringify(msg)); },
      function(msg) { log("Error createEventWithOptions: " + msg); }
    );
  
  }

  if( className.indexOf("fa-file-text") >= 0 ){
      
      $(':mobile-pagecontainer').pagecontainer('change', '#details');
      
      $("#title").val( title );
      $("#memo").val("");

      var calOptions = window.plugins.calendar.getCalendarOptions();
      calOptions.calendarName = "Track";
      calOptions.calendarId = calOptionsIdTrack;
       
      window.plugins.calendar.findEventWithOptions(
        
        title + " (Memo)", 
        "Home",
        null,
     
        new Date.today(),
        new Date.today().addDays(1) , 
        
        calOptions,

        function (msg) {

          log("Number of Memo for " + title + " " + msg.length);
          
          if(msg.length==0){

              window.plugins.calendar.createEventWithOptions(
      
                  title + " (Memo)",
                  "Home",
                  "Some notes about this event.",
                  
                  new Date(),
                  new Date( moment().add(1, 'hours') ),
                  
                  calOptions,
                  
                  function(msg) { log("Success createEventWithOptions: " + JSON.stringify(msg)); },
                  function(msg) { log("Error createEventWithOptions: " + msg); }
                
                );

          }else{

            log('Calendar Memo success: ' + msg[0].message);
            
            $("#memo").val( msg[0].message );
         
          }
        
          

      }, 
        function(msg) { log("Error syncTrackStatus: " + msg); }
      );

  }

  if( className.indexOf("fa-pause") >= 0 ){
      
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
        new Date.today().addDays(1) ,
        
        calOptions,

        function( msg ){

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

            Date.parse( msg[0].startDate ),
            Date.parse( msg[0].endDate ),

            title + " (End Drive)",
            "Home",
            id,

              Date.parse( msg[0].startDate ),
              new Date(),

              filterOptions,
              newOptions,

            function(msg) { log("Success modifyEventWithOptions: " + JSON.stringify(msg)); },
            function(msg) { log("Error modifyEventWithOptions: " + msg); }

            );

        },

        function(msg) { alert("Error modifyEventWithOptions: " + msg); }
      );
      
      var calOptions = window.plugins.calendar.getCalendarOptions();
      calOptions.calendarName = "Track";
      calOptions.calendarId = calOptionsIdTrack;

      window.plugins.calendar.findEventWithOptions(
        
        title + " (Start Work)",
        "Home",
        id,
        
        new Date.today(),
        new Date.today().addDays(1) ,
        
        calOptions,

        function( msg ){

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

            Date.parse( msg[0].startDate ),
            Date.parse( msg[0].endDate ),

            title + " (End Work)",
            "Home",
            id,

              Date.parse( msg[0].startDate ),
              new Date(),

              filterOptions,
              newOptions,

            function(msg) { log("Success modifyEventWithOptions: " + JSON.stringify(msg)); },
            function(msg) { log("Error modifyEventWithOptions: " + msg); }

            );

        },

        function(msg) { alert("Error modifyEventWithOptions: " + msg); }
      );
      
   }

}


function addCard(id,title,startDate,endDate){
    var tmp=`
        <div class="card" id="` + id + `" title="` + title + `">
          <div class="card-header">
               <button id="wt-detail-1761377128" type="button" class="btn btn-inverse wt-button wt-info">
                <p class="wt-infotext">`+ startDate + ` - ` + endDate + `</p>
                <p class="wt-infotext">`+ title + `</p>
                <p class="wt-infotext">
                    <a href="./care-history/?pa=1393&le=Pflegeverlauf">Pflegeverlauf</a> &nbsp;
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
              <button id="wt-flatrate" data-type="textarea" type="button" class="btn btn-raised btn-worktime wt-button"><i class="icon-ecg fa-3x"></i></button>
              <button id="wt-flatrate" data-type="textarea" type="button" class="btn btn-raised btn-worktime wt-button"><i class="icon-hot fa-3x"></i></button>
              <button id="wt-flatrate" data-type="textarea" type="button" class="btn btn-raised btn-worktime wt-button"><i class="icon-pill fa-3x"></i></button>
              <button id="wt-flatrate" data-type="textarea" type="button" class="btn btn-raised btn-worktime wt-button"><i class="icon-pill fa-3x"></i></button> 
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
  }
  else {
    var radlat1 = Math.PI * lat1/180;
    var radlat2 = Math.PI * lat2/180;
    var theta = lon1-lon2;
    var radtheta = Math.PI * theta/180;
    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    if (dist > 1) {
      dist = 1;
    }
    dist = Math.acos(dist);
    dist = dist * 180/Math.PI;
    dist = dist * 60 * 1.1515;
    if (unit=="K") { dist = dist * 1.609344 }
    if (unit=="N") { dist = dist * 0.8684 }
    return dist;
  }
}

