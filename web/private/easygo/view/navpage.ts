/// <reference path="compat.ts" />

$(function () {

    /**判断是否选择起点 */
    var isStart = false;
    $('.start_input a').click(function () {
        isStart = true;
    });

    $('#page-index .center-container .a-btn').click(function () {
        isStart = false;
    });

    $('#page-index .end_input').click(function () {
        isStart = false;
    });
    $(document).on('pagebeforeshow', "#page-index-new", function (e) {
        if (isStart) {
            $('#page-index-new .center-container input').attr('placeholder', '请输入起始点');
        } else {
            $('#page-index-new .center-container input').attr('placeholder', '请输入目的地');
        }
    });
    /**判断是否是选择起点 end */
    $('.all-select').bind('swipeleft', function () {
        $(this).next().find('.a-dot').removeClass('active');
        $(this).next().find('.a-dot').eq(1).addClass('active');
        $(this).animate({
            left: '-100%'
        }, 'slow');
    });
    $('.all-select').bind('swiperight', function () {
        $(this).next().find('.a-dot').removeClass('active');
        $(this).next().find('.a-dot').eq(0).addClass('active');
        $(this).animate({
            left: '0%'
        }, 'slow');
    });
    $('.all-select .select-block').each(function () {
        $(this).click(function () {
            if ($(this).find('.search-text').text()) {
                var text = $(this).find('.search-text').text();
            } else {
                var text = $(this).find('span').text();
            }
            if (isStart == true) {
                $('#start_position').trigger('click');
            } else {
                $('#end_position').trigger('click');
            }
            $('.visual-input input').val(text);
            setTimeout(function () {
                $('.visual-input input').focus();
            }, 200);
        });
    });
    $('#new-search').click(function () {
        if (isStart) {
            $('#start_position').trigger('click');
        } else {
            $('#end_position').trigger('click');
        }
    });
    $(document).scroll(function () {
        let wh = $(window).scrollTop();
        if (wh >= 310) {
            $('#page-index-new .center-container').css({
                'position': 'fixed',
                'top': '0'
            })
        } else if (wh < 210) {
            $('#page-index-new .center-container').css({
                'position': 'relative',
            })
        }
    });

    $(document).on('pageinit', '#page-index-new', function (e) {
        var t = new Date().valueOf();
        "null" != JSON.stringify(mGetItem("page-index-new")) &&
            parseInt(mGetItem("page-index-new-time")) > t - http_cache_time ?
            (renderHospitalRoom(mGetItem("page-index-new")),
                $('#left-slide-new .work').first().trigger('click'),
                console.info("读取医院信息缓存")) :
            ($.ajax({
                type: "get",
                url: SVE_H5_URL + "api/info/getRoomsList.php",
                async: true,
                success: function (data) {
                    if (data) {
                        renderHospitalRoom(data);
                        mSetItem("page-index-new", data);
                        mSetItem("page-index-new-time", new Date().valueOf());
                    } else {
                        console.info('请求数据出错.');
                    }
                },
                error: function (err) {
                    console.warn("get page-index-new data error: " + err);
                },
                complete: function () {
                    console.info('请求楼层房间信息数据');
                    $('#left-slide-new .work').first().trigger('click');
                }
            }));
    });

    function renderHospitalRoom(data) {
        var floorlist = JSON.parse(data);

        var html = "",
            buildname = "",
            floor = "",
            roomName = "",
            roomId = "";

        for (var x in floorlist) {
            var html_head;
            buildname = floorlist[x]['BuildingNum'];
            if (floorlist[x].floor_data.length != 0) {
                html_head += '<li class="work" data-id="' + x + '">' + buildname + '</li>';
            } else {
                html_head += '<li class="work" data-id="' + x + '" style="display:none;">' + buildname + '</li>';
            }
            $('#left-slide-new ul').html(html_head);
        }
        $('#left-slide-new .work').each(function () {
            let buildId: any = 0;
            $(this).one('click', function () {
                buildId = $(this).attr('data-id');
                setTimeout(function () {
                    $('#page-index-new .a-floor').eq(buildId).find('.add-list h3').first().trigger('click');
                }, 200);
            });
            $(this).click(function () {
                $(this).siblings().removeClass('active');
                $(this).addClass('active');

                $('#page-index-new .a-floor').eq(buildId).siblings().hide();
                $('#page-index-new .a-floor').eq(buildId).show();
            });
        });
        for (var n in floorlist) {
            buildname = floorlist[n]['BuildingNum'];
            html += '<li class="a-floor">';
            for (let m in floorlist[n].floor_data) {
                floor = floorlist[n].floor_data[m]['FloorID'];
                if (floorlist[n].floor_data[m].room_data.length != 0) {
                    if (m == "0") {
                        html += '<ul class="add-list add-list-first"><h3><span class="buildName">' + buildname + '</span> <span class="floorName">' + floor + '</span><i class="add-arrow"></i></h3><div class="adds">';
                    } else {
                        html += '<ul class="add-list"><h3><span class="buildName">' + buildname + '</span> <span class="floorName">' + floor + '</span><i class="add-arrow"></i></h3><div class="adds">';
                    }
                    for (var i in floorlist[n].floor_data[m].room_data) {
                        roomName = floorlist[n].floor_data[m].room_data[i]['Name'];
                        roomId = floorlist[n].floor_data[m].room_data[i]['Room_ID'];
                        html += '<li class="a-add"><a href="#page-index" data-roomid="' + roomId + '">' + roomName + '</a></li>';
                    }
                    html += '</div></ul>';
                }
            }
            html += '</li>';
        }
        $('#page-index-new .floor-list').html(html);
        $('#page-index-new .add-list').eq(0).addClass('add-list-first');
        $(".a-box .add-list").each(function () {
            let ch, adds;
            //let toggle: any = $(this).find('h3').toggle;
            $(this).find('h3').click(
                function () {
                    if ($(this).next().height()===45) {
                        $(this).next().css('visibility', 'visible');
                        $(this).find('.add-arrow').css('animation-name', 'arrowdown');
                        ch = $(this).next().height() + 45;
                        // $(this).next().animate({height:'0px'},'slow');
                        $(this).parentsUntil('.a-floor').animate({
                            height: ch + 'px'
                        });
                    } else {
                        adds = $(this).next();
                        $(this).find('.add-arrow').css('animation-name', 'arrowup');
                        $(this).parentsUntil('.a-floor').animate({
                            height: '45px'
                        }, 0, function () {
                            adds.css('visibility', 'hidden');
                        });
                    }
                }
            );
        });
        $("#page-index-new .a-add a").each(function () {
            $(this).bind('click', function () {
                var FbuildName = $(this).parentsUntil('.add-list').prev().find('.buildName').text();
                var FfloorName = $(this).parentsUntil('.add-list').prev().find('.floorName').text();
                let reg = /-[0-9]|[0-9]/;
                let event = null;

                FfloorName = reg.exec(FfloorName) + "F";
                if (isStart) {
                    event = "getstartloc";
                } else {
                    event = "getloc";
                }
                if (MiaokitDC.DC.m_pNavigator.m_pSiteList != null) {
                    findSta($(this).attr('data-roomid'), FbuildName, FfloorName, event);
                } else {
                    Froomloc = $(this).attr('data-roomid');
                    buildName = FbuildName;
                    floorName = FfloorName;
                    Fevent = event;
                }
            });
        });
        // $(document).bind('pagehide','page-index-new', function(){
        //     $(".a-box .add-list h3").eq(0).trigger('click');
        // });
        // $(document).on('pagebeforehide', '#page-index-new', function () {
        //     if ($(".adds").eq(0).css("visibility") == "visible") {
        //         var FH = $(".a-box .add-list .adds").eq(0).height();
        //         $(".a-box .add-list").eq(0).css('height', FH + 45 + 'px');
        //     }
        // });
    }

    $('.choose-set-point .close-choose').bind('click', function () {
        $('.choose-set-point').hide();
        icondown();
        if (Posfault) {
            LockScene();
        }
    });
    $('#left-slide-new .work').each(function () {
        let buildId: any = 0;
        $(this).one('click', function () {
            buildId = $(this).attr('data-id');
            setTimeout(function () {
                $('#page-index-new .a-floor').eq(buildId).find('.add-list h3').first().trigger('click');
            }, 200);
        });
        $(this).click(function () {
            $(this).siblings().removeClass('active');
            $(this).addClass('active');

            $('#page-index-new .a-floor').eq(buildId).siblings().hide();
            $('#page-index-new .a-floor').eq(buildId).show();
        });
    });

    $('.bluetooth-box .bottom-text').click(function () {
        $('#page-index-new').css('height', 'auto');
        $('#page-bluetooth').animate({
            left: '100vw'
        }, 'fast', function () {
            console.log('hide');
            $('#page-bluetooth').css('display', 'none');
        });
    });
    $('.compass').click(function () {
        $('.reset').trigger('click');
    });
});

function findSta(loc, b, f, e) {
    if (Posfault) {
        Froomloc = "";
        buildName = "";
        floorName = "";
        let time = 500;
        if (GLOBAL.Navigating) {
            $("#replanning").trigger("click");
            time = 1000;
        }
        setTimeout(function () {
            SwitchScene(b);
            SwitchLayer(f);
            for (let pSite of MiaokitDC.DC.m_pNavigator.m_pSiteList) {
                if (pSite.m_pSerial === loc) {
                    let locs = pSite.m_mPoint.Object.m_mPosition;
                    Engine.g_pInstance.project.SetPos(locs, e);
                    /**未知原因Y轴位置相反 */
                    let nlocs = new Vector3(locs.x, locs.y, -locs.z);
                    if (MiaokitDC.DC.m_nCurWork == 0)
                        SetCamera(nlocs, 0, 0, 300);
                    else
                        SetCamera(nlocs, 0, 0, 100);
                    break;
                }
            }

        }, time);
    }
}

function iconup(height) {
    if (height == 0) {
        height = 205;
    }
    $('.reset').animate({
        bottom: 16 + 16 + height + 'px'
    }, 'fast');
    $('.floor_box').animate({
        bottom: 16 + 16 + height + 'px'
    }, 'fast');
    $(".search-navigate-btn-container").hide();
}

function icondown() {
    $('.floor_box').animate({
        bottom: '5.25rem'
    }, 'fast');
    $('.reset').animate({
        bottom: '5.25rem'
    }, 'fast');

    $(".navigation_btn").hide();
    $(".search-navigate-btn-container").show();
}