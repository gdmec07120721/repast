// JavaScript Document
 $( document ).on( "pagecreate", "#demo-page", function() {
            // Swipe to remove list item
            //初始化滑动删除元素函数
            $( document ).on( "swipeleft swiperight", "#list li", function( event ) {
                var listitem = $( this ),
                    // These are the classnames used for the CSS transition
                    dir = event.type === "swipeleft" ? "left" : "right",
                    // Check if the browser supports the transform (3D) CSS transition
                    transition = $.support.cssTransform3d ? dir : false;
                    confirmAndDelete( listitem, transition );
            });
            // If it's not a touch device...
            //判断设备是否触屏
            if ( ! $.mobile.support.touch ) {
                // Remove the class that is used to hide the delete button on touch devices
                //移除触屏设备的删除按钮样式
                $( "#list" ).removeClass( "touch" );
                // Click delete split-button to remove list item
                //初始化按钮单击事件
                $( ".delete" ).on( "click", function() {
                    var listitem = $( this ).parent( "li" );
                    confirmAndDelete( listitem );
                });
            }
            //初始化删除对话框函数
            function confirmAndDelete( listitem, transition ) {
                // Highlight the list item that will be removed
                //用ui-btn-active样式高亮显示欲删除列表项
                listitem.children( ".ui-btn" ).addClass( "ui-btn-active" );
                // Inject topic in confirmation popup after removing any previous injected topics
                //先删除确认对话框主题内容，再为其添加新内容
                $( "#confirm .topic" ).remove();
                listitem.find( ".topic" ).clone().insertAfter( "#question" );
                // Show the confirmation popup
                //弹出对话框
                $( "#confirm" ).popup( "open" );
                // Proceed when the user confirms
                //绑定对话框处理结果
                $( "#confirm #yes" ).on( "click", function() {
                    // Remove with a transition
                    //移除列表项，并具有转换特效
                    if ( transition ) {
                        listitem
                            // Add the class for the transition direction
                            //添加转换样式
                            .addClass( transition )
                            // When the transition is done...
                            .on( "webkitTransitionEnd transitionend otransitionend", function() {
                                // ...the list item will be removed
                                //...删除列表项
                                listitem.remove();
                                // ...the list will be refreshed and the temporary class for border styling removed
                                //刷新列表
                                $( "#list" ).listview( "refresh" ).find( ".border-bottom" ).removeClass( "border-bottom" );
                            })
                            // During the transition the previous button gets bottom border
                            //为转化拖动时添加边框样式（即转换特效时为目标添加边框样式）
                            .prev( "li" ).children( "a" ).addClass( "border-bottom" )
                            // Remove the highlight
                            //移除ui-btn-actibe样式
                            .end().end().children( ".ui-btn" ).removeClass( "ui-btn-active" );
                    }
                    // If it's not a touch device or the CSS transition isn't supported just remove the list item and refresh the list
                    //若为非移动设备/不支持跳转的css样式则仅做删除列表并刷新
                    else {
                        listitem.remove();
                        $( "#list" ).listview( "refresh" );
                    }
                });
                // Remove active state and unbind when the cancel button is clicked
                //按取消时移除ui-btn-active的活动样式并解绑
                $( "#confirm #cancel" ).on( "click", function() {
                    listitem.removeClass( "ui-btn-active" );
                    $( "#confirm #yes" ).off();
                });
            }
        });
var duoshuoQuery = {short_name:"jqmapi"};
    (function() {
        var ds = document.createElement('script');
        ds.type = 'text/javascript';ds.async = true;
        ds.src = (document.location.protocol == 'https:' ? 'https:' : 'http:') + '//static.duoshuo.com/embed.unstable.js';
        ds.charset = 'UTF-8';
        (document.getElementsByTagName('head')[0]
         || document.getElementsByTagName('body')[0]).appendChild(ds);
    })();