$(function () {
    var e4js = require('events4js');

    Some_Event_Producer = function () {
        this.initialize();
    }
    var p = Some_Event_Producer.prototype = new e4js.EventProducer();
    p.initialize_event = p.initialize;

    p.initialize = function () {
        this.initialize_event();
    }

    var s = new Some_Event_Producer();


    s.addEventListener('myevent', function (e) {
        console.log(e);
    });


    var f = function () {
        console.log('I am here');
    };
    var fo = function () {
        console.log('show on time only');
    };
    var fno = function () {
        console.log('never show');
    };

    s.addEventListener('myevent', f);
    s.addOnceListener('myevent', fo);

    s.fireEvent('myevent', {
        p: 'eer'
    });

    s.fireEvent('myevent');
    s.addOnceListener('myevent', fno);
    s.removeOnceListener('myevent', fno);

    s.removeEventListener('myevent', f);

    s.fireEvent('myevent', {
        say: 'f n\'est plus là'
    });

    s.addEventListener('myevent', f);

    s.fireEvent('myevent', {
        say: 'f est là'
    });

    s.removeAllEventListeners('myevent');

    s.fireEvent('myevent', {
        say: 'plus personne ne m\'entend'
    });

    s.removeAllEventsListeners('myevent');



    Some_Event_Producer_withConfig = function () {
        this.initialize();
    }
    var pp = Some_Event_Producer_withConfig.prototype = new e4js.EventProducer();
    pp.initialize_event = pp.initialize;

    pp.initialize = function () {
        this.initialize_event({
            autoLaunch: {
                'end': ['success', 'error', 'retry'],
                'a': ['z', 'x', 'y']
            },
            waitFor: {
                'one': ['two', 'tree'],
                'l': ['m', 'n']
            }
        });
    }

    var swc = new Some_Event_Producer_withConfig();
    swc.addAllEventsListener(function (en, e) {
        console.log('event name : ' + en);
        if (e) {
            console.log(e);
        }
    });

    swc.fireEvent('success');
    swc.fireEvent('y');

    swc.fireEvent('m');
    swc.fireEvent('two');
    swc.fireEvent('n');
    console.log(swc);
});
