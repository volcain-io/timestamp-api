const express = require('express')
const app = express()
const path = require('path')
var port = process.env.PORT || 8080

function parseDate(date) {
    var result = false;
    var regex = /^(-|\d)(\d+)$/g

    if ( regex.exec(date) !== null ) {
        result = new Date(Number(date * 1000))
    } else {
        var dateSplit = date.split(' ')
        var month = getMonth( dateSplit[0] )
        result = new Date( date.replace(dateSplit[0], month) )
        
    }

    return result;
}

function getMonth(fullMonthName) {
    var result = false;

    if ( fullMonthName )
    {
        switch( fullMonthName ) {
            case 'January':
                result = 'Jan'
                break
            case 'February':
                result = 'Feb'
                break
            case 'March':
                result = 'Feb'
                break
            case 'April':
                result = 'Apr'
                break
            case 'June':
                result = 'Jun'
                break
            case 'July':
                result = 'Jul'
                break
            case 'August':
                result = 'Aug'
                break
            case 'September':
                result = 'Sep'
                break
            case 'October':
                result = 'Oct'
                break
            case 'November':
                result = 'Nov'
                break
            case 'December':
                result = 'Dec'
                break
        }
    }

    return result
}

app.get('/', function(req, res) {
    res.sendFile( path.join(__dirname + '/views/howto.html') )
})

app.get('/:date', function(req, res) {
    if ( req.url === '/favicon.ico') {
        res.writeHead(200, {'Content-Type': 'image/x-icon'} );
        res.end();
        return;
    }

    var result = {
        unix: null,
        natural: null
    }

    var newDate = parseDate(req.params.date)
    var jsDateRangeInMillisecondsMin = -100000000 * 24 * 60 * 60 * 1000
    var jsDateRangeInMillisecondsMax = jsDateRangeInMillisecondsMin * (-1)
    // is valid date given
    if ( newDate && newDate.getTime() >= jsDateRangeInMillisecondsMin && newDate.getTime() <= jsDateRangeInMillisecondsMax ) {
        result.unix = newDate.getTime() / 1000
        result.natural = newDate.toLocaleString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' } )
    }

    res.setHeader('Content-Type', 'application/json');
    res.send( JSON.stringify(result) )
})

app.listen(port)