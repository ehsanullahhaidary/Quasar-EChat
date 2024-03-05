<template>
  <q-page>
    <div class="q-mx-md q-my-sm row items-end q-col-gutter-md">
      <div class="col">
        <q-input
          bottom-slots
          v-model="newXChatContent"
          placeholder="What's happening?"
          counter
          maxlength="280"
          autogrow
          class="newXChatInput"
        >
          <template v-slot:before>
            <q-avatar size="xl">
              <img
                src="https://pbs.twimg.com/profile_images/1655602481970257920/VO1wJyaJ_400x400.jpg"
              />
            </q-avatar>
          </template>
        </q-input>
      </div>
      <div class="col col-shrink">
        <q-btn
          @click="addNewXChat"
          :disable="newXChatContent"
          no-caps
          unelevated
          rounded
          color="primary"
          label="X Send"
          class="q-mb-lg"
        />
      </div>
    </div>
    <q-separator />
    <q-list separator>
      <transition-group
        appear
        enter-active-class="animated fadeIn"
        leave-active-class="animated fadeOut"
      >
        <q-item
          v-for="xchat in xchats"
          :key="xchat.date"
          class="xchat-tweet q-py-md"
        >
          <q-item-section top avatar>
            <q-avatar size="xl">
              <img
                src="https://pbs.twimg.com/profile_images/1655602481970257920/VO1wJyaJ_400x400.jpg"
              />
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label class="text-weight-bold text-subtitle1"
              >Ehsanullah Haidary
              <span class="grey-7 text-body1">@Ehsan_Haidary</span>
            </q-item-label>
            <q-item-label class="xchat-content text-body1">
              {{ xchat.content }}
            </q-item-label>
            <div class="xchat-icons row justify-between q-mt-sm">
              <q-btn
                flat
                round
                size="sm"
                color="grey"
                icon="fa-regular fa-comment"
              />
              <q-btn
                flat
                round
                size="sm"
                color="grey"
                icon="fas fa-retweet"
              /><q-btn
                flat
                round
                size="sm"
                color="grey"
                icon="far fa-heart"
              /><q-btn
                @click="deleteXChat(xchat)"
                flat
                round
                size="sm"
                color="grey"
                icon="fas fa-trash"
              />
            </div>
          </q-item-section>

          <q-item-section side top>
            {{ relativeDate(xchat.date) }}
          </q-item-section>
        </q-item>
      </transition-group>
    </q-list>
  </q-page>
</template>

<script>
import { defineComponent, computed } from "vue";
import { formatDistance } from "date-fns";

export default defineComponent({
  name: "HomePage",
  data() {
    return {
      newXChatContent: "",
      xchats: [
        {
          content:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique sunt dicta officia ab. Sint est in officia ipsa quam adipisci sit quia aperiam nesciunt atque, quas, provident vel doloribus voluptatibus.",
          date: 1709636487161,
        },
        {
          content: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
          date: 1709636529097,
        },
        {
          content:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique sunt dicta officia ab. Sint est in officia ipsa quam adipisci sit quia aperiam.",
          date: 1709636671480,
        },
        {
          content:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique sunt dicta officia ab. Sint est in officia.",
          date: 1709636678964,
        },
      ],
    };
  },
  methods: {
    relativeDate(value) {
      return formatDistance(value, new Date());
    },
    addNewXChat() {
      const newXChat = {
        content: this.newXChatContent,
        date: Date.now(),
      };
      this.xchats.unshift(newXChat);
      this.newXChatContent = "";
    },
    deleteXChat(xchat) {
      const dateToDelete = xchat.date;
      const index = this.xchats.findIndex(
        (xchat) => xchat.date === dateToDelete
      );
      this.xchats.splice(index, 1);
    },
  },

  computed: {},
});
</script>

<style lang="scss">
.newXChatInput {
  textarea {
    font-size: 20px;
    line-height: 24px !important;
  }
}
.xchat-content {
  white-space: pre-line;
}

.xchat-icons {
  margin-left: -5px;
}
</style>
