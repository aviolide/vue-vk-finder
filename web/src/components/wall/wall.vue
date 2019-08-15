<template lang="pug">
  div
    nav.navbar.navbar-default


    main.container
      .row
        .col-md-6
          .media
            .media-left
              img(
                :src="friend.photo_100"
              )
            .media-body
              h2.media-heading {{ friend.last_name}} {{ friend.first_name }}
              p {{ friend.status }}
              p(v-if="friend.country") Country: {{ friend.country.title }}
              p(v-if="friend.city") City: {{ friend.city.title }}

          hr
          div
            .panel(
              v-if="friend.wall"
              v-for="item in friend.wall"
            ).panel-default
              .panel-body
                img(
                  v-if="item.attachments && item.attachments[0].photo"
                  :src="item.attachments[0].photo.sizes[2].url"
                  class="panel-body-img"
                )
                p(
                  v-if="item.attachments && item.attachments[0].link"
                  :href="item.attachments[0].link.url"
                  )
                p {{ check(item) }}
                p {{ item.text }}
              .panel-footer
                span posted {{ parseDate(item.date) }} {{ friend.first_name }}


        .col-md-3
          .panel.panel-default
            .panel-body
              h4 Friends
              ul(v-for="friend in friend.common_friends")
                li
                  a(:href="'https://vk.com/id' + friend.id + ''") {{ friend.first_name }}



</template>
<script src="./wall.ts" lang="ts"></script>