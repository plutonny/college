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
    for example: 'homep' returned main page
*/
async function page(current) {
    if (current === 'general') { header('главная', true); home(); output(true, 'VERSION.html') }
    else { error(604, 'ERROR: cant find file in page function'); };
    await sleep(50);
    theme(1);
};

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
        document.write('<button id="theme_button" class="theme_header_button_pc" onclick="theme(0)">Cменить тему</button>'); 
        document.write('<button id="theme_button" class="theme_header_button_mobile" onclick="theme(0)"><img style="width: 32px;" id="mobile_theme_button" src=""></button>')
    };
    document.write('</div><hr style="border: none; height: 1px; margin-top: 0;"></div>');
}

/* 
    Function output files or text on page
    include True - file, False - text
    data - file or text
*/
function output(include, data) {
    if (include) { try {
        document.write('<div include-html="' + data + '"></div>'); includeHTML(); 
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
    if (errorcode != 601) {await sleep(50);theme(1)}
}

/* 
    Theme function 
    (change = 0, update = 1) 
*/
async function theme(type) {
    try {
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
        if (localStorage.getItem('theme').includes('light')) { 
            try { document.getElementById('mobile_theme_button').src = 'static/sun.svg'; } catch { console.log('Warning: theme button is not enabled!'); };
            document.getElementById('theme_css').innerHTML = dark; 
            localStorage.setItem('theme','dark'); 
        } else if (localStorage.getItem('theme').includes('dark')) { 
            try { document.getElementById('mobile_theme_button').src = 'static/moon.svg'; } catch { console.log('Warning: theme button is not enabled!'); };
            document.getElementById('theme_css').innerHTML = light; 
            localStorage.setItem('theme','light'); 
        } else {
            console.log('Error: theme are undefined! Setting theme to light...');
            try { document.getElementById('mobile_theme_button').src = 'static/moon.svg'; } catch { console.log('Warning: theme button is not enabled!'); };
            document.getElementById('theme_css').innerHTML = light; 
            localStorage.setItem('theme','light'); 
        };
    }; if (type === 1) {
        if (localStorage.getItem('theme').includes('light')) { 
            try { document.getElementById('mobile_theme_button').src = 'static/moon.svg'; } catch { console.log('Warning: theme button is not enabled!'); };
            document.getElementById('theme_css').innerHTML = light;
        } else if (localStorage.getItem('theme').includes('dark')) { 
            try { document.getElementById('mobile_theme_button').src = 'static/sun.svg'; } catch { console.log('Warning: theme button is not enabled!'); };
            document.getElementById('theme_css').innerHTML = dark; 
        } else {
            console.log('Error: theme are undefined! Setting theme to light...');
            try { document.getElementById('mobile_theme_button').src = 'static/moon.svg';  } catch { console.log('Warning: theme button is not enabled!'); };
            document.getElementById('theme_css').innerHTML = light; 
            localStorage.setItem('theme','light'); 
        }
    } 
    } catch (e) {
        console.log('WARN: theme function (' + e + '), trying to set light theme and reload');
        await sleep(15);
        try {
            localStorage.setItem('theme','light');
            try { document.getElementById('mobile_theme_button').src = 'static/moon.svg'; } catch { console.log('Warning: theme button is not enabled!'); };
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
    else if (dt.getHours() <= 23 && dt.getHours() > 18) { outtext = 'Добрый вечер!'} 
    else                                                { outtext = 'Доброй ночи!' }
    output(false, `
    <div class="greetings"><p style="font-size:28px; margin-bottom:8px;">${outtext}</p></div>
    <div class="dateweek"><p style="font-size:18px; margin-top:4px;">${dt.getDate()} ${month[dt.getMonth()]}, ${getWeek()} неделя</p></div>
    <div class="table_pos">
    <a href="https://docs.google.com/spreadsheets/d/12NHcO3C-BL2vZ5B64_2nW4RoH-zKdDL4Ixj2MkmWiag/edit?usp=sharing" 
    style="font-size: 32px;">Таблица посещаемости</a>
    </div>
    `)
}

/*
    Get week function
    returned week ('желтая' or 'зеленая')
*/
function getWeek() {
    var oneJan = new Date(currentdate.getFullYear(),0,1);
    var numberOfDays = Math.floor((currentdate - oneJan) / (24 * 60 * 60 * 1000));
    var result = Math.ceil(( currentdate.getDay() + 1 + numberOfDays) / 7);
    if (result % 2 == 1) {return 'желтая'}
    else {return 'зеленая'}
}

/* Reload function */
function rel() { console.log('RELOADING PAGE!'); window.location.reload(); }

/* Sleep function (dont touch this!) */
function sleep(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }

/* Including HTML function (dont touch this!) */
function includeHTML() { try { var z, i, elmnt, file, xhttp;z = document.getElementsByTagName("*");for (i = 0; i < z.length; i++) {elmnt = z[i];file = elmnt.getAttribute("include-html");if (file) {xhttp = new XMLHttpRequest();xhttp.onreadystatechange = function() {if (this.readyState == 4) {if (this.status == 200) {elmnt.innerHTML = this.responseText;};if (this.status == 404) {error(602, 'ERROR: innerHTML function cant find file');};elmnt.removeAttribute("include-html");includeHTML();};};xhttp.open("GET", file, true);xhttp.send();return } } } catch (e) { error(602, e) } }