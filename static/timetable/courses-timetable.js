var timetable = new Timetable();
timetable.setScope(11,22);


timetable.addLocations(['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье']);


timetable.addEvent(
    'Python', 'Понедельник',
    new Date(2019,9,30,20),
    new Date(2019,9,30,21,30),
    { class: 'python',
        // onClick: function(event) {window.alert('Занятие ' + event.name + ' в ' + event.location + ' начнется в ' + event.startDate);},
        url: '#'});
timetable.addEvent(
    'Python', 'Четверг',
    new Date(2019,10,3,20),
    new Date(2019,10,3,21,30),
    { class: 'python', url: '#'});
timetable.addEvent(
    'Go', 'Вторник',
    new Date(2019,10,1,20),
    new Date(2019,10,1,21),
    { class: 'go', url: '#'});
timetable.addEvent(
    'Go', 'Пятница',
    new Date(2019,10,4,20),
    new Date(2019,10,4,21),
    { class: 'go', url: '#'});
timetable.addEvent(
    'JavaScript', 'Среда',
    new Date(2019,10,1,19,30),
    new Date(2019,10,1,21),
    { class: 'javascript', url: '#'});
timetable.addEvent(
    'JavaScript', 'Суббота',
    new Date(2019,10,2,19,30),
    new Date(2019,10,2,21),
    { class: 'javascript', url: '#'});


var renderer = new Timetable.Renderer(timetable);
      renderer.draw('.timetable');