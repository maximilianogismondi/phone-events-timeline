google.charts.load('current', {'packages':['timeline']});
function drawChart(data) {
  var container = document.getElementById('timeline');
  var chart = new google.visualization.Timeline(container);
  var dataTable = new google.visualization.DataTable();

  dataTable.addColumn({ type: 'string', id: 'Term' });
  dataTable.addColumn({ type: 'string', id: 'Name' });
  //dataTable.addColumn({ type: 'string', id: 'style', role: 'style' });
  dataTable.addColumn({ type: 'date', id: 'Start' });
  dataTable.addColumn({ type: 'date', id: 'End' });

  dataTable.addRows(data);
  chart.draw(dataTable);

  //dataTable.addRows([
  //  ['1', 'Washington', '#cbb69d', new Date(2020, 3, 30, 14, 14, 09), new Date(2020, 3, 30, 14, 17, 09) ],
  //  ['2', 'Adams', '#603913',      new Date(2020, 3, 30, 14, 16, 39),  new Date(2020, 3, 30, 14, 48, 22) ],
  //  ['3', 'Jefferson', '#cbb69d',  new Date(2020, 3, 30, 14, 45, 09),  new Date(2020, 3, 30, 15, 04, 09) ]]);

}

// const result = [
//   [ 'waiting', ':call.new', new Date(1789, 3, 30), new Date(1797, 2, 4) ],
//   [ 'waiting', ':caller.cpf-provided', new Date(1797, 2, 4), new Date(1801, 2, 4) ],
//   [ 'waiting', ':call.waiting', new Date(1801, 2, 4), new Date(1809, 2, 4) ],
//   [ 'gabriel.cruz240919.indra@nubank.com.br', ':actor.entered', new Date(1801, 2, 4), new Date(1809, 2, 4) ],
//   [ 'gabriel.cruz240919.indra@nubank.com.br', ':actor.left', new Date(1801, 2, 4), new Date(1809, 2, 4) ],
//   [ 'Vice President', 'John Adams', new Date(1789, 3, 21), new Date(1797, 2, 4)],
//   [ 'Vice President', 'Thomas Jefferson', new Date(1797, 2, 4), new Date(1801, 2, 4)],
//   [ 'Vice President', 'Aaron Burr', new Date(1801, 2, 4), new Date(1805, 2, 4)],
//   [ 'Vice President', 'George Clinton', new Date(1805, 2, 4), new Date(1812, 3, 20)],
//   [ 'Secretary of State', 'John Jay', new Date(1789, 8, 25), new Date(1790, 2, 22)],
//   [ 'Secretary of State', 'Thomas Jefferson', new Date(1790, 2, 22), new Date(1793, 11, 31)],
//   [ 'Secretary of State', 'Edmund Randolph', new Date(1794, 0, 2), new Date(1795, 7, 20)],
//   [ 'Secretary of State', 'Timothy Pickering', new Date(1795, 7, 20), new Date(1800, 4, 12)],
//   [ 'Secretary of State', 'Charles Lee', new Date(1800, 4, 13), new Date(1800, 5, 5)],
//   [ 'Secretary of State', 'John Marshall', new Date(1800, 5, 13), new Date(1801, 2, 4)],
//   [ 'Secretary of State', 'Levi Lincoln', new Date(1801, 2, 5), new Date(1801, 4, 1)],
//   [ 'Secretary of State', 'James Madison', new Date(1801, 4, 2), new Date(1809, 2, 3)]
// ]

// const result = [
//   [ 'waiting', [':call.new', new Date(1789, 3, 30), new Date(1797, 2, 4)],
//                [':caller.cpf-provided', new Date(1797, 2, 4), new Date(1801, 2, 4) ],
//                [':call.waiting', new Date(1801, 2, 4), new Date(1809, 2, 4) ],
//   [ 'gabriel.cruz240919.indra@nubank.com.br', ':actor.entered', new Date(1801, 2, 4), new Date(1809, 2, 4) ],
//   [ 'gabriel.cruz240919.indra@nubank.com.br', ':actor.left', new Date(1801, 2, 4), new Date(1809, 2, 4) ],
//   [ 'Vice President', 'John Adams', new Date(1789, 3, 21), new Date(1797, 2, 4)],
//   [ 'Vice President', 'Thomas Jefferson', new Date(1797, 2, 4), new Date(1801, 2, 4)],
//   [ 'Vice President', 'Aaron Burr', new Date(1801, 2, 4), new Date(1805, 2, 4)],
//   [ 'Vice President', 'George Clinton', new Date(1805, 2, 4), new Date(1812, 3, 20)],
//   [ 'Secretary of State', 'John Jay', new Date(1789, 8, 25), new Date(1790, 2, 22)],
//   [ 'Secretary of State', 'Thomas Jefferson', new Date(1790, 2, 22), new Date(1793, 11, 31)],
//   [ 'Secretary of State', 'Edmund Randolph', new Date(1794, 0, 2), new Date(1795, 7, 20)],
//   [ 'Secretary of State', 'Timothy Pickering', new Date(1795, 7, 20), new Date(1800, 4, 12)],
//   [ 'Secretary of State', 'Charles Lee', new Date(1800, 4, 13), new Date(1800, 5, 5)],
//   [ 'Secretary of State', 'John Marshall', new Date(1800, 5, 13), new Date(1801, 2, 4)],
//   [ 'Secretary of State', 'Levi Lincoln', new Date(1801, 2, 5), new Date(1801, 4, 1)],
//   [ 'Secretary of State', 'James Madison', new Date(1801, 4, 2), new Date(1809, 2, 3)]
// ]

const parseEvents = function(text) {
  return text.split("\n").filter(x => x).map(JSON.parse).filter(e => e.result).map(e => e.result);
}

const createEmptyActor = function(actorName, provider) {
  return {
    actor: actorName, 
    provider: provider, 
    events: []
  }
} 

const getFirstElementOrCreateIt = function(acum, curr) {
  return (aum[0] ? aum[0] : createEmptyActor(curr));
}

const groupEventsByActor = function(events) {
  return events
  .filter(e =>  e.teravoz_event_type !== ":call.ongoing" && 
                e.teravoz_event_type !== "\"peer.ringing\"" && 
                e.teravoz_event_type !== ":call.recording-available" &&
                e.twilio_event_type !== ":task.updated" &&
                e.twilio_event_type !== ":reservation.wrapup" &&
                e.twilio_event_type !== ":task.wrapup" &&
                e.twilio_event_type !== ":task.completed")
  .reduce(function (acum, curr) {
    if (curr.actor) {
      let actorEvents = acum.find(e => e.actor === curr.actor);
      if (! actorEvents) {
        const provider = (curr.twilio_event_type ? "twilio" : "teravoz")
        actorEvents = createEmptyActor(curr.actor, provider);
        acum.push(actorEvents);
      }
      actorEvents.events.push(curr);
    }

    if (curr.twilio_event_type && (!curr.actor || curr.twilio_event_type === ":reservation.created")) {
      let waitingEvents = acum.find(e => e.actor === 'waiting-tw');
      waitingEvents.events.push(curr);
    } else if (curr.teravoz_event_type && (!curr.actor || curr.teravoz_event_type === ":actor.entered")) {
      let waitingEvents = acum.find(e => e.actor === 'waiting-tv');
      waitingEvents.events.push(curr);
    }

    return acum;
  }, [ createEmptyActor('waiting-tv'), createEmptyActor('waiting-tw') ]);
}

const createRow = function(actor, eventType, provider, start, end) {
  return {
    actor, 
    eventType, 
    provider,
    start,
    end
  }
}

const generateWaitingTvRow = function(waitingEvents) {
  return waitingEvents.events.map((e, i) => {
    if (! e.actor) {
      let nextEvent;
      if (waitingEvents.events.length > (i+1)) {
        nextEvent = waitingEvents.events[i+1];
      } else {
        nextEvent = e;
      }
      const eventType = e.twilio_event_type || e.teravoz_event_type
      return createRow('Waiting TV', eventType, 'teravoz', e.time, nextEvent.time);
    }
  }).filter(x => x); //Filter nulls!
}

const generateWaitingTwRow = function(waitingEvents) {
  return waitingEvents.events
  .map((e, i) => {
    if (! e.actor) {
      let nextEvent;
      if (waitingEvents.events.length > (i+1)) {
        nextEvent = waitingEvents.events[i+1];
      } else {
        nextEvent = e;
      }
      const eventType = e.twilio_event_type + nextEvent.twilio_event_type;
      return createRow('Waiting TW', eventType, 'twilio', e.time, nextEvent.time);
    }
  })
}

const generateActorRows = function(actorEvents) {
  console.log(actorEvents);
  return actorEvents.events.map((e, i) => {
    if (actorEvents.events.length > (i+1)) {
      let nextEvent = actorEvents.events[i+1];
      let eventType
      if (actorEvents.provider === "twilio") {
        eventType = e.twilio_event_type + nextEvent.twilio_event_type;
      } else {
        eventType = e.teravoz_event_type + nextEvent.teravoz_event_type;
      } 
      return createRow(e.actor, eventType, actorEvents.provider, e.time, nextEvent.time);
    }
  });
}

const eventsByActorToRows = function(eventsFromActor) {
  console.log(eventsFromActor);
  let row;
  if (eventsFromActor.actor === 'waiting-tv') {
    row = generateWaitingTvRow(eventsFromActor);
  } else if (eventsFromActor.actor === 'waiting-tw') {
    row = generateWaitingTwRow(eventsFromActor);
  } else {
    console.log(eventsFromActor);
    row = generateActorRows(eventsFromActor);
  }
  return row;
}

const convertDataToRows = function(events) {
  console.log("convertDataToRows");
  const eventsByActor = groupEventsByActor(events)
  console.log("eventsByActorToRows");
  const rows = eventsByActor.flatMap(eventsByActorToRows).filter(x => x); //Filter nulls!;
  
  return rows.map(r => {
    console.log(r);
    console.log("row");
    return [r.actor, r.eventType, moment(r.start).toDate(), moment(r.end).toDate()]
  })
}

const addFileEventListener = function(e) {
  let input = document.getElementById('fileForUpload');
  input.addEventListener('change', function() {

    if (this.files && this.files[0]) {

        var myFile = this.files[0];
        var reader = new FileReader();
        
        reader.addEventListener('load', function (e) {
            const csvText = e.target.result;
            const eventsArray = parseEvents(csvText).sort((e1, e2) => moment(e1.time) - moment(e2.time));
            const rows = convertDataToRows(eventsArray);
            console.log(rows[0]);
            drawChart(rows);
        });
        
        reader.readAsBinaryString(myFile);
    }
  });
}
addFileEventListener();