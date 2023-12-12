<template>
  <div class="listcon">
    <div class="title">
      <h2>결과가 나왔습니다~</h2>
    </div>
    <div class="listcon_wrap">
      <div class="listcon_img"></div>
      <div class="listcon_result"></div>

      <div class="comments">
        <div>
          <ul>
            <li v-for="(comment, index) in comments" :key="index">
              <div v-if="comment.isEditing">
                <textarea v-model="comment.editedText"></textarea>
                <button @click="saveComment(index)">저장</button>
              </div>
              <div v-else>
                {{ comment.text }}
                <button @click="deleteComment(index)">삭제</button>
                <button @click="editComment(index)">수정</button>
              </div>
            </li>
          </ul>

          <textarea v-model="newComment" placeholder="댓글을 입력하세요"></textarea>
          <button @click="addComment">댓글 추가</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      comments: [],
      newComment: "",
    };
  },
  methods: {
    addComment() {
      if (this.newComment.trim() !== "") {
        this.comments.push({ text: this.newComment, isEditing: false, editedText: "" });
        this.newComment = "";
      }
    },
    deleteComment(index) {
      this.comments.splice(index, 1);
    },
    editComment(index) {
      // 편집 모드로 전환
      this.comments[index].isEditing = true;
      this.comments[index].editedText = this.comments[index].text;
    },
    saveComment(index) {
      // 수정된 댓글 저장
      this.comments[index].text = this.comments[index].editedText;
      this.comments[index].isEditing = false;
      this.comments[index].editedText = "";
    },
  },
};
</script>

<style scoped>
.listcon{font-family: 'NPSfontBold';
margin-top:200px;}
/* 스타일링 추가 */
ul {
  list-style: none;
  padding: 0;
}

li {
  margin-bottom: 10px;
}
</style>