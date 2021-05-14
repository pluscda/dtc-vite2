<template>
  <div class="px-4 py-4 flex space-x-4 relative">
    <section class="absolute inset-0 grid place-items-center bg-dark" v-show="(showDlg = true)">
      <div class="flex flex-col space-y-2 w-24 h-64">
        <label>Image</label>
        <input />
        <label>Title</label>
        <input />
        <label>Content</label>
        <textarea></textarea>
        <button @click="saveBlog">Save</button>
        <button @click="showDlg = false">Cancel</button>
      </div>
    </section>
    <section class="w-3/4 flex flex-col">
      <div v-for="(item, i) in items" :key="i">
        <img class="block" :src="item.src" />
        <header>
          {{ item.title }}
        </header>
        <p>
          {{ item.description }}
        </p>
      </div>
    </section>
    <nav class="w-1/4">
      <button @click="showAddBlog">Add New</button>
    </nav>
  </div>
</template>

<script>
const items = [
  {
    src: "//unsplash.it/200/200?1",
    title: "101",
    description: "lorem dus dkkd",
  },
  {
    src: "//unsplash.it/200/200?2",
    title: "102",
    description: "lorem dus dkkd2",
  },
];
export default {
  data() {
    return {
      items,
      showDlg: false,
      img:'',
      title:'',
      description:'',
    };
  },
  methods: {
    saveBlog(){
      //get img , title, content here
      // assume that we have it now
      // validation skip here
      const obj =   {
        src: this.img,
        title: this.title,
        description: this.content,
      },
      // AJAX post here to backend; since it has no backend now, we add in array now
      this.items.push(obj);
      this.showDlg = false;
    }
  },

};
</script>

<style></style>
