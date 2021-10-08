/*       -------       College page       -------       */
/*     -------       Made by plutonny       -------     */

/*  ---  Global variables  ---  */
var VERSION = '1.0';
var BETA = false;
var WEEK = 40;

/*  ---  Prepare to work  ---  */
var weekname = ''; if (WEEK % 2 == 1) {weekname = 'желтая'} else {weekname = 'зеленая'}
var theme_button = document.getElementById('theme_button'); if (theme_button) { theme_button.addEventListener('click', theme); };
var back_button = document.getElementById('back_button'); if (back_button) { back_button.addEventListener('click', activities); };
var dt = new Date();
var betatext = ''; if (BETA) { betatext = ', beta версия' }

/**
 * Create a page on screen (main function)
 * setting - type of page now returned
 */
async function page(setting) {
         if (setting == 'general')   { header(`главная${betatext}`, true, false); home(); if(BETA){beta('info')} activities('version') }
    else if (setting == 'timetable') { header(`расписание${betatext}`, false, true); timetable() }
    else if (setting == 'other')     { header(`дополнительно${betatext}`, false, true); other() } 
    else                             { error(604, `ERROR: page function cant find setting of "${setting}"`); };
    await sleep(50);
    theme(1);
}

/**
 * Universal function to small activities:
 * include  - include HTML
 * version  - outputted version
 * backhome - returned to home.html page
 */
async function activities(setting) {
         if (setting == 'include')  { try { var z, i, elmnt, file, xhttp;z = document.getElementsByTagName("*");for (i = 0; i < z.length; i++) {elmnt = z[i];file = elmnt.getAttribute("include-html");if (file) {xhttp = new XMLHttpRequest();xhttp.onreadystatechange = function() {if (this.readyState == 4) {if (this.status == 200) {elmnt.innerHTML = this.responseText;};if (this.status == 404) {error(602, 'ERROR: innerHTML function cant find file');};elmnt.removeAttribute("include-html");activities('include');};};xhttp.open("GET", file, true);xhttp.send();return } } } catch (e) { error(602, `ERROR: innerHTML function returned error (${e})`) } }
    else if (setting == 'version')  { output(false, `<a href="../author/overview.html" class="version">version: ${VERSION}</a>`) }
    else if (setting == 'backhome') { history.back() }
    else                            { error(602, `ERROR: activities function not found instruction to "${setting}"`) }
}

/**
 * Output TEXT or FILE
 * [true, *file name*] - output file
 * [false, *text*]     - output text
 */
async function output(include, data) {
    if (include) { try { document.write('<div include-html="' + data + '"></div>'); activities('include'); 
    } catch (e) { error(604, 'ERROR: output function cant find current file') } }
    else if (!include) { document.write(data); }
    else { error(604, 'WARN: uncaught error output function') }
}

/* Sleep function (dont touch this!) */
function sleep(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }

/**
 * Returned critical error
 * 601 - theme (anything...)
 * 602 - activities (check console)
 * 603 - ... (for future)
 * 604 - page or output (not found)
 * for additional information check the console ('text' to console error text)
 */
async function error(errorcode, text) {
    var s = 'static/errors/' + errorcode + '.html';
    console.log(text);
    output(true, s);
    if (errorcode != 601) { await sleep(50); theme(1) }
}

/**
 * Only for beta users lol
 * info - outputted information about prepare to load in release
 */
function beta(setting) {
    if (setting == 'info') {
        output(false, `
        <div class="DELETE-THIS">
            <style>.DELETE-THIS { margin-left: 64px; }</style>
            <p>ПЕРЕД РЕЛИЗОМ:</p>
            <p><b>1. home.html:</b> поменять title на "Группа КСК-11"</p>
            <p><b>2. frames.js:</b> переменная BETA, версию поменять на нужную</p>
            <p><b>3. service-worker.js:</b> переменная BETA</p>
            <p><b>4. manifest.json:</b> поменять short name</p>
        </div>`)
    }
}

/* Service worker function (dont touch this!) */
function enableLogger() {
    if ('serviceWorker' in navigator) { window.addEventListener('load', function() {
        navigator.serviceWorker.register('service-worker.js').then(function(registration) {
        if (BETA) {console.log('ServiceWorker registration successful with scope: ', registration.scope);}
            }, function(err) { console.log('ERROR: ServiceWorker registration failed: ', err);
            }).catch(function(err) { console.log(err) }); }); }
        else { console.log('ERROR: Service worker is not supported'); }
}

/**
 * Themes!!!
 * 0 - change theme
 * 1 - load (update) theme
 */
async function theme(type) {
    try {
    var folder0 = localStorage.getItem('theme'); var folder1;
         if (localStorage.getItem('theme').includes('light')) { folder1 = 'dark' } 
    else if (localStorage.getItem('theme').includes('dark')) { folder1 = 'light' }
    else    { console.log('Warn: theme are undefined! Setting theme to light...'); localStorage.setItem('theme','light'); }

    var dark = `:root {
        --main-text-color:        #f5f5f5;
        --active-text-color:      #bbbbbb;
        --main-bg-color:          #151515;
        --button-bg-enable:       #252525;
        --button-bg-color-active: #303030;
        --header-bg-color:        #202020;
        --scrollbar-thumb:        #353535;
        --scrollbar-thumb-hover:  #252525;
        --timetable-bg:           #0d0d0d;
        --timetable-green:        #006600;
        --timetable-yellow:       #808000;
    }`;
    var light = `:root {
        --main-text-color:        #101828;
        --active-text-color:      #252525;
        --main-bg-color:          #f0f0f0;
        --button-bg-enable:       #dddddd;
        --button-bg-color-active: #cccccc;
        --header-bg-color:        #f5f5f5;
        --scrollbar-thumb:        #dddddd;
        --scrollbar-thumb-hover:  #bbbbbb;
        --timetable-bg:           #fbfbfb;
        --timetable-green:        #00e600;
        --timetable-yellow:       #e6e600;
    }`;

    if (type === 0) {
        try { document.getElementById('mobile_theme_button').src = `static/images/${folder0}/theme.svg`; } catch { console.log('Warning: theme button is not enabled!'); };
        try { document.getElementById('back_button').src = `static/images/${folder0}/back.svg`; } catch { console.log('Warning: back button is not enabled!'); };
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
        try { document.getElementById('back_button').src = `static/images/${folder1}/back.svg`; } catch { console.log('Warning: back button is not enabled!'); };
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
        await sleep(50);
        try {
            localStorage.setItem('theme','light');
            try { document.getElementById('mobile_theme_button').src = `static/images/${folder1}/theme.svg`; } catch { console.log('Warning: theme button is not enabled!'); };
            try { document.getElementById('back_button').src = `static/images/${folder1}/back.svg`; } catch { console.log('Warning: back button is not enabled!'); };
            try { 
                document.getElementById('timetable_support').src = `static/images/${folder1}/timetable.svg`;
                document.getElementById('gtable_support').src = `static/images/${folder1}/gtable.svg`;
                document.getElementById('other_support').src = `static/images/${folder1}/other.svg`;
            } catch { console.log('Warning: icon support button is not enabled!'); };
            document.getElementById('theme_css').innerHTML = light;
        } catch (e) {error(601, 'CRITICAL ERROR: theme cannot load, redirect to error page (' + e + ')')}
    }
}

/**
 * styles to logic timetable page
 * type - 'day' or 'week'
 */
async function timetable_logic(type) {
    var tweek = `
    .timetable_day {display:none;}
    .timetable_button_week { background-color: var(--button-bg-enable); }
    `; 
    var tday = `
    .timetable_week {display:none;}
    .timetable_button_day { background-color: var(--button-bg-enable); }
    `;
    try {
        if (type == 'day') { document.getElementById('timetable_special_css').innerHTML = tday }
        else if (type == 'week') { document.getElementById('timetable_special_css').innerHTML = tweek }
    } catch (e) {
        console.log('ERROR: logic timetable have any problem (' + e + ')!')
    }
}

/*  ---  Frames and pages  ---  */

/**
 * Outputted header
 * text - text after logo or main text (in mobile)
 * enableTheme - enable or disable theme buttons (not theme)
 * enableHome - enable or disable back to home button
 * DONT use enableTheme and enableHome in one time!!!
 */
function header(text, enableTheme, enableHome) {
    document.write(`
    <div id="header" class="header" style="padding-bottom: 12px; display: flex; flex-direction: row; flex-wrap: nowrap; align-items: center; user-select: none;">
        <a href="home.html" class="logo_text_header">
            <p class="logo_text_header" style="font-size: 24px; margin-bottom: 12px; margin-left: 24px;">Группа КСК-11</p>
        </a>
        <p class="logo_dot_header" style="font-size: 26px; margin-bottom: 16px; margin-left: 14px; margin-right: 14px;">•</p>
        <div class="mobile_gorisontal_void"></div>
        <p style="font-size: 20px; margin-bottom: 8px;">${text}</p>
        <div class="pc_gorisontal_void"></div>
        <div class="mobile_gorisontal_void"></div>
    `);
    if (enableTheme) { 
        document.write(`<button id="theme_button" class="theme_header_button pc" onclick="theme(0)">сменить тему</button>`); 
        document.write(`<button id="theme_button" class="theme_header_button mobile" onclick="theme(0)"><img style="width: 32px; height: 32px;" id="mobile_theme_button" src=""></button>`)
    };
    if (enableHome) {
        document.write(`<button id="theme_button" class="back_button mobile" onclick="activities('backhome')"><img style="width: 32px; height: 32px;" id="back_button" src=""></button>`)
    };
    document.write(`</div><hr style="border: none; height: 1px; margin-top: 0;"></div>`);
}

/* Home page */
function home() {
    var month = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря']
    var outtext;
         if (dt.getHours() >= 5  && dt.getHours() < 12) { outtext = 'Доброе утро!' } 
    else if (dt.getHours() >= 12 && dt.getHours() < 18) { outtext = 'Добрый день!' } 
    else if (dt.getHours() >= 18 && dt.getHours() < 22) { outtext = 'Добрый вечер!'} 
    else                                                { outtext = 'Доброй ночи!' }
    output(false,`
    <div class="greetings"><p style="font-size:28px; margin-bottom:8px;">${outtext}</p></div>
    <div class="dateweek"><p style="font-size:18px; margin-top:4px;">${dt.getDate()} ${month[dt.getMonth()]}, ${weekname} неделя</p></div>
    <div class="support_table">
        <div class="margin24"><a class="support_button" href="timetable.html"><div class="support_button"><p class="support_button mobile">🧭 расписание</p><p class="support_button pc">Расписание</p><div class="margin52"><img class="support_button pc" src="" id="timetable_support"></div></div></a></div>
        <div class="margin24"><a class="support_button" href="https://docs.google.com/spreadsheets/d/12NHcO3C-BL2vZ5B64_2nW4RoH-zKdDL4Ixj2MkmWiag/edit" target="_blank"><div class="support_button"><p class="support_button mobile">📋 посещаемость</p><p class="support_button pc">Посещаемость</p><div class="margin52"><img class="support_button pc" src="" id="gtable_support"></div></div></a></div>
        <div class="margin24"><a class="support_button" href="other.html"><div class="support_button"><p class="support_button mobile">💬 дополнительно</p><p class="support_button pc">Дополнительно</p><div class="margin52"><img class="support_button pc" src="" id="other_support"></div></div></a></div>
    </div>
    `)
}

/* Timetable page */
function timetable() {
    output(false, `
    <div class="timetable_greetings"><p style="font-size:28px; margin-bottom:0px;">${weekname} неделя</p></div>
    <div class="timetable_button">
        <button class="timetable_button timetable_button_day" onclick="timetable_logic('day')">день</button>
        <button class="timetable_button timetable_button_week" onclick="timetable_logic('week')">неделя</button>
    </div>
    <div class="timetable_table">
        ${get_timetable('day')}
        ${get_timetable('week')}
    </div>
    <div class="timetable_warning">
        <p class="timetable_warning"><b class="timetable_warning">примечание:</b> изменения расписания и дистанционка здесь не отображаются, для этого смотри беседу "КСК-11" в VK</p>
    </div>
    `);
    timetable_logic('day');
}

/* returned day timetable */
function get_timetable(type) {
    var dayret = 
        [`<table class="timetable_day">
            <tr class="timetable_day_line"> <td rowspan="2" class="timetable_day_num">1</td> <td class="timetable_day_name yellow">Литература</td> <td class="timetable_day_cab yellow">404</td> </tr>
            <tr class="timetable_day_line"> <td class="timetable_day_name green">Физика</td> <td class="timetable_day_cab green">303</td> </tr>
            <tr class="timetable_day_line"> <td rowspan="2" class="timetable_day_num">2</td> <td class="timetable_day_name yellow">Ин. проект</td> <td class="timetable_day_cab yellow">226</td> </tr>
            <tr class="timetable_day_line"> <td class="timetable_day_name green">Физ-ра</td> <td class="timetable_day_cab green">0100</td> </tr>
            <tr class="timetable_day_line"> <td rowspan="2" class="timetable_day_num">3</td> <td class="timetable_day_name">Русский</td> <td class="timetable_day_cab">404</td> </tr>
            <tr class="timetable_day_line"> <td class="timetable_day_name">Горбова</td> <td class="timetable_day_cab"></td> </tr>
            <tr class="timetable_day_line"> <td rowspan="2" class="timetable_day_num">4</td> <td class="timetable_day_name">Информатика</td> <td class="timetable_day_cab">220</td> </tr>
            <tr class="timetable_day_line"> <td class="timetable_day_name">Цыганкова</td> <td class="timetable_day_cab"></td> </tr>
        </table>`,
        `<table class="timetable_day">
            <tr class="timetable_day_line"> <td rowspan="2" class="timetable_day_num">1</td> <td class="timetable_day_name">Информатика</td> <td class="timetable_day_cab">220</td> </tr>
            <tr class="timetable_day_line"> <td class="timetable_day_name">Цыганкова</td> <td class="timetable_day_cab"></td> </tr>
            <tr class="timetable_day_line"> <td rowspan="2" class="timetable_day_num">2</td> <td class="timetable_day_name">Физика</td> <td class="timetable_day_cab">303</td> </tr>
            <tr class="timetable_day_line"> <td class="timetable_day_name">Момотов</td> <td class="timetable_day_cab"></td> </tr>
            <tr class="timetable_day_line"> <td rowspan="2" class="timetable_day_num">3</td> <td class="timetable_day_name">Литература</td> <td class="timetable_day_cab">404</td> </tr>
            <tr class="timetable_day_line"> <td class="timetable_day_name">Горбова</td> <td class="timetable_day_cab"></td> </tr>
        </table>`,
        `<table class="timetable_day">
            <tr class="timetable_day_line"> <td rowspan="2" class="timetable_day_num">1</td> <td class="timetable_day_name">Математика</td> <td class="timetable_day_cab">406</td> </tr>
            <tr class="timetable_day_line"> <td class="timetable_day_name">Панфилова</td> <td class="timetable_day_cab"></td> </tr>
            <tr class="timetable_day_line"> <td rowspan="2" class="timetable_day_num">2</td> <td class="timetable_day_name">Химия</td> <td class="timetable_day_cab">402</td> </tr>
            <tr class="timetable_day_line"> <td class="timetable_day_name">Петрова</td> <td class="timetable_day_cab"></td> </tr>
            <tr class="timetable_day_line"> <td rowspan="2" class="timetable_day_num">3</td> <td class="timetable_day_name">Ин. проект</td> <td class="timetable_day_cab">226</td> </tr>
            <tr class="timetable_day_line"> <td class="timetable_day_name">Солодкая</td> <td class="timetable_day_cab"></td> </tr>
        </table>`,
        `<table class="timetable_day">
            <tr class="timetable_day_line"> <td rowspan="2" class="timetable_day_num">1</td> <td class="timetable_day_name"></td> <td class="timetable_day_cab"></td> </tr>
            <tr class="timetable_day_line"> <td class="timetable_day_name"></td> <td class="timetable_day_cab"></td> </tr>
            <tr class="timetable_day_line"> <td rowspan="2" class="timetable_day_num">2</td> <td class="timetable_day_name">Физ-ра</td> <td class="timetable_day_cab">0100</td> </tr>
            <tr class="timetable_day_line"> <td class="timetable_day_name">Торопков</td> <td class="timetable_day_cab"></td> </tr>
            <tr class="timetable_day_line"> <td rowspan="2" class="timetable_day_num">3</td> <td class="timetable_day_name">Математика</td> <td class="timetable_day_cab">406</td> </tr>
            <tr class="timetable_day_line"> <td class="timetable_day_name">Панфилова</td> <td class="timetable_day_cab"></td> </tr>
        </table>`,
        `<table class="timetable_day">
            <tr class="timetable_day_line"> <td rowspan="2" class="timetable_day_num">1</td> <td class="timetable_day_name yellow">Англ. язык</td> <td class="timetable_day_cab yellow">404а/311</td> </tr>
            <tr class="timetable_day_line"> <td class="timetable_day_name green">ОБЖ</td> <td class="timetable_day_cab green">314</td> </tr>
            <tr class="timetable_day_line"> <td rowspan="2" class="timetable_day_num">2</td> <td class="timetable_day_name">Математика</td> <td class="timetable_day_cab">406</td> </tr>
            <tr class="timetable_day_line"> <td class="timetable_day_name">Панфилова</td> <td class="timetable_day_cab"></td> </tr>
            <tr class="timetable_day_line"> <td rowspan="2" class="timetable_day_num">3</td> <td class="timetable_day_name">Физика</td> <td class="timetable_day_cab">303</td> </tr>
            <tr class="timetable_day_line"> <td class="timetable_day_name">Момотов</td> <td class="timetable_day_cab"></td> </tr>
        </table>`,
        `<table class="timetable_day">
            <tr class="timetable_day_line"> <td rowspan="2" class="timetable_day_num">1</td> <td class="timetable_day_name">Англ. язык</td> <td class="timetable_day_cab">404а/311</td> </tr>
            <tr class="timetable_day_line"> <td class="timetable_day_name">Венедиктова/Черкасова</td> <td class="timetable_day_cab"></td> </tr>
            <tr class="timetable_day_line"> <td rowspan="2" class="timetable_day_num">2</td> <td class="timetable_day_name yellow">Астрономия</td> <td class="timetable_day_cab yellow">300</td> </tr>
            <tr class="timetable_day_line"> <td class="timetable_day_name green">Родная лит-ра</td> <td class="timetable_day_cab green">230</td> </tr>
            <tr class="timetable_day_line"> <td rowspan="2" class="timetable_day_num">3</td> <td class="timetable_day_name">История</td> <td class="timetable_day_cab">407</td> </tr>
            <tr class="timetable_day_line"> <td class="timetable_day_name">Глущенко</td> <td class="timetable_day_cab"></td> </tr>
        </table>`];
    var weekret = `
    <table class="timetable_week">
            <tr class="timetable_week_weekname"><td colspan="3" class="timetable_week_weekname">понедельник</td></tr>
            <tr class="timetable_week_line"> <td rowspan="2" class="timetable_week_num">1</td> <td class="timetable_week_name yellow">Литература</td> <td class="timetable_week_cab yellow">404</td> </tr>
            <tr class="timetable_week_line"> <td class="timetable_week_name green">Физика</td> <td class="timetable_week_cab green">303</td> </tr>
            <tr class="timetable_week_line"> <td rowspan="2" class="timetable_week_num">2</td> <td class="timetable_week_name yellow">Ин. проект</td> <td class="timetable_week_cab yellow">226</td> </tr>
            <tr class="timetable_week_line"> <td class="timetable_week_name green">Физ-ра</td> <td class="timetable_week_cab green">0100</td> </tr>
            <tr class="timetable_week_line"> <td rowspan="2" class="timetable_week_num">3</td> <td class="timetable_week_name">Русский</td> <td class="timetable_week_cab">404</td> </tr>
            <tr class="timetable_week_line"> <td class="timetable_week_name">Горбова</td> <td class="timetable_week_cab"></td> </tr>
            <tr class="timetable_week_line"> <td rowspan="2" class="timetable_week_num">4</td> <td class="timetable_week_name">Информатика</td> <td class="timetable_week_cab">220</td> </tr>
            <tr class="timetable_week_line"> <td class="timetable_week_name">Цыганкова</td> <td class="timetable_week_cab"></td> </tr>
        </table><table class="timetable_week">
            <tr class="timetable_week_weekname"><td colspan="3" class="timetable_week_weekname">вторник</td></tr>
            <tr class="timetable_week_line"> <td rowspan="2" class="timetable_week_num">1</td> <td class="timetable_week_name">Информатика</td> <td class="timetable_week_cab">220</td> </tr>
            <tr class="timetable_week_line"> <td class="timetable_week_name">Цыганкова</td> <td class="timetable_week_cab"></td> </tr>
            <tr class="timetable_week_line"> <td rowspan="2" class="timetable_week_num">2</td> <td class="timetable_week_name">Физика</td> <td class="timetable_week_cab">303</td> </tr>
            <tr class="timetable_week_line"> <td class="timetable_week_name">Момотов</td> <td class="timetable_week_cab"></td> </tr>
            <tr class="timetable_week_line"> <td rowspan="2" class="timetable_week_num">3</td> <td class="timetable_week_name">Литература</td> <td class="timetable_week_cab">404</td> </tr>
            <tr class="timetable_week_line"> <td class="timetable_week_name">Горбова</td> <td class="timetable_week_cab"></td> </tr>
        </table><table class="timetable_week">
            <tr class="timetable_week_weekname"><td colspan="3" class="timetable_week_weekname">среда</td></tr>
            <tr class="timetable_week_line"> <td rowspan="2" class="timetable_week_num">1</td> <td class="timetable_week_name">Математика</td> <td class="timetable_week_cab">406</td> </tr>
            <tr class="timetable_week_line"> <td class="timetable_week_name">Панфилова</td> <td class="timetable_week_cab"></td> </tr>
            <tr class="timetable_week_line"> <td rowspan="2" class="timetable_week_num">2</td> <td class="timetable_week_name">Химия</td> <td class="timetable_week_cab">402</td> </tr>
            <tr class="timetable_week_line"> <td class="timetable_week_name">Петрова</td> <td class="timetable_week_cab"></td> </tr>
            <tr class="timetable_week_line"> <td rowspan="2" class="timetable_week_num">3</td> <td class="timetable_week_name">Ин. проект</td> <td class="timetable_week_cab">226</td> </tr>
            <tr class="timetable_week_line"> <td class="timetable_week_name">Солодкая</td> <td class="timetable_week_cab"></td> </tr>
        </table><table class="timetable_week">
            <tr class="timetable_week_weekname"><td colspan="3" class="timetable_week_weekname">четверг</td></tr>
            <tr class="timetable_week_line"> <td rowspan="2" class="timetable_week_num">1</td> <td class="timetable_week_name"></td> <td class="timetable_week_cab"></td> </tr>
            <tr class="timetable_week_line"> <td class="timetable_week_name"></td> <td class="timetable_week_cab"></td> </tr>
            <tr class="timetable_week_line"> <td rowspan="2" class="timetable_week_num">2</td> <td class="timetable_week_name">Физ-ра</td> <td class="timetable_week_cab">0100</td> </tr>
            <tr class="timetable_week_line"> <td class="timetable_week_name">Торопков</td> <td class="timetable_week_cab"></td> </tr>
            <tr class="timetable_week_line"> <td rowspan="2" class="timetable_week_num">3</td> <td class="timetable_week_name">Математика</td> <td class="timetable_week_cab">406</td> </tr>
            <tr class="timetable_week_line"> <td class="timetable_week_name">Панфилова</td> <td class="timetable_week_cab"></td> </tr>
        </table><table class="timetable_week">
            <tr class="timetable_week_weekname"><td colspan="3" class="timetable_week_weekname">пятница</td></tr>
            <tr class="timetable_week_line"> <td rowspan="2" class="timetable_week_num">1</td> <td class="timetable_week_name yellow">Англ. язык</td> <td class="timetable_week_cab yellow">404а/311</td> </tr>
            <tr class="timetable_week_line"> <td class="timetable_week_name green">ОБЖ</td> <td class="timetable_week_cab green">314</td> </tr>
            <tr class="timetable_week_line"> <td rowspan="2" class="timetable_week_num">2</td> <td class="timetable_week_name">Математика</td> <td class="timetable_week_cab">406</td> </tr>
            <tr class="timetable_week_line"> <td class="timetable_week_name">Панфилова</td> <td class="timetable_week_cab"></td> </tr>
            <tr class="timetable_week_line"> <td rowspan="2" class="timetable_week_num">3</td> <td class="timetable_week_name">Физика</td> <td class="timetable_week_cab">303</td> </tr>
            <tr class="timetable_week_line"> <td class="timetable_week_name">Момотов</td> <td class="timetable_week_cab"></td> </tr>
        </table><table class="timetable_week">
            <tr class="timetable_week_weekname"><td colspan="3" class="timetable_week_weekname">суббота</td></tr>
            <tr class="timetable_week_line"> <td rowspan="2" class="timetable_week_num">1</td> <td class="timetable_week_name">Англ. язык</td> <td class="timetable_week_cab">404а/311</td> </tr>
            <tr class="timetable_week_line"> <td class="timetable_week_name">Венедиктова/Черкасова</td> <td class="timetable_week_cab"></td> </tr>
            <tr class="timetable_week_line"> <td rowspan="2" class="timetable_week_num">2</td> <td class="timetable_week_name yellow">Астрономия</td> <td class="timetable_week_cab yellow">300</td> </tr>
            <tr class="timetable_week_line"> <td class="timetable_week_name green">Родная лит-ра</td> <td class="timetable_week_cab green">230</td> </tr>
            <tr class="timetable_week_line"> <td rowspan="2" class="timetable_week_num">3</td> <td class="timetable_week_name">История</td> <td class="timetable_week_cab">407</td> </tr>
            <tr class="timetable_week_line"> <td class="timetable_week_name">Глущенко</td> <td class="timetable_week_cab"></td> </tr>
        </table>
    `;
    if (type == 'day') {
        if (dt.getHours() < 15) { return '<p class="timetable_day">сегодня:</p>' + dayret[dt.getDay() - 1] }
        else { return '<p class="timetable_day">завтра:</p>' + dayret[dt.getDay()] }
    }
    else if (type == 'week') { return weekret }
}

/* Other page */
function other() {
    output(false, `
    <div class="other">
        <div class="other_container">
            <p class="other_gen"><b>электронная почта группы:</b></p>
            <p class="other">логин: csc11akt@gmail.com</p>
            <p class="other">пароль: Arhangelsk!12345!akt</p>
        </div>
        <div class="other_container">
            <p class="other_gen"><b>номера телефонов для связи:</b></p>
            <p class="other">Глеба Сергеевича: <a class="other" href="tel:+79600192697">+7 (960) 019-26-97</a></p>
            <p class="other">старосты: <a class="other" href="tel:+79910540236">+7 (991) 054-02-36</a></p>
        </div>
        <div class="other_container">
            <p class="other_gen"><b>социальные сети для связи:</b></p>
            <p class="other">Глеба Сергеевича: <a class="other" target="_blank" href="https://vk.com/small_tip">VK</a></p>
            <p class="other">старосты: <a class="other" target="_blank" href="https://vk.com/pltny">VK</a>, <a class="other" target="_blank" href="https://telegram.me/plutonny">telegram</a></p>
            <p class="other">зам. старосты: <a class="other" target="_blank" href="https://vk.com/helldeline">VK</a></p>
        </div>
    </div>
    `);
}
