$(document).ready(function() {
    //This is set to 2 since the posts already loaded should be page 1
    nextPage = 7;
    //Set this to match the pagination used in your blog
    pagination = 1;

    //on button click
    $('#load-posts').click(function() {
      for (var i = 0; i < 3; i++) {
        nextPage += i;
        $.ajax({
            //go grab the pagination number of posts on the next page and include the tags
            url: ghost.url.api("posts") + '&include=tags&limit=' + pagination + '&page=' + nextPage,
            type: 'get'
        }).done(function(data) {
            //for each post returned
            $.each(data.posts, function(i, post) {
                //Take the author of the post, and now go get that data to fill in
                $.ajax({
                    url: ghost.url.api("users") + '&filter=id:' + post.author,
                    type: 'get'
                }).done(function(data) {
                    $.each(data.users, function(i, users) {
                        //Now that we have the author and post data, send that to the insertPost function
                        insertPost(post, users);
                    });
                });
            });
        }).done(function(data) {
            //If you are on the last post, hide the load more button
            if (nextPage >= data.meta.pagination.total) {
                $('#load-posts').hide();
            }
        }).fail(function(err) {
            console.log(err);
        });
      }
    })

    function insertPost(postData, authorData) {
        //start the inserting of the html
        var postInfo = '<article class="post home">\
                    <a href="' + postData.url + '">'

        if (postData.Image != null) {
            postInfo += '<section class="cd-intro home" style="background-image: url(' + postData.Image + ')"></section>'
        } else {
            postInfo += '<section class="cd-intro home no-cover"></section>'
        }

        postInfo += '</a>\
                    <section class="post_header home">\
                      <div class="tag">'

        //if there are tags, add each of them to the post
        if (postData.tags.length > 0) {
            for (i = 0; i < postData.tags.length; i++) {
                console.log(postData.tags[i]);
                postInfo += '<a href="/tag/' + postData.tags[i].slug + '">' + postData.tags[i].name + "</a> ";
            }
        }

        //Finish off the html with the time
        //The format for the time will be different, you will have to figure this out
        postInfo += '</div>\
                  <h1><a href="' + postData.url + '">' + postData.title + '</a></h1>\
                  <div class = "header_meta" >\
                    by <a href="/author/' + authorData.url + '">' + authorData.name + '</a> on ' + '<time datetime="' + postData.published_at + '">' + postData.published_at + '</time>\
                  </div>\
                </section>\
            </article>'

        //Append the html to the content of the blog
        $('.container.loop').append(postInfo);
        //incriment next page so it will get the next page of posts if hit again.
        nextPage += 1;
    }
});
