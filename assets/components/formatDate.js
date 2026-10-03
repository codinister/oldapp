export const formatDate = function(dateObject) {
    var d = new Date(dateObject);
    var day = d.getDate();
    var months = d.getMonth() + 1;
    var month;

    switch(months){
        case 1:
        month = 'Jan';
        break;
        case 2:
        month = 'Feb';
        break;
        case 3:
        month = 'Mar';
        break;
        case 4:
        month = 'Apr';
        break;
        case  5:
        month = 'May';
        break;
        case 6:
        month = 'Jun';
        break;
        case 7:
        month = 'Jul';
        break;
        case 8:
        month = 'Aug';
        break;
        case 9:
        month = 'Sep';
        break;
        case 10:
        month = 'Oct';
        break;
        case 11:
        month = 'Nov';
        break;
        case 12:
        month = 'Dec';
        break;
    }
    var year = d.getFullYear();
    if (day < 10) {
        day = "0" + day;
    }
    if (month < 10) {
        month = "0" + month;
    }
    var date = day + " " + month + " " + year;
    return date;
};