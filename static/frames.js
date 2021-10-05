/*  ---    College page    ---  */
/*  ---  Made by plutonny  ---  */

/* Preparing to work */
var theme_button = document.getElementById('theme_button');
if (theme_button) { theme_button.addEventListener('click', theme); };
currentdate = new Date();
dt = new Date();

/* 
    Main function, create a page 
    current - type of page returned now
    for example: 'general' returned main page
*/
async function page(current) {
         if (current == 'general')   { header('главная', true); home(); output(true, 'VERSION.html') }
    else if (current == 'timetable') { error(604) }
    else if (current == 'other')     { error(604) } 
    else                             { error(604, 'ERROR: cant find file in page function'); };
    await sleep(50);
    theme(1);
}

/*
    PageSet function
    settings - setting function:
    "rel" - reload page
    "tablepos" - redirect to table group
    "include" - include HTML
    "week" - returned week ('желтая' or 'зеленая')
*/
function pageSet(settings) {
         if (settings == 'tablepos') { parent.open("https://docs.google.com/spreadsheets/d/12NHcO3C-BL2vZ5B64_2nW4RoH-zKdDL4Ixj2MkmWiag/edit") }
    else if (settings == 'rel')      { console.log('RELOADING PAGE!'); window.location.reload(); }
    else if (settings == 'week')     { var oneJan = new Date(currentdate.getFullYear(),0,1); var numberOfDays = Math.floor((currentdate - oneJan) / (24 * 60 * 60 * 1000)); var result = Math.ceil(( currentdate.getDay() + 1 + numberOfDays) / 7); if (result % 2 == 1) {return 'желтая'} else {return 'зеленая'} }
    else if (settings == 'include')  { try { var z, i, elmnt, file, xhttp;z = document.getElementsByTagName("*");for (i = 0; i < z.length; i++) {elmnt = z[i];file = elmnt.getAttribute("include-html");if (file) {xhttp = new XMLHttpRequest();xhttp.onreadystatechange = function() {if (this.readyState == 4) {if (this.status == 200) {elmnt.innerHTML = this.responseText;};if (this.status == 404) {error(602, 'ERROR: innerHTML function cant find file');};elmnt.removeAttribute("include-html");pageSet('include');};};xhttp.open("GET", file, true);xhttp.send();return } } } catch (e) { error(602, e) } }
    else                             { output(false, 'ERROR: pageSet function not found instruction to "' + settings + '"') }
}

/* 
    Function output files or text on page
    include True - file, False - text
    data - file or text
*/
function output(include, data) {
    if (include) { try {
        document.write('<div include-html="' + data + '"></div>'); pageSet('include'); 
    } catch (e) {
        error(603, 'ERROR: cant find current file')
    } }
    else if (!include) { document.write(data); }
    else { error(603, 'WARN: uncaught error output function') }
}

/* 
    ERRORS:
    602 - innerHTML
    601 - theme
    604 - page
    603 - output
    see console for additional information
*/
async function error(errorcode, text) {
    var s = 'static/errors/' + errorcode + '.html';
    output(false, text);
    output(true, s);
    if (errorcode != 601) { await sleep(50); theme(1) }
}

/* 
    Theme function 
    (change = 0, update = 1) 
*/
async function theme(type) {
    try {
    var folder0 = localStorage.getItem('theme');
    var folder1;

    if (localStorage.getItem('theme').includes('light')) { 
        folder1 = 'dark'
    } else if (localStorage.getItem('theme').includes('dark')) { 
        folder1 = 'light'
    } else {
        console.log('Warn: theme are undefined! Setting theme to light...');
        localStorage.setItem('theme','light');

    }

    var dark = ':root {\
        --main-text-color: #f5f5f5;\
        --active-text-color: #bbbbbb;\
        --main-bg-color: #151515;\
        --button-bg-color: #202020;\
        --button-bg-color-active: #252525;\
        --header-bg-color: #202020;\
        --scrollbar-track: #151515;\
        --scrollbar-thumb: #353535;\
        --scrollbar-thumb-hover: #252525;\
    }';var light = ':root {\
        --main-text-color: #101828;\
        --active-text-color: #252525;\
        --main-bg-color: #f0f0f0;\
        --button-bg-color: #f5f5f5;\
        --button-bg-color-active: #dddddd;\
        --header-bg-color: #f5f5f5;\
        --scrollbar-track: #f0f0f0;\
        --scrollbar-thumb: #dddddd;\
        --scrollbar-thumb-hover: #bbbbbb;\
    }';

    if (type === 0) {
        try { document.getElementById('mobile_theme_button').src = `static/images/${folder0}/theme.svg`; } catch { console.log('Warning: theme button is not enabled!'); };
        try { 
            document.getElementById('timetable_support').src = `static/images/${folder0}/timetable.svg`;
            document.getElementById('gtable_support').src = `static/images/${folder0}/gtable.svg`;
            document.getElementById('other_support').src = `static/images/${folder0}/other.svg`;
        } catch { console.log('Warning: icon support button is not enabled!'); };
        
        if (localStorage.getItem('theme').includes('light')) { 
            document.getElementById('theme_css').innerHTML = dark; 
            localStorage.setItem('theme','dark');
        } else if (localStorage.getItem('theme').includes('dark')) { 
            document.getElementById('theme_css').innerHTML = light; 
            localStorage.setItem('theme','light'); }; 
    }; if (type === 1) {
        try { document.getElementById('mobile_theme_button').src = `static/images/${folder1}/theme.svg`; } catch { console.log('Warning: theme button is not enabled!'); };
        try { 
            document.getElementById('timetable_support').src = `static/images/${folder1}/timetable.svg`;
            document.getElementById('gtable_support').src = `static/images/${folder1}/gtable.svg`;
            document.getElementById('other_support').src = `static/images/${folder1}/other.svg`;
        } catch { console.log('Warning: icon support button is not enabled!'); };

        if (localStorage.getItem('theme').includes('light')) { 
            document.getElementById('theme_css').innerHTML = light;
        } else if (localStorage.getItem('theme').includes('dark')) { 
            document.getElementById('theme_css').innerHTML = dark; }
    } 
    } catch (e) {
        console.log('ERROR: theme function (' + e + '), trying to set light theme and reload');
        await sleep(15);
        try {
            localStorage.setItem('theme','light');
            try { document.getElementById('mobile_theme_button').src = `static/images/${folder1}/theme.svg`; } catch { console.log('Warning: theme button is not enabled!'); };
            try { 
                document.getElementById('timetable_support').src = `static/images/${folder1}/timetable.svg`;
                document.getElementById('gtable_support').src = `static/images/${folder1}/gtable.svg`;
                document.getElementById('other_support').src = `static/images/${folder1}/other.svg`;
            } catch { console.log('Warning: icon support button is not enabled!'); };
            document.getElementById('theme_css').innerHTML = light;
        } catch (e) {error(601, 'CRITICAL ERROR: theme cannot load, redirect to error page (' + e + ')')}
    }
}

/*
    Greetings function
    output on page greetings and week (yellow or green)
*/
function home() {
    var month = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря']
    var outtext;
         if (dt.getHours() <= 12 && dt.getHours() > 5)  { outtext = 'Доброе утро!' } 
    else if (dt.getHours() <= 18 && dt.getHours() > 12) { outtext = 'Добрый день!' } 
    else if (dt.getHours() <= 23 && dt.getHours() > 19) { outtext = 'Добрый вечер!'} 
    else                                                { outtext = 'Доброй ночи!' }
    output(false,`
    <div class="greetings"><p style="font-size:28px; margin-bottom:8px;">${outtext}</p></div>
    <div class="dateweek"><p style="font-size:18px; margin-top:4px;">${dt.getDate()} ${month[dt.getMonth()]}, ${pageSet('week')} неделя</p></div>
    <div class="support_table">
        <a class="support_button" onclick="page('timetable')"><div class="support_button"><p class="support_button">расписание</p><img class="support_button pc" src="" id="timetable_support"></div></a>
        <a class="support_button" onclick="pageSet('tablepos')"><div class="support_button"><p class="support_button">посещемость</p><img class="support_button pc" src="" id="gtable_support"></div></a>
        <a class="support_button" onclick="page('other')"><div class="support_button"><p class="support_button">дополнительно</p><img class="support_button pc" src="" id="other_support"></div></a>
    </div>
    `)
}

/* 
    Header function, create header 
    text - text after logo (can be changed)
*/
function header(text, enableTheme) {
    document.write('<div id="header">\
    <div class="header" style="padding-bottom: 12px; display: flex; flex-direction: row; flex-wrap: nowrap; align-items: center; user-select: none;">\
        <a href="home.html" class="logo_text_header"><p class="logo_text_header" style="font-size: 24px; margin-bottom: 12px; margin-left: 24px;">Группа КСК-11</p></a>\
        <p class="logo_dot_header" style="font-size: 26px; margin-bottom: 16px; margin-left: 14px; margin-right: 14px;">•</p>\
        <div class="mobile_gorisontal_void"></div>\
        <p style="font-size: 20px; margin-bottom: 8px;">' + text + '</p>\
        <div class="pc_gorisontal_void"></div>\
        <div class="mobile_gorisontal_void"></div>');
    if (enableTheme) { 
        document.write('<button id="theme_button" class="theme_header_button_pc" onclick="theme(0)">сменить тему</button>'); 
        document.write('<button id="theme_button" class="theme_header_button_mobile" onclick="theme(0)"><img style="width: 32px; height: 32px;" id="mobile_theme_button" src=""></button>')
    };
    document.write('</div><hr style="border: none; height: 1px; margin-top: 0;"></div>');
}

/* Sleep function (dont touch this!) */
function sleep(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }

/* Service worker function (dont touch!) */
function serw() {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', function() {
            navigator.serviceWorker.register('static/manifest/service-worker.js').then(function(registration) {
                // Registration was successful
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
          }, function(err) {
            // registration failed :(
            console.log('ServiceWorker registration failed: ', err);
          }).catch(function(err) {
            console.log(err)
          });
        });
      } else {
        console.log('service worker is not supported');
      }
}