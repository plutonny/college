/*  ---  Rostelecom page  ---  */
/*  ---  Made by plutonny  ---  */

/* Listener buttons */
var theme_button = document.getElementById('theme_button');
if (theme_button) { theme_button.addEventListener('click', theme); };
var support_button = document.getElementById('support_button');
if (support_button) { support_button.addEventListener('click', support) };

/* 
    Main function, create a page 
    current - type of page returned now
    for example: 'home' returned main page
*/
async function page(current) {
    if (current === 'homep') { header('главная', true); output(true, 'static/general.html'); output(true, 'VERSION.html') }
    else { error(604, 'ERROR: cant find file in page function'); };
    await sleep(50);
    theme(1);
};

/* 
    Header function, create header 
    text - text after logo Rostelecom (can be changed)
*/
function header(text, enableTheme) {
    document.write('<div id="header">\
    <div class="header" style="padding-bottom: 12px; display: flex; flex-direction: row; flex-wrap: nowrap; align-items: center; user-select: none;">\
        <a href="knowledge-base.html" class="logo_text_header"><p class="logo_text_header" style="font-size: 24px; margin-bottom: 12px; margin-left: 24px;">Группа КСК-11</p></a>\
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
};

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
    else { error(603, 'WARN: uncaught error output function') };
};

/* 
    ERRORS:
    404 - page not found with innerHTML function
    601 - error in theme function, see console log to additional information
    604 - error in page or support function (cant find instruction to response)
*/
function error(errorcode, text) {
    var s = 'static/errors/' + errorcode + '.html';
    document.write('<h1 style="text-align: center; margin-top: 176px;">Произошла ошибка!</h1>');
    document.write('<div style="margin-top:32px; display: flex; justify-content: center;"><button style="border: 1px solid var(--main-text-color); border-radius: 10px; height: 32px; width: 140px; cursor: pointer; background-color: var(--main-bg-volor);s" onclick="rel()">На главную</button></div>');
    document.write('<h3 style="text-align: center; margin-top: 32px;">Если вы сюда попали, пожалуйста напишите разработчику: <a style="color: blue;" href="https://plutonny.github.io/author/links.html">plutonny/links</a> или попробуйте перезагрузить страницу.</h3>');
    output(false, text)
    output(true, s)
};

/* 
    Theme function 
    (change = 0, update = 1) 
*/
async function theme(type) {
    errorth = false
    try { if (!errorth) {
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
                try { document.getElementById('mobile_theme_button').src = 'static/sun.png'; } catch { console.log('Warning: theme button is not enabled!'); };
                document.getElementById('theme_css').innerHTML = dark; 
                localStorage.setItem('theme','dark'); 
            } else if (localStorage.getItem('theme').includes('dark')) { 
                try { document.getElementById('mobile_theme_button').src = 'static/moon.png'; } catch { console.log('Warning: theme button is not enabled!'); };
                document.getElementById('theme_css').innerHTML = light; 
                localStorage.setItem('theme','light'); 
            } else {
                console.log('Error: theme are undefined! Setting theme to light...');
                try { document.getElementById('mobile_theme_button').src = 'static/moon.png'; } catch { console.log('Warning: theme button is not enabled!'); };
                document.getElementById('theme_css').innerHTML = light; 
                localStorage.setItem('theme','light'); 
            };
        }; if (type === 1) {
            if (localStorage.getItem('theme').includes('light')) { 
                try { document.getElementById('mobile_theme_button').src = 'static/moon.png'; } catch { console.log('Warning: theme button is not enabled!'); };
                document.getElementById('theme_css').innerHTML = light;
            } else if (localStorage.getItem('theme').includes('dark')) { 
                try { document.getElementById('mobile_theme_button').src = 'static/sun.png'; } catch { console.log('Warning: theme button is not enabled!'); };
                document.getElementById('theme_css').innerHTML = dark; 
            } else {
                console.log('Error: theme are undefined! Setting theme to light...');
                try { document.getElementById('mobile_theme_button').src = 'static/moon.png';  } catch { console.log('Warning: theme button is not enabled!'); };
                document.getElementById('theme_css').innerHTML = light; 
                localStorage.setItem('theme','light'); 
            }
        } }
    } catch (e) {
        console.log('WARN: theme function (' + e + '), trying to set light theme and reload');
        await sleep(15);
        try {
            localStorage.setItem('theme','light');
            try { document.getElementById('mobile_theme_button').src = 'static/moon.png'; } catch { console.log('Warning: theme button is not enabled!'); };
            document.getElementById('theme_css').innerHTML = light;
        } catch (e) {
            error(601, 'CRITICAL ERROR: theme cannot load, redirect to error page (' + e + ')');
        }
    }
};

/* Reload function */
function rel() { console.log('RELOADING PAGE!'); window.location.reload(); };

/* Sleep function (dont touch this!) */
function sleep(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }

/* Including HTML function (dont touch this!) */
function includeHTML() {var z, i, elmnt, file, xhttp;z = document.getElementsByTagName("*");for (i = 0; i < z.length; i++) {elmnt = z[i];file = elmnt.getAttribute("include-html");if (file) {xhttp = new XMLHttpRequest();xhttp.onreadystatechange = function() {if (this.readyState == 4) {if (this.status == 200) {elmnt.innerHTML = this.responseText;};if (this.status == 404) {error(404);};elmnt.removeAttribute("include-html");includeHTML();};};xhttp.open("GET", file, true);xhttp.send();return;};};};