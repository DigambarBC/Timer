$(document).ready(function () {

    let audio = new Audio('asset/audio/timeup.mp3');
   
    // --------------------------------- Timer Set Code --------------------------------------- \\ 

    // Set Hours When Mouse Scroll

    let i = 1;
    $("#Hours").bind('mousewheel DOMMouseScroll', function (event) {
        if (event.originalEvent.wheelDelta > 0 || event.originalEvent.detail < 0) {
            
            // scroll up
            
            // increment hour
            i++;

            // if i is greater than 99 means 100 or more then set i to 0
            if (i > 99) {
                i = 0
            }

            // i contains value of hours : here we add zero before single digit value
            $(this).val(('0' + i).slice(-2));
        }
        else {

            // scroll down 

            // Decrement hour
            i--;

            // i contains value of hours: here if i less than 0 then set i to 99
            if (i < 0) {
                i = 99;
            }

            // i contains value of hours : here we add zero before single digit value
            $(this).val(('0' + i).slice(-2));

        }
    });


    // Set Minutes When Mouse Scroll
    $("#Minutes").bind('mousewheel DOMMouseScroll', function (event) {
        if (event.originalEvent.wheelDelta > 0 || event.originalEvent.detail < 0) {
            // scroll up

            i++;
            if (i > 59) {
                i = 0
            }
            $(this).val(('0' + i).slice(-2));
        }
        else {

             // scroll down 

            i--;
            if (i < 0) {
                i = 59;
            }
            $(this).val(('0' + i).slice(-2));

        }
    });

    // Set Seconds When Mouse Scroll
    $("#Seconds").bind('mousewheel DOMMouseScroll', function (event) {
        if (event.originalEvent.wheelDelta > 0 || event.originalEvent.detail < 0) {
            
            // scroll up

            i++;
            if (i > 59) {
                i = 0;
            }
            $(this).val(('0' + i).slice(-2));
        }
        else {

             // scroll down 

            i--;
            if (i < 0) {
                i = 59;
            }
            $(this).val(('0' + i).slice(-2));

        }
    });


    // Event Which Avoid More than 2 digits to set time
    $("#Hours, #Minutes, #Seconds").keypress(function (e) {
        if (this.value.length >= 2) {
            return false;
        }
    });


    // Start Button Event When Start Button Click
    $("#StartTimer").click(function () {

        // Here We Remove animation classes to stop animation glich
        $('#Loader').removeClass('animated fadeIn fadeOut')
        $('#Timer').removeClass('animated fadeOut fadeIn')

        // Getting all values to variable
        let h = $("#Hours").val();
        let m = $("#Minutes").val();
        let s = $("#Seconds").val();


        /* validating:

            1]. We Don't want hour minute and seconds 0;
            2]. We don't want empty values of h, m, s
            3}. If above condition are true then else block execute
        */ 
        if (h == 0 && m == 0 && s == 0) {

            return false;
        }
        else if(h=="" || m=="" || s==""){   

            return false;

        }
        else {

            // Adding Animation when switching from timer to countdown
            $('#Timer').addClass('animated fadeOut');

            // Adding 1 sec delay to complete animation
            setTimeout(function () {
                
                // Hiding Timer and display coundown  
                $("#Timer").attr("hidden", true);
                $("#Loader").attr("hidden", false)

                // showing coundown with animation
                $('#Loader').addClass('animated fadeIn')

                // Starting Timer
                StartTimer(h, m, s)

            }, 1000)


        }


    });


   

// ----------------------------------------------------- Timer Set Code End ---------------------------------------



// ---------------------------------------------------- Timer Countdown Code --------------------------------------


    // Timer Function which contains countdown Logic
    function StartTimer(h, m, s) {

        // fetching values and converting them into integer
        let hours = parseInt(h);
        let minutes = parseInt(m);
        let seconds = parseInt(s);

        // This State we use on play pause event: Default value is play
        let state = "play";


        // Converting all hours and minutes value to seconds
        let hoursToSec = hours * 60 * 60;
        let minutesToSec = minutes * 60;

        // Here we sum all converted seconds 
        let totalSeconds = hoursToSec + minutesToSec + seconds;

        // We set current seconds = total seconds
        let currentSeconds = totalSeconds;

        // console.log(hoursToSec+" "+minutesToSec+" "+seconds+ " " +totalSeconds)

        // console.log(totalSeconds);

        // My Timer Function is a main logic of coundown timer
        function myTimer() {

            // Here We find percentage to set coundown circle value
            let FinalPercent = (currentSeconds / totalSeconds) * 100;

            // the timer variable contains value of reversing time inside circle
            timer = ('0' + hours).slice(-2) + " : " + ('0' + minutes).slice(-2) + " : " + ('0' + seconds).slice(-2);
            
            //Here we Set Text of timer : Note it contenously updating at every second 
            $(".timer").text(timer);

            // Here we set value of percentage inside countdown circle
            bar.set(FinalPercent.toFixed(2), false);


            // console.log(hours + " " + minutes + " " + seconds)
            
            // It Checks the timer is in play mode or pause mode
            if (state == "play") {

                // if hours are >= 1 then decrement value of hours to 1 and set minutes to 60 
                if (hours >= 1 && minutes == 0 && seconds == 0) {
                    hours--;
                    minutes = 60;
                }

                // if here minutes are >=1 then decrement minute by 1 and set seconds to 60
                if (minutes >= 1 && seconds == 0) {
                    minutes--;
                    seconds = 60;
                }

                // here if seconds are greater than 0 then decrement seconds by 1 && decrement current seconds to find percentage above
                if (seconds > 0) {
                    seconds--;
                    currentSeconds--;
                }

                // After coundown completed means h, m and s are zero then increment complete flag by one
                if (seconds == 0 && minutes == 0 && hours == 0) {
                    // console.log("Complete")
                    complete++;
                }

                // Here we just change color of timer to show only 10 seconds remeaning: works like alert
                if (currentSeconds < 10) {
                    $(".ldBar path.mainline").css("stroke", "#ff3648");
                }

                // if complete == 2 means stop coundown after 2 seconds even if all the values are zero: purpose is to prevent unexpected stop
                if (complete == 2) {

                    // This is used to stop setInterval event witch occurs on every 1 second
                    clearInterval(timerStarter)

                    // Play Alert sound after completion countdown in loop 
                    audio.play();
                    audio.loop = true;

                    // changing warning color of circle to default
                    $(".ldBar path.mainline").css("stroke", "#6200EE");

                    // Removing animation classes to prevent glich
                    $('#Loader').removeClass('animated fadeIn fadeIn')
                    $('#Timer').removeClass('animated fadeOut fadeIn')

                    // Showing Time up Modal
                    $('#modalAlert').modal('show')

                }
            }

        }


        $("#Action").click(function () {

            if (state == "play") {

                $(this).text("Play");
                $(this).removeClass("btn-danger");
                $(this).addClass("playBtn");
                state = "pause"
            }
            else {

                $(this).text("Pause");
                $(this).removeClass("playBtn");
                $(this).addClass("btn-danger");
                state = "play"
            }

        });

        index = 1;
        let timerStarter = setInterval(myTimer, 1000);

        var bar = new ldBar(".ldBar");
        let complete = 0;

        

        // Cancle button to stop 
        $("#cancle").click(function () {

            clearInterval(timerStarter)
            $('#Loader').removeClass('animated fadeIn fadeOut')
            $('#Timer').removeClass('animated fadeOut fadeIn')

            setTimeout(function () {
                $("#Loader").attr("hidden", true)
                $('#Timer').addClass('animated fadeIn');
                $("#Timer").attr("hidden", false);


            }, 1000)

        });

    }

    
    // Restart button on TimeUp Modal
    $("#Restart").click(function () {

        // when click on restart button timer countdown again start
        let h = $("#Hours").val();
        let m = $("#Minutes").val();
        let s = $("#Seconds").val();
        
        //hiding modal 
        $('#modalAlert').modal('hide')

        // pause alert sound
        audio.pause()

        // again calling starttimer function
        StartTimer(h, m, s)

    });


    // Dismiss Button on TimeUp Modal
    $("#DismissBtn").click(function () {
        // If click on dismiss button then modal hide
        $('#modalAlert').modal('hide')

        // Alert sound pause
        audio.pause()

        // swithcing to timer animation
        $('#Loader').addClass('animated fadeOut')

        // Delay execution by 1 sec to prevent animation glich
        setTimeout(function () {

            // Hinding coundown section means circular loader
            $("#Loader").attr("hidden", true)

            // Adding Animation to switch from coundown to set timer window
            $('#Timer').addClass('animated fadeIn');

            // display timer screen
            $("#Timer").attr("hidden", false);


        }, 1000)


    });



});









