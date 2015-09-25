PlaceList = new Mongo.Collection("places")
LocationList = new Mongo.Collection("locations")
if(Meteor.isClient) {
  console.log("foodcoach.js is linked for client");
  Template.placelist.helpers({
    'place' : function() {
      //if location was not filtered show all
      if ((Session.get('selectedLocation')==undefined)||(Session.get('locationName')=="All Manhattan")) { 
      return PlaceList.find({}, {sort: {location: 1, name: 1}}).fetch();
      // else show that particular location
      } else {
        var location = Session.get('locationName');
        return PlaceList.find({location: location}, {sort: {name: 1}});
      } 
    }
  });
  Template.locationlist.helpers({
    'location' : function() {
      return LocationList.find().fetch();
    }
  })
  Template.newplace.events({
    'click #place-register-button' : function() {
      //store selectedLocation in session
      var newName = $('#newplace-name').val();
      var newLocation = $('#newplace-Location').val();
      var newAddress = $('#newplace-address').val();
      var newHour = $('#newplace-hour').val();
      var newDeal = $('#newplace-deal').val();
      var newDealHour = $('#newplace-dealhour').val();
      // Session.set('name', 'hello from newplace button');
      // var selectedLocation = Session.get('selectedLocation');
      PlaceList.insert({name: newName, location: newLocation, address: newAddress, hour: newHour, deal: newDeal, dealhour: newDealHour})
      return console.log("added"); 
    }
  });
  Template.locationlist.events({
    'click .location-button': function() {
      var locationid = this._id; 
      Session.set('selectedLocation', locationid);
      //finding selected location name 
      var locationName = LocationList.findOne(locationid).name;
      Session.set('locationName', locationName)
      return console.log(locationName);
    }
  })
}

if(Meteor.isServer) {
  console.log("foodcoach.js is linked for server");
  //seed file for restaurant list and location map list 
  PlaceList.remove({})
  PlaceList.insert({name: "Gyu-Kaku", location: "Midtown West", address: "34 Cooper Sq, New York, NY 10003", deal: "50% on some items", dealhour: "Monday all day", hour: "11:30AM to 11:00PM"})
  PlaceList.insert({name: "Sakagura", location: "Midtown East", address: "211 E 43rd St, New York, NY 10017", deal: "no deal", dealhour: "N/A", hour: "11:30AM to 1:00AM"})
  PlaceList.insert({name: "Udon-West", location: "Midtown East", address: "150 E 46th St, New York, NY 10017", deal: "pitcher 10$", dealhour: "5 to 7PM", hour: "12:00PM to 2:30PM, 5:00PM to 4:00AM"})
 PlaceList.insert({name: "Morimoto", location: "West Village", address: "88 10th Ave, New York, NY 10011", deal: "no deal", dealhour: "N/A", hour: "12:00PM to 2:30PM, 5:30PM to 11:00PM"})
 PlaceList.insert({name: "Sake Bar Hagi", location: "Midtown West", address: "152 W 49th St, New York, NY 10019", deal: "no deal", dealhour: "N/A", hour: "5:00PM to 2:00AM"})
 PlaceList.insert({name: "Go-Go Curry", location: "Midtown West", address: "273 W 38th St, New York, NY 10018", deal: "mvp menus", dealhour: "N/A", hour: "10:55AM to 9:55PM"})
 PlaceList.insert({name: "Haru", location: "Downtown", address: "1 Wall St, New York, NY 10005", deal: "no deal", dealhour: "N/A", hour: "11:30AM to 10:30PM"})
 PlaceList.insert({name: "Sun Chan", location: "Upper West Side", address: "2707 Broadway, New York, NY 10025", deal: "no deal", dealhour: "N/A", hour: "5:30PM to 3:00AM"})
 PlaceList.insert({name: "Otafuku", location: "East Village", address: "220 E 9th St, New York, NY 10003", deal: "no deal", dealhour: "N/A", hour: "12:00 to 11:00PM"})
 PlaceList.insert({name: "Sushi of Gari", location: "Upper East Side", address: "402 E 78th St, New York, NY 10075", deal: "no deal", dealhour: "N/A", hour: "5:00 to 11:15PM"})
  LocationList.remove({})
  LocationList.insert({name: "Upper West Side"})
  LocationList.insert({name: "Upper East Side"})
  LocationList.insert({name: "Midtown West"})
  LocationList.insert({name: "Midtown East"})
  LocationList.insert({name: "West Village"})
  LocationList.insert({name: "East Village"})
  LocationList.insert({name: "Downtown"})
  LocationList.insert({name: "All Manhattan"})
}


