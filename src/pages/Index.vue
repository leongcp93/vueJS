<template>
  <q-page class="">
    <div class="q-pa-md">
      <q-input
        bottom-slots
        v-model="newNoteContent"
        placeholder="Write your note here..."
        counter
        autogrow
        maxlength="300"
      >
        <template v-slot:after>
          <q-btn round dense flat icon="send" />
        </template>
      </q-input>
    </div>
    <q-separator size="10px" />
    <q-list bordered class="rounded-borders" style="max-width: 600px">
      <q-item-label header>You have 3 Note(s)</q-item-label>
      <div>
        <div v-for="noteContent in notes" :key="noteContent.id">
  <q-item>
    <q-item-section top>
      <q-item-label caption class="text-grey-9">
        {{ noteContent.note }}
      </q-item-label>
    </q-item-section>
    <q-item-section top side>
      <div class="text-grey-9 q-gutter-xs">
        <q-btn
          size="13px"
          flat
          dense
          round
          icon="delete"
          @click="deleteNote(noteContent)"
        />
        <q-btn round dense flat icon="send" @click="addNote" />
      </div>
    </q-item-section>
  </q-item>
  <q-separator size="1px" />
</div>
        <q-separator size="1px" />
      </div>
    </q-list>
  </q-page>
</template>
<script>
import db from "src/boot/firebase";
export default {
  name: "PageIndex",
  data() {
    return {
      basic: false,
      fixed: false,
      newNoteContent: "",
      notes: [],
  /*{
    id: 1,
    note: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea vereprehenderit aspernatur mollitia saepe cupiditate pariatur natus accusantium esse repudiandae nisi velit provident corporis commodi eius fugiat reiciendis non aliquam."
  },
  {
    id: 2,
    note: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea vereprehenderit aspernatur mollitia saepe cupiditate pariatur natus accusantium esse repudiandae nisi velit provident corporis commodi eius fugiat reiciendis non aliquam."
  },
  {
    id: 3,
    note: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea vereprehenderit aspernatur mollitia saepe cupiditate pariatur natus accusantium esse repudiandae nisi velit provident corporis commodi eius fugiat reiciendis non aliquam."
  }*/
    };
  },
  mounted(){
    db.collection["notes"].onSnapshot( snapshot => {
      snapshot.docChanges().forEach(change => {

          let noteChange = change.doc.data();

          if (change.type === "added"){
            console.log("New note: ", noteChange);
            this.notes.unshift(noteChange);
          }

          if (change.type === "modified"){
            console.log("Modified note :", noteChange);
          }

          if (change.type === "removed"){
            console.log("Removed note: ", noteChange);
          }
      });
    });
  },
  methods:{

    deleteNote(noteContent){
      let noteId = noteContent.id;

      //doing this to get the real id of the notes
      let index = this.notes.findIndex(noteContent => noteContent.id === noteId);
      this.notes.splice(index, 1);
    },

    addNote() {
      let newNote = {
      // id: this.notes.length + 1,
      note: this.newNoteContent
      };
       // this.notes.unshift(newNote);

    db.collection("notes")
    .add(newNote)
    .then(docRef => {
      console.log("Document written with ID: ", docRef.id);
    })
    .catch(error => {
      console.error("Error adding document: ", error);
    });

  this.newNoteContent = "";
},
  }
};
</script>
