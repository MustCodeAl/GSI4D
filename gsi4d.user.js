// ==UserScript==
// @name		GSI4D - Google search improve for developers
// @description	Google search improve for developers.
// @version		1.4.12
// @include		/^https://www\.google\.co(m|\.jp)/search.+$/
// @author		yanorei32(modified by mustcodeal)
// @supportURL	https://github.com/yanorei32/GSI4D/issues
// @website		http://yano.teamfruit.net/~rei/
// @namespace	http://yano.teamfruit.net/~rei/
// @updateURL	https://raw.githubusercontent.com/yanorei32/GSI4D/master/gsi4d.user.js
// @license		MIT License
// @run-at		document-end
// @grant		none
// ==/UserScript==




(function () {
    'use strict';

    function debounce(func, wait) {
        let timeout;
        return function() {
            const context = this, args = arguments;
            const later = function() {
                timeout = null;
                func.apply(context, args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    const site = {
        reference: {
            isBlackList: false,
            color: '#0F01',
            list: [
                // Microsoft
                'windows.com',
                'msdn.microsoft.com',
                'docs.microsoft.com',
                // Oracle
                'docs.oracle.com',
                // Mozilla
                'developer.mozilla.org',
                // Google
                'cloud.google.com',
                'developers.google.com',
                // RedHat
                'access.redhat.com/documentation',
                // Docker
                'hub.docker.com',
                // GitHub
                'github.com',
                // OSDN
                'osdn.net',
                // sourceforge
                'sourceforge.net',
                // Golang
                'golang.org',
                'godoc.org',
                // Ruby
                'ruby-lang.org',
                'ruby-doc.org',
                'railsdoc.com',
                'rubygems.org',
                // Python
                'postgresql.org',
                'python.org',
                'requests-docs-ja.readthedocs.io',
                'python-requests.org',
                // Raspberry Pi
                'raspberrypi.org',
                // IPA
                'ipa.go.jp',
                // w3school.com
                'w3schools.com',
                // PHP
                'php.net',
                // Apache
                'apache.org',
                // Unity 3D
                'docs.unity3d.com',
                // Rustlang
                'doc.rust-lang.org',
                'rust-lang.org',
                'docs.rs',
                'source.chromium.org',
                'graphql.org',
                'docs.diesel.rs',
                'sm.alliedmods.net',
            ],
        },

        recommend: {
            isBlacklist: false,
            color: '#0FF1',
            list: [

                '30secondsofcode.org',
                'actix.rs',
                'pypi.org',
                'andreasbm.github.io',
                'arewewebyet.org',
                'arewegameyet.rs',
                'arewedistributedyet.rs',
                'arewefastyet.com',
                'areweguiyet.com',
                'gist.github.com',
                'mysqltutorial.org',
                'awesome-rust.com',
                'awesome.red-badger.com',
                'blog.cloudflare.com',
                'blog.logrocket.com',
                'blog.trailofbits.com',
                'cbyexample.com',
                'cheat.sh',
                'cheatography.com',
                'cheatsheetseries.owasp.org',
                'codechalleng.es',
                'cppcheatsheet.com',
                'cpppatterns.com',
                'cppreference.com',
                'crates.io',
                'csharp-station.com',
                'css-tricks.com',
                'csslayout.io',
                'ctf101.org',
                'dev.to',
                'devdocs.io',
                'developer.amazon.com',
                'developer.apple.com',
                'developer.mozilla.org',
                'developer.valvesoftware.com',
                'doc.qt.io',
                'doc.rust-lang.org',
                'docs.near.org',
                'digitalocean.com',
                'freecodecamp.org',
                'codeacademy.com',
                'geeksforgeeks.org',
                'getfrontend.tips',
                'golang.org',
                'grepper.com',
                'htmq.com',
                'learnxinyminutes.com',
                'lib.rs',
                'martin.kleppmann.com',
                'mui.com',
                'nodejs.dev',
                'os.phil-opp.com',
                'programming-idioms.org',
                'realpython.com',
                'refactoring.guru',
                'roadmap.sh',
                'rosettacode.org',
                'rust-lang.github.io',
                'rust-unofficial.github.io',
                'rust-lang-nursery.github.io',
                'rustwasm.github.io',
                'searchcode.com',
                'serde.rs',
                'source.chromium.org',
                'sourcegraph.com',
                'sourcemod.net',
                'systemdesign.one',
                'tauri.app',
                'tohoho-web.com',
                'tokio.rs',
                'tutorialspoint.com',
                'wiki.osdev.org',
                'windowscentral.com',
                'webassemblyman.com',
                'composingprograms.com',
                'learncomputerscienceonline.com',
                'exploit-db.com',
                'infoq.com',
                'yew.rs',
                'zenrows.com',
            ],
        },

        recommendForum: {
            isBlacklist: false,
            color: '#3331',
            list: [
                'stackexchange.com',
                'stackoverflow.com',
                'superuser.com',
                'teratail.com',
                'askubuntu.com',
                'reddit.com',
                'answers.unity.com',
                'indiehackers.com',
                'medium.com',
                'alliedmods.net',
            ],
        },

        // 任意のユーザーが使えるサービス。比較的良質な物が多い。
        publicService: {
            isBlacklist: false,
            color: '#FF01',
            list: [
                'qiita.com',
            ],
        },

        blackList: {
            isBlacklist: true,
            color: null,
            list: [
                // Wikipedia スクレイピング(?)
                'wikiwand.com',

                // 微妙な入門講座が引っかかった事があった。
                'employment.en-japan.com',

                // 誤った情報を大々的に掲載している。
                'profession-net.com',
                'symmetric.co.jp',
                'mupon.net',
                'marucoblog.com',
                'suke-log.com',
                'proengineer.internous.co.jp',

                // ADBlockerが有効だとコンテンツを見せない
                'server-setting.info',

                // 侍エンジニア。画像が多くて嫌い。
                'sejuku.net',

                // 画像や広告が多くて嫌い。
                'techacademy.jp',
                'programming-study.com',
                'codecamp.jp',
                'tadaken3.hatenablog.jp',
                'udemy.benesse.co.jp',
                'techplay.jp',
                'furien.jp',
                'eng-entrance.com',
                'unitopi.com',
                'internetacademy.jp',
                'kurashi-no.jp',
                'kokinn.com',

                // コピペ(翻訳)サイト
                'bunnyinside.com',
                'forsenergy.com',
                'jp.mytory.net',
                'phpspot.net/php/man/',
                'code.i-harness.com',
                'stackovernet.com',
                'stackoverrun.com',
                'codeday.me',
                'code-examples.net',
                'code-adviser.com',
                'kotaeta.com',
                'tutorialmore.com',
                'living-sun.com',
                'it-swarm.net',
                'voidcc.com',
                'qastack.jp',
                'coder.work',
                'it-swarm.dev',
                'sobrelinux.info',

                // AdSite
                'solvusoft.com',
                'reviversoft.com',
                'dll-files.com',
                'softonic.com',
                'softonic.jp',
                'systweak.com',
                'chip.de',
                'qpdownload.com',
                'jaleco.com',
                'findmysoft.com',
                'akvatoriyal.ru',
                '89139849001.ru',
                'ukgorod37.ru',
                'krasota-olimpia.ru',
                'korobkaoo.ru',
                'bkrolik.ru',
                'hockorder.ru',
            ],
        },
    };

    const SearchTypes = {
        Default: '',
        Image: 'isch',
        Video: 'vid',
        News: 'nws',
        Shop: 'shop',
        Books: 'bks',
        Patent: 'ptd',
        Unknown: null,
    };

    const deleteElement = (e) => {
        if (e.parentElement !== null)
            e.parentElement.removeChild(e);
    };

    const formatGSI4DLog = (log) => {
        if (!log) {
            return 'No log to report';
        }
        if (!log.blockedCount && !log.trackedCount) {
            return 'No blocked or tracked connections';
        }
        return `GSI4D Blocked: ${log.blockedCount} Tracked: ${log.trackedCount}`;
    };

    const pageStyle = {
        PC: {
            supportSearchTypes: [
                SearchTypes.Default,
                SearchTypes.Video,
                SearchTypes.Image,
            ],


            getLinkElems: (searchType, parentElement) => {
                let linkElements;
                if (searchType === SearchTypes.Image) {
                    linkElements = parentElement.querySelectorAll('a.VFACy.kGQAp.sMi44c.lNHeqe');
                } else {
                    linkElements = parentElement.querySelectorAll('div.g a:not(.fl):not(.GHDvEf)');
                }
                return linkElements || [];
            },

            coloriseCandidateByLinkElem: (searchType, linkElem, color) => {
                const isImageSearch = searchType === SearchTypes.Image;
                const candidateElem = isImageSearch ? linkElem.parentElement : linkElem.parentElement.parentElement.parentElement;
                if (!candidateElem) {
                    return;
                }
                candidateElem.style.backgroundColor = color;
            },


            // Delete the element containing the candidate
            // link, which is the grandparent of the link.
            deleteCandidateByLinkElem: (searchType, linkElem) => {
                switch (searchType) {
                    case SearchTypes.Image:
                        deleteElement(linkElem.parentElement);
                        return;
                    case SearchTypes.Video:
                        deleteElement(
                            linkElem.parentElement.parentElement
                                .parentElement
                        );
                        return;
                    case SearchTypes.Audio:
                        deleteElement(
                            linkElem.parentElement.parentElement
                                .parentElement
                                .parentElement
                        );
                        return;
                    default:
                        return;
                }
            },

            writeLog: (st, formatedLog) => {
                if (st === SearchTypes.Image)
                    return;

                document.getElementById('result-stats').innerHTML += formatedLog;
            },

            after: (st) => {
                if (st !== SearchTypes.Image) return;

                const observerOptions = {childList: true, subtree: true}; // Added subtree to observe deeper changes

                const processMutations = debounce((records, observer) => {
                    for (const record of records) {
                        for (const addedNode of record.addedNodes) {
                            if (addedNode.nodeType == Node.ELEMENT_NODE) {
                                linkProcess(st, addedNode);
                            }
                        }
                    }
                }, 300);

                const observer = new MutationObserver(processMutations);


                // Start observing
                observer.observe(document.querySelector('.islrc'), observerOptions);
            },

        },
        Phone: {
            supportSearchTypes: [],


            // Get the links to the results
            getLinkElems: (searchType, parentElement) => {
                // If we're searching for images, get the image links
                if (searchType === SearchTypes.Image)
                    return document.querySelectorAll('.iKjWAf');

                // Otherwise, get the web links
                try {
                    return parentElement.querySelectorAll('div.kCrYT>a');
                } catch (e) {
                    return [];
                }
            },

            // The linkE parameter is the link element that was clicked on.
            // The color parameter is the color to use to highlight the candidate
            // link elements.
            coloriseCandidateByLinkElem: (searchType, linkE, color) => {
                if (!linkE) {
                    return;
                }
                if (searchType === SearchTypes.Image) {
                    linkE.style.backgroundColor = color;
                    return;
                }

                linkE.parentElement.parentElement.style.backgroundColor = color;
            },

            deleteCandidateByLinkElem: (searchType, linkElem) => {
                if (searchType === SearchTypes.Image) {
                    const imageContainer = linkElem.parentElement;
                    if (imageContainer) {
                        deleteElement(imageContainer);
                    }
                    return;
                }

                const articleContainer = linkElem.parentElement.parentElement.parentElement;
                if (articleContainer) {
                    deleteElement(articleContainer);
                }
            },


            writeLog: (searchType, formattedLog) => {
                if (searchType === SearchTypes.Image)
                    return;

                const logCardContainer = document.createElement('div');
                const logCard = document.createElement('div');
                const logCardSpan = document.createElement('span');
                const logCardText = document.createElement('div');

                logCardContainer.classList.add('ZINbbc', 'xpd', 'O9g5cc', 'uUPGi', 'gsi4d');
                logCard.classList.add('kCrYT');
                logCardText.classList.add('BNeawe', 's3v9rd', 'AP7Wnd');
                logCardText.textContent = formattedLog;

                logCardSpan.appendChild(logCardText);
                logCard.appendChild(logCardSpan);
                logCardContainer.appendChild(logCard);

                const mainNode = document.getElementById('main');
                if (mainNode && mainNode.childNodes.length > 1)
                    mainNode.childNodes[1].after(logCardContainer);
                else
                    document.body.appendChild(logCardContainer);
            },

            after: (st) => {
                if (st !== SearchTypes.Image) return;

                const observerOptions = {childList: true, subtree: true}; // Added subtree to observe deeper changes

                const observerCallback = (records, observer) => {
                    // Pause the observer
                    observer.disconnect();

                    for (const record of records) {
                        if (record.type !== "childList") continue; // Only process childList mutations

                        for (const addedNode of record.addedNodes) {
                            if (addedNode.nodeType == Node.ELEMENT_NODE) {
                                linkProcess(st, addedNode);
                            }
                        }
                    }

                    // Restart the observer after a delay to reduce CPU usage
                    setTimeout(() => {
                        observer.observe(document.querySelector('#islrg'), observerOptions);
                    }, 300); // 300ms delay
                };

                const observer = new MutationObserver(observerCallback);

                // Start observing
                observer.observe(document.querySelector('#islrg'), observerOptions);
            },

        },
    };

    const getPageStyle = () => {
        if (window.navigator.userAgent.toLowerCase().indexOf('mobile') !== -1) {
            console.log('PageStyle: Phone');
            return pageStyle.Phone;
        }

        console.log('PageStyle: PC');
        return pageStyle.PC;
    };

    const parseURL = (url) => {
        if (!url.startsWith('/url?') && url.indexOf('://'))
            return url;

        if (!url.startsWith('/url?')) {
            console.error('Unsupported URL: ' + url);
            return '';
        }

        const paramStrs = url.split('?')[1].split('&');

        for (const paramStr of paramStrs) {
            const parsedParam = paramStr.split('=');

            if (parsedParam[0] !== 'q')
                continue;

            if (parsedParam.length !== 2)
                continue;

            if (parsedParam[1].indexOf('://')) {
                return parsedParam[1];
            }

            return decodeURI(parsedParam[1]);
        }

        console.error('Failed to read URL from /url?: ' + url);
        return '';
    };


    const parseSearchURL = (url) => {
        const parameterPairs = url.split('?')[1].split('&');

        for (const parameterPair of parameterPairs) {
            const parameter = parameterPair.split('=');

            if (parameter[0] !== 'tbm')
                continue;

            if (parameter.length !== 2)
                continue;

            for (const [_, searchType] of Object.entries(SearchTypes))
                if (parameter[1] === searchType)
                    return searchType;

            return SearchTypes.Unknown;
        }

        return SearchTypes.Default;
    };


    const parseLinkElement = (st, link) => {
        if (link.tagName === 'DIV') {
            const parsedJSON = JSON.parse(link.innerHTML);

            if (parsedJSON['ru'] == undefined) {
                console.error('Link element has not ru.');
                console.error(link);
                return '';
            }

            return parsedJSON['ru'];
        }

        const rawHref = link.getAttribute('href');

        if (rawHref === null) {
            console.error('Link element has not href.');
            console.error(link);
            return '';
        }

        return parseURL(rawHref);
    };

// Optimization: Use Set for blacklist checks for O(1) inclusion checks
    const blacklistSet = new Set(site.blackList.list);

    const linkProcess = (st, parentE) => {
        const links = p.getLinkElems(st, parentE);

        // Cache commonly used functions and values
        const deleteCandidate = p.deleteCandidateByLinkElem;
        const coloriseCandidate = p.coloriseCandidateByLinkElem;

        for (const link of links) {
            const url = parseLinkElement(st, link);
            if (!url) continue;

            const urlHostname = new URL(url).hostname;

            // Optimization: Use Set for O(1) blacklist check
            if (blacklistSet.has(urlHostname)) {
                deleteCandidate(st, link);
                log.blockedCount++;
                continue;
            }

            // Original code to check against non-blacklisted categories
            let isMatched = false;
            for (const [category, siteType] of Object.entries(site)) {
                if (siteType.isBlacklist) continue;  // Skip blacklisted category
                for (const domain of siteType.list) {
                    if (urlHostname === domain || urlHostname.endsWith('.' + domain)) {
                        coloriseCandidate(st, link, siteType.color);
                        log.trackedCount++;
                        isMatched = true;
                        break;  // Break out of inner loop
                    }
                }
                if (isMatched) break;  // Break out of outer loop
            }
        }
    };

    const currentST = parseSearchURL(location.href);

    if (currentST === SearchTypes.Unknown) {
        console.debug('Unknown search type');
        return;
    }

    const p = getPageStyle();

    if (!p.supportSearchTypes.includes(currentST)) {
        console.debug('Unsupported search type in this platform.');
        return;
    }

    const log = {
        blockedCount: 0,
        trackedCount: 0,
    };

    linkProcess(currentST, document);

    p.writeLog(currentST, formatGSI4DLog(log));
    p.after(currentST);
})();
