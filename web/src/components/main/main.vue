<template lang="pug">
  .div
    .multiselect-container
      Multiselect(
        v-model="query"
        :options="list"
        :searchable="true"
        :allow-empty="true"
        :preselect-first="false"
        :clear-on-select="true"
        :limit="10"
        :custom-label="customLabel"
        :placeholder="'Enter id'"
        :multiple="true"
        :taggable="true"
        @tag="addTag"
        @remove="removeTag"
        @select="addTag"
        label="first_name"
        track-by="id"
      )
      button.alt-button(
        @click="countCommonFriends"
      ) Common friends

    .row
      .column(v-for="friend in list")
        .card(
            :style="{opacity: friend.opacity }"
          )
          .additional(
            @mouseover="checkFriends(friend.id)"
            @click="goWall(friend)"
            )
            .user-card
              Loading(
                :active="friend.isLoading"
                :can-cancel="true"
                :is-full-page="false"
              )
              .level.center {{ friend.sex === 1 ? 'female' : 'male'}}
              .points.center {{ friend.online === 1 ? 'online' : 'offline '}}
              img.icon.center(
                :src="friend.photo_100"
              )


            .more-info
              h1 {{ friend.last_name}} {{ friend.first_name }}
              .coords(v-if="friend.bdate")
                span BirthDay
                span {{ friend.bdate }}
              .coords(v-if="friend.country && friend.city")
                span City
                span {{ friend.country.title }} {{ friend.city.title }}
              .stats(v-if="!friend.is_closed")
                div(v-if="friend.friends_count")
                  .title Friends
                  i.fa.fa-trophy
                  .value {{ friend.friends_count }}
                div(v-if="friend.friends_count")
                  .title Common friends
                  i.fa.fa-trophy
                  .value {{ friend.common_friends_count }}
              .stats(v-else)
                div
                  .title Profile is private


          .general
            h1 {{ friend.last_name}} {{ friend.first_name }}
            p {{ friend.status }}
            span.more(v-if="friend.last_seen") Last seen {{ parseDate(friend.last_seen.time) }}


</template>
<script src="./main.ts" lang="ts"></script>