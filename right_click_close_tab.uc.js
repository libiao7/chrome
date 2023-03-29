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
    let mouseoverTab
    gBrowser.tabContainer.addEventListener("TabOpen", function (e) {
        lastClickedTab = e.target;
    }, true);
    gBrowser.tabContainer.addEventListener("TabClose", function (e) {
        if (e.target === lastClickedTab) {
            lastClickedTab = gBrowser.selectedTab;
        }
        if (e.target === mouseoverTab) {
            mouseoverTab = gBrowser.selectedTab;
        }
    }, true);
    gBrowser.tabContainer.addEventListener("mouseover", function (e) {
        if (e.target.tagName === 'tab') {
            e.stopImmediatePropagation()
            e.preventDefault()
            if (e.target !== gBrowser.selectedTab) {
                if (e.target !== lastClickedTab) {
                    mouseoverTab = e.target
                }
                e.target.click()
            }
        }
    }, true);
    gBrowser.tabContainer.addEventListener("mouseleave", function (e) {
        if (lastClickedTab && lastClickedTab !== gBrowser.selectedTab) {
            lastClickedTab.click()
        }
    }, true);
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
    }, true);
    gNavToolbox.firstElementChild.addEventListener("wheel", function (e) {
        e.stopImmediatePropagation()
        e.preventDefault()
        if (lastClickedTab && lastClickedTab !== gBrowser.selectedTab) {
            lastClickedTab.click()
        }
        else if (mouseoverTab && mouseoverTab !== gBrowser.selectedTab) {
            mouseoverTab.click()
        }
    },
        { capture: true }
    )
})();



// (() => {
//     let lastClickedTab
//     let mouseoverTab
//     gBrowser.tabContainer.addEventListener("TabOpen", function (e) {
//         lastClickedTab = e.target;
//     }, true);
//     gBrowser.tabContainer.addEventListener("TabClose", function (e) {
//         if (e.target === lastClickedTab) {
//             // lastClickedTab = NaN;
//             lastClickedTab = gBrowser.selectedTab;
//         }
//         if (e.target === mouseoverTab) {
//             // lastClickedTab = NaN;
//             mouseoverTab = gBrowser.selectedTab;
//         }
//     }, true);
//     // gBrowser.tabContainer.addEventListener("TabSelect", function (e) {
//     //     console.log("TabSelect",e)
//     // }, true);
//     // // gBrowser.tabContainer.addEventListener("TabShow", function (e) {
//     // //     console.log("TabShow",e)
//     // // }, true);
//     gBrowser.tabContainer.addEventListener("mouseover", function (e) {
//         if (e.target.tagName === 'tab') {
//             e.stopImmediatePropagation()
//             e.preventDefault()
//             if (e.target !== gBrowser.selectedTab) {
//                 if (e.target !== lastClickedTab) {
//                     mouseoverTab = e.target
//                 }
//                 e.target.click()
//             }
//         }
//         // else 
//         // if (e.target.tagName === 'hbox' && e.target.parentElement && e.target.parentElement.parentElement && e.target.parentElement.parentElement.tagName === 'tab') {
//         //     e.stopImmediatePropagation()
//         //     e.preventDefault()
//         //     if (e.target.parentElement.parentElement !== gBrowser.selectedTab) {
//         //         if (e.target.parentElement.parentElement !== lastClickedTab) {
//         //             mouseoverTab = e.target.parentElement.parentElement
//         //         }
//         //         e.target.parentElement.parentElement.click()
//         //     }
//         // }
//     }, true);
//     gBrowser.tabContainer.addEventListener("mouseleave", function (e) {
//         if (lastClickedTab !== gBrowser.selectedTab) {
//             lastClickedTab.click()
//         }
//     }, true);
//     gBrowser.tabContainer.addEventListener("mousedown", function (e) {
//         if (e.detail > 0) {
//             let ta = e.target;
//             if (ta.tagName === 'tab') {
//                 lastClickedTab = ta
//             }
//             else {
//                 while (ta.parentElement && ta.parentElement.tagName != 'tab') {
//                     ta = ta.parentElement
//                 }
//                 if (ta.parentElement) {
//                     lastClickedTab = ta.parentElement
//                 }
//             }
//         }
//     }, true);
//     gNavToolbox.firstElementChild.addEventListener("wheel", function (e) {
//         e.stopImmediatePropagation()
//         e.preventDefault()
//         // if (lastClickedTab !== gBrowser.selectedTab) {
//         //     let tabToClick = lastClickedTab
//         //     lastClickedTab = gBrowser.selectedTab
//         //     tabToClick.click()
//         // }
//         if (lastClickedTab && lastClickedTab !== gBrowser.selectedTab) {
//             lastClickedTab.click()
//         }
//         else if (mouseoverTab && mouseoverTab !== gBrowser.selectedTab) {
//             mouseoverTab.click()
//         }
//     },
//         { capture: true }
//     )
// })();
// (() => {
//     let lastClickedTab
//     gBrowser.tabContainer.addEventListener("mouseover", function (e) {
//         if (e.target.tagName === 'tab'
//             || e.target.tagName === 'hbox' && e.target.parentElement && e.target.parentElement.parentElement && e.target.parentElement.parentElement.tagName === 'tab') {
//             e.preventDefault();
//             e.stopPropagation();
//             e.target.click()
//         }
//     }, true);
//     gBrowser.tabContainer.addEventListener("mouseleave", function (e) {
//         if (lastClickedTab) {
//             lastClickedTab.click()
//         }
//     }, true);
//     gBrowser.tabContainer.addEventListener("mousedown", function (e) {
//         if (e.detail > 0) {
//             let ta = e.target;
//             if (ta.tagName === 'tab') {
//                 lastClickedTab = ta
//             }
//             else {
//                 while (ta.parentElement && ta.parentElement.tagName != 'tab') {
//                     ta = ta.parentElement
//                 }
//                 if (ta.parentElement) {
//                     lastClickedTab = ta.parentElement
//                 }
//             }
//         }
//     }, true);
// })();

// console.log("right_click_close_tab.js");

// (() => {

//     gBrowser.tabContainer.addEventListener("TabOpen", eventTabAdded, true);
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

//     gBrowser.tabContainer.addEventListener("TabOpen", eventTabAdded, true);
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
