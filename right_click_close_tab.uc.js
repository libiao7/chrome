/* Firefox userChrome script
 * Right-clicking on tab button to close tab
 * Shift + right-clicking to popup menu
 * Tested on Firefox 91
 * Author: garywill (https://garywill.github.io)
 */

// ==UserScript==
// @include         main
// ==/UserScript==

(() => {
    let lastClickedTab
    gBrowser.tabContainer.addEventListener("mouseover", function (e) {
        if (e.target.tagName === 'tab'
            || e.target.tagName === 'hbox' && e.target.parentElement && e.target.parentElement.parentElement && e.target.parentElement.parentElement.tagName === 'tab') {
            e.preventDefault();
            e.stopPropagation();
            e.target.click()
        }
    }, false);
    gBrowser.tabContainer.addEventListener("mouseleave", function (e) {
        if (lastClickedTab) {
            lastClickedTab.click()
        }
    }, false);
    gBrowser.tabContainer.addEventListener("mousedown", function (e) {
        if (e.detail > 0) {
            let ta = e.target;
            if (ta.tagName === 'tab') {
                lastClickedTab = ta
            }
            else {
                while (ta.parentElement && ta.parentElement.tagName != 'tab') {
                    ta = ta.parentElement
                }
                if (ta.parentElement) {
                    lastClickedTab = ta.parentElement
                }
            }
        }
    }, false);
})();

console.log("right_click_close_tab.js");

// (() => {

//     gBrowser.tabContainer.addEventListener("TabOpen", eventTabAdded, false);
//     function eventTabAdded(e) {
//         var tab = e.target;
//         tab.addEventListener('click', onTabEvent);
//         tab.addEventListener('contextmenu', onTabEvent);
//     }


//     function onTabEvent(e) {
//         //console.log(e.type);
//         if (e.button != 2 || e.shiftKey  ) 
//             return;

//         e.preventDefault();
//         e.stopPropagation();

//         if (e.type == 'click')
//             gBrowser.removeTab(this, {animate: true});
//     }

//     gBrowser.tabContainer.querySelectorAll('tab').forEach( function(tab, index) {
//         tab.addEventListener('click', onTabEvent);
//         tab.addEventListener('contextmenu', onTabEvent);
//     });

// })();



// (() => {

//     gBrowser.tabContainer.addEventListener("TabOpen", eventTabAdded, false);
//     function eventTabAdded(e) {
//         var tab = e.target;
//         tab.addEventListener('mouseenter', onTabEvent);
//         tab.addEventListener('click', function (e) {
//             console.log(e);
//         });
//     }


//     function onTabEvent(e) {
//         // console.log(e.target.tagName);
//         // console.log(e.target);
//         // console.log(e.type);
//         // console.log(e);
//         e.preventDefault();
//         e.stopPropagation();
//         e.target.click()
//     }

//     gBrowser.tabContainer.querySelectorAll('tab').forEach(function (tab, index) {
//         tab.addEventListener('mouseenter', onTabEvent);
//         tab.addEventListener('click', function (e) {
//             console.log(e);
//         });
//     });

// })();
