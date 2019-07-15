var tmp = [];

log('loading of app.js');

function log( str ){
    
    tmp.push( str );

}

function updateStatus( id, title, className){

  if( className.indexOf("fa-car") >= 0 ){
  
      $("#" + id + " > div > div > button[id=wt-work]").prop("disabled", true);
      
      $("#" + id + " > div > div > button[id=wt-drive]").prop("disabled", true);
      $("#" + id + " > div > div > button[id=wt-drive] > i").removeClass();
      $("#" + id + " > div > div > button[id=wt-drive] > i").addClass("fa fa-3x fa-refresh fa-spin");
  
  }

  if( className.indexOf("fa-user-md") >= 0 ){
  
      $("#" + id + " > div > div > button[id=wt-drive]").prop("disabled", true);
      
      $("#" + id + " > div > div > button[id=wt-work]").prop("disabled", true);
      $("#" + id + " > div > div > button[id=wt-work] > i").removeClass();
      $("#" + id + " > div > div > button[id=wt-work] > i").addClass("fa fa-3x fa-refresh fa-spin");
  
  }

   if( className.indexOf("fa-pause") >= 0 ){
      
      $("#" + id + " > div > div > button[id=wt-drive]").prop("disabled", false);
      $("#" + id + " > div > div > button[id=wt-drive] > i").removeClass();
      $("#" + id + " > div > div > button[id=wt-drive] > i").addClass("fa fa-car fa-3x");
      
      $("#" + id + " > div > div > button[id=wt-work]").prop("disabled", false);
      $("#" + id + " > div > div > button[id=wt-work] > i").removeClass();
      $("#" + id + " > div > div > button[id=wt-work] > i").addClass("fa fa-user-md fa-3x");
      
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
              <button id="wt-note"     data-type="textarea" type="button" class="btn btn-raised btn-worktime wt-button"><a href="#details"><i class="fa fa-file-text-o fa-3x"></i></a></button>
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
          console.log( e.currentTarget.id + " " + e.currentTarget.title + " " + e.target.className );
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
