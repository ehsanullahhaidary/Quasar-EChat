<template>
  <q-page class="relative-position">
    <q-scroll-area class="absolute scroll__area">
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
          enter-active-class="animated fadeIn slow"
          leave-active-class="animated fadeOut slow"
        >
          <q-item
            v-for="xchat in xchats"
            :key="xchat.id"
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
                <span class="xchat-id-time text-body1"
                  >@Ehsan_Haidary<br class="lt-md" /><span class="xchated-dote">
                    · </span
                  >{{ relativeDate(xchat.date) }}</span
                >
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

            <!-- <q-item-section side top>
            {{ relativeDate(xchat.date) }}
          </q-item-section> -->
          </q-item>
        </transition-group>
      </q-list>
    </q-scroll-area>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import { formatDistance } from "date-fns";
import db from "src/boot/firebase";
// import { collection, query, where, onSnapshot } from "firebase/firestore";

export default defineComponent({
  name: "HomePage",
  data() {
    return {
      newXChatContent: "",
      xchats: [
        // {
        //   content:
        //     "Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique sunt dicta officia ab. Sint est in officia ipsa quam adipisci sit quia aperiam nesciunt atque, quas, provident vel doloribus voluptatibus.",
        //   date: 1709636487161,
        // },
        // {
        //   content: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        //   date: 1709636529097,
        // },
        // {
        //   content:
        //     "Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique sunt dicta officia ab. Sint est in officia ipsa quam adipisci sit quia aperiam.",
        //   date: 1709636671480,
        // },
        // {
        //   content:
        //     "Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique sunt dicta officia ab. Sint est in officia.",
        //   date: 1709636678964,
        // },
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
      // this.xchats.unshift(newXChat);
      // Add a new document with a generated id.
      db.collection("xchat")
        .add(newXChat)
        .then((docRef) => {
          console.log("Document written with ID: ", docRef.id);
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });

      this.newXChatContent = "";
    },
    deleteXChat(xchat) {
      db.collection("xchat")
        .doc(xchat.id)
        .delete()
        .then(() => {
          console.log("Document successfully deleted!");
        })
        .catch((error) => {
          console.error("Error removing document: ", error);
        });
    },
  },
  mounted() {
    db.collection("xchat")
      .orderBy("date")
      .onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
          const xchatChange = change.doc.data();
          xchatChange.id = change.doc.id;
          if (change.type === "added") {
            console.log("New xchat: ", xchatChange);
            this.xchats.unshift(xchatChange);
          }
          if (change.type === "modified") {
            console.log("Modified xchat: ", xchatChange);
          }
          if (change.type === "removed") {
            console.log("Removed xchat: ", xchatChange);
            const dateToDelete = xchatChange.id;
            const index = this.xchats.findIndex(
              (findxchat) => findxchat.id === dateToDelete
            );
            this.xchats.splice(index, 1);
          }
        });
      });
  },
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

.xchat-id-time {
  color: $grey-7;
  font-weight: 400;
}
.xchated-dote {
  font-weight: 900;
}
.scroll__area {
  width: 100%;
  height: 100%;
}
</style>
